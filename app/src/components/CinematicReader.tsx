import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Animated,
  useWindowDimensions,
} from "react-native";
import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from "expo-audio";
import { Module, Lang, Mode } from "../content/types";
import { sceneImageSource } from "../content/images";
import { soundtrackClips } from "../content/soundtrackClips";
import { sharedPlaylist } from "../services/soundtrack";
import { useTts } from "../services/tts";
import { t, resolveText, languageByCode } from "../i18n";
import { draftText } from "../content/drafts";
import { LinearGradient } from "expo-linear-gradient";
import { SceneImage } from "./SceneImage";
import { LanguagePicker } from "./LanguagePicker";
import { colors, spacing, radius, type, fonts } from "../theme/tokens";
import { Icon } from "../ui";

// The cinematic Reader: full-bleed AI background + scrim + overlaid story text, with
// Child/Adult and Setswana/English toggles and scene navigation. The Phase-0 demo spine.
// The passage sits on a book "page" (spine + paper panel) that FLIPS on Next/Prev, and a clip
// from the shared soundtrack sequence plays underneath at a whisper volume — low enough to read,
// present enough to feel — ducking further whenever the Listen narration is speaking.

// One non-repeating soundtrack sequence shared with the Journeys — reading continues it.
const playlist = sharedPlaylist(soundtrackClips.length);
const READING_VOLUME = 0.12; // a whisper under the text
const DUCKED_VOLUME = 0.03; // under narration, almost silent

// Scene title in the shown language — human-reviewed copy first, then a machine draft (drafts.data.ts),
// else an honest English fallback. Keeps the title in-language alongside the body (which resolves the
// same way), so a translated passage doesn't sit under an English heading.
function sceneTitleText(module: Module, scene: Module["scenes"][number], lang: Lang) {
  return resolveText(scene.title, lang, draftText(module.id, scene.id, "title", lang)).text;
}

const UI = {
  child: {
    en: "Child", tn: "Bana", af: "Kind", zu: "Ingane", xh: "Umntwana",
    nso: "Ngwana", st: "Ngwana", ss: "Umntfwana", ts: "N'wana", nr: "Umntwana", ve: "Ṅwana",
  },
  adult: {
    en: "Adult", tn: "Bagolo", af: "Volwassene", zu: "Omdala", xh: "Omdala",
    nso: "Yo mogolo", st: "E moholo", ss: "Lomdzala", ts: "Lonkulu", nr: "Omdala", ve: "Muhulwane",
  },
  source: {
    en: "Source", tn: "Motswedi", af: "Bron", zu: "Umthombo", xh: "Umthombo",
    nso: "Mothopo", st: "Mohlodi", ss: "Umtfombo", ts: "Xihlovo", nr: "Umthombo", ve: "Tshiko",
  },
  prev: {
    en: "Back", tn: "Morago", af: "Terug", zu: "Emuva", xh: "Emva",
    nso: "Morago", st: "Morao", ss: "Emuva", ts: "Endzhaku", nr: "Emuva", ve: "Murahu",
  },
  next: {
    en: "Next", tn: "Pele", af: "Volgende", zu: "Okulandelayo", xh: "Okulandelayo",
    nso: "Tše di latelago", st: "E latelang", ss: "Lokulandzelako", ts: "Leswi landzelaka", nr: "Okulandelako", ve: "Zwi tevhelaho",
  },
  listen: {
    en: "Listen", tn: "Reetsa", af: "Luister", zu: "Lalela", xh: "Mamela",
    nso: "Theeletša", st: "Mamela", ss: "Lalela", ts: "Yingisela", nr: "Lalela", ve: "Thetshelesa",
  },
  stopListen: {
    en: "Stop", tn: "Emisa", af: "Stop", zu: "Misa", xh: "Yima",
    nso: "Emiša", st: "Emisa", ss: "Yima", ts: "Yimisa", nr: "Misa", ve: "Ima",
  },
  interpretation: {
    en: "AI image — artistic interpretation, not a historical photo.",
    tn: "Setshwantsho sa AI — kakanyo ya botaki, e seng senepe sa hisitori.",
    af: "KI-beeld — artistieke interpretasie, nie 'n historiese foto nie.",
    zu: "Isithombe se-AI — ukuhumusha kobuciko, hhayi isithombe somlando.",
    xh: "Umfanekiso we-AI — utoliko lobugcisa, hayi ifoto yembali.",
    nso: "Seswantšho sa AI — tlhathollo ya bokgabo, e sego senepe sa histori.",
    st: "Setshwantsho sa AI — tlhaloso ya bonono, eseng senepe sa histori.",
    ss: "Sitfombe se-AI — kuhumusha kwebuciko, hhayi sitfombe semlandvo.",
    ts: "Xifaniso xa AI — nhlamuselo ya vutshila, ku nga ri foto ya matimu.",
    nr: "Isithombe se-AI — ukuhlathulula kobuciko, ingasi ifoto yomlando.",
    ve: "Tshifanyiso tsha AI — ṱhalutshedzo ya vhutsila, hu si tshinepe tsha ḓivhazwakale.",
  },
};

