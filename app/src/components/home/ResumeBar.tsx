import React from "react";
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { Lang } from "../../content/types";
import { t } from "../../i18n";
import { colors, spacing, radius, fonts } from "../../theme/tokens";
import { Icon } from "../../ui";
import { SceneImage } from "../SceneImage";
import { historyTrail } from "../../content/history-trail";
import { journeyMedia } from "../../content/journey-media";
import { countryByCode } from "../../content/anthems";
import { stageId, journeyFraction, type Progress } from "../../services/progress/progress";

// "Continue your journey" (v2 V2-20) — the resume bar that sits directly under the hero.
//
// It only appears once there is something to resume. A bar reading "Chapter 1 · 0%" on a first visit
// is worse than no bar: it makes an empty app look like a chore list. So this renders nothing until
// at least one stage is finished, and the hero stands alone until then.

const UI = {
  continue: {
    en: "Continue your journey", tn: "Tswelela ka leeto la gago", af: "Gaan voort met jou reis", zu: "Qhubeka nohambo lwakho", xh: "Qhubeka nohambo lwakho",
    nso: "Tšwela pele ka leeto la gago", st: "Tswela pele ka leeto la hao", ss: "Chubeka neluhambo lwakho", ts: "Ya emahlweni ni riendzo ra wena", nr: "Ragela phambili nekhambo lakho", ve: "Bvelani phanḓa na lwendo lwaṋu",
  },
  resume: {
    en: "Resume", tn: "Tswelela", af: "Hervat", zu: "Qhubeka", xh: "Qhubeka",
    nso: "Tšwela pele", st: "Tswela pele", ss: "Chubeka", ts: "Ya emahlweni", nr: "Ragela phambili", ve: "Bvelani phanḓa",
  },
  stage: {
    en: "Stage", tn: "Seelo", af: "Fase", zu: "Isigaba", xh: "Inqanaba",
    nso: "Legato", st: "Mothati", ss: "Sigaba", ts: "Goza", nr: "Igadango", ve: "Tshiimo",
  },
  cards: {
    en: "cards", tn: "dikarata", af: "kaarte", zu: "amakhadi", xh: "amakhadi",
    nso: "dikarata", st: "dikarete", ss: "emakhadi", ts: "makhadi", nr: "iinkharada", ve: "khadi",
  },
  stars: {
    en: "stars", tn: "dinaledi", af: "sterre", zu: "izinkanyezi", xh: "iinkwenkwezi",
    nso: "dinaledi", st: "dinaledi", ss: "tinkhanyeti", ts: "tinyeleti", nr: "iinkwekwezi", ve: "ṋaledzi",
  },
};

export function ResumeBar({
  lang,
  country,
  progress,
  onResume,
}: {
  lang: Lang;
  country: string;
  progress: Progress;
  onResume: (milestoneId: string) => void;
}) {
  const { width } = useWindowDimensions();
  const wide = width >= 760;

  const doneCount = progress.stagesDone.filter((s) => s.startsWith(`${country}:`)).length;
  // Nothing to resume yet — say nothing at all.
  if (doneCount === 0) return null;

  // The first stage not yet finished, numbered from 1 to match JourneyScreen.
  let nextIdx = historyTrail.findIndex((_, i) => !progress.stagesDone.includes(stageId(country, i + 1)));
  if (nextIdx < 0) nextIdx = historyTrail.length - 1; // the whole journey is done — offer the last one
  const milestone = historyTrail[nextIdx];
  if (!milestone) return null;

  const nation = countryByCode(country);
  const pct = Math.round(journeyFraction(progress, country, historyTrail.length) * 100);
  const art = journeyMedia[milestone.id]?.image;

  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={() => onResume(milestone.id)}
        accessibilityRole="link"
        accessibilityLabel={`${t(UI.continue, lang)} — ${milestone.year} ${milestone.title}`}
        style={({ hovered }: any) => [styles.bar, wide && styles.barWide, hovered && styles.barHover]}
      >
        {art ? (
          <View style={styles.thumb}>
            <SceneImage source={art} />
          </View>
        ) : null}

        <View style={styles.body}>
          <Text style={styles.label}>
            {t(UI.continue, lang)} · {nation.name}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {t(UI.stage, lang)} {nextIdx + 1} — {milestone.year}, {milestone.title}
          </Text>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${Math.max(pct, 2)}%` }]} />
          </View>
        </View>

        <View style={[styles.right, !wide && styles.rightNarrow]}>
          <Text style={styles.stats}>
            {progress.stars} {t(UI.stars, lang)} · {progress.cards.length} {t(UI.cards, lang)}
          </Text>
          <View style={styles.cta}>
            <Icon.Play size={13} color={colors.night} fill={colors.night} />
            <Text style={styles.ctaText}>{t(UI.resume, lang)}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // Pulled up over the hero's lower edge, the way the source design's resume card overlaps.
  wrap: { paddingHorizontal: spacing.lg, marginTop: -46, zIndex: 3 },
  bar: {
    width: "100%",
    maxWidth: 1160,
    alignSelf: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "rgba(26,133,167,0.45)",
    backgroundColor: "#0B0B0B",
  },
  barWide: { flexDirection: "row", alignItems: "center" },
  barHover: { borderColor: colors.dsBlue },

  thumb: {
    width: 116,
    height: 70,
    borderRadius: radius.sm,
    overflow: "hidden",
    backgroundColor: colors.card,
    flexShrink: 0,
  },

  body: { flex: 1, minWidth: 0, gap: 6 },
  label: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: fonts.bodySemi,
    fontSize: 10.5,
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },
  title: { color: "#FFFFFF", fontFamily: fonts.heading, fontSize: 18, lineHeight: 24 },
  track: { height: 4, backgroundColor: "rgba(255,255,255,0.16)", borderRadius: 2, overflow: "hidden", maxWidth: 420 },
  fill: { height: 4, backgroundColor: colors.dsBlue },

  right: { alignItems: "flex-end", gap: spacing.sm, flexShrink: 0 },
  rightNarrow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  stats: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.body, fontSize: 12.5 },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.dsBlue,
    borderRadius: radius.pill,
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
  ctaText: { color: colors.night, fontFamily: fonts.bodyBold, fontSize: 13.5, letterSpacing: 0.3 },
});
