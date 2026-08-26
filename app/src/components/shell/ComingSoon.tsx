import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Lang } from "../../content/types";
import { t } from "../../i18n";
import { colors, spacing, radius, fonts } from "../../theme/tokens";
import { Icon } from "../../ui";
import type { NavId } from "./nav";

// An honest placeholder for a room the shell can already reach but that is not built yet.
//
// The Week 1 gate is "every nav item lands on a real page" — a dead link fails that, and so does a
// page that pretends to be finished. This says plainly what will be here and when, so the nav can go
// live before the rooms behind it do. Each of these is replaced by the real screen in Weeks 2–3;
// when the last one goes, this file goes with it.

const UI = {
  building: {
    en: "Being built", tn: "E a agiwa", af: "Word gebou", zu: "Iyakhiwa", xh: "Iyakhiwa",
    nso: "E a agwa", st: "E ntse e hahuwa", ss: "Iyakhiwa", ts: "Ya akiwa", nr: "Iyakhiwa", ve: "I khou fhaṱwa",
  },
  back: {
    en: "Back to Home", tn: "Boela gae", af: "Terug huis toe", zu: "Buyela ekhaya", xh: "Buyela ekhaya",
    nso: "Boela gae", st: "Kgutlela hae", ss: "Buyela ekhaya", ts: "Tlhelela ekaya", nr: "Buyela ekhaya", ve: "Vhuyelela hayani",
  },
};

export type RoomPlan = { title: string; blurb: string; week: string };

/** What each unbuilt room will be, straight from the plan (docs/13-architecture-v2-plan.md §8–§9). */
export const ROOM_PLANS: Partial<Record<NavId, RoomPlan>> = {
  countries: {
    title: "Choose your country",
    blurb:
      "Every African nation gets its own journey. South Africa is live; the rest arrive one at a time, each researched with local historians. This is also where the national anthems live — 54 flags, and a recording for every country we have one for.",
    week: "Week 1 · this week",
  },
  watch: {
    title: "Watch",
    blurb:
      "The cinematic library — every scene from the four great books and the Cultural Atlas, browsable by theme, with the player, Child/Adult mode, 11 languages and a sources-and-provenance panel on every film.",
    week: "Week 2 · 2–8 Sep",
  },
  journey: {
    title: "The Journey",
    blurb:
      "The full staged trail for South Africa, 1652 to today — walk it chapter by chapter, watch the scene, answer a grounded question, and collect the chapter's heritage card.",
    week: "Week 2 · 2–8 Sep",
  },
  kids: {
    title: "Kids",
    blurb:
      "An audio-first way in for younger readers: an animal guide, today's story, songs, big picture-answers instead of text, and stickers to collect. Safe, ad-free, in your home language.",
    week: "Week 3 · 9–15 Sep",
  },
  schools: {
    title: "Schools",
    blurb:
      "A teacher's view — assign a chapter, see how the class is going, run a live quiz on the projector, and download CAPS-aligned lesson plans. Free for public schools.",
    week: "Week 3 · 9–15 Sep",
  },
  passport: {
    title: "My Passport",
    blurb:
      "Your heritage passport — the totem cards you have collected, the countries you have journeyed through, your stars and your streak. Everything stays on this device.",
    week: "Week 3 · 9–15 Sep",
  },
};

export function ComingSoon({
  room,
  lang,
  onHome,
}: {
  room: NavId;
  lang: Lang;
  onHome: () => void;
}) {
  const plan = ROOM_PLANS[room];
  if (!plan) return null;

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <View style={styles.badge}>
          <Icon.Clock size={12} color="#8FD3E8" />
          <Text style={styles.badgeText}>{t(UI.building, lang)}</Text>
        </View>
        <Text style={styles.title}>{plan.title}</Text>
        <Text style={styles.blurb}>{plan.blurb}</Text>
        <Text style={styles.when}>{plan.week}</Text>
        <Pressable onPress={onHome} style={styles.cta} accessibilityRole="link">
          <Icon.ArrowRight size={15} color={colors.dsBlue} />
          <Text style={styles.ctaText}>{t(UI.back, lang)}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center", justifyContent: "center", padding: spacing.lg, minHeight: 460 },
  card: { maxWidth: 560, width: "100%", alignItems: "flex-start", gap: spacing.md },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(26,133,167,0.55)",
    backgroundColor: "rgba(26,133,167,0.10)",
    borderRadius: radius.pill,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  badgeText: {
    color: "#8FD3E8",
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
  title: {
    color: "#FFFFFF",
    fontFamily: fonts.display,
    fontSize: 44,
    lineHeight: 46,
    letterSpacing: -1,
  },
  blurb: { color: "rgba(255,255,255,0.72)", fontFamily: fonts.body, fontSize: 16, lineHeight: 26 },
  when: {
    color: "rgba(255,255,255,0.45)",
    fontFamily: fonts.bodySemi,
    fontSize: 12,
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  cta: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.sm },
  ctaText: { color: colors.dsBlue, fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 1, textTransform: "uppercase" },
});
