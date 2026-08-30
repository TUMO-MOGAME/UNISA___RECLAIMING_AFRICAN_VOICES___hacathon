import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Lang } from "../content/types";
import { t } from "../i18n";
import { colors, spacing, radius, fonts } from "../theme/tokens";
import { Icon } from "../ui";
import { formatBytes, type ConnectionInfo } from "../services/media/data-cost";

// PWA-06 — say the number, then ask.
//
// Everything else in Ubuntu Heritage is small: a story to read is about 0.3 MB, a scene image
// 136 KB. The films are 12–14 MB each and the 1816 milestone plays two, so one tap could pull 24 MB
// down a prepaid line. This is the sheet that stands between that tap and the download, and its job
// is to state the real cost — never to talk anyone out of watching. "Play it anyway" is the primary
// button for exactly that reason.
//
// It is a WARNING, not a toll gate: "Don't ask again on this device" is remembered, so a reader on
// uncapped fibre meets this once. The one thing it will not let anyone silence is an active data
// saver — see shouldAskBeforeDownload.

const UI = {
  title: {
    en: "Play on Wi-Fi?", tn: "Bapala ka Wi-Fi?", af: "Speel op Wi-Fi?", zu: "Dlala nge-Wi-Fi?", xh: "Dlala nge-Wi-Fi?",
    nso: "Bapala ka Wi-Fi?", st: "Bapala ka Wi-Fi?", ss: "Dlala nge-Wi-Fi?", ts: "Tlanga hi Wi-Fi?", nr: "Dlala nge-Wi-Fi?", ve: "Tambani nga Wi-Fi?",
  },
  body: {
    en: "This film is {size}. On mobile data that is real money — a story to read is about 0.3 MB.",
    tn: "Filimi e ke {size}. Mo dateng ya mogala ke madi a mmatota — kanegelo e e balwang ke mo e ka nnang 0.3 MB.",
    af: "Hierdie film is {size}. Op mobiele data is dit werklike geld — 'n storie om te lees is omtrent 0.3 MB.",
    zu: "Le filimu ingu-{size}. Kudatha yeselula lokho kuyimali yangempela — indaba oyifundayo ingaba ngu-0.3 MB.",
    xh: "Le filimu ngu-{size}. Kwidatha yeselfowuni yimali yokwenene — ibali olifundayo malunga ne-0.3 MB.",
    nso: "Filimi ye ke {size}. Go data ya mogala ke tšhelete ya kgonthe — kanegelo yeo o e balago ke ka bago 0.3 MB.",
    st: "Filimi ena ke {size}. Ho data ya mohala ke chelete ya nnete — pale eo o e balang ke hoo e ka bang 0.3 MB.",
    ss: "Lelifilimu ngu-{size}. Kudatha yelucingo ngumali yangempela — indzaba loyifundzako cishe ngu-0.3 MB.",
    ts: "Filimi leyi i {size}. Eka datha ya riqingho i mali ya xiviri — ntsheketo lowu u wu hlayaka i kwalomu ka 0.3 MB.",
    nr: "Ifilimu le ngu-{size}. Kudatha yomtjhini lokho kumali yamambala — indaba oyifundako ingaba ngu-0.3 MB.",
    ve: "Iyi filimu ndi {size}. Kha data ya luṱingo ndi tshelede ya vhukuma — tshiitwa tshine na tshi vhala ndi hu ṱoḓaho 0.3 MB.",
  },
  metered: {
    en: "This connection looks like mobile data.", tn: "Kgolagano e e lebega e le data ya mogala.", af: "Hierdie verbinding lyk soos mobiele data.",
    zu: "Loku kuxhumana kubukeka njengedatha yeselula.", xh: "Olu qhagamshelwano lukhangeleka njengedatha yeselfowuni.",
    nso: "Kgokagano ye e bonala e le data ya mogala.", st: "Kgokahano ena e shebahala e le data ya mohala.",
    ss: "Lokuchumana kubukeka njengedatha yelucingo.", ts: "Ku hlanganisa loku ku languteka ku fana ni datha ya riqingho.",
    nr: "Ukuhlanganiswa lokhu kubonakala njengedatha yomtjhini.", ve: "Vhukwamani uhu vhu vhonala vhu data ya luṱingo.",
  },
  saver: {
    en: "Your data saver is on, so we always ask.", tn: "Sebolokedi sa data sa gago se tshwerwe, ka jalo re botsa ka metlha.",
    af: "Jou databespaarder is aan, daarom vra ons altyd.", zu: "Isilondolozi sedatha yakho sivuliwe, ngakho sihlala sibuza.",
    xh: "Isigcini sedatha yakho sivuliwe, ngoko sihlala sibuza.", nso: "Seboloki sa data ya gago se bulegile, ka gona re botšiša ka mehla.",
    st: "Sebolokedi sa data ya hao se butswe, kahoo re dula re botsa.", ss: "Sigcini sakho sedatha sivuliwe, ngako sihlala sibuta.",
    ts: "Xihlayisi xa wena xa datha xi pfuliwile, hikwalaho hi tshama hi vutisa.", nr: "Isilondolozi sedatha yakho sivuliwe, ngalokho sihlala sibuza.",
    ve: "Tshivhulunganyi tshaṋu tsha data tsho vulwa, ngauralo ri dzula ri tshi vhudzisa.",
  },
  play: {
    en: "Play it anyway", tn: "E bapale le fa go ntse jalo", af: "Speel dit in elk geval", zu: "Ake ngiyidlale nokho", xh: "Yidlale nokuba kunjalo",
    nso: "E bapale le ge go le bjalo", st: "E bapale leha ho le jwalo", ss: "Ake ngiyidlale nome kunjalo", ts: "Ndzi yi tlanga hambiswiritano", nr: "Ake ngiyidlale nanyana kunjalo", ve: "Ndi i tambe naho zwo ralo",
  },
  notNow: {
    en: "Not now", tn: "E seng jaanong", af: "Nie nou nie", zu: "Hhayi manje", xh: "Hayi ngoku",
    nso: "E sego bjale", st: "Eseng hona jwale", ss: "Hhayi nyalo", ts: "Ku nga ri sweswi", nr: "Ingasi nje", ve: "Hu si zwino",
  },
  remember: {
    en: "Don't ask again on this device", tn: "O se ka wa botsa gape mo sedirisiweng se", af: "Moenie weer op hierdie toestel vra nie",
    zu: "Ungabuzi futhi kule divayisi", xh: "Ungabuzi kwakhona kwesi sixhobo", nso: "O se ke wa botšiša gape sedirišweng se",
    st: "O se ke wa botsa hape sesebedisweng sena", ss: "Ungabuti futsi kulendlela", ts: "U nga tlheli u vutisa eka xitirho lexi",
    nr: "Ungabuzi godu kudivayisi le", ve: "Ni songo dovha na vhudzisa kha tshishumiswa itshi",
  },
};

