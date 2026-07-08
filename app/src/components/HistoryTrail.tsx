import React, { useMemo, useState, useEffect, useRef } from "react";
import { View, Text, Pressable, Animated, StyleSheet, useWindowDimensions, Platform } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Asset } from "expo-asset";
import { fonts, colors } from "../theme/tokens";
import { Icon } from "../ui";
import { historyTrail, type HistoryMilestone } from "../content/history-trail";

// The walking-journey character (transparent VP9 webm). On web it plays as a looping <video>; on
// native it degrades to a small marker until expo-video is wired. The figure faces RIGHT by default,
// so we mirror it (scaleX) when walking to the LEFT. Resolve the bundled asset URL via expo-asset
// (web-safe — react-native-web has no Image.resolveAssetSource), guarded so it can never crash render.
let WALK_URI: string | undefined;
try {
  WALK_URI = Asset.fromModule(require("../../assets/journey/walk.webm")).uri;
} catch {
  WALK_URI = undefined;
}
const WALK_SIZE = 58;

function WalkVideo({ facing }: { facing: "left" | "right" }) {
  const flip = facing === "left"; // source faces right; mirror only when heading left
  if (Platform.OS === "web" && WALK_URI) {
    // Raw DOM <video> (react-native-web renders it via react-dom). Cast around RN's JSX typings.
    return React.createElement("video" as any, {
      src: WALK_URI,
      autoPlay: true,
      loop: true,
      muted: true,
      playsInline: true,
      style: {
        width: WALK_SIZE,
        height: WALK_SIZE,
        objectFit: "contain",
        transform: flip ? "scaleX(-1)" : "none",
        display: "block",
        pointerEvents: "none",
        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))",
      },
    });
  }
  return <View style={{ width: WALK_SIZE, height: WALK_SIZE, borderRadius: WALK_SIZE / 2, backgroundColor: GOLD }} />;
}

// The History Trail — a wandering "ant-trail" journey map of dated milestones. The connecting line is
// a smooth dashed SVG path; dots + year labels are RN views on top (real fonts + tap targets). The
// grounded dates live in content/history-trail.ts.
//
// Dimming lives INSIDE this component (an inner Animated layer holds the path + dots), so the "Start"
// flag planted on the FIRST dot can stay at full opacity and — crucially — is positioned in the exact
// same coordinate space as the dots, so it always sits on 1652 (no cross-component coordinate drift).

const GOLD = "#E8B45A";
const TENSION = 4.2; // Catmull-Rom looseness — shared by the path and the on-road branch anchors

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function computePoints(n: number, W: number, H: number, rows: number) {
  // generous insets so a dot's label box (and the pickers/title up top) never clip the screen
  const padX = Math.min(96, W * 0.1);
  const padTop = 100; // clears the country/language pickers + the journey title
  const padBottom = 78;
  const perRow = Math.ceil(n / rows);
  const usableW = W - padX * 2;
  const usableH = Math.max(0, H - padTop - padBottom);
  const rowGap = rows > 1 ? usableH / (rows - 1) : 0;
  const colStep = perRow > 1 ? usableW / (perRow - 1) : usableW;
  const ampY = Math.max(8, Math.min(rowGap * 0.26, 44)); // capped so rows never crash into each other
  const ampX = Math.max(6, Math.min(colStep * 0.26, 46));
  // hard bounds that keep the whole node (dot + ~64px-wide year label) inside the screen
  const minX = Math.max(38, padX * 0.6);
  const maxX = W - minX;
  const minY = padTop;
  const maxY = H - padBottom;
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
    pts.push({ x: clamp(x, minX, maxX), y: clamp(y, minY, maxY) });
  }
  return pts;
}

