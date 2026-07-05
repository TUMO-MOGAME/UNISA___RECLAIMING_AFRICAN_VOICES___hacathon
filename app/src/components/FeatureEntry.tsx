import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "../ui";
import { spacing, radius, fonts } from "../theme/tokens";
import { PressScale } from "./Motion";

// One editorial "magazine feature" row — big index number + rule, a category kicker, a large headline,
// a wide visual (photo or monogram panel), a lead paragraph and a CTA. Shared by the Cultural Atlas,
// Provinces and Presidents overviews so every "index" page reads the same. The caller supplies `visual`
// (e.g. a SceneImage + gradient, or a monogram block) which fills the fixed-height frame.

const BLUE = "#1A85A7";
const numOf = (i: number) => (i + 1).toString().padStart(2, "0");

export function FeatureEntry({
  index,
  kicker,
  title,
  visual,
  visualAspect,
  lead,
  leadLines,
  ctaLabel,
  onPress,
  wide,
}: {
  index: number;
  kicker?: string;
  title: string;
  visual: React.ReactNode;
  /** Width/height ratio for the visual frame — set to show artwork uncropped (e.g. the ≈16:9
   *  heritage title cards, whose baked-in borders and headlines must never be cut). Omit for the
   *  default fixed-height editorial crop used for photography. */
  visualAspect?: number;
  lead?: string;
  leadLines?: number;
  ctaLabel: string;
  onPress: () => void;
  wide: boolean;
}) {
  return (
    <View style={s.pad}>
      <PressScale style={s.entry} onPress={onPress} accessibilityLabel={`${title}. ${ctaLabel}`}>
        <View style={s.top}>
          <Text style={s.num}>{numOf(index)}</Text>
          <View style={s.rule} />
        </View>

        {kicker ? <Text style={s.cat}>{kicker}</Text> : null}
        <Text style={[s.title, wide && s.titleWide]}>{title}</Text>

        <View style={[s.imageWrap, visualAspect ? { aspectRatio: visualAspect } : { height: wide ? 300 : 200 }]}>{visual}</View>

        {lead ? (
          <Text style={[s.lead, wide && s.leadWide]} numberOfLines={leadLines}>
            {lead}
          </Text>
        ) : null}

        <View style={s.readRow}>
          <Text style={s.readText}>{ctaLabel.toUpperCase()}</Text>
          <Icon.ArrowRight size={16} color="#FFFFFF" />
        </View>
      </PressScale>
    </View>
  );
}

const s = StyleSheet.create({
  pad: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  entry: { marginTop: spacing.xl, marginBottom: spacing.md },
  top: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.md },
  num: { color: BLUE, fontFamily: fonts.display, fontSize: 34, lineHeight: 34, letterSpacing: -1 },
  rule: { flex: 1, height: 2, backgroundColor: "rgba(255,255,255,0.14)" },
  cat: { color: "rgba(255,255,255,0.55)", fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: spacing.sm },
  title: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 30, lineHeight: 33, letterSpacing: -0.5, marginBottom: spacing.lg },
  titleWide: { fontSize: 44, lineHeight: 46 },
  imageWrap: { width: "100%", borderRadius: radius.md, overflow: "hidden", backgroundColor: "#000000", marginBottom: spacing.lg },
  lead: { color: "rgba(255,255,255,0.74)", fontFamily: fonts.body, fontSize: 16, lineHeight: 26, marginBottom: spacing.lg },
  leadWide: { fontSize: 18, lineHeight: 29, maxWidth: 660 },
  readRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  readText: { color: "#FFFFFF", fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 1.5 },
});
