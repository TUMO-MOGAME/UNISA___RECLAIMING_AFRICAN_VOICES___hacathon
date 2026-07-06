import React, { useRef, useState } from "react";
import { View, Text, Pressable, Animated, Image, Modal, StyleSheet, useWindowDimensions, Linking } from "react-native";
import { Module, Lang } from "../content/types";
import { modules, atlasModules } from "../content";
import { sceneImageSource } from "../content/images";
import { t } from "../i18n";
import { LinearGradient } from "expo-linear-gradient";
import { SceneImage } from "./SceneImage";
import { LanguagePicker } from "./LanguagePicker";
import { CountryPicker } from "./CountryPicker";
import { DEFAULT_COUNTRY } from "../content/anthems";
import { HistoryTrail } from "./HistoryTrail";
import { historyTrailSource, type HistoryMilestone } from "../content/history-trail";
import { PressScale, Reveal } from "./Motion";
import { colors, spacing, radius, fonts } from "../theme/tokens";
import { Icon } from "../ui";
import { Journey } from "./Journey";
import { literatureJourney } from "../content/journey";

// The front door — a scrolling "Modern South Africa" landing page: a full-bleed hero, then a stack of
// alternating image/text sections divided by thick sa-blue rules. Each section maps to real app
// content and is tappable into the relevant screen. Palette: sa-blue #1A85A7 + sa-slate #233342,
// Montserrat headings + Inter body.

const KICKER = "Reclaiming African Voices";
// The ambient African music/soundscapes across the app are sampled from this YouTube channel —
// credited + linked in the footer so listeners can hear the full pieces at the source.
const SOUND_CREDIT_URL = "https://www.youtube.com/@AfricanTribeEchoes";
// "Built with" tech credit — Solana anchors the on-chain Heritage Ledger. Links to the tech's site,
// not an endorsement. Official logo used per Solana's brand guidelines (light logotype on a dark bg).
const SOLANA_URL = "https://solana.com";
const PHOTO = "warm documentary photography, golden natural light, photorealistic, dignified African subjects, rich colour";