// A point ON the road (the Catmull-Rom → bezier curve) for segment `seg` at parameter t, plus the
// road's tangent there — so a branch can peel off the actual road rather than radiate from a dot.
function segAt(pts: { x: number; y: number }[], seg: number, t: number) {
  const p0 = pts[seg - 1] || pts[seg];
  const p1 = pts[seg];
  const p2 = pts[seg + 1] || pts[seg];
  const p3 = pts[seg + 2] || p2;
  const cp1x = p1.x + (p2.x - p0.x) / TENSION;
  const cp1y = p1.y + (p2.y - p0.y) / TENSION;
  const cp2x = p2.x - (p3.x - p1.x) / TENSION;
  const cp2y = p2.y - (p3.y - p1.y) / TENSION;
  const mt = 1 - t;
  const x = mt * mt * mt * p1.x + 3 * mt * mt * t * cp1x + 3 * mt * t * t * cp2x + t * t * t * p2.x;
  const y = mt * mt * mt * p1.y + 3 * mt * mt * t * cp1y + 3 * mt * t * t * cp2y + t * t * t * p2.y;
  const tx = 3 * mt * mt * (cp1x - p1.x) + 6 * mt * t * (cp2x - cp1x) + 3 * t * t * (p2.x - cp2x);
  const ty = 3 * mt * mt * (cp1y - p1.y) + 6 * mt * t * (cp2y - cp1y) + 3 * t * t * (p2.y - cp2y);
  return { x, y, tx, ty };
}

