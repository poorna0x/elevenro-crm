import { supabase } from '@/lib/supabase';
import { haversineKm } from '@/lib/maps';

export const BOOKING_SERVICE_HUBS_TABLE = 'booking_service_hubs';

export const DEFAULT_HUB_RADIUS_KM = 5;
export const MIN_HUB_RADIUS_KM = 0.5;
export const MAX_HUB_RADIUS_KM = 25;

export type BookingServiceHub = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  radius_km: number;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type HubMatchResult =
  | { ok: true; enforced: false }
  | { ok: true; enforced: true; hub: BookingServiceHub; distanceKm: number }
  | {
      ok: false;
      enforced: true;
      nearest: Array<{ hub: BookingServiceHub; distanceKm: number }>;
    };

const PUBLIC_COLUMNS = 'id,name,address,lat,lng,radius_km,is_active,sort_order,created_at,updated_at';

let memoryHubs: BookingServiceHub[] | null = null;
let memoryHubsAt = 0;
const MEMORY_TTL_MS = 60_000;

/** Table is created via SQL; generated Database types may lag. */
function hubsTable() {
  return (supabase as unknown as { from: (table: string) => ReturnType<typeof supabase.from> }).from(
    BOOKING_SERVICE_HUBS_TABLE
  );
}

function isMissingTableError(message: string | undefined): boolean {
  const msg = String(message || '').toLowerCase();
  return (
    msg.includes('booking_service_hubs') &&
    (msg.includes('does not exist') ||
      msg.includes('schema cache') ||
      msg.includes('could not find the table'))
  );
}

export function clampHubRadiusKm(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_HUB_RADIUS_KM;
  return Math.min(MAX_HUB_RADIUS_KM, Math.max(MIN_HUB_RADIUS_KM, Math.round(value * 10) / 10));
}

export function parseBookingServiceHub(row: unknown): BookingServiceHub | null {
  if (!row || typeof row !== 'object') return null;
  const r = row as Record<string, unknown>;
  const lat = Number(r.lat);
  const lng = Number(r.lng);
  const radius = clampHubRadiusKm(Number(r.radius_km));
  const name = String(r.name || '').trim();
  if (!name || !Number.isFinite(lat) || !Number.isFinite(lng) || (lat === 0 && lng === 0)) {
    return null;
  }
  return {
    id: String(r.id || ''),
    name: name.slice(0, 80),
    address: String(r.address || '').trim(),
    lat,
    lng,
    radius_km: radius,
    is_active: r.is_active !== false,
    sort_order: Number.isFinite(Number(r.sort_order)) ? Number(r.sort_order) : 0,
    created_at: typeof r.created_at === 'string' ? r.created_at : undefined,
    updated_at: typeof r.updated_at === 'string' ? r.updated_at : undefined,
  };
}

export function matchPointToServiceHubs(
  lat: number,
  lng: number,
  hubs: BookingServiceHub[]
): HubMatchResult {
  const active = hubs.filter((h) => h.is_active);
  if (active.length === 0) return { ok: true, enforced: false };
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || (lat === 0 && lng === 0)) {
    return { ok: false, enforced: true, nearest: [] };
  }

  const ranked = active
    .map((hub) => ({
      hub,
      distanceKm: haversineKm(lat, lng, hub.lat, hub.lng),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);

  const inside = ranked.find((row) => row.distanceKm <= row.hub.radius_km);
  if (inside) {
    return {
      ok: true,
      enforced: true,
      hub: inside.hub,
      distanceKm: inside.distanceKm,
    };
  }

  return { ok: false, enforced: true, nearest: ranked.slice(0, 3) };
}

export function formatOutOfServiceAreaMessage(result: HubMatchResult): string {
  if (result.ok) return '';
  const names = result.nearest.map((row) => row.hub.name).filter(Boolean);
  if (names.length === 0) {
    return 'We do not currently serve this location. Please move the pin into a coverage area.';
  }
  if (names.length === 1) {
    return `We do not currently serve this pin. We cover ${names[0]} — move the pin into that area, or call us.`;
  }
  const last = names[names.length - 1];
  const head = names.slice(0, -1).join(', ');
  return `We do not currently serve this pin. We cover ${head}, and ${last} — move the pin into a coverage area, or call us.`;
}

export function invalidateBookingServiceHubsCache() {
  memoryHubs = null;
  memoryHubsAt = 0;
}

export async function fetchBookingServiceHubs(opts?: {
  includeInactive?: boolean;
  force?: boolean;
}): Promise<{ hubs: BookingServiceHub[]; error: string | null; missingTable: boolean }> {
  const includeInactive = opts?.includeInactive === true;
  if (!includeInactive && !opts?.force && memoryHubs && Date.now() - memoryHubsAt < MEMORY_TTL_MS) {
    return { hubs: memoryHubs, error: null, missingTable: false };
  }

  let query = hubsTable().select(PUBLIC_COLUMNS).order('sort_order', { ascending: true }).order('name', { ascending: true });

  if (!includeInactive) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;
  if (error) {
    return {
      hubs: [],
      error: error.message,
      missingTable: isMissingTableError(error.message),
    };
  }

  const hubs = (data || []).map(parseBookingServiceHub).filter((h): h is BookingServiceHub => Boolean(h));
  if (!includeInactive) {
    memoryHubs = hubs;
    memoryHubsAt = Date.now();
  }
  return { hubs, error: null, missingTable: false };
}
