import React from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { Module, Lang } from "../content/types";
import { modules, atlasModules } from "../content";
import { sceneImageSource } from "../content/images";
import { t } from "../i18n";
import { LinearGradient } from "expo-linear-gradient";
import { SceneImage } from "./SceneImage";
import { LanguagePicker } from "./LanguagePicker";
import { PressScale, Reveal } from "./Motion";
import { colors, spacing, radius, fonts } from "../theme/tokens";
import { Icon } from "../ui";

// The front door — a scrolling "Modern South Africa" landing page: a full-bleed hero, then a stack of
// alternating image/text sections divided by thick sa-blue rules. Each section maps to real app
// content and is tappable into the relevant screen. Palette: sa-blue #1A85A7 + sa-slate #233342,
// Montserrat headings + Inter body.

const KICKER = "Reclaiming African Voices";
const PHOTO = "warm documentary photography, golden natural light, photorealistic, dignified African subjects, rich colour";

const UI = {
  begin: { en: "Begin reading", tn: "Simolola go bala" },
  pillarsKicker: { en: "The Literature", tn: "Dingwalo" },
  pillars: { en: "The Four Pillars", tn: "Dikokwane tse Nne" },
  pillarsSub: {
    en: "Foundational works of South African literature — read, heard, and kept alive.",
    tn: "Dingwalo tsa motheo tsa Aforika Borwa — di badiwa, di utlwiwa, di tshelwa.",
  },
  atlasKicker: { en: "Heritage", tn: "Boswa" },
  atlas: { en: "Cultural Atlas", tn: "Atlase ya Setso" },
  atlasSub: {
    en: "The history, customs and heroes behind the literature — grounded and cited.",
    tn: "Hisitori, ngwao le bagaki ba ba mo tlase ga dingwalo — di theilwe mo metsweding.",
  },
  provKicker: { en: "The Land", tn: "Naga" },
  provinces: { en: "The Nine Provinces", tn: "Diporofense tse RobMongwe" },
  provSub: {
    en: "Nine provinces, hundreds of cities and towns — each with its own founders, leaders and living history.",
    tn: "Diporofense tse robmongwe, metse e mentsi — nngwe le nngwe e na le hisitori ya yona.",
  },
  provCta: { en: "Explore the provinces", tn: "Sekaseka diporofense" },
  presKicker: { en: "Democratic South Africa", tn: "Aforika Borwa ya Temokrasi" },
  presidents: { en: "The Presidents", tn: "Dipresidente" },
  presSub: {
    en: "The leaders who shaped South Africa from 1994 — their lives, struggles and legacies, recorded honestly.",
    tn: "Baeteledipele ba ba bopileng Aforika Borwa go tloga ka 1994 — matshelo, ditlhabano le boswa jwa bona.",
  },
  presCta: { en: "Meet the presidents", tn: "Kopana le dipresidente" },
  archiveKicker: { en: "Your voice, your history", tn: "Lentswe la gago" },
  archive: { en: "Community Archive", tn: "Polokelo ya Setšhaba" },
  archiveSub: {
    en: "Record an elder's story, a memory or a tradition in your own words — kept on your terms, under POPIA consent.",
    tn: "Gatisa kanegelo ya mogolo, kgopolo kgotsa ngwao ka mafoko a gago — e bolokwa ka fa go wena.",
  },
  archiveCta: { en: "Record a story", tn: "Gatisa kanegelo" },
  about: { en: "About the Sources", tn: "Ka ga Metswedi" },
  heritage: { en: "Heritage Ledger · on-chain", tn: "Rekoto ya Boswa · mo blockchain" },
};

