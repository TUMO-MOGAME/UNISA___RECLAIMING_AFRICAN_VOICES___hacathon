// Native / default progress store — in-session only.
//
// Metro resolves `./store` to store.web.ts on web (durable localStorage) and to THIS file
// everywhere else. This project has no AsyncStorage or expo-file-system dependency yet, so on a
// native build progress lives for the session; `persists: false` lets the Passport say so plainly
// rather than implying a guarantee we do not keep. This mirrors the Community Archive's native
// fallback (services/archive/store.ts) and lands durably alongside it.

import { emptyProgress, type Progress, type ProgressStore } from "./progress";

let current: Progress = emptyProgress();

export const progressStore: ProgressStore = {
  persists: false,

  async load() {
    return current;
  },

  async save(p) {
    current = p;
  },

  async clear() {
    current = emptyProgress();
  },
};
