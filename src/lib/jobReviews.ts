import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from '@/lib/supabaseConfig';
import type { DocumentBrand } from '@/lib/service-brands';
import { normalizeDocumentBrand } from '@/lib/service-brands';

export type PublicJobReviewInvite = {
  brand: DocumentBrand;
  status: 'pending' | 'submitted';
  rating: number | null;
  technicianFirstName: string | null;
};

/** Public get/submit must send the anon JWT so localhost (no CRM session) works. */
async function invokePublicJobReviewRpc(
  fn: 'get_job_review_invite' | 'submit_job_review',
  body: Record<string, unknown>
): Promise<{ data: unknown; error: string | null }> {
  if (!isSupabaseConfigured() || !supabaseUrl || !supabaseAnonKey) {
    return { data: null, error: 'Supabase is not configured' };
  }
  try {
    const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      const msg =
        (json && typeof json === 'object' && (json as { message?: string }).message) ||
        `HTTP ${res.status}`;
      return { data: null, error: String(msg) };
    }
    return { data: json, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'failed' };
  }
}

export async function fetchPublicJobReviewInvite(token: string): Promise<{
  invite: PublicJobReviewInvite | null;
  error?: 'invalid' | 'not_found' | 'expired' | 'failed';
}> {
  const t = String(token || '').trim();
  if (!t) return { invite: null, error: 'invalid' };
  try {
    const { data, error } = await invokePublicJobReviewRpc('get_job_review_invite', { p_token: t });
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
    const { data, error } = await invokePublicJobReviewRpc('submit_job_review', {
      p_token: token,
      p_rating: rating,
      p_comment: String(opts.comment || '').trim().slice(0, 1000),
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
