import React, { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { Screen, ScreenHeader, Icon, backLabelFor } from "../ui";
import { PlayOnceRow } from "./PlayOnceRow";
import { democraticPresidents, pre1994Leaders, President, LifeEvent } from "../content/presidents";
import { colors, spacing, radius, fonts, type } from "../theme/tokens";
import { t } from "../i18n";
import type { LangCode } from "../i18n";
import { PressScale } from "./Motion";
import { SideIndexScroll } from "./SideIndexScroll";
import { FeatureEntry } from "./FeatureEntry";
import { Journey } from "./Journey";
import { presidentsJourney, CARD_ASPECT } from "../content/journey";

// The Presidents. Democratic era (gold) + pre-1994 heads of state (neutral grey — documented, not
// celebrated). Grounded content in src/content/presidents.ts; hard chapters stated factually.
// Chrome (labels) is localized into all 11 languages; the biographies themselves stay English for now.

// The heritage-series cover card (Union Buildings + flag) — shown as the masthead hero and reused as
// the first slide of the Presidents journey.
const presCover = require("../../assets/journey/pres-cover.webp");


// Jessica Mbangeni's praise poem for Mandela — played ONLY on his detail page. It plays once
// through; the listener replays it themselves. (Static bundled audio — no API quota, no PII.)
const mandelaPoem = require("../../assets/audio/mandela-praise-poem.mp3");

// One AI-illustrated heritage card per leader (same cards the Journey plays), keyed by content id.
// Used as each leader's picture in the overview list and on their detail page; the initials
// monogram remains the fallback for any leader without a card.
const leaderCards: Record<string, number> = {
  mandela: require("../../assets/journey/pres-mandela.webp"),
  mbeki: require("../../assets/journey/pres-mbeki.webp"),
  motlanthe: require("../../assets/journey/pres-motlanthe.webp"),
  zuma: require("../../assets/journey/pres-zuma.webp"),
  ramaphosa: require("../../assets/journey/pres-ramaphosa.webp"),
  "louis-botha": require("../../assets/journey/pres-louis-botha.webp"),
  "jan-smuts": require("../../assets/journey/pres-smuts.webp"),
  hertzog: require("../../assets/journey/pres-hertzog.webp"),
  malan: require("../../assets/journey/pres-malan.webp"),
  strijdom: require("../../assets/journey/pres-strijdom.webp"),
  verwoerd: require("../../assets/journey/pres-verwoerd.webp"),
  vorster: require("../../assets/journey/pres-vorster.webp"),
  "pw-botha": require("../../assets/journey/pres-pw-botha.webp"),
  "de-klerk": require("../../assets/journey/pres-de-klerk.webp"),
};

const UI = {
  kicker: {
    en: "Democratic South Africa", tn: "Aforika Borwa ya Temokrasi", af: "Demokratiese Suid-Afrika", zu: "INingizimu Afrika Yentando Yeningi", xh: "UMzantsi Afrika Wentando Yesininzi",
    nso: "Afrika Borwa ya Temokrasi", st: "Afrika Borwa ya Demokrasi", ss: "INingizimu Afrika Yentsandvo Yelinyenti", ts: "Afrika-Dzonga ya Xidemokrasi", nr: "ISewula Afrika Yentando Yenengi", ve: "Afrika Tshipembe ya Demokirasi",
  },
  title: {
    en: "The Presidents", tn: "Dipresidente", af: "Die Presidente", zu: "Abongameli", xh: "Iimongameli",
    nso: "Dipresidente", st: "Dipresidente", ss: "BoMengameli", ts: "Vapresidente", nr: "AboMongameli", ve: "Vhapresidente",
  },
  intro: {
    en: "Since the first free election in 1994, five presidents have led South Africa — each through a different chapter, from liberation to the work still unfinished.",
    tn: "Go tloga ka ditlhopho tsa ntlha tsa kgololosego ka 1994, dipresidente tse tlhano di eteletse Aforika Borwa pele — mongwe le mongwe ka kgaolo e e farologaneng.",
    af: "Sedert die eerste vrye verkiesing in 1994 het vyf presidente Suid-Afrika gelei — elk deur 'n ander hoofstuk, van bevryding tot die werk wat steeds onvoltooid is.",
    zu: "Kusukela okhethweni lokuqala olukhululekile ngo-1994, abongameli abahlanu bahole iNingizimu Afrika — ngamunye ngesahluko esihlukene, kusukela enkululekweni kuya emsebenzini osasele.",
    xh: "Ukususela kunyulo lokuqala olukhululekileyo ngo-1994, iimongameli ezintlanu zikhokele uMzantsi Afrika — nganye ngesahluko esahlukileyo, ukususela kwinkululeko ukuya kumsebenzi osengekagqitywa.",
    nso: "Go tloga dikgethong tša mathomo tša tokologo ka 1994, dipresidente tše hlano di eteletše Afrika Borwa pele — yo mongwe le yo mongwe ka kgaolo ye e fapanego, go tloga tokologong go fihla mošomong wo o sa fetšwego.",
    st: "Ho tloha likhethong tsa pele tsa bolokolohi ka 1994, dipresidente tse hlano di etelletse Afrika Borwa pele — e mong le e mong ka khaolo e fapaneng, ho tloha tokolohong ho isa mosebetsing o sa phethoang.",
    ss: "Kusukela elukhetsweni lwekucala lolukhululekile nga-1994, boMengameli labasihlanu bahole iNingizimu Afrika — ngamunye ngesehluko lesehlukene, kusukela enkhululekweni kuya emsebentini losasele.",
    ts: "Ku sukela enhlawulweni yo sungula ya ntshunxeko hi 1994, vapresidente va ntlhanu va rhangele Afrika-Dzonga — un'wana ni un'wana hi ndzima yo hambana, ku sukela entshunxekweni ku ya entirhweni lowu nga si heriki.",
    nr: "Kusukela ekhetjhweni lokuthoma elikhululekileko ngo-1994, aboMongameli abahlanu bakhokhele iSewula Afrika — munye nomunye ngesahluko esahlukileko, kusukela ekukhululekeni kuya emsebenzini osasele.",
    ve: "U bva khethoni ya u thoma ya mbofholowo nga 1994, vhapresidennde vhaṱanu vho ranga phanḓa Afrika Tshipembe — muṅwe na muṅwe nga ndima yo fhambanaho, u bva kha mbofholowo u swika mushumoni u songo fhelaho.",
  },
  beforeDemocracy: {
    en: "Before democracy", tn: "Pele ga temokrasi", af: "Voor demokrasie", zu: "Ngaphambi kwentando yeningi", xh: "Phambi kwedemokhrasi",
    nso: "Pele ga temokrasi", st: "Pele ho demokrasi", ss: "Ngaphambi kwentsandvo yelinyenti", ts: "Emahlweni ka xidemokrasi", nr: "Ngaphambi kwentando yenengi", ve: "Phanḓa ha demokirasi",
  },
  beforeDemocracySub: {
    en: "Leaders of the Union and the apartheid state, 1910–1994. Recorded honestly — neither erased nor celebrated.",
    tn: "Baeteledipele ba Kopano le puso ya tlhaolele, 1910–1994. Go kwadilwe ka boammaaruri — ga di a phimolwa kgotsa go ketekwa.",
    af: "Leiers van die Unie en die apartheidstaat, 1910–1994. Eerlik aangeteken — nie uitgevee of gevier nie.",
    zu: "Abaholi beNyunyana nombuso wobandlululo, 1910–1994. Kubhalwe ngokwethembeka — akususiwanga futhi akugujwanga.",
    xh: "Iinkokeli zoManyano nombuso wocalucalulo, 1910–1994. Kubhalwe ngokunyaniseka — akucinywanga kwaye akubhiyozelwanga.",
    nso: "Baetapele ba Kopano le mmušo wa kgethollo, 1910–1994. Go ngwadilwe ka potego — ga se gwa phumolwa goba gwa ketekwa.",
    st: "Baetapele ba Kopano le mmuso oa khethollo, 1910–1994. Ho ngotsoe ka botshepehi — ha ho a hlakoloa kapa ha keteka.",
    ss: "Baholi beNyunyana nembuso webandlululo, 1910–1994. Kubhalwe ngekwetsembeka — akususiwanga futsi akugujwanga.",
    ts: "Varhangeri va Vun'we ni mfumo wa xihlawuhlawu, 1910–1994. Swi tsariwile hi ku tshembeka — a swi suriwanga kumbe ku tlangeriwa.",
    nr: "Abarholi beNyunyana nombuso wehlukaniso, 1910–1994. Kutlolwe ngokwethembeka — akususiwanga namkha kugidingelwa.",
    ve: "Vharangaphanḓa vha Muvhofho na muvhuso wa tshiṱalula, 1910–1994. Zwo ṅwaliwa nga u fulufhedzea — a zwo ngo siswa kana u pembelelwa.",
  },
  born: { en: "Born", tn: "O tsetswe", af: "Gebore", zu: "Wazalwa", xh: "Wazalwa", nso: "O belegwe", st: "O hlahile", ss: "Watalwa", ts: "U velekiwile", nr: "Wabelethwa", ve: "O bebwa" },
  died: { en: "Died", tn: "O tlhokafetse", af: "Oorlede", zu: "Washona", xh: "Wasweleka", nso: "O hlokofetše", st: "O hlokahetse", ss: "Washona", ts: "U lovile", nr: "Wahlongakala", ve: "O lovha" },
  inOffice: { en: "In office", tn: "Mo ofising", af: "In amp", zu: "Esikhundleni", xh: "Esikhundleni", nso: "Mošomong", st: "Ofising", ss: "Esikhundleni", ts: "Entirhweni", nr: "Esikhundleni", ve: "Mushumoni" },
  party: { en: "Party", tn: "Mokgatlho", af: "Party", zu: "Iqembu", xh: "Iqela", nso: "Mokgatlo", st: "Mokga", ss: "Licembu", ts: "Vandla", nr: "Iqembu", ve: "Ḽihoro" },
  theRecord: { en: "The record", tn: "Rekoto", af: "Die rekord", zu: "Umlando", xh: "Ingxelo", nso: "Rekoto", st: "Rekoto", ss: "Umlandvo", ts: "Rhekhodo", nr: "Umlando", ve: "Rekhodo" },
  theStruggle: { en: "The struggle", tn: "Ntwa", af: "Die stryd", zu: "Umzabalazo", xh: "Umzabalazo", nso: "Ntwa", st: "Ntoa", ss: "Umzabalazo", ts: "Nyimpi", nr: "Umzabalazo", ve: "Nndwa" },
  whatToKnow: { en: "What to know", tn: "Se o tshwanetseng go se itse", af: "Wat om te weet", zu: "Okumele ukwazi", xh: "Into omele uyazi", nso: "Seo o swanetšego go se tseba", st: "Seo o lokelang ho se tseba", ss: "Lokufanele ukwati", ts: "Leswi u faneleke u swi tiva", nr: "Okufanele ukwazi", ve: "Zwine na fanela u zwi ḓivha" },
  aLife: { en: "A life", tn: "Botshelo", af: "'n Lewe", zu: "Impilo", xh: "Ubomi", nso: "Bophelo", st: "Bophelo", ss: "Kuphila", ts: "Vutomi", nr: "Ukuphila", ve: "Vhutshilo" },
  family: { en: "Family", tn: "Lelapa", af: "Familie", zu: "Umndeni", xh: "Usapho", nso: "Lapa", st: "Lelapa", ss: "Umndeni", ts: "Ndyangu", nr: "Umndeni", ve: "Muṱa" },
  inContext: { en: "In context", tn: "Mo seemong", af: "In konteks", zu: "Kumongo", xh: "Kumxholo", nso: "Ka seemo", st: "Ka moelelo", ss: "Kumongo", ts: "Eka mongo", nr: "Emongweni", ve: "Kha zwithu" },
  everyoneShouldKnow: {
    en: "What every South African should know",
    tn: "Se Moaforika Borwa mongwe le mongwe a tshwanetseng go se itse",
    af: "Wat elke Suid-Afrikaner moet weet", zu: "Okumele wonke umuntu waseNingizimu Afrika akwazi", xh: "Into omele wonke umMzantsi Afrika ayazi",
    nso: "Seo Moafrika Borwa yo mongwe le yo mongwe a swanetšego go se tseba", st: "Seo Moafrika Borwa e mong le e mong a lokelang ho se tseba", ss: "Loko wonkhe umuntfu waseNingizimu Afrika lokufanele akwati", ts: "Leswi Muafrika-Dzonga un'wana ni un'wana a faneleke a swi tiva", nr: "Lokho woke umMzantsi Afrika okufanele akwazi", ve: "Zwine muṅwe na muṅwe wa Afrika Tshipembe a fanela u zwi ḓivha",
  },
  yourMemoryOf: { en: "Your memory of", tn: "Kgakologelo ya gago ka", af: "Jou herinnering aan", zu: "Inkumbulo yakho ka", xh: "Inkumbulo yakho ka", nso: "Kgopolo ya gago ya", st: "Mohopolo wa hao wa", ss: "Inkhumbulo yakho ya", ts: "Xitsundzuxo xa wena xa", nr: "Inkumbulo yakho ka", ve: "Tshihumbulo tshaṋu tsha" },
  memoryHint: {
    en: "Record where you were, what it meant to your family",
    tn: "Gatisa kwa o neng o le teng, se se neng se raya lelapa la gago",
    af: "Neem op waar jy was, wat dit vir jou familie beteken het", zu: "Qopha ukuthi wawukuphi, kwakusho ukuthini emndenini wakho", xh: "Rekhoda apho wawukhona, into eyayithetha kusapho lwakho",
    nso: "Gatiša moo o bego o le gona, seo se bego se e ra go lapa la gago", st: "Rekota moo o neng o le teng, seo se neng se bolela ho lelapa la hao", ss: "Bhala lapho bewukhona, lokwakusho khona emndenini wakho", ts: "Rhekhoda laha a wu ri kona, leswi a swi vula eka ndyangu wa wena", nr: "Bhala lapho obukhona, obekutjho khona emndenini wakho", ve: "Rekhoda hune na vha ni hone, zwe zwa amba zwone kha muṱa waṋu",
  },
  howWeSource: {
    en: "How we source this", tn: "Ka moo re bonang se ka gone", af: "Hoe ons dit bekom", zu: "Indlela esithola ngayo lokhu", xh: "Indlela esifumana ngayo oku",
    nso: "Ka moo re hwetšago se ka gona", st: "Kamoo re fumanang sena ka teng", ss: "Indlela lesitfola ngayo loku", ts: "Ndlela leyi hi kumaka leswi ha yona", nr: "Indlela esikuthola ngayo lokhu", ve: "Nḓila ine ra wana ngayo hezwi",
  },
  contents: {
    en: "Presidents", tn: "Dipresidente", af: "Presidente", zu: "Abongameli", xh: "Iimongameli",
    nso: "Dipresidente", st: "Dipresidente", ss: "BoMengameli", ts: "Vapresidente", nr: "AboMongameli", ve: "Vhapresidente",
  },
  readStory: {
    en: "Read the story", tn: "Bala kanegelo", af: "Lees die verhaal", zu: "Funda indaba", xh: "Funda ibali",
    nso: "Bala kanegelo", st: "Bala pale", ss: "Fundza indzaba", ts: "Hlaya ntsheketo", nr: "Funda indaba", ve: "Vhala tshiitwa",
  },
  playJourney: { en: "Play the Journey", tn: "Bona Loeto", af: "Speel die Reis", zu: "Dlala Uhambo", xh: "Dlala Uhambo", nso: "Bapala Leeto", st: "Bapala Leeto", ss: "Dlala Luhambo", ts: "Tlanga Riendzo", nr: "Dlala Ikhambo", ve: "Tambani Lwendo" },
  // "Praise poem" — each language's own name for the praise-poetry genre.
  praisePoem: { en: "Praise poem", tn: "Leboko", af: "Prysgedig", zu: "Izibongo", xh: "Izibongo", nso: "Sereto", st: "Dithoko", ss: "Tibongo", ts: "Xiphato", nr: "Iimbongo", ve: "Tshikhodo" },
  importantDates: {
    en: "Important dates", tn: "Malatsi a botlhokwa", af: "Belangrike datums", zu: "Izinsuku ezibalulekile", xh: "Imihla ebalulekileyo",
    nso: "Matšatši a bohlokwa", st: "Matsatsi a bohlokwa", ss: "Emalanga labalulekile", ts: "Masiku ya nkoka", nr: "Amalanga aqakathekileko", ve: "Maḓuvha a ndeme",
  },
};

// ---------- Overview ----------
export function PresidentsScreen({ onBack, onOpen, lang }: { onBack: () => void; onOpen: (id: string) => void; lang: LangCode }) {
  const { width } = useWindowDimensions();
  const wide = width >= 900;
  const [journeyOpen, setJourneyOpen] = useState(false);
  const all = [...democraticPresidents, ...pre1994Leaders];
  const demCount = democraticPresidents.length;
  const masthead = (
    <View style={s.pad}>
      <ScreenHeader kicker={t(UI.kicker, lang)} title={t(UI.title, lang)} lang={lang} onBack={onBack} showBack={!wide} />
      <View style={s.coverWrap}>
        <Image source={presCover} style={s.cover} contentFit="cover" transition={200} cachePolicy="disk" accessibilityLabel={t(UI.title, lang)} />
      </View>
      <Text style={s.intro}>{t(UI.intro, lang)}</Text>
      <Pressable style={s.journeyBtn} onPress={() => setJourneyOpen(true)} accessibilityLabel={t(UI.playJourney, lang)}>
        <Icon.Play size={17} color="#000000" fill="#000000" />
        <Text style={s.journeyBtnText}>{t(UI.playJourney, lang)}</Text>
      </Pressable>
    </View>
  );
  const renderLeader = (_item: { key: string; label: string }, i: number) => {
    const p = all[i];
    const hist = p.era === "pre1994";
    const card = leaderCards[p.id];
    return (
      <View>
        {/* the "Before democracy" divider sits above the first pre-1994 leader */}
        {i === demCount && (
          <View style={s.pad}>
            <View style={s.sectionHead}>
              <View style={s.sectionRow}><View style={s.tick} /><Text style={s.sectionLabel}>{t(UI.beforeDemocracy, lang)}</Text></View>
              <Text style={s.sectionSub}>{t(UI.beforeDemocracySub, lang)}</Text>
            </View>
          </View>
        )}
        <FeatureEntry
          index={i}
          kicker={`${p.term}${p.party ? ` · ${p.party}` : ""}`}
          title={p.name}
          lead={p.struggle || p.role}
          leadLines={3}
          ctaLabel={t(UI.readStory, lang)}
          onPress={() => onOpen(p.id)}
          wide={wide}
          visualAspect={card ? CARD_ASPECT : undefined}
          visual={
            card ? (
              // Explicit 100% sizing (not absoluteFill) — react-native-web can render an
              // absolute-filled image at its native pixel size inside an aspect-ratio box,
              // which crops the card. The masthead covers use this same pattern and show in full.
              <Image source={card} style={s.cardImg} contentFit="cover" transition={200} cachePolicy="disk" accessibilityLabel={p.name} />
            ) : (
              <View style={[StyleSheet.absoluteFill, s.monoPanel, hist && s.monoPanelHist]}>
                <Text style={[s.monoBig, hist && s.monoBigHist]}>{p.mono}</Text>
              </View>
            )
          }
        />
      </View>
    );
  };
  return (
    <Screen tone="dark" scroll={false} padded={false} contentStyle={s.flexFill}>
      <SideIndexScroll
        contentsLabel={t(UI.contents, lang)}
        masthead={masthead}
        onBack={onBack}
        backLabel={backLabelFor(lang)}
        items={all.map((p) => ({ key: p.id, label: p.name }))}
        renderItem={renderLeader}
      />
      <Modal visible={journeyOpen} animationType="fade" onRequestClose={() => setJourneyOpen(false)}>
        <Journey slides={presidentsJourney} lang={lang} onClose={() => setJourneyOpen(false)} />
      </Modal>
    </Screen>
  );
}

// ---------- Detail ----------
export function PresidentScreen({ president, onBack, onArchive, lang }: { president: President; onBack: () => void; onArchive?: () => void; lang: LangCode }) {
  const p = president;
  const hist = p.era === "pre1994";
  const card = leaderCards[p.id];
  const life = p.life ?? [];
  const tiles: { label: string; value: string }[] = [];
  if (p.born) tiles.push({ label: t(UI.born, lang), value: p.born });
  if (p.died) tiles.push({ label: t(UI.died, lang), value: p.died });
  if (p.term) tiles.push({ label: t(UI.inOffice, lang), value: p.term.replace("PM · ", "").replace("State President · ", "") });
  if (p.party) tiles.push({ label: t(UI.party, lang), value: p.party });

  // Masthead: hero card, praise poem (Mandela), fact tiles and the struggle/record — the sidebar's
  // clickable dates then index the life timeline below, exactly like the other section pages.
  const masthead = (
    <View style={s.pad}>
      <View style={s.hero}>
        <Pressable style={s.heroBack} onPress={onBack} hitSlop={12}><Icon.ChevronLeft size={22} color="#fff" strokeWidth={2.4} /></Pressable>
        {card ? (
          <Image source={card} style={s.heroCard} contentFit="cover" transition={200} cachePolicy="disk" accessibilityLabel={p.name} />
        ) : (
          <View style={[s.heroMono, hist && s.portraitHist]}>
            <Text style={[s.heroMonoText, hist && s.monoHist]}>{p.mono}</Text>
          </View>
        )}
        <Text style={s.heroName}>{p.name}</Text>
        {p.clan ? <Text style={s.heroClan}>{p.clan}</Text> : null}
        <View style={[s.heroTerm, hist && { borderColor: "rgba(255,255,255,0.3)" }]}>
          <Text style={[s.heroTermText, hist && { color: "rgba(255,255,255,0.7)" }]}>{p.term}</Text>
        </View>
      </View>

      {/* Mandela only — his praise poem, performed by Jessica Mbangeni */}
      {p.id === "mandela" ? (
        <View style={{ marginBottom: spacing.md }}>
          <PlayOnceRow source={mandelaPoem} title={t(UI.praisePoem, lang)} by="Jessica Mbangeni" lang={lang} />
        </View>
      ) : null}

      {tiles.length > 0 && (
        <View style={s.tileGrid}>
          {tiles.map((t, i) => (
            <View key={i} style={s.tile}>
              <Text style={s.tileV}>{t.value}</Text>
              <Text style={s.tileL}>{t.label}</Text>
            </View>
          ))}
        </View>
      )}

      {p.struggle ? (<><Label text={hist ? t(UI.theRecord, lang) : t(UI.theStruggle, lang)} /><Text style={s.para}>{p.struggle}</Text></>) : (
        <><Label text={t(UI.whatToKnow, lang)} /><Text style={s.para}>{p.role}</Text></>
      )}

    </View>
  );

  // Everything after the timeline — rendered beneath the final date entry.
  const rest = (
    <>
      {p.family && p.family.length > 0 && (
        <>
          <Label text={t(UI.family, lang)} />
          <View style={s.chipRow}>
            {p.family.map((f, i) => (
              <View key={i} style={s.famChip}>
                <Text style={s.famRel}>{f.rel}</Text>
                <Text style={s.famName}>{f.name}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {p.know && p.know.length > 0 && (
        <>
          <Label text={hist ? t(UI.inContext, lang) : t(UI.everyoneShouldKnow, lang)} />
          <View style={{ gap: spacing.sm }}>
            {p.know.map((k, i) => (
              <View key={i} style={s.knRow}>
                <View style={s.knDot} />
                <Text style={s.knText}>{k}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {p.quote ? (
        <View style={s.quote}>
          <Text style={s.quoteText}>&ldquo;{p.quote.text}&rdquo;</Text>
          <Text style={s.quoteAttr}>— {p.quote.attr}</Text>
        </View>
      ) : null}

      {!hist && onArchive ? (
        <PressScale style={s.archive} onPress={onArchive}>
          <View style={s.archiveMicWrap}><Icon.Mic size={19} color={colors.gold} /></View>
          <View style={{ flex: 1 }}>
            <Text style={s.archiveH}>{t(UI.yourMemoryOf, lang)} {p.name.split(" ").slice(-1)[0]}</Text>
            <Text style={s.archiveS}>{t(UI.memoryHint, lang)}</Text>
          </View>
          <Icon.ChevronRight size={20} color={colors.gold} />
        </PressScale>
      ) : null}

      {p.sources ? (
        <View style={s.srcNote}>
          <Text style={s.srcH}>{t(UI.howWeSource, lang)}</Text>
          <Text style={s.srcT}>{p.sources}</Text>
        </View>
      ) : null}
    </>
  );

  // The same editorial index layout as every other section page: on wide screens the left sidebar
  // lists the leader's IMPORTANT DATES — clickable, with the active date highlighted as you scroll —
  // and on mobile it's a clean single-column scroll. Leaders without a timeline get a single
  // "record" entry so the rest of their page still renders.
  const items =
    life.length > 0
      ? life.map((l) => ({ key: `${l.when}-${l.name}`, label: `${l.when} · ${l.name}` }))
      : [{ key: "record", label: t(hist ? UI.inContext : UI.whatToKnow, lang) }];

  return (
    <Screen tone="dark" scroll={false} padded={false} contentStyle={s.flexFill}>
      <SideIndexScroll
        contentsLabel={t(UI.importantDates, lang)}
        masthead={masthead}
        items={items}
        renderItem={(_it, i) => {
          const l = life[i];
          const isLast = i === items.length - 1;
          return (
            <View style={s.pad}>
              {i === 0 && l ? <Label text={t(UI.aLife, lang)} /> : null}
              {l ? <Timeline item={l} last={i === life.length - 1} /> : null}
              {isLast ? rest : null}
            </View>
          );
        }}
      />
    </Screen>
  );
}

function Label({ text }: { text: string }) {
  return (
    <View style={s.sectionHead}>
      <View style={s.sectionRow}><View style={s.tick} /><Text style={s.sectionLabel}>{text}</Text></View>
    </View>
  );
}
function Timeline({ item, last }: { item: LifeEvent; last: boolean }) {
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
        {item.role ? <Text style={s.tlRole}>{item.role}</Text> : null}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  intro: { color: "rgba(255,255,255,0.62)", fontFamily: fonts.serifItalic, fontSize: 15, lineHeight: 22, marginBottom: spacing.lg },
  // Masthead hero — the Presidents cover card. Native aspect ratio (≈16:9) so the baked-in border
  // is never cropped; capped and centred so it stays a poster, not a billboard, on wide screens.
  coverWrap: { width: "100%", maxWidth: 720, aspectRatio: CARD_ASPECT, alignSelf: "center", borderRadius: radius.lg, overflow: "hidden", backgroundColor: "#0e0e0e", marginTop: spacing.md, marginBottom: spacing.lg },
  cover: { width: "100%", height: "100%" },
  cardImg: { width: "100%", height: "100%" },
  flexFill: { flex: 1 },
  pad: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  journeyBtn: { flexDirection: "row", alignItems: "center", gap: spacing.sm, alignSelf: "flex-start", backgroundColor: "#FFFFFF", borderRadius: radius.pill, paddingVertical: 12, paddingHorizontal: 20 },
  journeyBtnText: { color: "#000000", fontFamily: fonts.bodyBold, fontSize: 15, letterSpacing: 0.3 },
  // Monogram panel used as the "feature image" (presidents have no photos — initials on a dark ground).
  monoPanel: { alignItems: "center", justifyContent: "center", backgroundColor: "#0e0e0e" },
  monoPanelHist: { backgroundColor: "#0a0a0a" },
  monoBig: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 92, letterSpacing: 2 },
  monoBigHist: { color: "rgba(255,255,255,0.32)" },

  // Kept for the detail hero's monogram fallback (leaders without a card).
  portraitHist: { borderColor: "rgba(255,255,255,0.22)" },
  monoHist: { color: "rgba(255,255,255,0.66)" },

  sectionHead: { marginTop: spacing.xl, marginBottom: spacing.md },
  sectionRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  tick: { width: 15, height: 3, borderRadius: 2, backgroundColor: colors.orange },
  sectionLabel: { color: "#fff", fontFamily: fonts.displaySemi, fontSize: 15, letterSpacing: 1, textTransform: "uppercase" },
  sectionSub: { color: "rgba(255,255,255,0.55)", fontFamily: fonts.body, fontSize: type.small, lineHeight: 18, marginTop: 6 },
  para: { color: "rgba(255,255,255,0.72)", fontFamily: fonts.body, fontSize: type.body, lineHeight: 25 },

  hero: { alignItems: "center", justifyContent: "center", paddingVertical: spacing.xl, backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", borderRadius: radius.lg, marginBottom: spacing.md },
  heroBack: { position: "absolute", top: 12, left: 12, zIndex: 2, width: 36, height: 36, borderRadius: radius.pill, backgroundColor: "rgba(0,0,0,0.45)", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
  // The leader's heritage card as the detail hero — native ≈16:9 so the baked-in frame isn't cropped.
  heroCard: { width: "92%", maxWidth: 560, aspectRatio: CARD_ASPECT, borderRadius: radius.md, overflow: "hidden", backgroundColor: "#0c0c0c" },
  heroMono: { width: 92, height: 92, borderRadius: 46, alignItems: "center", justifyContent: "center", backgroundColor: "#0c0c0c", borderWidth: 2, borderColor: "rgba(235,164,60,0.6)" },
  heroMonoText: { fontFamily: fonts.display, fontSize: 40, color: colors.gold },
  heroName: { color: "#fff", fontFamily: fonts.display, fontSize: 30, textTransform: "uppercase", marginTop: spacing.md, textAlign: "center", paddingHorizontal: spacing.md },
  heroClan: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.serifItalic, fontSize: 14, marginTop: 4 },
  heroTerm: { marginTop: spacing.md, borderWidth: 1, borderColor: "rgba(235,164,60,0.5)", borderRadius: radius.pill, paddingVertical: 5, paddingHorizontal: 14 },
  heroTermText: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1, textTransform: "uppercase" },

  tileGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: spacing.xs },
  tile: { width: "48.5%", backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  tileV: { color: "#fff", fontFamily: fonts.serif, fontSize: 15 },
  tileL: { color: "rgba(255,255,255,0.55)", fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 0.4, textTransform: "uppercase", marginTop: 5 },

  tlItem: { flexDirection: "row", gap: spacing.md },
  tlRail: { alignItems: "center" },
  tlDot: { width: 12, height: 12, borderRadius: 6, marginTop: 3 },
  tlLine: { width: 2, flex: 1, backgroundColor: "rgba(255,255,255,0.15)", marginVertical: 2 },
  tlWhen: { color: colors.orange, fontFamily: fonts.bodyBold, fontSize: 11 },
  tlName: { color: "#fff", fontFamily: fonts.serif, fontSize: 15, marginTop: 1 },
  tlRole: { color: "rgba(255,255,255,0.58)", fontFamily: fonts.body, fontSize: 12, lineHeight: 17, marginTop: 2 },

  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  famChip: { backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: radius.md, paddingVertical: 9, paddingHorizontal: 13 },
  famRel: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 9, letterSpacing: 0.4, textTransform: "uppercase" },
  famName: { color: "#fff", fontFamily: fonts.body, fontSize: 13, marginTop: 2 },

  knRow: { flexDirection: "row", gap: spacing.sm },
  knDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.gold, marginTop: 7 },
  knText: { flex: 1, color: "rgba(255,255,255,0.82)", fontFamily: fonts.body, fontSize: 13, lineHeight: 20 },

  quote: { marginTop: spacing.lg, borderLeftWidth: 3, borderLeftColor: colors.gold, paddingLeft: spacing.md },
  quoteText: { color: "#fff", fontFamily: fonts.serifItalic, fontSize: 18, lineHeight: 25 },
  quoteAttr: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginTop: 10 },


  archive: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.lg, backgroundColor: "#0a0a0a", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: radius.md, padding: spacing.md },
  archiveMicWrap: { width: 42, height: 42, borderRadius: 12, backgroundColor: "rgba(217,106,28,0.18)", borderWidth: 1, borderColor: "rgba(235,164,60,0.4)", alignItems: "center", justifyContent: "center" },
  archiveH: { color: "#fff", fontFamily: fonts.bodyBold, fontSize: 14 },
  archiveS: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.body, fontSize: 12, marginTop: 2 },

  srcNote: { marginTop: spacing.lg, backgroundColor: "rgba(217,106,28,0.07)", borderLeftWidth: 3, borderLeftColor: colors.orange, borderRadius: 8, padding: spacing.md },
  srcH: { color: colors.orange, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1, textTransform: "uppercase" },
  srcT: { color: "rgba(255,255,255,0.62)", fontFamily: fonts.body, fontSize: 12, lineHeight: 18, marginTop: 6 },
});
