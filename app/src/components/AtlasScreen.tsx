import React, { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, Modal, StyleSheet, useWindowDimensions, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Lang } from "../content/types";
import { atlasModules } from "../content";
import { sceneImageSource } from "../content/images";
import { t } from "../i18n";
import { Screen, ScreenHeader, Icon, backLabelFor } from "../ui";
import { SceneImage } from "./SceneImage";
import { PressScale } from "./Motion";
import { SideIndexScroll } from "./SideIndexScroll";
import { AtlasRooms } from "./AtlasRooms";
import { FeatureEntry } from "./FeatureEntry";
import { Journey } from "./Journey";
import { atlasJourney } from "../content/journey";
import { spacing, radius, fonts } from "../theme/tokens";

// Cultural Atlas overview — EDITORIAL magazine layout with a STICKY LEFT INDEX (01…N + heading) on wide
// screens: click an item to jump to that feature; the active feature is highlighted as you scroll. A
// sticky search bar filters live. Scales as the atlas grows. Each entry opens in the Reader.

const PHOTO =
  "warm documentary photography, golden natural light, photorealistic, dignified African subjects, rich colour";

const UI = {
  kicker: {
    en: "Heritage", tn: "Boswa", af: "Erfenis", zu: "Amagugu", xh: "Ilifa",
    nso: "Bohwa", st: "Lefa", ss: "Lifa", ts: "Ndzhaka", nr: "Ilifa", ve: "Ifa",
  },
  title: {
    en: "Cultural Atlas", tn: "Atlase ya Setso", af: "Kulturele Atlas", zu: "I-Athrasi Yamasiko", xh: "I-Atlasi Yenkcubeko",
    nso: "Athlase ya Setšo", st: "Atlase ya Setso", ss: "I-Athlasi Yemasiko", ts: "Atlasi ya Ndhavuko", nr: "I-Atlasi Yesiko", ve: "Athilasi ya Mvelele",
  },
  intro: {
    en: "The history, customs and heroes behind the literature — grounded and cited. Search or scroll; tap any feature to read it in full.",
    tn: "Hisitori, ngwao le bagaki ba ba mo tlase ga dingwalo — di theilwe mo metsweding. Batla kgotsa o menye; tobetsa karolo go e bala.",
    af: "Die geskiedenis, gebruike en helde agter die letterkunde — gegrond en aangehaal. Soek of blaai; tik enige artikel om dit ten volle te lees.",
    zu: "Umlando, amasiko namaqhawe angemuva kwezincwadi — kusekelwe futhi kucashunwe. Sesha noma uskrole; thepha noma yisiphi isici ukuze usifunde sonke.",
    xh: "Imbali, amasiko namaqhawe angasemva koncwadi — kusekelwe kwaye kucatshuliwe. Khangela okanye ujikeleze; cofa nasiphi na isiqwenga ukuze usifunde sonke.",
    nso: "Histori, meetlo le bagale ka morago ga dingwalo — go theilwe le go tsopolwa. Nyaka goba o phetle; kgotla karolo efe goba efe go e bala ka botlalo.",
    st: "Histori, meetlo le bahale ka morao ho dingoliloeng — e thehilwe le ho qotswa. Batla kapa o phetle; tobetsa karolo efe kapa efe ho e bala ka botlalo.",
    ss: "Umlandvo, emasiko nemacawe langemuva kwetincwadzi — kusekelwe futsi kucashunwe. Sesha nome uskrole; cindzetela nome ngukuphi kwesici ukukufundza konkhe.",
    ts: "Matimu, mikhuva ni tinhenha endzhaku ka matsalwa — swi simekiwile naswona swi tshahiwile. Lava kumbe u skhrola; tinya xiyenge xihi kumbe xihi ku xi hlaya hinkwaxo.",
    nr: "Umlando, amasiko namaqhawe angemva kweencwadi — kusekelwe begodu kucatjhulwe. Sesa namkha uskrole; gandelela nanyana ngisiphi isahluko ukusifunda soke.",
    ve: "Ḓivhazwakale, mikhuvha na vhahali nga murahu ha maṅwalwa — zwo thewaho na u redzwa. Ṱoḓani kana ni khou skrola; kwamani tshipiḓa naḓi tshifhio u tshi vhala tshoṱhe.",
  },
  read: {
    en: "Read the feature", tn: "Bala karolo", af: "Lees die artikel", zu: "Funda isici", xh: "Funda isiqwenga",
    nso: "Bala karolo", st: "Bala karolo", ss: "Fundza sici", ts: "Hlaya xiyenge", nr: "Funda isahluko", ve: "Vhala tshipiḓa",
  },
  playJourney: {
    en: "Play the Journey", tn: "Bona Loeto", af: "Speel die Reis", zu: "Dlala Uhambo", xh: "Dlala Uhambo",
    nso: "Bapala Leeto", st: "Bapala Leeto", ss: "Dlala Luhambo", ts: "Tlanga Riendzo", nr: "Dlala Ikhambo", ve: "Tambani Lwendo",
  },
  contents: {
    en: "Contents", tn: "Diteng", af: "Inhoud", zu: "Okuqukethwe", xh: "Okuqulethweyo",
    nso: "Dikagare", st: "Dikahare", ss: "Lokucuketfwe", ts: "Leswi nga endzeni", nr: "Okungaphakathi", ve: "Zwi re ngomu",
  },
  searchPlaceholder: {
    en: "Search the atlas…", tn: "Batla mo atlaseng…", af: "Deursoek die atlas…", zu: "Sesha i-athrasi…", xh: "Khangela i-atlasi…",
    nso: "Nyaka ka athlase…", st: "Batla atlaseng…", ss: "Sesha i-athlasi…", ts: "Lava eka atlasi…", nr: "Sesa i-atlasi…", ve: "Ṱoḓani athilasi…",
  },
  features: {
    en: "features", tn: "dikarolo", af: "artikels", zu: "izici", xh: "iziqwenga",
    nso: "dikarolo", st: "dikarolo", ss: "tici", ts: "swiyenge", nr: "iinhloko", ve: "zwipiḓa",
  },
  results: {
    en: "results", tn: "dipoelo", af: "resultate", zu: "imiphumela", xh: "iziphumo",
    nso: "dipoelo", st: "diphetho", ss: "imiphumela", ts: "mabuya", nr: "imiphumela", ve: "mvelelo",
  },
  result: {
    en: "result", tn: "poelo", af: "resultaat", zu: "umphumela", xh: "isiphumo",
    nso: "poelo", st: "phetho", ss: "umphumela", ts: "mbuyelo", nr: "umphumela", ve: "mvelelo",
  },
  emptyTitle: {
    en: "No features found", tn: "Ga go na dikarolo tse di bonweng", af: "Geen artikels gevind nie", zu: "Azikho izici ezitholakele", xh: "Akukho ziqwenga zifunyenweyo",
    nso: "Ga go na dikarolo tše di hweditšwego", st: "Ha ho dikarolo tse fumanweng", ss: "Atikho tici letitfoliwe", ts: "A ku na swiyenge leswi kumekaka", nr: "Azikho iinhloko ezitholakalako", ve: "A hu na zwipiḓa zwo wanwaho",
  },
  emptyBody: {
    en: "Try another word — an era, a place, a custom or a person.",
    tn: "Leka lefoko le lengwe — paka, lefelo, ngwao kgotsa motho.",
    af: "Probeer 'n ander woord — 'n tydperk, 'n plek, 'n gebruik of 'n persoon.",
    zu: "Zama elinye igama — inkathi, indawo, isiko noma umuntu.",
    xh: "Zama elinye igama — ixesha, indawo, isithethe okanye umntu.",
    nso: "Leka lentšu le lengwe — nako, lefelo, setšo goba motho.",
    st: "Leka lentswe le leng — nako, sebaka, moetlo kapa motho.",
    ss: "Zama lelinye livi — sikhatsi, indzawo, lisiko nome umuntfu.",
    ts: "Ringeta rin'wana rito — nkarhi, ndhawu, ndhavuko kumbe munhu.",
    nr: "Linga elinye igama — isikhathi, indawo, isiko namkha umuntu.",
    ve: "Lingedzani iṅwe ipfi — tshifhinga, fhethu, sialala kana muthu.",
  },
};

