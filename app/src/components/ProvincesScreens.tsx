import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Modal, StyleSheet, useWindowDimensions } from "react-native";
import { Image as ExpoImage } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Screen, ScreenHeader, Icon, backLabelFor } from "../ui";
import { provinces, Province, City, Stat, Leader } from "../content/provinces";
import { colors, spacing, radius, fonts, type } from "../theme/tokens";
import { t } from "../i18n";
import type { LangCode } from "../i18n";
import { PressScale } from "./Motion";
import { SideIndexScroll } from "./SideIndexScroll";
import { FeatureEntry } from "./FeatureEntry";
import { Journey } from "./Journey";
import { provincesJourney, CARD_ASPECT } from "../content/journey";

// Provinces → City history. Black & white + gold-for-emphasis, colour photography (never grayscaled).
// Content is grounded (src/content/provinces.ts); stats flagged "cited" (green) vs "to verify" (orange).
// Chrome (labels) is localized into all 11 languages; the histories themselves stay English for now.

// The heritage-series cover card — shown as the masthead hero and reused as the first slide of the
// Provinces journey.
const provCover = require("../../assets/journey/prov-cover.webp");


// One AI-illustrated heritage card per province (same cards the Journey plays), keyed by content id.
// Used as each province's picture in the overview list; detail pages keep their real photography.
const provinceCards: Record<string, number> = {
  "western-cape": require("../../assets/journey/prov-western-cape.webp"),
  gauteng: require("../../assets/journey/prov-gauteng.webp"),
  "northern-cape": require("../../assets/journey/prov-northern-cape.webp"),
  "eastern-cape": require("../../assets/journey/prov-eastern-cape.webp"),
  "kwazulu-natal": require("../../assets/journey/prov-kwazulu-natal.webp"),
  "free-state": require("../../assets/journey/prov-free-state.webp"),
  limpopo: require("../../assets/journey/prov-limpopo.webp"),
  mpumalanga: require("../../assets/journey/prov-mpumalanga.webp"),
  "north-west": require("../../assets/journey/prov-north-west.webp"),
};

