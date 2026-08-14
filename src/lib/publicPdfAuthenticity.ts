/**
 * Client helpers for public /authenticity (OTP session + hash check via Netlify).
 */
import { sha256HexFromFile } from '@/lib/amcPdfAuthenticity';
import {
  formatBytes,
  normalizeVerifyCodeInput,
  validatePdfFileForAuthenticity,
  PDF_AUTH_MAX_BYTES,
} from '@/lib/pdfAuthenticityVerify';

const SESSION_KEY = 'pdf_auth_session_v1';

export type PublicAuthCheckResult =
  | {
      authentic: true;
      documentType: string;
      documentRef: string | null;
      generatedOn: string | null;
      verifyCode: string | null;
    }
  | { authentic: false };

export type StoredAuthSession = {
  sessionToken: string;
  expiresAt: number;
  phone: string;
};

/** Cloud API business line (VERIFY must hit this number). Override via env. */
export function getAuthenticityWhatsAppE164(): string {
  const fromEnv = (import.meta.env.VITE_WHATSAPP_BUSINESS_NUMBER || '').replace(/\D/g, '');
  if (fromEnv.length >= 10) {
    return fromEnv.length === 10 ? `91${fromEnv}` : fromEnv;
  }
  // Default: production Cloud API display number (shared HRO/ERO WABA line).
  return '918792467611';
}

export function formatWaDisplay(e164: string): string {
  const d = e164.replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('91')) {
    return `+91 ${d.slice(2, 7)} ${d.slice(7)}`;
  }
  return `+${d}`;
}

export function buildVerifyWhatsAppUrl(e164 = getAuthenticityWhatsAppE164()): string {
  return `https://wa.me/${e164.replace(/\D/g, '')}?text=${encodeURIComponent('VERIFY')}`;
}

export function loadAuthSession(): StoredAuthSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAuthSession;
    if (!parsed?.sessionToken || !parsed.expiresAt) return null;
    if (Date.now() > parsed.expiresAt - 15_000) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveAuthSession(session: StoredAuthSession) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export async function verifyAuthenticityOtp(params: {
  phone: string;
  otp: string;
  altchaLoginToken?: string;
  altchaPayload?: string;
}): Promise<{ ok: true; session: StoredAuthSession } | { ok: false; error: string }> {
  try {
    const res = await fetch('/.netlify/functions/pdf-authenticity-otp-verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: params.phone,
        otp: params.otp,
        altchaLoginToken: params.altchaLoginToken,
        altchaPayload: params.altchaPayload,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, error: data.error || 'Invalid or expired code' };
    }
    const expiresInSec = Number(data.expiresInSec) || 20 * 60;
    const session: StoredAuthSession = {
      sessionToken: data.sessionToken,
      expiresAt: Date.now() + expiresInSec * 1000,
      phone: params.phone.replace(/\D/g, '').slice(-10),
    };
    saveAuthSession(session);
    return { ok: true, session };
  } catch {
    return { ok: false, error: 'Could not verify code. Try again.' };
  }
}

export async function checkPdfAuthenticity(params: {
  sessionToken: string;
  sha256Hex?: string;
  verifyCode?: string;
}): Promise<PublicAuthCheckResult | { error: string }> {
  try {
    const res = await fetch('/.netlify/functions/pdf-authenticity-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionToken: params.sessionToken,
        sha256Hex: params.sha256Hex,
        verifyCode: params.verifyCode,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) {
      clearAuthSession();
      return { error: data.error || 'Session expired. Unlock again.' };
    }
    if (!res.ok) {
      return { error: data.error || 'Check failed' };
    }
    if (data.authentic === true) {
      return {
        authentic: true,
        documentType: data.documentType || 'Document',
        documentRef: data.documentRef ?? null,
        generatedOn: data.generatedOn ?? null,
        verifyCode: data.verifyCode ?? null,
      };
    }
    return { authentic: false };
  } catch {
    return { error: 'Could not reach verification service.' };
  }
}

export async function hashAndCheckPdfFile(
  file: File,
  sessionToken: string
): Promise<
  | { ok: true; result: PublicAuthCheckResult; sha256Hex: string }
  | { ok: false; error: string }
> {
  const valid = await validatePdfFileForAuthenticity(file);
  if (!valid.ok) return { ok: false, error: valid.message };

  const sha256Hex = await sha256HexFromFile(file);
  const result = await checkPdfAuthenticity({ sessionToken, sha256Hex });
  if ('error' in result) return { ok: false, error: result.error };
  return { ok: true, result, sha256Hex };
}

export { formatBytes, normalizeVerifyCodeInput, PDF_AUTH_MAX_BYTES };
