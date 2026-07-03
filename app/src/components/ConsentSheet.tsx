import React from "react";
import { Modal, View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Lang } from "../content/types";
import { t } from "../i18n";
import { colors, spacing, radius, type, fonts } from "../theme/tokens";
import { Icon } from "../ui";

// POPIA consent gate — MUST appear before the microphone is ever activated.
// See .claude/skills/popia-compliance + docs/05-popia-compliance.md.
// Copy is honest about what currently happens (local save) vs what happens when sharing is enabled.

export type Visibility = "private" | "public";

const UI = {
  title: { en: "Before you record", tn: "Pele o gatisa" },
  body: {
    en: "Your story is personal information. Under South Africa's POPIA, your voice is protected — so we only record it with your clear consent. Your recording is saved on this device. If you choose to share it with the community, it can be transcribed (by Lelapa AI) and stored securely (Supabase) when that feature is enabled. You can delete it at any time.",
    tn: "Kanegelo ya gago ke tshedimosetso ya botho. Ka fa tlase ga POPIA ya Aforika Borwa, lentswe la gago le sirelediwe — ka jalo re le gatisa fela ka tumelelo ya gago e e phepa. Kgatiso ya gago e bolokwa mo sedirisweng se. Fa o tlhopha go e abelana le setšhaba, e ka fetolelwa (ke Lelapa AI) e bo e bolokwa ka pabalesego (Supabase) fa tiro eo e tshupilwe. O ka e phimola nako nngwe le nngwe.",
  },
  question: { en: "How should this recording be kept?", tn: "Kgatiso e e tshwanetse go bolokwa jang?" },
  private: { en: "Keep private", tn: "Boloka e le sephiri" },
  privateHint: { en: "Only you can access it.", tn: "Ke wena fela o ka e bonang." },
  public: { en: "Share with community", tn: "Abelana le setšhaba" },
  publicHint: { en: "Add your voice to the archive.", tn: "Tsenya lentswe la gago mo polokelong." },
  cancel: { en: "Not now", tn: "E seng jaanong" },
};

export function ConsentSheet({
  visible,
  lang,
  onConsent,
  onCancel,
}: {
  visible: boolean;
  lang: Lang;
  onConsent: (v: Visibility) => void;
  onCancel: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <ScrollView>
            <Text style={styles.title}>{t(UI.title, lang)}</Text>
            <Text style={styles.body}>{t(UI.body, lang)}</Text>

            <Text style={styles.question}>{t(UI.question, lang)}</Text>

            <Pressable style={styles.choice} onPress={() => onConsent("private")}>
              <View style={styles.choiceTitleRow}>
                <Icon.Lock size={15} color={colors.gold} />
                <Text style={styles.choiceTitle}>{t(UI.private, lang)}</Text>
              </View>
              <Text style={styles.choiceHint}>{t(UI.privateHint, lang)}</Text>
            </Pressable>

            <Pressable
              style={[styles.choice, styles.choicePublic]}
              onPress={() => onConsent("public")}
            >
              <View style={styles.choiceTitleRow}>
                <Icon.Users size={15} color={colors.gold} />
                <Text style={styles.choiceTitle}>{t(UI.public, lang)}</Text>
              </View>
              <Text style={styles.choiceHint}>{t(UI.publicHint, lang)}</Text>
            </Pressable>

            <Pressable style={styles.cancel} onPress={onCancel}>
              <Text style={styles.cancelText}>{t(UI.cancel, lang)}</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: colors.scrimStrong, justifyContent: "flex-end" },
  sheet: {
    backgroundColor: "#0D0D0D",
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    padding: spacing.lg,
    maxHeight: "85%",
  },
  title: { color: colors.gold, fontFamily: fonts.displaySemi, fontSize: type.title + 2 },
  body: { color: colors.sand, fontFamily: fonts.body, fontSize: type.body, lineHeight: 26, marginTop: spacing.md },
  question: { color: colors.muted, fontFamily: fonts.bodySemi, fontSize: type.small, marginTop: spacing.lg, marginBottom: spacing.sm, textTransform: "uppercase", letterSpacing: 1 },
  choice: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: radius.md, padding: spacing.md, marginTop: spacing.sm },
  choicePublic: { borderWidth: 1, borderColor: colors.gold },
  choiceTitleRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  choiceTitle: { color: colors.sand, fontFamily: fonts.bodySemi, fontSize: type.body },
  choiceHint: { color: colors.muted, fontFamily: fonts.body, fontSize: type.small, marginTop: 2 },
  cancel: { alignItems: "center", paddingVertical: spacing.lg, marginTop: spacing.sm },
  cancelText: { color: colors.muted, fontFamily: fonts.body, fontSize: type.body },
});
