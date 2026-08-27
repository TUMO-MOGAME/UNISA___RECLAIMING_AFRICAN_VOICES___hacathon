import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Lang, Mode, Module } from "../content/types";
import { sceneImageSource } from "../content/images";
import { draftText } from "../content/drafts";
import { t, resolveText, languageByCode } from "../i18n";
import { colors, spacing, radius, fonts } from "../theme/tokens";
import { Icon } from "../ui";
import { SceneImage } from "./SceneImage";
import { LanguagePicker } from "./LanguagePicker";
import { useTts } from "../services/tts";
import { askUbuntu } from "../services/chatbot/askBus";

// The Watch page for one film (v2 V2-15, plan §8) — the room `/watch` opens into.
//
// WHY THIS EXISTS AT ALL. Until now `/watch` handed straight off to the CinematicReader. The Reader
// is a good player, but it is a *book*: the sourcing sits in the margin of a paper page, one scene
// at a time. The plan asks the watch page to carry a **Sources & provenance** block — a standing,
// scannable account of what this film is adapted from, which passage is behind each scene, what the
// references are, and the fact that every image is an AI interpretation rather than a photograph.
// That is AGENTS.md §4 made visible: the claim and its receipt on the same screen. The Reader is
// still one tap away ("Open the full reader") and is unchanged.
//
// Nothing here is authored content. Every line of provenance below is read from the module's own
// `source`, `references[]` and each scene's `sourceNote` — the data has always been there; this
// screen is the first thing to put it in front of a viewer.