const UI = {
  southAfrica: {
    en: "South Africa", tn: "Aforika Borwa", af: "Suid-Afrika", zu: "iNingizimu Afrika", xh: "uMzantsi Afrika",
    nso: "Afrika Borwa", st: "Afrika Borwa", ss: "iNingizimu Afrika", ts: "Afrika-Dzonga", nr: "iSewula Afrika", ve: "Afrika Tshipembe",
  },
  title: {
    en: "The Provinces", tn: "Diporofense", af: "Die Provinsies", zu: "Izifundazwe", xh: "Amaphondo",
    nso: "Diprofense", st: "Diprofinse", ss: "Tifundza", ts: "Swifundzha", nr: "Iimfunda", ve: "Mavundu",
  },
  intro: {
    en: "All nine provinces — each with its own founders, leaders and living history. Tap a province to explore its famous cities.",
    tn: "Diporofense tsotlhe tse robmongwe — nngwe le nngwe e na le bathei, baeteledipele le hisitori ya yona. Tobetsa porofense go sekaseka metse ya yona e e itsegeng.",
    af: "Al nege provinsies — elk met sy eie stigters, leiers en lewende geskiedenis. Tik 'n provinsie om sy bekende stede te verken.",
    zu: "Zonke izifundazwe eziyisishiyagalolunye — ngayinye inabasunguli bayo, abaholi nomlando ophilayo. Thepha isifundazwe ukuze uhlole amadolobha aso adumile.",
    xh: "Onke amaphondo alithoba — nganye inabasunguli bayo, iinkokeli nembali ephilayo. Cofa iphondo ukuze uphonononge izixeko zalo ezidumileyo.",
    nso: "Diprofense ka moka tše senyane — se sengwe le se sengwe se na le bathei ba sona, baetapele le histori e phelago. Kgotla profense go utolla metse ya yona e e tumilego.",
    st: "Diprofinse tsohle tse robong — e nngwe le e nngwe e na le bathehi ba yona, baetapele le histori e phelang. Tobetsa profinse ho hlahloba metse ya yona e tummeng.",
    ss: "Tonkhe tifundza letiyimfica — leyinye naleyinye inebasunguli bayo, baholi nemlandvo lophilako. Cindzetela sifundza kuhlola emadolobha aso ladvumile.",
    ts: "Swifundzha hinkwaswo swa kaye — xin'wana ni xin'wana xi ni vatumbuluxi va xona, varhangeri ni matimu lama hanyaka. Tinya xifundzha ku kambela madoroba ya xona lama dumeke.",
    nr: "Zoke iimfunda eziyithoba — ngayinye inabasunguli bayo, abarholi nomlando ophilako. Gandelela ifunda ukuhlola amadorobho wayo adumileko.",
    ve: "Mavundu oṱhe a ṱahe — ḽiṅwe na ḽiṅwe ḽi na vhavhumbi vhaḽo, vharangaphanḓa na ḓivhazwakale i tshilaho. Kwamani vundu u ṱolisisa miḓi yaḽo yo ḓivheaho.",
  },
  province: { en: "Province", tn: "Porofense", af: "Provinsie", zu: "Isifundazwe", xh: "Iphondo", nso: "Profense", st: "Profinse", ss: "Sifundza", ts: "Xifundzha", nr: "Ifunda", ve: "Vundu" },
  capital: { en: "Capital", tn: "Motsemogolo", af: "Hoofstad", zu: "Inhloko-dolobha", xh: "Ikomkhulu", nso: "Motsemošate", st: "Motsemoholo", ss: "Inhlokodolobha", ts: "Ntsindza", nr: "Ihlokodorobho", ve: "Ḓorobo khulu" },
  people2022: { en: "People · 2022", tn: "Batho · 2022", af: "Mense · 2022", zu: "Abantu · 2022", xh: "Abantu · 2022", nso: "Batho · 2022", st: "Batho · 2022", ss: "Bantfu · 2022", ts: "Vanhu · 2022", nr: "Abantu · 2022", ve: "Vhathu · 2022" },
  languages: { en: "Languages", tn: "Dipuo", af: "Tale", zu: "Izilimi", xh: "Iilwimi", nso: "Maleme", st: "Dipuo", ss: "Tilwimi", ts: "Tindzimi", nr: "Iinlimi", ve: "Nyambo" },
  aboutProvince: { en: "About the province", tn: "Ka ga porofense", af: "Oor die provinsie", zu: "Mayelana nesifundazwe", xh: "Malunga nephondo", nso: "Ka ga profense", st: "Mabapi le profinse", ss: "Mayelana nesifundza", ts: "Mayelana ni xifundzha", nr: "Malunga nefunda", ve: "Nga ha vundu" },
  famousCities: { en: "Famous cities", tn: "Metse e e itsegeng", af: "Bekende stede", zu: "Amadolobha adumile", xh: "Izixeko ezidumileyo", nso: "Metse ye e tumilego", st: "Metse e tummeng", ss: "Emadolobha ladvumile", ts: "Madoroba lama dumeke", nr: "Amadorobho adumileko", ve: "Miḓi yo ḓivheaho" },
  tapCity: {
    en: "Tap a city for its full history.", tn: "Tobetsa motse go bona hisitori ya wona e e feletseng.", af: "Tik 'n stad vir sy volledige geskiedenis.", zu: "Thepha idolobha ukuze uthole umlando walo ophelele.", xh: "Cofa isixeko ukuze ufumane imbali yaso epheleleyo.",
    nso: "Kgotla motse go hwetša histori ya wona ka botlalo.", st: "Tobetsa motse ho fumana histori ya oona e felletseng.", ss: "Cindzetela lidolobha kutfola umlandvo walo lophelele.", ts: "Tinya doroba ku kuma matimu ya rona hinkwawo.", nr: "Gandelela idorobho ukuthola umlando walo ophelele.", ve: "Kwamani ḓorobo u wana ḓivhazwakale yaḽo yoṱhe.",
  },
  founded: { en: "Founded", tn: "E thailwe", af: "Gestig", zu: "Yasungulwa", xh: "Yasekwa", nso: "E hlomilwe", st: "E thehiloe", ss: "Yasungulwa", ts: "Yi simekiwile", nr: "Yasungulwa", ve: "Yo thomiwa" },
  city: { en: "City", tn: "Motse", af: "Stad", zu: "Idolobha", xh: "Isixeko", nso: "Motse", st: "Toropo", ss: "Lidolobha", ts: "Doroba", nr: "Idorobho", ve: "Ḓorobo" },
  beforeCity: { en: "Before the city", tn: "Pele ga motse", af: "Voor die stad", zu: "Ngaphambi kwedolobha", xh: "Phambi kwesixeko", nso: "Pele ga motse", st: "Pele ho toropo", ss: "Ngaphambi kwelidolobha", ts: "Emahlweni ka doroba", nr: "Ngaphambi kwedorobho", ve: "Phanḓa ha ḓorobo" },
  howItCame: { en: "How it came to be", tn: "Ka moo o simologileng ka teng", af: "Hoe dit ontstaan het", zu: "Indlela elavela ngayo", xh: "Indlela esavela ngayo", nso: "Ka moo o thomilego ka gona", st: "Kamoo o thehiloeng ka teng", ss: "Indlela lasungulwa ngayo", ts: "Ndlela leyi ri vekaka ha yona", nr: "Indlela elavela ngayo", ve: "Nḓila ye ya thoma ngayo" },
  thoseWhoLed: { en: "Those who led", tn: "Ba ba eteletseng pele", af: "Dié wat gelei het", zu: "Labo abahola", xh: "Abo bakhokelayo", nso: "Bao ba etilego pele", st: "Ba neng ba etella pele", ss: "Labo labahola", ts: "Lava rhangeke", nr: "Labo abakhokhelako", ve: "Vhe vha ranga phanḓa" },
  fromWhen: {
    en: "From when to when — traditional and civic.", tn: "Go simolola leng go fihla leng — ka setso le ka setšhaba.", af: "Van wanneer tot wanneer — tradisioneel en burgerlik.", zu: "Kusukela nini kuya nini — ngokwesiko nangokomphakathi.", xh: "Ukususela nini ukuya nini — ngokwesithethe nangokoluntu.",
    nso: "Go tloga neng go fihla neng — ka setšo le ka setšhaba.", st: "Ho tloha neng ho isa neng — ka moetlo le ka setjhaba.", ss: "Kusukela nini kuya nini — ngekwesiko nangekwemmango.", ts: "Ku sukela rini ku ya rini — hi ndhavuko ni hi vaaki.", nr: "Kusukela nini kuya nini — ngokwesiko nangokomphakathi.", ve: "U bva lini u swika lini — nga sialala na nga tshitshavha.",
  },
  byTheNumbers: { en: "By the numbers", tn: "Ka dipalo", af: "In syfers", zu: "Ngezinombolo", xh: "Ngamanani", nso: "Ka dipalo", st: "Ka dinomoro", ss: "Ngetinombolo", ts: "Hi tinhlayo", nr: "Ngeenombolo", ve: "Nga nomboro" },
  landmarks: { en: "Landmarks & heritage", tn: "Mafelo a botlhokwa le boswa", af: "Landmerke & erfenis", zu: "Izindawo ezibalulekile namagugu", xh: "Iindawo ezibonakalayo nelifa", nso: "Mafelo a bohlokwa le bohwa", st: "Libaka tsa bohlokwa le lefa", ss: "Tindzawo letibalulekile nemagugu", ts: "Tindhawu ta xiyimo ni ndzhaka", nr: "Iindawo eziqakathekileko namagugu", ve: "Fhethu ha ndeme na ifa" },
  yourVersion: { en: "Your family's version", tn: "Kanegelo ya lelapa la gago", af: "Jou familie se weergawe", zu: "Umlando womndeni wakho", xh: "Ibali losapho lwakho", nso: "Kanegelo ya lapa la gago", st: "Pale ya lelapa la hao", ss: "Indzaba yemndeni wakho", ts: "Ntsheketo wa ndyangu wa wena", nr: "Umlando womndeni wakho", ve: "Tshiitwa tsha muṱa waṋu" },
  memoryHint: {
    en: "Record a family memory of this place", tn: "Gatisa kgakologelo ya lelapa ya lefelo le", af: "Neem 'n familie-herinnering van hierdie plek op", zu: "Qopha inkumbulo yomndeni yale ndawo", xh: "Rekhoda inkumbulo yosapho yale ndawo",
    nso: "Gatiša kgopolo ya lapa ya lefelo le", st: "Rekota mohopolo wa lelapa wa sebaka sena", ss: "Bhala inkhumbulo yemndeni yalendzawo", ts: "Rhekhoda xitsundzuxo xa ndyangu xa ndhawu leyi", nr: "Bhala inkumbulo yomndeni yale ndawo", ve: "Rekhoda tshihumbulo tsha muṱa tsha fhethu hafha",
  },
  howWeSource: { en: "How we source this", tn: "Ka moo re bonang se ka gone", af: "Hoe ons dit bekom", zu: "Indlela esithola ngayo lokhu", xh: "Indlela esifumana ngayo oku", nso: "Ka moo re hwetšago se ka gona", st: "Kamoo re fumanang sena ka teng", ss: "Indlela lesitfola ngayo loku", ts: "Ndlela leyi hi kumaka leswi ha yona", nr: "Indlela esikuthola ngayo lokhu", ve: "Nḓila ine ra wana ngayo hezwi" },
  cited: { en: "cited", tn: "go tsopotswe", af: "aangehaal", zu: "kucashuniwe", xh: "kucatshuliwe", nso: "go tsopotšwe", st: "e qotsitsoe", ss: "kucashuniwe", ts: "swi tshahiwile", nr: "kucatjhuliwe", ve: "zwo redzwa" },
  toVerify: { en: "to verify", tn: "go netefadiwa", af: "om te verifieer", zu: "okumele kuqinisekiswe", xh: "ekufuneka kuqinisekiswe", nso: "go netefatšwa", st: "ho netefatsoa", ss: "lokufanele kucinisekiswe", ts: "ku tiyisisiwa", nr: "okufanele kuqinisekiswe", ve: "u khwaṱhisedzwa" },
  contents: { en: "Provinces", tn: "Diporofense", af: "Provinsies", zu: "Izifundazwe", xh: "Amaphondo", nso: "Diprofense", st: "Diprofinse", ss: "Tifundza", ts: "Swifundzha", nr: "Iimfunda", ve: "Mavundu" },
  cityOne: { en: "city", tn: "motse", af: "stad", zu: "idolobha", xh: "isixeko", nso: "motse", st: "toropo", ss: "lidolobha", ts: "doroba", nr: "idorobho", ve: "ḓorobo" },
  cityMany: { en: "cities", tn: "metse", af: "stede", zu: "amadolobha", xh: "izixeko", nso: "metse", st: "metse", ss: "emadolobha", ts: "madoroba", nr: "amadorobho", ve: "miḓi" },
  explore: { en: "Explore the province", tn: "Sekaseka porofense", af: "Verken die provinsie", zu: "Hlola isifundazwe", xh: "Phonononga iphondo", nso: "Utolla profense", st: "Hlahloba profinse", ss: "Hlola sifundza", ts: "Kambela xifundzha", nr: "Hlola ifunda", ve: "Ṱolisisa vundu" },
  playJourney: { en: "Play the Journey", tn: "Bona Loeto", af: "Speel die Reis", zu: "Dlala Uhambo", xh: "Dlala Uhambo", nso: "Bapala Leeto", st: "Bapala Leeto", ss: "Dlala Luhambo", ts: "Tlanga Riendzo", nr: "Dlala Ikhambo", ve: "Tambani Lwendo" },
};

