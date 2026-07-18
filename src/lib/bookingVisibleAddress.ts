import {
  resolveVisibleAddressFromGeocode,
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
 * Tries address text first; reverse-geocodes only when needed.
 */
export async function resolveBookingVisibleAddress(options: {
  address?: string | null;
  lat?: number | null;
  lng?: number | null;
}): Promise<string | null> {
  const address = typeof options.address === 'string' ? options.address.trim() : '';

  const fromText = resolveVisibleAddressFromGeocode({
    formattedAddress: address || null,
    addressHints: address ? [address] : [],
  });
  if (fromText) return fromText;

  const lat = options.lat;
  const lng = options.lng;
  if (!hasCoords(lat, lng)) return null;

  const geo = await reverseGeocodeLatLng(lat as number, lng as number);
  if (!geo) return null;

  return resolveVisibleAddressFromGeocode({
    formattedAddress: geo.formattedAddress,
    addressComponents: geo.addressComponents,
    addressHints: address ? [address] : [],
  });
}
