import React from "react";
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { Lang } from "../../content/types";
import { t } from "../../i18n";
import { colors, spacing, radius, fonts } from "../../theme/tokens";
import { Icon } from "../../ui";
import { LanguagePicker } from "../LanguagePicker";
import { CountryPicker } from "../CountryPicker";
import { NAV, PASSPORT_LABEL, WIDE_MIN, type NavId } from "./nav";

// The site header — direction C, "two-tier" (chosen 2026-08-26).
//
//   tier 1 : wordmark ................................ country ▾  language ▾  Passport
//   tier 2 : Journey  Watch  Atlas  Archive  Kids  Schools
//   ────────  8px sa-blue rule (the app's signature divider) ────────
//
// Two states (v2 plan §5):
//   • `overHero` — transparent, rule suppressed, so the hero's SA road stays clean (D6). The hero
//     already reserves 90px of top padding, which the two tiers fit inside almost exactly.
//   • solid — black ground + the blue rule, on every other route.
//
// Below WIDE_MIN the nav row is dropped entirely and MobileTabBar takes over; tier 1 stays, so
// identity and the language/country switchers are always reachable.

const BLUE = "#1A85A7"; // accent only — rules, borders, links

export function SiteHeader({
  lang,
  onLangChange,
  country,
  onCountryChange,
  active,
  onNavigate,
  overHero = false,
  cards = 0,
}: {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  country: string;
  onCountryChange: (code: string) => void;
  /** Which room is showing, so the nav can mark it. */
  active: NavId | null;
  onNavigate: (id: NavId) => void;
  /** Home only: sit transparently over the full-bleed hero. */
  overHero?: boolean;
  /** Heritage cards earned. The Passport chip stays hidden at 0 so a new visitor never sees an
   *  empty score (v2 plan §11 — the shell must never look like a game you are losing). */
  cards?: number;
}) {
  const { width } = useWindowDimensions();
  const wide = width >= WIDE_MIN;

  return (
    <View style={[styles.root, overHero && styles.rootOverHero]}>
      {/* ── Tier 1: identity + settings ─────────────────────────────────── */}
      <View style={[styles.tier1, !overHero && styles.tier1Solid]}>
        <Pressable
          onPress={() => onNavigate("home")}
          accessibilityRole="link"
          accessibilityLabel="Ubuntu Heritage — home"
          style={styles.markHit}
        >
          <Text style={styles.mark}>
            Ubuntu <Text style={styles.markAccent}>Heritage</Text>
          </Text>
        </Pressable>

        <View style={styles.util}>
          <CountryPicker country={country} onChange={onCountryChange} lang={lang} />
          <LanguagePicker lang={lang} onChange={onLangChange} compact={!wide} />
          {cards > 0 ? (
            <Pressable
              onPress={() => onNavigate("passport")}
              accessibilityRole="link"
              accessibilityLabel={`${t(PASSPORT_LABEL, lang)} — ${cards}`}
              style={({ hovered, pressed }: any) => [
                styles.passport,
                hovered && styles.passportHover,
                pressed && styles.passportPressed,
              ]}
            >
              <Icon.Stamp size={13} color="#8FD3E8" />
              {wide ? <Text style={styles.passportText}>{t(PASSPORT_LABEL, lang)}</Text> : null}
              <Text style={styles.passportCount}>{cards}</Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      {/* ── Tier 2: the D1 nav (wide screens only) ──────────────────────── */}
      {wide ? (
        <View style={[styles.tier2, !overHero && styles.tier2Solid]}>
          {NAV.map((item) => {
            const on = item.id === active;
            return (
              <Pressable
                key={item.id}
                onPress={() => onNavigate(item.id)}
                accessibilityRole="link"
                accessibilityState={{ selected: on }}
                accessibilityLabel={t(item.label, lang)}
                style={styles.navHit}
              >
                {({ hovered }: any) => (
                  <View style={styles.navItem}>
                    <Text style={[styles.navText, (on || hovered) && styles.navTextOn]}>
                      {t(item.label, lang)}
                    </Text>
                    <View style={[styles.navRule, on && styles.navRuleOn]} />
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      ) : null}

      {/* The signature 8px sa-blue rule — suppressed over the hero so it never cuts the SA road. */}
      {!overHero ? <View style={styles.blueRule} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: "100%", zIndex: 50 },
  // Over the hero the header is a transparent overlay, so it must not paint a ground of its own.
  rootOverHero: { position: "absolute", top: 0, left: 0, right: 0, backgroundColor: "transparent" },

  tier1: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 9,
  },
  tier1Solid: { backgroundColor: colors.dsNavy, borderBottomWidth: 1, borderBottomColor: colors.hairline },

  markHit: { paddingVertical: 2 },
  mark: { color: "#FFFFFF", fontFamily: fonts.displaySemi, fontSize: 18, letterSpacing: -0.35 },
  markAccent: { color: BLUE },

  util: { marginLeft: "auto", flexDirection: "row", alignItems: "center", gap: spacing.sm },

  passport: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(26,133,167,0.55)",
    backgroundColor: "rgba(26,133,167,0.10)",
    borderRadius: radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  passportHover: { borderColor: BLUE, backgroundColor: "rgba(26,133,167,0.18)" },
  passportPressed: { opacity: 0.8 },
  passportText: { color: "#8FD3E8", fontFamily: fonts.bodySemi, fontSize: 12, letterSpacing: 0.2 },
  passportCount: { color: "#FFFFFF", fontFamily: fonts.bodyBold, fontSize: 12 },

  tier2: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    height: 44,
  },
  tier2Solid: { backgroundColor: colors.dsNavy },

  navHit: { justifyContent: "center" },
  navItem: { height: "100%", justifyContent: "space-between" },
  navText: {
    color: "rgba(255,255,255,0.72)",
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingTop: 14,
  },
  navTextOn: { color: "#FFFFFF" },
  navRule: { height: 2, backgroundColor: "transparent", marginTop: 12 },
  navRuleOn: { backgroundColor: BLUE },

  blueRule: { height: 8, backgroundColor: BLUE },
});
