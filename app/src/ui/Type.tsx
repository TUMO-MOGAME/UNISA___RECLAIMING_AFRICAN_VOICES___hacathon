import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { colors, fonts, type } from "../theme/tokens";

// Typography primitives — the ONLY way to render text in Maloba. Every page uses these instead of
// raw <Text> + fontFamily, so the type system (Anton display + Barlow body) and the brief's colours
// stay identical everywhere, including any new page. Pass `onDark` on immersive/dark surfaces (the
// Reader) to flip text to cream; default is the cream-paper world (navy text). See src/ui/README.md.

type Props = TextProps & { onDark?: boolean };

// B&W theme: primary type is pure white on black; muted is a neutral grey. (Both worlds are dark now.)
const fg = (onDark?: boolean) => (onDark ? colors.sand : "#FFFFFF");
const fgMuted = (onDark?: boolean) => (onDark ? colors.muted : "rgba(255,255,255,0.6)");

/** Huge Anton headline / brand (uppercase). */
export function Display({ onDark, style, ...p }: Props) {
  return <Text {...p} style={[styles.display, { color: fg(onDark) }, style]} />;
}
/** Page / card title (Barlow ExtraBold). */
export function Title({ onDark, style, ...p }: Props) {
  return <Text {...p} style={[styles.title, { color: fg(onDark) }, style]} />;
}
/** Orange uppercase eyebrow above a title. */
export function Kicker({ style, ...p }: TextProps) {
  return <Text {...p} style={[styles.kicker, style]} />;
}
/** Uppercase section label. */
export function SectionLabel({ onDark, style, ...p }: Props) {
  return <Text {...p} style={[styles.sectionLabel, { color: fg(onDark) }, style]} />;
}
/** Reading / paragraph body (Barlow). */
export function Body({ onDark, style, ...p }: Props) {
  return <Text {...p} style={[styles.body, { color: fg(onDark) }, style]} />;
}
/** Small orange uppercase meta line (author · year, etc.). */
export function Meta({ style, ...p }: TextProps) {
  return <Text {...p} style={[styles.meta, style]} />;
}
/** Secondary / muted text. */
export function Muted({ onDark, style, ...p }: Props) {
  return <Text {...p} style={[styles.muted, { color: fgMuted(onDark) }, style]} />;
}

const styles = StyleSheet.create({
  display: { fontFamily: fonts.display, fontSize: 40, letterSpacing: 0.5, textTransform: "uppercase" },
  title: { fontFamily: fonts.displaySemi, fontSize: type.title, lineHeight: type.title + 4 },
  kicker: {
    color: colors.orange,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  sectionLabel: { fontFamily: fonts.displaySemi, fontSize: 15, letterSpacing: 1, textTransform: "uppercase" },
  body: { fontFamily: fonts.body, fontSize: type.body, lineHeight: 26 },
  meta: {
    color: colors.orange,
    fontFamily: fonts.bodyBold,
    fontSize: type.small - 1,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  muted: { fontFamily: fonts.body, fontSize: type.small + 1, lineHeight: 20 },
});
