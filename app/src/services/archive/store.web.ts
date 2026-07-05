// Web recordings store — durable IndexedDB.
//
// On web, expo-audio hands back a `blob:` object URL that dies on refresh, so persistence
// means storing the actual audio Blob. Each recording is one row keyed by id, holding its
// metadata + the audio bytes; a refresh reloads them, and delete removes the row (Blob
// included) — real POPIA erasure. If IndexedDB is unavailable (e.g. some private-mode
// browsers), we degrade to in-session memory and report persists:false rather than crash.

import { RecordingMeta, RecordingsStore, sortNewestFirst } from "./recordings";

const DB_NAME = "ubuntu-heritage-archive";
const STORE = "recordings";
const VERSION = 1;

type Row = RecordingMeta & { blob: Blob };

const available = typeof indexedDB !== "undefined";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx<T>(mode: IDBTransactionMode, run: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const req = run(db.transaction(STORE, mode).objectStore(STORE));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      })
  );
}

function stripBlob(row: Row): RecordingMeta {
  const { blob, ...meta } = row;
  return meta;
}

// In-session fallback if IndexedDB is missing.
let mem: RecordingMeta[] = [];
const memUris = new Map<string, string>();

// Playback hands out object URLs; revoke the previous one so we don't leak on repeat plays.
let lastObjectUrl: string | null = null;

export const recordingsStore: RecordingsStore = {
  persists: available,

  async load() {
    if (!available) return sortNewestFirst(mem);
    const rows = (await tx<Row[]>("readonly", (s) => s.getAll() as IDBRequest<Row[]>)) ?? [];
    return sortNewestFirst(rows.map(stripBlob));
  },

  async save(meta, sourceUri) {
    if (!available) {
      mem = [meta, ...mem.filter((m) => m.id !== meta.id)];
      memUris.set(meta.id, sourceUri);
      return;
    }
    const blob = await fetch(sourceUri).then((r) => r.blob());
    await tx("readwrite", (s) => s.put({ ...meta, blob } as Row));
  },

  async remove(id) {
    if (!available) {
      mem = mem.filter((m) => m.id !== id);
      memUris.delete(id);
      return;
    }
    await tx("readwrite", (s) => s.delete(id));
  },

  async rename(id, title) {
    if (!available) {
      mem = mem.map((m) => (m.id === id ? { ...m, title } : m));
      return;
    }
    const row = await tx<Row | undefined>("readonly", (s) => s.get(id) as IDBRequest<Row | undefined>);
    if (row) await tx("readwrite", (s) => s.put({ ...row, title } as Row));
  },

  async getPlaybackUri(id) {
    if (!available) return memUris.get(id) ?? null;
    const row = await tx<Row | undefined>("readonly", (s) => s.get(id) as IDBRequest<Row | undefined>);
    if (!row) return null;
    if (lastObjectUrl) URL.revokeObjectURL(lastObjectUrl);
    lastObjectUrl = URL.createObjectURL(row.blob);
    return lastObjectUrl;
  },
};
