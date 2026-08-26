import React, { useMemo, useState } from "react";
import { View, Text, Pressable, Image, ScrollView, TextInput, StyleSheet, useWindowDimensions } from "react-native";
import { Lang } from "../content/types";
import { t } from "../i18n";
import { colors, spacing, radius, fonts } from "../theme/tokens";
import { Icon } from "../ui";
import { PlayOnceRow } from "./PlayOnceRow";
import { countries, countryByCode, DEFAULT_COUNTRY, type Country } from "../content/anthems";
import { historyTrail } from "../content/history-trail";
import { LANGUAGES } from "../i18n";

// The Countries room (v2 D3) — the browsable home for all 54 African nations and their national
// anthems, which used to live in a dropdown floating over the hero.
//
// GROUNDING NOTE (AGENTS.md §4). The source design shipped invented "atmosphere" copy for Ghana,
// Kenya, Nigeria, Ethiopia and Mali — evocative, but not traceable to anything in this repo. None of
// it is reproduced here. Only South Africa has researched content, so only South Africa gets a
// journey; every other nation gets its flag, its anthem when we have a recording, and an honest note
// that its journey has not been researched yet. Countries are added one at a time, with sources.

const UI = {
  title: {
    en: "Choose your country", tn: "Tlhopha naga ya gago", af: "Kies jou land", zu: "Khetha izwe lakho", xh: "Khetha ilizwe lakho",
    nso: "Kgetha naga ya gago", st: "Kgetha naha ya hao", ss: "Khetsa live lakho", ts: "Hlawula tiko ra wena", nr: "Khetha inarha yakho", ve: "Khethani shango ḽaṋu",
  },
  lede: {
    en: "Every nation gets its own journey. We begin in the south, and add each country as its story is researched with local historians.",
    tn: "Naga nngwe le nngwe e tla nna le leeto la yona. Re simolola ka borwa, mme re tsenya naga nngwe le nngwe fa hisitori ya yona e batlisisitswe le baitseanape ba selegae.",
    af: "Elke nasie kry sy eie reis. Ons begin in die suide en voeg elke land by soos sy storie saam met plaaslike historici nagevors word.",
    zu: "Isizwe ngasinye sithola uhambo lwaso. Siqala eningizimu, bese sengeza izwe ngalinye njengoba indaba yalo icwaningwa nezazi-mlando zendawo.",
    xh: "Isizwe ngasinye sifumana uhambo lwaso. Siqala emazantsi, sidibanise ilizwe ngalinye njengoko ibali lalo liphandwa neengcali zembali zasekhaya.",
    nso: "Naga ye nngwe le ye nngwe e hwetša leeto la yona. Re thoma ka borwa, gomme re tlaleletša naga ye nngwe le ye nngwe ge histori ya yona e nyakišišitšwe le ditsebi tša gae.",
    st: "Naha ka nngwe e fumana leeto la yona. Re qala ka boroa, mme re eketsa naha ka nngwe ha pale ya yona e batlisisitswe le ditsebi tsa histori tsa lehae.",
    ss: "Sive ngasinye sitfola luhambo lwaso. Sicala eningizimu, bese sengeta live ngalinye njengobe indzaba yalo icwaningwa netati temlandvo tendzawo.",
    ts: "Tiko rin'wana na rin'wana ri kuma riendzo ra rona. Hi sungula edzongeni, kutani hi engetela tiko rin'wana na rin'wana loko ntsheketo wa rona wu lavisisiwile ni vativi va matimu ya kwalaho.",
    nr: "Isitjhaba ngasinye sithola ikhambo laso. Sithoma esewula, besengezelele inarha nginye njengombana indaba yayo irhubhululwa neengcwepheshi zomlando zendawo.",
    ve: "Lushaka luṅwe na luṅwe lu wana lwendo lwaḽo. Ri thoma devhula, nahone ri engedza shango ḽiṅwe na ḽiṅwe musi mvelele yaḽo yo ṱoḓisiswa na vhaḓivhi vha ḓivhazwakale vha hafhala.",
  },
  search: {
    en: "Search countries", tn: "Batla dinaga", af: "Soek lande", zu: "Sesha amazwe", xh: "Khangela amazwe",
    nso: "Nyaka dinaga", st: "Batla dinaha", ss: "Sesha emave", ts: "Lavisisa matiko", nr: "Sesa amanarha", ve: "Ṱoḓani mashango",
  },
  live: {
    en: "Live", tn: "E teng", af: "Lewendig", zu: "Iyatholakala", xh: "Iyafumaneka",
    nso: "E gona", st: "E teng", ss: "Iyatfolakala", ts: "Ya kumeka", nr: "Iyatholakala", ve: "I hone",
  },
  soon: {
    en: "Not yet researched", tn: "Ga e ise e batlisisiwe", af: "Nog nie nagevors nie", zu: "Ayikacwaningwa", xh: "Ayikaphandwa",
    nso: "Ga se ya nyakišišwa", st: "Ha e so batlisiswe", ss: "Ayikacwaningwa", ts: "A yi si lavisisiwa", nr: "Ayikarhubhululwa", ve: "A yi athu ṱoḓisiswa",
  },
  anthem: {
    en: "National anthem", tn: "Pina ya bosetšhaba", af: "Volkslied", zu: "Iculo lesizwe", xh: "Ingoma yesizwe",
    nso: "Koša ya setšhaba", st: "Pina ya naha", ss: "Ingoma yesive", ts: "Risimu ra rixaka", nr: "Ingoma yesitjhaba", ve: "Luimbo lwa lushaka",
  },
  anthemComing: {
    en: "We do not have a recording of this anthem yet.",
    tn: "Ga re ise re nne le kgatiso ya pina e.",
    af: "Ons het nog nie 'n opname van hierdie volkslied nie.",
    zu: "Asikabi nalo ukuqoshwa kwaleli culo.",
    xh: "Asikabi nalo ushicilelo lwale ngoma.",
    nso: "Ga re na kgatišo ya koša ye go fihla bjale.",
    st: "Ha re na kgatiso ya pina ena hajoale.",
    ss: "Asikabi nako kucondvwa kwalengoma.",
    ts: "A hi si va na rhikhodo ya risimu leri.",
    nr: "Asikabi nakho ukurekhodwa kwengoma le.",
    ve: "A ri athu u vha na tsimbo ya luimbo ulu.",
  },
  notReady: {
    en: "This nation's journey has not been researched yet. We add each country only once its history is sourced with local historians — never invented.",
    tn: "Leeto la naga e ga le ise le batlisisiwe. Re tsenya naga nngwe le nngwe fela fa hisitori ya yona e na le metswedi e e tlhomameng le baitseanape ba selegae — ga re e itlhamele.",
    af: "Hierdie nasie se reis is nog nie nagevors nie. Ons voeg elke land eers by wanneer sy geskiedenis met plaaslike historici gestaaf is — nooit versin nie.",
    zu: "Uhambo lwalesi sizwe alukacwaningwa. Sengeza izwe ngalinye kuphela lapho umlando walo usuqinisekisiwe nezazi-mlando zendawo — asilokothi siqambe.",
    xh: "Uhambo lwesi sizwe alukaphandwa. Sidibanisa ilizwe ngalinye kuphela xa imbali yalo iqinisekisiwe neengcali zasekhaya — asize siqambe.",
    nso: "Leeto la setšhaba se ga se ya nyakišišwa. Re tlaleletša naga ye nngwe le ye nngwe fela ge histori ya yona e na le methopo le ditsebi tša gae — ga re e itlhame.",
    st: "Leeto la setjhaba sena ha le so batlisiswe. Re eketsa naha ka nngwe feela ha histori ya yona e netefaditswe le ditsebi tsa lehae — ha re qape.",
    ss: "Luhambo lwalesive alukacwaningwa. Sengeta live ngalinye kuphela nangabe umlandvo walo ucinisekisiwe netati tendzawo — asikaze sicalise.",
    ts: "Riendzo ra rixaka leri a ri si lavisisiwa. Hi engetela tiko rin'wana na rin'wana ntsena loko matimu ya rona ma tiyisisiwile ni vativi va kwalaho — a hi tumbuluxi.",
    nr: "Ikhambo lesitjhaba lesi alikarhubhululwa. Sengezelela inarha nginye kwaphela nange umlando wayo uqinisekisiwe neengcwepheshi zendawo — asikhenge sizibumbele.",
    ve: "Lwendo lwa lushaka ulu a lu athu ṱoḓisiswa. Ri engedza shango ḽiṅwe na ḽiṅwe fhedzi arali ḓivhazwakale yaḽo yo khwaṱhisedzwa na vhaḓivhi vha hafhala — a ri i vhumbi.",
  },
  enter: {
    en: "Enter South Africa", tn: "Tsena mo Aforika Borwa", af: "Betree Suid-Afrika", zu: "Ngena eNingizimu Afrika", xh: "Ngena eMzantsi Afrika",
    nso: "Tsena Afrika Borwa", st: "Kena Afrika Borwa", ss: "Ngena eNingizimu Afrika", ts: "Nghena eAfrika Dzonga", nr: "Ngena eSewula Afrika", ve: "Dzhenani Afrika Tshipembe",
  },
  whatsHere: {
    en: "What's here", tn: "Se se leng teng", af: "Wat hier is", zu: "Okukhona lapha", xh: "Okukhoyo apha",
    nso: "Seo se lego mo", st: "Se teng mona", ss: "Lokukhona lapha", ts: "Leswi nga kona", nr: "Okukhona lapha", ve: "Zwine zwa vha hone",
  },
  count: {
    en: "54 nations", tn: "Dinaga di le 54", af: "54 nasies", zu: "Izizwe ezingu-54", xh: "Izizwe ezingama-54",
    nso: "Dinaga tše 54", st: "Dinaha tse 54", ss: "Tive letingu-54", ts: "Matiko ya 54", nr: "Iintjhaba ezingu-54", ve: "Mashango a 54",
  },
};

