import React from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Module, Lang } from "../content/types";
import { modules, atlasModules } from "../content";
import { sceneImageSource } from "../content/images";
import { t } from "../i18n";
import { LinearGradient } from "expo-linear-gradient";
import { SceneImage } from "./SceneImage";
import { LanguagePicker } from "./LanguagePicker";
import { PressScale, Reveal } from "./Motion";
import { colors, spacing, radius, type, fonts } from "../theme/tokens";

// The front door — styled after the AADHIH "Reclaiming African Voices" brief: warm cream paper,
// heavy Anton display headings, burnt-orange accents, navy text, and dignified African imagery.
// A featured pillar leads; the rest read as a numbered index. Orchestrated staggered reveal.

const KICKER = "Reclaiming African Voices";
// Nudge Pollinations toward the brief's warm, human, real-people photography look.
const PHOTO = "warm documentary photography, golden natural light, photorealistic, dignified African subjects, rich colour";

const UI = {
  section: { en: "The Four Pillars", tn: "Dikokwane tse Nne" },
  sectionSub: {
    en: "Foundational works of South African literature — read, heard, and kept alive.",
    tn: "Dingwalo tsa motheo tsa Aforika Borwa — di badiwa, di utlwiwa, di tshelwa.",
  },
  begin: { en: "Begin reading", tn: "Simolola go bala" }, // [REVIEW: Setswana]
  atlas: { en: "Cultural Atlas", tn: "Atlase ya Setso" },
  atlasSub: {
    en: "The history, customs and heroes behind the literature — grounded and cited.",
    tn: "Hisitori, ngwao le bagaki ba ba mo tlase ga dingwalo — di theilwe mo metsweding.",
  },
  archive: { en: "Community Archive", tn: "Polokelo ya Setšhaba" },
  archiveHint: {
    en: "Record & preserve your family's own stories",
    tn: "Gatisa o boloke dikanegelo tsa lelapa la gago",
  },
  about: { en: "About the Sources", tn: "Ka ga Metswedi" },
  heritage: { en: "⛓  Heritage Ledger · on-chain", tn: "⛓  Rekoto ya Boswa · mo blockchain" },
};

export function HomeGallery({
  lang,
  onLangChange,
  onOpen,
  onAbout,
  onArchive,
  onHeritage,
}: {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  onOpen: (id: string) => void;
  onAbout: () => void;
  onArchive: () => void;
  onHeritage: () => void;
}) {
  const featured = modules[0];
  const rest = modules.slice(1);

  return (
    <View style={styles.root}>
      {/* Faint warm wash at the top of the cream page — depth without a flat fill. */}
      <LinearGradient colors={[colors.glowGold, "transparent"]} style={styles.wash} pointerEvents="none" />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.topBar}>
            <LanguagePicker lang={lang} onChange={onLangChange} />
          </View>

          {/* Masthead */}
          <Reveal style={styles.masthead}>
            <Emblem />
            <View style={styles.kickerRow}>
              <View style={styles.kickerLine} />
              <Text style={styles.kicker}>{KICKER}</Text>
              <View style={styles.kickerLine} />
            </View>
            <Text style={styles.brand}>Maloba</Text>
            <Text style={styles.tagline}>Mantswe a maloba — Voices of Yesterday</Text>
          </Reveal>

          {/* Section heading */}
          <Reveal delay={100} style={styles.sectionHead}>
            <SectionHead label={t(UI.section, lang)} sub={t(UI.sectionSub, lang)} />
          </Reveal>

          {/* Featured pillar */}
          <Reveal delay={150}>
            <FeatureCard module={featured} lang={lang} onPress={() => onOpen(featured.id)} beginLabel={t(UI.begin, lang)} />
          </Reveal>

          {/* Numbered index */}
          {rest.map((m, i) => (
            <Reveal key={m.id} delay={230 + i * 90}>
              <IndexRow module={m} n={i + 2} lang={lang} onPress={() => onOpen(m.id)} />
            </Reveal>
          ))}

          {/* Cultural Atlas — grounded heritage entries */}
          <Reveal delay={230 + rest.length * 90 + 40} style={styles.sectionHead}>
            <SectionHead label={t(UI.atlas, lang)} sub={t(UI.atlasSub, lang)} />
          </Reveal>
          {atlasModules.map((m, i) => (
            <Reveal key={m.id} delay={230 + (rest.length + i) * 90 + 80}>
              <IndexRow module={m} n={i + 1} lang={lang} onPress={() => onOpen(m.id)} atlas />
            </Reveal>
          ))}

          {/* Community Archive — navy call-to-action block, brief-style */}
          <Reveal delay={230 + rest.length * 90 + 60}>
            <PressScale style={styles.archive} onPress={onArchive} accessibilityLabel={t(UI.archive, lang)}>
              <Text style={styles.archiveMark}>🎙</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.archiveTitle}>{t(UI.archive, lang)}</Text>
                <Text style={styles.archiveHint}>{t(UI.archiveHint, lang)}</Text>
              </View>
              <Text style={styles.archiveChevron}>›</Text>
            </PressScale>
          </Reveal>

          {/* Heritage Ledger (on-chain) */}
          <Reveal delay={230 + rest.length * 90 + 100} style={styles.heritageWrap}>
            <PressScale style={styles.heritageBtn} onPress={onHeritage} accessibilityLabel={t(UI.heritage, lang)}>
              <Text style={styles.heritageText}>{t(UI.heritage, lang)}</Text>
            </PressScale>
          </Reveal>

          {/* About */}
          <Reveal delay={230 + rest.length * 90 + 140} style={styles.aboutWrap}>
            <Pressable onPress={onAbout} hitSlop={10}>
              <Text style={styles.aboutText}>{t(UI.about, lang)}  →</Text>
            </Pressable>
          </Reveal>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// The Maloba mark — a rising "sun" (gold ring, orange core) nodding to the brief's logo sun. Pure