// ---------- 1 · Provinces grid ----------
export function ProvincesScreen({ onBack, onOpenProvince, lang }: { onBack: () => void; onOpenProvince: (id: string) => void; lang: LangCode }) {
  const { width } = useWindowDimensions();
  const wide = width >= 900;
  const [journeyOpen, setJourneyOpen] = useState(false);
  const masthead = (
    <View style={s.pad}>
      <ScreenHeader kicker={t(UI.southAfrica, lang)} title={t(UI.title, lang)} lang={lang} onBack={onBack} showBack={!wide} />
      <View style={s.coverWrap}>
        <ExpoImage source={provCover} style={s.cover} contentFit="cover" transition={200} cachePolicy="disk" accessibilityLabel={t(UI.title, lang)} />
      </View>
      <Text style={s.intro}>{t(UI.intro, lang)}</Text>
      <Pressable style={s.journeyBtn} onPress={() => setJourneyOpen(true)} accessibilityLabel={t(UI.playJourney, lang)}>
        <Icon.Play size={17} color="#000000" fill="#000000" />
        <Text style={s.journeyBtnText}>{t(UI.playJourney, lang)}</Text>
      </Pressable>
    </View>
  );
  const renderProvince = (_item: { key: string; label: string }, i: number) => {
    const p = provinces[i];
    const cityWord = p.cities.length === 1 ? t(UI.cityOne, lang) : t(UI.cityMany, lang);
    const card = provinceCards[p.id];
    return (
      <FeatureEntry
        index={i}
        kicker={`${p.capital} · ${p.cities.length} ${cityWord}`}
        title={p.name}
        lead={p.overview}
        leadLines={3}
        ctaLabel={t(UI.explore, lang)}
        onPress={() => onOpenProvince(p.id)}
        wide={wide}
        visualAspect={card ? CARD_ASPECT : undefined}
        visual={
          card ? (
            // Explicit 100% sizing (not absoluteFill) — react-native-web can render an
            // absolute-filled image at its native pixel size inside an aspect-ratio box,
            // which crops the card. The masthead covers use this same pattern and show in full.
            <ExpoImage source={card} style={s.cardImg} contentFit="cover" transition={200} cachePolicy="disk" accessibilityLabel={p.name} />
          ) : (
            <>
              <ExpoImage source={p.hero} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} cachePolicy="disk" />
              <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.35)"]} style={StyleSheet.absoluteFill} pointerEvents="none" />
            </>
          )
        }
      />
    );
  };
  return (
    <Screen tone="dark" scroll={false} padded={false} contentStyle={s.flexFill}>
      <SideIndexScroll
        contentsLabel={t(UI.contents, lang)}
        masthead={masthead}
        onBack={onBack}
        backLabel={backLabelFor(lang)}
        items={provinces.map((p) => ({ key: p.id, label: p.name }))}
        renderItem={renderProvince}
      />
      <Modal visible={journeyOpen} animationType="fade" onRequestClose={() => setJourneyOpen(false)}>
        <Journey slides={provincesJourney} lang={lang} onClose={() => setJourneyOpen(false)} />
      </Modal>
    </Screen>
  );
}

