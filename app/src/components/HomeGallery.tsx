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
import { Icon } from "../ui";

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
  heritage: { en: "Heritage Ledger · on-chain", tn: "Rekoto ya Boswa · mo blockchain" },
};

export function HomeGallery({
  lang,
  onLangChange,
  onOpen,
  onAbout,
  onArchive,
  onHeritage,
  onProvinces,
  onPresidents,
}: {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  onOpen: (id: string) => void;
  onAbout: () => void;
  onArchive: () => void;
  onHeritage: () => void;
  onProvinces: () => void;
  onPresidents: () => void;
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

          {/* Masthead — the Ubuntu Heritage wordmark (words, not logo) on the black ground */}
          <Reveal style={styles.masthead}>
            <Text style={styles.brand}>Ubuntu Heritage</Text>
            <View style={styles.kickerRow}>
              <View style={styles.kickerLine} />
              <Text style={styles.kicker}>{KICKER}</Text>
              <View style={styles.kickerLine} />
            </View>
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
          <View style={styles.atlasGrid}>
            {atlasModules.map((m, i) => (
              <Reveal key={m.id} delay={230 + (rest.length + i) * 90 + 80} style={styles.atlasCell}>
                <AtlasChip module={m} lang={lang} onPress={() => onOpen(m.id)} />
              </Reveal>
            ))}
          </View>

          {/* The Provinces — entry into the land / cities / history feature */}
          <Reveal delay={230 + rest.length * 90 + 55}>
            <PressScale style={styles.provNav} onPress={onProvinces} accessibilityLabel="The Provinces">
              <View style={{ flex: 1 }}>
                <Text style={styles.provNavTitle}>The Provinces</Text>
                <Text style={styles.provNavHint}>Explore the land — cities, founders &amp; their history</Text>
              </View>
              <Icon.ChevronRight size={22} color={colors.gold} />
            </PressScale>
          </Reveal>

          {/* The Presidents */}
          <Reveal delay={230 + rest.length * 90 + 57}>
            <PressScale style={styles.provNav} onPress={onPresidents} accessibilityLabel="The Presidents">
              <View style={{ flex: 1 }}>
                <Text style={styles.provNavTitle}>The Presidents</Text>
                <Text style={styles.provNavHint}>Their lives, struggles &amp; legacies — 1910 to today</Text>
              </View>
              <Icon.ChevronRight size={22} color={colors.gold} />
            </PressScale>
          </Reveal>

          {/* Community Archive — navy call-to-action block, brief-style */}
          <Reveal delay={230 + rest.length * 90 + 60}>
            <PressScale style={styles.archive} onPress={onArchive} accessibilityLabel={t(UI.archive, lang)}>
              <View style={styles.archiveMark}><Icon.Mic size={20} color={colors.gold} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.archiveTitle}>{t(UI.archive, lang)}</Text>
                <Text style={styles.archiveHint}>{t(UI.archiveHint, lang)}</Text>
              </View>
              <Icon.ChevronRight size={22} color={colors.gold} />
            </PressScale>
          </Reveal>

          {/* Heritage Ledger (on-chain) */}
          <Reveal delay={230 + rest.length * 90 + 100} style={styles.heritageWrap}>
            <PressScale style={styles.heritageBtn} onPress={onHeritage} accessibilityLabel={t(UI.heritage, lang)}>
              <View style={styles.liveDot} />
              <Icon.Link2 size={13} color={colors.gold} />
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
      <View style={styles.featuredBadge}>
        <Text style={styles.featuredBadgeText}>Featured</Text>
      </View>
      <View style={styles.featureText}>
        <Text style={styles.featureKicker}>
          {module.author} · {module.year}
        </Text>
        <Text style={styles.featureTitle}>{module.title}</Text>
        <Text style={styles.featureBlurb} numberOfLines={2}>
          {t(module.blurb, lang)}
        </Text>
        <View style={styles.featureCtaPill}>
          <Text style={styles.featureCtaText}>{beginLabel}</Text>
          <Icon.ArrowRight size={15} color="#1A0E05" />
        </View>
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
      <Text style={styles.rowIndex}>{String(n).padStart(2, "0")}</Text>
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
      <Icon.ChevronRight size={22} color="rgba(255,255,255,0.5)" />
    </PressScale>
  );
}

