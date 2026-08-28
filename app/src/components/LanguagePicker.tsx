import React, { useState } from "react";
import { Modal, View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { LANGUAGES, languageByCode, t } from "../i18n";
import { Lang } from "../content/types";
import { languagesFor } from "../content/country-languages";
import { countryByCode } from "../content/anthems";
import { colors, spacing, radius, type, fonts } from "../theme/tokens";
import { Icon } from "../ui";

const UI = {
  heading: {
    en: "Choose a language", tn: "Tlhopha puo", af: "Kies 'n taal", zu: "Khetha ulimi", xh: "Khetha ulwimi",
    nso: "Kgetha leleme", st: "Kgetha puo", ss: "Khetsa lulwimi", ts: "Hlawula ririmi", nr: "Khetha ilimi", ve: "Khethani luambo",
  },
  spokenIn: {
    en: "Spoken in %s", tn: "Di buiwa kwa %s", af: "Word in %s gepraat", zu: "Kukhulunywa e-%s", xh: "Kuthethwa e-%s",
    nso: "Di bolelwa kua %s", st: "Di buuoa %s", ss: "Kukhulunywa e-%s", ts: "Ku vulavuriwa e-%s", nr: "Kukhulunywa e-%s", ve: "Zwi ambiwa %s",
  },
  otherLangs: {
    en: "Other languages", tn: "Dipuo tse dingwe", af: "Ander tale", zu: "Ezinye izilimi", xh: "Ezinye iilwimi",
    nso: "Maleme a mangwe", st: "Dipuo tse ding", ss: "Letinye tilwimi", ts: "Tindzimi tin'wana", nr: "Ezinye iinlimi", ve: "Dziṅwe nyambo",
  },
  alsoSpoken: {
    en: "Also spoken there, not yet in Ubuntu Heritage: %s",
    tn: "Di buiwa gape koo, di ise di nne mo Ubuntu Heritage: %s",
    af: "Word ook daar gepraat, nog nie in Ubuntu Heritage nie: %s",
    zu: "Nazo zikhulunywa lapho, azikho ku-Ubuntu Heritage okwamanje: %s",
    xh: "Nazo zithethwa apho, azikho ku-Ubuntu Heritage okwangoku: %s",
    nso: "Di bolelwa le tšona moo, ga di ešo tša ba go Ubuntu Heritage: %s",
    st: "Di buuoa le tsona moo, ha di so be ho Ubuntu Heritage: %s",
    ss: "Natokhulunywa lapho, atikho ku-Ubuntu Heritage okwanyalo: %s",
    ts: "Na tona ti vulavuriwa kona, a ti si va eka Ubuntu Heritage: %s",
    nr: "Nazo zikhulunywa lapho, azikho ku-Ubuntu Heritage okwanjesi: %s",
    ve: "Na dzone dzi ambiwa henefho, a dzi athu u vha kha Ubuntu Heritage: %s",
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
  country,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
  compact?: boolean;
  /**
   * The country selected in the header. When we have a SOURCED language map for it
   * (content/country-languages.ts), that country's languages lead the list and the rest follow.
   * Omitted, or a country we have not mapped, falls back to the plain eleven-language list.
   */
  country?: string;
}) {
  const [open, setOpen] = useState(false);
  const meta = languageByCode(lang);

  // Grouping, never filtering: a language you can read must never disappear because of where you
  // said you were. Picking Botswana puts Setswana at the top; it does not take isiZulu away.
  const map = country ? languagesFor(country) : undefined;
  const local = map ? LANGUAGES.filter((l) => map.supported.includes(l.code)) : [];
  const rest = map ? LANGUAGES.filter((l) => !map.supported.includes(l.code)) : LANGUAGES;
  // South Africa maps to all eleven, so a "Spoken in South Africa" heading over the whole list
  // would be noise — show the flat list there, as before.
  const grouped = local.length > 0 && rest.length > 0;
  const place = country ? countryByCode(country).name : "";

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
              {grouped ? (
                <Text style={styles.group}>{t(UI.spokenIn, lang).replace("%s", place)}</Text>
              ) : null}
              {local.map((l) => (
                <LanguageRow
                  key={l.code}
                  meta={l}
                  active={l.code === lang}
                  onPress={() => {
                    onChange(l.code);
                    setOpen(false);
                  }}
                />
              ))}

              {grouped ? <Text style={styles.group}>{t(UI.otherLangs, lang)}</Text> : null}
              {rest.map((l) => (
                <LanguageRow
                  key={l.code}
                  meta={l}
                  active={l.code === lang}
                  onPress={() => {
                    onChange(l.code);
                    setOpen(false);
                  }}
                />
              ))}
            </ScrollView>

            {/* Named, not quietly dropped: most of this continent's languages are not in the app,
                and a picker that showed only what we happen to have would imply otherwise. */}
            {map && map.notYet.length > 0 ? (
              <Text style={styles.notYet}>
                {t(UI.alsoSpoken, lang).replace("%s", map.notYet.join(", "))}
              </Text>
            ) : null}
            <Text style={styles.footnote}>{t(UI.footnote, lang)}</Text>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

/** One language in the sheet. Extracted so the two groups render identically. */
function LanguageRow({
  meta,
  active,
  onPress,
}: {
  meta: (typeof LANGUAGES)[number];
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.row, active && styles.rowActive]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={`${meta.endonym} — ${meta.english}`}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.endonym}>{meta.endonym}</Text>
        <Text style={styles.english}>{meta.english}</Text>
      </View>
      {meta.reviewedContent && <Icon.Check size={14} color={colors.gold} strokeWidth={2.6} />}
      {active && <View style={styles.activeDot} />}
    </Pressable>
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
  group: {
    color: colors.dsBlue,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    marginTop: spacing.sm,
    marginBottom: 4,
    paddingHorizontal: spacing.sm,
  },
  notYet: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.md,
    paddingHorizontal: spacing.sm,
  },
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
