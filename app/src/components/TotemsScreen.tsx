import React, { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { Lang } from "../content/types";
import { t } from "../i18n";
import { Screen, ScreenHeader, backLabelFor } from "../ui";
import { SideIndexScroll } from "./SideIndexScroll";
import { totemsIntro, totems, totemsLessons, totemsSources, Totem, TotemEssay } from "../content/totems";
import { spacing, radius, fonts } from "../theme/tokens";

// Totems & Clans — the Cultural Atlas compendium of Southern African totemism, on the shared sidebar
// layout (SideIndexScroll). Sidebar = table of contents (the two opening essays, every totem animal,
// the three governance lessons, and the sources). Content is grounded + cited in content/totems.ts;
// oral origins are framed as tradition. English is the base text; other languages fall back to English
// (the honest-fallback rule) until reviewed. Chrome labels are multilingual.

const BLUE = "#1A85A7";
const num = (i: number) => (i + 1).toString().padStart(2, "0");

const UI = {
  kicker: {
    en: "Heritage", tn: "Boswa", af: "Erfenis", zu: "Amagugu", xh: "Ilifa",
    nso: "Bohwa", st: "Lefa", ss: "Lifa", ts: "Ndzhaka", nr: "Ilifa", ve: "Ifa",
  },
  title: {
    en: "Totems & Clans", tn: "Diboko le Meritlo", af: "Totems & Clans", zu: "Iziboko Nezizwe", xh: "Iziduko Nezizwe",
    nso: "Diboko le Dikgoro", st: "Diboko le Meloko", ss: "Tiboko Netizwe", ts: "Swiharhi swa Tinyimba", nr: "Iimbongo Nezizwe", ve: "Mitupo na Vhorabulasi",
  },
  intro: {
    en: "The zoo-cosmological constitution of Southern African societies — how wild animals became ancestral guardians, lineage markers and a living code of ecological governance. Scroll, or jump to any totem.",
    tn: "Molaotheo wa dibopiwa mo ditšhabeng tsa Aforika Borwa — ka fa diphologolo tsa naga di neng tsa nna badisa ba badimo, matshwao a losika le molao o o tshelang wa tikologo. Menya, kgotsa o tabogele seboko sengwe.",
    af: "Die dier-kosmologiese grondwet van Suider-Afrikaanse gemeenskappe — hoe wilde diere voorouerlike beskermers, afstammelinge-merkers en 'n lewende kode van ekologiese bestuur geword het. Blaai, of spring na enige totem.",
    zu: "Umthethosisekelo wezilwane wemiphakathi yaseNingizimu Afrika — indlela izilwane zasendle ezaba ngabalondolozi bokhokho, izimpawu zosendo nekhodi ephilayo yokuphatha imvelo. Skrola, noma weqele kunoma yisiphi isiboko.",
    xh: "Umgaqo-siseko wezilwanyana weentlalo zaseMzantsi Afrika — indlela izilwanyana zasendle ezaba ngabakhuseli beenkokeli zomlibo nekhowudi ephilayo yolawulo lwendalo. Skrola, okanye utsibele kwisiduko esithile.",
    nso: "Molaotheo wa diphoofolo wa ditšhaba tša Afrika Borwa — ka fao diphoofolo tša naga di ilego tša ba badišabadimo, maswao a leloko le molao wo o phelago wa tikologo. Phetla, goba o fofele seboko sefe goba sefe.",
    st: "Molaotheo wa liphoofolo oa lichaba tsa Afrika Boroa — kamoo liphoofolo tsa naha li ileng tsa fetoha balebeli ba balimo, matšoao a leloko le molao o phelang oa tikoloho. Skrola, kapa u qhomele sebokong sefe kapa sefe.",
    ss: "Umtsetfosisekelo wetilwane wemiphakatsi yaseNingizimu Afrika — indlela tilwane tesiganga letaba ngabavikeli bekhokho, timphawu tesive nekhodi lephilako yekuphatsa imvelo. Skrola, nome weciyele kunome ngukuphi kuboko.",
    ts: "Nawu-msungulo wa swiharhi wa vaaki va Afrika-Dzonga — ndlela leyi swiharhi swa nhoveni swi veke vasirheleri va vakokwana, swikombiso swa nyimba na nawu lowu hanyaka wa mbango. Skhrola, kumbe u tlulela eka xiharhi xihi kumbe xihi.",
    nr: "Umthethosisekelo wezilwana weemphakathi zeSewula Afrika — indlela iinlwana zeganga ezaba ngabavikeli bakhokho, iimpawu zomndeni nekhodi ephilako yokuphatha imvelo. Skrola, namkha weqele kinanyana ngiliphi iboko.",
    ve: "Ndayotewa ya zwipuka ya zwitshavha zwa Afrika Tshipembe — nḓila ye zwipuka zwa ḓaka zwa vha vhalindi vha vhomakhulu, zwiga zwa lushaka na mulayo u tshilaho wa mupo. Skrola, kana ni fhufhele kha mutupo naḓi ufhio.",
  },
  contents: {
    en: "Contents", tn: "Diteng", af: "Inhoud", zu: "Okuqukethwe", xh: "Okuqulethweyo",
    nso: "Dikagare", st: "Dikahare", ss: "Lokucuketfwe", ts: "Leswi nga endzeni", nr: "Okungaphakathi", ve: "Zwi re ngomu",
  },
  clans: {
    en: "Clans", tn: "Meritlo", af: "Stamme", zu: "Izizwe", xh: "Izizwe",
    nso: "Dikgoro", st: "Meloko", ss: "Tizwe", ts: "Tinyimba", nr: "Izizwe", ve: "Vhorabulasi",
  },
  meaning: {
    en: "Meaning", tn: "Bokao", af: "Betekenis", zu: "Incazelo", xh: "Intsingiselo",
    nso: "Tlhaloso", st: "Moelelo", ss: "Incazelo", ts: "Nhlamuselo", nr: "Ihlathululo", ve: "Ṱhaluso",
  },
  languagesLabel: {
    en: "In the languages", tn: "Mo dipuong", af: "In die tale", zu: "Ezilimini", xh: "Kwiilwimi",
    nso: "Ka maleme", st: "Ka dipuo", ss: "Etilwimini", ts: "Eka tindzimi", nr: "Eelimini", ve: "Kha nyambo",
  },
  sourcesTitle: {
    en: "Sources & integrity", tn: "Metswedi le Boikanyego", af: "Bronne & integriteit", zu: "Imithombo Nobuqotho", xh: "Imithombo Nengqibelelo",
    nso: "Methopo le Potego", st: "Mehlodi le Botshepehi", ss: "Imitfombo Nebucotfo", ts: "Swihlovo na Vutshembeki", nr: "Imithombo Nobuqotho", ve: "Zwiko na Fulufhedzea",
  },
  integrity: {
    en: "Oral origin stories are presented as tradition — how communities carry them — not as settled fact. Following the project's integrity rule, grokipedia is not used as a source. Setswana and other-language translations of the descriptions are pending human review.",
    tn: "Dikanegelo tsa ditlholego di tlhagisiwa jaaka ngwao — ka fa ditšhaba di di tshotseng ka teng — e seng jaaka nnete e e feditsweng. Go latela molao wa boikanyego wa porojeke, grokipedia ga e dirisiwe jaaka motswedi. Diphetolelo tsa Setswana le dipuo tse dingwe di sa ntse di letetse tlhatlhobo ya batho.",
    af: "Mondelinge oorsprongstories word as tradisie aangebied — hoe gemeenskappe hulle dra — nie as vasgestelde feit nie. Volgens die projek se integriteitsreël word grokipedia nie as bron gebruik nie. Setswana- en ander vertalings wag op menslike hersiening.",
    zu: "Izindaba zomsuka ezikhulunywayo zethulwa njengesiko — indlela imiphakathi eziphatha ngayo — hhayi njengeqiniso eliqinisekisiwe. Ngokulandela umthetho wobuqotho wephrojekthi, i-grokipedia ayisetshenziswa njengomthombo. Izinguqulo zesiTswana nezinye zilinde ukubuyekezwa ngumuntu.",
    xh: "Amabali omthombo athethwayo aboniswa njengesithethe — indlela izizwe ezisithwala ngayo — hayi njengenyaniso eqinisekisiweyo. Ngokulandela umgaqo wengqibelelo, i-grokipedia ayisetyenziswa njengomthombo. Iinguqulelo zesiTswana nezinye zilinde uphononongo lomntu.",
    nso: "Dikanegelo tša mathomo tša molomo di hlagišwa bjalo ka setšo — ka fao ditšhaba di di swerego — e sego bjalo ka therešo ye e feleditšwego. Go latela molao wa potego wa porotšeke, grokipedia ga e šomišwe bjalo ka mothopo. Diphetolelo tša Setswana le tše dingwe di sa letetše tekolo ya batho.",
    st: "Dipale tsa tshimoloho tsa molomo di hlahisoa joalo ka moetlo — kamoo lichaba li li tšoereng — eseng joalo ka 'nete e phethiloeng. Ho latela molao oa botšepehi oa morero, grokipedia ha e sebelisoe joalo ka mohlodi. Liphetolelo tsa Setswana le tse ling li ntse li emetse tlhahlobo ya batho.",
    ss: "Tindzaba tekucalisa letikhulunywako tetfulwa njengelisiko — indlela imiphakatsi leyitiphatsa ngayo — hhayi njengeliciniso lelicinisekisiwe. Ngekulandzela umtsetfo webucotfo weliphrojekthi, i-grokipedia ayisetjentiswa njengemtfombo. Tinguculo tesiTswana naletinye tisalindze kubuyeketwa ngumuntfu.",
    ts: "Mintsheketo ya masungulo ya nomu yi vekiwa tanihi ndhavuko — ndlela leyi vaaki va yi khomaka — ku nga ri tanihi ntiyiso lowu heteke. Hi ku landzela nawu wa vutshembeki wa projeke, grokipedia a yi tirhisiwi tanihi xihlovo. Vuhundzuluxeri bya Setswana na tindzimi tin'wana byi ha rindzele nkambelo wa vanhu.",
    nr: "Iindaba zomthombo ezikhulunywako zethulwa njengesiko — indlela iimphakathi ezizithwala ngayo — ingasi njengeqiniso eliqinisekisiweko. Ngokulandela umthetho wobuqotho, i-grokipedia ayisetjenziswa njengomthombo. Iinguqulelo zesiTswana neminye zilinde ukubuyekezwa mumuntu.",
    ve: "Zwiṱori zwa mvelaphanḓa zwa mulomo zwi ṋekwa sa sialala — nḓila ye zwitshavha zwi zwi fara ngayo — hu si sa ngoho yo fhelaho. Ri tshi tevhela mulayo wa fulufhedzea wa proḓzheke, grokipedia a i shumiswi sa tshiko. Ṱhalutshedzo dza Setswana na dziṅwe dzi kha ḓi lindela ṱhoḓisiso ya vhathu.",
  },
};

type Item =
  | { kind: "essay"; key: string; label: string; essay: TotemEssay }
  | { kind: "totem"; key: string; label: string; totem: Totem }
  | { kind: "sources"; key: string; label: string };

export function TotemsScreen({ lang, onBack }: { lang: Lang; onBack: () => void }) {
  const { width } = useWindowDimensions();
  const wide = width >= 900;
  // Every photo shares the same WIDTH; its height follows its own real aspect ratio (measured on load)
  // so NOTHING is ever cropped. Default to a common portrait ratio to avoid a layout jump before load.
  const [aspects, setAspects] = useState<Record<string, number>>({});

  const items: Item[] = [
    ...totemsIntro.map((e) => ({ kind: "essay" as const, key: e.id, label: e.title, essay: e })),
    ...totems.map((tt) => ({ kind: "totem" as const, key: tt.id, label: tt.animal, totem: tt })),
    ...totemsLessons.map((e) => ({ kind: "essay" as const, key: e.id, label: e.title, essay: e })),
    { kind: "sources" as const, key: "sources", label: t(UI.sourcesTitle, lang) },
  ];

  const masthead = (
    <View style={s.pad}>
      <ScreenHeader kicker={t(UI.kicker, lang)} title={t(UI.title, lang)} lang={lang} onBack={onBack} showBack={!wide} />
      <Text style={s.intro}>{t(UI.intro, lang)}</Text>
    </View>
  );

  const Header = ({ i }: { i: number }) => (
    <View style={s.head}>
      <Text style={[s.num, wide && s.numWide]}>{num(i)}</Text>
      <View style={s.rule} />
    </View>
  );

  const renderEssay = (e: TotemEssay, i: number) => (
    <View style={s.entry}>
      <Header i={i} />
      <Text style={[s.essayTitle, wide && s.essayTitleWide]}>{e.title}</Text>
      {e.body.map((p, k) => (
        <Text key={k} style={[s.body, wide && s.bodyWide]}>
          {p}
        </Text>
      ))}
      {e.sourceNote ? <Text style={s.source}>{e.sourceNote}</Text> : null}
    </View>
  );

  const Term = ({ label, value }: { label: string; value?: string }) =>
    value ? (
      <View style={s.termChip}>
        <Text style={s.termLabel}>{label}</Text>
        <Text style={s.termValue}>{value}</Text>
      </View>
    ) : null;

  const renderTotem = (tt: Totem, i: number) => (
    <View style={s.entry}>
      <Header i={i} />
      <Text style={[s.totemName, wide && s.totemNameWide]}>{tt.animal}</Text>

      {/* On wide screens: LEFT column = picture + its languages + clans; RIGHT column = meaning, story
          and source filling the space beside it. On mobile it all stacks in the same order. */}
      <View style={wide ? s.totemRow : undefined}>
        <View style={wide ? s.totemLeft : undefined}>
          {/* Uniform width, the photo's OWN height (from its real aspect ratio) → the whole animal
              shows, never cropped. contentFit "contain" guarantees no crop even before measuring. */}
          <View style={[s.imageWrap, { aspectRatio: aspects[tt.id] ?? 0.667 }]}>
            <Image
              source={tt.image}
              style={s.image}
              contentFit="contain"
              transition={220}
              onLoad={(e) => {
                const src = e?.source as { width?: number; height?: number } | undefined;
                if (src?.width && src?.height) {
                  const ar = src.width / src.height;
                  setAspects((a) => (a[tt.id] ? a : { ...a, [tt.id]: ar }));
                }
              }}
            />
          </View>

          <Text style={s.groupLabel}>{t(UI.languagesLabel, lang)}</Text>
          <View style={s.termRow}>
            <Term label="Sotho-Tswana" value={tt.terms.sothoTswana} />
            <Term label="Nguni" value={tt.terms.nguni} />
            <Term label="Tshivenḓa" value={tt.terms.venda} />
          </View>

          <View style={s.metaRow}>
            <Text style={s.metaLabel}>{t(UI.clans, lang)}</Text>
            <Text style={s.metaValue}>{tt.clans}</Text>
          </View>
        </View>

        <View style={wide ? s.totemText : undefined}>
          <Text style={s.metaLabel}>{t(UI.meaning, lang)}</Text>
          <Text style={[s.body, wide && s.bodyWide]}>{tt.meaning}</Text>

          {tt.story?.map((p, k) => (
            <Text key={k} style={[s.body, wide && s.bodyWide]}>
              {p}
            </Text>
          ))}

          <Text style={s.source}>{tt.sourceNote}</Text>
        </View>
      </View>
    </View>
  );

  const renderSources = (i: number) => (
    <View style={s.entry}>
      <Header i={i} />
      <Text style={[s.essayTitle, wide && s.essayTitleWide]}>{t(UI.sourcesTitle, lang)}</Text>
      <Text style={s.integrity}>{t(UI.integrity, lang)}</Text>
      {totemsSources.map((src, k) => (
        <View key={k} style={s.sourceRow}>
          <View style={s.dot} />
          <Text style={s.sourceItem}>{src}</Text>
        </View>
      ))}
    </View>
  );

  const renderItem = (_e: { key: string; label: string }, i: number) => {
    const it = items[i];
    if (it.kind === "essay") return renderEssay(it.essay, i);
    if (it.kind === "totem") return renderTotem(it.totem, i);
    return renderSources(i);
  };

  return (
    <Screen tone="dark" scroll={false} padded={false} contentStyle={s.flex}>
      <SideIndexScroll
        contentsLabel={t(UI.contents, lang)}
        masthead={masthead}
        onBack={onBack}
        backLabel={backLabelFor(lang)}
        items={items.map((it) => ({ key: it.key, label: it.label }))}
        renderItem={renderItem}
        maxWidth={1180}
      />
    </Screen>
  );
}

const s = StyleSheet.create({
  flex: { flex: 1 },
  pad: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  intro: { color: "rgba(255,255,255,0.62)", fontFamily: fonts.serifItalic, fontSize: 16, lineHeight: 24, marginTop: spacing.sm, marginBottom: spacing.md },

  entry: { paddingHorizontal: spacing.lg, marginTop: spacing.xl, marginBottom: spacing.md },
  head: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.md },
  num: { color: BLUE, fontFamily: fonts.display, fontSize: 30, lineHeight: 30, letterSpacing: -1 },
  numWide: { fontSize: 38, lineHeight: 38 },
  rule: { flex: 1, height: 2, backgroundColor: "rgba(255,255,255,0.14)" },

  essayTitle: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 26, lineHeight: 30, letterSpacing: -0.5, marginBottom: spacing.md },
  essayTitleWide: { fontSize: 38, lineHeight: 42 },

  totemName: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 30, lineHeight: 33, letterSpacing: -0.5, marginBottom: spacing.md },
  totemNameWide: { fontSize: 46, lineHeight: 48 },

  // Wide: LEFT column (picture + languages + clans) beside a RIGHT column (meaning + story + source).
  totemRow: { flexDirection: "row", alignItems: "flex-start", gap: spacing.xl },
  totemLeft: { width: 320, flexShrink: 0 },
  totemText: { flex: 1, minWidth: 0 },
  // Uniform width for every picture; height comes from the per-image aspectRatio set inline above.
  imageWrap: { width: "100%", maxWidth: 320, borderRadius: radius.md, overflow: "hidden", backgroundColor: "#0d0d0d", marginBottom: spacing.md },
  image: { width: "100%", height: "100%" },

  groupLabel: { color: "rgba(255,255,255,0.4)", fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: spacing.sm },
  termRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginBottom: spacing.lg },
  termChip: { backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(26,133,167,0.4)", borderRadius: radius.sm, paddingVertical: 8, paddingHorizontal: 12 },
  termLabel: { color: BLUE, fontFamily: fonts.bodyBold, fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 3 },
  termValue: { color: "#FFFFFF", fontFamily: fonts.bodySemi, fontSize: 15 },

  metaRow: { marginBottom: spacing.md },
  metaLabel: { color: "rgba(255,255,255,0.4)", fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: spacing.xs, marginTop: spacing.sm },
  metaValue: { color: "rgba(255,255,255,0.82)", fontFamily: fonts.bodySemi, fontSize: 15, lineHeight: 22 },

  body: { color: "rgba(255,255,255,0.74)", fontFamily: fonts.body, fontSize: 16, lineHeight: 26, marginBottom: spacing.md },
  bodyWide: { fontSize: 17, lineHeight: 28, maxWidth: 680 },

  source: { color: "rgba(255,255,255,0.4)", fontFamily: fonts.serifItalic, fontSize: 13, lineHeight: 20, marginTop: spacing.xs, maxWidth: 680 },

  integrity: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.serifItalic, fontSize: 14, lineHeight: 22, marginBottom: spacing.lg, maxWidth: 680 },
  sourceRow: { flexDirection: "row", alignItems: "flex-start", gap: spacing.sm, marginBottom: spacing.sm, maxWidth: 680 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: BLUE, marginTop: 8 },
  sourceItem: { flex: 1, color: "rgba(255,255,255,0.6)", fontFamily: fonts.body, fontSize: 13, lineHeight: 20 },
});
