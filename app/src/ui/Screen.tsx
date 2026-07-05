import React from "react";
import { View, ScrollView, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { colors, spacing } from "../theme/tokens";

// The page shell every screen sits in. Guarantees the same background, safe-area, padding and warm
// top-wash on every page — so a new page is on-brand by default. `tone="paper"` (default) is the cream
// world; `tone="dark"` is the immersive navy world (e.g. full-screen readers). See src/ui/README.md.

export function Screen({
  children,
  tone = "paper",
  scroll = true,
  padded = true,
  contentStyle,
}: {
  children: React.ReactNode;
  tone?: "paper" | "dark";
  scroll?: boolean;
  padded?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}) {
  // "Modern South Africa" deck world — every screen sits on the deep-navy ground.
  const bg = tone === "dark" ? colors.dsNavyDeep : colors.dsNavy;
  const pad = padded ? styles.padded : null;
  // Real insets on BOTH platforms — the core SafeAreaView is a no-op on Android, which was putting
  // full-bleed screens under the status bar/notch. Returns zeros on web.
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: bg }]}>
      {tone === "paper" && (
        <LinearGradient colors={[colors.glowGold, "transparent"]} style={styles.wash} pointerEvents="none" />
      )}
      <View style={[styles.flex, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]}>
        {scroll ? (
          <ScrollView contentContainerStyle={[pad, contentStyle]} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.flex, pad, contentStyle]}>{children}</View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },
  wash: { position: "absolute", top: 0, left: 0, right: 0, height: 320 },
  padded: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxl },
});
