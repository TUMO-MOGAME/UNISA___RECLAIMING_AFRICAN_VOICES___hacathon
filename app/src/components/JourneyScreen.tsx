import React, { useMemo, useRef, useEffect } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Lang } from "../content/types";
import { t } from "../i18n";
import { colors, spacing, radius, fonts } from "../theme/tokens";
import { Icon } from "../ui";
import { SceneImage } from "./SceneImage";
import { historyTrail, historyTrailSource, type HistoryMilestone } from "../content/history-trail";
import { journeyMedia } from "../content/journey-media";
import { hasQuiz } from "../content/quiz";
import { stageId, journeyFraction, level, type Progress } from "../services/progress/progress";
import { countryByCode } from "../content/anthems";

// The Journey room (v2 V2-16, decision D2) — the deep, staged version of the trail the hero teases.
//
// Every stage is a REAL milestone from content/history-trail.ts, all 25 of them, 1652 to today. The
// source design proposed twelve invented chapters; twenty-five sourced milestones are better history
// and cost nothing extra, so the trail follows the record instead.
//
// A stage is open when the one before it is done, so the history is walked in order. The first is
// always open. Stages already finished stay open — nothing here ever takes progress away.

const UI = {
  kicker: {
    en: "The journey", tn: "Leeto", af: "Die reis", zu: "Uhambo", xh: "Uhambo",
    nso: "Leeto", st: "Leeto", ss: "Luhambo", ts: "Riendzo", nr: "Ikhambo", ve: "Lwendo",
  },
  lede: {
    en: "Twenty-five moments that made a country, 1652 to today. Watch a scene, answer one question, and earn the chapter's heritage card.",
    tn: "Dinako di le masome a mabedi le botlhano tse di dirileng naga, go tloga ka 1652 go fitlha gompieno. Lebelela ponagalo, araba potso e le nngwe, mme o bone karata ya boswa.",
    af: "Vyf-en-twintig oomblikke wat 'n land gemaak het, 1652 tot vandag. Kyk 'n toneel, beantwoord een vraag, en verdien die hoofstuk se erfeniskaart.",
    zu: "Izikhathi ezingamashumi amabili nanhlanu ezakha izwe, kusukela ngo-1652 kuze kube namuhla. Buka isigcawu, uphendule umbuzo owodwa, uthole ikhadi lamagugu.",
    xh: "Amaxesha angamashumi amabini anesihlanu awenza ilizwe, ukusuka ngo-1652 ukuza kuthi ga namhlanje. Bukela umboniso, uphendule umbuzo omnye, uzuze ikhadi lelifa.",
    nso: "Dinako tše masome a mabedi le tlhano tšeo di dirilego naga, go tloga ka 1652 go fihla lehono. Lebelela ponagalo, araba potšišo e tee, gomme o hwetše karata ya bohwa.",
    st: "Dinako tse mashome a mabedi a metso e mehlano tse entseng naha, ho tloha ka 1652 ho fihlela kajeno. Sheba ponahalo, araba potso e le nngwe, mme o fumane karete ya lefa.",
    ss: "Tikhatsi letingemashumi lamabili nesihlanu letakha live, kusukela nga-1652 kuze kube ngulamuhla. Buka sigcawu, uphendvule umbuto munye, utfole likhadi lelifa.",
    ts: "Minkarhi ya makume mambirhi ntlhanu leyi endleke tiko, ku sukela hi 1652 ku ta fika namuntlha. Languta xivono, hlamula xivutiso xin'we, kutani u kuma khadi ra ndzhaka.",
    nr: "Iinkhathi ezimashumi amabili nahlanu ezakha inarha, kusukela ngo-1652 bekube namhlanjesi. Buka ingcenye, uphendule umbuzo munye, uthole ikharada yelifa.",
    ve: "Zwifhinga zwa fumbili-na-ṱhanu zwe zwa ita shango, u bva 1652 u swika ṋamusi. Lavhelesa tshivhonala, fhindula mbudziso nthihi, wa wana khadi ya ifa.",
  },
  stars: { en: "stars", tn: "dinaledi", af: "sterre", zu: "izinkanyezi", xh: "iinkwenkwezi", nso: "dinaledi", st: "dinaledi", ss: "tinkhanyeti", ts: "tinyeleti", nr: "iinkwekwezi", ve: "ṋaledzi" },
  cards: { en: "cards", tn: "dikarata", af: "kaarte", zu: "amakhadi", xh: "amakhadi", nso: "dikarata", st: "dikarete", ss: "emakhadi", ts: "tikhadi", nr: "iinkharada", ve: "khadi" },
  levelLbl: { en: "Level", tn: "Legato", af: "Vlak", zu: "Izinga", xh: "Inqanaba", nso: "Legato", st: "Boemo", ss: "Lizinga", ts: "Xiyimo", nr: "Izinga", ve: "Vhuimo" },
  done: { en: "Done", tn: "Go fedile", af: "Klaar", zu: "Kwenziwe", xh: "Kwenziwe", nso: "Go fedile", st: "E entswe", ss: "Kwentiwe", ts: "Swi hetiwile", nr: "Kwenziwe", ve: "Zwo fhela" },
  now: { en: "You are here", tn: "O fano", af: "Jy is hier", zu: "Ulapha", xh: "Ulapha", nso: "O mo", st: "O mona", ss: "Ulapha", ts: "U laha", nr: "Ulapha", ve: "Ni hafha" },
  locked: { en: "Locked", tn: "Go tswaletswe", af: "Gesluit", zu: "Kukhiyiwe", xh: "Itshixiwe", nso: "Go notletšwe", st: "E notletswe", ss: "Kukhiyiwe", ts: "Swi pfaleriwile", nr: "Kutlhotlhwe", ve: "Zwo notelelwa" },
  soonQuiz: {
    en: "Question coming", tn: "Potso e a tla", af: "Vraag kom", zu: "Umbuzo uyeza", xh: "Umbuzo uyeza",
    nso: "Potšišo e a tla", st: "Potso e tla", ss: "Umbuto uyeta", ts: "Xivutiso xa ta", nr: "Umbuzo uyeza", ve: "Mbudziso i a ḓa",
  },
};

