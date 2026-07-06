import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Pressable, Animated, StyleSheet, SafeAreaView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from "expo-audio";
import { Lang } from "../content/types";
import { JourneySlide } from "../content/journey";
import { soundtrackClips } from "../content/soundtrackClips";
import { sharedPlaylist } from "../services/soundtrack";
import { t } from "../i18n";
import { Icon } from "../ui";
import { spacing, fonts } from "../theme/tokens";

// A reusable full-screen cinematic "journey" — slides cross-fade automatically (blurred fill behind a
// letterbox-safe title card so baked-in headlines are never cropped), a calm track loops underneath,
// and a stories-style progress bar shows the pace. Tap to pause/resume; prev/next; mute; close. Used
// by the Cultural Atlas, Provinces and Presidents. Images are AI-illustrated heritage interpretations.

const DURATION = 6500; // ms each slide dwells before auto-advancing

// One non-repeating soundtrack playlist shared across every journey for the whole session.
const playlist = sharedPlaylist(soundtrackClips.length);

const UI = {
  journey: { en: "The Journey", tn: "Loeto", af: "Die Reis", zu: "Uhambo", xh: "Uhambo", nso: "Leeto", st: "Leeto", ss: "Luhambo", ts: "Riendzo", nr: "Ikhambo", ve: "Lwendo" },
  replay: { en: "Replay", tn: "Boeletsa", af: "Speel weer", zu: "Phinda", xh: "Phinda", nso: "Boeletša", st: "Pheta", ss: "Phindza", ts: "Phindha", nr: "Buyelela", ve: "Dovholola" },
  note: { en: "Illustrated interpretations", tn: "Ditshwantsho tsa botaki", af: "Geïllustreerde interpretasies", zu: "Ukudweba okuhunyushiwe", xh: "Imizobo eguqulweyo", nso: "Ditshwantsho tša tlhathollo", st: "Ditshwantsho tsa tlhaloso", ss: "Imidvwebo lehunyushiwe", ts: "Swifaniso swo hlamuseriwa", nr: "Imidwebo ehlathululiweko", ve: "Zwifanyiso zwa ṱhalutshedzo" },
  // Totems story — the animal photos are real; the sounds are AI-generated interpretations (labelled).
  noteSound: { en: "Real photos · AI-generated sounds", tn: "Ditshwantsho tsa nnete · medumo e e dirilweng ke AI", af: "Werklike foto's · KI-gegenereerde klanke", zu: "Izithombe zangempela · imisindo eyenziwe yi-AI", xh: "Iifoto zokwenene · izandi ezenziwe yi-AI", nso: "Diswantšho tša nnete · medumo ye e dirilwego ke AI", st: "Dinepe tsa 'nete · medumo e entsoeng ke AI", ss: "Titfombe tangempela · imisindvo leyentiwe yi-AI", ts: "Swifaniso swa xiviri · mimpfumawulo leyi endliweke hi AI", nr: "Iifoto zamambala · imisindo eyenziwe yi-AI", ve: "Zwifanyiso zwa vhukuma · mibvumo yo itwaho nga AI" },
};