/** Only South Africa has researched content in this repo today. */
const LIVE = new Set([DEFAULT_COUNTRY]);

export function CountriesScreen({
  lang,
  country,
  onChange,
  onEnter,
}: {
  lang: Lang;
  country: string;
  onChange: (code: string) => void;
  /** Enter the live country's journey. */
  onEnter: () => void;
}) {
  const { width } = useWindowDimensions();
  const wide = width >= 900;
  const [query, setQuery] = useState("");
  const sel = countryByCode(country);
  const live = LIVE.has(sel.code);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = q ? countries.filter((c) => c.name.toLowerCase().includes(q)) : countries;
    // Live nations first, then the rest in the existing alphabetical order.
    return [...matched.filter((c) => LIVE.has(c.code)), ...matched.filter((c) => !LIVE.has(c.code))];
  }, [query]);

  const list = (
    <View style={styles.rail}>
      <View style={styles.search}>
        <Icon.Search size={15} color="rgba(255,255,255,0.45)" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={t(UI.search, lang)}
          placeholderTextColor="rgba(255,255,255,0.38)"
          style={styles.searchInput}
          accessibilityLabel={t(UI.search, lang)}
        />
      </View>
      <ScrollView style={wide ? styles.railScroll : undefined} showsVerticalScrollIndicator={false}>
        {shown.map((c) => (
          <CountryRow
            key={c.code}
            c={c}
            on={c.code === sel.code}
            live={LIVE.has(c.code)}
            lang={lang}
            onPress={() => onChange(c.code)}
          />
        ))}
      </ScrollView>
    </View>
  );

  const detail = (
    <View style={styles.detail}>
      <Image source={sel.flag} style={styles.bigFlag} resizeMode="cover" accessibilityLabel={`${sel.name} flag`} />
      <Text style={styles.name}>{sel.name}</Text>

      <View style={[styles.badge, live ? styles.badgeLive : styles.badgeSoon]}>
        {live ? <View style={styles.liveDot} /> : <Icon.Clock size={11} color="rgba(255,255,255,0.6)" />}
        <Text style={[styles.badgeText, live && styles.badgeTextLive]}>
          {live ? t(UI.live, lang) : t(UI.soon, lang)}
        </Text>
      </View>

      {/* ── The anthem, re-homed from the old hero dropdown (D3) ── */}
      <View style={styles.block}>
        <Text style={styles.blockLabel}>{t(UI.anthem, lang)}</Text>
        {sel.anthem ? (
          <PlayOnceRow source={sel.anthem} title={t(UI.anthem, lang)} by={sel.anthemBy} lang={lang} />
        ) : (
          <Text style={styles.quiet}>{t(UI.anthemComing, lang)}</Text>
        )}
      </View>

      {/* ── The journey — real content only ── */}
      {live ? (
        <View style={styles.block}>
          <Text style={styles.blockLabel}>{t(UI.whatsHere, lang)}</Text>
          <View style={styles.facts}>
            <Fact icon={<Icon.MessageCircle size={14} color={colors.dsBlue} />} text={`${LANGUAGES.length} official languages`} />
            <Fact icon={<Icon.Route size={14} color={colors.dsBlue} />} text={`${historyTrail.length} milestones · 1652 → today`} />
            <Fact icon={<Icon.BookOpen size={14} color={colors.dsBlue} />} text="4 great books · the Cultural Atlas" />
            <Fact icon={<Icon.Flag size={14} color={colors.dsBlue} />} text="9 provinces · totems · national days" />
          </View>
          <Pressable onPress={onEnter} style={styles.cta} accessibilityRole="link">
            <Text style={styles.ctaText}>{t(UI.enter, lang)}</Text>
            <Icon.ArrowRight size={16} color={colors.night} />
          </Pressable>
        </View>
      ) : (
        <View style={styles.block}>
          <Text style={styles.quiet}>{t(UI.notReady, lang)}</Text>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.page}>
      <View style={styles.head}>
        <Text style={styles.kicker}>{t(UI.count, lang)}</Text>
        <Text style={styles.title}>{t(UI.title, lang)}</Text>
        <Text style={styles.lede}>{t(UI.lede, lang)}</Text>
      </View>
      <View style={wide ? styles.twoPane : styles.stack}>
        {wide ? (
          <>
            {list}
            {detail}
          </>
        ) : (
          <>
            {detail}
            {list}
          </>
        )}
      </View>
    </ScrollView>
  );
}

