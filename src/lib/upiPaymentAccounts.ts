/** Thin UPI helpers for the public /pay-upi page (no account CRUD). */

export type UpiPayLinkInput = {
  upiId: string;
  payeeName?: string;
  amount?: number;
  note?: string;
  phone?: string;
  brand?: 'hydrogenro' | 'elevenro' | string | null;
};

export function normalizeUpiId(raw: string): string {
  return String(raw || '')
    .trim()
    .replace(/\s+/g, '')
    .toLowerCase();
}

export function normalizePaymentPhone(raw: string): string {
  const t = String(raw || '').trim();
  if (!t) return '';
  const digits = t.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  return digits || t;
}

export function isValidUpiId(raw: string): boolean {
  const id = normalizeUpiId(raw);
  return /^[a-z0-9.\-_]{2,256}@[a-z0-9.\-]{2,64}$/i.test(id);
}

/** Query string shared by upi:// and app-specific schemes (pa unencoded). */
export function buildUpiPayQuery(input: UpiPayLinkInput): string | null {
  const pa = normalizeUpiId(input.upiId);
  if (!isValidUpiId(pa)) return null;
  const parts = [`pa=${pa}`, 'cu=INR'];
  const pn = String(input.payeeName || '').trim().slice(0, 100);
  if (pn) parts.push(`pn=${encodeURIComponent(pn)}`);
  const am = Number(input.amount);
  if (Number.isFinite(am) && am > 0) {
    parts.push(`am=${am.toFixed(2)}`);
  }
  const tn = String(input.note || '')
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, 80);
  if (tn) parts.push(`tn=${encodeURIComponent(tn)}`);
  return parts.join('&');
}

export function buildUpiPayDeepLink(input: UpiPayLinkInput): string | null {
  const q = buildUpiPayQuery(input);
  return q ? `upi://pay?${q}` : null;
}

export type PayPlatform = 'android' | 'ios' | 'other';

/** Best-effort UA detection for /pay-upi layout. */
export function detectPayPlatform(): PayPlatform {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua)) return 'android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (
    typeof navigator.platform === 'string' &&
    navigator.platform === 'MacIntel' &&
    Number(navigator.maxTouchPoints || 0) > 1
  ) {
    return 'ios';
  }
  return 'other';
}

/** App-specific UPI openers (needed on iOS — generic upi:// has no chooser there). */
export function buildUpiAppDeepLinks(input: UpiPayLinkInput): {
  id: string;
  name: string;
  href: string;
  color: string;
}[] {
  const q = buildUpiPayQuery(input);
  if (!q) return [];
  return [
    { id: 'gpay', name: 'GPay', href: `tez://upi/pay?${q}`, color: '#4285F4' },
    { id: 'phonepe', name: 'PhonePe', href: `phonepe://pay?${q}`, color: '#5F259F' },
    { id: 'paytm', name: 'Paytm', href: `paytmmp://upi/pay?${q}`, color: '#00BAF2' },
    { id: 'bhim', name: 'BHIM', href: `bhim://upi/pay?${q}`, color: '#007272' },
  ];
}