const num = (i: number) => (i + 1).toString().padStart(2, "0");
// web-only style value — native style validation rejects it
const WEB_NO_OUTLINE = Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : null;

export function AtlasScreen({
  lang,
  onBack,
  onOpen,
  onProvinces,
  onPresidents,
  onHeroes,
  onTotems,
  onDays,
}: {
  lang: Lang;
  onBack: () => void;
  onOpen: (id: string) => void;
  // v2 V2-10: the Atlas is now the hub for these rooms, since D1 gave them no top-level slot.
  onProvinces: () => void;
  onPresidents: () => void;
  onHeroes: () => void;
  onTotems: () => void;
  onDays: () => void;
}) {
  const { width } = useWindowDimensions();
  const wide = width >= 900;
  const [query, setQuery] = useState("");
  const [journeyOpen, setJourneyOpen] = useState(false);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!q) return atlasModules;
    return atlasModules.filter((m) => {
      const hay = `${m.title} ${m.author} ${t(m.blurb, lang)} ${m.blurb.en}`.toLowerCase();
      return hay.includes(q);
    });
  }, [q, lang]);

  const count = q
    ? `${filtered.length} ${filtered.length === 1 ? t(UI.result, lang) : t(UI.results, lang)}`
    : `${atlasModules.length} ${t(UI.features, lang)}`;

  const masthead = (
    <View style={s.pad}>
      <ScreenHeader kicker={t(UI.kicker, lang)} title={t(UI.title, lang)} lang={lang} onBack={onBack} showBack={!wide} />
      <Text style={s.intro}>{t(UI.intro, lang)}</Text>
      <Pressable style={s.journeyBtn} onPress={() => setJourneyOpen(true)} accessibilityLabel={t(UI.playJourney, lang)}>
        <Icon.Play size={17} color="#000000" fill="#000000" />
        <Text style={s.journeyBtnText}>{t(UI.playJourney, lang)}</Text>
      </Pressable>
      <AtlasRooms
        lang={lang}
        onProvinces={onProvinces}
        onPresidents={onPresidents}
        onHeroes={onHeroes}
        onTotems={onTotems}
        onDays={onDays}
      />
    </View>
  );

  const stickyHeader = (
    <View style={s.stickyBar}>
      <View style={s.searchBox}>
        <Icon.Search size={18} color="rgba(255,255,255,0.5)" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={t(UI.searchPlaceholder, lang)}
          placeholderTextColor="rgba(255,255,255,0.4)"
          style={[s.searchInput, WEB_NO_OUTLINE]}
          returnKeyType="search"
          autoCorrect={false}
          accessibilityLabel={t(UI.searchPlaceholder, lang)}
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery("")} hitSlop={10} accessibilityLabel="Clear search">
            <Icon.X size={17} color="rgba(255,255,255,0.55)" />
          </Pressable>
        )}
      </View>
      <Text style={s.count}>{count}</Text>
    </View>
  );

  const emptyState = (
    <View style={[s.pad, s.empty]}>
      <Text style={s.emptyTitle}>{t(UI.emptyTitle, lang)}</Text>
      <Text style={s.emptyBody}>{t(UI.emptyBody, lang)}</Text>
    </View>
  );

  const renderFeature = (_item: { key: string; label: string }, i: number) => {
    const m = filtered[i];
    const sc = m.scenes[0];
    const cover = sceneImageSource(m.id, sc.id, `${sc.imagePrompt}, ${PHOTO}`, { seed: sc.seed, w: 1400, h: 900 });
    return (
      <FeatureEntry
        index={i}
        kicker={m.author}
        title={m.title}
        lead={t(m.blurb, lang)}
        ctaLabel={t(UI.read, lang)}
        onPress={() => onOpen(m.id)}
        wide={wide}
        visual={
          <>
            <View style={StyleSheet.absoluteFill}>
              <SceneImage source={cover} />
            </View>
            <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.35)"]} style={StyleSheet.absoluteFill} pointerEvents="none" />
          </>
        }
      />
    );
  };

  return (
    <Screen tone="dark" scroll={false} padded={false} contentStyle={s.flex}>
      <SideIndexScroll
        contentsLabel={t(UI.contents, lang)}
        masthead={masthead}
        onBack={onBack}
        backLabel={backLabelFor(lang)}
        stickyHeader={stickyHeader}
        items={filtered.map((m) => ({ key: m.id, label: m.title }))}
        emptyState={emptyState}
        renderItem={renderFeature}
        maxWidth={1180}
      />
      <Modal visible={journeyOpen} animationType="fade" onRequestClose={() => setJourneyOpen(false)}>
        <Journey slides={atlasJourney} lang={lang} onClose={() => setJourneyOpen(false)} />
      </Modal>
    </Screen>
  );
}

