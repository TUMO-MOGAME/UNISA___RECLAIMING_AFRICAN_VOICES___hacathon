import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleProp, ViewStyle } from "react-native";
import { motion } from "../theme/tokens";

// Small, dependency-free motion helpers (RN's built-in Animated). Keep transitions calm and
// consistent — durations come from the `motion` tokens.

/** Fades its children in on mount. Give it a `key` that changes to re-trigger (e.g. per screen/scene). */
export function Fade({
  children,
  duration = motion.base,
  style,
}: {
  children: React.ReactNode;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration, useNativeDriver: true }).start();
  }, [opacity, duration]);
  return <Animated.View style={[{ opacity }, style]}>{children}</Animated.View>;
}

/** Reveals children with a rise-and-fade, optionally delayed — for orchestrated, staggered page loads. */
export function Reveal({
  children,
  delay = 0,
  distance = 18,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(distance)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: motion.slow, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: motion.slow, delay, useNativeDriver: true }),
    ]).start();
  }, [opacity, translateY, delay]);
  return (
    <Animated.View style={[{ opacity, transform: [{ translateY }] }, style]}>{children}</Animated.View>
  );
}

/** A pressable that gently scales down while pressed — tactile feedback on cards & buttons. */
export function PressScale({
  children,
  onPress,
  style,
  accessibilityLabel,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const to = (v: number) =>
    Animated.spring(scale, { toValue: v, useNativeDriver: true, speed: 40, bounciness: 6 }).start();
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => to(0.97)}
      onPressOut={() => to(1)}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}
