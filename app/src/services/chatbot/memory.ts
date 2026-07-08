// Conversation memory for the "Ask Ubuntu" chatbot. Device-local ONLY — the transcript is never
// uploaded anywhere (POPIA: it may contain things the user typed about themselves). On web it persists
// in localStorage so the conversation survives a refresh; on native it lives in-memory for the session
// (a durable native store can follow the Community Archive's WatermelonDB path later). "New chat" is a
// real erasure — it removes the stored transcript, not just hides it.

import { Platform } from "react-native";

export type StoredTurn = { role: "user" | "assistant"; text: string; sources?: string[] };

const KEY = "ubuntu-heritage.chat.v1";
const MAX_TURNS = 40; // cap what we persist so storage never grows unbounded

// In-memory fallback (native, or web with storage disabled).
let mem: StoredTurn[] = [];

function ls(): Storage | null {
  try {
    if (Platform.OS === "web" && typeof globalThis !== "undefined" && (globalThis as any).localStorage) {
      return (globalThis as any).localStorage as Storage;
    }
  } catch {}
  return null;
}

/** Load the saved conversation (empty if none / unreadable). */
export function loadChat(): StoredTurn[] {
  const store = ls();
  if (store) {
    try {
      const raw = store.getItem(KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return mem;
}

/** Persist the conversation (trimmed to the last MAX_TURNS). */
export function saveChat(turns: StoredTurn[]): void {
  const trimmed = turns.slice(-MAX_TURNS);
  const store = ls();
  if (store) {
    try {
      store.setItem(KEY, JSON.stringify(trimmed));
      return;
    } catch {
      // storage full / blocked → fall through to memory
    }
  }
  mem = trimmed;
}

/** Erase the conversation everywhere it's stored (device-local). */
export function clearChat(): void {
  const store = ls();
  if (store) {
    try {
      store.removeItem(KEY);
    } catch {}
  }
  mem = [];
}
