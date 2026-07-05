// Device-local recordings store — the persistence layer behind the Community Archive.
//
// A person's voice IS personal information (POPIA). This keeps recordings on the user's
// own device: web persists the audio bytes in IndexedDB (survives a refresh); the native
// fallback is in-session only (durable WatermelonDB + expo-file-system is the T024 stretch).
// Deletion is real erasure — the audio Blob is removed, not just hidden.
//
// This file is pure (types + list helpers) so it unit-tests under `node --test` without
// touching IndexedDB or any React Native module. The I/O shells live in store.ts /
// store.web.ts (mirrors how services/translate/botlhale.ts splits pure builder from fetch).

import type { Visibility } from "../../components/ConsentSheet";

export type RecordingMeta = {
  /** String(Date.now()) at capture — also sorts chronologically. */
  id: string;
  visibility: Visibility;
  title: string;
  createdAt: string;
};

/** Contract both platform stores implement. */
export type RecordingsStore = {
  /** Whether recordings survive an app refresh/restart on this platform. */
  readonly persists: boolean;
  /** Load saved recording metadata, newest first. */
  load(): Promise<RecordingMeta[]>;
  /** Persist a recording: copies the audio at `sourceUri` into durable storage. */
  save(meta: RecordingMeta, sourceUri: string): Promise<void>;
  /** Erasure (POPIA): permanently delete the recording and its audio bytes. */
  remove(id: string): Promise<void>;
  /** Update the stored title. */
  rename(id: string, title: string): Promise<void>;
  /** A freshly-playable URI for this recording (new object URL on web), or null if missing. */
  getPlaybackUri(id: string): Promise<string | null>;
};

// ---- pure list helpers (unit-tested) ----

/** Newest first. Ids are String(Date.now()), so string compare is chronological. */
export function sortNewestFirst(list: RecordingMeta[]): RecordingMeta[] {
  return [...list].sort((a, b) => (a.id < b.id ? 1 : a.id > b.id ? -1 : 0));
}

/** Add (or replace) a recording at the front — matches the archive's newest-on-top order. */
export function prepend(list: RecordingMeta[], rec: RecordingMeta): RecordingMeta[] {
  return [rec, ...list.filter((r) => r.id !== rec.id)];
}

export function removeById(list: RecordingMeta[], id: string): RecordingMeta[] {
  return list.filter((r) => r.id !== id);
}

export function renameById(list: RecordingMeta[], id: string, title: string): RecordingMeta[] {
  return list.map((r) => (r.id === id ? { ...r, title } : r));
}
