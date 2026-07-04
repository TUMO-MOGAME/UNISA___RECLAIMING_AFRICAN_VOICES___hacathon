import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

// The project's guide — a walking figure in the spirit of San rock art (one of humanity's oldest art
// traditions). It honours San *heritage art*, not a caricature of a people: a simple ochre silhouette.
// It walks in place (a 2-frame stride) and, on each screen change, runs in from the left of the screen
// to accompany you. Pure SVG + RN Animated — tiny and offline-friendly (no video). pointerEvents=none
// so it never blocks the UI. `runKey` should change per route to re-trigger the run-in.

const OCHRE = "#B4530F"; // burnt-ochre, like rock-art pigment
const OCHRE_DEEP = "#8A3D0C";

// Two stride poses in a 44×70 viewBox. Alternating them reads as a walk/run cycle.
function Figure({ pose }: { pose: "a" | "b" }) {
  const a = pose === "a";
  return (
    <Svg width={44} height={70} viewBox="0 0 44 70">
      {/* legs */}
      <Line x1={22} y1={40} x2={a ? 33 : 26} y2={a ? 64 : 65} stroke={OCHRE} strokeWidth={6} strokeLinecap="round" />
      <Line x1={22} y1={40} x2={a ? 12 : 18} y2={a ? 62 : 65} stroke={OCHRE_DEEP} strokeWidth={6} strokeLinecap="round" />
      {/* body */}
      <Line x1={22} y1={19} x2={22} y2={41} stroke={OCHRE} strokeWidth={7.5} strokeLinecap="round" />
      {/* arms (one often carries a stick/bow in rock art — the forward line reads that way) */}
      <Line x1={22} y1={22} x2={a ? 34 : 30} y2={a ? 30 : 33} stroke={OCHRE} strokeWidth={5} strokeLinecap="round" />
      <Line x1={22} y1={22} x2={a ? 11 : 15} y2={a ? 29 : 33} stroke={OCHRE_DEEP} strokeWidth={5} strokeLinecap="round" />
      {/* head */}
      <Circle cx={22} cy={12} r={6.5} fill={OCHRE} />
    </Svg>
  );
}

export function RockArtGuide({ runKey }: { runKey: string }) {
  const [pose, setPose] = useState<"a" | "b">("a");
  const tx = useRef(new Animated.Value(-160)).current; // run-in from off-screen left
  const bob = useRef(new Animated.Value(0)).current; // vertical walking bob

  // Run in from the left whenever the screen (runKey) changes.
  useEffect(() => {
    tx.setValue(-160);
    Animated.spring(tx, { toValue: 0, useNativeDriver: true, speed: 7, bounciness: 5 }).start();
  }, [runKey, tx]);

  // Continuous gentle bob.
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, { toValue: 1, duration: 190, useNativeDriver: true }),
        Animated.timing(bob, { toValue: 0, duration: 190, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [bob]);

  // Alternate the two stride poses to animate the walk.
  useEffect(() => {
    const id = setInterval(() => setPose((p) => (p === "a" ? "b" : "a")), 200);
    return () => clearInterval(id);
  }, []);

  const translateY = bob.interpolate({ inputRange: [0, 1], outputRange: [0, -4] });

  return (
    <View style={styles.wrap} pointerEvents="none">
      <Animated.View style={{ transform: [{ translateX: tx }, { translateY }] }}>
        <Figure pose={pose} />
        {/* soft ground shadow */}
        <View style={styles.shadow} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: "absolute", left: 16, bottom: 18, zIndex: 50 },
  shadow: {
    height: 5,
    marginTop: -3,
    marginHorizontal: 6,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.28)",
  },
});
