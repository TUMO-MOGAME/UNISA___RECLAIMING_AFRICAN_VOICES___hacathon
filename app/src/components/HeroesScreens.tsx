import React from "react";
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { Screen, ScreenHeader, Icon, backLabelFor } from "../ui";
import { heroes, Hero, HeroEvent } from "../content/heroes";
import { colors, spacing, radius, fonts, type } from "../theme/tokens";
import { t } from "../i18n";
import type { LangCode } from "../i18n";
import { SideIndexScroll } from "./SideIndexScroll";
import { FeatureEntry } from "./FeatureEntry";

// Heroes of the Nation — South Africans, men and women, who gave something to the country's freedom
// and dignity. Grounded, cited content in src/content/heroes.ts (humanities-grounding rule); contested
// legacies told honestly. Same editorial index layout as the Presidents, with a SEARCHABLE sidebar so
// you can jump straight to a person. Chrome is localized (EN + Setswana authored; others fall back to
// English); the biographies themselves stay English for now.

const UI = {
  kicker: {
    en: "Heroes of the Nation", tn: "Bagaki ba Setšhaba", af: "Helde van die Nasie", zu: "Amaqhawe Esizwe", xh: "Amaqhawe Esizwe",
    nso: "Bagale ba Setšhaba", st: "Bahale ba Setjhaba", ss: "Emacawe Esive", ts: "Tinhenha ta Rixaka", nr: "Amaqhawe Wesitjhaba", ve: "Vhahali vha Lushaka",
  },
  title: {
    en: "Heroes & Heroines", tn: "Bagaki le Bagaki ba Basadi", af: "Helde & Heldinne", zu: "Amaqhawe Namaqhawekazi", xh: "Amaqhawe Namaqhawekazi",
    nso: "Bagale le Bagale ba Basadi", st: "Bahale le Bahale ba Basadi", ss: "Emacawe Nemacawekati", ts: "Tinhenha na Tinhenhakati", nr: "Amaqhawe Namaqhawekazi", ve: "Vhahali na Vhahali vha Vhafumakadzi",
  },
  intro: {
    en: "The people — women and men — who gave something of themselves to South Africa's freedom and dignity. Search a name, or scroll the roll.",
    tn: "Batho — basadi le banna — ba ba neileng sengwe sa bone go kgololosego le seriti sa Aforika Borwa. Batla leina, kgotsa o menye lenaneo.",
    af: "Die mense — vroue en mans — wat iets van hulself aan Suid-Afrika se vryheid en waardigheid gegee het. Soek 'n naam, of rol deur die lys.",
    zu: "Abantu — abesifazane namadoda — abanikela ngokuthile kwabo enkululekweni nasesithunzini saseNingizimu Afrika. Sesha igama, noma uskrole uhla.",
    xh: "Abantu — abafazi namadoda — abanikela ngento ethile ngabo kwinkululeko nakwisidima soMzantsi Afrika. Khangela igama, okanye uskrole uluhlu.",
    nso: "Batho — basadi le banna — bao ba neilego se sengwe sa bona go tokologo le seriti sa Afrika Borwa. Nyaka leina, goba o menye lelokelelo.",
    st: "Batho — basadi le banna — ba faneng ka ho hong ha bona tokolohong le seriting sa Afrika Borwa. Batla lebitso, kapa u thelle lethathamo.",
    ss: "Bantfu — bafati nemadvodza — labaniketa ngalokutsite kwabo enkhululekweni nasesitfunti saseNingizimu Afrika. Sesha libito, nome uskrole luhlu.",
    ts: "Vanhu — vavasati ni vavanuna — lava nyikeke swin'wana swa vona eku ntshunxekeni ni xindzhuti xa Afrika-Dzonga. Lava vito, kumbe u sereleta nxaxamelo.",
    nr: "Abantu — abafazi namadoda — abanikele ngokuthile kwabo ekukhululekeni nesithunzini seSewula Afrika. Sesa ibizo, namkha uskrole uhlu.",
    ve: "Vhathu — vhafumakadzi na vhanna — vhe vha ṋekedza tshiṅwe tsha vhone kha mbofholowo na tshirunzi tsha Afrika Tshipembe. Ṱoḓani dzina, kana ni sombe mutevhe.",
  },
  search: {
    en: "Search a person", tn: "Batla motho", af: "Soek 'n persoon", zu: "Sesha umuntu", xh: "Khangela umntu",
    nso: "Nyaka motho", st: "Batla motho", ss: "Sesha umuntfu", ts: "Lava munhu", nr: "Sesa umuntu", ve: "Ṱoḓani muthu",
  },
  contents: {
    en: "People", tn: "Batho", af: "Mense", zu: "Abantu", xh: "Abantu",
    nso: "Batho", st: "Batho", ss: "Bantfu", ts: "Vanhu", nr: "Abantu", ve: "Vhathu",
  },
  read: {
    en: "Read their story", tn: "Bala kanegelo ya bone", af: "Lees hul storie", zu: "Funda indaba yabo", xh: "Funda ibali labo",
    nso: "Bala kanegelo ya bona", st: "Bala pale ya bona", ss: "Fundza indzaba yabo", ts: "Hlaya ntsheketo wa vona", nr: "Funda indaba yabo", ve: "Vhalani tshiitwa tshavho",
  },
  born: {
    en: "Born", tn: "O tsetswe", af: "Gebore", zu: "Wazalwa", xh: "Wazalwa",
    nso: "O belegwe", st: "O tswetswe", ss: "Watalwa", ts: "U velekiwile", nr: "Wabelethwa", ve: "O bebwa",
  },
  died: {
    en: "Died", tn: "O tlhokafetse", af: "Oorlede", zu: "Washona", xh: "Wasweleka",
    nso: "O hlokofetše", st: "O hlokahetse", ss: "Washona", ts: "U lovile", nr: "Wahlongakala", ve: "O lovha",
  },
  movement: {
    en: "Movement", tn: "Mokgatlho", af: "Beweging", zu: "Inhlangano", xh: "Umbutho",
    nso: "Mokgatlo", st: "Mokgatlo", ss: "Inhlangano", ts: "Nhlangano", nr: "Ihlangano", ve: "Tshigwada",
  },
  theJourney: {
    en: "The journey", tn: "Leeto", af: "Die reis", zu: "Uhambo", xh: "Uhambo",
    nso: "Leeto", st: "Leeto", ss: "Luhambo", ts: "Riendzo", nr: "Ikhambo", ve: "Lwendo",
  },
  aLife: {
    en: "A life", tn: "Botshelo", af: "'n Lewe", zu: "Impilo", xh: "Ubomi",
    nso: "Bophelo", st: "Bophelo", ss: "Imphilo", ts: "Vutomi", nr: "Ukuphila", ve: "Vhutshilo",
  },
  whatToKnow: {
    en: "What to know", tn: "Se o tshwanetseng go se itse", af: "Wat om te weet", zu: "Okufanele ukwazi", xh: "Okufuneka ukwazi",
    nso: "Seo o swanetšego go se tseba", st: "Seo o lokelang ho se tseba", ss: "Lokufanele ukwati", ts: "Leswi u faneleke ku swi tiva", nr: "Okufanele ukwazi", ve: "Zwine wa fanela u zwi ḓivha",
  },
  howWeSource: {
    en: "How we source this", tn: "Ka moo re bonang se ka gone", af: "Hoe ons dit verkry", zu: "Indlela esikuthola ngayo lokhu", xh: "Indlela esikufumana ngayo oku",
    nso: "Ka moo re hwetšago se ka gona", st: "Kamoo re fumanang sena kateng", ss: "Indlela lesikutfola ngayo loku", ts: "Ndlela leyi hi kumaka leswi ha yona", nr: "Indlela esikuthola ngayo lokhu", ve: "Nḓila ine ra zwi wana ngayo",
  },
  importantDates: {
    en: "Their journey", tn: "Leeto la bone", af: "Hul reis", zu: "Uhambo lwabo", xh: "Uhambo lwabo",
    nso: "Leeto la bona", st: "Leeto la bona", ss: "Luhambo lwabo", ts: "Riendzo ra vona", nr: "Ikhambo labo", ve: "Lwendo lwavho",
  },
  gallery: {
    en: "In pictures", tn: "Ka ditshwantsho", af: "In prente", zu: "Ngezithombe", xh: "Ngemifanekiso",
    nso: "Ka diswantšho", st: "Ka dinepe", ss: "Ngetitfombe", ts: "Hi swifaniso", nr: "Ngeenthombe", ve: "Nga zwifanyiso",
  },
  galleryNote: {
    en: "Historical photographs from public archives — full credits to be confirmed.",
    tn: "Ditshwantsho tsa hisitori tse di tswang mo dipolokelong tsa setšhaba — ditebogo tse di feletseng di sa netefadiwa.",
    af: "Historiese foto's uit openbare argiewe — volledige erkennings moet nog bevestig word.",
    zu: "Izithombe zomlando ezivela ezinqolobaneni zomphakathi — imininingwane egcwele izoqinisekiswa.",
    xh: "Iifoto zembali ezivela koovimba boluntu — iinkcukacha ezipheleleyo ziza kuqinisekiswa.",
    nso: "Diswantšho tša histori tše di tšwago dipolokelong tša setšhaba — ditebogo ka botlalo di sa tla netefatšwa.",
    st: "Dinepe tsa histori tse tsoang lipolokelong tsa setjhaba — litebello tse felletseng li sa tla netefatsoa.",
    ss: "Titfombe temlandvo letisuka etingobeni temmango — imininingwane legcwele itawuciniseka.",
    ts: "Tifoto ta matimu leti humaka eka vuhlayiselo bya vaaki — vukhongoteri hinkwabyo byi ta tiyisisiwa.",
    nr: "Iinthombe zomlando ezivela eengobeni zomphakathi — imininingwana ezeleko izokuqinisekiswa.",
    ve: "Zwifanyiso zwa ḓivhazwakale zwi bvaho kha vhulondoloti ha tshitshavha — ndivhadzo dzo fhelelaho dzi kha ḓi khwaṱhisedzwa.",
  },
};