export function JourneyScreen({
  lang,
  country,
  progress,
  onOpenStage,
}: {
  lang: Lang;
  country: string;
  progress: Progress;
  onOpenStage: (milestoneId: string) => void;
}) {
  const { width } = useWindowDimensions();
  const wide = width >= 900;
  const scrollRef = useRef<ScrollView>(null);
  const nation = countryByCode(country);

  const done = useMemo(
    () => new Set(progress.stagesDone.filter((s) => s.startsWith(`${country}:`))),
    [progress.stagesDone, country]
  );

  // A stage unlocks when the one before it is done. The first is always open, and anything already
  // finished stays open.
  const firstLockedIdx = useMemo(() => {
    for (let i = 0; i < historyTrail.length; i++) {
      if (!done.has(stageId(country, i + 1))) return i;
    }
    return historyTrail.length; // the whole journey is finished
  }, [done, country]);

  const fraction = journeyFraction(progress, country, historyTrail.length);
  const pct = Math.round(fraction * 100);

  // Bring the current stage into view on open, so a returning reader is not made to hunt for it.
  useEffect(() => {
    if (firstLockedIdx <= 0) return;
    const y = Math.max(0, firstLockedIdx * (wide ? 132 : 118) - 160);
    const id = setTimeout(() => scrollRef.current?.scrollTo({ y, animated: false }), 60);
    return () => clearTimeout(id);
    // Only on mount — re-running would yank the page while someone is reading it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.page}>
      {/* ── Header: where you are ── */}
      <View style={styles.head}>
        <Text style={styles.kicker}>
          {t(UI.kicker, lang)} · {nation.name}
        </Text>
        <Text style={styles.title}>1652 → {historyTrail[historyTrail.length - 1]?.year ?? "today"}</Text>
        <Text style={styles.lede}>{t(UI.lede, lang)}</Text>

        <View style={styles.statRow}>
          <Stat icon={<Icon.Sparkles size={14} color={colors.dsBlue} />} value={`${progress.stars}`} label={t(UI.stars, lang)} />
          <Stat icon={<Icon.PawPrint size={14} color={colors.dsBlue} />} value={`${progress.cards.length}`} label={t(UI.cards, lang)} />
          <Stat icon={<Icon.Award size={14} color={colors.dsBlue} />} value={`${level(progress)}`} label={t(UI.levelLbl, lang)} />
        </View>

        <View style={styles.track}>
          <View style={[styles.fill, { width: `${Math.max(pct, 1)}%` }]} />
        </View>
        <Text style={styles.trackLabel}>
          {done.size} / {historyTrail.length} · {pct}%
        </Text>
      </View>

      {/* ── The trail ── */}
      <View style={styles.trail}>
        {historyTrail.map((m, i) => {
          const id = stageId(country, i + 1);
          const isDone = done.has(id);
          const isCurrent = i === firstLockedIdx;
          const isLocked = i > firstLockedIdx;
          return (
            <StageRow
              key={m.id}
              m={m}
              n={i + 1}
              lang={lang}
              wide={wide}
              state={isDone ? "done" : isCurrent ? "current" : "locked"}
              last={i === historyTrail.length - 1}
              onPress={isLocked ? undefined : () => onOpenStage(m.id)}
            />
          );
        })}
      </View>

      <Text style={styles.source}>{historyTrailSource}</Text>
    </ScrollView>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <View style={styles.stat}>
      {icon}
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function StageRow({
  m,
  n,
  lang,
  wide,
  state,
  last,
  onPress,
}: {
  m: HistoryMilestone;
  n: number;
  lang: Lang;
  wide: boolean;
  state: "done" | "current" | "locked";
  last: boolean;
  onPress?: () => void;
}) {
  const media = journeyMedia[m.id];
  const locked = state === "locked";

  return (
    <View style={styles.row}>
      {/* The spine — a dot per stage, joined by a line that brightens as far as you have walked. */}
      <View style={styles.spine}>
        <View
          style={[
            styles.dot,
            state === "done" && styles.dotDone,
            state === "current" && styles.dotCurrent,
            locked && styles.dotLocked,
          ]}
        >
          {state === "done" ? (
            <Icon.Check size={14} color={colors.night} />
          ) : state === "current" ? (
            <Icon.Play size={12} color={colors.night} fill={colors.night} />
          ) : (
            <Icon.Lock size={11} color="rgba(255,255,255,0.4)" />
          )}
        </View>
        {!last ? <View style={[styles.line, state === "done" && styles.lineDone]} /> : null}
      </View>

      <Pressable
        onPress={onPress}
        disabled={!onPress}
        accessibilityRole={onPress ? "button" : undefined}
        accessibilityLabel={`${m.year} — ${m.title}`}
        accessibilityState={{ disabled: !onPress }}
        style={({ hovered }: any) => [
          styles.card,
          state === "current" && styles.cardCurrent,
          locked && styles.cardLocked,
          hovered && onPress && styles.cardHover,
        ]}
      >
        {/* The stage's own art, dimmed while locked so the trail still reads as one picture. */}
        {media?.image ? (
          <View style={[styles.thumb, wide ? styles.thumbWide : styles.thumbNarrow]}>
            <SceneImage source={media.image} />
            <LinearGradient
              colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
              style={StyleSheet.absoluteFill}
              pointerEvents="none"
            />
            {locked ? <View style={styles.thumbVeil} /> : null}
          </View>
        ) : null}

        <View style={styles.cardBody}>
          <View style={styles.cardTop}>
            <Text style={[styles.year, locked && styles.dim]}>{m.year}</Text>
            <View style={[styles.pill, state === "done" && styles.pillDone, state === "current" && styles.pillCurrent]}>
              <Text style={[styles.pillText, (state === "done" || state === "current") && styles.pillTextOn]}>
                {state === "done" ? t(UI.done, lang) : state === "current" ? t(UI.now, lang) : t(UI.locked, lang)}
              </Text>
            </View>
          </View>
          <Text style={[styles.stageTitle, locked && styles.dim]} numberOfLines={2}>
            {n}. {m.title}
          </Text>
          <Text style={[styles.note, locked && styles.dimmer]} numberOfLines={wide ? 2 : 3}>
            {m.note}
          </Text>
          <View style={styles.tags}>
            {media?.video || media?.videos ? <Tag icon={<Icon.Film size={11} color="rgba(255,255,255,0.6)" />} text="Film" /> : null}
            {hasQuiz(m.id) ? (
              <Tag icon={<Icon.Check size={11} color="rgba(255,255,255,0.6)" />} text="Quiz" />
            ) : (
              <Tag icon={<Icon.Clock size={11} color="rgba(255,255,255,0.45)" />} text={t(UI.soonQuiz, lang)} />
            )}
            {m.branches?.length ? (
              <Tag icon={<Icon.Route size={11} color="rgba(255,255,255,0.6)" />} text={`${m.branches.length} side-roads`} />
            ) : null}
          </View>
        </View>

        {onPress ? <Icon.ChevronRight size={18} color="rgba(255,255,255,0.5)" /> : null}
      </Pressable>
    </View>
  );
}

function Tag({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <View style={styles.tag}>
      {icon}
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.xxl },

  head: { marginBottom: spacing.xl, maxWidth: 720 },
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

  statRow: { flexDirection: "row", gap: spacing.lg, marginTop: spacing.lg },
  stat: { flexDirection: "row", alignItems: "center", gap: 6 },
  statValue: { color: "#FFFFFF", fontFamily: fonts.bodyBold, fontSize: 16 },
  statLabel: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.body, fontSize: 12.5 },

  track: { height: 5, backgroundColor: "rgba(255,255,255,0.14)", borderRadius: 3, marginTop: spacing.md, maxWidth: 420 },
  fill: { height: 5, backgroundColor: colors.dsBlue, borderRadius: 3 },
  trackLabel: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.body, fontSize: 12.5, marginTop: 6 },

  trail: { gap: 0 },
  row: { flexDirection: "row", gap: spacing.md },

  spine: { alignItems: "center", width: 34, flexShrink: 0 },
  dot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.22)",
    backgroundColor: colors.card,
    marginTop: spacing.md,
  },
  dotDone: { backgroundColor: colors.dsBlue, borderColor: colors.dsBlue },
  dotCurrent: { backgroundColor: colors.dsBlue, borderColor: colors.dsBlue },
  dotLocked: { backgroundColor: "transparent" },
  line: { flex: 1, width: 2, backgroundColor: "rgba(255,255,255,0.14)", marginVertical: 4 },
  lineDone: { backgroundColor: colors.dsBlue },

  card: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: colors.card,
  },
  cardCurrent: { borderColor: colors.dsBlue, backgroundColor: "rgba(26,133,167,0.10)" },
  cardLocked: { backgroundColor: "rgba(255,255,255,0.03)" },
  cardHover: { borderColor: "rgba(255,255,255,0.28)" },

  thumb: { borderRadius: radius.sm, overflow: "hidden", backgroundColor: "#111", flexShrink: 0 },
  thumbWide: { width: 128, height: 84 },
  thumbNarrow: { width: 76, height: 76 },
  thumbVeil: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.55)" },

  cardBody: { flex: 1, minWidth: 0, gap: 4 },
  cardTop: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  year: { color: colors.dsBlue, fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 0.4 },
  stageTitle: { color: "#FFFFFF", fontFamily: fonts.heading, fontSize: 16, lineHeight: 21 },
  note: { color: "rgba(255,255,255,0.66)", fontFamily: fonts.body, fontSize: 13, lineHeight: 19 },
  dim: { color: "rgba(255,255,255,0.55)" },
  dimmer: { color: "rgba(255,255,255,0.4)" },

  pill: { borderRadius: radius.pill, borderWidth: 1, borderColor: colors.hairline, paddingVertical: 2, paddingHorizontal: 9 },
  pillDone: { borderColor: "rgba(26,133,167,0.5)", backgroundColor: "rgba(26,133,167,0.14)" },
  pillCurrent: { borderColor: colors.dsBlue, backgroundColor: "rgba(26,133,167,0.22)" },
  pillText: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.bodySemi, fontSize: 10, letterSpacing: 1.2, textTransform: "uppercase" },
  pillTextOn: { color: "#8FD3E8" },

  tags: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: 4 },
  tag: { flexDirection: "row", alignItems: "center", gap: 4 },
  tagText: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.body, fontSize: 11.5 },

  source: {
    color: "rgba(255,255,255,0.38)",
    fontFamily: fonts.serifItalic,
    fontSize: 11.5,
    lineHeight: 17,
    marginTop: spacing.lg,
    maxWidth: 640,
  },
});
