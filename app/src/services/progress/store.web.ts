// Web progress store — localStorage.
//
// Progress is a few hundred bytes of JSON, so localStorage is the right size of tool here; the
// Archive needs IndexedDB only because it stores audio Blobs. A refresh reloads it, and "reset my
// progress" removes the key outright.
//
// Every access is wrapped: private-mode browsers, disabled site data and quota errors all throw on
// localStorage, and none of those is a reason to break the app. When it is unavailable we degrade to
// in-session memory and report persists:false, so the Passport can say so honestly.

import { emptyProgress, normalise, type Progress, type ProgressStore } from "./progress";

const KEY = "ubuntu-heritage-progress";

function usable(): boolean {
  try {
    if (typeof localStorage === "undefined") return false;
    const probe = `${KEY}:probe`;
    localStorage.setItem(probe, "1");
    localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

const available = usable();
let memory: Progress = emptyProgress();

export const progressStore: ProgressStore = {
  persists: available,

  async load() {
    if (!available) return memory;
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return emptyProgress();
      return normalise(JSON.parse(raw));
    } catch {
      // A corrupt or half-written value must not brick the app — start clean instead.
      return emptyProgress();
    }
  },

  async save(p) {
    memory = p;
    if (!available) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(p));
    } catch {
      // Quota or a browser that blocks writes: keep the session copy and carry on.
    }
  },

  async clear() {
    memory = emptyProgress();
    if (!available) return;
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* nothing to do — the value is gone from memory either way */
    }
  },
};