export function CinematicReader({
  module,
  lang,
  onLangChange,
  country,
  onBack,
  onArchive,
}: {
  module: Module;
  lang: Lang;
  onLangChange: (l: Lang) => void;
  /** Selected country — orders the language picker to that country's languages. */
  country?: string;
  onBack?: () => void;
  onArchive?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("adult");
  const tts = useTts();
  const { width } = useWindowDimensions();
  const wide = width >= 760; // two-page spread vs single page
  // page-turn direction: +1 turning forward, -1 turning back
  const flipDir = useRef(1);
  const goTo = (next: number) => {
    flipDir.current = next > index ? 1 : -1;
    setIndex(next);
  };

  // ── ambient reading music — the shared clip sequence, at a whisper ───────
  const [ambientClip] = useState(() => soundtrackClips[playlist.next()]);
  const ambient = useAudioPlayer(ambientClip);
  const ambientStatus = useAudioPlayerStatus(ambient);
  const aLoaded = !!ambientStatus?.isLoaded;
  const aDur = ambientStatus?.duration ?? 0;
  const aTime = ambientStatus?.currentTime ?? 0;
  const armedRef = useRef(false);
  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
  }, []);
  useEffect(() => {
    if (!aLoaded) return;
    try {
      ambient.loop = false;
      ambient.volume = READING_VOLUME;
      ambient.play(); // may wait for the reader's first tap on web (autoplay policy)
    } catch {}
  }, [aLoaded, ambient]);
  // duck under the Listen narration so the voice stays clear
  useEffect(() => {
    if (!aLoaded) return;
    try {
      ambient.volume = tts.speaking ? DUCKED_VOLUME : READING_VOLUME;
    } catch {}
  }, [aLoaded, tts.speaking, ambient]);
  // hand off to the next unused clip just before this one ends (web-safe, same as the Journey)
  useEffect(() => {
    if (!aLoaded || !ambientStatus?.playing || !isFinite(aDur) || aDur <= 0) return;
    if (aTime < aDur * 0.5) armedRef.current = true;
    if (armedRef.current && aTime >= aDur - 1) {
      armedRef.current = false;
      try {
        ambient.replace(soundtrackClips[playlist.next()]);
        ambient.play();
      } catch {}
    }
  }, [aLoaded, ambientStatus?.playing, aDur, aTime, ambient]);
  useEffect(() => {
    return () => {
      try {
        ambient.pause();
      } catch {}
    };
  }, [ambient]);

  const scene = module.scenes[index];
  const imageSource = useMemo(
    () => sceneImageSource(module.id, scene.id, scene.imagePrompt, { seed: scene.seed }),
    [module.id, scene]
  );

  // Resolve the passage in the chosen language: human-reviewed copy first, then a pre-generated
  // machine draft (labelled), else an honest English fallback. `bodyRes.lang` is the language the
  // text is ACTUALLY in — we narrate in that, never mislabelling it.
  const field = mode === "child" ? "childText" : "text";
  const bodyLoc = mode === "child" ? scene.childText : scene.text;
  const bodyRes = resolveText(bodyLoc, lang, draftText(module.id, scene.id, field, lang));
  const body = bodyRes.text;

  // Stop narration when the text underneath it changes (scene, language, or reading level),
  // so we never keep reading a passage that's no longer on screen.
  useEffect(() => {
    tts.stop();
  }, [index, lang, mode]);

  return (
    <View style={styles.root}>
      <SceneImage source={imageSource} kenBurns />
      {/* cinematic scrim — legible at top (title) and bottom (nav), image breathes in the middle */}
      <LinearGradient
        colors={["rgba(0,0,0,0.72)", "rgba(0,0,0,0.28)", "rgba(0,0,0,0.9)"]}
        locations={[0, 0.42, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <SafeAreaView style={styles.safe}>
        {/* Top bar: title + language + mode toggles */}
        <View style={styles.topBar}>
          <View style={styles.titleWrap}>
            {onBack && (
              <Pressable onPress={onBack} style={styles.backBtn} hitSlop={10}>
                <Icon.ChevronLeft size={22} color={colors.sand} strokeWidth={2.4} />
              </Pressable>
            )}
            <View style={{ flexShrink: 1 }}>
              <Text style={styles.kicker}>
                {module.title} · {module.author}
              </Text>
              <Text style={styles.sceneTitle}>{sceneTitleText(module, scene, lang)}</Text>
            </View>
          </View>
          <View style={styles.toggles}>
            <LanguagePicker lang={lang} onChange={onLangChange} compact country={country} />
            <Toggle
              options={[
                { key: "adult", label: t(UI.adult, lang) },
                { key: "child", label: t(UI.child, lang) },
              ]}
              value={mode}
              onChange={(v) => setMode(v as Mode)}
            />
            <Pressable
              onPress={() => (tts.speaking ? tts.stop() : tts.speak(body, bodyRes.lang))}
              style={[styles.listenBtn, tts.speaking && styles.listenBtnActive]}
              accessibilityRole="button"
              accessibilityLabel={tts.speaking ? t(UI.stopListen, lang) : t(UI.listen, lang)}
            >
              {tts.speaking ? (
                <Icon.Square size={12} color={colors.night} fill={colors.night} />
              ) : (
                <Icon.Volume2 size={14} color={colors.sand} />
              )}
              <Text style={[styles.listenText, tts.speaking && styles.listenTextActive]}>
                {tts.speaking ? t(UI.stopListen, lang) : t(UI.listen, lang)}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* The book — paper spread (image plate + text page) with a real page turn */}
        <View style={styles.bookArea}>
          <Book
            index={index}
            dir={flipDir.current}
            wide={wide}
            renderLeft={(i) => <ImagePage module={module} i={i} lang={lang} />}
            renderRight={(i) => (
              <TextPage module={module} i={i} lang={lang} mode={mode} single={!wide} onArchive={onArchive} />
            )}
          />
        </View>

        {/* Scene nav */}
        <View style={styles.nav}>
          <NavButton
            label={t(UI.prev, lang)}
            dir="prev"
            disabled={index === 0}
            onPress={() => goTo(Math.max(0, index - 1))}
          />
          <Text style={styles.progress}>
            {index + 1} / {module.scenes.length}
          </Text>
          <NavButton
            label={t(UI.next, lang)}
            dir="next"
            disabled={index === module.scenes.length - 1}
            onPress={() => goTo(Math.min(module.scenes.length - 1, index + 1))}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

// ── The book — a turn.js-style flipbook (modelled on the turn.js page-fold behaviour) ───────────────
// Faithful to turn.js's model: a two-page SPREAD around a centre spine (image plate verso, text
// recto), and on a turn the RIGHT leaf rotates a full 180° over the spine — its BACK face carries
// the incoming left page (backfaceVisibility, exactly like turn.js's folded page) — landing to
// reveal the next spread which sits statically underneath. Fold + cast shadow gradients follow the
// leaf, and single-page display (narrow screens) folds with a plain paper backside instead.

function PaperPage({ side, pageNo, children }: { side: "left" | "right" | "single"; pageNo?: number; children: React.ReactNode }) {
  return (
    <View style={[styles.paper, side === "left" ? styles.paperLeft : side === "right" ? styles.paperRight : styles.paperSingle]}>
      <View style={styles.paperInner}>{children}</View>
      {side !== "single" && (
        <LinearGradient
          colors={side === "left" ? ["rgba(0,0,0,0)", "rgba(70,52,30,0.20)"] : ["rgba(70,52,30,0.20)", "rgba(0,0,0,0)"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.gutter, side === "left" ? { right: 0 } : { left: 0 }]}
          pointerEvents="none"
        />
      )}
      {pageNo != null && <Text style={styles.pageNo}>{pageNo}</Text>}
    </View>
  );
}

// Verso: the scene's illustration as a book plate, with its caption and honest sourcing.
function ImagePage({ module, i, lang }: { module: Module; i: number; lang: Lang }) {
  const scene = module.scenes[i];
  const src = sceneImageSource(module.id, scene.id, scene.imagePrompt, { seed: scene.seed });
  return (
    <PaperPage side="left" pageNo={i * 2 + 1}>
      <View style={styles.plate}>
        <SceneImage source={src} />
      </View>
      <Text style={styles.plateCaption}>{sceneTitleText(module, scene, lang)}</Text>
      <Text style={styles.plateNote}>{t(UI.interpretation, lang)}</Text>
      <Text style={styles.plateNote}>
        {t(UI.source, lang)}: {scene.sourceNote}
      </Text>
    </PaperPage>
  );
}

// Recto: the passage in book type — serif ink on paper, drop cap, page number.
function TextPage({
  module,
  i,
  lang,
  mode,
  single,
  onArchive,
}: {
  module: Module;
  i: number;
  lang: Lang;
  mode: Mode;
  single: boolean;
  onArchive?: () => void;
}) {
  const scene = module.scenes[i];
  const field = mode === "child" ? "childText" : "text";
  const loc = mode === "child" ? scene.childText : scene.text;
  const res = resolveText(loc, lang, draftText(module.id, scene.id, field, lang));
  const text = res.text;
  return (
    <PaperPage side={single ? "single" : "right"} pageNo={single ? i + 1 : i * 2 + 2}>
      {single && (
        <View style={styles.plateMini}>
          <SceneImage source={sceneImageSource(module.id, scene.id, scene.imagePrompt, { seed: scene.seed })} />
        </View>
      )}
      <Text style={styles.pageTitle}>{sceneTitleText(module, scene, lang)}</Text>
      <ScrollView style={styles.pageScroll} contentContainerStyle={{ paddingBottom: spacing.lg }} showsVerticalScrollIndicator={false}>
        <Text style={styles.ink}>
          <Text style={styles.inkDrop}>{text.slice(0, 1)}</Text>
          {text.slice(1)}
        </Text>
        {res.status === "fallback" && (
          <Text style={styles.inkNote}>Shown in English · a reviewed {languageByCode(lang).endonym} translation is coming.</Text>
        )}
        {res.status === "draft" && (
          <Text style={styles.inkNote}>{languageByCode(lang).endonym} · machine translation, unreviewed draft.</Text>
        )}
        {single && (
          <Text style={styles.inkNote}>
            {t(UI.interpretation, lang)} · {t(UI.source, lang)}: {scene.sourceNote}
          </Text>
        )}
        {module.archivePrompt && onArchive && (
          <Pressable style={styles.archiveInk} onPress={onArchive} accessibilityRole="button">
            <Icon.Mic size={14} color="#8A5A25" />
            <Text style={styles.archiveInkText}>{t(module.archivePrompt, lang)}</Text>
          </Pressable>
        )}
      </ScrollView>
    </PaperPage>
  );
}

function Book({
  index,
  dir,
  wide,
  renderLeft,
  renderRight,
}: {
  index: number;
  dir: number;
  wide: boolean;
  renderLeft: (i: number) => React.ReactNode;
  renderRight: (i: number) => React.ReactNode;
}) {
  // rot: 0 = turn not started, 1 = leaf landed
  const rot = useRef(new Animated.Value(0)).current;
  const [shown, setShown] = useState(index); // the committed spread on the desk
  const [turn, setTurn] = useState<null | { from: number; to: number; fwd: boolean }>(null);

  useEffect(() => {
    if (index === shown) return;
    rot.stopAnimation(); // a rapid second turn finalises the first instantly
    const fwd = dir >= 0;
    setTurn({ from: shown, to: index, fwd });
    rot.setValue(0);
    Animated.timing(rot, { toValue: 1, duration: 600, useNativeDriver: true }).start(({ finished }) => {
      setShown(index);
      if (finished) setTurn(null);
    });
    // shown is captured at turn start; adding it would restart the animation on commit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, dir, rot]);

  // shading, turn.js-style: the lifting face darkens to the fold, the landing face lightens out,
  // and a cast shadow sweeps off the page being uncovered.
  const frontShade = rot.interpolate({ inputRange: [0, 0.5, 0.55, 1], outputRange: [0, 0.6, 0, 0] });
  const backShade = rot.interpolate({ inputRange: [0, 0.45, 0.5, 1], outputRange: [0, 0, 0.6, 0] });
  const castShade = rot.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0, 0.45, 0] });

  if (!wide) {
    // single-page display (turn.js display:'single'): the leaf's backside is plain paper
    const desk = turn ? (turn.fwd ? renderRight(turn.to) : renderRight(turn.from)) : renderRight(shown);
    const leafFront = turn ? (turn.fwd ? renderRight(turn.from) : renderRight(turn.to)) : null;
    const rotateY = turn && !turn.fwd
      ? rot.interpolate({ inputRange: [0, 1], outputRange: ["-160deg", "0deg"] })
      : rot.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "-160deg"] });
    const singleShade = turn && !turn.fwd
      ? rot.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0.5, 0] })
      : rot.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0.5, 0] });
    return (
      <View style={styles.book}>
        <View style={styles.pagesBox}>
          <View style={styles.half}>
            {desk}
            {turn && (
              <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: castShade }]}>
                <LinearGradient colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0)"]} start={{ x: 0, y: 0.5 }} end={{ x: 0.7, y: 0.5 }} style={StyleSheet.absoluteFill} />
              </Animated.View>
            )}
          </View>
          {turn && (
            <Animated.View
              pointerEvents="none"
              style={[styles.leafSingle, { transformOrigin: "left center", transform: [{ perspective: 1600 }, { rotateY }] }]}
            >
              <View style={styles.face}>
                {leafFront}
                <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: singleShade }]}>
                  <LinearGradient colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0.55)"]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={StyleSheet.absoluteFill} />
                </Animated.View>
              </View>
              <View style={[styles.face, styles.faceBack]}>
                <LinearGradient colors={["#F3EDDF", "#E7E0CE"]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={StyleSheet.absoluteFill} />
              </View>
            </Animated.View>
          )}
        </View>
      </View>
    );
  }

  // two-page spread
  const deskLeft = turn ? (turn.fwd ? renderLeft(turn.from) : renderLeft(turn.to)) : renderLeft(shown);
  const deskRight = turn ? (turn.fwd ? renderRight(turn.to) : renderRight(turn.from)) : renderRight(shown);
  const rotateY = turn && !turn.fwd
    ? rot.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] })
    : rot.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "-180deg"] });

  return (
    <View style={styles.book}>
      <View style={styles.pagesBox}>
        <View style={styles.half}>
          {deskLeft}
          {turn && !turn.fwd && (
            <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: castShade }]}>
              <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.4)"]} start={{ x: 0.3, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={StyleSheet.absoluteFill} />
            </Animated.View>
          )}
        </View>
        <View style={styles.half}>
          {deskRight}
          {turn && turn.fwd && (
            <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: castShade }]}>
              <LinearGradient colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0)"]} start={{ x: 0, y: 0.5 }} end={{ x: 0.7, y: 0.5 }} style={StyleSheet.absoluteFill} />
            </Animated.View>
          )}
        </View>
        {turn && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.leaf,
              turn.fwd ? styles.leafRight : styles.leafLeft,
              {
                transformOrigin: turn.fwd ? "left center" : "right center",
                transform: [{ perspective: 2200 }, { rotateY }],
              },
            ]}
          >
            {/* front of the leaf: the page being lifted */}
            <View style={styles.face}>
              {turn.fwd ? renderRight(turn.from) : renderLeft(turn.from)}
              <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: frontShade }]}>
                <LinearGradient
                  colors={turn.fwd ? ["rgba(0,0,0,0.05)", "rgba(0,0,0,0.6)"] : ["rgba(0,0,0,0.6)", "rgba(0,0,0,0.05)"]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={StyleSheet.absoluteFill}
                />
              </Animated.View>
            </View>
            {/* back of the leaf: the incoming page, revealed as it lands (turn.js's folded page) */}
            <View style={[styles.face, styles.faceBack]}>
              {turn.fwd ? renderLeft(turn.to) : renderRight(turn.to)}
              <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: backShade }]}>
                <LinearGradient
                  colors={turn.fwd ? ["rgba(0,0,0,0.6)", "rgba(0,0,0,0.05)"] : ["rgba(0,0,0,0.05)", "rgba(0,0,0,0.6)"]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={StyleSheet.absoluteFill}
                />
              </Animated.View>
            </View>
          </Animated.View>
        )}
        <View style={styles.spine} pointerEvents="none" />
      </View>
    </View>
  );
}

