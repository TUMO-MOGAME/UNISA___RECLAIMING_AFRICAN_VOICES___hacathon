import React, { useMemo, useState } from "react";
import { View, Text, Pressable, Image, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Lang } from "../content/types";
import { t } from "../i18n";
import { colors, spacing, radius, fonts } from "../theme/tokens";
import { Icon } from "../ui";
import { SceneImage } from "./SceneImage";
import { JourneyStory } from "./JourneyStory";
import { historyTrail, historyTrailSource } from "../content/history-trail";
import { journeyMedia, hasStory } from "../content/journey-media";
import { quizFor, quizSource, type QuizQuestion } from "../content/quiz";
import { totems } from "../content/totems";
import { STARS_PER_STAGE } from "../services/progress/progress";

// One stage of the Journey (v2 V2-18, wireframe 2e): WATCH → QUIZ → REWARD.
//
// The three steps are honest about what exists. A milestone with no film shows its picture and its
// sourced note instead of pretending to have one; a milestone with no quiz yet goes straight from
// watching to its reward rather than inventing a question to fill the gap. Nothing is fabricated to
// keep the shape of the flow intact.
//
// The reward is a heritage card drawn from content/totems.ts — real clan totems, assigned to stages
// in order, so the same stage always yields the same card.

type Step = "watch" | "quiz" | "reward";

