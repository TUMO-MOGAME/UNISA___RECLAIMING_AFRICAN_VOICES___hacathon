# Supabase — Community Archive backend

Cloud backend for the **Community Archive**: it lets a recording move off the device to be shared
with (and played by) the community — while keeping every recording **private by default, owned by the
person who made it, and truly erasable**. A person's voice is personal information under **POPIA**, so
access is enforced entirely by **Row-Level Security (RLS)**.

- **Project URL:** `https://ogdlpfykyklblpfrgqwv.supabase.co`
- **Client key:** the **publishable** key (safe in the client **only because RLS is on** — see below).
- **Auth model:** **anonymous sign-in** — no account, no PII collected. Each device gets a stable
  `auth.uid()`; RLS keys everything to it.

## Set it up (once, ~2 minutes)

1. **Run the schema.** Open the [Supabase dashboard](https://supabase.com/dashboard) → your project →
   **SQL Editor** → paste all of [`migrations/0001_community_archive.sql`](migrations/0001_community_archive.sql)
   → **Run**. It's idempotent (safe to re-run). This creates:
   - `public.recordings` (metadata + consent) with RLS,
   - a **private** `recordings` storage bucket with RLS,
   - an erasure trigger (deleting a row deletes its audio object too).
2. **Enable anonymous auth.** Dashboard → **Authentication → Sign In / Providers → Anonymous** → enable.
   Without this the client can't get an `auth.uid()` and every RLS check will (correctly) deny access.
3. **Confirm the keys** are in `app/.env` (already added):
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://ogdlpfykyklblpfrgqwv.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
   ```

## The access rules (what RLS guarantees)

| Action | Who can do it |
|---|---|
| Insert a recording | only as yourself (`owner_id = auth.uid()`) |
| Read metadata | your own rows **+** any row marked `public` |
| Read audio bytes | your own folder **+** audio belonging to a `public` row |
| Update / delete (erase) | only your own |

Private recordings are readable by **nobody but the owner** — not even with the publishable key, because
RLS runs on every request. That is the POPIA guarantee, in the database itself.

## Data model

`public.recordings`: `id` (uuid) · `owner_id` · `title` · `visibility` (`private`|`public`) ·
`language` · `storage_path` · `duration_seconds` · `transcript` (filled later by Lelapa) ·
`consent_version` + `consented_at` (POPIA) · `created_at`.

Audio path convention inside the bucket: `<owner_id>/<recording_id>.<ext>`.

## Not wired to the app yet (next step)

The database is ready; the app does **not** yet talk to it (the archive is still local-only —
IndexedDB on web). Wiring is a separate change:

1. `npm i @supabase/supabase-js`
2. A `services/archive/supabase.ts` client that `signInAnonymously()` on first use.
3. On **"Share with community"** consent: upload the audio to `recordings/<uid>/<id>` and insert the row.
4. A community feed screen that lists `visibility = 'public'` rows and streams their audio.
5. Delete = remove object **then** row (the trigger is a backstop).

Until then, the Reader/Archive keep working offline exactly as now; this backend simply waits.
POPIA safeguards that must ship with the wiring: the existing consent gate, a visible "delete", and
never uploading anything without an explicit **public** consent choice.