const UI = {
  back: {
    en: "Back to the library", tn: "Boela kwa laeboraring", af: "Terug na die biblioteek", zu: "Buyela emtapweni", xh: "Buyela ethaleni leencwadi",
    nso: "Boela laeboraring", st: "Kgutlela laeboraring", ss: "Buyela emtapweni", ts: "Tlhelela elayiburari", nr: "Buyela emtapweni", ve: "Vhuyelelani layiburari",
  },
  // Reading level — same wording as the Reader, so the two never drift apart.
  adult: {
    en: "Adult", tn: "Bagolo", af: "Volwassene", zu: "Omdala", xh: "Omdala",
    nso: "Yo mogolo", st: "E moholo", ss: "Lomdzala", ts: "Lonkulu", nr: "Omdala", ve: "Muhulwane",
  },
  child: {
    en: "Child", tn: "Bana", af: "Kind", zu: "Ingane", xh: "Umntwana",
    nso: "Ngwana", st: "Ngwana", ss: "Umntfwana", ts: "N'wana", nr: "Umntwana", ve: "Ṅwana",
  },
  listen: {
    en: "Listen", tn: "Reetsa", af: "Luister", zu: "Lalela", xh: "Mamela",
    nso: "Theeletša", st: "Mamela", ss: "Lalela", ts: "Yingisela", nr: "Lalela", ve: "Thetshelesa",
  },
  stopListen: {
    en: "Stop", tn: "Emisa", af: "Stop", zu: "Misa", xh: "Yima",
    nso: "Emiša", st: "Emisa", ss: "Yima", ts: "Yimisa", nr: "Misa", ve: "Ima",
  },
  scene: {
    en: "Scene", tn: "Ponagalo", af: "Toneel", zu: "Isigcawu", xh: "Umboniso",
    nso: "Ponagalo", st: "Ponahalo", ss: "Sigcawu", ts: "Xivono", nr: "Ingcenye", ve: "Tshivhonala",
  },
  // Which shelf this film sits on — same wording as the Watch room's filter chips.
  books: {
    en: "The 4 Great Books", tn: "Dibuka tse Nne tse Dikgolo", af: "Die 4 Groot Boeke", zu: "Izincwadi Ezine Ezinkulu", xh: "Iincwadi Ezine Ezinkulu",
    nso: "Dipuku tše Nne tše Dikgolo", st: "Dibuka tse Nne tse Kgolo", ss: "Tincwadzi Letine Letinkhulu", ts: "Tibuku ta Mune letikulu", nr: "Iincwadi Ezine Ezikhulu", ve: "Bugu Nṋa Khulwane",
  },
  atlas: {
    en: "Cultural Atlas", tn: "Atlase ya Setso", af: "Kulturele Atlas", zu: "I-Athulasi Yamasiko", xh: "I-Atlasi yeNkcubeko",
    nso: "Atlase ya Setšo", st: "Atlase ya Setso", ss: "I-Athilasi Yemasiko", ts: "Atlasi ya Ndhavuko", nr: "I-Athulasi Yesiko", ve: "Atlasi ya Mvelele",
  },
  of: {
    en: "of", tn: "ya", af: "van", zu: "kwa", xh: "kwa",
    nso: "ya", st: "ya", ss: "kwa", ts: "ya", nr: "kwa", ve: "ya",
  },
  prevScene: {
    en: "Previous scene", tn: "Ponagalo e e fetileng", af: "Vorige toneel", zu: "Isigcawu esidlule", xh: "Umboniso odlulileyo",
    nso: "Ponagalo ye e fetilego", st: "Ponahalo e fetileng", ss: "Sigcawu lesendlulile", ts: "Xivono lexi hundzeke", nr: "Ingcenye edlulileko", ve: "Tshivhonala tsho fhelaho",
  },
  nextScene: {
    en: "Next scene", tn: "Ponagalo e e latelang", af: "Volgende toneel", zu: "Isigcawu esilandelayo", xh: "Umboniso olandelayo",
    nso: "Ponagalo ye e latelago", st: "Ponahalo e latelang", ss: "Sigcawu lesilandzelako", ts: "Xivono lexi landzelaka", nr: "Ingcenye elandelako", ve: "Tshivhonala tshi tevhelaho",
  },

  // ── The provenance block ──
  provenance: {
    en: "Sources & provenance", tn: "Metswedi le tshimologo", af: "Bronne en herkoms", zu: "Imithombo nemvelaphi", xh: "Imithombo nemvelaphi",
    nso: "Methopo le tshimologo", st: "Mehlodi le tshimoloho", ss: "Imitfombo nemvelaphi", ts: "Tihlovo ni masungulo", nr: "Imithombo nemvelaphi", ve: "Zwiko na vhubvo",
  },
  adaptedFrom: {
    en: "Adapted from", tn: "E tswa mo go", af: "Verwerk uit", zu: "Kususelwa ku", xh: "Kususelwa ku",
    nso: "E tšwa go", st: "E nkilwe ho", ss: "Kutsatfwe ku", ts: "Swi humesiwe eka", nr: "Kuthethwe ku", ve: "Zwo dzhiwa kha",
  },
  perScene: {
    en: "The passage behind each scene",
    tn: "Temana e e mo morago ga ponagalo nngwe le nngwe",
    af: "Die gedeelte agter elke toneel",
    zu: "Isiqephu esingemuva kwesigcawu ngasinye",
    xh: "Isicatshulwa esingasemva komboniso ngamnye",
    nso: "Temana yeo e lego ka morago ga ponagalo ye nngwe le ye nngwe",
    st: "Temana e ka morao ho ponahalo ka nngwe",
    ss: "Sigaba lesingemuva kwesigcawu ngasinye",
    ts: "Xiphemu lexi nga endzhaku ka xivono xin'wana na xin'wana",
    nr: "Isiqephu esingemuva kwengcenye nginye",
    ve: "Ndima i re murahu ha tshivhonala tshiṅwe na tshiṅwe",
  },
  aboutImages: {
    en: "About the images", tn: "Ka ga ditshwantsho", af: "Oor die beelde", zu: "Mayelana nezithombe", xh: "Malunga nemifanekiso",
    nso: "Ka ga diswantšho", st: "Mabapi le ditshwantsho", ss: "Mayelana netitfombe", ts: "Mayelana ni swifaniso", nr: "Malunga neenthombe", ve: "Nga ha zwifanyiso",
  },
  // The same sentence the Reader prints under every plate — an AI render is illustration, never evidence.
  interpretation: {
    en: "AI image — artistic interpretation, not a historical photo.",
    tn: "Setshwantsho sa AI — kakanyo ya botaki, e seng senepe sa hisitori.",
    af: "KI-beeld — artistieke interpretasie, nie 'n historiese foto nie.",
    zu: "Isithombe se-AI — ukuhumusha kobuciko, hhayi isithombe somlando.",
    xh: "Umfanekiso we-AI — utoliko lobugcisa, hayi ifoto yembali.",
    nso: "Seswantšho sa AI — tlhathollo ya bokgabo, e sego senepe sa histori.",
    st: "Setshwantsho sa AI — tlhaloso ya bonono, eseng senepe sa histori.",
    ss: "Sitfombe se-AI — kuhumusha kwebuciko, hhayi sitfombe semlandvo.",
    ts: "Xifaniso xa AI — nhlamuselo ya vutshila, ku nga ri foto ya matimu.",
    nr: "Isithombe se-AI — ukuhlathulula kobuciko, ingasi ifoto yomlando.",
    ve: "Tshifanyiso tsha AI — ṱhalutshedzo ya vhutsila, hu si tshinepe tsha ḓivhazwakale.",
  },
  references: {
    en: "References", tn: "Metswedi", af: "Verwysings", zu: "Izinkomba", xh: "Iimbekiselo",
    nso: "Ditšhupetšo", st: "Ditshupiso", ss: "Tinkhomba", ts: "Swikombiso", nr: "Iinkomba", ve: "Zwiredzwa",
  },
  source: {
    en: "Source", tn: "Motswedi", af: "Bron", zu: "Umthombo", xh: "Umthombo",
    nso: "Mothopo", st: "Mohlodi", ss: "Umtfombo", ts: "Xihlovo", nr: "Umthombo", ve: "Tshiko",
  },
  // The project's one rule, in the words the About screen already uses.
  integrity: {
    en: "Truth only — no invented history.",
    tn: "Nnete fela — ga go na hisitori e e itlhametsweng.",
    af: "Net die waarheid — geen versinde geskiedenis nie.",
    zu: "Iqiniso kuphela — awukho umlando oqanjiwe.",
    xh: "Inyaniso kuphela — akukho mbali eqanjiweyo.",
    nso: "Therešo fela — ga go na histori ye e itlhametšwego.",
    st: "Nnete feela — ha ho histori e iqapetsoeng.",
    ss: "Liciniso kuphela — akukho mlandvo lowentiwe.",
    ts: "Ntiyiso ntsena — a ku na matimu lama vumbiweke.",
    nr: "Iqiniso kwaphela — akukho mlando obunjiweko.",
    ve: "Ngoho fhedzi — a hu na ḓivhazwakale yo vumbiwaho.",
  },
  allSources: {
    en: "About the Sources", tn: "Ka ga Metswedi", af: "Oor die bronne", zu: "Mayelana Nemithombo", xh: "Malunga Nemithombo",
    nso: "Ka ga Methopo", st: "Mabapi le Mehlodi", ss: "Mayelana Nemitfombo", ts: "Mayelana ni Tihlovo", nr: "Malunga Nemithombo", ve: "Nga ha Zwiko",
  },

  // ── Where to go next ──
  continueJourney: {
    en: "Continue the journey", tn: "Tswelela ka leeto", af: "Gaan voort met die reis", zu: "Qhubeka nohambo", xh: "Qhubeka nohambo",
    nso: "Tšwela pele ka leeto", st: "Tsoela pele ka leeto", ss: "Chubeka nekuhamba", ts: "Yisa emahlweni riendzo", nr: "Ragela phambili nekhambo", ve: "Bvelani phanḓa na lwendo",
  },
  askAbout: {
    en: "Ask Ubuntu about this story", tn: "Botsa Ubuntu ka ga kanegelo e", af: "Vra vir Ubuntu oor hierdie storie", zu: "Buza u-Ubuntu ngale ndaba", xh: "Buza u-Ubuntu ngeli bali",
    nso: "Botšiša Ubuntu ka ga kanegelo ye", st: "Botsa Ubuntu ka pale ena", ss: "Buta Ubuntu ngalendzaba", ts: "Vutisa Ubuntu hi ntsheketo lowu", nr: "Buza u-Ubuntu ngalendaba", ve: "Vhudzisa Ubuntu nga ha tshiitwa itshi",
  },
  askQ: {
    en: "Tell me about %s", tn: "Mpolelele ka ga %s", af: "Vertel my van %s", zu: "Ngitshele nge-%s", xh: "Ndixelele nge-%s",
    nso: "Mpotše ka ga %s", st: "Mpolelle ka %s", ss: "Ngitjele nge-%s", ts: "Ndzi byele hi %s", nr: "Ngitjele nge-%s", ve: "Nṋe vhudzani nga ha %s",
  },
  openReader: {
    en: "Open the full reader", tn: "Bula sebadi se se tletseng", af: "Open die volledige leser", zu: "Vula isifundi esigcwele", xh: "Vula umfundi opheleleyo",
    nso: "Bula sebadi se se feletšego", st: "Bula sebadi se felletseng", ss: "Vula sifundzi lesigcwele", ts: "Pfula muhlayi lowu heleleke", nr: "Vula isifundi esizeleko", ve: "Vulani muvhali wo fhelelaho",
  },

  // ── Honest labelling of the language a passage is actually in ──
  draftNote: {
    en: "%s · machine translation, unreviewed draft.",
    tn: "%s · thanolo ya motšhini, e e iseng e sekasekwe.",
    af: "%s · masjienvertaling, ongehersiene konsep.",
    zu: "%s · ukuhumusha komshini, uhlaka olungabuyekeziwe.",
    xh: "%s · uguqulelo lomatshini, uyilo olungahlolwanga.",
    nso: "%s · phetolelo ya motšhene, kakanyetšo yeo e sego ya lekolwa.",
    st: "%s · phetolelo ya mochine, moralo o sa hlahlojwang.",
    ss: "%s · kuhumusha kwemshini, luhlaka lolungakabuyeketwa.",
    ts: "%s · vuhundzuluxi bya muchini, xikombiso lexi nga kambisisiwangiki.",
    nr: "%s · ukutjhugulula komtjhini, uhlaka olungakabuyekezwa.",
    ve: "%s · u ṱalutshedzela nga muṱhini, tshiṅwalwa tshi songo sedzuluswa.",
  },
  fallbackNote: {
    en: "Shown in English · a reviewed %s translation is coming.",
    tn: "E bontshiwa ka Seesemane · thanolo ya %s e e sekasekilweng e e tla.",
    af: "In Engels gewys · 'n hersiene %s-vertaling is op pad.",
    zu: "Iboniswa ngesiNgisi · ukuhumusha kwe-%s okubuyekeziwe kuyeza.",
    xh: "Iboniswa ngesiNgesi · uguqulelo lwe-%s oluhloliweyo luyeza.",
    nso: "E bontšhwa ka Seisemane · phetolelo ya %s yeo e lekotšwego e etla.",
    st: "E bontshwa ka Senyesemane · phetolelo ya %s e hlahlobilweng e tla.",
    ss: "Ikhonjiswa ngesiNgisi · kuhumusha kwe-%s lokubuyeketiwe kuyeta.",
    ts: "Swi kombisiwa hi Xinghezi · vuhundzuluxi bya %s lebyi kambisisiweke bya ta.",
    nr: "Iboniswa ngesiNgisi · ukutjhugululwa kwe-%s okubuyekeziweko kuyeza.",
    ve: "Zwi sumbedzwa nga Luisimane · u ṱalutshedzela ha %s ho sedzuluswaho hu khou ḓa.",
  },
};