// ---------- 2 · Province detail ----------
export function ProvinceScreen({ province, onBack, onOpenCity, lang }: { province: Province; onBack: () => void; onOpenCity: (id: string) => void; lang: LangCode }) {
  return (
    <Screen tone="dark">
      <View style={s.provHero}>
        <ExpoImage source={province.hero} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} cachePolicy="disk" />
        <LinearGradient colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.95)"]} style={StyleSheet.absoluteFill} />
        <Pressable style={s.heroBack} onPress={onBack} hitSlop={12}><Icon.ChevronLeft size={22} color="#fff" strokeWidth={2.4} /></Pressable>
        <View style={s.provHeroText}>
          <Text style={s.kick}>{t(UI.province, lang)}</Text>
          <Text style={s.heroName}>{province.name}</Text>
        </View>
      </View>

      <View style={s.miniRow}>
        <Mini v={province.capital} l={t(UI.capital, lang)} />
        <Mini v={province.populationStat.value} l={t(UI.people2022, lang)} />
        <Mini v={province.languages.split(" · ")[0] + "…"} l={t(UI.languages, lang)} />
      </View>

      <SectionLabel label={t(UI.aboutProvince, lang)} />
      <Text style={s.para}>{province.overview}</Text>

      <SectionLabel label={t(UI.famousCities, lang)} sub={t(UI.tapCity, lang)} />
      <View style={{ gap: spacing.md }}>
        {province.cities.map((c) => (
          <PressScale key={c.id} style={s.cityRow} onPress={() => onOpenCity(c.id)} accessibilityLabel={`${c.name} — founded ${c.founded}`}>
            <ExpoImage source={c.hero} style={s.cityThumb} contentFit="cover" transition={200} cachePolicy="disk" />
            <View style={{ flex: 1 }}>
              <Text style={s.cityRowName}>{c.name}</Text>
              <Text style={s.cityRowMeta}>{t(UI.founded, lang)} {c.founded}</Text>
              {c.subtitle ? <Text style={s.cityRowSub} numberOfLines={2}>{c.subtitle}</Text> : null}
            </View>
            <Icon.ChevronRight size={20} color="rgba(255,255,255,0.5)" />
          </PressScale>
        ))}
      </View>
    </Screen>
  );
}