// UI chrome in all 11 official languages so the whole interface switches, not just EN/Setswana. These
// are best-effort translations of INTERFACE labels (not the literary content, which keeps its honest
// reviewed/fallback status). A native speaker should still review before final. See setswana-i18n.
const UI = {
  begin: {
    en: "Begin reading", tn: "Simolola go bala", af: "Begin lees", zu: "Qala ukufunda", xh: "Qala ukufunda",
    nso: "Thoma go bala", st: "Qala ho bala", ss: "Cala kufundza", ts: "Sungula ku hlaya", nr: "Thoma ukufunda", ve: "Thoma u vhala",
  },
  playJourney: {
    en: "Play the Journey", tn: "Bona Loeto", af: "Speel die Reis", zu: "Dlala Uhambo", xh: "Dlala Uhambo",
    nso: "Bapala Leeto", st: "Bapala Leeto", ss: "Dlala Luhambo", ts: "Tlanga Riendzo", nr: "Dlala Ikhambo", ve: "Tambani Lwendo",
  },
  pillarsKicker: {
    en: "The Literature", tn: "Dingwalo", af: "Die letterkunde", zu: "Imibhalo", xh: "Uncwadi",
    nso: "Dingwalo", st: "Dingoliloeng", ss: "Imibhalo", ts: "Matsalwa", nr: "Imitlolo", ve: "Maṅwalwa",
  },
  pillars: {
    en: "The Four Pillars", tn: "Dikokwane tse Nne", af: "Die vier pilare", zu: "Izinsika Ezine", xh: "Iintsika Ezine",
    nso: "Dikokwane tše Nne", st: "Ditshiea tse Nne", ss: "Tinsika Letine", ts: "Tinsika ta Mune", nr: "Iinsika Ezine", ve: "Dzithikho dza Ṋa",
  },
  pillarsSub: {
    en: "Foundational works of South African literature — read, heard, and kept alive.",
    tn: "Dingwalo tsa motheo tsa Aforika Borwa — di badiwa, di utlwiwa, di tshelwa.",
    af: "Grondliggende werke van Suid-Afrikaanse letterkunde — gelees, gehoor en lewend gehou.",
    zu: "Imisebenzi eyisisekelo yezincwadi zaseNingizimu Afrika — ifundwa, izwiwe, futhi igcinwa iphila.",
    xh: "Imisebenzi esisiseko yoncwadi lwaseMzantsi Afrika — ifundwa, ivakala, kwaye igcinwa iphila.",
    nso: "Mešomo ya motheo ya dingwalo tša Afrika Borwa — e a balwa, e a kwewa, e a phedišwa.",
    st: "Mesebetsi ya motheo ya dingoliloeng tsa Afrika Borwa — e baliwa, e utlwa, e boloka e phela.",
    ss: "Imisebenti lesisekelo yetincwadzi taseNingizimu Afrika — ifundvwa, ivakale, iphila.",
    ts: "Mintirho ya masungulo ya matsalwa ya Afrika-Dzonga — yi hlayiwa, yi twiwa, naswona yi hanyisiwa.",
    nr: "Imisebenzi esisekelo yeencwadi zeSewula Afrika — iyafundwa, izwakale, iphile.",
    ve: "Mishumo ya mutheo ya maṅwalwa a Afrika Tshipembe — i a vhalwa, i a pfala, i tshila.",
  },
  atlasKicker: {
    en: "Heritage", tn: "Boswa", af: "Erfenis", zu: "Amagugu", xh: "Ilifa",
    nso: "Bohwa", st: "Lefa", ss: "Lifa", ts: "Ndzhaka", nr: "Ilifa", ve: "Ifa",
  },
  atlas: {
    en: "Cultural Atlas", tn: "Atlase ya Setso", af: "Kulturele Atlas", zu: "I-Athrasi Yamasiko", xh: "I-Atlasi Yenkcubeko",
    nso: "Athlase ya Setšo", st: "Atlase ya Setso", ss: "I-Athlasi Yemasiko", ts: "Atlasi ya Ndhavuko", nr: "I-Atlasi Yesiko", ve: "Athilasi ya Mvelele",
  },
  atlasSub: {
    en: "The history, customs and heroes behind the literature — grounded and cited.",
    tn: "Hisitori, ngwao le bagaki ba ba mo tlase ga dingwalo — di theilwe mo metsweding.",
    af: "Die geskiedenis, gebruike en helde agter die letterkunde — gegrond en aangehaal.",
    zu: "Umlando, amasiko namaqhawe angemuva kwezincwadi — kusekelwe futhi kucashunwe.",
    xh: "Imbali, amasiko namaqhawe angasemva koncwadi — kusekelwe kwaye kucatshuliwe.",
    nso: "Histori, meetlo le bagale ka morago ga dingwalo — go theilwe le go tsopolwa.",
    st: "Histori, meetlo le bahale ka morao ho dingoliloeng — e thehilwe le ho qotswa.",
    ss: "Umlandvo, emasiko nemacawe langemuva kwetincwadzi — kusekelwe futsi kucashunwe.",
    ts: "Matimu, mikhuva ni tinhenha endzhaku ka matsalwa — swi simekiwile naswona swi tshahiwile.",
    nr: "Umlando, amasiko namaqhawe angemva kweencwadi — kusekelwe begodu kucatjhulwe.",
    ve: "Ḓivhazwakale, mikhuvha na vhahali nga murahu ha maṅwalwa — zwo thewaho na u redzwa.",
  },
  atlasCta: {
    en: "Explore the atlas", tn: "Sekaseka atlase", af: "Verken die atlas", zu: "Hlola i-athrasi", xh: "Phonononga i-atlasi",
    nso: "Utolla athlase", st: "Hlahloba atlase", ss: "Hlola i-athlasi", ts: "Kambela atlasi", nr: "Hlola i-atlasi", ve: "Ṱolisisa athilasi",
  },
  totemsKicker: {
    en: "The Living World", tn: "Lefatshe le le Tshelang", af: "Die Lewende Wêreld", zu: "Izwe Eliphilayo", xh: "Ilizwe Eliphilayo",
    nso: "Lefase le le Phelago", st: "Lefatshe le Phelang", ss: "Live Leliphilako", ts: "Misava leyi Hanyaka", nr: "Iphasi Eliphilako", ve: "Shango ḽi Tshilaho",
  },
  totems: {
    en: "Totems & Clans", tn: "Diboko le Meritlo", af: "Totems & Stamme", zu: "Iziboko Nezizwe", xh: "Iziduko Nezizwe",
    nso: "Diboko le Dikgoro", st: "Diboko le Meloko", ss: "Tiboko Netizwe", ts: "Swiharhi swa Tinyimba", nr: "Iimbongo Nezizwe", ve: "Mitupo na Vhorabulasi",
  },
  totemsSub: {
    en: "How wild animals became ancestral guardians, clan markers and a living code of ecological care.",
    tn: "Ka fa diphologolo tsa naga di neng tsa nna badisa ba badimo, matshwao a meritlo le molao o o tshelang wa tlhokomelo ya tikologo.",
    af: "Hoe wilde diere voorouerlike beskermers, stam-merkers en 'n lewende kode van ekologiese sorg geword het.",
    zu: "Indlela izilwane zasendle ezaba ngabalondolozi bokhokho, izimpawu zezizwe nekhodi ephilayo yokunakekela imvelo.",
    xh: "Indlela izilwanyana zasendle ezaba ngabakhuseli beenkokeli, iimpawu zezizwe nekhowudi ephilayo yokhathalelo lwendalo.",
    nso: "Ka fao diphoofolo tša naga di ilego tša ba badišabadimo, maswao a dikgoro le molao wo o phelago wa tlhokomelo ya tikologo.",
    st: "Kamoo liphoofolo tsa naha li ileng tsa fetoha balebeli ba balimo, matšoao a meloko le molao o phelang oa tlhokomelo ea tikoloho.",
    ss: "Indlela tilwane tesiganga letaba ngabavikeli bekhokho, timphawu tetizwe nekhodi lephilako yekunakekela imvelo.",
    ts: "Ndlela leyi swiharhi swa nhoveni swi veke vasirheleri va vakokwana, swikombiso swa tinyimba na nawu lowu hanyaka wa nkhathalelo wa mbango.",
    nr: "Indlela iinlwana zeganga ezaba ngabavikeli bakhokho, iimpawu zezizwe nekhodi ephilako yokutlhogomela imvelo.",
    ve: "Nḓila ye zwipuka zwa ḓaka zwa vha vhalindi vha vhomakhulu, zwiga zwa vhorabulasi na mulayo u tshilaho wa ṱhogomelo ya mupo.",
  },
  totemsCta: {
    en: "Enter the compendium", tn: "Tsena mo kokoanyong", af: "Betree die kompendium", zu: "Ngena kwikhompendiyamu", xh: "Ngena kwikhompendiyam",
    nso: "Tsena ka kgoboketšo", st: "Kena ka kokoano", ss: "Ngena kunhlanganiso", ts: "Nghena eka nhlengeleto", nr: "Ngena kihlanganiso", ve: "Dzhenani kha khoboledzo",
  },
  provKicker: {
    en: "The Land", tn: "Naga", af: "Die Land", zu: "Umhlaba", xh: "Umhlaba",
    nso: "Naga", st: "Naha", ss: "Umhlaba", ts: "Misava", nr: "Umhlaba", ve: "Shango",
  },
  provinces: {
    en: "The Nine Provinces", tn: "Diporofense tse RobMongwe", af: "Die Nege Provinsies", zu: "Izifundazwe Eziyisishiyagalolunye", xh: "Amaphondo Alithoba",
    nso: "Diprofense tše Senyane", st: "Diprofinse tse Robong", ss: "Tifundza Letiyimfica", ts: "Swifundzha swa Kaye", nr: "Iimfunda Eziyithoba", ve: "Mavundu a Ṱahe",
  },
  provSub: {
    en: "Nine provinces, hundreds of cities and towns — each with its own founders, leaders and living history.",
    tn: "Diporofense tse robmongwe, metse e mentsi — nngwe le nngwe e na le hisitori ya yona.",
    af: "Nege provinsies, honderde stede en dorpe — elk met sy eie stigters, leiers en lewende geskiedenis.",
    zu: "Izifundazwe eziyisishiyagalolunye, amakhulu amadolobha — ngayinye inabasunguli bayo, abaholi nomlando ophilayo.",
    xh: "Amaphondo alithoba, amakhulu ezixeko needolophu — nganye inabasunguli bayo, iinkokeli nembali ephilayo.",
    nso: "Diprofense tše senyane, makgolo a metse — se sengwe le se sengwe se na le bathei ba sona, baetapele le histori e phelago.",
    st: "Diprofinse tse robong, makgolo a metse — e nngwe le e nngwe e na le bathehi ba yona, baetapele le histori e phelang.",
    ss: "Tifundza letiyimfica, emakhulu emadolobha — leyinye naleyinye inebasunguli bayo, baholi nemlandvo lophilako.",
    ts: "Swifundzha swa kaye, madzana ya madoroba — xin'wana ni xin'wana xi ni vatumbuluxi va xona, varhangeri ni matimu lama hanyaka.",
    nr: "Iimfunda eziyithoba, amakhulu wamadorobho — ngayinye inabasunguli bayo, abarholi nomlando ophilako.",
    ve: "Mavundu a ṱahe, maḓana a maḓorobo — ḽiṅwe na ḽiṅwe ḽi na vhavhumbi vhaḽo, vharangaphanḓa na ḓivhazwakale i tshilaho.",
  },
  provCta: {
    en: "Explore the provinces", tn: "Sekaseka diporofense", af: "Verken die provinsies", zu: "Hlola izifundazwe", xh: "Phonononga amaphondo",
    nso: "Utolla diprofense", st: "Hlahloba diprofinse", ss: "Hlola tifundza", ts: "Kambela swifundzha", nr: "Hlola iimfunda", ve: "Ṱolisisa mavundu",
  },
  presKicker: {
    en: "Democratic South Africa", tn: "Aforika Borwa ya Temokrasi", af: "Demokratiese Suid-Afrika", zu: "INingizimu Afrika Yentando Yeningi", xh: "UMzantsi Afrika Wentando Yesininzi",
    nso: "Afrika Borwa ya Temokrasi", st: "Afrika Borwa ya Demokrasi", ss: "INingizimu Afrika Yentsandvo Yelinyenti", ts: "Afrika-Dzonga ya Xidemokrasi", nr: "ISewula Afrika Yentando Yenengi", ve: "Afrika Tshipembe ya Demokirasi",
  },
  presidents: {
    en: "The Presidents", tn: "Dipresidente", af: "Die Presidente", zu: "Abongameli", xh: "Iimongameli",
    nso: "Dipresidente", st: "Dipresidente", ss: "BoMengameli", ts: "Vapresidente", nr: "AboMongameli", ve: "Vhapresidente",
  },
  presSub: {
    en: "The leaders who shaped South Africa from 1994 — their lives, struggles and legacies, recorded honestly.",
    tn: "Baeteledipele ba ba bopileng Aforika Borwa go tloga ka 1994 — matshelo, ditlhabano le boswa jwa bona.",
    af: "Die leiers wat Suid-Afrika sedert 1994 gevorm het — hul lewens, stryd en nalatenskappe, eerlik aangeteken.",
    zu: "Abaholi abakha iNingizimu Afrika kusukela ngo-1994 — izimpilo zabo, imizabalazo namagugu, kubhalwe ngokwethembeka.",
    xh: "Iinkokeli ezakha uMzantsi Afrika ukususela ngo-1994 — ubomi babo, imizabalazo namafa, kubhalwe ngokunyaniseka.",
    nso: "Baetapele bao ba bopilego Afrika Borwa go tloga ka 1994 — maphelo a bona, dintwa le bohwa, go ngwadilwe ka potego.",
    st: "Baetapele ba ileng ba theha Afrika Borwa ho tloha ka 1994 — bophelo ba bona, dintwa le lefa, ho ngotswe ka botshepehi.",
    ss: "Baholi labakha iNingizimu Afrika kusukela nga-1994 — kuphila kwabo, imizabalazo nemagugu, kubhalwe ngekwetsembeka.",
    ts: "Varhangeri lava vumbeke Afrika-Dzonga ku sukela hi 1994 — vutomi bya vona, tinyimpi ni ndzhaka, swi tsariwile hi ku tshembeka.",
    nr: "Abarholi abakhe iSewula Afrika kusukela ngo-1994 — ukuphila kwabo, imizabalazo namagugu, kutlolwe ngokwethembeka.",
    ve: "Vharangaphanḓa vhe vha fhaṱa Afrika Tshipembe u bva 1994 — vhutshilo havho, dzinndwa na ifa, zwo ṅwaliwa nga u fulufhedzea.",
  },
  presCta: {
    en: "Meet the presidents", tn: "Kopana le dipresidente", af: "Ontmoet die presidente", zu: "Hlangana nabongameli", xh: "Dibana neemongameli",
    nso: "Kopana le dipresidente", st: "Kopana le dipresidente", ss: "Hlangana naboMengameli", ts: "Hlangana ni vapresidente", nr: "Hlangana naboMongameli", ve: "Ṱangana na vhapresidente",
  },
  heroesKicker: { en: "Heroes of the Nation", tn: "Bagaki ba Setšhaba" },
  heroesTitle: { en: "Heroes & Heroines", tn: "Bagaki le Bagaki ba Basadi" },
  heroesSub: {
    en: "Women and men who gave something of themselves to South Africa's freedom and dignity — their journeys, told honestly and searchable by name.",
    tn: "Basadi le banna ba ba neileng sengwe sa bone go kgololosego le seriti sa Aforika Borwa — maeto a bona, a bolelwa ka boammaaruri.",
  },
  heroesCta: { en: "Meet the heroes", tn: "Kopana le bagaki" },
  startJourney: { en: "Start the journey", tn: "Simolola leeto", af: "Begin die reis", zu: "Qala uhambo", xh: "Qala uhambo", nso: "Thoma leeto", st: "Qala leeto", ss: "Cala luhambo", ts: "Sungula riendzo", nr: "Thoma ikhambo", ve: "Thoma lwendo" },
  closeJourney: { en: "Close the journey", tn: "Tswala leeto", af: "Sluit die reis", zu: "Vala uhambo", xh: "Vala uhambo", nso: "Tswalela leeto", st: "Koala leeto", ss: "Vala luhambo", ts: "Pfala riendzo", nr: "Vala ikhambo", ve: "Vala lwendo" },
  journeyHint: { en: "1652 → today · tap a year", tn: "1652 → gompieno · tobetsa ngwaga" },
  journeyTitle: { en: "The journey of a nation", tn: "Leeto la setšhaba" },
  daysKicker: {
    en: "Days we remember", tn: "Malatsi a re a gakologelwang", af: "Dae wat ons onthou", zu: "Izinsuku esizikhumbulayo", xh: "Iintsuku esizikhumbulayo",
    nso: "Matšatši ao re a gopolago", st: "Matsatsi ao re a hopolang", ss: "Emalanga lesiwakhumbulako", ts: "Masiku lawa hi ma tsundzukaka", nr: "Amalanga esiwakhumbulako", ve: "Maḓuvha ane ra a humbula",
  },
  days: {
    en: "National Days", tn: "Malatsi a Bosetšhaba", af: "Nasionale Dae", zu: "Izinsuku Zikazwelonke", xh: "Iintsuku Zesizwe",
    nso: "Matšatši a Setšhaba", st: "Matsatsi a Naha", ss: "Emalanga Esive", ts: "Masiku ya Rixaka", nr: "Amalanga Wesitjhaba", ve: "Maḓuvha a Lushaka",
  },
  daysSub: {
    en: "Freedom Day, Youth Day, Women's Day — the days that carry our history, and why each one matters.",
    tn: "Letsatsi la Kgololosego, Letsatsi la Baša, Letsatsi la Basadi — malatsi a a rweleng hisitori ya rona.",
  },
  daysCta: {
    en: "Explore the days", tn: "Sekaseka malatsi", af: "Verken die dae", zu: "Hlola izinsuku", xh: "Phonononga iintsuku",
    nso: "Utolla matšatši", st: "Hlahloba matsatsi", ss: "Hlola emalanga", ts: "Kambela masiku", nr: "Hlola amalanga", ve: "Ṱolisisani maḓuvha",
  },
  archiveKicker: {
    en: "Your voice, your history", tn: "Lentswe la gago", af: "Jou stem, jou geskiedenis", zu: "Izwi lakho, umlando wakho", xh: "Ilizwi lakho, imbali yakho",
    nso: "Lentšu la gago, histori ya gago", st: "Lentswe la hao, histori ya hao", ss: "Livi lakho, umlandvo wakho", ts: "Rito ra wena, matimu ya wena", nr: "Ilizwi lakho, umlando wakho", ve: "Ipfi ḽaṋu, ḓivhazwakale yaṋu",
  },
  archive: {
    en: "Community Archive", tn: "Polokelo ya Setšhaba", af: "Gemeenskapsargief", zu: "Ingobo Yomphakathi", xh: "Uvimba Woluntu",
    nso: "Polokelo ya Setšhaba", st: "Polokelo ya Setjhaba", ss: "Ingobo Yemmango", ts: "Vuhlayiselo bya Vaaki", nr: "Ingobo Yomphakathi", ve: "Vhulondoloti ha Tshitshavha",
  },
  archiveSub: {
    en: "Record an elder's story, a memory or a tradition in your own words — kept on your terms, under POPIA consent.",
    tn: "Gatisa kanegelo ya mogolo, kgopolo kgotsa ngwao ka mafoko a gago — e bolokwa ka fa go wena.",
    af: "Neem 'n ouer se storie, 'n herinnering of 'n tradisie in jou eie woorde op — bewaar op jou voorwaardes, met POPIA-toestemming.",
    zu: "Qopha indaba yomdala, inkumbulo noma isiko ngamazwi akho — kugcinwe ngendlela oyifunayo, ngemvume ye-POPIA.",
    xh: "Rekhoda ibali lomdala, inkumbulo okanye isithethe ngamazwi akho — kugcinwe ngokwemigaqo yakho, phantsi kwemvume ye-POPIA.",
    nso: "Gatiša kanegelo ya mogolo, kgopolo goba setšo ka mantšu a gago — go bolokwa ka fao o ratago, ka tumelelo ya POPIA.",
    st: "Rekota pale ya moholo, mohopolo kapa moetlo ka mantswe a hao — e bolokoa ka tsela ya hao, tlasa tumello ya POPIA.",
    ss: "Bhala indzaba yalomdzala, inkhumbulo nome lisiko ngemavi akho — kugcinwe ngendlela loyifunako, ngemvume ye-POPIA.",
    ts: "Rhekhoda ntsheketo wa mukhalabye, xitsundzuxo kumbe ndhavuko hi marito ya wena — swi hlayisiwa hi ku ya hi wena, ehansi ka mpfumelelo wa POPIA.",
    nr: "Bhala indaba yomdala, inkumbulo namkha isiko ngamezwi wakho — kugcinwe ngendlela oyifunako, ngemvume ye-POPIA.",
    ve: "Rekhoda tshiitwa tsha muhulwane, tshihumbulo kana sialala nga maipfi aṋu — tshi vhulungwa nga nḓila yaṋu, fhasi ha thendelo ya POPIA.",
  },
  archiveCta: {
    en: "Record a story", tn: "Gatisa kanegelo", af: "Neem 'n storie op", zu: "Qopha indaba", xh: "Rekhoda ibali",
    nso: "Gatiša kanegelo", st: "Rekota pale", ss: "Bhala indzaba", ts: "Rhekhoda ntsheketo", nr: "Bhala indaba", ve: "Rekhoda tshiitwa",
  },
  about: {
    en: "About the Sources", tn: "Ka ga Metswedi", af: "Oor die bronne", zu: "Mayelana Nemithombo", xh: "Malunga Nemithombo",
    nso: "Ka ga Methopo", st: "Mabapi le Mehlodi", ss: "Mayelana Nemitfombo", ts: "Mayelana ni Tihlovo", nr: "Malunga Nemithombo", ve: "Nga ha Zwiko",
  },
  heritage: {
    en: "Heritage Ledger · on-chain", tn: "Rekoto ya Boswa · mo blockchain", af: "Erfenisregister · op-ketting", zu: "Irejista Yamagugu · ku-blockchain", xh: "Irejista Yelifa · kwi-blockchain",
    nso: "Rejista ya Bohwa · go blockchain", st: "Rejista ya Lefa · ho blockchain", ss: "Irejista Yelifa · ku-blockchain", ts: "Rejista ya Ndzhaka · eka blockchain", nr: "Irejista Yelifa · ku-blockchain", ve: "Rejista ya Ifa · kha blockchain",
  },
};