export function DataGate({
  lang,
  bytes,
  connection,
  onPlay,
  onCancel,
}: {
  lang: Lang;
  /** The WHOLE cost of the press — a playlist's films added together, not just the first. */
  bytes: number;
  connection: ConnectionInfo;
  /** `remember` is the reader's "don't ask again on this device". */
  onPlay: (remember: boolean) => void;
  onCancel: () => void;
}) {
  const [remember, setRemember] = useState(false);
  const size = formatBytes(bytes);
  // Only said when the browser actually told us something. We do not guess at someone's connection
  // and then narrate the guess back to them as fact.
  const note = connection.saveData
    ? t(UI.saver, lang)
    : connection.known && connection.metered
      ? t(UI.metered, lang)
      : null;

  return (
    <View style={styles.scrim}>
      <View style={styles.sheet} accessibilityViewIsModal accessibilityRole="alert">
        <View style={styles.head}>
          <Icon.Film size={18} color={colors.dsBlue} />
          <Text style={styles.title}>{t(UI.title, lang)}</Text>
        </View>

        <Text style={styles.size}>{size}</Text>
        <Text style={styles.body}>{t(UI.body, lang).replace("{size}", size)}</Text>
        {note ? <Text style={styles.note}>{note}</Text> : null}

        {/* An active data saver is not something a checkbox in this app may switch off. */}
        {!connection.saveData ? (
          <Pressable
            onPress={() => setRemember((r) => !r)}
            style={styles.check}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: remember }}
            accessibilityLabel={t(UI.remember, lang)}
          >
            <View style={[styles.box, remember && styles.boxOn]}>
              {remember ? <Icon.Check size={13} color={colors.night} /> : null}
            </View>
            <Text style={styles.checkText}>{t(UI.remember, lang)}</Text>
          </Pressable>
        ) : null}

        <View style={styles.row}>
          <Pressable
            onPress={() => onPlay(remember)}
            style={styles.primary}
            accessibilityRole="button"
            accessibilityLabel={`${t(UI.play, lang)} — ${size}`}
          >
            <Icon.Play size={16} color={colors.night} fill={colors.night} />
            <Text style={styles.primaryText}>{t(UI.play, lang)}</Text>
          </Pressable>
          <Pressable onPress={onCancel} style={styles.ghost} accessibilityRole="button" accessibilityLabel={t(UI.notNow, lang)}>
            <Text style={styles.ghostText}>{t(UI.notNow, lang)}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.82)",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
    zIndex: 120,
  },
  sheet: {
    width: "100%",
    maxWidth: 440,
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: "rgba(26,133,167,0.45)",
  },
  head: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  title: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 26, lineHeight: 30, letterSpacing: -0.6 },
  size: { color: colors.dsBlue, fontFamily: fonts.bodyBold, fontSize: 32, lineHeight: 36, letterSpacing: -0.5 },
  body: { color: "rgba(255,255,255,0.82)", fontFamily: fonts.body, fontSize: 15, lineHeight: 23 },
  note: { color: "rgba(255,255,255,0.55)", fontFamily: fonts.serifItalic, fontSize: 13, lineHeight: 20 },

  check: { flexDirection: "row", alignItems: "center", gap: spacing.sm, paddingVertical: spacing.sm, minHeight: 44 },
  box: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  boxOn: { backgroundColor: colors.dsBlue, borderColor: colors.dsBlue },
  checkText: { flex: 1, color: "rgba(255,255,255,0.72)", fontFamily: fonts.body, fontSize: 14 },

  row: { flexDirection: "row", alignItems: "center", gap: spacing.sm, flexWrap: "wrap", marginTop: spacing.xs },
  primary: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.dsBlue,
    borderRadius: radius.pill,
    paddingVertical: 12,
    paddingHorizontal: 22,
    minHeight: 44,
  },
  primaryText: { color: colors.night, fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 0.3 },
  ghost: {
    justifyContent: "center",
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    paddingVertical: 12,
    paddingHorizontal: 22,
    minHeight: 44,
  },
  ghostText: { color: "rgba(255,255,255,0.8)", fontFamily: fonts.bodySemi, fontSize: 14 },
});
