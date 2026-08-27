import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Lang } from "../../content/types";
import { t } from "../../i18n";
import { colors, spacing, fonts } from "../../theme/tokens";
import { Icon, type IconProps } from "../../ui";
import { NAV, TABS, ME_LABEL, type NavId } from "./nav";

// The phone navigation — four tabs, per wireframes 2b and 2h. Six nav items cannot survive a thumb,
// so Archive, Kids and Schools are reached from inside a room (Home, Atlas, and the Passport's
// grown-ups corner) rather than getting a tab they would have to share.
//
// Hidden entirely while a film or dot-story plays (the shell passes `visible={false}`), the same way
// the floating chatbot already steps out of the way.

const BLUE = "#1A85A7";

const ICONS: Record<NavId, React.ComponentType<IconProps>> = {
  home: Icon.Route,
  journey: Icon.Route,
  watch: Icon.Play,
  atlas: Icon.Compass,
  passport: Icon.User,
  archive: Icon.Mic,
  kids: Icon.Smile,
  schools: Icon.GraduationCap,
  countries: Icon.Flag,
};

export function MobileTabBar({
  lang,
  active,
  onNavigate,
}: {
  lang: Lang;
  active: NavId | null;
  onNavigate: (id: NavId) => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
      {TABS.map((id) => {
        const on = id === active;
        const Glyph = ICONS[id];
        // The Passport reads better as "Me" under an icon than as its full name.
        const label = id === "passport" ? t(ME_LABEL, lang) : t(NAV.find((n) => n.id === id)!.label, lang);
        return (
          <Pressable
            key={id}
            onPress={() => onNavigate(id)}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={label}
            style={styles.tab}
          >
            <Glyph size={20} color={on ? BLUE : "rgba(255,255,255,0.45)"} />
            <Text style={[styles.label, on && styles.labelOn]} numberOfLines={1}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: colors.dsNavy,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    paddingTop: spacing.sm,
  },
  tab: { flex: 1, alignItems: "center", gap: 5, paddingHorizontal: 4 },
  label: {
    color: "rgba(255,255,255,0.45)",
    fontFamily: fonts.bodySemi,
    fontSize: 10,
    letterSpacing: 0.3,
  },
  labelOn: { color: BLUE },
});
