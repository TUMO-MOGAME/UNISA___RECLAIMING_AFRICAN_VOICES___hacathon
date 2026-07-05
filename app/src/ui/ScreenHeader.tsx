import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { spacing, fonts } from "../theme/tokens";
import { t } from "../i18n";
import type { LangCode } from "../i18n";
import { Kicker, Display } from "./Type";

// Consistent page header — an orange back link, an optional kicker, and an Anton page title. Used by
// every secondary screen so back-navigation and titling look identical app-wide. See src/ui/README.md.

// "Back" in all 11 languages, so the back link switches with the app language.
const BACK = {
  en: "Back", tn: "Morago", af: "Terug", zu: "Emuva", xh: "Emva",
  nso: "Morago", st: "Morao", ss: "Emuva", ts: "Endzhaku", nr: "Emuva", ve: "Murahu",
};

export function ScreenHeader({
  title,
  kicker,
  backLabel,
  lang,
  onBack,
  onDark,
}: {
  title: string;
  kicker?: string;
  backLabel?: string;
  lang?: LangCode;
  onBack: () => void;
  onDark?: boolean;
}) {
  return (
    <View style={styles.wrap}>
      <Pressable onPress={onBack} hitSlop={12} style={styles.back}>
        <Text style={styles.backText}>{backLabel ?? `‹ ${t(BACK, lang ?? "en")}`}</Text>
      </Pressable>
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      <Display onDark={onDark} style={styles.title}>
        {title}
      </Display>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.lg },
  back: { marginBottom: spacing.md },
  backText: {
    color: "rgba(255,255,255,0.65)",
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  title: { fontSize: 34, lineHeight: 38 },
});