// Feeds the page scroll position + viewport height to each Section for scroll-in reveals + parallax.
const ScrollCtx = React.createContext<{ scrollY: Animated.Value; vh: number } | null>(null);

// The generated (or Pollinations) hero image for a module — used as the big section photos.
function heroSource(m: Module, w = 1200, h = 900) {
  const s = m.scenes[0];
  return sceneImageSource(m.id, s.id, `${s.imagePrompt}, ${PHOTO}`, { seed: s.seed, w, h });
}

export function HomeGallery({
  lang,
  onLangChange,
  onOpen,
  onAbout,
  onArchive,
  onHeritage,
  onProvinces,
  onPresidents,
  onAtlas,
  onDays,
  onTotems,
  onHeroes,
}: {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  onOpen: (id: string) => void;
  onAbout: () => void;
  onArchive: () => void;
  onHeritage: () => void;
  onProvinces: () => void;
  onPresidents: () => void;
  onAtlas: () => void;
  onDays: () => void;
  onTotems: () => void;
  onHeroes: () => void;
}) {
  const { width, height } = useWindowDimensions();
  const wide = width >= 768;
  const heroH = Math.max(520, height); // full-viewport hero (like the reference's h-screen)
  // Drives scroll-in reveals + image parallax across the page.
  const scrollY = useRef(new Animated.Value(0)).current;
  // Selected country (defaults to South Africa) — drives the flag shown + which anthem plays.
  const [country, setCountry] = useState(DEFAULT_COUNTRY);

  // History-trail "journey": the timeline sits dim behind the hero words by default; starting the
  // journey brings it forward (bright + tappable) and fades the big words back.
  const [mapOpen, setMapOpen] = useState(false);
  const [milestone, setMilestone] = useState<HistoryMilestone | null>(null);
  const trailOpacity = useRef(new Animated.Value(0.16)).current;
  const wordsOpacity = useRef(new Animated.Value(1)).current;
  const scrimOpacity = useRef(new Animated.Value(0)).current;
  const animateTo = (open: boolean) =>
    Animated.parallel([
      Animated.timing(trailOpacity, { toValue: open ? 1 : 0.16, duration: 420, useNativeDriver: true }),
      Animated.timing(wordsOpacity, { toValue: open ? 0.12 : 1, duration: 420, useNativeDriver: true }),
      Animated.timing(scrimOpacity, { toValue: open ? 0.62 : 0, duration: 420, useNativeDriver: true }),
    ]);
  const openMap = () => { setMapOpen(true); animateTo(true).start(); };
  const closeMap = () => { setMapOpen(false); setMilestone(null); animateTo(false).start(); };

  return (
    <View style={styles.root}>
      {/* Country picker (left) + language picker (right) float over the hero, mirrored */}
      <View style={styles.countryBar} pointerEvents="box-none">
        <CountryPicker country={country} onChange={setCountry} lang={lang} />
      </View>
      <View style={styles.langBar} pointerEvents="box-none">
        <LanguagePicker lang={lang} onChange={onLangChange} />
      </View>

      <ScrollCtx.Provider value={{ scrollY, vh: height }}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 0 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
      >
        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <View style={[styles.hero, { height: heroH }]}>
          <View style={StyleSheet.absoluteFill}>
            <SceneImage source={heroSource(modules[0], 1400, 1600)} kenBurns />
          </View>
          <LinearGradient
            colors={["rgba(0,0,0,0.35)", "rgba(0,0,0,0.15)", "rgba(0,0,0,0.9)"]}
            locations={[0, 0.45, 1]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />

          {/* darkening scrim that deepens when the journey opens, so the trail reads clearly */}
          <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.mapScrim, { opacity: scrimOpacity }]} />

          {/* the history trail — dim behind the words by default, bright + tappable when open. The
              start flag lives inside it (planted on the 1652 dot) so it never drifts. */}
          <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            <HistoryTrail
              active={mapOpen}
              dimOpacity={trailOpacity}
              onSelect={setMilestone}
              selectedId={milestone?.id}
              onStart={openMap}
              startLabel={t(UI.startJourney, lang)}
            />
          </View>

          {/* the big words — bright by default, faded back when the journey opens. Nothing here is
              tappable, so the layer never intercepts clicks meant for the trail / start flag behind it. */}
          <Animated.View style={[styles.heroInner, { opacity: wordsOpacity }]} pointerEvents="none">
            <Reveal style={styles.heroTitleWrap}>
              <Text style={[styles.heroTitle, wide && styles.heroTitleWide]}>Ubuntu{"\n"}Heritage</Text>
            </Reveal>
            <Reveal delay={150} style={[styles.heroCard, wide && styles.heroCardWide]}>
              <Text style={styles.heroCardTitle}>Reclaiming African Voices</Text>
              <Text style={styles.heroCardSub}>MANTSWE A MALOBA — VOICES OF YESTERDAY</Text>
            </Reveal>
          </Animated.View>

          {/* journey controls + selected-year caption (only while open) */}
          {mapOpen ? (
            <View style={styles.mapUI} pointerEvents="box-none">
              {/* close sits on the LEFT (where the start flag was) so it never collides with the
                  language picker in the top-right */}
              <View style={styles.mapTop} pointerEvents="box-none">
                <PressScale style={styles.mapClose} onPress={closeMap} accessibilityLabel={t(UI.closeJourney, lang)}>
                  <Icon.X size={18} color="#fff" />
                </PressScale>
                <View style={styles.mapTopText} pointerEvents="none">
                  <Text style={styles.mapKicker}>{t(UI.journeyTitle, lang)}</Text>
                  <Text style={styles.mapHint}>{t(UI.journeyHint, lang)}</Text>
                </View>
              </View>

              {milestone ? (
                <View style={styles.mapCaption} pointerEvents="none">
                  <Text style={styles.capYear}>{milestone.year}</Text>
                  <Text style={styles.capTitle}>{milestone.title}</Text>
                  <Text style={styles.capNote}>{milestone.note}</Text>
                </View>
              ) : (
                <Text style={styles.mapSource} pointerEvents="none">{historyTrailSource}</Text>
              )}
            </View>
          ) : null}
        </View>

        {/* ── THE LITERATURE — illustrated bookshelf (slate) ─────────────────── */}
        <LiteratureShelf lang={lang} onOpen={onOpen} />

        {/* ── CULTURAL ATLAS (black) ─────────────────────────────────────────── */}
        <Section
          tone="slate"
          reverse
          image={heroSource(atlasModules[0])}
          kicker={t(UI.atlasKicker, lang)}
          title={t(UI.atlas, lang)}
          intro={t(UI.atlasSub, lang)}
        >
          <CtaButton label={t(UI.atlasCta, lang)} onPress={onAtlas} />
        </Section>

        {/* ── TOTEMS & CLANS (slate) ─────────────────────────────────────────── */}
        <Section
          tone="slate"
          image={require("../../assets/animals/lion.webp")}
          kicker={t(UI.totemsKicker, lang)}
          title={t(UI.totems, lang)}
          intro={t(UI.totemsSub, lang)}
        >
          <CtaButton label={t(UI.totemsCta, lang)} onPress={onTotems} />
        </Section>

        {/* ── THE NINE PROVINCES (slate) ─────────────────────────────────────── */}
        <Section
          tone="slate"
          image={heroSource(atlasModules[2])}
          kicker={t(UI.provKicker, lang)}
          title={t(UI.provinces, lang)}
          intro={t(UI.provSub, lang)}
        >
          <CtaButton label={t(UI.provCta, lang)} onPress={onProvinces} />
        </Section>

        {/* ── THE PRESIDENTS (black) ─────────────────────────────────────────── */}
        <Section
          tone="slate"
          reverse
          image={heroSource(modules[2])}
          kicker={t(UI.presKicker, lang)}
          title={t(UI.presidents, lang)}
          intro={t(UI.presSub, lang)}
        >
          <CtaButton label={t(UI.presCta, lang)} onPress={onPresidents} />
        </Section>

        {/* ── HEROES OF THE NATION (slate) ───────────────────────────────────── */}
        <Section
          tone="slate"
          image={heroSource(modules[1])}
          kicker={t(UI.heroesKicker, lang)}
          title={t(UI.heroesTitle, lang)}
          intro={t(UI.heroesSub, lang)}
        >
          <CtaButton label={t(UI.heroesCta, lang)} onPress={onHeroes} />
        </Section>

        {/* ── NATIONAL DAYS (slate) ──────────────────────────────────────────── */}
        <Section
          tone="slate"
          reverse
          image={heroSource(atlasModules[1])}
          kicker={t(UI.daysKicker, lang)}
          title={t(UI.days, lang)}
          intro={t(UI.daysSub, lang)}
        >
          <CtaButton label={t(UI.daysCta, lang)} onPress={onDays} />
        </Section>

        {/* ── COMMUNITY ARCHIVE (slate) ──────────────────────────────────────── */}
        <Section
          tone="slate"
          image={heroSource(modules[3])}
          kicker={t(UI.archiveKicker, lang)}
          title={t(UI.archive, lang)}
          intro={t(UI.archiveSub, lang)}
        >
          <CtaButton label={t(UI.archiveCta, lang)} onPress={onArchive} icon />
        </Section>

        {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
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
                      source={require("../../assets/brand/unisa.webp")}
                      style={styles.unisaLogo}
                      resizeMode="contain"
                      accessibilityLabel="University of South Africa (UNISA)"
                    />
                  </View>
                  <View style={styles.partnerPlate}>
                    <Image
                      source={require("../../assets/brand/botlhale-chip.webp")}
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
                    source={require("../../assets/brand/african-tribe-echoes.webp")}
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
                      source={require("../../assets/brand/solana.webp")}
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
      </Animated.ScrollView>
      </ScrollCtx.Provider>
    </View>
  );
}

