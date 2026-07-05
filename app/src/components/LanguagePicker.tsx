import React, { useState } from "react";
import { Modal, View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { LANGUAGES, languageByCode, t } from "../i18n";
import { Lang } from "../content/types";
import { colors, spacing, radius, type, fonts } from "../theme/tokens";
import { Icon } from "../ui";

const UI = {
  heading: {
    en: "Choose a language", tn: "Tlhopha puo", af: "Kies 'n taal", zu: "Khetha ulimi", xh: "Khetha ulwimi",
    nso: "Kgetha leleme", st: "Kgetha puo", ss: "Khetsa lulwimi", ts: "Hlawula ririmi", nr: "Khetha ilimi", ve: "Khethani luambo",
  },
  footnote: {
    en: "A tick marks a full translation · others show English text for now, with native audio where available.",
    tn: "Letshwao le supa phetolelo e e feletseng · tse dingwe di bontsha mafoko a Seesemane gonepa jaana, ka modumo wa puo ya bo yona fa o le teng.",
    af: "'n Regmerkie dui 'n volledige vertaling aan · ander wys voorlopig Engelse teks, met inheemse klank waar beskikbaar.",
    zu: "Uphawu lokuhlola lukhombisa ukuhumusha okuphelele · ezinye zikhombisa umbhalo wesiNgisi okwamanje, nomsindo wolimi lwendabuko lapho utholakala.",
    xh: "Uphawu lokukhangela lubonisa uguqulelo olupheleleyo · ezinye zibonisa umbhalo wesiNgesi okwangoku, ngesandi solwimi lwenkobe apho lufumaneka khona.",
    nso: "Leswao le laetša phetolelo ye e feletšego · tše dingwe di laetša sengwalwa sa Seisemane ga bjale, ka modumo wa leleme la setlogo mo o hwetšagalago.",
    st: "Letshwao le bontsha phetolelo e felletseng · tse ding di bontsha mongolo oa Senyesemane hajoale, ka molumo oa puo ea matsoalloa moo o fumanehang.",
    ss: "Luphawu lokubeka lukhombisa kuhumusha lokuphelele · letinye tikhombisa umbhalo wesiNgisi okwanyalo, nemsindvo welulwimi lwendzabuko lapho lutfolakala khona.",
    ts: "Xikombiso xa ku hlola xi kombisa vuhundzuluxeri lebyi heleleke · swin'wana swi kombisa matsalwa ya Xinghezi sweswi, ni mpfumawulo wa ririmi ra xikaya laha swi kumekaka.",
    nr: "Uphawu lokukhamba lutjengisa ukuhlathulula okuphelele · ezinye zitjengisa umtlolo wesiNgisi okwanjesi, nomsindo welimi lomdabu lapho utholakala khona.",
    ve: "Tshiga tsha u tola tshi sumbedza u ṱalutshedzela ho fhelelaho · zwiṅwe zwi sumbedza maṅwalwa a Tshiisimane zwino, na mubvumo wa luambo lwa hayani hune zwa wanala.",
  },
};

// First-class language chooser for all 11 official SA languages (setswana-i18n skill: indigenous
// languages are peers, not a "secondary" dropdown). Lists each language by its own name (endonym).
// Languages with human-reviewed story text are marked ✓; the rest currently show English text and
// say so in the Reader — we never pass machine/absent translations off as authoritative.

export function LanguagePicker({
  lang,
  onChange,
  compact,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const meta = languageByCode(lang);

  return (
    <>
      <Pressable
        style={styles.trigger}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`Language: ${meta.english}. Tap to change.`}
      >
        <View style={styles.triggerRow}>
          <Text style={styles.triggerText}>{compact ? lang.toUpperCase() : meta.endonym}</Text>
          <Icon.ChevronDown size={13} color="rgba(255,255,255,0.7)" />
        </View>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.sheet} onStartShouldSetResponder={() => true}>
            <Text style={styles.heading}>{t(UI.heading, lang)}</Text>
            <ScrollView style={{ maxHeight: 340 }}>
              {LANGUAGES.map((l) => {
                const active = l.code === lang;
                return (
                  <Pressable
                    key={l.code}
                    style={[styles.row, active && styles.rowActive]}
                    onPress={() => {
                      onChange(l.code);
                      setOpen(false);
                    }}
                    accessibilityRole="button"
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.endonym}>{l.endonym}</Text>
                      <Text style={styles.english}>{l.english}</Text>
                    </View>
                    {l.reviewedContent && <Icon.Check size={14} color={colors.gold} strokeWidth={2.6} />}
                    {active && <View style={styles.activeDot} />}
                  </Pressable>
                );
              })}
            </ScrollView>
            <Text style={styles.footnote}>{t(UI.footnote, lang)}</Text>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
  },
  triggerText: { color: "#fff", fontFamily: fonts.bodySemi, fontSize: type.small },
  triggerRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.ember },
  backdrop: {
    flex: 1,
    backgroundColor: colors.scrimStrong,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  sheet: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#0D0D0D",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  heading: {
    color: colors.gold,
    fontFamily: fonts.bodySemi,
    fontSize: type.small,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: 9,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
  },
  rowActive: { backgroundColor: "rgba(255,255,255,0.08)" },
  endonym: { color: "#fff", fontFamily: fonts.bodySemi, fontSize: 15 },
  english: { color: colors.muted, fontFamily: fonts.body, fontSize: 12, marginTop: 1 },
  reviewed: { color: colors.gold, fontSize: type.body, fontWeight: "800" },
  check: { color: colors.ember, fontSize: type.body },
  footnote: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: type.small,
    lineHeight: 18,
    marginTop: spacing.md,
    fontStyle: "italic",
  },
});