/** `module.source` is authored with markdown emphasis (*Mhudi*); this screen renders plain text. */
function plain(s: string) {
  return s.replace(/\*/g, "");
}

export function WatchItemScreen({
  module,
  lang,
  onLangChange,
  country,
  onBack,
  onJourney,
  onReader,
  onAbout,
  onWatched,
}: {
  module: Module;
  lang: Lang;
  onLangChange: (l: Lang) => void;
  /** Selected country — orders the language picker to that country's languages. */
  country: string;
  onBack: () => void;
  /** "Continue the journey" — the staged trail this film feeds into. */
  onJourney: () => void;
  /** The CinematicReader, unchanged, for the full page-turning read. */
  onReader: () => void;
  /** The site-wide "About the Sources" screen. */
  onAbout: () => void;
  /**
   * Report how far through the scenes the viewer got (0..1) — device-local progress only.
   * Takes the module id rather than closing over it so App can pass `progress.setWatched`
   * straight through: a stable callback, which keeps the effect below from re-firing every render.
   */
  onWatched: (moduleId: string, fraction: number) => void;
}) {
  const { width } = useWindowDimensions();
  const wide = width >= 900;
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("adult");
  const tts = useTts();

  const total = module.scenes.length;
  // Clamped rather than trusted: App keys this route by module id so a different film remounts and
  // resets the index, but a stale index against a shorter film would crash the whole page.
  const scene = module.scenes[Math.min(index, total - 1)];

  const imageSource = useMemo(
    () => sceneImageSource(module.id, scene.id, scene.imagePrompt, { seed: scene.seed, w: 1400, h: 800 }),
    [module.id, scene]
  );

  // Title and passage resolve the same way: reviewed copy → machine draft → honest English fallback.
  const titleRes = resolveText(scene.title, lang, draftText(module.id, scene.id, "title", lang));
  const field = mode === "child" ? "childText" : "text";
  const bodyRes = resolveText(
    mode === "child" ? scene.childText : scene.text,
    lang,
    draftText(module.id, scene.id, field, lang)
  );

  // Progress: reaching scene n means n of `total` have been seen. `setWatched` never moves backwards,
  // so paging back and forth cannot lose ground. Nothing here leaves the device (D5).
  useEffect(() => {
    onWatched(module.id, (index + 1) / total);
  }, [module.id, index, total, onWatched]);

  // Never keep narrating a passage that is no longer on screen.
  useEffect(() => {
    tts.stop();
  }, [index, lang, mode]);

  const go = (n: number) => setIndex(Math.max(0, Math.min(total - 1, n)));

  const playerH = wide ? 460 : width >= 600 ? 340 : 230;

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.page}>
      <Pressable onPress={onBack} style={styles.back} accessibilityRole="button" accessibilityLabel={t(UI.back, lang)}>
        <Icon.ChevronLeft size={16} color="rgba(255,255,255,0.7)" />
        <Text style={styles.backText}>{t(UI.back, lang)}</Text>
      </Pressable>

      {/* ── The player ── */}
      <View style={[styles.player, { height: playerH }]}>
        <SceneImage source={imageSource} kenBurns />
        <LinearGradient
          colors={["rgba(0,0,0,0.55)", "rgba(0,0,0,0.12)", "rgba(0,0,0,0.92)"]}
          locations={[0, 0.42, 1]}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />

        <View style={styles.playerTop} pointerEvents="none">
          <Text style={styles.playerKicker} numberOfLines={1}>
            {module.title} · {module.author}
            {module.year ? `, ${module.year}` : ""}
          </Text>
        </View>

        {/* Scene stepping. The arrows sit on the plate itself, the way a player's controls do. */}
        <View style={styles.arrows} pointerEvents="box-none">
          <Pressable
            onPress={() => go(index - 1)}
            disabled={index === 0}
            style={[styles.arrow, index === 0 && styles.arrowOff]}
            accessibilityRole="button"
            accessibilityState={{ disabled: index === 0 }}
            accessibilityLabel={t(UI.prevScene, lang)}
          >
            <Icon.ChevronLeft size={22} color="#FFFFFF" />
          </Pressable>
          <Pressable
            onPress={() => go(index + 1)}
            disabled={index === total - 1}
            style={[styles.arrow, index === total - 1 && styles.arrowOff]}
            accessibilityRole="button"
            accessibilityState={{ disabled: index === total - 1 }}
            accessibilityLabel={t(UI.nextScene, lang)}
          >
            <Icon.ChevronRight size={22} color="#FFFFFF" />
          </Pressable>
        </View>

        <View style={styles.playerBody}>
          <Text style={styles.playerCounter}>
            {t(UI.scene, lang)} {index + 1} {t(UI.of, lang)} {total}
          </Text>
          <Text style={styles.playerTitle} numberOfLines={2}>
            {titleRes.text}
          </Text>
          {/* The scene ticks double as a chapter picker. */}
          <View style={styles.ticks}>
            {module.scenes.map((s, i) => (
              <Pressable
                key={s.id}
                onPress={() => go(i)}
                style={styles.tickHit}
                accessibilityRole="button"
                accessibilityState={{ selected: i === index }}
                accessibilityLabel={`${t(UI.scene, lang)} ${i + 1} ${t(UI.of, lang)} ${total}`}
              >
                <View style={[styles.tick, i <= index && styles.tickOn]} />
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      {/* ── Controls: reading level, language, narration ── */}
      <View style={styles.controls}>
        <View style={styles.segment}>
          {(["adult", "child"] as Mode[]).map((m) => (
            <Pressable
              key={m}
              onPress={() => setMode(m)}
              style={[styles.segBtn, mode === m && styles.segBtnOn]}
              accessibilityRole="button"
              accessibilityState={{ selected: mode === m }}
              accessibilityLabel={t(m === "child" ? UI.child : UI.adult, lang)}
            >
              <Text style={[styles.segText, mode === m && styles.segTextOn]}>
                {t(m === "child" ? UI.child : UI.adult, lang)}
              </Text>
            </Pressable>
          ))}
        </View>

        <LanguagePicker lang={lang} onChange={onLangChange} compact country={country} />

        <Pressable
          onPress={() => (tts.speaking ? tts.stop() : tts.speak(bodyRes.text, bodyRes.lang))}
          style={[styles.listen, tts.speaking && styles.listenOn]}
          accessibilityRole="button"
          accessibilityLabel={tts.speaking ? t(UI.stopListen, lang) : t(UI.listen, lang)}
        >
          {tts.speaking ? (
            <Icon.Square size={12} color={colors.night} fill={colors.night} />
          ) : (
            <Icon.Volume2 size={14} color="#FFFFFF" />
          )}
          <Text style={[styles.listenText, tts.speaking && styles.listenTextOn]}>
            {tts.speaking ? t(UI.stopListen, lang) : t(UI.listen, lang)}
          </Text>
        </Pressable>
      </View>

      {/* ── The passage ── */}
      <View style={[styles.body, wide && styles.bodyWide]}>
        <View style={styles.passageCol}>
          <Text style={styles.passage}>{bodyRes.text}</Text>
          {bodyRes.status === "fallback" ? (
            <Text style={styles.langNote}>{t(UI.fallbackNote, lang).replace("%s", languageByCode(lang).endonym)}</Text>
          ) : null}
          {bodyRes.status === "draft" ? (
            <Text style={styles.langNote}>{t(UI.draftNote, lang).replace("%s", languageByCode(lang).endonym)}</Text>
          ) : null}
          <Text style={styles.sceneSource}>
            {t(UI.source, lang)}: {scene.sourceNote}
          </Text>
        </View>

        <View style={[styles.blurbCol, wide && styles.blurbColWide]}>
          <Text style={styles.blurbLabel}>{t(module.kind === "atlas" ? UI.atlas : UI.books, lang)}</Text>
          <Text style={styles.blurb}>{t(module.blurb, lang)}</Text>
          {/* `audience` is an English-only editorial note on the module, not localized copy — shown
              as written rather than dressed up as a translated label. */}
          <Text style={styles.audience}>{module.audience}</Text>
        </View>
      </View>

      {/* ── Sources & provenance (mandatory — AGENTS.md §4) ── */}
      <View style={styles.prov}>
        <View style={styles.provHead}>
          <Icon.BookOpen size={16} color={colors.dsBlue} />
          <Text style={styles.provTitle}>{t(UI.provenance, lang)}</Text>
        </View>
        <Text style={styles.provRule}>{t(UI.integrity, lang)}</Text>

        <Text style={styles.provLabel}>{t(UI.adaptedFrom, lang)}</Text>
        <Text style={styles.provText}>{plain(module.source)}</Text>

        <Text style={styles.provLabel}>{t(UI.perScene, lang)}</Text>
        {module.scenes.map((s, i) => (
          <Pressable
            key={s.id}
            onPress={() => go(i)}
            style={[styles.provScene, i === index && styles.provSceneOn]}
            accessibilityRole="button"
            accessibilityState={{ selected: i === index }}
            accessibilityLabel={`${t(UI.scene, lang)} ${i + 1}: ${s.title.en}`}
          >
            <Text style={styles.provSceneNo}>{i + 1}</Text>
            <View style={styles.provSceneBody}>
              <Text style={styles.provSceneTitle}>
                {resolveText(s.title, lang, draftText(module.id, s.id, "title", lang)).text}
              </Text>
              <Text style={styles.provSceneNote}>{s.sourceNote}</Text>
            </View>
          </Pressable>
        ))}

        <Text style={styles.provLabel}>{t(UI.aboutImages, lang)}</Text>
        <Text style={styles.provText}>{t(UI.interpretation, lang)}</Text>

        <Text style={styles.provLabel}>{t(UI.references, lang)}</Text>
        {module.references.map((r, i) => (
          <Text key={i} style={styles.provRef}>
            • {r}
          </Text>
        ))}

        <Pressable onPress={onAbout} style={styles.provLink} accessibilityRole="link" accessibilityLabel={t(UI.allSources, lang)}>
          <Text style={styles.provLinkText}>{t(UI.allSources, lang)}</Text>
          <Icon.ArrowRight size={14} color={colors.dsBlue} />
        </Pressable>
      </View>

      {/* ── Where to go next ── */}
      <View style={styles.actions}>
        <Pressable
          onPress={onJourney}
          style={styles.primary}
          accessibilityRole="button"
          accessibilityLabel={t(UI.continueJourney, lang)}
        >
          <Text style={styles.primaryText}>{t(UI.continueJourney, lang)}</Text>
          <Icon.ArrowRight size={16} color={colors.night} />
        </Pressable>

        <Pressable
          onPress={() => askUbuntu(t(UI.askQ, lang).replace("%s", module.title))}
          style={styles.secondary}
          accessibilityRole="button"
          accessibilityLabel={t(UI.askAbout, lang)}
        >
          <Icon.MessageCircle size={15} color={colors.dsBlue} />
          <Text style={styles.secondaryText}>{t(UI.askAbout, lang)}</Text>
        </Pressable>

        <Pressable
          onPress={onReader}
          style={styles.secondary}
          accessibilityRole="button"
          accessibilityLabel={t(UI.openReader, lang)}
        >
          <Icon.BookOpen size={15} color={colors.dsBlue} />
          <Text style={styles.secondaryText}>{t(UI.openReader, lang)}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.xxl },

  back: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start", paddingVertical: spacing.sm },
  backText: { color: "rgba(255,255,255,0.7)", fontFamily: fonts.bodySemi, fontSize: 13 },

  // ── Player ──
  player: {
    borderRadius: radius.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.hairline,
    justifyContent: "flex-end",
    backgroundColor: colors.card,
  },
  playerTop: { position: "absolute", top: 0, left: 0, right: 0, padding: spacing.md },
  playerKicker: {
    color: "rgba(255,255,255,0.86)",
    fontFamily: fonts.bodySemi,
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
  arrows: {
    position: "absolute",
    left: spacing.sm,
    right: spacing.sm,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrow: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
  },
  arrowOff: { opacity: 0.25 },
  playerBody: { padding: spacing.md, gap: 6 },
  playerCounter: {
    color: colors.dsBlue,
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  playerTitle: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 32, lineHeight: 36, letterSpacing: -0.8 },
  ticks: { flexDirection: "row", gap: 4, marginTop: spacing.sm },
  tickHit: { flex: 1, paddingVertical: 8 },
  tick: { height: 3, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.24)" },
  tickOn: { backgroundColor: colors.dsBlue },

  // ── Controls ──
  controls: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  segment: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  segBtn: { paddingVertical: 8, paddingHorizontal: 18 },
  segBtnOn: { backgroundColor: colors.dsBlue },
  segText: { color: "rgba(255,255,255,0.72)", fontFamily: fonts.bodySemi, fontSize: 13 },
  segTextOn: { color: colors.night, fontFamily: fonts.bodyBold },
  listen: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  listenOn: { backgroundColor: colors.dsBlue, borderColor: colors.dsBlue },
  listenText: { color: "#FFFFFF", fontFamily: fonts.bodySemi, fontSize: 13 },
  listenTextOn: { color: colors.night, fontFamily: fonts.bodyBold },

  // ── Passage ──
  body: { marginTop: spacing.lg, gap: spacing.lg },
  bodyWide: { flexDirection: "row" },
  passageCol: { flex: 2, minWidth: 260 },
  passage: { color: "rgba(255,255,255,0.92)", fontFamily: fonts.body, fontSize: 17, lineHeight: 29 },
  langNote: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    marginTop: spacing.sm,
  },
  sceneSource: {
    color: colors.dsBlue,
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    lineHeight: 19,
    marginTop: spacing.md,
  },
  blurbCol: {
    flex: 1,
    minWidth: 220,
    borderTopWidth: 1,
    borderColor: colors.hairlineSoft,
    paddingTop: spacing.md,
    gap: 6,
  },
  // Side-by-side the divider belongs on the gutter, not above the column.
  blurbColWide: { borderTopWidth: 0, borderLeftWidth: 1, paddingTop: 0, paddingLeft: spacing.lg },
  blurbLabel: {
    color: "rgba(255,255,255,0.45)",
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  blurb: { color: "rgba(255,255,255,0.72)", fontFamily: fonts.body, fontSize: 14, lineHeight: 22 },
  audience: { color: "rgba(255,255,255,0.45)", fontFamily: fonts.serifItalic, fontSize: 13, lineHeight: 20, marginTop: spacing.xs },

  // ── Provenance ──
  prov: {
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.md,
    padding: spacing.lg,
    backgroundColor: colors.card,
  },
  provHead: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  provTitle: { color: "#FFFFFF", fontFamily: fonts.heading, fontSize: 20, letterSpacing: -0.3 },
  provRule: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.serifItalic, fontSize: 13.5, marginTop: 6 },
  provLabel: {
    color: colors.dsBlue,
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  provText: { color: "rgba(255,255,255,0.82)", fontFamily: fonts.body, fontSize: 14.5, lineHeight: 23 },
  provScene: {
    flexDirection: "row",
    gap: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    borderLeftWidth: 2,
    borderLeftColor: "transparent",
  },
  provSceneOn: { borderLeftColor: colors.dsBlue, backgroundColor: "rgba(255,255,255,0.04)" },
  provSceneNo: { color: "rgba(255,255,255,0.4)", fontFamily: fonts.bodyBold, fontSize: 13, width: 16 },
  provSceneBody: { flex: 1, gap: 2 },
  provSceneTitle: { color: "#FFFFFF", fontFamily: fonts.bodySemi, fontSize: 14.5 },
  provSceneNote: { color: "rgba(255,255,255,0.62)", fontFamily: fonts.body, fontSize: 13, lineHeight: 20 },
  provRef: { color: "rgba(255,255,255,0.66)", fontFamily: fonts.body, fontSize: 13.5, lineHeight: 22 },
  provLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    marginTop: spacing.lg,
  },
  provLinkText: { color: colors.dsBlue, fontFamily: fonts.bodySemi, fontSize: 13.5 },

  // ── Actions ──
  actions: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.lg },
  primary: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.dsBlue,
    borderRadius: radius.pill,
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  primaryText: { color: colors.night, fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 0.2 },
  secondary: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.pill,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  secondaryText: { color: "rgba(255,255,255,0.86)", fontFamily: fonts.bodySemi, fontSize: 14 },
});
