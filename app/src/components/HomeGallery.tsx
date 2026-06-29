import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Module, Lang } from "../content/types";
import { modules } from "../content";
import { sceneImageUrl } from "../services/pollinations";
import { SceneImage } from "./SceneImage";
import { colors, spacing, radius, type } from "../theme/tokens";

// The front door: a cinematic gallery of the literary pillars. Tap one to open its Reader.
// Phase 1 (T013). Community Archive card is a placeholder until Phase 2.

const UI = {
  intro: {
    en: "Four pillars of South African letters — brought to life. Tap a story to begin.",
    tn: "Dikokwane tse nne tsa dingwalo tsa Aforika Borwa — di tsosolositswe. Tobetsa kanegelo go simolola.",
  },
  comingSoon: { en: "Community Archive — coming soon", tn: "Polokelo ya Setšhaba — e e tla" },
  language: { en: "EN", tn: "TSW" },
};

export function HomeGallery({
  lang,
  onToggleLang,
  onOpen,
}: {
  lang: Lang;
  onToggleLang: () => void;
  onOpen: (id: string) => void;
}) {
  return (
    <View style={styles.root}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.headerRow}>
            <View style={{ flexShrink: 1 }}>
              <Text style={styles.brand}>Maloba</Text>
              <Text style={styles.tagline}>Mantswe a maloba · Voices of Yesterday</Text>
            </View>
            <Pressable style={styles.langBtn} onPress={onToggleLang}>
              <Text style={styles.langBtnText}>{UI.language[lang]}</Text>
            </Pressable>
          </View>

          <Text style={styles.intro}>{UI.intro[lang]}</Text>

          {modules.map((m) => (
            <PillarCard key={m.id} module={m} lang={lang} onPress={() => onOpen(m.id)} />
          ))}

          <View style={styles.comingSoon}>
            <Text style={styles.comingSoonText}>{UI.comingSoon[lang]}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function PillarCard({
  module,
  lang,
  onPress,
}: {
  module: Module;
  lang: Lang;
  onPress: () => void;
}) {
  const hero = module.scenes[0];
  const uri = sceneImageUrl(hero.imagePrompt, { seed: hero.seed, w: 1024, h: 768 });

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.cardImage}>
        <SceneImage uri={uri} />
        <View style={styles.cardScrim} pointerEvents="none" />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardKicker}>
          {module.author} · {module.year}
        </Text>
        <Text style={styles.cardTitle}>{module.title}</Text>
        <Text style={styles.cardBlurb} numberOfLines={3}>
          {module.blurb[lang]}
        </Text>
        <Text style={styles.cardAudience}>{module.audience}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.night },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  brand: { color: colors.gold, fontSize: type.display, fontWeight: "800", letterSpacing: 0.5 },
  tagline: { color: colors.muted, fontSize: type.small, marginTop: 2 },
  langBtn: {
    backgroundColor: colors.card,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
  },
  langBtnText: { color: colors.sand, fontWeight: "700", fontSize: type.small },
  intro: { color: colors.sand, fontSize: type.body, lineHeight: 24, marginVertical: spacing.lg },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    overflow: "hidden",
    marginBottom: spacing.lg,
  },
  cardImage: { height: 180, backgroundColor: colors.ink },
  cardScrim: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    backgroundColor: colors.scrim,
  },
  cardBody: { padding: spacing.md },
  cardKicker: {
    color: colors.gold,
    fontSize: type.small,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  cardTitle: { color: colors.sand, fontSize: type.title, fontWeight: "700", marginTop: 2 },
  cardBlurb: { color: colors.muted, fontSize: type.small, lineHeight: 20, marginTop: spacing.sm },
  cardAudience: { color: colors.ember, fontSize: type.small, marginTop: spacing.sm, fontWeight: "600" },
  comingSoon: {
    borderWidth: 1,
    borderColor: colors.card,
    borderStyle: "dashed",
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: "center",
  },
  comingSoonText: { color: colors.muted, fontSize: type.small },
});