// ---------- 3 · City detail ----------
export function CityScreen({ city, onBack, onArchive, lang }: { city: City; onBack: () => void; onArchive?: () => void; lang: LangCode }) {
  return (
    <Screen tone="dark">
      <View style={s.cityHero}>
        <ExpoImage source={city.hero} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} cachePolicy="disk" />
        <LinearGradient colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.96)"]} style={StyleSheet.absoluteFill} />
        <Pressable style={s.heroBack} onPress={onBack} hitSlop={12}><Icon.ChevronLeft size={22} color="#fff" strokeWidth={2.4} /></Pressable>
        <View style={s.est}><Text style={s.estText}>Est. {city.founded}</Text></View>
        <View style={s.cityHeroText}>
          <Text style={s.kick}>{t(UI.city, lang)}</Text>
          <Text style={s.cityName}>{city.name}</Text>
          {city.subtitle ? <Text style={s.citySub}>{city.subtitle}</Text> : null}
        </View>
      </View>

      {city.beforeTheCity ? (
        <View style={s.band}>
          <Text style={s.bandLabel}>{t(UI.beforeCity, lang)}</Text>
          <Text style={s.bandText}>{city.beforeTheCity}</Text>
        </View>
      ) : null}

      <SectionLabel label={t(UI.howItCame, lang)} />
      <Text style={s.para}>{city.origins}</Text>

      <SectionLabel label={t(UI.thoseWhoLed, lang)} sub={t(UI.fromWhen, lang)} />
      <View style={{ marginTop: spacing.xs }}>
        {city.leaders.map((l, i) => (
          <Timeline key={i} item={l} last={i === city.leaders.length - 1} />
        ))}
      </View>

      <SectionLabel label={t(UI.byTheNumbers, lang)} />
      <View style={s.statGrid}>
        {city.stats.map((st, i) => (
          <StatTile key={i} stat={st} lang={lang} />
        ))}
      </View>

      <SectionLabel label={t(UI.landmarks, lang)} />
      <View style={s.chipRow}>
        {city.landmarks.map((lm) => (
          <View key={lm} style={s.chip}><Text style={s.chipText}>{lm}</Text></View>
        ))}
      </View>

      {onArchive ? (
        <PressScale style={s.cityArchive} onPress={onArchive}>
          <View style={s.caMicWrap}><Icon.Mic size={19} color={colors.gold} /></View>
          <View style={{ flex: 1 }}>
            <Text style={s.caH}>{t(UI.yourVersion, lang)}</Text>
            <Text style={s.caS}>{t(UI.memoryHint, lang)}</Text>
          </View>
          <Icon.ChevronRight size={20} color={colors.gold} />
        </PressScale>
      ) : null}

      <View style={s.srcNote}>
        <Text style={s.srcH}>{t(UI.howWeSource, lang)}</Text>
        <Text style={s.srcT}>{city.sources}</Text>
      </View>
    </Screen>
  );
}