// ---------- Overview ----------
export function HeroesScreen({ onBack, onOpen, lang }: { onBack: () => void; onOpen: (id: string) => void; lang: LangCode }) {
  const { width } = useWindowDimensions();
  const wide = width >= 900;

  const masthead = (
    <View style={s.pad}>
      <ScreenHeader kicker={t(UI.kicker, lang)} title={t(UI.title, lang)} lang={lang} onBack={onBack} showBack={!wide} />
      <Text style={s.intro}>{t(UI.intro, lang)}</Text>
    </View>
  );

  const renderHero = (_item: { key: string; label: string }, i: number) => {
    const h = heroes[i];
    return (
      <FeatureEntry
        index={i}
        kicker={`${h.dates}${h.movement ? ` · ${h.movement}` : ""}`}
        title={h.name}
        lead={h.role}
        leadLines={3}
        ctaLabel={t(UI.read, lang)}
        onPress={() => onOpen(h.id)}
        wide={wide}
        visual={
          h.photo ? (
            <Image source={h.photo} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} cachePolicy="disk" accessibilityLabel={h.name} />
          ) : (
            <View style={[StyleSheet.absoluteFill, s.monoPanel]}>
              <Text style={s.monoBig}>{h.mono}</Text>
            </View>
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
        searchable
        searchPlaceholder={t(UI.search, lang)}
        items={heroes.map((h) => ({ key: h.id, label: h.name }))}
        renderItem={renderHero}
      />
    </Screen>
  );
}

// ---------- Detail ----------
export function HeroScreen({ hero, onBack, lang }: { hero: Hero; onBack: () => void; lang: LangCode }) {
  const h = hero;
  const life = h.life ?? [];
  const tiles: { label: string; value: string }[] = [];
  if (h.born) tiles.push({ label: t(UI.born, lang), value: h.born });
  if (h.died) tiles.push({ label: t(UI.died, lang), value: h.died });
  if (h.movement) tiles.push({ label: t(UI.movement, lang), value: h.movement });

  const masthead = (
    <View style={s.pad}>
      <View style={s.hero}>
        <Pressable style={s.heroBack} onPress={onBack} hitSlop={12}><Icon.ChevronLeft size={22} color="#fff" strokeWidth={2.4} /></Pressable>
        {h.photo ? (
          <Image source={h.photo} style={s.heroPhoto} contentFit="cover" transition={200} cachePolicy="disk" accessibilityLabel={h.name} />
        ) : (
          <View style={s.heroMono}><Text style={s.heroMonoText}>{h.mono}</Text></View>
        )}
        <Text style={s.heroName}>{h.name}</Text>
        {h.honorific ? <Text style={s.heroClan}>{h.honorific}</Text> : null}
        <View style={s.heroTerm}><Text style={s.heroTermText}>{h.dates}</Text></View>
      </View>

      {tiles.length > 0 && (
        <View style={s.tileGrid}>
          {tiles.map((tl, i) => (
            <View key={i} style={s.tile}>
              <Text style={s.tileV}>{tl.value}</Text>
              <Text style={s.tileL}>{tl.label}</Text>
            </View>
          ))}
        </View>
      )}

      <Label text={t(UI.theJourney, lang)} />
      <Text style={s.para}>{h.contribution}</Text>
    </View>
  );

  const rest = (
    <>
      {h.know && h.know.length > 0 && (
        <>
          <Label text={t(UI.whatToKnow, lang)} />
          <View style={{ gap: spacing.sm }}>
            {h.know.map((k, i) => (
              <View key={i} style={s.knRow}>
                <View style={s.knDot} />
                <Text style={s.knText}>{k}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {h.quote ? (
        <View style={s.quote}>
          <Text style={s.quoteText}>&ldquo;{h.quote.text}&rdquo;</Text>
          <Text style={s.quoteAttr}>— {h.quote.attr}</Text>
        </View>
      ) : null}

      {h.gallery && h.gallery.length > 0 ? (
        <>
          <Label text={t(UI.gallery, lang)} />
          <View style={s.galleryWrap}>
            {h.gallery.map((g, i) => (
              <Image key={i} source={g} style={s.galleryImg} contentFit="cover" transition={150} cachePolicy="disk" accessibilityLabel={`${h.name} — photograph ${i + 1}`} />
            ))}
          </View>
          <Text style={s.galleryNote}>{t(UI.galleryNote, lang)}</Text>
        </>
      ) : null}

      {h.sources ? (
        <View style={s.srcNote}>
          <Text style={s.srcH}>{t(UI.howWeSource, lang)}</Text>
          <Text style={s.srcT}>{h.sources}</Text>
        </View>
      ) : null}
    </>
  );

  const items =
    life.length > 0
      ? life.map((l) => ({ key: `${l.when}-${l.name}`, label: `${l.when} · ${l.name}` }))
      : [{ key: "record", label: t(UI.whatToKnow, lang) }];

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
function Timeline({ item, last }: { item: HeroEvent; last: boolean }) {
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
  flexFill: { flex: 1 },
  pad: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  intro: { color: "rgba(255,255,255,0.62)", fontFamily: fonts.serifItalic, fontSize: 15, lineHeight: 22, marginBottom: spacing.lg },

  monoPanel: { alignItems: "center", justifyContent: "center", backgroundColor: "#0e0e0e" },
  monoBig: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 72, letterSpacing: 2 },

  sectionHead: { marginTop: spacing.xl, marginBottom: spacing.md },
  sectionRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  tick: { width: 15, height: 3, borderRadius: 2, backgroundColor: colors.orange },
  sectionLabel: { color: "#fff", fontFamily: fonts.displaySemi, fontSize: 15, letterSpacing: 1, textTransform: "uppercase" },
  para: { color: "rgba(255,255,255,0.72)", fontFamily: fonts.body, fontSize: type.body, lineHeight: 25 },

  hero: { alignItems: "center", justifyContent: "center", paddingVertical: spacing.xl, backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", borderRadius: radius.lg, marginBottom: spacing.md },
  heroBack: { position: "absolute", top: 12, left: 12, zIndex: 2, width: 36, height: 36, borderRadius: radius.pill, backgroundColor: "rgba(0,0,0,0.45)", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
  heroPhoto: { width: 168, height: 210, borderRadius: radius.md, backgroundColor: "#0c0c0c", borderWidth: 1, borderColor: "rgba(235,164,60,0.4)" },
  heroMono: { width: 92, height: 92, borderRadius: 46, alignItems: "center", justifyContent: "center", backgroundColor: "#0c0c0c", borderWidth: 2, borderColor: "rgba(235,164,60,0.6)" },
  heroMonoText: { fontFamily: fonts.display, fontSize: 40, color: colors.gold },
  heroName: { color: "#fff", fontFamily: fonts.display, fontSize: 28, textTransform: "uppercase", marginTop: spacing.md, textAlign: "center", paddingHorizontal: spacing.md },
  heroClan: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.serifItalic, fontSize: 14, marginTop: 4, textAlign: "center", paddingHorizontal: spacing.md },
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

  knRow: { flexDirection: "row", gap: spacing.sm },
  knDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.gold, marginTop: 7 },
  knText: { flex: 1, color: "rgba(255,255,255,0.82)", fontFamily: fonts.body, fontSize: 13, lineHeight: 20 },

  quote: { marginTop: spacing.lg, borderLeftWidth: 3, borderLeftColor: colors.gold, paddingLeft: spacing.md },
  quoteText: { color: "#fff", fontFamily: fonts.serifItalic, fontSize: 18, lineHeight: 25 },
  quoteAttr: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginTop: 10 },

  galleryWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  galleryImg: { width: "31.5%", aspectRatio: 1, borderRadius: radius.sm, backgroundColor: "#0c0c0c" },
  galleryNote: { color: "rgba(255,255,255,0.45)", fontFamily: fonts.serifItalic, fontSize: 12, lineHeight: 18, marginTop: spacing.sm },

  srcNote: { marginTop: spacing.lg, backgroundColor: "rgba(217,106,28,0.07)", borderLeftWidth: 3, borderLeftColor: colors.orange, borderRadius: 8, padding: spacing.md },
  srcH: { color: colors.orange, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1, textTransform: "uppercase" },
  srcT: { color: "rgba(255,255,255,0.62)", fontFamily: fonts.body, fontSize: 12, lineHeight: 18, marginTop: 6 },
});
