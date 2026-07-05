import React, { useEffect, useRef } from "react";
import { Animated, ImageBackground, Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, spacing, radius, fonts } from "../theme/tokens";

// On web, pin the splash to the BROWSER VIEWPORT itself (fixed + 100vw/100vh) rather than to its
// React ancestors — on the very first paint of a static export the root containers can measure a
// frame late, which briefly left a black strip beside the splash. Fixed-to-viewport can't.
const WEB_FULLSCREEN =
  Platform.OS === "web" ? ({ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" } as any) : null;

// Branded opening frame — the first thing a judge (and the demo video) sees. It uses the SAME hero
// photo, slate scrim and "Ubuntu / Heritage" wordmark as the Home landing page, so the splash melts
// seamlessly into Home and reads as one product. TAP anywhere to enter (a gentle auto-advance is the
// fallback so a hands-free demo never stalls). ImageBackground so the photo reliably fills web + native.

export function LaunchScreen({ onDone }: { onDone: () => void }) {
  const { width } = useWindowDimensions();
  const wide = width >= 768;

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
    <Animated.View style={[StyleSheet.absoluteFill, WEB_FULLSCREEN, { opacity: cover }]}>
      <Pressable style={StyleSheet.absoluteFill} onPress={finish} accessibilityRole="button" accessibilityLabel="Enter Ubuntu Heritage">
        {/* Same wide savanna hero the Home page opens on — consistent, and not tightly cropped. */}
        <ImageBackground
          source={require("../../assets/generated/mhudi-forest-home.webp")}
          style={styles.bg}
          resizeMode="cover"
        >
          {/* Matches the Home hero scrim exactly (slate, top-light → bottom-dark). */}
          <LinearGradient
            colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.15)", "rgba(0,0,0,0.9)"]}
            locations={[0, 0.45, 1]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />

          <Animated.View style={{ opacity: wordmark, transform: [{ translateY: rise }], alignItems: "center" }}>
            <Text style={[styles.brandTitle, wide && styles.brandTitleWide]}>Ubuntu{"\n"}Heritage</Text>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Reclaiming African Voices</Text>
              <Text style={styles.cardSub}>MANTSWE A MALOBA — VOICES OF YESTERDAY</Text>
            </View>
          </Animated.View>

          <Animated.Text style={[styles.hint, { opacity: hint }]}>Tap to enter</Animated.Text>
        </ImageBackground>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.dsSlate },
  // Mirrors HomeGallery's hero title.
  brandTitle: {
    color: "#FFFFFF",
    fontFamily: fonts.display,
    fontSize: 60,
    lineHeight: 60,
    letterSpacing: -1,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 18,
  },
  brandTitleWide: { fontSize: 120, lineHeight: 116, letterSpacing: -2 },
  // Mirrors HomeGallery's hero caption card.
  card: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.42)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xl,
  },
  cardTitle: { color: "#FFFFFF", fontFamily: fonts.heading, fontSize: 20, textAlign: "center" },
  cardSub: { color: "rgba(255,255,255,0.9)", fontFamily: fonts.bodySemi, fontSize: 11, letterSpacing: 2, marginTop: 8, textAlign: "center" },
  hint: {
    position: "absolute",
    bottom: 46,
    alignSelf: "center",
    color: "#FFFFFF",
    fontFamily: fonts.bodySemi,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    textShadowColor: "rgba(0,0,0,0.75)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 16,
  },
});