// ---------- shared bits ----------
function Mini({ v, l }: { v: string; l: string }) {
  return (
    <View style={s.mini}>
      <Text style={s.miniV}>{v}</Text>
      <Text style={s.miniL}>{l}</Text>
    </View>
  );
}
function SectionLabel({ label, sub }: { label: string; sub?: string }) {
  return (
    <View style={s.sectionHead}>
      <View style={s.sectionRow}>
        <View style={s.tick} />
        <Text style={s.sectionLabel}>{label}</Text>
      </View>
      {sub ? <Text style={s.sectionSub}>{sub}</Text> : null}
    </View>
  );
}
function Timeline({ item, last }: { item: Leader; last: boolean }) {
  const dotColor = item.era === "now" ? "#3FBF6A" : item.era === "past" ? "rgba(255,255,255,0.4)" : colors.orange;
  return (
    <View style={s.tlItem}>
      <View style={s.tlRail}>
        <View style={[s.tlDot, { backgroundColor: dotColor }]} />
        {!last && <View style={s.tlLine} />}
      </View>
      <View style={{ flex: 1, paddingBottom: spacing.md }}>
        <Text style={[s.tlWhen, item.era === "past" && { color: "rgba(255,255,255,0.5)" }]}>{item.when}</Text>
        <Text style={s.tlName}>{item.name}</Text>
        <Text style={s.tlRole}>{item.role}</Text>
      </View>
    </View>
  );
}
function StatTile({ stat, lang }: { stat: Stat; lang: LangCode }) {
  return (
    <View style={s.statTile}>
      <Text style={s.statVal}>{stat.value}</Text>
      <Text style={s.statLabel}>{stat.label}</Text>
      <View style={[s.pill, stat.status === "cited" ? s.pillCited : s.pillVerify]}>
        <Text style={[s.pillText, { color: stat.status === "cited" ? "#3fbf6a" : colors.orange }]}>
          {stat.status === "cited" ? t(UI.cited, lang) : t(UI.toVerify, lang)}
        </Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  intro: { color: "rgba(255,255,255,0.62)", fontFamily: fonts.serifItalic, fontSize: 15, lineHeight: 22, marginBottom: spacing.lg },
  // Masthead hero — the Provinces cover card. Native aspect ratio (≈16:9) so the baked-in border
  // is never cropped; capped and centred so it stays a poster, not a billboard, on wide screens.
  coverWrap: { width: "100%", maxWidth: 720, aspectRatio: CARD_ASPECT, alignSelf: "center", borderRadius: radius.lg, overflow: "hidden", backgroundColor: "#0e0e0e", marginTop: spacing.md, marginBottom: spacing.lg },
  cover: { width: "100%", height: "100%" },
  cardImg: { width: "100%", height: "100%" },
  flexFill: { flex: 1 },
  pad: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  journeyBtn: { flexDirection: "row", alignItems: "center", gap: spacing.sm, alignSelf: "flex-start", backgroundColor: "#FFFFFF", borderRadius: radius.pill, paddingVertical: 12, paddingHorizontal: 20 },
  journeyBtnText: { color: "#000000", fontFamily: fonts.bodyBold, fontSize: 15, letterSpacing: 0.3 },

  provHero: { height: 172, borderRadius: radius.lg, overflow: "hidden", marginBottom: spacing.md, justifyContent: "flex-end", padding: spacing.md },
  provHeroText: {},
  cityHero: { height: 216, borderRadius: radius.lg, overflow: "hidden", marginBottom: spacing.md, justifyContent: "flex-end", padding: spacing.md },
  cityHeroText: {},
  heroBack: { position: "absolute", top: 12, left: 12, width: 36, height: 36, borderRadius: radius.pill, backgroundColor: "rgba(0,0,0,0.5)", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", zIndex: 3 },
  kick: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1.4, textTransform: "uppercase" },
  heroName: { color: "#fff", fontFamily: fonts.display, fontSize: 34, textTransform: "uppercase", marginTop: 4 },
  cityName: { color: "#fff", fontFamily: fonts.display, fontSize: 40, textTransform: "uppercase", marginTop: 4 },
  citySub: { color: "rgba(255,255,255,0.88)", fontFamily: fonts.serifItalic, fontSize: 14, marginTop: 4 },
  est: { position: "absolute", top: 14, right: 14, zIndex: 3, backgroundColor: "rgba(0,0,0,0.55)", borderWidth: 1, borderColor: "rgba(235,164,60,0.5)", paddingVertical: 5, paddingHorizontal: 10, borderRadius: radius.pill },
  estText: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 0.8, textTransform: "uppercase" },

  miniRow: { flexDirection: "row", gap: spacing.sm, marginBottom: spacing.sm },
  mini: { flex: 1, backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: radius.md, padding: spacing.sm, alignItems: "center" },
  miniV: { color: "#fff", fontFamily: fonts.serif, fontSize: 14, textAlign: "center" },
  miniL: { color: "rgba(255,255,255,0.55)", fontFamily: fonts.body, fontSize: 9, letterSpacing: 0.4, textTransform: "uppercase", marginTop: 4, textAlign: "center" },

  sectionHead: { marginTop: spacing.lg, marginBottom: spacing.sm },
  sectionRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  tick: { width: 15, height: 3, borderRadius: 2, backgroundColor: colors.orange },
  sectionLabel: { color: "#fff", fontFamily: fonts.displaySemi, fontSize: 15, letterSpacing: 1, textTransform: "uppercase" },
  sectionSub: { color: "rgba(255,255,255,0.55)", fontFamily: fonts.body, fontSize: type.small, lineHeight: 18, marginTop: 6 },
  para: { color: "rgba(255,255,255,0.72)", fontFamily: fonts.body, fontSize: type.body, lineHeight: 25 },

  cityRow: { flexDirection: "row", alignItems: "center", gap: spacing.md, backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: radius.md, padding: spacing.sm + 2 },
  cityThumb: { width: 60, height: 60, borderRadius: radius.sm, backgroundColor: "#111" },
  cityRowName: { color: "#fff", fontFamily: fonts.serif, fontSize: 16 },
  cityRowMeta: { color: colors.orange, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 0.6, textTransform: "uppercase", marginTop: 4 },
  cityRowSub: { color: "rgba(255,255,255,0.58)", fontFamily: fonts.body, fontSize: 12, marginTop: 4 },

  band: { marginTop: spacing.md, backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(235,164,60,0.3)", borderRadius: radius.md, padding: spacing.md },
  bandLabel: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1.2, textTransform: "uppercase" },
  bandText: { color: "rgba(255,255,255,0.85)", fontFamily: fonts.serif, fontSize: 14, lineHeight: 22, marginTop: 7 },

  tlItem: { flexDirection: "row", gap: spacing.md },
  tlRail: { alignItems: "center" },
  tlDot: { width: 12, height: 12, borderRadius: 6, marginTop: 3 },
  tlLine: { width: 2, flex: 1, backgroundColor: "rgba(255,255,255,0.15)", marginVertical: 2 },
  tlWhen: { color: colors.orange, fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 0.4 },
  tlName: { color: "#fff", fontFamily: fonts.serif, fontSize: 15, marginTop: 1 },
  tlRole: { color: "rgba(255,255,255,0.58)", fontFamily: fonts.body, fontSize: 12, lineHeight: 17, marginTop: 2 },

  statGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  statTile: { flexGrow: 1, flexBasis: 150, minWidth: 140, backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: radius.md, padding: spacing.md },
  statVal: { color: "#fff", fontFamily: fonts.display, fontSize: 24 },
  statLabel: { color: "rgba(255,255,255,0.55)", fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 0.4, textTransform: "uppercase", marginTop: 6 },
  pill: { alignSelf: "flex-start", borderWidth: 1, borderRadius: radius.pill, paddingVertical: 1, paddingHorizontal: 7, marginTop: 7 },
  pillCited: { borderColor: "rgba(63,191,106,0.4)" },
  pillVerify: { borderColor: "rgba(217,106,28,0.4)" },
  pillText: { fontFamily: fonts.bodyBold, fontSize: 8, letterSpacing: 0.4, textTransform: "uppercase" },

  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  chip: { backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: radius.pill, paddingVertical: 7, paddingHorizontal: 13 },
  chipText: { color: "#fff", fontFamily: fonts.bodyMedium, fontSize: 12 },

  cityArchive: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.lg, backgroundColor: "#0a0a0a", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: radius.md, padding: spacing.md },
  caMicWrap: { width: 42, height: 42, borderRadius: 12, backgroundColor: "rgba(217,106,28,0.18)", borderWidth: 1, borderColor: "rgba(235,164,60,0.4)", alignItems: "center", justifyContent: "center" },
  caH: { color: "#fff", fontFamily: fonts.bodyBold, fontSize: 14 },
  caS: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.body, fontSize: 12, marginTop: 2 },

  srcNote: { marginTop: spacing.lg, backgroundColor: "rgba(217,106,28,0.07)", borderLeftWidth: 3, borderLeftColor: colors.orange, borderRadius: 8, padding: spacing.md },
  srcH: { color: colors.orange, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1, textTransform: "uppercase" },
  srcT: { color: "rgba(255,255,255,0.62)", fontFamily: fonts.body, fontSize: 12, lineHeight: 18, marginTop: 6 },
});
