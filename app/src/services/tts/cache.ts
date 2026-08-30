// The narration cache — the reason the ElevenLabs quota survives contact with real readers.
//
// The account allows 40 000 characters a month. Pressing "Listen" on one Mhudi passage is ~800 of
// them, so fifty presses is a month. Without a cache, a reader who taps Listen, switches Child→Adult
// and taps again has paid twice for two renderings of a passage they heard once.
//
// So: the same text, in the same language, from the same voice, is synthesised ONCE. The key is a
// hash of exactly those three things, which means a corrected translation or a changed voice
// correctly misses the cache rather than serving stale audio.
//
// PRIVACY: this stores narration audio the app generated from its own published content. There is no
// reader input here — nothing anyone typed, said, or chose beyond a language. It is not personal
// information and needs no consent gate (unlike the Community Archive, where a voice IS personal
// information — see docs/05-popia-compliance.md). "Forget" exists anyway, and is wired to nothing
// automatic: it is there so a device can be cleared deliberately.
//
// The key logic lives in cache-key.ts and is re-exported here so callers have one import. It is
// split out because `./cache-store` below MUST stay extensionless for Metro's platform resolution
// (web -> cache-store.web.ts), and node's test runner cannot follow an extensionless import — so the
// part worth testing lives in a file the test runner can reach. Same shape as cloud.ts/cloud-util.ts.

import { cacheStore } from "./cache-store";

export { narrationKey } from "./cache-key";

export type NarrationCacheStore = {
  /** Whether cached narration survives a refresh on this platform. */
  readonly persists: boolean;
  get(key: string): Promise<string | null>;
  put(key: string, uri: string): Promise<void>;
  forget(): Promise<void>;
};

/** Read a cached rendering, or null. Never throws — a broken cache must not break the Listen button. */
export async function getCachedNarration(key: string): Promise<string | null> {
  try {
    return await cacheStore.get(key);
  } catch {
    return null;
  }
}

/** Store a rendering. Never throws: failing to cache costs quota, not correctness. */
export async function putCachedNarration(key: string, uri: string): Promise<void> {
  try {
    await cacheStore.put(key, uri);
  } catch {
    /* full, blocked, or private mode — the audio still plays, it just costs again next time */
  }
}

/** Erasure for the cache. Deliberate only — nothing in the app calls this on a timer. */
export async function forgetCachedNarration(): Promise<void> {
  try {
    await cacheStore.forget();
  } catch {
    /* nothing to do */
  }
}

export const narrationCachePersists = (): boolean => cacheStore.persists;
