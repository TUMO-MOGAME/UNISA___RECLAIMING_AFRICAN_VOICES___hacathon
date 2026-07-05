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

// The localized "‹ Back" label — reused by SideIndexScroll so the sidebar back link reads identically.
export function backLabelFor(lang?: LangCode) {
  return `‹ ${t(BACK, lang ?? "en")}`;
}

export function ScreenHeader({
  title,
  kicker,
  backLabel,
  lang,
  onBack,
  onDark,
  showBack = true,
}: {
  title: string;
  kicker?: string;
  backLabel?: string;
  lang?: LangCode;
  onBack: () => void;
  onDark?: boolean;
  /** Hide the header's own back link (e.g. on wide index pages where the sidebar carries it). */
  showBack?: boolean;
}) {
  return (
    <View style={styles.wrap}>
      {showBack ? (
        <Pressable onPress={onBack} hitSlop={12} style={styles.back}>
          <Text style={styles.backText}>{backLabel ?? backLabelFor(lang)}</Text>
        </Pressable>
      ) : null}
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