function Fact({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <View style={styles.fact}>
      {icon}
      <Text style={styles.factText}>{text}</Text>
    </View>
  );
}

function CountryRow({
  c,
  on,
  live,
  lang,
  onPress,
}: {
  c: Country;
  on: boolean;
  live: boolean;
  lang: Lang;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: on }}
      accessibilityLabel={c.name}
      style={({ hovered }: any) => [styles.row, hovered && styles.rowHover, on && styles.rowOn]}
    >
      <Image source={c.flag} style={[styles.flag, !live && !on && styles.flagDim]} resizeMode="cover" />
      <Text style={[styles.rowName, on && styles.rowNameOn]} numberOfLines={1}>
        {c.name}
      </Text>
      {live ? <View style={styles.liveDot} /> : null}
    </Pressable>
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
  title: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 42, lineHeight: 44, letterSpacing: -1 },
  lede: { color: "rgba(255,255,255,0.72)", fontFamily: fonts.body, fontSize: 16, lineHeight: 26, marginTop: spacing.md },

  twoPane: { flexDirection: "row", gap: spacing.xl, alignItems: "flex-start" },
  stack: { gap: spacing.xl },

  // ── Left rail ──
  rail: { width: 300, flexShrink: 0, gap: spacing.sm },
  railScroll: { maxHeight: 560 },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  searchInput: { flex: 1, color: "#FFFFFF", fontFamily: fonts.body, fontSize: 14, outlineStyle: "none" } as any,

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: "transparent",
  },
  rowHover: { backgroundColor: "rgba(255,255,255,0.05)" },
  rowOn: { backgroundColor: colors.card, borderColor: colors.dsBlue },
  flag: { width: 26, height: 18, borderRadius: 3, backgroundColor: "#222" },
  flagDim: { opacity: 0.55 },
  rowName: { flex: 1, color: "rgba(255,255,255,0.72)", fontFamily: fonts.bodyMedium, fontSize: 14.5 },
  rowNameOn: { color: "#FFFFFF", fontFamily: fonts.bodySemi },

  // ── Detail pane ──
  detail: { flex: 1, minWidth: 0, gap: spacing.md },
  bigFlag: { width: 96, height: 64, borderRadius: radius.sm, backgroundColor: "#222" },
  name: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 40, lineHeight: 42, letterSpacing: -1 },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  badgeLive: { borderColor: "rgba(63,191,106,0.5)", backgroundColor: "rgba(63,191,106,0.10)" },
  badgeSoon: { borderColor: colors.hairline },
  badgeText: {
    color: "rgba(255,255,255,0.6)",
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
  badgeTextLive: { color: colors.live },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.live },

  block: { gap: spacing.sm, marginTop: spacing.md, maxWidth: 620 },
  blockLabel: {
    color: "rgba(255,255,255,0.45)",
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  quiet: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.body, fontSize: 14.5, lineHeight: 24 },

  facts: { gap: spacing.sm },
  fact: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  factText: { color: "rgba(255,255,255,0.82)", fontFamily: fonts.body, fontSize: 14.5 },

  cta: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    alignSelf: "flex-start",
    backgroundColor: colors.dsBlue,
    borderRadius: radius.pill,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: spacing.sm,
  },
  ctaText: { color: colors.night, fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 0.4 },
});