export function Journey({ slides, lang, onClose }: { slides: JourneySlide[]; lang: Lang; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);

  // When slides carry their own sound (the Totems story), those play instead of the music bed.
  const hasSound = useMemo(() => slides.some((sl) => !!sl.sound), [slides]);

  const ended = index === slides.length - 1 && !playing;

  // ── cross-fade layers ────────────────────────────────────────────────
  const opacities = useRef(slides.map((_, i) => new Animated.Value(i === 0 ? 1 : 0))).current;
  useEffect(() => {
    Animated.parallel(
      opacities.map((op, i) => Animated.timing(op, { toValue: i === index ? 1 : 0, duration: 600, useNativeDriver: true }))
    ).start();
  }, [index, opacities]);

  // ── stories-style progress + auto-advance ────────────────────────────
  // Pause keeps the slide's elapsed dwell (in elapsedRef), so resume plays only the REMAINDER —
  // the progress bar no longer jumps back to zero and the slide doesn't dwell a second full 6.5s.
  const seg = useRef(new Animated.Value(0)).current;
  const elapsedRef = useRef(0);
  const lastIndexRef = useRef(index);
  useEffect(() => {
    if (lastIndexRef.current !== index) {
      lastIndexRef.current = index;
      elapsedRef.current = 0; // a new slide starts its dwell from the top
    }
    if (!playing) return;
    const remaining = Math.max(0, DURATION - elapsedRef.current);
    const startedAt = Date.now();
    seg.setValue(elapsedRef.current / DURATION);
    const anim = Animated.timing(seg, { toValue: 1, duration: remaining, useNativeDriver: false });
    anim.start();
    const timer = setTimeout(() => {
      elapsedRef.current = 0;
      setIndex((i) => {
        if (i >= slides.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, remaining);
    return () => {
      clearTimeout(timer);
      anim.stop();
      // accumulate how much of this slide has actually played (pause keeps it, advance resets it)
      elapsedRef.current = Math.min(DURATION, elapsedRef.current + (Date.now() - startedAt));
    };
  }, [index, playing, seg, slides.length]);

  // ── music: a shared, non-repeating playlist ──────────────────────────
  // Every clip that starts playing consumes the next unused clip from the shared sequence — both
  // when this journey opens and each time a clip ends — so no clip is ever reused across journeys
  // until all 202 have played, then it wraps. useState's lazy initialiser runs playlist.next()
  // exactly once (not on every render), giving this journey its own fresh starting clip.
  // The player is built from that starting clip and never rebuilt by the hook — we switch clips
  // only via music.replace() (useAudioPlayer recreates the player if its source arg changes).
  const [initialClip] = useState(() => soundtrackClips[playlist.next()]);
  const music = useAudioPlayer(initialClip);
  const musicStatus = useAudioPlayerStatus(music);
  const loaded = !!musicStatus?.isLoaded;
  const duration = musicStatus?.duration ?? 0;
  const currentTime = musicStatus?.currentTime ?? 0;
  const wantAudio = playing && !muted && !hasSound; // music bed only when slides have no own sound
  const armedRef = useRef(false); // true once the current clip is genuinely underway (guards one handoff per clip)

  // ── per-slide sound (e.g. animal calls) — plays instead of the music bed ──────────────
  const sfx = useAudioPlayer(null);
  const sfxWant = playing && !muted && hasSound;
  // Load + play the current slide's sound whenever the slide changes.
  useEffect(() => {
    if (!hasSound) return;
    const snd = slides[index]?.sound;
    if (snd == null) return;
    try {
      sfx.replace(snd);
      if (sfxWant) sfx.play();
    } catch {}
    // sfxWant intentionally omitted — pause/resume is handled by the effect below.
  }, [index, hasSound]); // eslint-disable-line react-hooks/exhaustive-deps
  // Pause/resume the current sound with the story's play state.
  useEffect(() => {
    if (!hasSound) return;
    try {
      if (sfxWant) sfx.play();
      else sfx.pause();
    } catch {}
  }, [sfxWant, hasSound, sfx]);
  useEffect(() => () => {
    try {
      sfx.pause();
    } catch {}
  }, [sfx]);

  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try {
      music.loop = false; // clips don't loop — we hand off to the next clip instead
      music.volume = 0.6;
    } catch {}
  }, [loaded, music]);
  useEffect(() => {
    if (!loaded) return;
    try {
      if (wantAudio) music.play();
      else music.pause();
    } catch {
      // autoplay may be blocked until a tap — tapping the screen (pause/resume) starts it
    }
  }, [loaded, wantAudio, music]);
  // Hand off to the next clip just before the current one ends, so a journey longer than one clip
  // keeps playing instead of falling silent. We watch the clip's position rather than the player's
  // "didJustFinish"/ended flag: at the true end the audio element reports paused, which would tear
  // this effect down before it could act, and on web that finish flag is dropped by status
  // throttling anyway. Gating on `wantAudio` (the story's own play state, which stays true across
  // the whole journey) — not the audio element's — is what keeps the handoff alive at clip's end.
  // `armedRef` ensures exactly one handoff per clip: it arms once the clip is genuinely underway
  // (position in its first half) and disarms on handoff, so a stale end-position reading arriving
  // right after we swap clips can't trigger a second, clip-skipping handoff.
  const HANDOFF_LEAD_SEC = 1; // switch ~1s before the end — within each clip's baked-in fade-out
  useEffect(() => {
    if (!loaded || !wantAudio || !isFinite(duration) || duration <= 0) return;
    if (currentTime < duration * 0.5) armedRef.current = true;
    if (armedRef.current && currentTime >= duration - HANDOFF_LEAD_SEC) {
      armedRef.current = false;
      try {
        music.replace(soundtrackClips[playlist.next()]);
        music.play();
      } catch {}
    }
  }, [loaded, wantAudio, duration, currentTime, music]);
  useEffect(() => {
    return () => {
      try {
        music.pause();
      } catch {}
    };
  }, [music]);

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(slides.length - 1, i + 1));
  const toggle = () => {
    if (ended) {
      setIndex(0);
      setPlaying(true);
    } else {
      setPlaying((p) => !p);
    }
  };

  const caption = slides[index]?.caption;

  return (
    <View style={s.root}>
      <Pressable style={StyleSheet.absoluteFill} onPress={toggle} accessibilityLabel="Pause or resume">
        {/* Windowed mount: only slides within one step of the current index render their two
            full-screen image layers — an Atlas journey is ~50 slides (=100 bitmaps, half blurred),
            which would exhaust memory on native if all were mounted. The Animated opacity values
            persist for every slide, so the cross-fade is unaffected. */}
        {slides.map((sl, i) =>
          Math.abs(i - index) <= 1 ? (
            <Animated.View key={`${sl.id}-${i}`} style={[StyleSheet.absoluteFill, { opacity: opacities[i] }]} pointerEvents="none">
              <Image source={sl.image} style={StyleSheet.absoluteFill} contentFit="cover" blurRadius={40} transition={0} cachePolicy="disk" />
              <View style={s.blurDim} />
              <Image source={sl.image} style={StyleSheet.absoluteFill} contentFit="contain" transition={0} cachePolicy="disk" />
            </Animated.View>
          ) : null
        )}
      </Pressable>

      {/* top gradient + progress + close (chrome sits inside the safe area on notched phones) */}
      <LinearGradient colors={["rgba(0,0,0,0.55)", "rgba(0,0,0,0)"]} style={s.topScrim} pointerEvents="none" />
      <SafeAreaView style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <View style={s.topBar} pointerEvents="box-none">
        <View style={s.segRow}>
          {slides.map((sl, i) => (
            <View key={`${sl.id}-${i}`} style={s.segTrack}>
              <Animated.View
                style={[
                  s.segFill,
                  { width: i < index ? "100%" : i > index ? "0%" : seg.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) },
                ]}
              />
            </View>
          ))}
        </View>
        <View style={s.topRow}>
          <Text style={s.kicker}>{t(UI.journey, lang).toUpperCase()}</Text>
          <Pressable onPress={onClose} hitSlop={12} style={s.iconBtn} accessibilityLabel="Close">
            <Icon.X size={22} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>

      {/* caption + controls */}
      <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]} style={s.bottomScrim} pointerEvents="none" />
      <View style={s.bottom} pointerEvents="box-none">
        {slides[index]?.title ? <Text style={s.title}>{slides[index].title}</Text> : null}
        {caption ? <Text style={s.caption}>{t(caption, lang)}</Text> : null}
        <View style={s.controls}>
          <Pressable onPress={goPrev} hitSlop={10} style={s.iconBtn} accessibilityLabel="Previous">
            <Icon.ChevronLeft size={26} color="#FFFFFF" strokeWidth={2.4} />
          </Pressable>
          <Pressable onPress={toggle} hitSlop={10} style={s.playBtn} accessibilityLabel={playing ? "Pause" : "Play"}>
            {ended ? (
              <Text style={s.replayText}>{t(UI.replay, lang)}</Text>
            ) : playing ? (
              <Icon.Pause size={24} color="#000000" fill="#000000" />
            ) : (
              <Icon.Play size={24} color="#000000" fill="#000000" />
            )}
          </Pressable>
          <Pressable onPress={goNext} hitSlop={10} style={s.iconBtn} accessibilityLabel="Next">
            <Icon.ChevronRight size={26} color="#FFFFFF" strokeWidth={2.4} />
          </Pressable>
          <Pressable onPress={() => setMuted((m) => !m)} hitSlop={10} style={s.iconBtn} accessibilityLabel={muted ? "Unmute" : "Mute"}>
            {muted ? <Icon.VolumeX size={22} color="#FFFFFF" /> : <Icon.Volume2 size={22} color="#FFFFFF" />}
          </Pressable>
        </View>
        <Text style={s.note}>{hasSound ? t(UI.noteSound, lang) : t(UI.note, lang)}</Text>
      </View>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000000" },
  blurDim: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.45)" },

  topScrim: { position: "absolute", top: 0, left: 0, right: 0, height: 130 },
  topBar: { position: "absolute", top: 0, left: 0, right: 0, paddingHorizontal: spacing.md, paddingTop: spacing.md },
  segRow: { flexDirection: "row", gap: 5 },
  segTrack: { flex: 1, height: 3, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.28)", overflow: "hidden" },
  segFill: { height: 3, backgroundColor: "#FFFFFF" },
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.md },
  kicker: { color: "#FFFFFF", fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 3, opacity: 0.9 },

  bottomScrim: { position: "absolute", bottom: 0, left: 0, right: 0, height: 240 },
  bottom: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, alignItems: "center" },
  title: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 40, lineHeight: 44, letterSpacing: -0.5, textAlign: "center", textTransform: "uppercase", marginBottom: spacing.sm },
  caption: { color: "#FFFFFF", fontFamily: fonts.serifItalic, fontSize: 17, lineHeight: 25, textAlign: "center", marginBottom: spacing.lg, maxWidth: 620 },
  controls: { flexDirection: "row", alignItems: "center", gap: spacing.xl },
  iconBtn: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  playBtn: { minWidth: 56, height: 56, paddingHorizontal: spacing.md, borderRadius: 28, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" },
  replayText: { color: "#000000", fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 0.5 },
  note: { color: "rgba(255,255,255,0.4)", fontFamily: fonts.body, fontSize: 11, letterSpacing: 0.5, marginTop: spacing.md },
});
