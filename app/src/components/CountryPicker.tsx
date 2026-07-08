import React, { useState } from "react";
import { Modal, View, Text, Pressable, ScrollView, Image, TextInput, StyleSheet } from "react-native";
import { colors, spacing, radius, type, fonts } from "../theme/tokens";
import { Icon } from "../ui";
import { t } from "../i18n";
import type { LangCode } from "../i18n";
import { countries, countryByCode } from "../content/anthems";
import { PlayOnceRow } from "./PlayOnceRow";

// Country selector — mirror of the LanguagePicker, but on the LEFT of the hero. South Africa is the
// default; the trigger shows the flag + name. The sheet lists African countries and lets you play the
// selected country's national anthem (bundled audio via PlayOnceRow). Countries whose anthem hasn't
// been added yet show an honest "anthem coming" note. Built to grow to the whole continent.

const UI = {
  heading: {
    en: "Choose a country", tn: "Tlhopha naga", af: "Kies 'n land", zu: "Khetha izwe", xh: "Khetha ilizwe",
    nso: "Kgetha naga", st: "Kgetha naha", ss: "Khetsa live", ts: "Hlawula tiko", nr: "Khetha inarha", ve: "Khethani shango",
  },
  anthem: {
    en: "National anthem", tn: "Pina ya bosetšhaba", af: "Volkslied", zu: "Iculo lesizwe", xh: "Ingoma yesizwe",
    nso: "Koša ya setšhaba", st: "Pina ya naha", ss: "Ingoma yesive", ts: "Risimu ra rixaka", nr: "Ingoma yesitjhaba", ve: "Luimbo lwa lushaka",
  },
  anthemComing: {
    en: "Anthem coming", tn: "Pina e e tla", af: "Volkslied kom binnekort", zu: "Iculo liyeza", xh: "Ingoma iyeza",
    nso: "Koša e a tla", st: "Pina e tla", ss: "Ingoma iyeta", ts: "Risimu ra ta", nr: "Ingoma iyeza", ve: "Luimbo lu a ḓa",
  },
  moreSoon: {
    en: "Anthems are being added country by country.",
    tn: "Dipina di tsenngwa naga ka naga.",
    af: "Volksliedere word land vir land bygevoeg.",
    zu: "Amaculo esizwe engezwa izwe ngezwe.",
    xh: "Iingoma zesizwe zongezwa ilizwe ngelizwe.",
    nso: "Dikoša tša setšhaba di okeletšwa naga ka naga.",
    st: "Dipina tsa naha di ekeletswa naha ka naha.",
    ss: "Tingoma tesive tengetwa live ngelive.",
    ts: "Tinsimu ta rixaka ti engeteriwa tiko hi tiko.",
    nr: "Iingoma zesitjhaba zingezelelwa inarha nge narha.",
    ve: "Nyimbo dza lushaka dzi khou engedzwa shango nga shango.",
  },
  search: {
    en: "Search countries", tn: "Batla dinaga", af: "Soek lande", zu: "Sesha amazwe", xh: "Khangela amazwe",
    nso: "Nyaka dinaga", st: "Batla dinaha", ss: "Sesha emave", ts: "Lava matiko", nr: "Sesa amanarha", ve: "Ṱoḓani mashango",
  },
  none: {
    en: "No countries match", tn: "Ga go na naga e e tshwanang", af: "Geen lande pas nie", zu: "Awekho amazwe afanayo", xh: "Akukho mazwe ahambelanayo",
    nso: "Ga go na dinaga tše di swanago", st: "Ha ho dinaha tse tsamaellanang", ss: "Kute emave lafanako", ts: "A ku na matiko lama fambelanaka", nr: "Awekho amanarha afanako", ve: "A hu na mashango a fanaho",
  },
};

