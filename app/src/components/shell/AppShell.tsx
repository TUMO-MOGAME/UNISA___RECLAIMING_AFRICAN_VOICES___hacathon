import React from "react";
import { View, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { Lang } from "../../content/types";
import { colors } from "../../theme/tokens";
import { SiteHeader } from "./SiteHeader";
import { MobileTabBar } from "./MobileTabBar";
import { SiteFooter } from "./SiteFooter";
import { WIDE_MIN, type NavId } from "./nav";

// The shell — header, the route's content, footer. Every route renders inside this, which is what
// finally gives the app a persistent chrome instead of 15 screens each re-inventing their own.
// See docs/13-architecture-v2-plan.md §5.
//
// Three layout modes:
//   "page"   — the shell scrolls the content and appends the footer. What most rooms want.
//   "own"    — the route scrolls itself (it has its own ScrollView / side-index layout); the shell
//              only supplies the header and tab bar. The footer is the route's business.
//   "immersive" — no chrome at all: the Reader, a film, a dot-story. Content fills the viewport.
//
// The Home hero is full-bleed, so its header sits transparently ON the hero (`overHero`) rather than
// pushing it down — the hero already reserves 90px of top padding, which the two tiers fit inside.

export type ShellMode = "page" | "own" | "immersive";

export function AppShell({
  children,
  mode,
  lang,
  onLangChange,
  country,
  onCountryChange,
  active,
  onNavigate,
  overHero = false,
  cards = 0,
  onAbout,
  onHeritage,
}: {
  children: React.ReactNode;
  mode: ShellMode;
  lang: Lang;
  onLangChange: (l: Lang) => void;
  country: string;
  onCountryChange: (code: string) => void;
  active: NavId | null;
  onNavigate: (id: NavId) => void;
  overHero?: boolean;
  cards?: number;
  onAbout: () => void;
  onHeritage: () => void;
}) {
  const { width } = useWindowDimensions();
  const wide = width >= WIDE_MIN;

  // Films, dot-stories and the Reader take the whole viewport — no header, no tabs, no footer.
  if (mode === "immersive") return <View style={styles.root}>{children}</View>;

  const header = (
    <SiteHeader
      lang={lang}
      onLangChange={onLangChange}
      country={country}
      onCountryChange={onCountryChange}
      active={active}
      onNavigate={onNavigate}
      overHero={overHero}
      cards={cards}
    />
  );

  return (
    <View style={styles.root}>
      {/* Over the hero the header is absolutely positioned, so it must render AFTER the content to
          sit above it; everywhere else it is a normal first row. */}
      {!overHero ? header : null}

      {mode === "page" ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.pageContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.pageInner}>{children}</View>
          <SiteFooter lang={lang} onAbout={onAbout} onHeritage={onHeritage} />
        </ScrollView>
      ) : (
        <View style={styles.flex}>{children}</View>
      )}

      {overHero ? header : null}
      {!wide ? <MobileTabBar lang={lang} active={active} onNavigate={onNavigate} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.dsNavy },
  flex: { flex: 1 },
  pageContent: { flexGrow: 1 },
  // Content rooms read as a centred column; the footer below stays full-bleed.
  pageInner: { width: "100%", maxWidth: 1160, alignSelf: "center", flexGrow: 1 },
});
