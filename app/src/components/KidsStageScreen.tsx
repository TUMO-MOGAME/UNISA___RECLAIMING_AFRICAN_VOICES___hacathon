import React, { useMemo, useState } from "react";
import { View, Text, Pressable, Image, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { Lang } from "../content/types";
import { t } from "../i18n";
import { colors, spacing, radius, fonts } from "../theme/tokens";
import { Icon } from "../ui";
import { totems, type Totem } from "../content/totems";

// The Kids picture quiz (v2 V2-24, wireframe 2f) — tap the animal, no reading required beyond one
// short name.
//
// GROUNDING. The question is always "which animal carries this name?", and the name is the real
// totem term from content/totems.ts in the reader's own language family — Tau, Nkwe, Kwena. Nothing
// is invented; a child learning "Tau is the lion" has learnt something true and sourced.
//
// The three wrong pictures are other real totem animals. There is no penalty and no timer: a wrong
// tap dims and the right one is shown, because the point is to learn the word, not to be scored.

const UI = {
  which: {
    en: "Which one is", tn: "Ke efe e leng", af: "Watter een is", zu: "Iyiphi engu", xh: "Yeyiphi engu",
    nso: "Ke efe yeo e lego", st: "Ke efe e leng", ss: "Nguyiphi lengu", ts: "Hi xihi lexi nge", nr: "Ngiyiphi engu", ve: "Ndi ifhio ine ya vha",
  },
  again: {
    en: "Another one", tn: "E nngwe gape", af: "Nog een", zu: "Esinye futhi", xh: "Esinye kwakhona",
    nso: "Ye nngwe gape", st: "E nngwe hape", ss: "Lesinye futsi", ts: "Xin'wana nakambe", nr: "Esinye godu", ve: "Iṅwe hafhu",
  },
  done: {
    en: "All done", tn: "Go fedile", af: "Alles klaar", zu: "Sekuphelile", xh: "Kugqityiwe",
    nso: "Go fedile", st: "Ho felile", ss: "Sekucedziwe", ts: "Swi hetiwile", nr: "Sekuphelile", ve: "Zwo fhela",
  },
  yes: {
    en: "Yes!", tn: "Ee!", af: "Ja!", zu: "Yebo!", xh: "Ewe!",
    nso: "Ee!", st: "E!", ss: "Yebo!", ts: "Ina!", nr: "Iye!", ve: "Ee!",
  },
  thisOne: {
    en: "This one", tn: "Ke yona e", af: "Hierdie een", zu: "Yilesi", xh: "Le",
    nso: "Ke ye", st: "Ke ena", ss: "Ngulesi", ts: "Hi lexi", nr: "Ngile", ve: "Ndi ino",
  },
  back: {
    en: "Back", tn: "Morago", af: "Terug", zu: "Emuva", xh: "Emva",
    nso: "Morago", st: "Morao", ss: "Emuva", ts: "Endzhaku", nr: "Emuva", ve: "Murahu",
  },
};

/** The totem name to ask for, in the family closest to the reader's language. */
function askName(totem: Totem, lang: Lang): string | undefined {
  const nguni: Lang[] = ["zu", "xh", "ss", "nr"];
  const sotho: Lang[] = ["tn", "st", "nso"];
  if (nguni.includes(lang)) return totem.terms.nguni ?? totem.terms.sothoTswana ?? totem.terms.venda;
  if (sotho.includes(lang)) return totem.terms.sothoTswana ?? totem.terms.nguni ?? totem.terms.venda;
  if (lang === "ve") return totem.terms.venda ?? totem.terms.sothoTswana ?? totem.terms.nguni;
  // English, Afrikaans, Xitsonga: lead with Sotho/Tswana, which the app already carries most fully.
  return totem.terms.sothoTswana ?? totem.terms.nguni ?? totem.terms.venda;
}

/** A round: the answer plus three other real totems, in a stable shuffled order. */
function buildRound(answer: Totem, seed: number) {
  const others = totems.filter((x) => x.id !== answer.id && askName(x, "tn"));
  const picks: Totem[] = [];
  for (let i = 0; picks.length < 3 && i < others.length * 2; i++) {
    const c = others[(seed * 7 + i * 13) % others.length];
    if (c && !picks.some((p) => p.id === c.id)) picks.push(c);
  }
  const all = [answer, ...picks];
  // Deterministic rotation rather than Math.random, so a re-render never reshuffles mid-answer.
  const offset = seed % all.length;
  return [...all.slice(offset), ...all.slice(0, offset)];
}

export function KidsStageScreen({
  lang,
  totemId,
  onNext,
  onBack,
  onEarn,
}: {
  lang: Lang;
  totemId: string;
  onNext: (nextTotemId: string) => void;
  onBack: () => void;
  /** Awards the card once the animal is found. */
  onEarn: (totemId: string) => void;
}) {
  const { width } = useWindowDimensions();
  const cols = width >= 720 ? 4 : 2;
  const answer = useMemo(() => totems.find((x) => x.id === totemId) ?? totems[0], [totemId]);
  const seed = useMemo(() => totems.findIndex((x) => x.id === answer.id) + 3, [answer.id]);
  const round = useMemo(() => buildRound(answer, seed), [answer.id, seed]);
  const name = askName(answer, lang);

  const [picked, setPicked] = useState<string | null>(null);
  const solved = picked === answer.id;

  const choose = (id: string) => {
    if (solved) return;
    setPicked(id);
    if (id === answer.id) onEarn(answer.id);
  };

  const next = () => {
    const i = totems.findIndex((x) => x.id === answer.id);
    onNext(totems[(i + 1) % totems.length].id);
    setPicked(null);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.page}>
      <Pressable onPress={onBack} style={styles.back} accessibilityRole="link" accessibilityLabel={t(UI.back, lang)}>
        <Icon.ChevronLeft size={20} color="rgba(255,255,255,0.7)" />
        <Text style={styles.backText}>{t(UI.back, lang)}</Text>
      </Pressable>

      <Text style={styles.question}>
        {t(UI.which, lang)} <Text style={styles.questionName}>{name}</Text>?
      </Text>

      <View style={styles.grid}>
        {round.map((tm) => {
          const isAnswer = tm.id === answer.id;
          const isPicked = picked === tm.id;
          const reveal = solved && isAnswer;
          const wrong = isPicked && !isAnswer;
          return (
            <Pressable
              key={tm.id}
              onPress={() => choose(tm.id)}
              disabled={solved}
              accessibilityRole="button"
              accessibilityLabel={tm.animal}
              style={[styles.cell, { width: `${100 / cols}%` } as any]}
            >
              <View style={[styles.tile, reveal && styles.tileRight, wrong && styles.tileWrong]}>
                <Image source={tm.image as any} style={styles.art} resizeMode="cover" />
                {reveal ? (
                  <View style={styles.tick}>
                    <Icon.Check size={26} color={colors.night} />
                  </View>
                ) : null}
              </View>
              {solved ? <Text style={styles.tileName}>{tm.animal}</Text> : null}
            </Pressable>
          );
        })}
      </View>

      {solved ? (
        <View style={styles.result}>
          <Text style={styles.yes}>{t(UI.yes, lang)}</Text>
          <Text style={styles.resultLine}>
            {name} · {answer.animal}
          </Text>
          <View style={styles.stars}>
            {[0, 1, 2].map((i) => (
              <Icon.Sparkles key={i} size={26} color={colors.dsBlue} />
            ))}
          </View>
          <Pressable onPress={next} style={styles.nextBtn} accessibilityRole="button" accessibilityLabel={t(UI.again, lang)}>
            <Text style={styles.nextText}>{t(UI.again, lang)}</Text>
            <Icon.ArrowRight size={20} color={colors.night} />
          </Pressable>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.xxl },

  back: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", paddingVertical: spacing.sm },
  backText: { color: "rgba(255,255,255,0.7)", fontFamily: fonts.bodySemi, fontSize: 15 },

  question: {
    color: "#FFFFFF",
    fontFamily: fonts.heading,
    fontSize: 28,
    lineHeight: 36,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  questionName: { color: colors.dsBlue, fontFamily: fonts.display, fontSize: 32 },

  grid: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -spacing.sm },
  cell: { padding: spacing.sm, gap: 6 },
  tile: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: radius.md,
    overflow: "hidden",
    backgroundColor: colors.card,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.14)",
  },
  tileRight: { borderColor: colors.live },
  tileWrong: { opacity: 0.35 },
  art: { width: "100%", height: "100%" },
  tick: {
    position: "absolute",
    right: spacing.sm,
    bottom: spacing.sm,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.live,
    alignItems: "center",
    justifyContent: "center",
  },
  tileName: { color: "rgba(255,255,255,0.7)", fontFamily: fonts.bodySemi, fontSize: 13, textAlign: "center" },

  result: { alignItems: "center", gap: spacing.sm, marginTop: spacing.xl },
  yes: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 40, letterSpacing: -1 },
  resultLine: { color: colors.dsBlue, fontFamily: fonts.heading, fontSize: 20 },
  stars: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.dsBlue,
    borderRadius: radius.md,
    paddingVertical: 20,
    paddingHorizontal: 36,
    marginTop: spacing.lg,
  },
  nextText: { color: colors.night, fontFamily: fonts.display, fontSize: 24, letterSpacing: -0.4 },
});
