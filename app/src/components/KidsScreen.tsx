import React, { useMemo, useRef, useState, useEffect } from "react";
import { View, Text, Pressable, Image, ScrollView, StyleSheet, useWindowDimensions, Animated } from "react-native";
import { Lang } from "../content/types";
import { t } from "../i18n";
import { colors, spacing, radius, fonts } from "../theme/tokens";
import { Icon } from "../ui";
import { totems } from "../content/totems";
import { todayISO, type Progress } from "../services/progress/progress";

// Kids mode (v2 V2-23, wireframe 2f) — a way in for younger readers: big targets, few words, and
// real heritage rather than a cartoon version of it.
//
// GROUNDING. Everything here comes from content/totems.ts — real clan totems with their real names
// in Sesotho/Setswana, Nguni and Tshivenḓa, each carrying its own sourceNote. Nothing is simplified
// into a falsehood: the tone changes, the facts do not (integrity rule, Child Mode clause).
//
// The greetings below are real greetings in each language. They are the one piece of authored text
// on this screen and should be checked by a speaker — Setswana especially.

const GREETING: Record<Lang, string> = {
  en: "Hello",
  tn: "Dumela",
  af: "Hallo",
  zu: "Sawubona",
  xh: "Molo",
  nso: "Thobela",
  st: "Dumela",
  ss: "Sawubona",
  ts: "Avuxeni",
  nr: "Lotjhani",
  ve: "Ndaa",
};

const UI = {
  today: {
    en: "Today's animal", tn: "Phologolo ya gompieno", af: "Vandag se dier", zu: "Isilwane sanamuhla", xh: "Isilwanyana sanamhlanje",
    nso: "Phoofolo ya lehono", st: "Phoofolo ya kajeno", ss: "Silwane salamuhla", ts: "Xiharhi xa namuntlha", nr: "Isilwana sanamhlanjesi", ve: "Phukha ya ṋamusi",
  },
  play: {
    en: "Play", tn: "Bapala", af: "Speel", zu: "Dlala", xh: "Dlala",
    nso: "Bapala", st: "Bapala", ss: "Dlala", ts: "Tlanga", nr: "Dlala", ve: "Tambani",
  },
  myCards: {
    en: "My cards", tn: "Dikarata tsa me", af: "My kaarte", zu: "Amakhadi ami", xh: "Amakhadi am",
    nso: "Dikarata tša ka", st: "Dikarete tsa ka", ss: "Emakhadi ami", ts: "Makhadi ya mina", nr: "Iinkharada zami", ve: "Khadi dzanga",
  },
  grownups: {
    en: "Grown-ups", tn: "Bagolo", af: "Grootmense", zu: "Abadala", xh: "Abadala",
    nso: "Batho ba bagolo", st: "Batho ba baholo", ss: "Labadzala", ts: "Vakulu", nr: "Abadala", ve: "Vhahulwane",
  },
  holdToOpen: {
    en: "Hold to open", tn: "Tshwara go bula", af: "Hou vas om oop te maak", zu: "Bamba ukuze uvule", xh: "Bamba ukuze uvule",
    nso: "Swara go bula", st: "Tshwara ho bula", ss: "Bamba kute uvule", ts: "Khoma leswaku u pfula", nr: "Bamba bona uvule", ve: "Farani u vula",
  },
  called: {
    en: "It is called", tn: "E bidiwa", af: "Dit word genoem", zu: "Ibizwa ngokuthi", xh: "Ibizwa ngokuba",
    nso: "E bitšwa", st: "E bitswa", ss: "Ibitwa", ts: "Xi vuriwa", nr: "Ibizwa", ve: "I pfi",
  },
  cardsHeld: {
    en: "cards", tn: "dikarata", af: "kaarte", zu: "amakhadi", xh: "amakhadi",
    nso: "dikarata", st: "dikarete", ss: "emakhadi", ts: "makhadi", nr: "iinkharada", ve: "khadi",
  },
};

/** Today's animal — the same for everyone on a given day, and stable across a reload. */
export function animalOfTheDay(iso = todayISO()) {
  const seed = iso.split("-").reduce((a, part) => a + Number(part), 0);
  return totems[seed % totems.length];
}