function Toggle({
  options,
  value,
  onChange,
}: {
  options: { key: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <View style={styles.toggle}>
      {options.map((o) => {
        const active = o.key === value;
        return (
          <Pressable
            key={o.key}
            onPress={() => onChange(o.key)}
            style={[styles.toggleItem, active && styles.toggleItemActive]}
          >
            <Text style={[styles.toggleText, active && styles.toggleTextActive]}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function NavButton({
  label,
  onPress,
  disabled,
  dir,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  dir?: "prev" | "next";
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.navBtn, disabled && styles.navBtnDisabled]}
    >
      {dir === "prev" && <Icon.ChevronLeft size={16} color={colors.sand} />}
      <Text style={styles.navBtnText}>{label}</Text>
      {dir === "next" && <Icon.ChevronRight size={16} color={colors.sand} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  safe: { flex: 1, padding: spacing.lg, justifyContent: "space-between" },
  topBar: { flexDirection: "row", justifyContent: "space-between", gap: spacing.md },
  titleWrap: { flexDirection: "row", alignItems: "center", gap: spacing.sm, flexShrink: 1 },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.scrimStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { color: colors.sand, fontSize: 24, lineHeight: 26, marginTop: -2 },
  kicker: {
    color: colors.gold,
    fontFamily: fonts.bodySemi,
    fontSize: type.small,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  sceneTitle: { color: colors.sand, fontFamily: fonts.serif, fontSize: type.title + 5, lineHeight: type.title + 8, marginTop: 3 },
  toggles: { gap: spacing.sm, alignItems: "flex-end" },
  toggle: {
    flexDirection: "row",
    backgroundColor: colors.scrimStrong,
    borderRadius: radius.pill,
    padding: 3,
  },
  toggleItem: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: radius.pill },
  toggleItemActive: { backgroundColor: "#FFFFFF" },
  toggleText: { color: colors.muted, fontFamily: fonts.bodySemi, fontSize: type.small },
  toggleTextActive: { color: colors.night },
  listenBtn: {
    backgroundColor: colors.scrimStrong,
    borderRadius: radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  listenBtnActive: { backgroundColor: "#FFFFFF", borderColor: "#FFFFFF" },
  listenText: { color: colors.sand, fontFamily: fonts.bodySemi, fontSize: type.small },
  listenTextActive: { color: colors.night },
  // ── the book (turn.js look: paper spread, centre spine, hard cover) ────────────────────────
  bookArea: { flex: 1, marginVertical: spacing.md, width: "100%", maxWidth: 1000, alignSelf: "center" },
  book: {
    flex: 1,
    backgroundColor: "#CFC9BA", // the cover peeking around the pages
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 18 },
    elevation: 16,
  },
  pagesBox: { flex: 1, flexDirection: "row" },
  half: { flex: 1 },
  spine: { position: "absolute", top: 0, bottom: 0, left: "50%", width: 2, marginLeft: -1, backgroundColor: "rgba(70,52,30,0.3)" },
  leaf: { position: "absolute", top: 0, bottom: 0, width: "50%" },
  leafRight: { left: "50%" },
  leafLeft: { left: 0 },
  leafSingle: { position: "absolute", top: 0, bottom: 0, left: 0, right: 0 },
  face: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backfaceVisibility: "hidden", borderRadius: 8, overflow: "hidden", backgroundColor: "#F8F4EA" },
  faceBack: { transform: [{ rotateY: "180deg" }] },

  paper: { flex: 1, backgroundColor: "#F8F4EA", overflow: "hidden" },
  paperLeft: { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
  paperRight: { borderTopRightRadius: 8, borderBottomRightRadius: 8 },
  paperSingle: { borderRadius: 8 },
  paperInner: { flex: 1, padding: spacing.lg, paddingBottom: spacing.xl },
  gutter: { position: "absolute", top: 0, bottom: 0, width: 28 },
  pageNo: { position: "absolute", bottom: 9, left: 0, right: 0, textAlign: "center", color: "rgba(60,48,36,0.5)", fontFamily: fonts.serif, fontSize: 11 },

  pageTitle: { color: "#2A231B", fontFamily: fonts.serif, fontSize: 22, lineHeight: 27, marginBottom: spacing.md },
  pageScroll: { flex: 1 },
  ink: { color: "#332A20", fontFamily: fonts.serifBody, fontSize: type.body + 0.5, lineHeight: 27 },
  inkDrop: { fontFamily: fonts.display, fontSize: 44, lineHeight: 27, color: "#8A5A25" },
  inkNote: { color: "rgba(51,42,32,0.55)", fontFamily: fonts.body, fontSize: type.small - 0.5, fontStyle: "italic", marginTop: spacing.md, lineHeight: 16 },

  plate: { flex: 1, borderRadius: 4, overflow: "hidden", backgroundColor: "#E9E2D2", borderWidth: 1, borderColor: "rgba(70,52,30,0.18)" },
  plateMini: { height: 150, borderRadius: 4, overflow: "hidden", backgroundColor: "#E9E2D2", marginBottom: spacing.md, borderWidth: 1, borderColor: "rgba(70,52,30,0.18)" },
  plateCaption: { color: "#4A3E2F", fontFamily: fonts.serifItalic, fontSize: 13, textAlign: "center", marginTop: spacing.sm },
  plateNote: { color: "rgba(60,48,36,0.55)", fontFamily: fonts.body, fontSize: 10.5, textAlign: "center", marginTop: 3, lineHeight: 14 },

  archiveInk: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: spacing.md, alignSelf: "flex-start" },
  archiveInkText: { color: "#8A5A25", fontFamily: fonts.bodySemi, fontSize: type.small },
  nav: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  progress: { color: colors.muted, fontFamily: fonts.bodyMedium, fontSize: type.small },
  navBtn: {
    backgroundColor: colors.scrimStrong,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  navBtnDisabled: { opacity: 0.35 },
  navBtnText: { color: colors.sand, fontFamily: fonts.bodySemi, fontSize: type.body },
});
