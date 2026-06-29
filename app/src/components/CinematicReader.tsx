import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Module, Lang, Mode } from "../content/types";
import { sceneImageUrl } from "../services/pollinations";
import { SceneImage } from "./SceneImage";
import { colors, spacing, radius, type } from "../theme/tokens";

// The cinematic Reader: full-bleed AI background + scrim + overlaid story text, with
// Child/Adult and Setswana/English toggles and scene navigation. The Phase-0 demo spine.

const UI = {
  child: { en: "Child", tn: "Bana" },
  adult: { en: "Adult", tn: "Bagolo" },
  source: { en: "Source", tn: "Motswedi" },
  prev: { en: "‹ Back", tn: "‹ Morago" },
  next: { en: "Next ›", tn: "Pele ›" },
  interpretation: {
    en: "AI image — artistic interpretation, not a historical photo.",
    tn: "Setshwantsho sa AI — kakanyo ya botaki, e seng senepe sa hisitori.",
  },
};

export function CinematicReader({ module }: { module: Module }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("adult");
  const [lang, setLang] = useState<Lang>("en");

  const scene = module.scenes[index];
  const imageUri = useMemo(
    () => sceneImageUrl(scene.imagePrompt, { seed: scene.seed }),
    [scene]
  );

  const body = mode === "child" ? scene.childText[lang] : scene.text[lang];

  return (
    <View style={styles.root}>
      <SceneImage uri={imageUri} />
      {/* scrim for text legibility (accessibility) */}
      <View style={styles.scrim} pointerEvents="none" />

      <SafeAreaView style={styles.safe}>
        {/* Top bar: title + language + mode toggles */}
        <View style={styles.topBar}>
          <View style={{ flexShrink: 1 }}>
            <Text style={styles.kicker}>
              {module.title} · {module.author}
            </Text>
            <Text style={styles.sceneTitle}>{scene.title[lang]}</Text>
          </View>
          <View style={styles.toggles}>
            <Toggle
              options={[
                { key: "en", label: "EN" },
                { key: "tn", label: "TSW" },
              ]}
              value={lang}
              onChange={(v) => setLang(v as Lang)}
            />
            <Toggle
              options={[
                { key: "adult", label: UI.adult[lang] },
                { key: "child", label: UI.child[lang] },
              ]}
              value={mode}
              onChange={(v) => setMode(v as Mode)}
            />
          </View>
        </View>

        {/* Story text */}
        <ScrollView
          style={styles.textArea}
          contentContainerStyle={{ paddingBottom: spacing.lg }}
        >
          <Text style={styles.body}>{body}</Text>
          <Text style={styles.interp}>{UI.interpretation[lang]}</Text>
          <Text style={styles.source}>
            {UI.source[lang]}: {scene.sourceNote}
          </Text>
        </ScrollView>

        {/* Scene nav */}
        <View style={styles.nav}>
          <NavButton
            label={UI.prev[lang]}
            disabled={index === 0}
            onPress={() => setIndex((i) => Math.max(0, i - 1))}
          />
          <Text style={styles.progress}>
            {index + 1} / {module.scenes.length}
          </Text>
          <NavButton
            label={UI.next[lang]}
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
  scrim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.scrim,
  },
  safe: { flex: 1, padding: spacing.lg, justifyContent: "space-between" },
  topBar: { flexDirection: "row", justifyContent: "space-between", gap: spacing.md },
  kicker: {
    color: colors.gold,
    fontSize: type.small,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  sceneTitle: { color: colors.sand, fontSize: type.title, fontWeight: "700", marginTop: 2 },
  toggles: { gap: spacing.sm, alignItems: "flex-end" },
  toggle: {
    flexDirection: "row",
    backgroundColor: colors.scrimStrong,
    borderRadius: radius.pill,
    padding: 3,
  },
  toggleItem: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: radius.pill },
  toggleItemActive: { backgroundColor: colors.gold },
  toggleText: { color: colors.muted, fontSize: type.small, fontWeight: "600" },
  toggleTextActive: { color: colors.night },
  textArea: { flexGrow: 0, maxHeight: "55%", marginVertical: spacing.lg },
  body: { color: colors.sand, fontSize: type.body, lineHeight: 26 },
  interp: { color: colors.muted, fontSize: type.small, fontStyle: "italic", marginTop: spacing.lg },
  source: { color: colors.muted, fontSize: type.small, marginTop: spacing.xs },
  nav: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  progress: { color: colors.muted, fontSize: type.small },
  navBtn: {
    backgroundColor: colors.scrimStrong,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
  },
  navBtnDisabled: { opacity: 0.35 },
  navBtnText: { color: colors.sand, fontSize: type.body, fontWeight: "600" },
});
