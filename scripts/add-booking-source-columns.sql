-- Add booking source tracking columns for multi-domain attribution.
-- Run this once in Supabase SQL editor.

alter table if exists public.jobs
  add column if not exists booking_source text;

alter table if exists public.jobs
  add column if not exists booking_domain text;

-- Optional defaults for future inserts where value is not provided.
alter table if exists public.jobs
  alter column booking_source set default 'unknown';

alter table if exists public.jobs
  alter column booking_domain set default '';

-- Helpful index for admin filtering/analytics.
create index if not exists idx_jobs_booking_source
  on public.jobs (booking_source);
