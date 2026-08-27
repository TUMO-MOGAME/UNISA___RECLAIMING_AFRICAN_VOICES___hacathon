import React, { useMemo, useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput, StyleSheet, useWindowDimensions, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Lang, Module } from "../content/types";
import { modules, atlasModules, allModules } from "../content";
import { sceneImageSource } from "../content/images";
import { t } from "../i18n";
import { colors, spacing, radius, fonts } from "../theme/tokens";
import { Icon } from "../ui";
import { SceneImage } from "./SceneImage";
import type { Progress } from "../services/progress/progress";

// The Watch room (v2 V2-14) — the browsable library the app never had. Everything here is an
// EXISTING module from the content registry; nothing is invented and no new artwork is generated.
// Opening a card goes to the CinematicReader, which is still the player.
//
// The source design's chips (Totems & Clans, National Days, Nine Provinces) assumed those were
// watchable films. In this codebase they are their own screens under the Atlas, not modules with
// scenes — so offering them here would promise something that does not exist. The chips below match
// how the content is actually organised.

const WEB_NO_OUTLINE = Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : null;

const UI = {
  kicker: {
    en: "The library", tn: "Laeborari", af: "Die biblioteek", zu: "Umtapo", xh: "Ithala leencwadi",
    nso: "Laeborari", st: "Laeborari", ss: "Umtapo", ts: "Layiburari", nr: "Umtapo", ve: "Layiburari",
  },
  title: {
    en: "Watch the stories", tn: "Lebelela dikanegelo", af: "Kyk die stories", zu: "Buka izindaba", xh: "Bukela amabali",
    nso: "Lebelela dikanegelo", st: "Sheba dipale", ss: "Buka tindzaba", ts: "Languta mintsheketo", nr: "Buka iindaba", ve: "Lavhelesani zwiitwa",
  },
  lede: {
    en: "Cinematic scenes from the four great books and the Cultural Atlas. Every scene names the passage it comes from.",
    tn: "Diponagalo tsa dibuka tse nne tse dikgolo le Atlase ya Setso. Ponagalo nngwe le nngwe e bolela temana e e tswang mo go yona.",
    af: "Filmiese tonele uit die vier groot boeke en die Kulturele Atlas. Elke toneel noem die gedeelte waaruit dit kom.",
    zu: "Izigcawu zamafilimu ezincwadini ezine ezinkulu ne-Athulasi Yamasiko. Isigcawu ngasinye sisho isiqephu esivela kuso.",
    xh: "Imiboniso yeefilimu kwiincwadi ezine ezinkulu kunye ne-Atlasi yeNkcubeko. Umboniso ngamnye ubalula isicatshulwa avela kuso.",
    nso: "Diponagalo tša difilimi go tšwa dipukung tše nne tše dikgolo le Atlaseng ya Setšo. Ponagalo ye nngwe le ye nngwe e bolela temana yeo e tšwago go yona.",
    st: "Diponahalo tsa difilimi tse tswang dibukeng tse nne tse kgolo le Atlaseng ya Setso. Ponahalo ka nngwe e bolela temana eo e tswang ho yona.",
    ss: "Tigcawu tetifilimu letivela etincwadzini letine letinkhulu ne-Athilasi Yemasiko. Sigcawu ngasinye sisho sigaba lesivela kuso.",
    ts: "Swivono swa tifilimi leswi humaka etibukwini ta mune letikulu na Atlasi ya Ndhavuko. Xivono xin'wana na xin'wana xi vula xiphemu lexi xi humaka eka xona.",
    nr: "Iingcenye zamafilimu ezivela eencwadini ezine ezikhulu ne-Athulasi Yesiko. Ingcenye nginye ikhuluma ngesiqephu evela kiso.",
    ve: "Zwivhonala zwa filimu u bva kha bugu nṋa khulwane na Atlasi ya Mvelele. Tshivhonala tshiṅwe na tshiṅwe tshi amba ndima ine tsha bva khayo.",
  },
  all: { en: "All", tn: "Tsotlhe", af: "Alles", zu: "Konke", xh: "Konke", nso: "Ka moka", st: "Tsohle", ss: "Konkhe", ts: "Hinkwaswo", nr: "Koke", ve: "Zwoṱhe" },
  books: {
    en: "The 4 Great Books", tn: "Dibuka tse Nne tse Dikgolo", af: "Die 4 Groot Boeke", zu: "Izincwadi Ezine Ezinkulu", xh: "Iincwadi Ezine Ezinkulu",
    nso: "Dipuku tše Nne tše Dikgolo", st: "Dibuka tse Nne tse Kgolo", ss: "Tincwadzi Letine Letinkhulu", ts: "Tibuku ta Mune letikulu", nr: "Iincwadi Ezine Ezikhulu", ve: "Bugu Nṋa Khulwane",
  },
  atlas: {
    en: "Cultural Atlas", tn: "Atlase ya Setso", af: "Kulturele Atlas", zu: "I-Athulasi Yamasiko", xh: "I-Atlasi yeNkcubeko",
    nso: "Atlase ya Setšo", st: "Atlase ya Setso", ss: "I-Athilasi Yemasiko", ts: "Atlasi ya Ndhavuko", nr: "I-Athulasi Yesiko", ve: "Atlasi ya Mvelele",
  },
  search: {
    en: "Search the library", tn: "Batla mo laeboraring", af: "Deursoek die biblioteek", zu: "Sesha umtapo", xh: "Khangela ithala",
    nso: "Nyaka ka laeborari", st: "Batla laeboraring", ss: "Sesha umtapo", ts: "Lavisisa layiburari", nr: "Sesa umtapo", ve: "Ṱoḓani layiburari",
  },
  watch: {
    en: "Watch", tn: "Lebelela", af: "Kyk", zu: "Buka", xh: "Bukela",
    nso: "Lebelela", st: "Sheba", ss: "Buka", ts: "Languta", nr: "Buka", ve: "Lavhelesa",
  },
  featured: {
    en: "Featured", tn: "E e tlhagelelang", af: "Uitgelig", zu: "Okugqanyisiwe", xh: "Ebalaselweyo",
    nso: "Ye e bontšhwago", st: "E hlahisitsweng", ss: "Lokugcamile", ts: "Leswi kombisiweke", nr: "Okuveziweko", ve: "Zwo sumbedzwaho",
  },
  scenes: {
    en: "scenes", tn: "diponagalo", af: "tonele", zu: "izigcawu", xh: "imiboniso",
    nso: "diponagalo", st: "diponahalo", ss: "tigcawu", ts: "swivono", nr: "iingcenye", ve: "zwivhonala",
  },
  watched: {
    en: "watched", tn: "e lebeletswe", af: "gekyk", zu: "kubukiwe", xh: "kubukelwe",
    nso: "e lebeletšwe", st: "e shebilwe", ss: "kubukiwe", ts: "swi languteriwe", nr: "kubukiwe", ve: "zwo lavhelesiwa",
  },
  none: {
    en: "Nothing matches that search.", tn: "Ga go na sepe se se tsamaisanang le patlo eo.", af: "Niks stem ooreen met daardie soektog nie.",
    zu: "Akukho okufana nalokho okusesha.", xh: "Akukho nto ihambelana nalo khangelo.",
    nso: "Ga go na selo seo se sepelelanago le nyako yeo.", st: "Ha ho letho le tsamaellanang le patlo eo.",
    ss: "Akukho lokuhambisana nalokusesha.", ts: "A ku na nchumu lowu fambisanaka na ku lavisisa koloko.",
    nr: "Akunanto ehambisana nalokho okusesako.", ve: "A hu na tshithu tshi tshimbidzanaho na u ṱoḓa honoho.",
  },
};

