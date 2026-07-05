import React, { useRef, useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { spacing, fonts } from "../theme/tokens";

// Reusable "editorial index" layout: a long scroll of items on the right, and — on wide screens — a
// sticky LEFT INDEX (01…N + heading) that jumps to a given item and highlights the active one as you
// scroll. Used by the Cultural Atlas, Provinces and Presidents overviews so they all feel the same.
// The page supplies its own masthead, (optional) sticky header, item renderer and empty state.

const BLUE = "#1A85A7";
const numOf = (i: number) => (i + 1).toString().padStart(2, "0");

export type IndexEntry = { key: string; label: string };

export function SideIndexScroll({
  contentsLabel,
  masthead,
  stickyHeader,
  items,
  renderItem,
  emptyState,
  wideBreakpoint = 900,
  maxWidth = 1180,
}: {
  contentsLabel: string;
  masthead?: React.ReactNode;
  stickyHeader?: React.ReactNode;
  items: IndexEntry[];
  renderItem: (item: IndexEntry, index: number) => React.ReactNode;
  emptyState?: React.ReactNode;
  wideBreakpoint?: number;
  maxWidth?: number;
}) {
  const { width } = useWindowDimensions();
  const wide = width >= wideBreakpoint;
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const offsets = useRef<number[]>([]);
  const stickyH = useRef(stickyHeader ? 96 : 0);

  const jumpTo = (i: number) => {
    const y = offsets.current[i];
    if (y != null) scrollRef.current?.scrollTo({ y: Math.max(0, y - stickyH.current - 8), animated: true });
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y + stickyH.current + 12;
    let idx = 0;
    for (let k = 0; k < items.length; k++) {
      if (offsets.current[k] != null && offsets.current[k] <= y) idx = k;
    }
    if (idx !== activeIdx) setActiveIdx(idx);
  };

  const scroll = (
    <ScrollView
      ref={scrollRef}
      style={s.flex}
      stickyHeaderIndices={stickyHeader ? [1] : undefined}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      scrollEventThrottle={16}
      onScroll={onScroll}
    >
      {/* 0 · masthead (always present so the sticky header can be index 1) */}
      <View>{masthead}</View>
      {/* 1 · sticky header (optional) */}
      {stickyHeader != null ? (
        <View onLayout={(e) => (stickyH.current = e.nativeEvent.layout.height)}>{stickyHeader}</View>
      ) : null}
      {/* 2… · items, each registering its scroll offset for jump + active tracking */}
      {items.length === 0
        ? emptyState
        : items.map((it, i) => (
            <View key={it.key} onLayout={(e) => (offsets.current[i] = e.nativeEvent.layout.y)}>
              {renderItem(it, i)}
            </View>
          ))}
      <View style={{ height: spacing.xxl }} />
    </ScrollView>
  );

  if (!wide) return scroll;

  return (
    <View style={[s.wideRow, { maxWidth }]}>
      <View style={s.sidebar}>
        <Text style={s.sideLabel}>{contentsLabel.toUpperCase()}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {items.map((it, i) => {
            const active = i === activeIdx;
            return (
              <Pressable
                key={it.key}
                onPress={() => jumpTo(i)}
                style={[s.navItem, active && s.navItemActive]}
                accessibilityLabel={`${numOf(i)} ${it.label}`}
              >
                <Text style={[s.navNum, active && s.navNumActive]}>{numOf(i)}</Text>
                <Text style={[s.navHeading, active && s.navHeadingActive]} numberOfLines={2}>
                  {it.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      {scroll}
    </View>
  );
}

const s = StyleSheet.create({
  flex: { flex: 1 },
  wideRow: { flex: 1, flexDirection: "row", width: "100%", alignSelf: "center" },
  sidebar: { width: 268, paddingTop: spacing.xxl, paddingHorizontal: spacing.lg, borderRightWidth: 1, borderRightColor: "rgba(255,255,255,0.1)" },
  sideLabel: { color: "rgba(255,255,255,0.4)", fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 2.5, marginBottom: spacing.md, marginTop: spacing.lg },
  navItem: { flexDirection: "row", gap: spacing.sm, alignItems: "flex-start", paddingVertical: 9, paddingLeft: spacing.sm, borderLeftWidth: 2, borderLeftColor: "transparent" },
  navItemActive: { borderLeftColor: BLUE },
  navNum: { color: "rgba(255,255,255,0.35)", fontFamily: fonts.display, fontSize: 14, lineHeight: 19, width: 24 },
  navNumActive: { color: BLUE },
  navHeading: { flex: 1, color: "rgba(255,255,255,0.55)", fontFamily: fonts.bodySemi, fontSize: 13, lineHeight: 18 },
  navHeadingActive: { color: "#FFFFFF" },
});
