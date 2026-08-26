import React, { useState } from "react";
import { View, Text, Pressable, Image, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { Lang } from "../content/types";
import { t } from "../i18n";
import { colors, spacing, radius, fonts } from "../theme/tokens";
import { Icon } from "../ui";
import { totems } from "../content/totems";
import { historyTrail } from "../content/history-trail";
import { countryByCode, countries } from "../content/anthems";
import { level, journeyFraction, type Progress } from "../services/progress/progress";

// The Passport (v2 V2-22, wireframe 2h) — everything you have collected, in one room.
//
// PRIVACY (D5). There is no name here, no photo, no account, and nothing to sign in to. A passport
// is normally the most identifying document a person carries; this one deliberately holds none of
// that — only what you have read and earned. All of it lives on this device, and "Forget everything"
// erases it for real. That is why the screen can be shown to a child without a consent flow.

const UI = {
  kicker: {
    en: "Your passport", tn: "Pasepoto ya gago", af: "Jou paspoort", zu: "Iphasipoti yakho", xh: "Iphasipoti yakho",
    nso: "Pasepoto ya gago", st: "Pasepoto ya hao", ss: "Iphasiphothi yakho", ts: "Phasiphoto ya wena", nr: "Iphasiphoti yakho", ve: "Phasiphoto yaṋu",
  },
  lede: {
    en: "Everything you have collected. It lives on this device only — no account, no name, nothing that identifies you.",
    tn: "Sengwe le sengwe se o se kokoantseng. Se nna mo sedirisiweng se fela — ga go na akhaonto, leina, kgotsa sepe se se go supang.",
    af: "Alles wat jy versamel het. Dit bly net op hierdie toestel — geen rekening, geen naam, niks wat jou identifiseer nie.",
    zu: "Konke okuqoqile. Kuhlala kule divayisi kuphela — awukho umo-akhawunti, igama, noma okukuchazayo.",
    xh: "Yonke into oyiqokelelileyo. Ihlala kwesi sixhobo kuphela — akukho akhawunti, igama, okanye nantoni na ekuchazayo.",
    nso: "Se sengwe le se sengwe seo o se kgobokeditšego. Se dula sedirišwa se fela — ga go na akhaonto, leina, goba selo seo se go šupago.",
    st: "Tsohle tseo o li bokelletseng. Li lula sesebedisweng sena feela — ha ho akhaonto, lebitso, kapa letho le o supang.",
    ss: "Konkhe lokucocelele. Kuhlala kulendlela kuphela — akukho akhawundi, ligama, nanoma yini lekuchaza.",
    ts: "Hinkwaswo leswi u swi hlengeleteke. Swi tshama eka xitirho lexi ntsena — a ku na akhawunti, vito, kumbe nchumu lowu ku kombaka.",
    nr: "Koke okuqoqileko. Kuhlala kudivayisi le kwaphela — akunama-akhawundi, ibizo, namkha okhunye okukutjengisako.",
    ve: "Zwoṱhe zwe na zwi kuvhanganya. Zwi dzula kha tshishumiswa itshi fhedzi — a hu na akhaunthu, dzina, kana tshiṅwe tshine tsha ni sumbedza.",
  },
  levelLbl: { en: "Level", tn: "Legato", af: "Vlak", zu: "Izinga", xh: "Inqanaba", nso: "Legato", st: "Boemo", ss: "Lizinga", ts: "Xiyimo", nr: "Izinga", ve: "Vhuimo" },
  stars: { en: "stars", tn: "dinaledi", af: "sterre", zu: "izinkanyezi", xh: "iinkwenkwezi", nso: "dinaledi", st: "dinaledi", ss: "tinkhanyeti", ts: "tinyeleti", nr: "iinkwekwezi", ve: "ṋaledzi" },
  streak: { en: "day streak", tn: "malatsi a a latelanang", af: "dae agtereen", zu: "izinsuku zilandelana", xh: "iintsuku zilandelelana", nso: "matšatši a latelanago", st: "matsatsi a latelanang", ss: "emalanga alandzelanako", ts: "masiku yo landzelelana", nr: "amalanga alandelanako", ve: "maḓuvha a tevhekanaho" },
  journey: {
    en: "The journey", tn: "Leeto", af: "Die reis", zu: "Uhambo", xh: "Uhambo",
    nso: "Leeto", st: "Leeto", ss: "Luhambo", ts: "Riendzo", nr: "Ikhambo", ve: "Lwendo",
  },
  cardsTitle: {
    en: "Heritage cards", tn: "Dikarata tsa boswa", af: "Erfeniskaarte", zu: "Amakhadi amagugu", xh: "Amakhadi elifa",
    nso: "Dikarata tša bohwa", st: "Dikarete tsa lefa", ss: "Emakhadi elifa", ts: "Makhadi ya ndzhaka", nr: "Iinkharada zelifa", ve: "Khadi dza ifa",
  },
  cardsLede: {
    en: "Real clan totems, earned one per stage of the journey.",
    tn: "Diboko tsa mmatota, o bona bongwe mo seelong sengwe le sengwe sa leeto.",
    af: "Werklike klantotems, een per fase van die reis verdien.",
    zu: "Izithakazelo zangempela, uthola elilodwa esigabeni ngasinye sohambo.",
    xh: "Iziduko zokwenene, ufumana esinye kwinqanaba ngalinye lohambo.",
    nso: "Diboko tša kgonthe, o hwetša se tee legatong le lengwe le le lengwe la leeto.",
    st: "Diboko tsa nnete, o fumana e le nngwe mothating ka mong wa leeto.",
    ss: "Titfakatelo tangempela, utfola linye esigabeni ngasinye seluhambo.",
    ts: "Swivongo swa xiviri, u kuma xin'we eka goza rin'wana na rin'wana ra riendzo.",
    nr: "Iimbongo zamambala, uthola nginye egadangweni ngalinye lekhambo.",
    ve: "Mitupo ya vhukuma, ni wana muṅwe kha tshiimo tshiṅwe na tshiṅwe tsha lwendo.",
  },
  stampsTitle: {
    en: "Country stamps", tn: "Ditshupo tsa dinaga", af: "Landstempels", zu: "Izitembu zamazwe", xh: "Izitampu zamazwe",
    nso: "Ditshwayo tša dinaga", st: "Ditempe tsa dinaha", ss: "Titembu temave", ts: "Tistampu ta matiko", nr: "Iintempu zamanarha", ve: "Zwiṱampu zwa mashango",
  },
  noStamps: {
    en: "Finish a country's journey to earn its stamp.",
    tn: "Fetsa leeto la naga go bona letshwao la yona.",
    af: "Voltooi 'n land se reis om sy stempel te verdien.",
    zu: "Qeda uhambo lwezwe ukuze uthole isitembu salo.",
    xh: "Gqiba uhambo lwelizwe ukuze ufumane isitampu salo.",
    nso: "Feditše leeto la naga go hwetša leswao la yona.",
    st: "Qeta leeto la naha ho fumana tempe ya yona.",
    ss: "Cedza luhambo lwelive kute utfole sitembu salo.",
    ts: "Hetisa riendzo ra tiko leswaku u kuma xitampu xa rona.",
    nr: "Qeda ikhambo lenarha bona uthole itempu yayo.",
    ve: "Fhedzani lwendo lwa shango uri ni wane tshiṱampu tshaḽo.",
  },
  locked: { en: "Not yet earned", tn: "Ga e ise e bonwe", af: "Nog nie verdien nie", zu: "Ayikatholakali", xh: "Ayikafunyanwa", nso: "Ga se ya hwetšwa", st: "Ha e so fumanwe", ss: "Ayikatfolakali", ts: "A yi si kumeka", nr: "Ayikatholakali", ve: "A i athu wanala" },
  storage: {
    en: "Stored on this device", tn: "E bolokilwe mo sedirisiweng se", af: "Op hierdie toestel gestoor", zu: "Kugcinwe kule divayisi", xh: "Igcinwe kwesi sixhobo",
    nso: "E bolokilwe sedirišweng se", st: "E bolokilwe sesebedisweng sena", ss: "Kugcinwe kulendlela", ts: "Swi hlayisiwile eka xitirho lexi", nr: "Kubulungwe kudivayisi le", ve: "Zwo vhulungwa kha tshishumiswa itshi",
  },
  sessionOnly: {
    en: "This build keeps progress for this session only — it will not survive a restart yet.",
    tn: "Kago e e tlhabolotswe e boloka kgatelopele ya tirisano e fela — ga e kitla e tshela fa o simolola sešwa.",
    af: "Hierdie weergawe hou vordering net vir hierdie sessie — dit sal nog nie 'n herbegin oorleef nie.",
    zu: "Lolu hlobo lugcina inqubekela phambili yalesi sikhathi kuphela — ngeke lusinde ekuqaleni kabusha okwamanje.",
    xh: "Olu hlobo lugcina inkqubela yeli xesha kuphela — alusayi kusinda ekuqalisweni ngokutsha okwangoku.",
    nso: "Kago ye e boloka tšwelopele ya lenaneo le fela — e ka se phologe go thoma lefsa go fihla bjale.",
    st: "Kaho ena e boloka tswelopele ya nako ena feela — e ke ke ya pholoha ho qala hape hajoale.",
    ss: "Lolu luhlobo lugcina inchubekela phambili yalesi sikhatsi kuphela — angeke lusinde ekucaleni kabusha.",
    ts: "Vuako lebyi byi hlayisa nhluvuko ya nkarhi lowu ntsena — a byi nge poni ku sungula nakambe.",
    nr: "Ubwakhiwo lobu bugcina ikulukuthela phambili yalesi sikhathi kwaphela — angekhe kusinde ekuthomeni godu.",
    ve: "Fhethu heḽi ḽi vhulunga mvelaphanḓa ya tshifhinga itshi fhedzi — a ḽi nga tshili u thoma hafhu.",
  },
  forget: {
    en: "Forget everything", tn: "Lebala tsotlhe", af: "Vergeet alles", zu: "Khohlwa konke", xh: "Libala yonke into",
    nso: "Lebala tšohle", st: "Lebala tsohle", ss: "Khohlwa konkhe", ts: "Rivala hinkwaswo", nr: "Khohlwa koke", ve: "Hangwani zwoṱhe",
  },
  forgetSure: {
    en: "Erase all of it? This cannot be undone.",
    tn: "Phimola tsotlhe? Se ga se kake sa busediwa.",
    af: "Vee alles uit? Dit kan nie ongedaan gemaak word nie.",
    zu: "Sula konke? Lokhu ngeke kuhlehliswe.",
    xh: "Cima yonke into? Oku akunakubuyiselwa.",
    nso: "Phumola tšohle? Se se ka se bušwe morago.",
    st: "Hlakola tsohle? Sena se ke ke sa khutlisetswa morao.",
    ss: "Sula konkhe? Loku ngeke kubuyiselwe emuva.",
    ts: "Sula hinkwaswo? Leswi a swi nge tlheriselwi endzhaku.",
    nr: "Sula koke? Lokhu angekhe kubuyiselwe emuva.",
    ve: "Thutshelani zwoṱhe? Hezwi a zwi nga vhuyedzedzwi.",
  },
  cancel: { en: "Cancel", tn: "Khansela", af: "Kanselleer", zu: "Khansela", xh: "Rhoxisa", nso: "Khansela", st: "Hlakola", ss: "Khansela", ts: "Khansela", nr: "Khansela", ve: "Khanselani" },
  confirm: { en: "Yes, erase", tn: "Ee, phimola", af: "Ja, vee uit", zu: "Yebo, sula", xh: "Ewe, cima", nso: "Ee, phumola", st: "E, hlakola", ss: "Yebo, sula", ts: "Ina, sula", nr: "Iye, sula", ve: "Ee, thutshelani" },
};

export function PassportScreen({
  lang,
  country,
  progress,
  persists,
  onReset,
  onJourney,
}: {
  lang: Lang;
  country: string;
  progress: Progress;
  /** Whether this platform keeps progress across a restart (web: yes; native: not yet). */
  persists: boolean;
  onReset: () => void;
  onJourney: () => void;
}) {
  const { width } = useWindowDimensions();
  const cols = width >= 1080 ? 6 : width >= 760 ? 4 : 3;
  const [confirming, setConfirming] = useState(false);

  const nation = countryByCode(country);
  const pct = Math.round(journeyFraction(progress, country, historyTrail.length) * 100);
  const held = new Set(progress.cards);

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.page}>
      <View style={styles.head}>
        <Text style={styles.kicker}>{t(UI.kicker, lang)}</Text>
        <View style={styles.levelRow}>
          <Text style={styles.level}>
            {t(UI.levelLbl, lang)} {level(progress)}
          </Text>
          <Stat icon={<Icon.Sparkles size={14} color={colors.dsBlue} />} value={progress.stars} label={t(UI.stars, lang)} />
          <Stat icon={<Icon.Clock size={14} color={colors.dsBlue} />} value={progress.streak.count} label={t(UI.streak, lang)} />
        </View>
        <Text style={styles.lede}>{t(UI.lede, lang)}</Text>
      </View>

      {/* ── Journey progress ── */}
      <Pressable onPress={onJourney} style={styles.journeyPanel} accessibilityRole="link">
        <View style={styles.journeyTop}>
          <Image source={nation.flag} style={styles.flag} resizeMode="cover" />
          <View style={styles.journeyText}>
            <Text style={styles.journeyLabel}>{t(UI.journey, lang)}</Text>
            <Text style={styles.journeyName}>{nation.name}</Text>
          </View>
          <Text style={styles.journeyPct}>{pct}%</Text>
        </View>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${Math.max(pct, 1)}%` }]} />
        </View>
        <Text style={styles.journeyMeta}>
          {progress.stagesDone.filter((s) => s.startsWith(`${country}:`)).length} / {historyTrail.length}
        </Text>
      </Pressable>

      {/* ── Heritage cards ── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t(UI.cardsTitle, lang)}</Text>
        <Text style={styles.sectionLede}>{t(UI.cardsLede, lang)}</Text>
        <Text style={styles.sectionCount}>
          {progress.cards.length} / {totems.length}
        </Text>
        <View style={styles.grid}>
          {totems.map((tm) => {
            const has = held.has(tm.id);
            return (
              <View key={tm.id} style={[styles.cardCell, { width: `${100 / cols}%` } as any]}>
                <View style={[styles.cardArtWrap, !has && styles.cardArtLocked]}>
                  <Image
                    source={tm.image as any}
                    style={styles.cardArt}
                    resizeMode="cover"
                    accessibilityLabel={has ? tm.animal : t(UI.locked, lang)}
                  />
                  {!has ? (
                    <View style={styles.lockVeil}>
                      <Icon.Lock size={15} color="rgba(255,255,255,0.55)" />
                    </View>
                  ) : null}
                </View>
                <Text style={[styles.cardName, !has && styles.dim]} numberOfLines={1}>
                  {has ? tm.animal : "—"}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* ── Country stamps ── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t(UI.stampsTitle, lang)}</Text>
        {progress.stamps.length === 0 ? (
          <Text style={styles.sectionLede}>{t(UI.noStamps, lang)}</Text>
        ) : (
          <View style={styles.stampRow}>
            {progress.stamps.map((code) => {
              const c = countries.find((x) => x.code === code);
              if (!c) return null;
              return (
                <View key={code} style={styles.stamp}>
                  <Image source={c.flag} style={styles.stampFlag} resizeMode="cover" />
                  <Text style={styles.stampName}>{c.name}</Text>
                </View>
              );
            })}
          </View>
        )}
      </View>

      {/* ── Storage + erasure ── */}
      <View style={styles.privacy}>
        <View style={styles.privacyRow}>
          <Icon.Lock size={13} color="rgba(255,255,255,0.5)" />
          <Text style={styles.privacyText}>{t(UI.storage, lang)}</Text>
        </View>
        {!persists ? <Text style={styles.privacyWarn}>{t(UI.sessionOnly, lang)}</Text> : null}

        {!confirming ? (
          <Pressable onPress={() => setConfirming(true)} style={styles.forget} accessibilityRole="button">
            <Icon.Trash2 size={14} color="rgba(255,255,255,0.75)" />
            <Text style={styles.forgetText}>{t(UI.forget, lang)}</Text>
          </Pressable>
        ) : (
          <View style={styles.confirmBox}>
            <Text style={styles.confirmText}>{t(UI.forgetSure, lang)}</Text>
            <View style={styles.confirmRow}>
              <Pressable onPress={() => setConfirming(false)} style={styles.cancel} accessibilityRole="button">
                <Text style={styles.cancelText}>{t(UI.cancel, lang)}</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  onReset();
                  setConfirming(false);
                }}
                style={styles.destructive}
                accessibilityRole="button"
              >
                <Text style={styles.destructiveText}>{t(UI.confirm, lang)}</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <View style={styles.stat}>
      {icon}
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.xxl },

  head: { marginBottom: spacing.xl, maxWidth: 720 },
  kicker: {
    color: colors.dsBlue,
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: "uppercase",
    marginBottom: spacing.sm,
  },
  levelRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: spacing.lg },
  level: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 38, lineHeight: 40, letterSpacing: -1 },
  stat: { flexDirection: "row", alignItems: "center", gap: 6 },
  statValue: { color: "#FFFFFF", fontFamily: fonts.bodyBold, fontSize: 15 },
  statLabel: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.body, fontSize: 13 },
  lede: { color: "rgba(255,255,255,0.72)", fontFamily: fonts.body, fontSize: 15, lineHeight: 24, marginTop: spacing.md },

  journeyPanel: {
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.card,
    gap: spacing.sm,
  },
  journeyTop: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  flag: { width: 34, height: 23, borderRadius: 3, backgroundColor: "#222" },
  journeyText: { flex: 1, gap: 2 },
  journeyLabel: {
    color: "rgba(255,255,255,0.45)",
    fontFamily: fonts.bodySemi,
    fontSize: 10.5,
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },
  journeyName: { color: "#FFFFFF", fontFamily: fonts.heading, fontSize: 18 },
  journeyPct: { color: colors.dsBlue, fontFamily: fonts.bodyBold, fontSize: 16 },
  track: { height: 4, backgroundColor: "rgba(255,255,255,0.14)", borderRadius: 2, overflow: "hidden" },
  fill: { height: 4, backgroundColor: colors.dsBlue },
  journeyMeta: { color: "rgba(255,255,255,0.45)", fontFamily: fonts.bodySemi, fontSize: 12 },

  section: { marginTop: spacing.xl, gap: 6 },
  sectionTitle: { color: "#FFFFFF", fontFamily: fonts.heading, fontSize: 20 },
  sectionLede: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.body, fontSize: 14, lineHeight: 21 },
  sectionCount: { color: colors.dsBlue, fontFamily: fonts.bodySemi, fontSize: 13, marginTop: 2 },

  grid: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -spacing.xs, marginTop: spacing.sm },
  cardCell: { paddingHorizontal: spacing.xs, marginBottom: spacing.md, gap: 5 },
  cardArtWrap: {
    width: "100%",
    aspectRatio: 0.78,
    borderRadius: radius.sm,
    overflow: "hidden",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: "rgba(26,133,167,0.45)",
  },
  cardArtLocked: { borderColor: colors.hairline },
  cardArt: { width: "100%", height: "100%" },
  lockVeil: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.78)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardName: { color: "#FFFFFF", fontFamily: fonts.bodySemi, fontSize: 12, textAlign: "center" },
  dim: { color: "rgba(255,255,255,0.35)" },

  stampRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginTop: spacing.sm },
  stamp: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: "rgba(26,133,167,0.45)",
    borderRadius: radius.pill,
    paddingVertical: 7,
    paddingHorizontal: 14,
  },
  stampFlag: { width: 22, height: 15, borderRadius: 2 },
  stampName: { color: "#FFFFFF", fontFamily: fonts.bodySemi, fontSize: 13 },

  privacy: {
    marginTop: spacing.xxl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    gap: spacing.sm,
  },
  privacyRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  privacyText: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.body, fontSize: 13 },
  privacyWarn: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.body, fontSize: 13, lineHeight: 20, maxWidth: 560 },

  forget: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.pill,
    paddingVertical: 9,
    paddingHorizontal: 18,
    marginTop: spacing.sm,
  },
  forgetText: { color: "rgba(255,255,255,0.75)", fontFamily: fonts.bodySemi, fontSize: 13 },

  confirmBox: {
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
    marginTop: spacing.sm,
    maxWidth: 460,
  },
  confirmText: { color: "#FFFFFF", fontFamily: fonts.body, fontSize: 14.5, lineHeight: 22 },
  confirmRow: { flexDirection: "row", gap: spacing.sm },
  cancel: {
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.pill,
    paddingVertical: 9,
    paddingHorizontal: 18,
  },
  cancelText: { color: "rgba(255,255,255,0.75)", fontFamily: fonts.bodySemi, fontSize: 13 },
  destructive: {
    backgroundColor: "#FFFFFF",
    borderRadius: radius.pill,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  destructiveText: { color: colors.night, fontFamily: fonts.bodyBold, fontSize: 13 },
});
