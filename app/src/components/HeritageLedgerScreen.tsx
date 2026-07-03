import React from "react";
import { View, Text, Pressable, StyleSheet, Linking } from "react-native";
import { Lang } from "../content/types";
import { t } from "../i18n";
import { HERITAGE_ANCHORS, explorerUrl, explorerAddressUrl, shortHash } from "../content/heritage";
import { Screen, ScreenHeader, Card, Body, Title, Meta, Muted, Icon } from "../ui";
import { colors, spacing, radius, type, fonts } from "../theme/tokens";

// The Heritage Ledger — Maloba's on-chain provenance. Each foundational work is content-fingerprinted
// (SHA-256 + IPFS CID) and anchored on a public Solana ledger: tamper-evident, permanent, verifiable
// by anyone. POPIA-safe: only public works + hashes go on-chain — never a person's recording.
// See docs/11-blockchain-heritage-plan.md. Built on the UI kit.

const UI = {
  title: { en: "Heritage Ledger", tn: "Rekoto ya Boswa" }, // [REVIEW: Setswana]
  intro: {
    en: "Every foundational work here is fingerprinted (SHA-256 + IPFS content ID), anchored on a public blockchain, and minted as a heritage certificate token held in a wallet. That makes each text tamper-evident, permanently verifiable, and owned by the community — history no one can quietly alter or erase.",
    tn: "Tiro nngwe le nngwe ya motheo mo e na le letshwao (SHA-256 + IPFS), e tshwaretswe mo blockchain ya setšhaba, mme e dirilwe setifikeiti mo sekhwameng — hisitori e e sa kake ya fetolwa kgotsa ya phimolwa ke ope.",
  },
  popia: {
    en: "Privacy first (POPIA): only public literary works and their hashes are placed on-chain. Community members' personal voice recordings are NEVER put on the blockchain — they stay in private, erasable storage you control.",
    tn: "Sephiri pele (POPIA): ke ditiro tsa setšhaba fela tse di tsenngwang mo blockchain. Dikgatiso tsa mantswe a batho ga di ke di tsenngwe mo blockchain.",
  },
  verify: { en: "Verify on Solana", tn: "Netefatsa mo Solana" },
  pending: { en: "Anchoring pending", tn: "E emetse go tshwarwa" },
  cidLabel: { en: "IPFS content ID", tn: "IPFS" },
  hashLabel: { en: "SHA-256 fingerprint", tn: "Letshwao SHA-256" },
  certLabel: { en: "Heritage certificate (token)", tn: "Setifikeiti sa boswa" },
  viewCert: { en: "View certificate", tn: "Bona setifikeiti" },
};

export function HeritageLedgerScreen({ lang, onBack }: { lang: Lang; onBack: () => void }) {
  return (
    <Screen tone="paper">
      <ScreenHeader kicker="On-chain provenance" title={t(UI.title, lang)} onBack={onBack} />

      <Body style={styles.intro}>{t(UI.intro, lang)}</Body>

      {HERITAGE_ANCHORS.map((a) => {
        const anchored = a.tx !== "pending" && a.tx.length > 0;
        return (
          <Card key={a.id} style={styles.card}>
            <Title style={styles.workTitle}>{a.title}</Title>
            <Meta style={styles.meta}>
              {a.author} · {a.year}
            </Meta>

            <Text style={styles.fieldLabel}>{t(UI.cidLabel, lang)}</Text>
            <Text style={styles.mono}>{shortHash(a.cid, 10, 8)}</Text>

            <Text style={styles.fieldLabel}>{t(UI.hashLabel, lang)}</Text>
            <Text style={styles.mono}>{shortHash(a.sha256, 10, 8)}</Text>

            {a.mint !== "pending" && a.mint.length > 0 && (
              <>
                <Text style={styles.fieldLabel}>{t(UI.certLabel, lang)}</Text>
                <Pressable style={styles.linkRow} onPress={() => Linking.openURL(explorerAddressUrl(a.mint, a.cluster))}>
                  <Text style={[styles.mono, styles.link]}>{shortHash(a.mint, 10, 8)}</Text>
                  <Icon.ArrowUpRight size={12} color={colors.orange} />
                </Pressable>
              </>
            )}

            {anchored ? (
              <Pressable style={styles.verifyBtn} onPress={() => Linking.openURL(explorerUrl(a.tx, a.cluster))}>
                <Text style={styles.verifyText}>{t(UI.verify, lang)}</Text>
                <Icon.ArrowUpRight size={13} color={colors.paper} />
              </Pressable>
            ) : (
              <View style={styles.pendingChip}>
                <Icon.Clock size={12} color="rgba(255,255,255,0.7)" />
                <Text style={styles.pendingText}>{t(UI.pending, lang)}</Text>
              </View>
            )}
          </Card>
        );
      })}

      <Card tone="navy" style={styles.popiaCard}>
        <Icon.Lock size={20} color={colors.gold} />
        <Muted onDark style={styles.popiaText}>
          {t(UI.popia, lang)}
        </Muted>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { marginBottom: spacing.lg },
  workTitle: { fontFamily: fonts.serifSemi, fontSize: type.title + 2 },
  card: { marginBottom: spacing.md },
  meta: { marginTop: 2 },
  fieldLabel: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: fonts.bodyBold,
    fontSize: type.small - 1,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginTop: spacing.md,
  },
  mono: { color: "rgba(255,255,255,0.85)", fontFamily: fonts.bodyMedium, fontSize: type.small + 1, marginTop: 2 },
  link: { color: colors.orange, fontFamily: fonts.bodySemi },
  linkRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  verifyBtn: {
    alignSelf: "flex-start",
    marginTop: spacing.md,
    backgroundColor: colors.orange,
    borderRadius: radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  verifyText: {
    color: colors.paper,
    fontFamily: fonts.bodyBold,
    fontSize: type.small,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  pendingChip: {
    alignSelf: "flex-start",
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: radius.pill,
    paddingVertical: 7,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  pendingText: { color: "rgba(255,255,255,0.7)", fontFamily: fonts.bodySemi, fontSize: type.small },
  popiaCard: { flexDirection: "row", gap: spacing.md, marginTop: spacing.lg, alignItems: "flex-start" },
  popiaMark: { fontSize: 22 },
  popiaText: { flex: 1, fontStyle: "italic", lineHeight: 20 },
});