type Chip = "all" | "books" | "atlas";

function thumb(m: Module, w = 800, h = 500) {
  const sc = m.scenes[0];
  return sceneImageSource(m.id, sc.id, sc.imagePrompt, { seed: sc.seed, w, h });
}

export function WatchScreen({
  lang,
  progress,
  onOpen,
}: {
  lang: Lang;
  progress: Progress;
  onOpen: (id: string) => void;
}) {
  const { width } = useWindowDimensions();
  const cols = width >= 1180 ? 3 : width >= 760 ? 2 : 1;
  const [chip, setChip] = useState<Chip>("all");
  const [query, setQuery] = useState("");

  const featured = modules[0];

  const list = useMemo(() => {
    const base = chip === "books" ? modules : chip === "atlas" ? atlasModules : allModules;
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter((m) =>
      `${m.title} ${m.author} ${m.blurb.en} ${t(m.blurb, lang)}`.toLowerCase().includes(q)
    );
  }, [chip, query, lang]);

  const chips: { key: Chip; label: Record<string, string>; n: number }[] = [
    { key: "all", label: UI.all, n: allModules.length },
    { key: "books", label: UI.books, n: modules.length },
    { key: "atlas", label: UI.atlas, n: atlasModules.length },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.page}>
      <View style={styles.head}>
        <Text style={styles.kicker}>{t(UI.kicker, lang)}</Text>
        <Text style={styles.title}>{t(UI.title, lang)}</Text>
        <Text style={styles.lede}>{t(UI.lede, lang)}</Text>
      </View>

      {/* ── Featured ── */}
      <Pressable
        onPress={() => onOpen(featured.id)}
        accessibilityRole="link"
        accessibilityLabel={`${t(UI.featured, lang)}: ${featured.title}`}
        style={styles.featured}
      >
        <View style={StyleSheet.absoluteFill}>
          <SceneImage source={thumb(featured, 1400, 800)} kenBurns />
        </View>
        <LinearGradient
          colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.94)"]}
          locations={[0, 0.45, 1]}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        <View style={styles.featuredBody}>
          <Text style={styles.featuredKicker}>
            {t(UI.featured, lang)} · {featured.author}
            {featured.year ? `, ${featured.year}` : ""}
          </Text>
          <Text style={styles.featuredTitle}>{featured.title}</Text>
          <Text style={styles.featuredBlurb} numberOfLines={3}>
            {t(featured.blurb, lang)}
          </Text>
          <View style={styles.playBtn}>
            <Icon.Play size={14} color={colors.night} fill={colors.night} />
            <Text style={styles.playBtnText}>
              {t(UI.watch, lang)} · {featured.scenes.length} {t(UI.scenes, lang)}
            </Text>
          </View>
        </View>
      </Pressable>

      {/* ── Filters ── */}
      <View style={styles.filters}>
        <View style={styles.chipRow}>
          {chips.map((c) => (
            <Pressable
              key={c.key}
              onPress={() => setChip(c.key)}
              accessibilityRole="button"
              accessibilityState={{ selected: chip === c.key }}
              accessibilityLabel={`${t(c.label as any, lang)} — ${c.n}`}
              style={[styles.chip, chip === c.key && styles.chipOn]}
            >
              <Text style={[styles.chipText, chip === c.key && styles.chipTextOn]}>
                {t(c.label as any, lang)} · {c.n}
              </Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.search}>
          <Icon.Search size={15} color="rgba(255,255,255,0.45)" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t(UI.search, lang)}
            placeholderTextColor="rgba(255,255,255,0.38)"
            style={[styles.searchInput, WEB_NO_OUTLINE]}
            accessibilityLabel={t(UI.search, lang)}
          />
          {query.length > 0 ? (
            <Pressable onPress={() => setQuery("")} hitSlop={10} accessibilityLabel="Clear search">
              <Icon.X size={15} color="rgba(255,255,255,0.5)" />
            </Pressable>
          ) : null}
        </View>
      </View>

      {/* ── Grid ── */}
      {list.length === 0 ? (
        <Text style={styles.empty}>{t(UI.none, lang)}</Text>
      ) : (
        <View style={styles.grid}>
          {list.map((m) => (
            <WatchCard
              key={m.id}
              m={m}
              lang={lang}
              width={`${100 / cols}%`}
              watched={progress.watched[m.id] ?? 0}
              onPress={() => onOpen(m.id)}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

function WatchCard({
  m,
  lang,
  width,
  watched,
  onPress,
}: {
  m: Module;
  lang: Lang;
  width: string;
  watched: number;
  onPress: () => void;
}) {
  const pct = Math.round(watched * 100);
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="link"
      accessibilityLabel={m.title}
      style={({ hovered }: any) => [styles.card, { width } as any, hovered && styles.cardHover]}
    >
      <View style={styles.thumb}>
        <SceneImage source={thumb(m)} />
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.75)"]}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        {pct > 0 ? (
          <View style={styles.watchedPill}>
            <Text style={styles.watchedText}>
              {pct}% {t(UI.watched, lang)}
            </Text>
          </View>
        ) : null}
        {pct > 0 ? (
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${pct}%` }]} />
          </View>
        ) : null}
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {m.title}
        </Text>
        <Text style={styles.cardMeta} numberOfLines={1}>
          {m.author}
          {m.year ? `, ${m.year}` : ""} · {m.scenes.length} {t(UI.scenes, lang)}
        </Text>
        <Text style={styles.cardBlurb} numberOfLines={3}>
          {t(m.blurb, lang)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  page: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.xxl },

  head: { marginBottom: spacing.lg, maxWidth: 720 },
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

  featured: {
    height: 380,
    borderRadius: radius.md,
    overflow: "hidden",
    justifyContent: "flex-end",
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  featuredBody: { padding: spacing.lg, gap: 6 },
  featuredKicker: {
    color: colors.dsBlue,
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  featuredTitle: {
    color: "#FFFFFF",
    fontFamily: fonts.display,
    fontSize: 40,
    lineHeight: 42,
    letterSpacing: -1,
  },
  featuredBlurb: {
    color: "rgba(255,255,255,0.82)",
    fontFamily: fonts.body,
    fontSize: 14.5,
    lineHeight: 22,
    maxWidth: 560,
  },
  playBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    alignSelf: "flex-start",
    backgroundColor: colors.dsBlue,
    borderRadius: radius.pill,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: spacing.sm,
  },
  playBtnText: { color: colors.night, fontFamily: fonts.bodyBold, fontSize: 13.5, letterSpacing: 0.3 },

  filters: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, flex: 1, minWidth: 240 },
  chip: {
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.pill,
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  chipOn: { backgroundColor: colors.dsBlue, borderColor: colors.dsBlue },
  chipText: { color: "rgba(255,255,255,0.72)", fontFamily: fonts.bodySemi, fontSize: 13 },
  chipTextOn: { color: colors.night, fontFamily: fonts.bodyBold },

  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 14,
    minWidth: 220,
  },
  searchInput: { flex: 1, color: "#FFFFFF", fontFamily: fonts.body, fontSize: 14 },

  grid: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -spacing.sm },
  card: {
    padding: spacing.sm,
    borderRadius: radius.sm,
  },
  cardHover: { backgroundColor: "rgba(255,255,255,0.04)" },
  thumb: {
    height: 172,
    borderRadius: radius.sm,
    overflow: "hidden",
    backgroundColor: colors.card,
    justifyContent: "flex-end",
  },
  watchedPill: {
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: "rgba(0,0,0,0.72)",
    borderRadius: radius.sm,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  watchedText: { color: colors.dsBlue, fontFamily: fonts.bodySemi, fontSize: 11 },
  progressTrack: { height: 3, backgroundColor: "rgba(255,255,255,0.22)" },
  progressFill: { height: 3, backgroundColor: colors.dsBlue },

  cardBody: { gap: 4, paddingTop: spacing.sm, paddingHorizontal: 2 },
  cardTitle: { color: "#FFFFFF", fontFamily: fonts.heading, fontSize: 17, lineHeight: 22 },
  cardMeta: { color: "rgba(255,255,255,0.45)", fontFamily: fonts.body, fontSize: 12.5 },
  cardBlurb: { color: "rgba(255,255,255,0.66)", fontFamily: fonts.body, fontSize: 13.5, lineHeight: 20 },

  empty: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.body, fontSize: 15, paddingVertical: spacing.xl },
});
