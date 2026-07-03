import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors, spacing, fonts } from "../theme/tokens";
import { Kicker, Display } from "./Type";

// Consistent page header — an orange back link, an optional kicker, and an Anton page title. Used by
// every secondary screen so back-navigation and titling look identical app-wide. See src/ui/README.md.

export function ScreenHeader({
  title,
  kicker,
  backLabel = "‹ Back",
  onBack,
  onDark,
}: {
  title: string;
  kicker?: string;
  backLabel?: string;
  onBack: () => void;
  onDark?: boolean;
}) {
  return (
    <View style={styles.wrap}>
      <Pressable onPress={onBack} hitSlop={12} style={styles.back}>
        <Text style={styles.backText}>{backLabel}</Text>
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
    color: colors.orange,
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  title: { fontSize: 34, lineHeight: 38 },
});
