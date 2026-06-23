# Eleven RO security issues & remediation tracker

**Last updated:** 2026-06-23  
**Shared backend:** Eleven RO and Hydrogen RO use the **same Supabase project**. SQL hardening scripts only need to be applied **once** in Supabase; both sites benefit. **Netlify env and frontend code are per-repo** — each site must deploy its own fixes.

---

## Critical (fixed on `feat/security-hardening`)

| Issue | Risk | Fix in this branch |
|-------|------|-------------------|
| `VITE_CLOUDINARY_API_SECRET` in `src/lib/cloudinary.ts` | Full Cloudinary account control exposed in public JS bundle | Removed secrets from client; unsigned preset uploads only (ported from Hydrogen RO) |
| `cloudinary-delete` had **no auth** | Anyone on allowed origin could delete images | Ported `admin-auth-guard.js` + authenticated `cloudinary-delete.js` from Hydrogen RO |
| Netlify functions fell back to `VITE_*` Cloudinary secrets | Server could read secrets that also ship to browser | `cloudinary-signed-url.js` / `cloudinary-delete.js` use `CLOUDINARY_*` server env only |
| `distance-matrix` accepted client `apiKey` | Quota theft / key scraping | Server reads `GOOGLE_MAPS_API_KEY`; client no longer sends key; rate limit added |

### After deploying this branch

1. **Rotate Cloudinary API secrets** (old `VITE_*` values may already be in built JS on production).
2. On **Eleven RO Netlify**, set server-only vars (no `VITE_` prefix for secrets):
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `CLOUDINARY_SECONDARY_*` if used
   - `GOOGLE_MAPS_API_KEY` (or reuse `VITE_GOOGLE_MAPS_API_KEY` on functions only)
   - `SUPABASE_SERVICE_ROLE_KEY` (already required for booking functions)
3. **Remove** from Eleven RO Netlify build env if present:
   - `VITE_CLOUDINARY_API_KEY`, `VITE_CLOUDINARY_API_SECRET`
   - `VITE_CLOUDINARY_SECONDARY_API_KEY`, `VITE_CLOUDINARY_SECONDARY_API_SECRET`
4. Redeploy Eleven RO so the new bundle excludes secrets.

---

## Critical (database — shared with Hydrogen RO)

If you have already run Hydrogen RO’s `scripts/secure-*.sql` in Supabase, these are **already mitigated** for both brands. Verify in SQL Editor if unsure:

| Script | Purpose |
|--------|---------|
| `secure-booking-rpc-definer-guards.sql` | Booking RPCs: `service_role` only + in-function guard |
| `secure-website-booking-intent-rpc.sql` | Booking intent RPCs: not callable by `anon` |
| `lock-down-anon-access.sql` | Revoke dangerous `anon` grants |
| `secure-customers-rls.sql` | Customer RLS + admin checks |

Copies of the above are now in `elevenro-crm/scripts/` for reference (do **not** re-run blindly if already applied).

**Legacy risk if old grants remain:** `create_customer_for_booking` / `update_customer_for_booking` granted to `anon` in early `secure-customers-rls.sql` — superseded by definer guards when applied.

---

## High (open / follow-up)

| Issue | Notes |
|-------|--------|
| `geocode.js` — no auth, CORS only | Rate-limit + optional ALTCHA or session check (Hydrogen RO same pattern) |
| `booking_abandonments` anon INSERT | Intentional for funnel tracking; spam/PII risk — consider RPC + rate limit |
| Local `.env.local` with live secrets | Gitignored ✓ — never commit; rotate if shared |

---

## Medium (open)

| Issue | Notes |
|-------|--------|
| Missing Hydrogen RO hardening scripts in repo history | Many `secure-*.sql` files added to `scripts/` for parity; DB state is source of truth |
| `distance-matrix` / `geocode` in-memory rate limits | Per Lambda instance only; acceptable for now |

---

## Hydrogen RO (CRM) — separate repo

Calling page server pagination + this distance-matrix fix live on branch `feat/calling-page-server-pagination` in `fintech-template-5157`. Eleven RO does not include the admin Calling page.

---

## Verification checklist

- [ ] Eleven RO production build: search `dist/assets/*.js` for `CLOUDINARY_API_SECRET` — should be **absent**
- [ ] `POST /.netlify/functions/cloudinary-delete` without `Authorization` → **401**
- [ ] `POST /.netlify/functions/distance-matrix` without body `apiKey` still works when `GOOGLE_MAPS_API_KEY` set on Netlify
- [ ] Booking flow on elevenro.com still uploads photos (unsigned preset)
- [ ] Supabase: `anon` cannot execute `create_customer_for_booking` directly (only via Netlify `service_role`)