// ── A full-width alternating image/text section, divided by a thick sa-blue top rule ──────────────
function Section({
  tone,
  reverse,
  image,
  kicker,
  title,
  intro,
  children,
}: {
  tone: "slate" | "light" | "blue";
  reverse?: boolean;
  image: string | number;
  kicker: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  const { width } = useWindowDimensions();
  const wide = width >= 768;
  const bg = tone === "light" ? colors.dsCloud : tone === "blue" ? colors.dsBlue : colors.dsSlate;
  const titleColor = tone === "light" ? colors.dsSlate : "#FFFFFF";
  const kickerColor = tone === "blue" ? "#FFFFFF" : colors.dsBlue;
  const introColor =
    tone === "light" ? "rgba(35,51,66,0.72)" : tone === "blue" ? "rgba(255,255,255,0.92)" : colors.dsGray;

  // Scroll-driven life: the section rises + fades in as it enters the viewport; its photo parallaxes.
  const ctx = React.useContext(ScrollCtx);
  const [y, setY] = useState<number | null>(null);
  const vh = ctx?.vh ?? 800;
  const scrollY = ctx?.scrollY;
  const measured = y != null;

  const revealStyle = !scrollY
    ? {}
    : !measured
    ? { opacity: 0 }
    : {
        opacity: scrollY.interpolate({ inputRange: [y - vh * 0.92, y - vh * 0.42], outputRange: [0, 1], extrapolate: "clamp" }),
        transform: [
          { translateY: scrollY.interpolate({ inputRange: [y - vh * 0.92, y - vh * 0.42], outputRange: [44, 0], extrapolate: "clamp" }) },
        ],
      };
  const parallax =
    scrollY && measured
      ? scrollY.interpolate({ inputRange: [y - vh, y + 600], outputRange: [-26, 26], extrapolate: "clamp" })
      : 0;

  const imageBlock = (
    <View style={[wide ? styles.sectionImageWide : styles.sectionImage, styles.imgClip]}>
      <Animated.View style={[StyleSheet.absoluteFill, styles.imgInner, { transform: [{ translateY: parallax }] }]}>
        <SceneImage source={image} />
      </Animated.View>
    </View>
  );
  const textBlock = (
    <View style={wide ? styles.sectionTextWide : styles.sectionText}>
      <View style={wide ? { maxWidth: 520 } : undefined}>
        {tone !== "blue" && <View style={styles.accentBar} />}
        <Text style={[styles.sectionKicker, { color: kickerColor }]}>{kicker.toUpperCase()}</Text>
        <Text style={[styles.sectionTitle, wide && styles.sectionTitleWide, { color: titleColor }]}>{title}</Text>
        <Text style={[styles.sectionIntro, wide && styles.sectionIntroWide, { color: introColor }]}>{intro}</Text>
        {children}
      </View>
    </View>
  );

  const dir: "row" | "row-reverse" = reverse ? "row-reverse" : "row";
  const rowStyle = [
    styles.section,
    { backgroundColor: bg },
    wide ? ({ flexDirection: dir, minHeight: 520, alignItems: "stretch" } as const) : null,
    revealStyle,
  ];

  return (
    <Animated.View style={rowStyle} onLayout={(e) => setY(e.nativeEvent.layout.y)}>
      {imageBlock}
      {textBlock}
    </Animated.View>
  );
}

// ── THE LITERATURE — a full-width "bookshelf": each of the four pillars is a book on the shelf, with
// its own cover art, title, author·year, back-cover blurb and a "Begin reading" invitation. Unlike the
// alternating Section, this band is full-width so the covers themselves carry the imagery. ────────────
function LiteratureShelf({ lang, onOpen }: { lang: Lang; onOpen: (id: string) => void }) {
  const { width } = useWindowDimensions();
  const wide = width >= 768;
  const [journeyOpen, setJourneyOpen] = useState(false);

  // Scroll-driven reveal, mirroring Section so the band feels part of the same page.
  const ctx = React.useContext(ScrollCtx);
  const [y, setY] = useState<number | null>(null);
  const vh = ctx?.vh ?? 800;
  const scrollY = ctx?.scrollY;
  const measured = y != null;
  const revealStyle = !scrollY
    ? {}
    : !measured
    ? { opacity: 0 }
    : {
        opacity: scrollY.interpolate({ inputRange: [y - vh * 0.92, y - vh * 0.42], outputRange: [0, 1], extrapolate: "clamp" }),
        transform: [
          { translateY: scrollY.interpolate({ inputRange: [y - vh * 0.92, y - vh * 0.42], outputRange: [44, 0], extrapolate: "clamp" }) },
        ],
      };

  return (
    <Animated.View style={[styles.litBand, revealStyle]} onLayout={(e) => setY(e.nativeEvent.layout.y)}>
      <View style={wide ? styles.litInnerWide : undefined}>
        <View style={styles.litHeader}>
          <View style={styles.accentBar} />
          <Text style={[styles.sectionKicker, { color: colors.dsBlue }]}>{t(UI.pillarsKicker, lang).toUpperCase()}</Text>
          <Text style={[styles.sectionTitle, wide && styles.sectionTitleWide, { color: "#FFFFFF" }]}>{t(UI.pillars, lang)}</Text>
          <Text style={[styles.sectionIntro, wide && styles.sectionIntroWide, { color: colors.dsGray, maxWidth: 620 }]}>
            {t(UI.pillarsSub, lang)}
          </Text>
          <Pressable style={styles.journeyBtn} onPress={() => setJourneyOpen(true)} accessibilityLabel={t(UI.playJourney, lang)}>
            <Icon.Play size={17} color="#000000" fill="#000000" />
            <Text style={styles.journeyBtnText}>{t(UI.playJourney, lang)}</Text>
          </Pressable>
        </View>
        <View style={styles.shelf}>
          {modules.map((m, i) => (
            <BookCard key={m.id} module={m} lang={lang} wide={wide} delay={i * 80} onPress={() => onOpen(m.id)} />
          ))}
        </View>
      </View>
      <Modal visible={journeyOpen} animationType="fade" onRequestClose={() => setJourneyOpen(false)}>
        <Journey slides={literatureJourney} lang={lang} onClose={() => setJourneyOpen(false)} />
      </Modal>
    </Animated.View>
  );
}

// One "book" on the shelf — cover art up top, then title / author·year / blurb / Begin reading. A blue
// spine runs down the left edge to sell the book metaphor.
function BookCard({
  module: m,
  lang,
  wide,
  delay,
  onPress,
}: {
  module: Module;
  lang: Lang;
  wide: boolean;
  delay: number;
  onPress: () => void;
}) {
  return (
    <Reveal delay={delay} style={wide ? styles.bookCol : styles.bookColNarrow}>
      <PressScale
        style={styles.bookCard}
        onPress={onPress}
        accessibilityLabel={`${m.title} — ${m.author}${m.year ? `, ${m.year}` : ""}. ${t(UI.begin, lang)}`}
      >
        <View style={[styles.bookCover, { height: wide ? 132 : 150 }]}>
          <SceneImage source={heroSource(m)} />
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.55)"]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
        </View>
        <View style={styles.bookBody}>
          <Text style={[styles.bookTitle, wide && styles.bookTitleWide]} numberOfLines={2}>{m.title}</Text>
          <Text style={styles.bookMeta}>
            {m.author}
            {m.year ? ` · ${m.year}` : ""}
          </Text>
          <Text style={styles.bookBlurb} numberOfLines={2}>
            {t(m.blurb, lang)}
          </Text>
          <View style={styles.beginRow}>
            <Text style={styles.beginText}>{t(UI.begin, lang).toUpperCase()}</Text>
            <Icon.ArrowRight size={16} color={colors.dsBlue} />
          </View>
        </View>
      </PressScale>
    </Reveal>
  );
}

