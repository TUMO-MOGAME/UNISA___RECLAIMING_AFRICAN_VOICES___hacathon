// Community Archive — cloud sync (Supabase). Sits on top of the device-local store.
//
// POPIA split: READING the public community feed needs no session (RLS lets anyone read rows/objects
// marked public). WRITING — sharing your own recording, or erasing it from the cloud — needs an
// anonymous session (auth.uid()), which requires an hCaptcha token on first sign-in when CAPTCHA
// protection is on. Private recordings are never uploaded. Pure helpers here are unit-tested; the I/O
// is guarded so callers degrade to local-only when cloud is unconfigured.

import { getSupabase, ensureAnonSession } from "./supabase";
import { extForMime, storagePathFor } from "./cloud-util";

export { extForMime, storagePathFor } from "./cloud-util";

const BUCKET = "recordings";

export type FeedItem = {
  id: string; // Supabase row id (uuid)
  title: string;
  language: string | null;
  createdAt: string;
  storagePath: string;
};

export type UploadResult =
  | { ok: true; cloudId: string; storagePath: string }
  | { ok: false; message: string };

// ---- I/O (guarded); pure helpers (extForMime, storagePathFor) live in ./cloud-util ----

/** Read the public community feed (newest first). No session/captcha required. */
export async function fetchPublicFeed(limit = 50): Promise<FeedItem[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("recordings")
    .select("id, title, language, created_at, storage_path")
    .eq("visibility", "public")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data.map((r: any) => ({
    id: r.id,
    title: r.title,
    language: r.language ?? null,
    createdAt: r.created_at,
    storagePath: r.storage_path,
  }));
}

/** A time-limited playable URL for an object in the private bucket (works for public rows via RLS). */
export async function signedUrlFor(storagePath: string, expiresIn = 3600): Promise<string | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb.storage.from(BUCKET).createSignedUrl(storagePath, expiresIn);
  if (error || !data) return null;
  return data.signedUrl;
}

/**
 * Share a recording to the community: sign in anonymously (captchaToken on first sign-in), upload the
 * audio to the private bucket under the owner's folder, then insert the public row. owner_id defaults
 * to auth.uid() in the DB. Returns the new cloud id + storage path, or an error message.
 */
export async function uploadPublic(opts: {
  recId: string;
  uri: string; // local playable uri (object URL on web)
  title: string;
  language?: string | null;
  captchaToken?: string;
}): Promise<UploadResult> {
  const sb = getSupabase();
  if (!sb) return { ok: false, message: "cloud not configured" };
  const uid = await ensureAnonSession(opts.captchaToken);
  if (!uid) return { ok: false, message: "sign-in failed (anonymous auth / captcha)" };

  let blob: Blob;
  try {
    blob = await fetch(opts.uri).then((r) => r.blob());
  } catch {
    return { ok: false, message: "could not read the local audio" };
  }

  const ext = extForMime(blob.type);
  const path = storagePathFor(uid, opts.recId, ext);

  const up = await sb.storage.from(BUCKET).upload(path, blob, {
    contentType: blob.type || "audio/mp4",
    upsert: true,
  });
  if (up.error) return { ok: false, message: `upload failed: ${up.error.message}` };

  const ins = await sb
    .from("recordings")
    .insert({ title: opts.title, visibility: "public", language: opts.language ?? null, storage_path: path, consent_version: "v1" })
    .select("id")
    .single();
  if (ins.error || !ins.data) {
    await sb.storage.from(BUCKET).remove([path]).catch(() => {}); // clean up the orphaned object
    return { ok: false, message: `save failed: ${ins.error?.message ?? "unknown"}` };
  }
  return { ok: true, cloudId: ins.data.id as string, storagePath: path };
}

/**
 * Erasure (POPIA): remove a shared recording from the cloud — the row (an after-delete trigger also
 * drops the object) and the object explicitly. Only works while the owner's session exists; the local
 * copy is deleted regardless by the caller.
 */
export async function deleteCloud(opts: { cloudId: string; storagePath: string }): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  const uid = await ensureAnonSession(); // no captcha here: succeeds only if a session already exists
  if (!uid) return;
  await sb.from("recordings").delete().eq("id", opts.cloudId);
  await sb.storage.from(BUCKET).remove([opts.storagePath]).catch(() => {});
}
