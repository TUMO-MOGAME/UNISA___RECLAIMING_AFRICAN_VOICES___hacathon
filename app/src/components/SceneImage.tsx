import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { colors } from "../theme/tokens";

// Full-bleed cinematic background. Uses expo-image for disk caching (offline / low-data — an
// accessibility win, task T008) and a built-in cross-fade on load, over a warm placeholder so there
// is never a white flash or a hung spinner. An optional slow "Ken Burns" drift adds cinematic life
// to the Reader's hero image (disabled for list thumbnails to keep them calm and cheap).

// `source` is either a remote URL (Pollinations) or a bundled asset id (a generated local image).
export function SceneImage({
  source,
  kenBurns = false,
}: {
  source: string | number;
  kenBurns?: boolean;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!kenBurns) return;
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.08, duration: 14000, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1.0, duration: 14000, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [scale, kenBurns]);

  return (
    <View style={[StyleSheet.absoluteFill, styles.bg]}>
      <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ scale }] }]}>
        <Image
          // Only a remote URL string needs wrapping in { uri }. A local asset — a number on native,
          // an object on web (from require) — must be passed through untouched.
          source={typeof source === "string" ? { uri: source } : source}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={500}
          cachePolicy="disk"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { backgroundColor: colors.ink, overflow: "hidden" },
});
