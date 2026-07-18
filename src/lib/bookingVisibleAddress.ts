import {
  resolveVisibleAddressFromGoogleOnly,
  reverseGeocodeLatLng,
} from '@/lib/adminUtils';

function hasCoords(lat?: number | null, lng?: number | null): boolean {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    (lat !== 0 || lng !== 0)
  );
}

/**
 * Short location (visible_address) for public /book create+update.
 * Google reverse-geocode only (neighborhood / sublocality / Plus Code place) —
 * does not use the bangaloreAreas list.
 */
export async function resolveBookingVisibleAddress(options: {
  address?: string | null;
  lat?: number | null;
  lng?: number | null;
}): Promise<string | null> {
  const lat = options.lat;
  const lng = options.lng;
  if (!hasCoords(lat, lng)) return null;

  const geo = await reverseGeocodeLatLng(lat as number, lng as number);
  if (!geo) return null;

  return resolveVisibleAddressFromGoogleOnly({
    formattedAddress: geo.formattedAddress,
    addressComponents: geo.addressComponents,
  });
}
