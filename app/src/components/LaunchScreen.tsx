import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, spacing, fonts, motion } from "../theme/tokens";

// Branded opening frame — the first thing a judge (and the demo video) sees. The wordmark fades up
// over a baobab-dusk gradient, holds a beat, then the whole cover fades out to reveal the app.
// Overlays the real UI (which renders underneath once fonts are ready), so there's no white flash.

export function LaunchScreen({ onDone }: { onDone: () => void }) {
  const wordmark = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(12)).current;
  const cover = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(wordmark, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(rise, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(650),
      Animated.timing(cover, {
        toValue: 0,
        duration: motion.slow,
        useNativeDriver: true,
      }),
    ]).start(() => onDone());
  }, [cover, rise, wordmark]);

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, styles.root, { opacity: cover }]}
      pointerEvents="none"
    >
      <LinearGradient
        colors={[colors.navyDeep, colors.navy, colors.card]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={[colors.glowEmber, "transparent"]}
        style={styles.topGlow}
        pointerEvents="none"
      />
      <Animated.View
        style={{ opacity: wordmark, transform: [{ translateY: rise }], alignItems: "center" }}
      >
        <Text style={styles.kicker}>Reclaiming African Voices</Text>
        <Text style={styles.brand}>Maloba</Text>
        <View style={styles.rule} />
        <Text style={styles.tagline}>Mantswe a maloba</Text>
        <Text style={styles.sub}>Voices of Yesterday</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: "center", justifyContent: "center" },
  topGlow: { position: "absolute", top: 0, left: 0, right: 0, height: 260 },
  kicker: {
    color: colors.gold,
    fontFamily: fonts.bodySemi,
    fontSize: 12,
    letterSpacing: 4,
    textTransform: "uppercase",
    marginBottom: spacing.md,
  },
  brand: {
    color: colors.sand,
    fontFamily: fonts.display,
    fontSize: 72,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  rule: {
    width: 56,
    height: 3,
    backgroundColor: colors.orange,
    borderRadius: 2,
    marginVertical: spacing.md,
  },
  tagline: {
    color: colors.sand,
    fontFamily: fonts.bodyMedium,
    fontSize: 16,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  sub: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 14,
    marginTop: spacing.xs,
    fontStyle: "italic",
  },
});
