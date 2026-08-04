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

/** Query string for upi://pay (QR payload). */
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

export type UpiPayLinkRecord = {
  code: string;
  upiId: string;
  payeeName: string;
  amount: number | null;
  note: string;
  phone: string;
  brand: 'hydrogenro' | 'elevenro';
};

/** Public: resolve short /p/{code} pay link. */
export async function fetchUpiPayShortLink(code: string): Promise<UpiPayLinkRecord | null> {
  const c = String(code || '')
    .trim()
    .replace(/[^a-zA-Z0-9]/g, '');
  if (c.length < 6 || c.length > 16) return null;
  try {
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase.rpc('get_upi_pay_link', { p_code: c });
    if (error) {
      console.warn('[upi] get_upi_pay_link failed', error.message);
      return null;
    }
    const row = Array.isArray(data) ? data[0] : data;
    if (!row || typeof row !== 'object') return null;
    const r = row as Record<string, unknown>;
    const upiId = normalizeUpiId(typeof r.upi_id === 'string' ? r.upi_id : '');
    if (!isValidUpiId(upiId)) return null;
    const amountRaw = r.amount;
    const amount =
      typeof amountRaw === 'number'
        ? amountRaw
        : amountRaw != null && amountRaw !== ''
          ? Number(amountRaw)
          : null;
    return {
      code: typeof r.code === 'string' ? r.code : c,
      upiId,
      payeeName: typeof r.payee_name === 'string' ? r.payee_name : '',
      amount: Number.isFinite(amount as number) && (amount as number) > 0 ? (amount as number) : null,
      note: typeof r.note === 'string' ? r.note : '',
      phone: normalizePaymentPhone(typeof r.phone === 'string' ? r.phone : ''),
      brand: r.brand === 'elevenro' ? 'elevenro' : 'hydrogenro',
    };
  } catch (e) {
    console.warn('[upi] get_upi_pay_link error', e);
    return null;
  }
}