// The generated (or Pollinations) hero image for a module — used as the big section photos.
function heroSource(m: Module, w = 1200, h = 900) {
  const s = m.scenes[0];
  return sceneImageSource(m.id, s.id, `${s.imagePrompt}, ${PHOTO}`, { seed: s.seed, w, h });
}

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
  const { height } = useWindowDimensions();
  const heroH = Math.max(520, Math.min(height, 760));

  return (
    <View style={styles.root}>
      {/* Language picker floats over the hero */}
      <View style={styles.langBar} pointerEvents="box-none">
        <LanguagePicker lang={lang} onChange={onLangChange} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 0 }} showsVerticalScrollIndicator={false}>
        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <View style={[styles.hero, { height: heroH }]}>
          <View style={StyleSheet.absoluteFill}>
            <SceneImage source={heroSource(modules[0], 1400, 1600)} kenBurns />
          </View>
          <LinearGradient
            colors={["rgba(26,39,50,0.35)", "rgba(26,39,50,0.15)", "rgba(26,39,50,0.85)"]}
            locations={[0, 0.45, 1]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
          <View style={styles.heroInner}>
            <Reveal style={styles.heroTitleWrap}>
              <Text style={styles.heroTitle}>Ubuntu{"\n"}Heritage</Text>
            </Reveal>
            <Reveal delay={150} style={styles.heroCard}>
              <Text style={styles.heroCardTitle}>Reclaiming African Voices</Text>
              <Text style={styles.heroCardSub}>MANTSWE A MALOBA — VOICES OF YESTERDAY</Text>
            </Reveal>
          </View>
        </View>

        {/* ── THE FOUR PILLARS (slate) ───────────────────────────────────────── */}
        <Section
          tone="slate"
          image={heroSource(modules[1])}
          kicker={t(UI.pillarsKicker, lang)}
          title={t(UI.pillars, lang)}
          intro={t(UI.pillarsSub, lang)}
        >
          <View style={styles.linkList}>
            {modules.map((m) => (
              <LinkRow
                key={m.id}
                tone="slate"
                title={m.title}
                meta={`${m.author}${m.year ? ` · ${m.year}` : ""}`}
                onPress={() => onOpen(m.id)}
              />
            ))}
          </View>
        </Section>

        {/* ── CULTURAL ATLAS (light) ─────────────────────────────────────────── */}
        <Section
          tone="light"
          reverse
          image={heroSource(atlasModules[0])}
          kicker={t(UI.atlasKicker, lang)}
          title={t(UI.atlas, lang)}
          intro={t(UI.atlasSub, lang)}
        >
          <View style={styles.linkList}>
            {atlasModules.map((m) => (
              <LinkRow key={m.id} tone="light" title={m.title} meta={m.author} onPress={() => onOpen(m.id)} />
            ))}
          </View>
        </Section>

        {/* ── THE NINE PROVINCES (slate) ─────────────────────────────────────── */}
        <Section
          tone="slate"
          image={heroSource(atlasModules[2])}
          kicker={t(UI.provKicker, lang)}
          title={t(UI.provinces, lang)}
          intro={t(UI.provSub, lang)}
        >
          <CtaButton label={t(UI.provCta, lang)} onPress={onProvinces} />
        </Section>

        {/* ── THE PRESIDENTS (blue) ──────────────────────────────────────────── */}
        <Section
          tone="blue"
          reverse
          image={heroSource(modules[2])}
          kicker={t(UI.presKicker, lang)}
          title={t(UI.presidents, lang)}
          intro={t(UI.presSub, lang)}
        >
          <CtaButton label={t(UI.presCta, lang)} onPress={onPresidents} light />
        </Section>

        {/* ── COMMUNITY ARCHIVE (slate) ──────────────────────────────────────── */}
        <Section
          tone="slate"
          image={heroSource(modules[3])}
          kicker={t(UI.archiveKicker, lang)}
          title={t(UI.archive, lang)}
          intro={t(UI.archiveSub, lang)}
        >
          <CtaButton label={t(UI.archiveCta, lang)} onPress={onArchive} icon />
        </Section>

        {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
        <View style={styles.footer}>
          <Text style={styles.footerBrand}>Ubuntu{"\n"}Heritage</Text>
          <Text style={styles.footerLede}>
            South Africa's foundational literature and heritage — vivid, multilingual and free.
          </Text>
          <Pressable style={styles.footerLink} onPress={onAbout}>
            <Text style={styles.footerLinkText}>{t(UI.about, lang)}</Text>
            <Icon.ArrowRight size={16} color={colors.dsBlue} />
          </Pressable>
          <Pressable style={styles.footerLink} onPress={onHeritage}>
            <View style={styles.liveDot} />
            <Text style={styles.footerLinkText}>{t(UI.heritage, lang)}</Text>
          </Pressable>
          <Text style={styles.footerFine}>{KICKER} · POPIA-compliant · built on free-tier, African-built AI</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// ── A full-width alternating image/text section, divided by a thick sa-blue top rule ──────────────
function Section({
  tone,
  reverse,
  image,
  kicker,
  title,
  intro,
  children,
}: {
  tone: "slate" | "light" | "blue";
  reverse?: boolean;
  image: string | number;
  kicker: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  const bg = tone === "light" ? colors.dsCloud : tone === "blue" ? colors.dsBlue : colors.dsSlate;
  const titleColor = tone === "light" ? colors.dsSlate : "#FFFFFF";
  const kickerColor = tone === "blue" ? "#FFFFFF" : colors.dsBlue;
  const introColor =
    tone === "light" ? "rgba(35,51,66,0.72)" : tone === "blue" ? "rgba(255,255,255,0.92)" : colors.dsGray;

  const imageBlock = (
    <View style={styles.sectionImage}>
      <SceneImage source={image} />
    </View>
  );
  const textBlock = (
    <Reveal style={styles.sectionText}>
      {/* decorative blue accent bar (hidden on blue sections where it wouldn't read) */}
      {tone !== "blue" && <View style={styles.accentBar} />}
      <Text style={[styles.sectionKicker, { color: kickerColor }]}>{kicker.toUpperCase()}</Text>
      <Text style={[styles.sectionTitle, { color: titleColor }]}>{title}</Text>
      <Text style={[styles.sectionIntro, { color: introColor }]}>{intro}</Text>
      {children}
    </Reveal>
  );

  return (
    <View style={[styles.section, { backgroundColor: bg }]}>
      {/* On a phone-width column the split always stacks; `reverse` flips image above/below the text. */}
      {reverse ? (
        <>
          {textBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {textBlock}
        </>
      )}
    </View>
  );
}

// A tappable list row with the landing page's blue left-border treatment.
function LinkRow({
  tone,
  title,
  meta,
  onPress,
}: {
  tone: "slate" | "light";
  title: string;
  meta?: string;
  onPress: () => void;
}) {
  const light = tone === "light";
  return (
    <PressScale style={[styles.linkRow, light ? styles.linkRowLight : styles.linkRowSlate]} onPress={onPress}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.linkTitle, { color: light ? colors.dsSlate : "#FFFFFF" }]}>{title}</Text>
        {meta ? <Text style={styles.linkMeta}>{meta}</Text> : null}
      </View>
      <Icon.ChevronRight size={20} color={colors.dsBlue} />
    </PressScale>
  );
}

// The pill CTA — solid sa-blue (or white-on-blue on blue sections).
function CtaButton({
  label,
  onPress,
  light,
  icon,
}: {
  label: string;
  onPress: () => void;
  light?: boolean;
  icon?: boolean;
}) {
  return (
    <PressScale style={[styles.cta, light && styles.ctaLight]} onPress={onPress} accessibilityLabel={label}>
      {icon && <Icon.Mic size={17} color={light ? colors.dsBlue : "#FFFFFF"} />}
      <Text style={[styles.ctaText, { color: light ? colors.dsBlue : "#FFFFFF" }]}>{label}</Text>
      <Icon.ArrowRight size={17} color={light ? colors.dsBlue : "#FFFFFF"} />
    </PressScale>
  );
}

const BLUE = "#1A85A7";
const SLATE = "#233342";

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: SLATE },
  langBar: { position: "absolute", top: 0, right: 0, zIndex: 20, paddingTop: spacing.lg, paddingRight: spacing.lg },

  // Hero
  hero: { width: "100%", justifyContent: "flex-end", backgroundColor: SLATE },
  heroInner: { flex: 1, justifyContent: "space-between", paddingHorizontal: spacing.lg, paddingTop: 90, paddingBottom: spacing.xl },
  heroTitleWrap: { alignItems: "center", flex: 1, justifyContent: "center" },
  heroTitle: {
    color: "#FFFFFF",
    fontFamily: fonts.display,
    fontSize: 60,
    lineHeight: 60,
    letterSpacing: -1,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 18,
  },
  heroCard: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "rgba(26,39,50,0.42)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  heroCardTitle: { color: "#FFFFFF", fontFamily: fonts.heading, fontSize: 20, textAlign: "center" },
  heroCardSub: { color: "rgba(255,255,255,0.9)", fontFamily: fonts.bodySemi, fontSize: 11, letterSpacing: 2, marginTop: 8, textAlign: "center" },

  // Section
  section: { width: "100%", borderTopWidth: 8, borderTopColor: BLUE },
  sectionImage: { width: "100%", height: 260, backgroundColor: SLATE },
  sectionText: { paddingHorizontal: spacing.lg, paddingVertical: spacing.xl },
  accentBar: { width: 56, height: 6, backgroundColor: BLUE, marginBottom: spacing.md },
  sectionKicker: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2.5, marginBottom: spacing.sm },
  sectionTitle: { fontFamily: fonts.displaySemi, fontSize: 34, lineHeight: 37, letterSpacing: -0.5 },
  sectionIntro: { fontFamily: fonts.body, fontSize: 16, lineHeight: 25, marginTop: spacing.md },

  // Link list (blue left border)
  linkList: { marginTop: spacing.lg, borderLeftWidth: 4, borderLeftColor: BLUE, paddingLeft: spacing.md, gap: spacing.sm },
  linkRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, paddingVertical: spacing.md, paddingHorizontal: spacing.md, borderRadius: radius.sm },
  linkRowSlate: { backgroundColor: "rgba(255,255,255,0.05)" },
  linkRowLight: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "rgba(35,51,66,0.10)" },
  linkTitle: { fontFamily: fonts.heading, fontSize: 17 },
  linkMeta: { color: BLUE, fontFamily: fonts.bodySemi, fontSize: 12, letterSpacing: 0.5, marginTop: 2, textTransform: "uppercase" },

  // CTA
  cta: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    alignSelf: "flex-start",
    backgroundColor: BLUE,
    borderRadius: radius.pill,
    paddingVertical: 13,
    paddingHorizontal: 22,
    marginTop: spacing.lg,
  },
  ctaLight: { backgroundColor: "#FFFFFF" },
  ctaText: { fontFamily: fonts.bodyBold, fontSize: 15, letterSpacing: 0.3 },

  // Footer
  footer: { backgroundColor: colors.dsNavyDeep, borderTopWidth: 8, borderTopColor: BLUE, paddingHorizontal: spacing.lg, paddingVertical: spacing.xxl },
  footerBrand: { color: BLUE, fontFamily: fonts.display, fontSize: 44, lineHeight: 44, letterSpacing: -1 },
  footerLede: { color: "rgba(255,255,255,0.85)", fontFamily: fonts.body, fontSize: 16, lineHeight: 24, marginTop: spacing.md, maxWidth: 340 },
  footerLink: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.lg },
  footerLinkText: { color: "#FFFFFF", fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 1, textTransform: "uppercase" },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.live },
  footerFine: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.body, fontSize: 12, lineHeight: 18, marginTop: spacing.xl },
});
