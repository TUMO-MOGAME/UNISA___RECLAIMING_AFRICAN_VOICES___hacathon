import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { spacing, radius } from "../theme/tokens";

// Standard surface. `tone="light"` = white card on cream (default); `tone="navy"` = the brief's
// dark call-to-action block. Consistent radius, border and depth everywhere. See src/ui/README.md.

// Cross-platform depth (RN 0.76+ supports the `boxShadow` style prop on web + native).
export const cardShadow = { boxShadow: "0px 10px 24px rgba(22,41,63,0.12)" };

export function Card({
  children,
  tone = "light",
  style,
}: {
  children: React.ReactNode;
  tone?: "light" | "navy";
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.base, tone === "navy" ? styles.navy : styles.light, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.lg, padding: spacing.lg, ...cardShadow },
  light: { backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)" },
  navy: { backgroundColor: "#0A0A0A", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)" },
});
