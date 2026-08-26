import React, { useRef, useState, useEffect } from "react";
import { View, Text, Pressable, Animated, StyleSheet, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Module, Lang } from "../../content/types";
import { modules } from "../../content";
import { sceneImageSource } from "../../content/images";
import { t } from "../../i18n";
import { SceneImage } from "../SceneImage";
import { HistoryTrail, type HistoryTrailHandle } from "../HistoryTrail";
import { historyTrailSource, historyTrail, type HistoryMilestone } from "../../content/history-trail";
import { JourneyStory } from "../JourneyStory";
import { mediaFor, hasStory } from "../../content/journey-media";
import { PressScale, Reveal } from "../Motion";
import { colors, spacing, radius, fonts } from "../../theme/tokens";
import { Icon } from "../../ui";

// The hero — lifted verbatim out of HomeGallery (Architecture v2, D6). The full-viewport scene image,
// the winding SA history road (1652 → today) behind the big words, the guided walk and the full-screen
// dot-stories all behave exactly as they did on the old landing page. Nothing here is restyled.
// See docs/13-architecture-v2-plan.md §3.
//
// TRANSITIONAL SEAM (D2): `onStartJourney` is optional. While it is absent, "Start the journey" opens
// the in-place overlay exactly as before. Once the dedicated /journey page lands (V2-16) the app passes
// it, the hero becomes the cinematic preview that *links into* that page, and the overlay retires.

const PHOTO = "warm documentary photography, golden natural light, photorealistic, dignified African subjects, rich colour";
const SLATE = "#000000"; // ground → pure black

const UI = {
  startJourney: { en: "Start the journey", tn: "Simolola leeto", af: "Begin die reis", zu: "Qala uhambo", xh: "Qala uhambo", nso: "Thoma leeto", st: "Qala leeto", ss: "Cala luhambo", ts: "Sungula riendzo", nr: "Thoma ikhambo", ve: "Thoma lwendo" },
  closeJourney: { en: "Close the journey", tn: "Tswala leeto", af: "Sluit die reis", zu: "Vala uhambo", xh: "Vala uhambo", nso: "Tswalela leeto", st: "Koala leeto", ss: "Vala luhambo", ts: "Pfala riendzo", nr: "Vala ikhambo", ve: "Vala lwendo" },
  journeyTitle: {
    en: "The journey of a nation", tn: "Leeto la setšhaba", af: "Die reis van 'n nasie", zu: "Uhambo lwesizwe", xh: "Uhambo lwesizwe",
    nso: "Leeto la setšhaba", st: "Leeto la setjhaba", ss: "Luhambo lwesive", ts: "Riendzo ra rixaka", nr: "Ikhambo lesitjhaba", ve: "Lwendo lwa lushaka",
  },
  journeyHint: {
    en: "1652 → today · tap a year", tn: "1652 → gompieno · tobetsa ngwaga", af: "1652 → vandag · tik 'n jaar", zu: "1652 → namuhla · thepha unyaka", xh: "1652 → namhlanje · cofa unyaka",
    nso: "1652 → lehono · kgotla ngwaga", st: "1652 → kajeno · tobetsa selemo", ss: "1652 → lamuhla · tsindza umnyaka", ts: "1652 → namuntlha · tsindziya lembe", nr: "1652 → namhlanjesi · thepha umnyaka", ve: "1652 → ṋamusi · pusani ṅwaha",
  },
  keepWalking: { en: "Keep walking", tn: "Tswelela pele", af: "Stap verder", zu: "Qhubeka uhambe", xh: "Qhubeka uhambe", nso: "Tšwela pele", st: "Tsoela pele", ss: "Chubeka uhambe", ts: "Famba emahlweni", nr: "Ragela phambili", ve: "Bvelani phanḓa" },
  journeyDone: { en: "Restart the journey", tn: "Simolola leeto gape", af: "Herbegin die reis", zu: "Qalisa kabusha uhambo", xh: "Qalisa kwakhona uhambo", nso: "Thoma leeto gape", st: "Qala leeto hape", ss: "Cala kabusha luhambo", ts: "Sungula nakambe riendzo", nr: "Thoma godu ikhambo", ve: "Thoma hafhu lwendo" },
  playStory: { en: "Play the story", tn: "Bapala kanegelo", af: "Speel die storie", zu: "Dlala indaba", xh: "Dlala ibali", nso: "Bapala kanegelo", st: "Bapala pale", ss: "Dlala indzaba", ts: "Tlanga ntsheketo", nr: "Dlala indaba", ve: "Tambani tshiitwa" },
  storySkip: { en: "Skip", tn: "Tlola", af: "Slaan oor", zu: "Yeqa", xh: "Tsiba", nso: "Fetiša", st: "Tlōla", ss: "Yeca", ts: "Tlula", nr: "Yeqa", ve: "Fhirisa" },
  storyBack: { en: "Back", tn: "Morago", af: "Terug", zu: "Emuva", xh: "Emva", nso: "Morago", st: "Morao", ss: "Emuva", ts: "Endzhaku", nr: "Emuva", ve: "Murahu" },
  storyWatch: { en: "Watch the film", tn: "Lebelela filimi", af: "Kyk die film", zu: "Buka ifilimu", xh: "Bukela ifilimu", nso: "Lebelela filimi", st: "Sheba filimi", ss: "Buka ifilimu", ts: "Languta filimi", nr: "Buka ifilimu", ve: "Lavhelesa filimi" },
  storyInterpretation: { en: "Artistic interpretation", tn: "Setshwantsho sa botaki (e seng senepe)", af: "Artistieke vertolking", zu: "Ukuhunyushwa kobuciko", xh: "Utoliko lobugcisa", nso: "Tlhathollo ya bokgabo", st: "Tlhaloso ya bonono", ss: "Kuhunyushwa kwebuciko", ts: "Nhlamuselo ya vutshila", nr: "Ukuhlathululwa kobuciko", ve: "Ṱhalutshedzo ya vhutsila" },
};

