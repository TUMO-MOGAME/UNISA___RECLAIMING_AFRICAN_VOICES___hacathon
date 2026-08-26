import React from "react";
import { View, Text, Pressable, Image, StyleSheet, useWindowDimensions, Linking } from "react-native";
import { Lang } from "../../content/types";
import { t } from "../../i18n";
import { colors, spacing, radius, fonts } from "../../theme/tokens";
import { Icon } from "../../ui";

// The site footer — lifted verbatim out of HomeGallery so the shell can render it on EVERY route
// (Architecture v2, D6). Nothing here is restyled: same wordmark, same partner plates, same sound
// credit, same built-with strip, same fine print. If this looks different from the old home-page
// footer, the change is wrong. See docs/13-architecture-v2-plan.md §3.

const KICKER = "Reclaiming African Voices";
// The ambient African music/soundscapes across the app are sampled from this YouTube channel —
// credited + linked here so listeners can hear the full pieces at the source.
const SOUND_CREDIT_URL = "https://www.youtube.com/@AfricanTribeEchoes";
const SOLANA_URL = "https://solana.com";
const BLUE = "#1A85A7"; // accent only — rules, borders, links

const UI = {
  about: {
    en: "About the Sources", tn: "Ka ga Metswedi", af: "Oor die bronne", zu: "Mayelana Nemithombo", xh: "Malunga Nemithombo",
    nso: "Ka ga Methopo", st: "Mabapi le Mehlodi", ss: "Mayelana Nemitfombo", ts: "Mayelana ni Tihlovo", nr: "Malunga Nemithombo", ve: "Nga ha Zwiko",
  },
  heritage: {
    en: "Heritage Ledger · on-chain", tn: "Rekoto ya Boswa · mo blockchain", af: "Erfenisregister · op-ketting", zu: "Irejista Yamagugu · ku-blockchain", xh: "Irejista Yelifa · kwi-blockchain",
    nso: "Rejista ya Bohwa · go blockchain", st: "Rejista ya Lefa · ho blockchain", ss: "Irejista Yelifa · ku-blockchain", ts: "Rejista ya Ndzhaka · eka blockchain", nr: "Irejista Yelifa · ku-blockchain", ve: "Rejista ya Ifa · kha blockchain",
  },
};

