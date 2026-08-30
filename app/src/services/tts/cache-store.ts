// Native / default narration cache — in-session only.
//
// Metro resolves `./cache-store` to cache-store.web.ts on web (durable IndexedDB) and to THIS file
// everywhere else. There is no AsyncStorage or expo-file-system dependency in this project yet, so
// on native a cached clip lives for the session: re-pressing Listen on the same passage is free,
// but re-opening the app pays again. `persists: false` lets anything that asks say so plainly
// rather than implying a guarantee we do not keep — the same posture as the progress store and the
// Community Archive's native fallback. Lands durably alongside those (T024).

import type { NarrationCacheStore } from "./cache";

const memory = new Map<string, string>();

/** A session cache still has to be bounded — data URIs are the audio itself, not a pointer to it. */
const MAX_ENTRIES = 40;

export const cacheStore: NarrationCacheStore = {
  persists: false,

  async get(key) {
    return memory.get(key) ?? null;
  },

  async put(key, uri) {
    if (memory.size >= MAX_ENTRIES) {
      // Oldest insertion first — Map preserves it, and this is a cache, not a working set.
      const oldest = memory.keys().next().value;
      if (oldest !== undefined) memory.delete(oldest);
    }
    memory.set(key, uri);
  },

  async forget() {
    memory.clear();
  },
};