function heroSource(m: Module, w = 1200, h = 900) {
  const s = m.scenes[0];
  return sceneImageSource(m.id, s.id, `${s.imagePrompt}, ${PHOTO}`, { seed: s.seed, w, h });
}

// The journey state, shared by the hero (which lives INSIDE the page scroll) and the full-screen
// dot-story overlay (which must stay a SIBLING of the ScrollView so it covers the viewport rather
// than the scroll content). Splitting it this way keeps both pieces byte-identical to the old
// landing page — see docs/13-architecture-v2-plan.md §3.
export function useHomeJourney({
  onStoryActiveChange,
  onStartJourney,
}: {
  /** Notifies the app when the journey or a full-screen dot-story is active (hides the floating chatbot). */
  onStoryActiveChange?: (active: boolean) => void;
  /** D2 seam — when provided, "Start the journey" navigates to the /journey page instead of opening
   *  the in-place overlay. Absent for now, so behaviour is identical to the old landing page. */
  onStartJourney?: () => void;
}) {
  // History-trail "journey": the timeline sits dim behind the hero words by default; starting the
  // journey brings it forward (bright + tappable) and fades the big words back.
  const [mapOpen, setMapOpen] = useState(false);
  const [milestone, setMilestone] = useState<HistoryMilestone | null>(null);
  // The walk is driven from the caption card via this handle; walkState picks the label + disables mid-step.
  const trailRef = useRef<HistoryTrailHandle>(null);
  const [walkState, setWalkState] = useState<{ atLast: boolean; walking: boolean }>({ atLast: false, walking: false });
  // The "dot story" (full-screen picture → film) currently playing, or null.
  const [storyId, setStoryId] = useState<string | null>(null);
  const trailOpacity = useRef(new Animated.Value(0.16)).current;
  const wordsOpacity = useRef(new Animated.Value(1)).current;
  const scrimOpacity = useRef(new Animated.Value(0)).current;
  const animateTo = (open: boolean) =>
    Animated.parallel([
      Animated.timing(trailOpacity, { toValue: open ? 1 : 0.16, duration: 420, useNativeDriver: true }),
      Animated.timing(wordsOpacity, { toValue: open ? 0.12 : 1, duration: 420, useNativeDriver: true }),
      Animated.timing(scrimOpacity, { toValue: open ? 0.62 : 0, duration: 420, useNativeDriver: true }),
    ]);
  const openMap = () => {
    // D2: once the /journey page exists, the hero hands off to it instead of opening the overlay.
    if (onStartJourney) {
      onStartJourney();
      return;
    }
    setMapOpen(true);
    animateTo(true).start();
    // Right after starting the journey, open the opening milestone's story (1652: the arrival) —
    // full-screen picture then film. Skipping returns to the walk.
    const firstId = historyTrail[0]?.id;
    if (firstId && hasStory(firstId)) setStoryId(firstId);
  };
  const closeMap = () => { setMapOpen(false); setMilestone(null); setStoryId(null); animateTo(false).start(); };

  const storyMilestone = storyId ? historyTrail.find((m) => m.id === storyId) ?? null : null;
  const storyMedia = storyId ? mediaFor(storyId) : undefined;

  // Hide the floating chatbot for the whole journey (walk + full-screen story) so it never crowds the
  // caption's controls on a phone; reset on unmount.
  useEffect(() => {
    onStoryActiveChange?.(mapOpen || !!(storyMilestone && storyMedia));
    return () => onStoryActiveChange?.(false);
  }, [storyId, mapOpen]);

  return { mapOpen, milestone, setMilestone, trailRef, walkState, setWalkState, storyId, setStoryId, trailOpacity, wordsOpacity, scrimOpacity, openMap, closeMap, storyMilestone, storyMedia };
}