// The pill CTA — white pill with black text on the black ground.
function CtaButton({
  label,
  onPress,
  icon,
}: {
  label: string;
  onPress: () => void;
  icon?: boolean;
}) {
  // White pill, black text/icons — reads cleanly on the pure-black ground.
  return (
    <PressScale style={styles.cta} onPress={onPress} accessibilityLabel={label}>
      {icon && <Icon.Mic size={17} color="#000000" />}
      <Text style={styles.ctaText}>{label}</Text>
      <Icon.ArrowRight size={17} color="#000000" />
    </PressScale>
  );
}

const BLUE = "#1A85A7"; // accent only — rules, borders, links
const SLATE = "#000000"; // ground → pure black

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: SLATE },
  langBar: { position: "absolute", top: 0, right: 0, zIndex: 20, paddingTop: spacing.lg, paddingRight: spacing.lg },
  countryBar: { position: "absolute", top: 0, left: 0, zIndex: 20, paddingTop: spacing.lg, paddingLeft: spacing.lg },

  // Hero
  hero: { width: "100%", justifyContent: "flex-end", backgroundColor: SLATE },
  heroInner: { flex: 1, justifyContent: "space-between", paddingHorizontal: spacing.lg, paddingTop: 90, paddingBottom: spacing.xl },
  heroTitleWrap: { alignItems: "center", flex: 1, justifyContent: "center" },
  heroTitle: {
    color: "#FFFFFF",
    fontFamily: fonts.display,
    fontSize: 60,
    lineHeight: 60,
    letterSpacing: -1,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 18,
  },
  heroTitleWide: { fontSize: 120, lineHeight: 116, letterSpacing: -2 },
  heroCardWide: { paddingVertical: spacing.xl, paddingHorizontal: 48 },
  heroCard: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.42)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  heroCardTitle: { color: "#FFFFFF", fontFamily: fonts.heading, fontSize: 20, textAlign: "center" },
  heroCardSub: { color: "rgba(255,255,255,0.9)", fontFamily: fonts.bodySemi, fontSize: 11, letterSpacing: 2, marginTop: 8, textAlign: "center" },

  // History-trail journey
  mapScrim: { backgroundColor: "#0a0703" },
  mapUI: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "space-between", paddingHorizontal: spacing.lg, paddingTop: 76, paddingBottom: spacing.xl },
  mapTop: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  mapTopText: { flex: 1 },
  mapKicker: { color: "#E8B45A", fontFamily: fonts.displaySemi, fontSize: 14, letterSpacing: 1, textTransform: "uppercase" },
  mapHint: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.body, fontSize: 12, marginTop: 3 },
  mapClose: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.12)", borderWidth: 1, borderColor: "rgba(255,255,255,0.28)", alignItems: "center", justifyContent: "center" },
  mapCaption: { alignSelf: "center", maxWidth: 560, width: "100%", backgroundColor: "rgba(10,7,3,0.72)", borderWidth: 1, borderColor: "rgba(232,180,90,0.4)", borderRadius: radius.md, padding: spacing.md },
  capYear: { color: "#E8B45A", fontFamily: fonts.display, fontSize: 26, letterSpacing: -0.5 },
  capTitle: { color: "#fff", fontFamily: fonts.heading, fontSize: 17, marginTop: 2 },
  capNote: { color: "rgba(255,255,255,0.8)", fontFamily: fonts.body, fontSize: 13, lineHeight: 20, marginTop: 6 },
  mapSource: { alignSelf: "center", maxWidth: 560, color: "rgba(255,255,255,0.5)", fontFamily: fonts.serifItalic, fontSize: 12, lineHeight: 18, textAlign: "center" },

  // Section
  section: { width: "100%", borderTopWidth: 8, borderTopColor: BLUE },
  sectionImage: { width: "100%", height: 260, backgroundColor: SLATE },
  sectionImageWide: { width: "50%", backgroundColor: SLATE, alignSelf: "stretch" },
  imgClip: { overflow: "hidden" },
  imgInner: { top: -32, bottom: -32 }, // extra height so parallax shift never reveals an edge
  sectionText: { paddingHorizontal: spacing.lg, paddingVertical: spacing.xl },
  sectionTextWide: { width: "50%", paddingHorizontal: 64, paddingVertical: 80, justifyContent: "center" },
  accentBar: { width: 56, height: 6, backgroundColor: BLUE, marginBottom: spacing.md },
  sectionKicker: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2.5, marginBottom: spacing.sm },
  sectionTitle: { fontFamily: fonts.displaySemi, fontSize: 34, lineHeight: 37, letterSpacing: -0.5 },
  sectionTitleWide: { fontSize: 52, lineHeight: 54 },
  sectionIntro: { fontFamily: fonts.body, fontSize: 16, lineHeight: 25, marginTop: spacing.md },
  sectionIntroWide: { fontSize: 19, lineHeight: 30 },

  // The Literature — full-width bookshelf band
  litBand: { width: "100%", backgroundColor: SLATE, borderTopWidth: 8, borderTopColor: BLUE, paddingHorizontal: spacing.lg, paddingVertical: spacing.xl },
  litInnerWide: { maxWidth: 1200, alignSelf: "center", width: "100%", paddingHorizontal: 40, paddingVertical: 48 },
  litHeader: { marginBottom: spacing.xl },
  journeyBtn: { flexDirection: "row", alignItems: "center", gap: spacing.sm, alignSelf: "flex-start", backgroundColor: "#FFFFFF", borderRadius: radius.pill, paddingVertical: 12, paddingHorizontal: 20, marginTop: spacing.lg },
  journeyBtnText: { color: "#000000", fontFamily: fonts.bodyBold, fontSize: 15, letterSpacing: 0.3 },
  shelf: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: spacing.lg },
  bookCol: { width: "23.5%" }, // 4-up shelf row on wide
  bookColNarrow: { width: "100%" },
  bookCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderLeftWidth: 4,
    borderLeftColor: BLUE,
    overflow: "hidden",
  },
  bookCover: { width: "100%", backgroundColor: SLATE },
  bookBody: { padding: spacing.md },
  // Reserve 2 lines for the title so 1- and 2-line titles keep every card the same height (rows align).
  bookTitle: { color: "#FFFFFF", fontFamily: fonts.heading, fontSize: 18, lineHeight: 23, minHeight: 46, letterSpacing: -0.3 },
  bookTitleWide: { fontSize: 20, lineHeight: 25, minHeight: 50 },
  bookMeta: { color: BLUE, fontFamily: fonts.bodySemi, fontSize: 11, lineHeight: 15, letterSpacing: 0.8, marginTop: 3, textTransform: "uppercase" },
  // Reserve 2 lines (matches numberOfLines={2}) so a short blurb doesn't shrink the card below its neighbour.
  bookBlurb: { color: colors.dsGray, fontFamily: fonts.body, fontSize: 13, lineHeight: 19, minHeight: 38, marginTop: spacing.sm },
  beginRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.md },
  beginText: { color: BLUE, fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 1 },

  // Link list (blue left border)

  // CTA — white pill with black text on the black ground.
  cta: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: radius.pill,
    paddingVertical: 13,
    paddingHorizontal: 22,
    marginTop: spacing.lg,
  },
  ctaText: { fontFamily: fonts.bodyBold, fontSize: 15, letterSpacing: 0.3, color: "#000000" },

  // Footer
  footer: { backgroundColor: colors.dsNavyDeep, borderTopWidth: 8, borderTopColor: BLUE, paddingHorizontal: spacing.lg, paddingVertical: spacing.lg },
  footerInner: { width: "100%", maxWidth: 1160, alignSelf: "center" },
  footerInnerWide: { paddingHorizontal: 40 },
  // Narrow: stacked. Wide: brand left, links right — a compact two-column bar.
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
  // Partner strip — real logos on white plates, sits in the middle of the footer row.
  partners: {},
  partnersLabel: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.bodySemi, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: spacing.sm },
  partnerMarks: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: spacing.md },
  // White plate keeps each logo legible + un-recoloured on the dark footer.
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
  // Sound credit — a clickable card on the navy footer linking out to the music source channel.
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
  // Built-with — grouped in the right column under the Heritage Ledger link so the footer stays short.
  builtWith: { marginTop: spacing.md, gap: spacing.sm, alignItems: "flex-start" }, // left when narrow
  builtWithWide: { alignItems: "flex-end" }, // right-align to match the links when wide
  // Light border so it reads as a subtle credit chip; logo on the dark ground.
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
