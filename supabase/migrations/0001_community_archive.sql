-- Ubuntu Heritage — Community Archive schema (POPIA-safe)
-- =========================================================================================
-- A person's VOICE is personal information (POPIA). This schema keeps every recording private
-- by default, owned by the person who made it, readable by others ONLY when they explicitly
-- choose to share it, and truly erasable. All access is enforced by Row-Level Security (RLS),
-- which is what makes the client-side publishable key safe to ship.
--
-- Ownership uses Supabase **anonymous auth** (no account/PII required): each device signs in
-- anonymously and gets a stable auth.uid(); RLS keys everything to that id.
--
-- HOW TO RUN: paste this whole file into the Supabase dashboard → SQL Editor → Run.
-- It is idempotent (safe to re-run). Then enable Anonymous sign-ins (see supabase/README.md).
-- =========================================================================================

create extension if not exists pgcrypto;  -- gen_random_uuid()

-- ── 1. Recordings metadata ────────────────────────────────────────────────────────────────
create table if not exists public.recordings (
  id               uuid        primary key default gen_random_uuid(),
  owner_id         uuid        not null default auth.uid() references auth.users(id) on delete cascade,
  title            text        not null default 'Untitled',
  visibility       text        not null default 'private' check (visibility in ('private','public')),
  language         text,                          -- app/BCP-47 language code (optional)
  storage_path     text        not null,          -- object name inside the 'recordings' bucket
  duration_seconds numeric,
  transcript       text,                          -- filled later by Lelapa/Vulavula (nullable)
  consent_version  text        not null default 'v1',   -- which consent copy the user agreed to
  consented_at     timestamptz not null default now(),
  created_at       timestamptz not null default now()
);

comment on table public.recordings is
  'Community Archive oral-history recordings. Audio bytes live in the private storage bucket; this is metadata + POPIA consent. RLS: owner full control, public rows readable by all.';

create index if not exists recordings_owner_idx  on public.recordings (owner_id);
create index if not exists recordings_public_idx on public.recordings (visibility, created_at desc);

alter table public.recordings enable row level security;

-- Read: your own recordings, plus anything shared publicly (the community feed).
drop policy if exists "recordings read own or public" on public.recordings;
create policy "recordings read own or public" on public.recordings
  for select using ( owner_id = auth.uid() or visibility = 'public' );

-- Insert: only as yourself.
drop policy if exists "recordings insert as owner" on public.recordings;
create policy "recordings insert as owner" on public.recordings
  for insert with check ( owner_id = auth.uid() );

-- Update / Delete (erasure): only your own.
drop policy if exists "recordings update own" on public.recordings;
create policy "recordings update own" on public.recordings
  for update using ( owner_id = auth.uid() ) with check ( owner_id = auth.uid() );

drop policy if exists "recordings delete own" on public.recordings;
create policy "recordings delete own" on public.recordings
  for delete using ( owner_id = auth.uid() );

-- ── 2. Audio storage bucket (private) ───────────────────────────────────────────────────────
-- Path convention: <owner_id>/<recording_id>.<ext>  (e.g. 9f8c.../a1b2.m4a)
insert into storage.buckets (id, name, public)
values ('recordings', 'recordings', false)
on conflict (id) do nothing;

-- Owner: full control of their OWN folder only (first path segment must equal their uid).
drop policy if exists "audio owner read"   on storage.objects;
create policy "audio owner read" on storage.objects
  for select using ( bucket_id = 'recordings' and (storage.foldername(name))[1] = auth.uid()::text );

drop policy if exists "audio owner insert" on storage.objects;
create policy "audio owner insert" on storage.objects
  for insert with check ( bucket_id = 'recordings' and (storage.foldername(name))[1] = auth.uid()::text );

drop policy if exists "audio owner update" on storage.objects;
create policy "audio owner update" on storage.objects
  for update using ( bucket_id = 'recordings' and (storage.foldername(name))[1] = auth.uid()::text );

drop policy if exists "audio owner delete" on storage.objects;
create policy "audio owner delete" on storage.objects
  for delete using ( bucket_id = 'recordings' and (storage.foldername(name))[1] = auth.uid()::text );

-- Public playback: anyone (signed in, incl. anonymously) may read an audio object that belongs
-- to a recording row the owner has marked PUBLIC. Private audio stays unreadable to others.
drop policy if exists "audio public readable" on storage.objects;
create policy "audio public readable" on storage.objects
  for select using (
    bucket_id = 'recordings'
    and exists (
      select 1 from public.recordings r
      where r.storage_path = storage.objects.name
        and r.visibility = 'public'
    )
  );

-- ── 3. POPIA erasure helper ──────────────────────────────────────────────────────────────────
-- Deleting a row does NOT auto-delete its audio object. The app deletes both (object first, then
-- row). This trigger is a safety net: if a row is removed, drop its audio object too, so erasure
-- is complete even if the client only deletes the row.
create or replace function public.delete_recording_object()
returns trigger
language plpgsql
security definer
set search_path = storage, public
as $$
begin
  delete from storage.objects
   where bucket_id = 'recordings' and name = old.storage_path;
  return old;
end;
$$;

drop trigger if exists trg_delete_recording_object on public.recordings;
create trigger trg_delete_recording_object
  after delete on public.recordings
  for each row execute function public.delete_recording_object();

-- =========================================================================================
-- Done. Reminder: enable Authentication → Anonymous sign-ins in the dashboard, or the client
-- cannot obtain an auth.uid() and every RLS check will (correctly) deny access.
-- =========================================================================================