function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  const T = TENSION;
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
  keepWalkingLabel,
  journeyDoneLabel,
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
  /** Localized labels for the guided walk controls. */
  keepWalkingLabel?: string;
  journeyDoneLabel?: string;
}) {
  const { width } = useWindowDimensions();
  const rows = width >= 900 ? 3 : width >= 560 ? 4 : 5;
  const [size, setSize] = useState({ w: 0, h: 0 });

  const pts = useMemo(() => computePoints(historyTrail.length, size.w, size.h, rows), [size.w, size.h, rows]);
  const dPath = useMemo(() => smoothPath(pts), [pts]);
  const first = pts[0];

  // ── Guided walk: a character strolls the main road, stopping at each big dot. ──────────────────
  const [idx, setIdx] = useState(0); // current big-dot index the walker is at
  const idxRef = useRef(0);
  const [phase, setPhase] = useState<"idle" | "walking">("idle");
  const [facing, setFacing] = useState<"left" | "right">("right");
  const wx = useRef(new Animated.Value(0)).current; // walker screen x
  const wy = useRef(new Animated.Value(0)).current; // walker screen y
  const p = useRef(new Animated.Value(0)).current; // 0..1 progress along the current segment
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const ready = size.w > 0 && pts.length > 1;

  // Start / reset the walk when the journey opens (active) and the layout is known.
  useEffect(() => {
    if (!active || !ready) {
      setPhase("idle");
      setIdx(0);
      idxRef.current = 0;
      return;
    }
    idxRef.current = 0;
    setIdx(0);
    setPhase("idle");
    setFacing("right");
    wx.setValue(pts[0].x);
    wy.setValue(pts[0].y);
    onSelectRef.current?.(historyTrail[0]); // show the first milestone's description
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, ready, size.w, size.h, rows]);

  // Walk from the current big dot to the next one, following the real road curve.
  const walkNext = () => {
    if (phase === "walking") return;
    const i = idxRef.current;
    if (i >= historyTrail.length - 1) return;
    const seg = i;
    const a = pts[seg];
    const b = pts[seg + 1];
    setFacing(b.x >= a.x ? "right" : "left");
    setPhase("walking");
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    const dur = Math.max(650, Math.min(2400, (dist / 130) * 1000));
    p.setValue(0);
    const listenerId = p.addListener(({ value }) => {
      const s = segAt(pts, seg, value);
      wx.setValue(s.x);
      wy.setValue(s.y);
    });
    Animated.timing(p, { toValue: 1, duration: dur, useNativeDriver: false }).start(({ finished }) => {
      p.removeListener(listenerId);
      if (!finished) return;
      idxRef.current = i + 1;
      setIdx(i + 1);
      wx.setValue(b.x);
      wy.setValue(b.y);
      setPhase("idle");
      onSelectRef.current?.(historyTrail[i + 1]); // reveal the arrival milestone's description
    });
  };

  const restartWalk = () => {
    idxRef.current = 0;
    setIdx(0);
    setPhase("idle");
    setFacing("right");
    wx.setValue(pts[0].x);
    wy.setValue(pts[0].y);
    onSelectRef.current?.(historyTrail[0]);
  };

  const atLast = idx >= historyTrail.length - 1;

  // Flatten every milestone's branches. Each branch peels off a point ON THE ROAD (between the
  // milestone dot and the next, "as we approach" it), perpendicular to the road there.
  const branchItems = useMemo(() => {
    const arr: { b: HistoryMilestone; from: { x: number; y: number }; to: { x: number; y: number } }[] = [];
    historyTrail.forEach((m, i) => {
      if (!m.branches?.length || !pts[i]) return;
      const hasNext = i + 1 < pts.length;
      const seg = hasNext ? i : Math.max(0, i - 1);
      m.branches.forEach((b, k) => {
        // stagger each branch to a different point along the road; leave dots breathing room
        const base = hasNext ? 0.32 : 0.68;
        const t = Math.min(0.86, Math.max(0.14, base + k * 0.18));
        const s = segAt(pts, seg, t);
        const len = Math.hypot(s.tx, s.ty) || 1;
        const nx = -s.ty / len;
        const ny = s.tx / len;
        const dist = 44 + Math.floor(k / 2) * 26;
        // two candidate sides — pick whichever points further INTO the screen, so branches near an
        // edge fold inward instead of off-screen. Then clamp as a final safety net.
        const m2 = 34; // keep the small branch label fully on-screen
        const edgeScore = (px: number, py: number) => Math.min(px - m2, size.w - m2 - px, py - m2, size.h - m2 - py);
        const a = { x: s.x + nx * dist, y: s.y + ny * dist };
        const c = { x: s.x - nx * dist, y: s.y - ny * dist };
        const pick = edgeScore(a.x, a.y) >= edgeScore(c.x, c.y) ? a : c;
        const to = { x: clamp(pick.x, m2, size.w - m2), y: clamp(pick.y, m2, size.h - m2) };
        arr.push({ b, from: { x: s.x, y: s.y }, to });
      });
    });
    return arr;
  }, [pts, size.w, size.h]);

  return (
    <View style={styles.fill} pointerEvents="box-none" onLayout={(e) => setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}>
      {size.w > 0 && (
        <>
          {/* the trail itself — dimmed by the parent's animated value; tappable only when active */}
          <Animated.View style={[StyleSheet.absoluteFill, dimOpacity != null ? { opacity: dimOpacity } : null]} pointerEvents={active ? "box-none" : "none"}>
            <Svg width={size.w} height={size.h} style={StyleSheet.absoluteFill} pointerEvents="none">
              {/* thin branch side-roads first (under the main road) */}
              {branchItems.map((br, idx) => {
                const dx = br.to.x - br.from.x;
                const dy = br.to.y - br.from.y;
                const L = Math.hypot(dx, dy) || 1;
                const mx = (br.from.x + br.to.x) / 2;
                const my = (br.from.y + br.to.y) / 2;
                const cx = mx + (-dy / L) * 9;
                const cy = my + (dx / L) * 9;
                return (
                  <Path
                    key={`bl${idx}`}
                    d={`M ${br.from.x.toFixed(1)} ${br.from.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)}, ${br.to.x.toFixed(1)} ${br.to.y.toFixed(1)}`}
                    stroke={GOLD}
                    strokeOpacity={0.6}
                    strokeWidth={1.3}
                    strokeDasharray="1 6"
                    fill="none"
                    strokeLinecap="round"
                  />
                );
              })}
              {/* the thick main road */}
              <Path d={dPath} stroke={GOLD} strokeOpacity={0.18} strokeWidth={10} fill="none" strokeLinecap="round" />
              <Path d={dPath} stroke={GOLD} strokeOpacity={0.9} strokeWidth={3} strokeDasharray="1 12" fill="none" strokeLinecap="round" />
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

            {/* branch dots — smaller, tiny dates, at the end of each thin side-road */}
            {branchItems.map((br, idx) => {
              const sel = br.b.id === selectedId;
              return (
                <View key={`bn${idx}`} style={[styles.bnode, { left: br.to.x - BNODE / 2, top: br.to.y - BDOT / 2 }]} pointerEvents="box-none">
                  <Pressable
                    disabled={!active}
                    onPress={() => onSelect(br.b)}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel={`${br.b.year} — ${br.b.title}`}
                    style={[styles.bdot, active && styles.bdotActive, sel && styles.dotSel]}
                  />
                  <Text style={[styles.byear, active && styles.byearActive, sel && styles.yearSel]} numberOfLines={1}>
                    {br.b.year}
                  </Text>
                </View>
              );
            })}
          </Animated.View>

          {/* Guided walker + "keep walking" control — full opacity, only while journeying */}
          {active && ready && (
            <>
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.walker,
                  { transform: [{ translateX: wx }, { translateY: wy }, { translateX: -WALK_SIZE / 2 }, { translateY: -WALK_SIZE + 10 }] },
                ]}
              >
                <WalkVideo facing={facing} />
              </Animated.View>

              {phase === "idle" && !atLast && (
                <Pressable
                  style={[styles.walkBtn, { left: clamp(pts[idx].x + 18, 8, size.w - 168), top: clamp(pts[idx].y - 14, 8, size.h - 44) }]}
                  onPress={walkNext}
                  accessibilityRole="button"
                  accessibilityLabel={keepWalkingLabel}
                >
                  <Text style={styles.walkBtnText}>{keepWalkingLabel ?? "Keep walking"}</Text>
                  <Icon.ChevronRight size={15} color={colors.night} />
                </Pressable>
              )}

              {phase === "idle" && atLast && (
                <Pressable
                  style={[styles.walkBtn, { left: clamp(pts[idx].x + 18, 8, size.w - 190), top: clamp(pts[idx].y - 14, 8, size.h - 44) }]}
                  onPress={restartWalk}
                  accessibilityRole="button"
                  accessibilityLabel={journeyDoneLabel}
                >
                  <Icon.RotateCcw size={14} color={colors.night} />
                  <Text style={styles.walkBtnText}>{journeyDoneLabel ?? "Restart"}</Text>
                </Pressable>
              )}
            </>
          )}

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
const BDOT = 10; // branch dot (smaller than a main dot)
const BNODE = 52;

const styles = StyleSheet.create({
  fill: { flex: 1 },
  node: { position: "absolute", width: NODE, alignItems: "center" },
  dot: { width: DOT, height: DOT, borderRadius: DOT / 2, borderWidth: 2, borderColor: GOLD, backgroundColor: "#17110A" },
  dotActive: { backgroundColor: "#241a0d" },
  dotSel: { backgroundColor: GOLD, borderColor: "#fff", transform: [{ scale: 1.25 }] },
  year: { marginTop: 4, color: "#F3E7D0", fontFamily: fonts.displaySemi, fontSize: 11, letterSpacing: 0.3 },
  yearActive: { color: "#FBEFD8" },
  yearSel: { color: GOLD },

  // branch (side-road) dots + tiny dates
  bnode: { position: "absolute", width: BNODE, alignItems: "center" },
  bdot: { width: BDOT, height: BDOT, borderRadius: BDOT / 2, borderWidth: 1.5, borderColor: GOLD, backgroundColor: "#17110A", opacity: 0.9 },
  bdotActive: { backgroundColor: "#241a0d", opacity: 1 },
  byear: { marginTop: 2, color: "rgba(243,231,208,0.7)", fontFamily: fonts.displaySemi, fontSize: 8.5, letterSpacing: 0.2 },
  byearActive: { color: "#F3E7D0" },

  // planted on the first dot: vertically centred on it, flag then label
  startPin: { position: "absolute", zIndex: 30, flexDirection: "row", alignItems: "center", gap: 7, backgroundColor: "rgba(10,7,3,0.85)", borderWidth: 1, borderColor: GOLD, borderRadius: 999, paddingVertical: 5, paddingLeft: 5, paddingRight: 12, transform: [{ translateX: -13 }, { translateY: -15 }] },
  startFlag: { width: 22, height: 22, borderRadius: 11, backgroundColor: GOLD, alignItems: "center", justifyContent: "center" },
  startPinText: { color: "#FBEFD8", fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 0.3 },

  // Guided walk
  walker: { position: "absolute", left: 0, top: 0, zIndex: 25 },
  walkBtn: {
    position: "absolute",
    zIndex: 26,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: GOLD,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  walkBtnText: { color: colors.night, fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 0.3 },
});
