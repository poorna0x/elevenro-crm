import type { DocumentBrand } from '@/lib/service-brands';
import { normalizeDocumentBrand } from '@/lib/service-brands';

export type PublicJobReviewInvite = {
  brand: DocumentBrand;
  status: 'pending' | 'submitted';
  rating: number | null;
  technicianFirstName: string | null;
};

/** After hardening SQL, get/submit RPCs are service-role only — use Netlify. */
function jobReviewPublicFunctionUrls(): string[] {
  const host = typeof window !== 'undefined' ? window.location.hostname.toLowerCase() : '';
  const local = '/.netlify/functions/job-review-public';
  const hydrogen = 'https://hydrogenro.com/.netlify/functions/job-review-public';
  if (host === 'localhost' || host === '127.0.0.1') return [local, hydrogen];
  if (host.includes('elevenro')) return [hydrogen, local];
  return [local, hydrogen];
}

async function invokePublicJobReviewFn(
  action: 'get' | 'submit',
  body: Record<string, unknown>
): Promise<{ data: unknown; error: string | null }> {
  let lastError: string | null = null;
  for (const url of jobReviewPublicFunctionUrls()) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...body }),
      });
      const json = await res.json().catch(() => null);
      if (res.status === 404) {
        lastError = 'HTTP 404';
        continue;
      }
      if (res.status === 429) {
        return { data: null, error: 'Too many requests. Please wait a moment.' };
      }
      if (!res.ok) {
        const msg =
          (json && typeof json === 'object' && (json as { error?: string }).error) ||
          `HTTP ${res.status}`;
        return { data: null, error: String(msg) };
      }
      return { data: json, error: null };
    } catch (err) {
      lastError = err instanceof Error ? err.message : 'failed';
    }
  }
  return { data: null, error: lastError || 'failed' };
}

export async function fetchPublicJobReviewInvite(token: string): Promise<{
  invite: PublicJobReviewInvite | null;
  error?: 'invalid' | 'not_found' | 'expired' | 'failed';
}> {
  const t = String(token || '').trim();
  if (!t) return { invite: null, error: 'invalid' };
  try {
    const { data, error } = await invokePublicJobReviewFn('get', { token: t });
    if (error) {
      console.warn('[job-review] get failed', error);
      return { invite: null, error: 'failed' };
    }
    const row = data && typeof data === 'object' ? (data as Record<string, unknown>) : null;
    if (!row || row.ok !== true) {
      const code = String(row?.error || 'not_found');
      if (code === 'expired' || code === 'invalid' || code === 'not_found') {
        return { invite: null, error: code };
      }
      return { invite: null, error: 'failed' };
    }
    const brand = normalizeDocumentBrand(row.brand) || 'elevenro';
    const status = row.status === 'submitted' ? 'submitted' : 'pending';
    const ratingRaw = Number(row.rating);
    const rating = Number.isInteger(ratingRaw) && ratingRaw >= 1 && ratingRaw <= 5 ? ratingRaw : null;
    const technicianFirstName =
      typeof row.technician_first_name === 'string' && row.technician_first_name.trim()
        ? row.technician_first_name.trim()
        : null;
    return { invite: { brand, status, rating, technicianFirstName } };
  } catch (err) {
    console.warn('[job-review] get error', err);
    return { invite: null, error: 'failed' };
  }
}

export async function submitPublicJobReview(opts: {
  token: string;
  rating: number;
  comment?: string;
}): Promise<{ ok: boolean; alreadySubmitted?: boolean; error?: string }> {
  const token = String(opts.token || '').trim();
  const rating = Math.round(Number(opts.rating));
  if (!token || rating < 1 || rating > 5) return { ok: false, error: 'invalid' };
  try {
    const { data, error } = await invokePublicJobReviewFn('submit', {
      token,
      rating,
      comment: String(opts.comment || '').trim().slice(0, 1000),
    });
    if (error) {
      console.warn('[job-review] submit failed', error);
      return { ok: false, error };
    }
    const row = data && typeof data === 'object' ? (data as Record<string, unknown>) : null;
    if (!row || row.ok !== true) {
      return { ok: false, error: String(row?.error || 'failed') };
    }
    return { ok: true, alreadySubmitted: row.already_submitted === true };
  } catch (err) {
    console.warn('[job-review] submit error', err);
    return { ok: false, error: 'failed' };
  }
}

export function notifyAdminsJobReviewSubmitted(token: string): void {
  const t = String(token || '').trim();
  if (!t) return;
  const host = typeof window !== 'undefined' ? window.location.hostname.toLowerCase() : '';
  const url =
    host === 'localhost' || host === '127.0.0.1'
      ? 'https://hydrogenro.com/.netlify/functions/job-review-notify'
      : host.includes('elevenro')
        ? 'https://hydrogenro.com/.netlify/functions/job-review-notify'
        : '/.netlify/functions/job-review-notify';
  void fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: t }),
    keepalive: true,
  }).catch(() => {
    /* ignore */
  });
}
