// Native / default recordings store — in-session only.
//
// Metro resolves `./store` to store.web.ts on web (durable IndexedDB) and to THIS file
// everywhere else. Real device persistence on native (survive an app restart) lands with
// WatermelonDB + expo-file-system (T024); until then recordings live for the session, and
// `persists: false` lets the UI say so honestly rather than implying a false guarantee.

import {
  RecordingMeta,
  RecordingsStore,
  prepend,
  removeById,
  renameById,
  updateById,
  sortNewestFirst,
} from "./recordings";

let metas: RecordingMeta[] = [];
const uris = new Map<string, string>();

export const recordingsStore: RecordingsStore = {
  persists: false,

  async load() {
    return sortNewestFirst(metas);
  },

  async save(meta, sourceUri) {
    metas = prepend(metas, meta);
    uris.set(meta.id, sourceUri);
  },

  async remove(id) {
    metas = removeById(metas, id);
    uris.delete(id);
  },

  async rename(id, title) {
    metas = renameById(metas, id, title);
  },

  async update(id, patch) {
    metas = updateById(metas, id, patch);
  },

  async getPlaybackUri(id) {
    return uris.get(id) ?? null;
  },
};