const BLUE = "#1A85A7";

const s = StyleSheet.create({
  flex: { flex: 1 },
  pad: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },

  intro: { color: "rgba(255,255,255,0.62)", fontFamily: fonts.serifItalic, fontSize: 16, lineHeight: 24, marginBottom: spacing.lg },
  journeyBtn: { flexDirection: "row", alignItems: "center", gap: spacing.sm, alignSelf: "flex-start", backgroundColor: "#FFFFFF", borderRadius: radius.pill, paddingVertical: 12, paddingHorizontal: 20 },
  journeyBtnText: { color: "#000000", fontFamily: fonts.bodyBold, fontSize: 15, letterSpacing: 0.3 },

  // Sticky search
  stickyBar: { backgroundColor: "#000000", paddingHorizontal: spacing.lg, paddingTop: spacing.xs, paddingBottom: spacing.md, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.1)" },
  searchBox: {
    flexDirection: "row", alignItems: "center", gap: spacing.sm, height: 46,
    backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.16)", borderRadius: radius.pill, paddingHorizontal: spacing.md,
  },
  searchInput: { flex: 1, color: "#FFFFFF", fontFamily: fonts.body, fontSize: 15, paddingVertical: 0 },
  count: { color: "rgba(255,255,255,0.45)", fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", marginTop: spacing.sm },

  // Feature
  entry: { marginTop: spacing.xl, marginBottom: spacing.md },
  top: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.md },
  num: { color: BLUE, fontFamily: fonts.display, fontSize: 34, lineHeight: 34, letterSpacing: -1 },
  rule: { flex: 1, height: 2, backgroundColor: "rgba(255,255,255,0.14)" },
  cat: { color: "rgba(255,255,255,0.55)", fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: spacing.sm },
  title: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 30, lineHeight: 33, letterSpacing: -0.5, marginBottom: spacing.lg },
  titleWide: { fontSize: 44, lineHeight: 46 },
  imageWrap: { width: "100%", borderRadius: radius.md, overflow: "hidden", backgroundColor: "#000000", marginBottom: spacing.lg },
  lead: { color: "rgba(255,255,255,0.74)", fontFamily: fonts.body, fontSize: 16, lineHeight: 26, marginBottom: spacing.lg },
  leadWide: { fontSize: 18, lineHeight: 29, maxWidth: 660 },
  readRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  readText: { color: "#FFFFFF", fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 1.5 },

  // Empty state
  empty: { paddingVertical: spacing.xxl, alignItems: "center" },
  emptyTitle: { color: "#FFFFFF", fontFamily: fonts.displaySemi, fontSize: 20, marginBottom: spacing.sm, textAlign: "center" },
  emptyBody: { color: "rgba(255,255,255,0.55)", fontFamily: fonts.body, fontSize: 15, lineHeight: 22, textAlign: "center", maxWidth: 340 },
});
