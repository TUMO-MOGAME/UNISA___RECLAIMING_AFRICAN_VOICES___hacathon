import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from "expo-audio";
import { Icon } from "../ui";
import { colors, spacing, radius, fonts } from "../theme/tokens";
import { t } from "../i18n";
import type { LangCode } from "../i18n";
import { PressScale } from "./Motion";

// A play-once audio row (poems, praise poetry, recordings): plays a bundled track ONCE through
// (no loop); when it ends the row becomes "Replay" and the listener restarts it themselves.
// Used by the president praise poem and the National Days poems — one implementation, one look.
//
// Correctness notes (from the audit):
// • End detection is a duration timer (on web the player's finished flag arrives via throttled
//   status updates and is dropped). The timer measures from `startAtRef` — recorded at press time —
//   NOT from the throttled status snapshot, which is stale right after a Replay seekTo(0) and
//   would otherwise flip the row to "done" ~300ms into an audible replay.
// • Only one row plays at a time: a module-level focus registry pauses whichever row was playing
//   (and fixes its label) before a new one starts.

const REPLAY = { en: "Replay", tn: "Boeletsa", af: "Speel weer", zu: "Phinda", xh: "Phinda", nso: "Boeletša", st: "Pheta", ss: "Phindza", ts: "Phindha", nr: "Buyelela", ve: "Dovholola" };

// Whoever is playing registers a stop callback here; a new player calls it before starting.
let stopActive: (() => void) | null = null;

export function PlayOnceRow({
  source,
  title,
  by,
  lang,
  onPhase,
  compact,
}: {
  /** Bundled audio (require) — static asset, no API quota, no PII. */
  source: number;
  /** Localized row title, e.g. "Praise poem" / "Izibongo". */
  title: string;
  /** Attribution — the performer/poet's name. */
  by?: string;
  lang: LangCode;
  /** Observe playback state — e.g. to show a video while the poem plays. */
  onPhase?: (phase: "idle" | "playing" | "paused" | "done") => void;
  /** Icon-only variant: just the circular play/pause/replay button (no title/attribution row). */
  compact?: boolean;
}) {
  const player = useAudioPlayer(source);
  const status = useAudioPlayerStatus(player);
  const loaded = !!status?.isLoaded;
  const duration = status?.duration ?? 0;
  const [phase, setPhase] = useState<"idle" | "playing" | "paused" | "done">("idle");
  const startAtRef = useRef(0); // playback position when play was pressed — drives the end timer

  // report every phase change to the observer (covers presses, natural end, and focus-stealing)
  const onPhaseRef = useRef(onPhase);
  onPhaseRef.current = onPhase;
  useEffect(() => {
    onPhaseRef.current?.(phase);
  }, [phase]);

  // stable identity for the focus registry; body always calls the latest state/player
  const stopImpl = useRef(() => {});
  stopImpl.current = () => {
    try {
      player.pause();
    } catch {}
    setPhase("paused");
  };
  const stopSelf = useRef(() => stopImpl.current()).current;

  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try {
      player.loop = false; // plays once — replay is the listener's choice
      player.volume = 1;
    } catch {}
  }, [loaded, player]);
  // mark done at the end of the track, measured from where this play actually started
  useEffect(() => {
    if (phase !== "playing" || !loaded || !isFinite(duration) || duration <= 0) return;
    const remainingMs = Math.max(0, (duration - startAtRef.current) * 1000) + 300;
    const timer = setTimeout(() => setPhase("done"), remainingMs);
    return () => clearTimeout(timer);
  }, [phase, loaded, duration]);
  useEffect(() => {
    return () => {
      if (stopActive === stopSelf) stopActive = null;
      try {
        player.pause();
      } catch {}
    };
  }, [player, stopSelf]);

  const onPress = () => {
    try {
      if (phase === "playing") {
        startAtRef.current = status?.currentTime ?? 0; // remember where we paused
        player.pause();
        setPhase("paused");
        return;
      }
      // pause whichever other row is playing before this one starts
      if (stopActive && stopActive !== stopSelf) stopActive();
      stopActive = stopSelf;
      if (phase === "done" || phase === "idle") {
        if (phase === "done") player.seekTo(0);
        startAtRef.current = 0;
      }
      // paused → startAtRef already holds the pause position
      player.play();
      setPhase("playing");
    } catch {}
  };

  const icon =
    phase === "playing" ? (
      <Icon.Pause size={19} color={colors.gold} />
    ) : phase === "done" ? (
      <Icon.RotateCcw size={19} color={colors.gold} />
    ) : (
      <Icon.Play size={19} color={colors.gold} fill={colors.gold} />
    );

  if (compact) {
    // Bare icon only — no circle — with padding kept for a comfortable tap target.
    return (
      <PressScale style={s.iconBare} onPress={onPress} accessibilityLabel={`${title}${by ? ` — ${by}` : ""}`}>
        {icon}
      </PressScale>
    );
  }

  return (
    <PressScale style={s.row} onPress={onPress} accessibilityLabel={`${title}${by ? ` — ${by}` : ""}`}>
      <View style={s.iconBare}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={s.title}>{phase === "done" ? t(REPLAY, lang) : title}</Text>
        {by ? <Text style={s.by}>{by}</Text> : null}
      </View>
      <Icon.Volume2 size={20} color={colors.gold} />
    </PressScale>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: spacing.md, backgroundColor: "rgba(235,164,60,0.08)", borderWidth: 1, borderColor: "rgba(235,164,60,0.4)", borderRadius: radius.md, padding: spacing.md },
  iconWrap: { width: 42, height: 42, borderRadius: 21, backgroundColor: "rgba(235,164,60,0.16)", borderWidth: 1, borderColor: "rgba(235,164,60,0.5)", alignItems: "center", justifyContent: "center" },
  iconBare: { padding: 10, alignItems: "center", justifyContent: "center" },
  title: { color: "#fff", fontFamily: fonts.bodyBold, fontSize: 14 },
  by: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.serifItalic, fontSize: 12, marginTop: 2 },
});