export function KidsScreen({
  lang,
  progress,
  onPlay,
  onCards,
  onExit,
}: {
  lang: Lang;
  progress: Progress;
  onPlay: (totemId: string) => void;
  onCards: () => void;
  /** Leaves Kids mode — only reachable through the hold-to-open gate. */
  onExit: () => void;
}) {
  const { width } = useWindowDimensions();
  const wide = width >= 760;
  const animal = useMemo(() => animalOfTheDay(), []);
  const names = [animal.terms.sothoTswana, animal.terms.nguni, animal.terms.venda].filter(Boolean);

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.page}>
      <Text style={styles.hello}>
        {t(GREETING, lang)}!
      </Text>

      <View style={[styles.heroCard, wide && styles.heroCardWide]}>
        <Image source={animal.image as any} style={styles.heroArt} resizeMode="cover" accessibilityLabel={animal.animal} />
        <View style={styles.heroText}>
          <Text style={styles.todayLabel}>{t(UI.today, lang)}</Text>
          <Text style={styles.animalName}>{animal.animal}</Text>
          <Text style={styles.calledLabel}>{t(UI.called, lang)}</Text>
          <Text style={styles.animalTerms}>{names.join(" · ")}</Text>
        </View>
      </View>

      <Pressable
        onPress={() => onPlay(animal.id)}
        style={styles.bigPlay}
        accessibilityRole="button"
        accessibilityLabel={t(UI.play, lang)}
      >
        <Icon.Play size={26} color={colors.night} fill={colors.night} />
        <Text style={styles.bigPlayText}>{t(UI.play, lang)}</Text>
      </Pressable>

      <Pressable onPress={onCards} style={styles.bigSecondary} accessibilityRole="link">
        <Icon.PawPrint size={22} color={colors.dsBlue} />
        <Text style={styles.bigSecondaryText}>{t(UI.myCards, lang)}</Text>
        <Text style={styles.cardCount}>
          {progress.cards.length} {t(UI.cardsHeld, lang)}
        </Text>
      </Pressable>

      <HoldToOpen
        label={`${t(UI.grownups, lang)} · ${t(UI.holdToOpen, lang)}`}
        onComplete={onExit}
      />
    </ScrollView>
  );
}

/**
 * The grown-ups gate (V2-25) — hold for three seconds to leave Kids mode.
 *
 * A tap is something a small child does by accident a hundred times a day; a deliberate three-second
 * hold is not. It is a friction gate, not a security control, and it is not pretending otherwise —
 * there is no PIN here because there is nothing behind it worth protecting with one.
 */
export function HoldToOpen({ label, onComplete }: { label: string; onComplete: () => void }) {
  const HOLD_MS = 3000;
  const fill = useRef(new Animated.Value(0)).current;
  const anim = useRef<Animated.CompositeAnimation | null>(null);
  const [holding, setHolding] = useState(false);

  const start = () => {
    setHolding(true);
    fill.setValue(0);
    anim.current = Animated.timing(fill, { toValue: 1, duration: HOLD_MS, useNativeDriver: false });
    anim.current.start(({ finished }) => {
      setHolding(false);
      if (finished) onComplete();
    });
  };

  const cancel = () => {
    anim.current?.stop();
    setHolding(false);
    Animated.timing(fill, { toValue: 0, duration: 180, useNativeDriver: false }).start();
  };

  useEffect(() => () => anim.current?.stop(), []);

  return (
    <Pressable
      onPressIn={start}
      onPressOut={cancel}
      style={styles.gate}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint="Press and hold for three seconds"
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.gateFill,
          { width: fill.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) },
        ]}
      />
      <Icon.Lock size={14} color="rgba(255,255,255,0.6)" />
      <Text style={styles.gateText}>{label}</Text>
      {holding ? <Text style={styles.gateHint}>…</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  page: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.xxl, gap: spacing.lg },

  hello: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 44, lineHeight: 46, letterSpacing: -1.2 },

  heroCard: {
    borderRadius: radius.md,
    overflow: "hidden",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: "rgba(26,133,167,0.4)",
  },
  heroCardWide: { flexDirection: "row", alignItems: "stretch" },
  heroArt: { width: "100%", height: 260, backgroundColor: "#222" },
  heroText: { padding: spacing.lg, gap: 4, flex: 1, justifyContent: "center" },
  todayLabel: {
    color: colors.dsBlue,
    fontFamily: fonts.bodySemi,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  animalName: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 40, lineHeight: 42, letterSpacing: -1 },
  calledLabel: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.body, fontSize: 14, marginTop: spacing.sm },
  animalTerms: { color: "#FFFFFF", fontFamily: fonts.heading, fontSize: 20, lineHeight: 27 },

  // Deliberately oversized targets — well past the 44pt minimum, for small hands.
  bigPlay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    backgroundColor: colors.dsBlue,
    borderRadius: radius.md,
    paddingVertical: 26,
  },
  bigPlayText: { color: colors.night, fontFamily: fonts.display, fontSize: 28, letterSpacing: -0.5 },

  bigSecondary: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderWidth: 2,
    borderColor: colors.dsBlue,
    borderRadius: radius.md,
    paddingVertical: 20,
    paddingHorizontal: spacing.lg,
  },
  bigSecondaryText: { color: "#FFFFFF", fontFamily: fonts.heading, fontSize: 22, flex: 1 },
  cardCount: { color: colors.dsBlue, fontFamily: fonts.bodyBold, fontSize: 15 },

  gate: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    alignSelf: "flex-start",
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.pill,
    paddingVertical: 10,
    paddingHorizontal: 18,
    overflow: "hidden",
  },
  gateFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(26,133,167,0.35)",
  },
  gateText: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.bodySemi, fontSize: 13 },
  gateHint: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.bodyBold, fontSize: 13 },
});