// Cultural Atlas entry — a compact image chip in a 2-up grid. More browsable and visual than a
// list row, and it lets the heritage art carry the section. Grounded content, cited on the About screen.
function AtlasChip({ module, lang, onPress }: { module: Module; lang: Lang; onPress: () => void }) {
  const hero = module.scenes[0];
  const source = sceneImageSource(module.id, hero.id, `${hero.imagePrompt}, ${PHOTO}`, { seed: hero.seed, w: 512, h: 512 });
  return (
    <PressScale style={styles.achip} onPress={onPress} accessibilityLabel={`${module.title} — ${module.author}`}>
      <View style={StyleSheet.absoluteFill}>
        <SceneImage source={source} />
      </View>
      <LinearGradient
        colors={["transparent", "rgba(14,28,46,0.35)", "rgba(14,28,46,0.9)"]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <View style={styles.achipStar}><Icon.Sparkles size={13} color={colors.gold} /></View>
      <View style={styles.achipText}>
        <Text style={styles.achipTitle} numberOfLines={2}>{module.title}</Text>
        <Text style={styles.achipMeta} numberOfLines={1}>{module.author}</Text>
      </View>
    </PressScale>
  );
}

const SHADOW = "0px 10px 24px rgba(22,41,63,0.14)";
const SHADOW_SOFT = "0px 6px 16px rgba(22,41,63,0.07)";

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  wash: { position: "absolute", top: 0, left: 0, right: 0, height: 340 },
  content: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxl },

  topBar: { flexDirection: "row", justifyContent: "flex-end", marginBottom: spacing.md },

  masthead: { alignItems: "center", marginBottom: spacing.xl },

  // Kicker flanked by hairlines — editorial masthead treatment (gold = the mission line matters)
  kickerRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.sm, marginBottom: spacing.sm },
  kickerLine: { width: 24, height: 1, backgroundColor: colors.gold, opacity: 0.7 },
  kicker: {
    color: colors.gold,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  brand: {
    color: "#fff",
    fontFamily: fonts.display,
    fontSize: 40,
    letterSpacing: 1,
    textTransform: "uppercase",
    lineHeight: 42,
    textAlign: "center",
  },
  tagline: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.serifItalic, fontSize: 16, marginTop: spacing.sm },

  sectionHead: { marginBottom: spacing.lg },
  sectionLabelRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  sectionTick: { width: 14, height: 3, borderRadius: 2, backgroundColor: colors.orange },
  sectionLabel: {
    color: "#fff",
    fontFamily: fonts.displaySemi,
    fontSize: 15,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  sectionSub: { color: "rgba(255,255,255,0.55)", fontFamily: fonts.body, fontSize: type.small + 1, lineHeight: 20, marginTop: 6 },

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
  featureBlurb: { color: colors.sand, fontFamily: fonts.serifItalic, fontSize: type.body, lineHeight: 25, marginTop: spacing.sm, opacity: 0.95 },
  featuredBadge: {
    position: "absolute",
    top: spacing.md,
    left: spacing.lg,
    backgroundColor: colors.orange,
    borderRadius: radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  featuredBadgeText: {
    color: "#1A0E05",
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  featureCtaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    backgroundColor: colors.orange,
    borderRadius: radius.pill,
    paddingVertical: 11,
    paddingHorizontal: 18,
    marginTop: spacing.md,
  },
  featureCtaText: {
    color: "#1A0E05",
    fontFamily: fonts.bodyBold,
    fontSize: type.small,
    letterSpacing: 0.8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: radius.md,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },
  rowIndex: { color: colors.orange, fontFamily: fonts.display, fontSize: 24, width: 32 },
  rowThumb: { width: 60, height: 76, borderRadius: radius.sm, overflow: "hidden", backgroundColor: "#111" },
  rowTitle: { color: "#fff", fontFamily: fonts.serif, fontSize: type.title, lineHeight: type.title + 4 },
  rowMeta: {
    color: colors.orange,
    fontFamily: fonts.bodyBold,
    fontSize: type.small - 1,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginTop: 2,
  },
  rowBlurb: { color: "rgba(255,255,255,0.58)", fontFamily: fonts.body, fontSize: type.small + 1, lineHeight: 19, marginTop: 4 },
  chevron: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.body, fontSize: 26 },

  // Cultural Atlas — 2-up image chips
  atlasGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  atlasCell: { width: "48.5%", marginBottom: spacing.md },
  achip: {
    height: 132,
    borderRadius: radius.md,
    overflow: "hidden",
    backgroundColor: "#111",
    justifyContent: "flex-end",
    padding: spacing.md,
    boxShadow: SHADOW_SOFT,
  },
  achipStar: { position: "absolute", top: spacing.sm, left: spacing.md },
  achipText: {},
  achipTitle: { color: colors.sand, fontFamily: fonts.serif, fontSize: type.body, lineHeight: type.body + 3 },
  achipMeta: {
    color: colors.gold,
    fontFamily: fonts.bodySemi,
    fontSize: type.small - 2,
    letterSpacing: 0.5,
    marginTop: 3,
    opacity: 0.9,
  },

  archive: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: "#0a0a0a",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },
  archiveMark: { width: 44, height: 44, borderRadius: 13, backgroundColor: "rgba(217,106,28,0.18)", borderWidth: 1, borderColor: "rgba(235,164,60,0.4)", alignItems: "center", justifyContent: "center" },
  archiveTitle: { color: "#fff", fontFamily: fonts.displaySemi, fontSize: type.title },
  archiveHint: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.body, fontSize: type.small + 1, marginTop: 2 },
  archiveChevron: { color: colors.gold, fontFamily: fonts.body, fontSize: 26 },

  provNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: "#0a0a0a",
    borderWidth: 1,
    borderColor: "rgba(235,164,60,0.3)",
  },
  provNavTitle: { color: "#fff", fontFamily: fonts.displaySemi, fontSize: type.title },
  provNavHint: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.body, fontSize: type.small + 1, marginTop: 2 },
  provNavChevron: { color: colors.gold, fontFamily: fonts.body, fontSize: 26 },

  heritageWrap: { alignItems: "center", marginTop: spacing.lg },
  heritageBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: radius.pill,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#3FBF6A" },
  heritageText: {
    color: "#fff",
    fontFamily: fonts.bodyBold,
    fontSize: type.small,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  aboutWrap: { alignItems: "center", marginTop: spacing.xl },
  aboutText: {
    color: "rgba(255,255,255,0.6)",
    fontFamily: fonts.bodyBold,
    fontSize: type.small,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
