import React, { useMemo, useState } from "react";
import { View, Text, Pressable, Animated, StyleSheet, useWindowDimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import { fonts, colors } from "../theme/tokens";
import { Icon } from "../ui";
import { historyTrail, type HistoryMilestone } from "../content/history-trail";

// The History Trail — a wandering "ant-trail" journey map of dated milestones. The connecting line is
// a smooth dashed SVG path; dots + year labels are RN views on top (real fonts + tap targets). The
// grounded dates live in content/history-trail.ts.
//
// Dimming lives INSIDE this component (an inner Animated layer holds the path + dots), so the "Start"
// flag planted on the FIRST dot can stay at full opacity and — crucially — is positioned in the exact
// same coordinate space as the dots, so it always sits on 1652 (no cross-component coordinate drift).

const GOLD = "#E8B45A";

function computePoints(n: number, W: number, H: number, rows: number) {
  const padX = Math.min(72, W * 0.09);
  const padTop = 60;
  const padBottom = 56;
  const perRow = Math.ceil(n / rows);
  const usableW = W - padX * 2;
  const rowGap = rows > 1 ? (H - padTop - padBottom) / (rows - 1) : 0;
  const colStep = perRow > 1 ? usableW / (perRow - 1) : usableW;
  const ampY = Math.max(12, Math.min(rowGap * 0.34, 64));
  const ampX = Math.max(8, colStep * 0.3);
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / perRow);
    const inRow = i - row * perRow;
    const ltr = row % 2 === 0;
    const denom = perRow > 1 ? perRow - 1 : 1;
    const frac = inRow / denom;
    const fx = ltr ? frac : 1 - frac;
    let x = padX + fx * usableW;
    let y = padTop + row * rowGap;
    x += Math.sin(i * 2.7 + row * 1.9) * ampX + Math.cos(i * 1.3) * ampX * 0.5;
    y += Math.sin(i * 1.7 + row) * ampY + Math.cos(i * 0.8 + row * 1.3) * ampY * 0.6;
    x = Math.max(padX * 0.5, Math.min(W - padX * 0.5, x));
    y = Math.max(padTop * 0.45, Math.min(H - padBottom * 0.45, y));
    pts.push({ x, y });
  }
  return pts;
}

function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  const T = 4.2;
  const d = [`M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / T;
    const cp1y = p1.y + (p2.y - p0.y) / T;
    const cp2x = p2.x - (p3.x - p1.x) / T;
    const cp2y = p2.y - (p3.y - p1.y) / T;
    d.push(`C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`);
  }
  return d.join(" ");
}

export function HistoryTrail({
  active,
  onSelect,
  selectedId,
  dimOpacity,
  onStart,
  startLabel,
}: {
  active: boolean;
  onSelect: (m: HistoryMilestone) => void;
  selectedId?: string | null;
  /** Opacity for the trail (path + dots). The start flag ignores this and stays full-opacity. */
  dimOpacity?: Animated.Value;
  /** Fired by the "Start" flag on the first dot. */
  onStart?: () => void;
  /** Localized label shown beside the start flag. */
  startLabel?: string;
}) {
  const { width } = useWindowDimensions();
  const rows = width >= 900 ? 3 : width >= 560 ? 4 : 5;
  const [size, setSize] = useState({ w: 0, h: 0 });

  const pts = useMemo(() => computePoints(historyTrail.length, size.w, size.h, rows), [size.w, size.h, rows]);
  const dPath = useMemo(() => smoothPath(pts), [pts]);
  const first = pts[0];

  return (
    <View style={styles.fill} pointerEvents="box-none" onLayout={(e) => setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}>
      {size.w > 0 && (
        <>
          {/* the trail itself — dimmed by the parent's animated value; tappable only when active */}
          <Animated.View style={[StyleSheet.absoluteFill, dimOpacity != null ? { opacity: dimOpacity } : null]} pointerEvents={active ? "box-none" : "none"}>
            <Svg width={size.w} height={size.h} style={StyleSheet.absoluteFill} pointerEvents="none">
              <Path d={dPath} stroke={GOLD} strokeOpacity={0.18} strokeWidth={9} fill="none" strokeLinecap="round" />
              <Path d={dPath} stroke={GOLD} strokeOpacity={0.9} strokeWidth={2.5} strokeDasharray="1 12" fill="none" strokeLinecap="round" />
            </Svg>

            {historyTrail.map((m, i) => {
              const p = pts[i];
              const sel = m.id === selectedId;
              return (
                <View key={m.id} style={[styles.node, { left: p.x - NODE / 2, top: p.y - DOT / 2 }]} pointerEvents="box-none">
                  <Pressable
                    disabled={!active}
                    onPress={() => onSelect(m)}
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel={`${m.year} — ${m.title}`}
                    style={[styles.dot, active && styles.dotActive, sel && styles.dotSel]}
                  />
                  <Text style={[styles.year, active && styles.yearActive, sel && styles.yearSel]} numberOfLines={1}>
                    {m.year}
                  </Text>
                </View>
              );
            })}
          </Animated.View>

          {/* the "Start" flag planted on the FIRST dot — full opacity, only while the map is closed */}
          {!active && first ? (
            <Pressable
              style={[styles.startPin, { left: first.x, top: first.y }]}
              onPress={onStart}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel={startLabel}
            >
              <View style={styles.startFlag}><Icon.Flag size={13} color={colors.night} fill={colors.night} /></View>
              {startLabel ? <Text style={styles.startPinText}>{startLabel}</Text> : null}
            </Pressable>
          ) : null}
        </>
      )}
    </View>
  );
}

const DOT = 16;
const NODE = 64;

const styles = StyleSheet.create({
  fill: { flex: 1 },
  node: { position: "absolute", width: NODE, alignItems: "center" },
  dot: { width: DOT, height: DOT, borderRadius: DOT / 2, borderWidth: 2, borderColor: GOLD, backgroundColor: "#17110A" },
  dotActive: { backgroundColor: "#241a0d" },
  dotSel: { backgroundColor: GOLD, borderColor: "#fff", transform: [{ scale: 1.25 }] },
  year: { marginTop: 4, color: "#F3E7D0", fontFamily: fonts.displaySemi, fontSize: 11, letterSpacing: 0.3 },
  yearActive: { color: "#FBEFD8" },
  yearSel: { color: GOLD },

  // planted on the first dot: vertically centred on it, flag then label
  startPin: { position: "absolute", zIndex: 30, flexDirection: "row", alignItems: "center", gap: 7, backgroundColor: "rgba(10,7,3,0.85)", borderWidth: 1, borderColor: GOLD, borderRadius: 999, paddingVertical: 5, paddingLeft: 5, paddingRight: 12, transform: [{ translateX: -13 }, { translateY: -15 }] },
  startFlag: { width: 22, height: 22, borderRadius: 11, backgroundColor: GOLD, alignItems: "center", justifyContent: "center" },
  startPinText: { color: "#FBEFD8", fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 0.3 },
});