export type HomeJourney = ReturnType<typeof useHomeJourney>;

export function HomeHero({ lang, journey }: { lang: Lang; journey: HomeJourney }) {
  const { width, height } = useWindowDimensions();
  const wide = width >= 768;
  const heroH = Math.max(520, height); // full-viewport hero (like the reference's h-screen)
  const { mapOpen, milestone, setMilestone, trailRef, walkState, setWalkState, storyId, setStoryId, trailOpacity, wordsOpacity, scrimOpacity, openMap, closeMap } = journey;

  return (
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
            ref={trailRef}
            active={mapOpen}
            dimOpacity={trailOpacity}
            onSelect={setMilestone}
            selectedId={milestone?.id}
            onStart={openMap}
            startLabel={t(UI.startJourney, lang)}
            onWalkChange={setWalkState}
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
              <View style={styles.mapCaption} pointerEvents="box-none">
                <Text style={styles.capYear}>{milestone.year}</Text>
                <Text style={styles.capTitle}>{milestone.title}</Text>
                <Text style={styles.capNote}>{milestone.note}</Text>
                {/* Both actions live here (fixed, never under a dot): the primary gold "Keep walking"
                    advances the walk; the outlined "Play the story" opens this year's picture/film. */}
                <View style={styles.capBtnRow}>
                  {!walkState.atLast ? (
                    <Pressable
                      style={[styles.walkCta, walkState.walking && styles.walkCtaDisabled]}
                      onPress={() => trailRef.current?.walkNext()}
                      disabled={walkState.walking}
                      accessibilityRole="button"
                      accessibilityLabel={t(UI.keepWalking, lang)}
                    >
                      <Text style={styles.walkCtaText}>{t(UI.keepWalking, lang)}</Text>
                      <Icon.ChevronRight size={15} color={colors.night} />
                    </Pressable>
                  ) : (
                    <Pressable
                      style={styles.walkCta}
                      onPress={() => trailRef.current?.restart()}
                      accessibilityRole="button"
                      accessibilityLabel={t(UI.journeyDone, lang)}
                    >
                      <Icon.RotateCcw size={14} color={colors.night} />
                      <Text style={styles.walkCtaText}>{t(UI.journeyDone, lang)}</Text>
                    </Pressable>
                  )}
                  {hasStory(milestone.id) ? (
                    <PressScale style={styles.storyBtn} onPress={() => setStoryId(milestone.id)} accessibilityLabel={t(UI.playStory, lang)}>
                      <Icon.Play size={13} color={colors.gold} fill={colors.gold} />
                      <Text style={styles.storyBtnText}>{t(UI.playStory, lang)}</Text>
                    </PressScale>
                  ) : null}
                </View>
              </View>
            ) : (
              <Text style={styles.mapSource} pointerEvents="none">{historyTrailSource}</Text>
            )}
          </View>
        ) : null}
      </View>
  );
}

// The full-screen dot-story. Rendered by the page OUTSIDE its ScrollView so it covers the viewport.
export function HomeJourneyStory({ lang, journey }: { lang: Lang; journey: HomeJourney }) {
  const { storyMilestone, storyMedia, setStoryId } = journey;
  return (
    <>
      {storyMilestone && storyMedia ? (
        <JourneyStory
          milestone={storyMilestone}
          media={storyMedia}
          onClose={() => setStoryId(null)}
          labels={{
            skip: t(UI.storySkip, lang),
            back: t(UI.storyBack, lang),
            watch: t(UI.storyWatch, lang),
            interpretation: t(UI.storyInterpretation, lang),
          }}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
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
  // Caption actions sit in one row; wrap on very narrow screens so both stay tappable.
  capBtnRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.md },
  // Primary: solid gold — advances the guided walk.
  walkCta: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#E8B45A", borderRadius: radius.pill, paddingVertical: 9, paddingHorizontal: 16 },
  walkCtaText: { color: colors.night, fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 0.3 },
  walkCtaDisabled: { opacity: 0.45 },
  // Secondary: outlined gold — opens this year's story (distinct from Keep walking so they're not confused).
  storyBtn: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(232,180,90,0.14)", borderWidth: 1, borderColor: "#E8B45A", borderRadius: radius.pill, paddingVertical: 8, paddingHorizontal: 14 },
  storyBtnText: { color: "#E8B45A", fontFamily: fonts.bodyBold, fontSize: 12.5, letterSpacing: 0.3 },
  mapSource: { alignSelf: "center", maxWidth: 560, color: "rgba(255,255,255,0.5)", fontFamily: fonts.serifItalic, fontSize: 12, lineHeight: 18, textAlign: "center" },
});