const UI = {
  back: {
    en: "Back to the journey", tn: "Boela kwa leetong", af: "Terug na die reis", zu: "Buyela ohambweni", xh: "Buyela kuhambo",
    nso: "Boela leetong", st: "Kgutlela leetong", ss: "Buyela eluhambweni", ts: "Tlhelela eriendzweni", nr: "Buyela ekhambweni", ve: "Vhuyelelani lwendoni",
  },
  step: { en: "Step", tn: "Kgato", af: "Stap", zu: "Isinyathelo", xh: "Inyathelo", nso: "Kgato", st: "Mohato", ss: "Sinyatselo", ts: "Goza", nr: "Igadango", ve: "Ḽiga" },
  of: { en: "of", tn: "ya", af: "van", zu: "kwa", xh: "kwa", nso: "ya", st: "ya", ss: "kwa", ts: "ya", nr: "kwa", ve: "ya" },
  watch: { en: "Watch", tn: "Lebelela", af: "Kyk", zu: "Buka", xh: "Bukela", nso: "Lebelela", st: "Sheba", ss: "Buka", ts: "Languta", nr: "Buka", ve: "Lavhelesa" },
  quiz: { en: "Question", tn: "Potso", af: "Vraag", zu: "Umbuzo", xh: "Umbuzo", nso: "Potšišo", st: "Potso", ss: "Umbuto", ts: "Xivutiso", nr: "Umbuzo", ve: "Mbudziso" },
  reward: { en: "Reward", tn: "Moputso", af: "Beloning", zu: "Umklomelo", xh: "Umvuzo", nso: "Moputso", st: "Moputso", ss: "Umklomelo", ts: "Hakelo", nr: "Umvuzo", ve: "Malamba" },
  playStory: {
    en: "Play the story", tn: "Bapala kanegelo", af: "Speel die storie", zu: "Dlala indaba", xh: "Dlala ibali",
    nso: "Bapala kanegelo", st: "Bapala pale", ss: "Dlala indzaba", ts: "Tlanga ntsheketo", nr: "Dlala indaba", ve: "Tambani tshiitwa",
  },
  toQuiz: {
    en: "I've watched it — next", tn: "Ke e lebeletse — e latelang", af: "Ek het dit gekyk — volgende", zu: "Ngiyibukile — okulandelayo", xh: "Ndiyibukele — okulandelayo",
    nso: "Ke e lebeletše — ye e latelago", st: "Ke e shebile — e latelang", ss: "Ngiyibukile — lokulandzelako", ts: "Ndzi yi languterile — leswi landzelaka", nr: "Ngiyibukile — okulandelako", ve: "Ndo i lavhelesa — zwi tevhelaho",
  },
  check: { en: "Check answer", tn: "Sekaseka karabo", af: "Kyk antwoord", zu: "Hlola impendulo", xh: "Jonga impendulo", nso: "Lekola karabo", st: "Hlahloba karabo", ss: "Hlola imphendvulo", ts: "Kambela nhlamulo", nr: "Hlola ipendulo", ve: "Sedzani phindulo" },
  next: { en: "Next question", tn: "Potso e e latelang", af: "Volgende vraag", zu: "Umbuzo olandelayo", xh: "Umbuzo olandelayo", nso: "Potšišo ye e latelago", st: "Potso e latelang", ss: "Umbuto lolandzelako", ts: "Xivutiso lexi landzelaka", nr: "Umbuzo olandelako", ve: "Mbudziso i tevhelaho" },
  right: { en: "That's right", tn: "Go siame", af: "Dis reg", zu: "Kulungile", xh: "Kulungile", nso: "Go lokile", st: "Ho lokile", ss: "Kulungile", ts: "Swi lulamile", nr: "Kulungile", ve: "Zwo luga" },
  wrong: { en: "Not quite", tn: "Ga se gone", af: "Nie heeltemal nie", zu: "Akulungile", xh: "Akulunganga", nso: "Ga se gona", st: "Hase hantle", ss: "Akulungile", ts: "A swi lulamanga", nr: "Akulungile", ve: "A zwo ngo luga" },
  earned: {
    en: "Stage complete", tn: "Kgato e fedile", af: "Fase voltooi", zu: "Isinyathelo siqediwe", xh: "Inyathelo ligqityiwe",
    nso: "Kgato e feditšwe", st: "Mohato o phethilwe", ss: "Sinyatselo sicedziwe", ts: "Goza ri hetiwile", nr: "Igadango liqediwe", ve: "Ḽiga ḽo fhela",
  },
  newCard: {
    en: "New heritage card", tn: "Karata e ntšha ya boswa", af: "Nuwe erfeniskaart", zu: "Ikhadi elisha lamagugu", xh: "Ikhadi elitsha lelifa",
    nso: "Karata ye mpsha ya bohwa", st: "Karete e ntjha ya lefa", ss: "Likhadi lelisha lelifa", ts: "Khadi lerintshwa ra ndzhaka", nr: "Ikharada etjha yelifa", ve: "Khadi ntswa ya ifa",
  },
  continue: {
    en: "Continue the journey", tn: "Tswelela ka leeto", af: "Gaan voort met die reis", zu: "Qhubeka nohambo", xh: "Qhubeka nohambo",
    nso: "Tšwela pele ka leeto", st: "Tsoela pele ka leeto", ss: "Chubeka nekuhamba", ts: "Yisa emahlweni riendzo", nr: "Ragela phambili nekhambo", ve: "Bvelani phanḓa na lwendo",
  },
  noFilm: {
    en: "No film for this moment yet — the picture and the record below are what we have.",
    tn: "Ga go na filimi ya nako e go fitlha jaanong — setshwantsho le pego e e fa tlase ke tse re nang le tsona.",
    af: "Nog geen film vir hierdie oomblik nie — die prent en die rekord hieronder is wat ons het.",
    zu: "Alukho ufilimu lwalesi sikhathi okwamanje — isithombe nomlando ongezansi yikho esinakho.",
    xh: "Akukho filimu yeli xesha okwangoku — umfanekiso nembali engezantsi koko sinako.",
    nso: "Ga go na filimi ya nako ye go fihla bjale — seswantšho le pego ye e lego ka tlase ke tšeo re nago le tšona.",
    st: "Ha ho filimi ya nako ena hajoale — setshwantsho le tlaleho e ka tlase ke tseo re nang le tsona.",
    ss: "Kute lifilimu lalesi sikhatsi okwanyalo — sitfombe nemlandvo longentasi ngikho lesinako.",
    ts: "A ku na filimi ya nkarhi lowu ku fikela sweswi — xifaniso ni rhekhodo leyi nga hansi hi swona leswi hi nga na swona.",
    nr: "Alikho ifilimu yalesi sikhathi okwanje — isithombe nomlando ongaphasi ngikho esinakho.",
    ve: "A hu na filimu ya tshifhinga itshi zwino — tshifanyiso na rekhodo i re fhasi ndi zwine ra vha nazwo.",
  },
  noQuiz: {
    en: "This moment's question is still being sourced. We only ask what we can back up.",
    tn: "Potso ya nako e e sa ntse e batlisisiwa. Re botsa fela se re ka se tshegetsang.",
    af: "Hierdie oomblik se vraag word nog nagevors. Ons vra net wat ons kan staaf.",
    zu: "Umbuzo walesi sikhathi usacwaningwa. Sibuza kuphela lokho esingakuqinisekisa.",
    xh: "Umbuzo weli xesha usaphandwa. Sibuza kuphela oko sinokukungqina.",
    nso: "Potšišo ya nako ye e sa nyakišišwa. Re botšiša fela seo re ka se thekgago.",
    st: "Potso ya nako ena e ntse e batlisiswa. Re botsa feela seo re ka se tshehetsang.",
    ss: "Umbuto walesi sikhatsi usacwaningwa. Sibuta kuphela loko lesingakucinisekisa.",
    ts: "Xivutiso xa nkarhi lowu xa ha lavisisiwa. Hi vutisa ntsena leswi hi nga swi seketelaka.",
    nr: "Umbuzo walesi sikhathi usarhubhululwa. Sibuza kwaphela lokho esingakusekelako.",
    ve: "Mbudziso ya tshifhinga itshi i kha ḓi ṱoḓisiswa. Ri vhudzisa fhedzi zwine ra nga zwi tikedza.",
  },
};