export function CountryPicker({
  country,
  onChange,
  lang,
}: {
  country: string;
  onChange: (code: string) => void;
  lang: LangCode;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const active = countryByCode(country);
  const q = query.trim().toLowerCase();
  const matched = q ? countries.filter((c) => c.name.toLowerCase().includes(q)) : countries;
  // Selected country pinned to the top; everything else keeps the existing (alphabetical) order.
  const activeInList = matched.find((c) => c.code === country);
  const shown = activeInList ? [activeInList, ...matched.filter((c) => c.code !== country)] : matched;

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      <Pressable
        style={styles.trigger}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`Country: ${active.name}. Tap to change and hear the anthem.`}
      >
        <View style={styles.triggerRow}>
          <Image source={active.flag} style={styles.triggerFlag} resizeMode="cover" />
          <Text style={styles.triggerText}>{active.name}</Text>
          <Icon.ChevronDown size={13} color="rgba(255,255,255,0.7)" />
        </View>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={close}>
        <View style={styles.backdrop}>
          {/* backdrop sits BEHIND the sheet as its own layer — tapping it closes, but taps on the
              sheet (incl. the search field) never reach it, so they don't dismiss the picker */}
          <Pressable style={StyleSheet.absoluteFill} onPress={close} accessibilityLabel="Close" />
          <View style={styles.sheet}>
            <Text style={styles.heading}>{t(UI.heading, lang)}</Text>

            <View style={styles.searchRow}>
              <Icon.Search size={15} color="rgba(255,255,255,0.5)" />
              <TextInput
                style={[styles.searchInput, { outlineStyle: "none" } as any]}
                value={query}
                onChangeText={setQuery}
                placeholder={t(UI.search, lang)}
                placeholderTextColor="rgba(255,255,255,0.4)"
                autoCorrect={false}
              />
            </View>

            <ScrollView style={{ maxHeight: 340 }} keyboardShouldPersistTaps="handled">
              {shown.map((c) => {
                const isActive = c.code === country;
                return (
                  <View key={c.code} style={[styles.row, isActive && styles.rowActive]}>
                    <Pressable
                      style={styles.rowMain}
                      onPress={() => { onChange(c.code); close(); }}
                      accessibilityRole="button"
                    >
                      <Image source={c.flag} style={styles.rowFlag} resizeMode="cover" />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.name}>{c.name}</Text>
                        <Text style={styles.sub}>
                          {c.anthem ? c.anthemBy ?? t(UI.anthem, lang) : t(UI.anthemComing, lang)}
                        </Text>
                      </View>
                    </Pressable>

                    {/* anthem play button, far right */}
                    {c.anthem ? (
                      <PlayOnceRow compact source={c.anthem} title={t(UI.anthem, lang)} by={c.anthemBy} lang={lang} />
                    ) : isActive ? (
                      <View style={styles.activeDot} />
                    ) : null}
                  </View>
                );
              })}
              {shown.length === 0 ? <Text style={styles.empty}>{t(UI.none, lang)}</Text> : null}
            </ScrollView>
            <Text style={styles.footnote}>{t(UI.moreSoon, lang)}</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
  },
  triggerRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  triggerFlag: { width: 22, height: 15, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.1)" },
  triggerText: { color: "#fff", fontFamily: fonts.bodySemi, fontSize: type.small },

  backdrop: { flex: 1, backgroundColor: colors.scrimStrong, justifyContent: "center", alignItems: "center", padding: spacing.lg },
  sheet: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#0D0D0D",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  heading: { color: colors.gold, fontFamily: fonts.bodySemi, fontSize: type.small, textTransform: "uppercase", letterSpacing: 1, marginBottom: spacing.sm },
  searchRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: radius.md, paddingHorizontal: spacing.sm, marginBottom: spacing.sm },
  searchInput: { flex: 1, color: "#fff", fontFamily: fonts.body, fontSize: 14, paddingVertical: 9 },
  empty: { color: colors.muted, fontFamily: fonts.body, fontSize: 13, fontStyle: "italic", textAlign: "center", paddingVertical: spacing.lg },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.sm, paddingVertical: 9, paddingHorizontal: spacing.sm, borderRadius: radius.md },
  rowMain: { flex: 1, flexDirection: "row", alignItems: "center", gap: spacing.sm },
  rowActive: { backgroundColor: "rgba(255,255,255,0.08)" },
  rowFlag: { width: 34, height: 23, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.1)" },
  name: { color: "#fff", fontFamily: fonts.bodySemi, fontSize: 15 },
  sub: { color: colors.muted, fontFamily: fonts.body, fontSize: 12, marginTop: 1 },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.ember },
  footnote: { color: colors.muted, fontFamily: fonts.body, fontSize: type.small, lineHeight: 18, marginTop: spacing.md, fontStyle: "italic" },
});