export function SiteFooter({
  lang,
  onAbout,
  onHeritage,
}: {
  lang: Lang;
  onAbout: () => void;
  onHeritage: () => void;
}) {
  const { width } = useWindowDimensions();
  const wide = width >= 768;

  return (
    <View style={styles.footer}>
      <View style={[styles.footerInner, wide && styles.footerInnerWide]}>
        <View style={wide ? styles.footerMainWide : styles.footerMain}>
          {/* Left: wordmark + tagline */}
          <View style={styles.footerBrandCol}>
            <Text style={styles.footerBrand}>Ubuntu Heritage</Text>
            <Text style={styles.footerLede}>
              South Africa's foundational literature and heritage — vivid, multilingual and free.
            </Text>
            <Text style={[styles.partnersLabel, styles.creatorLabel]}>Created by</Text>
            <Text style={styles.creatorName}>Tumo Olorato Mogame</Text>
          </View>
          {/* Middle: partners */}
          <View style={styles.partners}>
            <Text style={styles.partnersLabel}>In partnership with</Text>
            <View style={styles.partnerMarks}>
              {/* Real partner logos on white plates so the dark/coloured marks stay legible on
                  the navy footer (logos kept in their own brand colours — not recoloured). */}
              <View style={styles.partnerPlate}>
                <Image
                  source={require("../../../assets/brand/unisa.webp")}
                  style={styles.unisaLogo}
                  resizeMode="contain"
                  accessibilityLabel="University of South Africa (UNISA)"
                />
              </View>
              <View style={styles.partnerPlate}>
                <Image
                  source={require("../../../assets/brand/botlhale-chip.webp")}
                  style={styles.botlhaleChip}
                  resizeMode="contain"
                  accessibilityLabel="Botlhale AI"
                />
                <Text style={styles.botlhaleName}>Botlhale AI</Text>
              </View>
            </View>
            {/* Sound credit — the ambient music/soundscapes are sampled from this YouTube
                channel. Clickable so listeners can hear the full pieces at the source. */}
            <Text style={[styles.partnersLabel, styles.creditLabel]}>Sounds & music by</Text>
            <Pressable
              onPress={() => Linking.openURL(SOUND_CREDIT_URL)}
              style={({ pressed, hovered }: any) => [
                styles.creditPlate,
                hovered && styles.creditPlateHover,
                pressed && styles.creditPlatePressed,
              ]}
              accessibilityRole="link"
              accessibilityLabel="African Tribe Echoes on YouTube — opens in browser"
            >
              <Image
                source={require("../../../assets/brand/african-tribe-echoes.webp")}
                style={styles.creditAvatar}
                resizeMode="cover"
              />
              <View style={styles.creditText}>
                <Text style={styles.creditName}>African Tribe Echoes</Text>
                <View style={styles.creditSub}>
                  <Icon.Headphones size={12} color="rgba(255,255,255,0.6)" />
                  <Text style={styles.creditRole}>Full tracks on YouTube</Text>
                </View>
              </View>
              <Icon.ArrowUpRight size={16} color="rgba(255,255,255,0.55)" />
            </Pressable>
          </View>
          {/* Right: links + built-with (grouped here so the partners column stays compact) */}
          <View style={[styles.footerLinks, wide && styles.footerLinksWide]}>
            <Pressable style={styles.footerLink} onPress={onAbout}>
              <Text style={styles.footerLinkText}>{t(UI.about, lang)}</Text>
              <Icon.ArrowRight size={16} color={colors.dsBlue} />
            </Pressable>
            <Pressable style={styles.footerLink} onPress={onHeritage}>
              <View style={styles.liveDot} />
              <Text style={styles.footerLinkText}>{t(UI.heritage, lang)}</Text>
            </Pressable>
            {/* Built with — the tech the app runs on. Sits under the on-chain Heritage Ledger link
                (Solana anchors it). Distinct from "In partnership with": tech used ≠ endorsement.
                Light Solana logotype on the navy ground (high-contrast, per Solana's guidelines). */}
            <View style={[styles.builtWith, wide && styles.builtWithWide]}>
              <Text style={styles.partnersLabel}>Built with</Text>
              <Pressable
                onPress={() => Linking.openURL(SOLANA_URL)}
                style={({ pressed, hovered }: any) => [
                  styles.builtWithPlate,
                  hovered && styles.creditPlateHover,
                  pressed && styles.creditPlatePressed,
                ]}
                accessibilityRole="link"
                accessibilityLabel="Built with Solana — opens solana.com in browser"
              >
                <Image
                  source={require("../../../assets/brand/solana.webp")}
                  style={styles.solanaLogo}
                  resizeMode="contain"
                  accessibilityLabel="Solana"
                />
              </Pressable>
            </View>
          </View>
        </View>
        {/* Bottom bar: fine print under a hairline */}
        <View style={styles.footerBar}>
          <Text style={styles.footerFine}>{KICKER} · POPIA-compliant · built on free-tier, African-built AI</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { backgroundColor: colors.dsNavyDeep, borderTopWidth: 8, borderTopColor: BLUE, paddingHorizontal: spacing.lg, paddingVertical: spacing.lg },
  footerInner: { width: "100%", maxWidth: 1160, alignSelf: "center" },
  footerInnerWide: { paddingHorizontal: 40 },
  footerMain: { gap: spacing.md },
  footerMainWide: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", columnGap: spacing.xl, rowGap: spacing.lg },
  footerBrandCol: { flexShrink: 1 },
  footerBrand: { color: "#FFFFFF", fontFamily: fonts.displaySemi, fontSize: 22, lineHeight: 26, letterSpacing: -0.4 },
  footerLede: { color: "rgba(255,255,255,0.72)", fontFamily: fonts.body, fontSize: 14, lineHeight: 21, marginTop: spacing.xs, maxWidth: 360 },
  footerLinks: { gap: spacing.sm },
  footerLinksWide: { alignItems: "flex-end" },
  footerLink: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  footerLinkText: { color: "#FFFFFF", fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 1, textTransform: "uppercase" },
  footerBar: { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.12)", marginTop: spacing.lg, paddingTop: spacing.md },

  partners: {},
  partnersLabel: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.bodySemi, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: spacing.sm },
  partnerMarks: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: spacing.md },

  partnerPlate: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: "#FFFFFF",
    borderRadius: radius.sm,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  unisaLogo: { width: 92, height: 28 },
  botlhaleChip: { width: 26, height: 26 },

  creditLabel: { marginTop: spacing.md },
  creditPlate: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    borderRadius: radius.md,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  creditPlateHover: { backgroundColor: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.28)" },
  creditPlatePressed: { opacity: 0.8 },

  builtWith: { marginTop: spacing.md, gap: spacing.sm, alignItems: "flex-start" }, // left when narrow
  builtWithWide: { alignItems: "flex-end" }, // right-align to match the links when wide

  builtWithPlate: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    borderRadius: radius.md,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  solanaLogo: { width: 132, height: 20 }, // 640x95 source ≈ 6.7:1
  creditAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#1A1A1A" },
  creditText: { gap: 2 },
  creditName: { color: "#FFFFFF", fontFamily: fonts.heading, fontSize: 14, letterSpacing: 0.2 },
  creditSub: { flexDirection: "row", alignItems: "center", gap: 4 },
  creditRole: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.body, fontSize: 11, letterSpacing: 0.2 },
  botlhaleName: { color: colors.dsSlate, fontFamily: fonts.heading, fontSize: 15, letterSpacing: 0.2 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.live },
  footerFine: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.body, fontSize: 12, lineHeight: 18 },
  creatorLabel: { marginTop: spacing.lg, marginBottom: 4 },
  creatorName: { color: "#FFFFFF", fontFamily: fonts.serif, fontSize: 15 },
});
