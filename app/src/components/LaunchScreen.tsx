import React, { useEffect, useRef } from "react";
import { Animated, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, spacing, fonts } from "../theme/tokens";

// Branded opening frame — the first thing a judge (and the demo video) sees. A dramatic
// black-and-white South African image with the "UBUNTU HERITAGE" wordmark. TAP anywhere to enter the
// app (a gentle auto-advance is the fallback so it never gets stuck). Uses ImageBackground so the photo
// reliably fills on web + native.

export function LaunchScreen({ onDone }: { onDone: () => void }) {
  const wordmark = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(12)).current;
  const hint = useRef(new Animated.Value(0)).current;
  const cover = useRef(new Animated.Value(1)).current;
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    Animated.timing(cover, { toValue: 0, duration: 340, useNativeDriver: true }).start(() => onDone());
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(wordmark, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(rise, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
    // Pulsing "tap to enter" hint.
    Animated.loop(
      Animated.sequence([
        Animated.timing(hint, { toValue: 1, duration: 1100, delay: 900, useNativeDriver: true }),
        Animated.timing(hint, { toValue: 0.35, duration: 1100, useNativeDriver: true }),
      ])
    ).start();
    // Fallback auto-advance so a hands-free demo never stalls.
    const timer = setTimeout(finish, 6000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity: cover }]}>
      <Pressable style={StyleSheet.absoluteFill} onPress={finish} accessibilityRole="button" accessibilityLabel="Enter Ubuntu Heritage">
        <ImageBackground
          source={require("../../assets/brand/launch-bg.webp")}
          style={styles.bg}
          resizeMode="cover"
        >
          {/* Light scrim — enough for legible type, but the zebra stays clearly visible. */}
          <LinearGradient
            colors={["rgba(8,6,4,0.45)", "rgba(8,6,4,0.05)", "rgba(8,6,4,0.35)", "rgba(8,6,4,0.9)"]}
            locations={[0, 0.38, 0.7, 1]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />

          <Animated.View style={{ opacity: wordmark, transform: [{ translateY: rise }], alignItems: "center" }}>
            <Text style={styles.kicker}>Reclaiming African Voices</Text>
            <Text style={styles.brandLine}>Ubuntu</Text>
            <Text style={styles.brandLine}>Heritage</Text>
            <Text style={styles.country}>South Africa</Text>
            <View style={styles.rule} />
            <Text style={styles.tagline}>Mantswe a maloba — Voices of Yesterday</Text>
          </Animated.View>

          <Animated.Text style={[styles.hint, { opacity: hint }]}>Tap to enter</Animated.Text>
        </ImageBackground>
      </Pressable>
    </Animated.View>
  );
}

const shadow = { textShadowColor: "rgba(0,0,0,0.75)", textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 16 };

const styles = StyleSheet.create({
  bg: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0d0b0a" },
  kicker: {
    color: colors.gold,
    fontFamily: fonts.bodySemi,
    fontSize: 12,
    letterSpacing: 4,
    textTransform: "uppercase",
    marginBottom: spacing.lg,
    ...shadow,
  },
  brandLine: {
    color: colors.sand,
    fontFamily: fonts.display,
    fontSize: 60,
    lineHeight: 58,
    letterSpacing: 1,
    textTransform: "uppercase",
    ...shadow,
  },
  country: {
    color: colors.gold,
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    letterSpacing: 6,
    textTransform: "uppercase",
    marginTop: spacing.md,
    ...shadow,
  },
  rule: { width: 56, height: 2, backgroundColor: colors.orange, borderRadius: 2, marginTop: spacing.md },
  tagline: {
    color: colors.sand,
    fontFamily: fonts.serifItalic,
    fontSize: 15,
    marginTop: spacing.md,
    opacity: 0.92,
    ...shadow,
  },
  hint: {
    position: "absolute",
    bottom: 46,
    alignSelf: "center",
    color: colors.sand,
    fontFamily: fonts.bodySemi,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    ...shadow,
  },
});
