import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Module, Lang, Mode } from "../content/types";
import { sceneImageSource } from "../content/images";
import { useTts } from "../services/tts";
import { t, resolveText, languageByCode } from "../i18n";
import { draftText } from "../content/drafts";
import { LinearGradient } from "expo-linear-gradient";
import { SceneImage } from "./SceneImage";
import { Fade } from "./Motion";
import { LanguagePicker } from "./LanguagePicker";
import { colors, spacing, radius, type, fonts, motion } from "../theme/tokens";

// The cinematic Reader: full-bleed AI background + scrim + overlaid story text, with
// Child/Adult and Setswana/English toggles and scene navigation. The Phase-0 demo spine.

const UI = {
  child: { en: "Child", tn: "Bana" },
  adult: { en: "Adult", tn: "Bagolo" },
  source: { en: "Source", tn: "Motswedi" },
  prev: { en: "‹ Back", tn: "‹ Morago" },
  next: { en: "Next ›", tn: "Pele ›" },
  listen: { en: "🔊 Listen", tn: "🔊 Reetsa" }, // [REVIEW: Setswana — "reetsa" = listen]
  stopListen: { en: "⏹ Stop", tn: "⏹ Emisa" },
  interpretation: {
    en: "AI image — artistic interpretation, not a historical photo.",
    tn: "Setshwantsho sa AI — kakanyo ya botaki, e seng senepe sa hisitori.",
  },
};

export function CinematicReader({
  module,
  lang,
  onLangChange,
  onBack,
  onArchive,
}: {
  module: Module;
  lang: Lang;
  onLangChange: (l: Lang) => void;
  onBack?: () => void;
  onArchive?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("adult");
  const tts = useTts();

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
        colors={["rgba(14,11,7,0.72)", "rgba(14,11,7,0.28)", "rgba(14,11,7,0.9)"]}
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
                <Text style={styles.backText}>‹</Text>
              </Pressable>
            )}
            <View style={{ flexShrink: 1 }}>
              <Text style={styles.kicker}>
                {module.title} · {module.author}
              </Text>
              <Text style={styles.sceneTitle}>{t(scene.title, lang)}</Text>
            </View>
          </View>
          <View style={styles.toggles}>
            <LanguagePicker lang={lang} onChange={onLangChange} compact />
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
              <Text style={[styles.listenText, tts.speaking && styles.listenTextActive]}>
                {tts.speaking ? t(UI.stopListen, lang) : t(UI.listen, lang)}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Story text — cross-fades when the scene, language, or reading level changes */}
        <ScrollView
          style={styles.textArea}
          contentContainerStyle={{ paddingBottom: spacing.lg }}
        >
          <Fade key={`${index}-${lang}-${mode}`} duration={motion.base}>
          <Text style={styles.body}>{body}</Text>
          {bodyRes.status === "fallback" && (
            <Text style={styles.fallback}>
              Shown in English · a reviewed {languageByCode(lang).endonym} translation is coming.
            </Text>
          )}
          {bodyRes.status === "draft" && (
            <Text style={styles.fallback}>
              {languageByCode(lang).endonym} · machine translation, unreviewed draft.
            </Text>
          )}
          <Text style={styles.interp}>{t(UI.interpretation, lang)}</Text>
          <Text style={styles.source}>
            {t(UI.source, lang)}: {scene.sourceNote}
          </Text>
          {module.archivePrompt && onArchive && (
            <Pressable style={styles.archiveCta} onPress={onArchive} accessibilityRole="button">
              <Text style={styles.archiveCtaText}>🎙  {t(module.archivePrompt, lang)}</Text>
            </Pressable>
          )}
          </Fade>
        </ScrollView>

        {/* Scene nav */}
        <View style={styles.nav}>
          <NavButton
            label={t(UI.prev, lang)}
            disabled={index === 0}
            onPress={() => setIndex((i) => Math.max(0, i - 1))}
          />
          <Text style={styles.progress}>
            {index + 1} / {module.scenes.length}
          </Text>
          <NavButton
            label={t(UI.next, lang)}
            disabled={index === module.scenes.length - 1}
            onPress={() =>
              setIndex((i) => Math.min(module.scenes.length - 1, i + 1))
            }
          />
        </View>
      </SafeAreaView>
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
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.navBtn, disabled && styles.navBtnDisabled]}
    >
      <Text style={styles.navBtnText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.night },
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
  sceneTitle: { color: colors.sand, fontFamily: fonts.displaySemi, fontSize: type.title + 4, marginTop: 2 },
  toggles: { gap: spacing.sm, alignItems: "flex-end" },
  toggle: {
    flexDirection: "row",
    backgroundColor: colors.scrimStrong,
    borderRadius: radius.pill,
    padding: 3,
  },
  toggleItem: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: radius.pill },
  toggleItemActive: { backgroundColor: colors.gold },
  toggleText: { color: colors.muted, fontFamily: fonts.bodySemi, fontSize: type.small },
  toggleTextActive: { color: colors.night },
  listenBtn: {
    backgroundColor: colors.scrimStrong,
    borderRadius: radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.gold,
  },
  listenBtnActive: { backgroundColor: colors.gold, borderColor: colors.gold },
  listenText: { color: colors.sand, fontFamily: fonts.bodySemi, fontSize: type.small },
  listenTextActive: { color: colors.night },
  textArea: { flexGrow: 0, maxHeight: "55%", marginVertical: spacing.lg },
  body: { color: colors.sand, fontFamily: fonts.body, fontSize: type.body + 1, lineHeight: 29 },
  fallback: {
    color: colors.gold,
    fontFamily: fonts.body,
    fontSize: type.small,
    lineHeight: 18,
    marginTop: spacing.md,
    fontStyle: "italic",
  },
  interp: { color: colors.muted, fontFamily: fonts.body, fontSize: type.small, fontStyle: "italic", marginTop: spacing.lg },
  source: { color: colors.muted, fontFamily: fonts.body, fontSize: type.small, marginTop: spacing.xs },
  archiveCta: {
    alignSelf: "flex-start",
    marginTop: spacing.lg,
    backgroundColor: colors.scrimStrong,
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: radius.pill,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  archiveCtaText: { color: colors.gold, fontFamily: fonts.bodySemi, fontSize: type.small },
  nav: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  progress: { color: colors.muted, fontFamily: fonts.bodyMedium, fontSize: type.small },
  navBtn: {
    backgroundColor: colors.scrimStrong,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
  },
  navBtnDisabled: { opacity: 0.35 },
  navBtnText: { color: colors.sand, fontFamily: fonts.bodySemi, fontSize: type.body },
});
