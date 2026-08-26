import { useCallback, useEffect, useRef, useState } from "react";
import { progressStore } from "./store";
import {
  emptyProgress,
  completeStage,
  awardCard,
  stampCountry,
  setWatched,
  recordQuiz,
  touchStreak,
  todayISO,
  type Progress,
} from "./progress";

// The app-wide handle on device-local progress (D5). One instance lives in App and is passed down,
// so the header's Passport chip, the Journey trail and the resume bar all read the same numbers.
//
// Writes go through `apply`: it runs a pure reducer, saves, and — because every reducer returns the
// SAME object when nothing changed — skips both the state update and the disk write on a no-op.
// That is what stops "collect this card" firing a render loop when the card is already held.

export type ProgressApi = {
  progress: Progress;
  /** False while the first load is in flight, so the UI can avoid flashing zeros. */
  ready: boolean;
  /** Whether progress survives a refresh on this platform (web: yes; native: not yet). */
  persists: boolean;
  completeStage: (id: string, stars?: number) => void;
  awardCard: (cardId: string) => void;
  stampCountry: (code: string) => void;
  setWatched: (moduleId: string, fraction: number) => void;
  recordQuiz: (id: string, correct: number, total: number) => void;
  /** Count today towards the streak. Safe to call repeatedly. */
  touchToday: () => void;
  /** Erasure — forget everything on this device. */
  reset: () => void;
};

export function useProgress(): ProgressApi {
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [ready, setReady] = useState(false);
  // Mirrors `progress` so `apply` can read the latest value without being re-created on every
  // change (which would re-run any effect depending on these callbacks).
  const ref = useRef(progress);
  ref.current = progress;

  useEffect(() => {
    let alive = true;
    progressStore
      .load()
      .then((p) => {
        if (!alive) return;
        setProgress(p);
      })
      .catch(() => {
        /* a failed read is not fatal — start clean */
      })
      .finally(() => {
        if (alive) setReady(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  const apply = useCallback((fn: (p: Progress) => Progress) => {
    const next = fn(ref.current);
    if (next === ref.current) return; // reducer said nothing changed
    ref.current = next;
    setProgress(next);
    void progressStore.save(next).catch(() => {
      /* keep the in-memory value; the store already degrades on its own */
    });
  }, []);

  return {
    progress,
    ready,
    persists: progressStore.persists,
    completeStage: useCallback((id, stars) => apply((p) => completeStage(p, id, stars)), [apply]),
    awardCard: useCallback((cardId) => apply((p) => awardCard(p, cardId)), [apply]),
    stampCountry: useCallback((code) => apply((p) => stampCountry(p, code)), [apply]),
    setWatched: useCallback((m, f) => apply((p) => setWatched(p, m, f)), [apply]),
    recordQuiz: useCallback((id, c, t) => apply((p) => recordQuiz(p, id, c, t)), [apply]),
    touchToday: useCallback(() => apply((p) => touchStreak(p, todayISO())), [apply]),
    reset: useCallback(() => {
      const fresh = emptyProgress();
      ref.current = fresh;
      setProgress(fresh);
      void progressStore.clear().catch(() => {});
    }, []),
  };
}
