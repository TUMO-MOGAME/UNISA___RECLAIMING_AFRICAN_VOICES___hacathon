// Pure, dependency-free helpers for the cloud archive (no Supabase import), so they unit-test under
// `node --test` without pulling in @supabase/supabase-js. The I/O lives in cloud.ts.

/** Map an audio blob's MIME type to a file extension for the storage object. */
export function extForMime(mime: string | undefined | null): string {
  const m = (mime ?? "").toLowerCase();
  if (m.includes("webm")) return "webm";
  if (m.includes("ogg")) return "ogg";
  if (m.includes("wav")) return "wav";
  if (m.includes("mpeg") || m.includes("mp3")) return "mp3";
  if (m.includes("mp4") || m.includes("m4a") || m.includes("aac")) return "m4a";
  return "m4a";
}

/** Storage object path convention: <owner_id>/<recording_id>.<ext>. */
export function storagePathFor(uid: string, recId: string, ext: string): string {
  return `${uid}/${recId}.${ext}`;
}