/** The heritage card for a stage — real totems, assigned in order so a stage always gives the same one. */
function cardForStage(index: number) {
  return totems[index % totems.length];
}

export function StageScreen({
  milestoneId,
  lang,
  stageNumber,
  alreadyDone,
  onComplete,
  onBack,
}: {
  milestoneId: string;
  lang: Lang;
  stageNumber: number;
  alreadyDone: boolean;
  /** Fired once the stage is finished: award stars + the card. */
  onComplete: (cardId: string) => void;
  onBack: () => void;
}) {
  const { width } = useWindowDimensions();
  const wide = width >= 900;
  const milestone = useMemo(() => historyTrail.find((m) => m.id === milestoneId), [milestoneId]);
  const questions = useMemo(() => quizFor(milestoneId), [milestoneId]);
  const media = milestone ? journeyMedia[milestone.id] : undefined;

  const [step, setStep] = useState<Step>("watch");
  const [storyOpen, setStoryOpen] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  if (!milestone) return null;

  const card = cardForStage(stageNumber - 1);
  const q: QuizQuestion | undefined = questions[qIdx];
  const totalSteps = questions.length > 0 ? 3 : 2;

  const finish = () => {
    if (!alreadyDone) onComplete(card.id);
    setStep("reward");
  };

  const onCheck = () => {
    if (picked === null || !q) return;
    setChecked(true);
    if (q.options[picked]?.correct) setCorrectCount((c) => c + 1);
  };

  const onNext = () => {
    if (qIdx + 1 < questions.length) {
      setQIdx(qIdx + 1);
      setPicked(null);
      setChecked(false);
    } else {
      finish();
    }
  };

  const stepNo = step === "watch" ? 1 : step === "quiz" ? 2 : totalSteps;
  const stepLabel = step === "watch" ? t(UI.watch, lang) : step === "quiz" ? t(UI.quiz, lang) : t(UI.reward, lang);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.page}>
        <Pressable
          onPress={onBack}
          style={styles.back}
          accessibilityRole="button"
          accessibilityLabel={`${t(UI.back, lang)} — ${milestone.year} ${milestone.title}`}
        >
          <Icon.ChevronLeft size={16} color="rgba(255,255,255,0.7)" />
          <Text style={styles.backText}>{milestone.year} · {milestone.title}</Text>
        </Pressable>

        <Text style={styles.stepLine}>
          {t(UI.step, lang)} {stepNo} {t(UI.of, lang)} {totalSteps} — {stepLabel.toUpperCase()}
        </Text>

        {/* ── 1. WATCH ── */}
        {step === "watch" ? (
          <View style={styles.block}>
            <View style={[styles.stage, wide ? styles.stageWide : styles.stageNarrow]}>
              {media?.image ? <SceneImage source={media.image} kenBurns /> : null}
              <LinearGradient
                colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.85)"]}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
              />
              <View style={styles.stageBody}>
                <Text style={styles.stageYear}>{milestone.year}</Text>
                <Text style={styles.stageTitle}>{milestone.title}</Text>
              </View>
              {hasStory(milestone.id) ? (
                <Pressable onPress={() => setStoryOpen(true)} style={styles.playFab} accessibilityLabel={t(UI.playStory, lang)}>
                  <Icon.Play size={22} color={colors.night} fill={colors.night} />
                </Pressable>
              ) : null}
            </View>

            <Text style={styles.note}>{milestone.note}</Text>
            {!media?.video && !media?.videos ? <Text style={styles.quiet}>{t(UI.noFilm, lang)}</Text> : null}

            {/* The smaller events branching off this milestone — real, sourced side-roads. */}
            {milestone.branches?.length ? (
              <View style={styles.branches}>
                {milestone.branches.map((b) => (
                  <View key={b.id} style={styles.branch}>
                    <Text style={styles.branchYear}>{b.year}</Text>
                    <View style={styles.branchBody}>
                      <Text style={styles.branchTitle}>{b.title}</Text>
                      <Text style={styles.branchNote}>{b.note}</Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : null}

            <Pressable
              onPress={() => (questions.length ? setStep("quiz") : finish())}
              style={styles.cta}
              accessibilityRole="button"
              accessibilityLabel={t(UI.toQuiz, lang)}
            >
              <Text style={styles.ctaText}>{t(UI.toQuiz, lang)}</Text>
              <Icon.ArrowRight size={16} color={colors.night} />
            </Pressable>
            <Text style={styles.source}>{historyTrailSource}</Text>
          </View>
        ) : null}

        {/* ── 2. QUIZ ── */}
        {step === "quiz" && q ? (
          <View style={styles.block}>
            <View style={styles.dots}>
              {questions.map((_, i) => (
                <View key={i} style={[styles.qDot, i === qIdx && styles.qDotOn, i < qIdx && styles.qDotDone]} />
              ))}
            </View>

            <Text style={styles.prompt}>{t(q.prompt, lang)}</Text>

            <View style={styles.options}>
              {q.options.map((o, i) => {
                const isPicked = picked === i;
                const reveal = checked && (o.correct || isPicked);
                return (
                  <Pressable
                    key={i}
                    onPress={() => !checked && setPicked(i)}
                    disabled={checked}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isPicked, disabled: checked }}
                    accessibilityLabel={t(o.text, lang)}
                    style={[
                      styles.option,
                      isPicked && !checked && styles.optionPicked,
                      reveal && o.correct && styles.optionRight,
                      reveal && isPicked && !o.correct && styles.optionWrong,
                    ]}
                  >
                    <Text style={styles.optionText}>{t(o.text, lang)}</Text>
                    {reveal ? (
                      o.correct ? (
                        <Icon.Check size={16} color={colors.live} />
                      ) : isPicked ? (
                        <Icon.X size={16} color="#E4794A" />
                      ) : null
                    ) : null}
                  </Pressable>
                );
              })}
            </View>

            {checked ? (
              <View style={styles.explain}>
                <Text style={[styles.verdict, q.options[picked ?? -1]?.correct ? styles.verdictRight : styles.verdictWrong]}>
                  {q.options[picked ?? -1]?.correct ? t(UI.right, lang) : t(UI.wrong, lang)}
                </Text>
                <Text style={styles.explainText}>{t(q.explain, lang)}</Text>
              </View>
            ) : null}

            <Pressable
              onPress={checked ? onNext : onCheck}
              disabled={picked === null}
              style={[styles.cta, picked === null && styles.ctaDisabled]}
              accessibilityRole="button"
              accessibilityState={{ disabled: picked === null }}
              accessibilityLabel={
                checked ? (qIdx + 1 < questions.length ? t(UI.next, lang) : t(UI.continue, lang)) : t(UI.check, lang)
              }
            >
              <Text style={styles.ctaText}>
                {checked ? (qIdx + 1 < questions.length ? t(UI.next, lang) : t(UI.continue, lang)) : t(UI.check, lang)}
              </Text>
              <Icon.ArrowRight size={16} color={colors.night} />
            </Pressable>
            <Text style={styles.source}>{quizSource}</Text>
          </View>
        ) : null}

        {/* ── 3. REWARD ── */}
        {step === "reward" ? (
          <View style={styles.block}>
            <View style={styles.rewardHead}>
              <Text style={styles.rewardTitle}>{t(UI.earned, lang)}</Text>
              {!alreadyDone ? <Text style={styles.rewardStars}>+{STARS_PER_STAGE} ★</Text> : null}
              {questions.length ? (
                <Text style={styles.rewardScore}>
                  {correctCount} / {questions.length}
                </Text>
              ) : null}
            </View>

            <View style={styles.cardPlate}>
              <Image source={card.image} style={styles.cardArt} resizeMode="cover" accessibilityLabel={card.animal} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardLabel}>{t(UI.newCard, lang)}</Text>
                <Text style={styles.cardName}>{card.animal}</Text>
                {card.terms.sothoTswana || card.terms.nguni ? (
                  <Text style={styles.cardTerms}>
                    {[card.terms.sothoTswana, card.terms.nguni, card.terms.venda].filter(Boolean).join(" · ")}
                  </Text>
                ) : null}
                <Text style={styles.cardClans}>{card.clans}</Text>
                <Text style={styles.cardMeaning}>{card.meaning}</Text>
                <Text style={styles.source}>{card.sourceNote}</Text>
              </View>
            </View>

            {!questions.length ? <Text style={styles.quiet}>{t(UI.noQuiz, lang)}</Text> : null}

            <Pressable
              onPress={onBack}
              style={styles.cta}
              accessibilityRole="button"
              accessibilityLabel={t(UI.continue, lang)}
            >
              <Text style={styles.ctaText}>{t(UI.continue, lang)}</Text>
              <Icon.ArrowRight size={16} color={colors.night} />
            </Pressable>
          </View>
        ) : null}
      </ScrollView>

      {storyOpen ? (
        <JourneyStory
          milestone={milestone}
          media={media!}
          onClose={() => setStoryOpen(false)}
          labels={{ skip: "Skip", back: "Back", watch: "Watch the film", interpretation: "Artistic interpretation" }}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  page: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.xxl },

  back: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", paddingVertical: spacing.sm },
  backText: { color: "rgba(255,255,255,0.7)", fontFamily: fonts.bodySemi, fontSize: 13.5 },

  stepLine: {
    color: colors.dsBlue,
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 2.4,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },

  block: { gap: spacing.md, maxWidth: 780 },

  stage: { borderRadius: radius.md, overflow: "hidden", backgroundColor: colors.card, justifyContent: "flex-end" },
  stageWide: { height: 340 },
  stageNarrow: { height: 220 },
  stageBody: { padding: spacing.lg, gap: 2 },
  stageYear: { color: colors.dsBlue, fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 1 },
  stageTitle: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 32, lineHeight: 34, letterSpacing: -0.8 },
  playFab: {
    position: "absolute",
    top: "50%",
    alignSelf: "center",
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.dsBlue,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -29,
  },

  note: { color: "rgba(255,255,255,0.82)", fontFamily: fonts.body, fontSize: 15.5, lineHeight: 25 },
  quiet: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21 },

  branches: { gap: spacing.sm, borderLeftWidth: 2, borderLeftColor: "rgba(26,133,167,0.35)", paddingLeft: spacing.md },
  branch: { flexDirection: "row", gap: spacing.md },
  branchYear: { width: 44, color: colors.dsBlue, fontFamily: fonts.bodyBold, fontSize: 12.5, paddingTop: 1 },
  branchBody: { flex: 1, gap: 2 },
  branchTitle: { color: "#FFFFFF", fontFamily: fonts.bodySemi, fontSize: 13.5 },
  branchNote: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18 },

  dots: { flexDirection: "row", gap: 6 },
  qDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.2)" },
  qDotOn: { backgroundColor: colors.dsBlue },
  qDotDone: { backgroundColor: "rgba(26,133,167,0.6)" },

  prompt: { color: "#FFFFFF", fontFamily: fonts.heading, fontSize: 22, lineHeight: 30 },
  options: { gap: spacing.sm },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: colors.hairline,
    backgroundColor: colors.card,
  },
  optionPicked: { borderColor: colors.dsBlue, backgroundColor: "rgba(26,133,167,0.12)" },
  optionRight: { borderColor: colors.live, backgroundColor: "rgba(63,191,106,0.12)" },
  optionWrong: { borderColor: "#E4794A", backgroundColor: "rgba(228,121,74,0.10)" },
  optionText: { flex: 1, color: "#FFFFFF", fontFamily: fonts.body, fontSize: 15, lineHeight: 22 },

  explain: {
    gap: 6,
    padding: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  verdict: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 1, textTransform: "uppercase" },
  verdictRight: { color: colors.live },
  verdictWrong: { color: "#E4794A" },
  explainText: { color: "rgba(255,255,255,0.82)", fontFamily: fonts.body, fontSize: 14.5, lineHeight: 23 },

  rewardHead: { flexDirection: "row", alignItems: "baseline", gap: spacing.md, flexWrap: "wrap" },
  rewardTitle: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 34, lineHeight: 36, letterSpacing: -0.8 },
  rewardStars: { color: colors.dsBlue, fontFamily: fonts.bodyBold, fontSize: 17 },
  rewardScore: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.bodySemi, fontSize: 15 },

  cardPlate: {
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "rgba(26,133,167,0.45)",
    backgroundColor: "rgba(26,133,167,0.08)",
  },
  cardArt: { width: 96, height: 128, borderRadius: radius.sm, backgroundColor: "#111", flexShrink: 0 },
  cardInfo: { flex: 1, minWidth: 0, gap: 4 },
  cardTerms: { color: colors.dsBlue, fontFamily: fonts.bodySemi, fontSize: 12.5 },
  cardLabel: { color: colors.dsBlue, fontFamily: fonts.bodySemi, fontSize: 11, letterSpacing: 2, textTransform: "uppercase" },
  cardName: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 30, lineHeight: 32, letterSpacing: -0.6 },
  cardClans: { color: "rgba(255,255,255,0.66)", fontFamily: fonts.bodySemi, fontSize: 13 },
  cardMeaning: { color: "rgba(255,255,255,0.78)", fontFamily: fonts.body, fontSize: 14, lineHeight: 22, marginTop: 4 },

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
  ctaDisabled: { opacity: 0.4 },
  ctaText: { color: colors.night, fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 0.4 },

  source: { color: "rgba(255,255,255,0.38)", fontFamily: fonts.serifItalic, fontSize: 11.5, lineHeight: 17, marginTop: spacing.sm },
});
