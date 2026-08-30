// Web narration cache — durable IndexedDB.
//
// Why IndexedDB and not localStorage: a clip is the audio itself, base64 in a data URI. One passage
// at 32 kbps is ~200 KB, and localStorage's ~5 MB ceiling would be gone inside a chapter. The
// Community Archive reaches for IndexedDB for the same reason (services/archive/store.web.ts).
//
// What this buys: a reader who came back tomorrow does not spend a second month's quota hearing the
// passage they heard today. That is the difference between a Listen button that works all month and
// one that stops working on the 12th.
//
// If IndexedDB is missing (some private-mode browsers), we degrade to in-session memory and report
// persists:false rather than crash — the Listen button still works, it just costs quota again.

import type { NarrationCacheStore } from "./cache";

const DB_NAME = "ubuntu-heritage-narration";
const STORE = "clips";
const VERSION = 1;

/** Rough ceiling on stored clips, evicted oldest-first. ~40 passages ≈ 8 MB of speech. */
const MAX_ENTRIES = 200;

type Row = { key: string; uri: string; storedAt: number };

const available = typeof indexedDB !== "undefined";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const s = db.createObjectStore(STORE, { keyPath: "key" });
        s.createIndex("storedAt", "storedAt");
      }
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

// In-session fallback when IndexedDB is unavailable.
const mem = new Map<string, string>();

/**
 * `storedAt` is a coarse insertion counter, NOT a clock reading — it exists only to evict the
 * oldest clip and is deliberately not a timestamp of when anyone was reading.
 */
let seq = 0;

async function evictIfFull(): Promise<void> {
  const count = await tx<number>("readonly", (s) => s.count());
  if (count < MAX_ENTRIES) return;
  const rows = (await tx<Row[]>("readonly", (s) => s.getAll() as IDBRequest<Row[]>)) ?? [];
  rows.sort((a, b) => a.storedAt - b.storedAt);
  const doomed = rows.slice(0, Math.max(1, rows.length - MAX_ENTRIES + 1));
  for (const r of doomed) await tx("readwrite", (s) => s.delete(r.key));
}

export const cacheStore: NarrationCacheStore = {
  persists: available,

  async get(key) {
    if (!available) return mem.get(key) ?? null;
    const row = await tx<Row | undefined>("readonly", (s) => s.get(key) as IDBRequest<Row | undefined>);
    return row?.uri ?? null;
  },

  async put(key, uri) {
    if (!available) {
      mem.set(key, uri);
      return;
    }
    await evictIfFull();
    await tx("readwrite", (s) => s.put({ key, uri, storedAt: seq++ } satisfies Row));
  },

  async forget() {
    mem.clear();
    if (!available) return;
    await tx("readwrite", (s) => s.clear());
  },
};
