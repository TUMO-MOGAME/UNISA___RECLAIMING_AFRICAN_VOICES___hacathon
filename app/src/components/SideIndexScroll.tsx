import React, { useRef, useState, useCallback, createContext, useContext } from "react";
import { View, Text, Pressable, ScrollView, TextInput, StyleSheet, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { spacing, radius, fonts } from "../theme/tokens";
import { Icon } from "../ui";

// Reusable "editorial index" layout: a long scroll of items on the right, and — on wide screens — a
// sticky LEFT INDEX (01…N + heading) that jumps to a given item and highlights the active one as you
// scroll. Used by the Cultural Atlas, Provinces and Presidents overviews so they all feel the same.
// The page supplies its own masthead, (optional) sticky header, item renderer and empty state.
//
// A top-level index item may optionally carry `children` (sub-links). When it does, its sidebar row
// shows a chevron: tap to expand into the sub-links and jump; tap again to collapse. A sub-link jumps
// to a matching <Anchor anchorKey="…"> placed anywhere inside the page content.

const BLUE = "#1A85A7";
const numOf = (i: number) => (i + 1).toString().padStart(2, "0");

export type IndexEntry = { key: string; label: string; children?: { key: string; label: string }[] };

// Anchors register their on-screen node so a sidebar sub-link can scroll to them.
type AnchorApi = { registerAnchor: (key: string, node: View | null) => void };
const AnchorCtx = createContext<AnchorApi | null>(null);

/** Wrap a slice of page content so a sidebar sub-link can scroll to it. */
export function Anchor({ anchorKey, children }: { anchorKey: string; children: React.ReactNode }) {
  const ctx = useContext(AnchorCtx);
  return (
    <View collapsable={false} ref={(n) => ctx?.registerAnchor(anchorKey, n)}>
      {children}
    </View>
  );
}

export function SideIndexScroll({
  contentsLabel,
  masthead,
  stickyHeader,
  items,
  renderItem,
  emptyState,
  onBack,
  backLabel,
  onChildPress,
  searchable,
  searchPlaceholder,
  wideBreakpoint = 900,
  maxWidth = 1180,
}: {
  contentsLabel: string;
  masthead?: React.ReactNode;
  stickyHeader?: React.ReactNode;
  items: IndexEntry[];
  renderItem: (item: IndexEntry, index: number) => React.ReactNode;
  emptyState?: React.ReactNode;
  /** When set, a Back link sits at the top of the sidebar (wide screens) above the contents label. */
  onBack?: () => void;
  backLabel?: string;
  /** Fired when a sub-link is tapped (before the scroll) — e.g. to reveal the target dropdown. */
  onChildPress?: (childKey: string) => void;
  /** Show a search box atop the sidebar that filters the index by label (wide screens). */
  searchable?: boolean;
  searchPlaceholder?: string;
  wideBreakpoint?: number;
  maxWidth?: number;
}) {
  const { width } = useWindowDimensions();
  const wide = width >= wideBreakpoint;
  const [activeIdx, setActiveIdx] = useState(0);
  const [query, setQuery] = useState("");
  // Only one sidebar entry expanded at a time — expanding one collapses the others.
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const scrollBoxRef = useRef<View>(null);
  const offsets = useRef<number[]>([]);
  const scrollY = useRef(0);
  const stickyH = useRef(stickyHeader ? 96 : 0);
  const anchorNodes = useRef<Record<string, View | null>>({});

  const registerAnchor = useCallback((key: string, node: View | null) => {
    anchorNodes.current[key] = node;
  }, []);

  const jumpTo = (i: number) => {
    const y = offsets.current[i];
    if (y != null) scrollRef.current?.scrollTo({ y: Math.max(0, y - stickyH.current - 8), animated: true });
  };

  // Scroll to a registered anchor (a sub-section). Uses window coords so it works the same on web and
  // native; falls back to the parent item if the node can't be measured yet.
  const scrollToAnchor = (key: string, fallbackIdx: number) => {
    const node = anchorNodes.current[key];
    const box = scrollBoxRef.current;
    if (!node || !box || !(node as any).measureInWindow) {
      jumpTo(fallbackIdx);
      return;
    }
    box.measureInWindow((_bx, by) => {
      (node as any).measureInWindow((_ax: number, ay: number) => {
        const target = scrollY.current + (ay - by) - stickyH.current - 8;
        scrollRef.current?.scrollTo({ y: Math.max(0, target), animated: true });
      });
    });
  };

  const toggle = (key: string) => setExpandedKey((cur) => (cur === key ? null : key));

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.current = e.nativeEvent.contentOffset.y;
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

  const body = !wide ? (
    <View ref={scrollBoxRef} collapsable={false} style={s.flex}>
      {scroll}
    </View>
  ) : (
    <View style={[s.wideRow, { maxWidth }]}>
      <View style={s.sidebar}>
        {onBack ? (
          <Pressable onPress={onBack} hitSlop={12} style={s.sideBack} accessibilityRole="button">
            <Text style={s.sideBackText}>{backLabel ?? "‹ Back"}</Text>
          </Pressable>
        ) : null}
        <Text style={s.sideLabel}>{contentsLabel.toUpperCase()}</Text>
        {searchable ? (
          <View style={s.searchRow}>
            <Icon.Search size={14} color="rgba(255,255,255,0.5)" />
            <TextInput
              style={[s.searchInput, { outlineStyle: "none" } as any]}
              value={query}
              onChangeText={setQuery}
              placeholder={searchPlaceholder ?? "Search"}
              placeholderTextColor="rgba(255,255,255,0.4)"
              autoCorrect={false}
            />
          </View>
        ) : null}
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {(() => {
            // Filter by label but keep each item's ORIGINAL index so jump/scroll targets stay correct.
            const q = query.trim().toLowerCase();
            const visible = searchable && q ? items.map((it, i) => [it, i] as const).filter(([it]) => it.label.toLowerCase().includes(q)) : items.map((it, i) => [it, i] as const);
            return visible.map(([it, i]) => {
            const active = i === activeIdx;
            const hasKids = !!it.children && it.children.length > 0;
            const open = expandedKey === it.key;
            return (
              <View key={it.key}>
                <Pressable
                  onPress={() => {
                    jumpTo(i);
                    if (hasKids) toggle(it.key);
                  }}
                  style={[s.navItem, active && s.navItemActive]}
                  accessibilityLabel={`${numOf(i)} ${it.label}`}
                >
                  <Text style={[s.navNum, active && s.navNumActive]}>{numOf(i)}</Text>
                  <Text style={[s.navHeading, active && s.navHeadingActive]} numberOfLines={2}>
                    {it.label}
                  </Text>
                  {hasKids ? (
                    open ? (
                      <Icon.ChevronDown size={16} color={active ? "#FFFFFF" : "rgba(255,255,255,0.5)"} />
                    ) : (
                      <Icon.ChevronRight size={16} color={active ? "#FFFFFF" : "rgba(255,255,255,0.5)"} />
                    )
                  ) : null}
                </Pressable>

                {hasKids && open
                  ? it.children!.map((ch) => (
                      <Pressable
                        key={ch.key}
                        onPress={() => {
                          onChildPress?.(ch.key);
                          scrollToAnchor(ch.key, i);
                        }}
                        style={s.subItem}
                        accessibilityLabel={ch.label}
                      >
                        <View style={s.subDot} />
                        <Text style={s.subText}>{ch.label}</Text>
                      </Pressable>
                    ))
                  : null}
              </View>
            );
            });
          })()}
        </ScrollView>
      </View>
      <View ref={scrollBoxRef} collapsable={false} style={s.flex}>
        {scroll}
      </View>
    </View>
  );

  return <AnchorCtx.Provider value={{ registerAnchor }}>{body}</AnchorCtx.Provider>;
}

const s = StyleSheet.create({
  flex: { flex: 1 },
  wideRow: { flex: 1, flexDirection: "row", width: "100%", alignSelf: "center" },
  sidebar: { width: 268, paddingTop: spacing.xxl, paddingHorizontal: spacing.lg, borderRightWidth: 1, borderRightColor: "rgba(255,255,255,0.1)" },
  // White pill so the Back control reads clearly against the dark ground.
  sideBack: { alignSelf: "flex-start", backgroundColor: "#FFFFFF", borderRadius: radius.pill, paddingVertical: 7, paddingHorizontal: 15, marginTop: spacing.lg, marginBottom: spacing.lg },
  sideBackText: { color: "#000000", fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase" },
  sideLabel: { color: "rgba(255,255,255,0.4)", fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 2.5, marginBottom: spacing.md },
  searchRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: 10, paddingHorizontal: spacing.sm, marginBottom: spacing.md },
  searchInput: { flex: 1, color: "#fff", fontFamily: fonts.body, fontSize: 13, paddingVertical: 8 },
  navItem: { flexDirection: "row", gap: spacing.sm, alignItems: "flex-start", paddingVertical: 9, paddingLeft: spacing.sm, borderLeftWidth: 2, borderLeftColor: "transparent" },
  navItemActive: { borderLeftColor: BLUE },
  navNum: { color: "rgba(255,255,255,0.35)", fontFamily: fonts.display, fontSize: 14, lineHeight: 19, width: 24 },
  navNumActive: { color: BLUE },
  navHeading: { flex: 1, color: "rgba(255,255,255,0.55)", fontFamily: fonts.bodySemi, fontSize: 13, lineHeight: 18 },
  navHeadingActive: { color: "#FFFFFF" },
  // Sub-links under an expanded item.
  subItem: { flexDirection: "row", alignItems: "center", gap: spacing.sm, paddingVertical: 7, paddingLeft: 34, marginLeft: spacing.sm, borderLeftWidth: 2, borderLeftColor: "rgba(255,255,255,0.12)" },
  subDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: BLUE },
  subText: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.bodySemi, fontSize: 12.5, lineHeight: 17 },
});