// views so it renders identically on web + native with no image asset.
function Emblem() {
  return (
    <View style={styles.emblem}>
      <View style={styles.emblemRing} />
      <View style={styles.emblemCore} />
    </View>
  );
}

// Editorial section header — an orange accent tick + heavy label + supporting line. One place so the
// "Four Pillars" and "Cultural Atlas" headers stay in perfect rhythm.
function SectionHead({ label, sub }: { label: string; sub: string }) {
  return (
    <>
      <View style={styles.sectionLabelRow}>
        <View style={styles.sectionTick} />
        <Text style={styles.sectionLabel}>{label}</Text>
      </View>
      <Text style={styles.sectionSub}>{sub}</Text>
    </>
  );
}

function FeatureCard({
  module,
  lang,
  onPress,
  beginLabel,
}: {
  module: Module;
  lang: Lang;
  onPress: () => void;
  beginLabel: string;
}) {
  const hero = module.scenes[0];
  const source = sceneImageSource(module.id, hero.id, `${hero.imagePrompt}, ${PHOTO}`, { seed: hero.seed, w: 1024, h: 1024 });
  return (
    <PressScale style={styles.feature} onPress={onPress} accessibilityLabel={`${module.title} — ${module.author}`}>
      <View style={StyleSheet.absoluteFill}>
        <SceneImage source={source} kenBurns />
      </View>
      <LinearGradient
        colors={["transparent", "rgba(14,28,46,0.5)", "rgba(14,28,46,0.97)"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      {/* Thin gold frame — a premium, "plate"-like edge over the image. */}
      <View style={styles.featureFrame} pointerEvents="none" />
      <Text style={styles.featureIndex}>01</Text>
      <View style={styles.featureText}>
        <Text style={styles.featureKicker}>
          {module.author} · {module.year}
        </Text>
        <Text style={styles.featureTitle}>{module.title}</Text>
        <Text style={styles.featureBlurb} numberOfLines={2}>
          {t(module.blurb, lang)}
        </Text>
        <Text style={styles.featureCta}>{beginLabel}  →</Text>
      </View>
    </PressScale>
  );
}

function IndexRow({
  module,
  n,
  lang,
  onPress,
  atlas,
}: {
  module: Module;
  n: number;
  lang: Lang;
  onPress: () => void;
  atlas?: boolean;
}) {
  const hero = module.scenes[0];
  const source = sceneImageSource(module.id, hero.id, `${hero.imagePrompt}, ${PHOTO}`, { seed: hero.seed, w: 512, h: 640 });
  return (
    <PressScale style={styles.row} onPress={onPress} accessibilityLabel={`${module.title} — ${module.author}`}>
      <Text style={styles.rowIndex}>{atlas ? "✦" : String(n).padStart(2, "0")}</Text>
      <View style={styles.rowThumb}>
        <SceneImage source={source} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{module.title}</Text>
        <Text style={styles.rowMeta}>
          {module.author}
          {module.year ? ` · ${module.year}` : ""}
        </Text>
        <Text style={styles.rowBlurb} numberOfLines={2}>
          {t(module.blurb, lang)}
        </Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </PressScale>
  );
}

const SHADOW = "0px 10px 24px rgba(22,41,63,0.14)";
const SHADOW_SOFT = "0px 6px 16px rgba(22,41,63,0.07)";

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  wash: { position: "absolute", top: 0, left: 0, right: 0, height: 320 },
  content: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxl },

  topBar: { flexDirection: "row", justifyContent: "flex-end", marginBottom: spacing.md },

  masthead: { alignItems: "center", marginBottom: spacing.xl },

  // Rising-sun emblem (gold ring + orange core)
  emblem: { width: 44, height: 44, alignItems: "center", justifyContent: "center", marginBottom: spacing.md },
  emblemRing: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.gold,
  },
  emblemCore: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.orange },

  // Kicker flanked by hairlines — editorial masthead treatment
  kickerRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm },
  kickerLine: { width: 24, height: 1, backgroundColor: colors.orange, opacity: 0.6 },
  kicker: {
    color: colors.orange,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  brand: {
    color: colors.navy,
    fontFamily: fonts.display,
    fontSize: 76,
    letterSpacing: 1,
    textTransform: "uppercase",
    lineHeight: 78,
  },
  tagline: { color: colors.slate, fontFamily: fonts.body, fontSize: 15, fontStyle: "italic", marginTop: spacing.sm },

  sectionHead: { marginBottom: spacing.lg },
  sectionLabelRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  sectionTick: { width: 14, height: 3, borderRadius: 2, backgroundColor: colors.orange },
  sectionLabel: {
    color: colors.navy,
    fontFamily: fonts.displaySemi,
    fontSize: 15,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  sectionSub: { color: colors.slate, fontFamily: fonts.body, fontSize: type.small + 1, lineHeight: 20, marginTop: 6 },

  feature: {
    height: 380,
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: colors.navy,
    marginBottom: spacing.xl,
    boxShadow: SHADOW,
  },
  featureFrame: {
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
    bottom: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.lineStrong,
  },
  featureIndex: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.lg,
    color: colors.orange,
    fontFamily: fonts.display,
    fontSize: 54,
  },
  featureText: { position: "absolute", left: spacing.lg, right: spacing.lg, bottom: spacing.lg },
  featureKicker: {
    color: colors.gold,
    fontFamily: fonts.bodyBold,
    fontSize: type.small,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  featureTitle: { color: colors.sand, fontFamily: fonts.display, fontSize: 40, letterSpacing: 0.5, textTransform: "uppercase", marginTop: 4 },
  featureBlurb: { color: colors.sand, fontFamily: fonts.body, fontSize: type.body, lineHeight: 24, marginTop: spacing.sm, opacity: 0.92 },
  featureCta: {
    color: colors.orange,
    fontFamily: fonts.bodyBold,
    fontSize: type.small,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginTop: spacing.md,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.paperCard,
    borderWidth: 1,
    borderColor: colors.paperLine,
    boxShadow: SHADOW_SOFT,
  },
  rowIndex: { color: colors.orange, fontFamily: fonts.display, fontSize: 24, width: 32 },
  rowThumb: { width: 60, height: 76, borderRadius: radius.sm, overflow: "hidden", backgroundColor: colors.navy },
  rowTitle: { color: colors.navy, fontFamily: fonts.displaySemi, fontSize: type.title, lineHeight: type.title + 3 },
  rowMeta: {
    color: colors.orange,
    fontFamily: fonts.bodyBold,
    fontSize: type.small - 1,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginTop: 2,
  },
  rowBlurb: { color: colors.slate, fontFamily: fonts.body, fontSize: type.small + 1, lineHeight: 19, marginTop: 4 },
  chevron: { color: colors.slate, fontFamily: fonts.body, fontSize: 26 },

  archive: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.navy,
    boxShadow: SHADOW,
  },
  archiveMark: { fontSize: 26 },
  archiveTitle: { color: colors.sand, fontFamily: fonts.displaySemi, fontSize: type.title },
  archiveHint: { color: colors.muted, fontFamily: fonts.body, fontSize: type.small + 1, marginTop: 2 },
  archiveChevron: { color: colors.gold, fontFamily: fonts.body, fontSize: 26 },

  heritageWrap: { alignItems: "center", marginTop: spacing.lg },
  heritageBtn: {
    borderWidth: 1,
    borderColor: colors.navy,
    borderRadius: radius.pill,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  heritageText: {
    color: colors.navy,
    fontFamily: fonts.bodyBold,
    fontSize: type.small,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  aboutWrap: { alignItems: "center", marginTop: spacing.xl },
  aboutText: {
    color: colors.navy,
    fontFamily: fonts.bodyBold,
    fontSize: type.small,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
