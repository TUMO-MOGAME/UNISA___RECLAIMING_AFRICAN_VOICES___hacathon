import React from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { Lang } from "../content/types";
import { t } from "../i18n";
import { colors, spacing, radius, fonts } from "../theme/tokens";
import { Icon } from "../ui";
import {
  DEMO_CLASS,
  demoLearners,
  classStats,
  assignedMilestone,
  lessonPlanFor,
  capsSource,
} from "../content/schools";

// The Schools room (v2 V2-26, wireframe 2g) — the teacher's view.
//
// HONESTY (D5). This runs over seeded demo data, and the banner at the top says so on every load
// rather than in a footnote. The app keeps all progress device-local with no accounts, so it holds
// no learner records: there is nothing real to show here yet. Showing a plausible-looking dashboard
// without saying that would be a lie told in UI.
//
// Real class data would need accounts, guardians' consent for minors, and row-level security — a
// deliberate, separate decision (docs/05-popia-compliance.md), not something to slide in behind a
// dashboard.

const UI = {
  kicker: {
    en: "For schools", tn: "Ya dikolo", af: "Vir skole", zu: "Ezikoleni", xh: "Kwizikolo",
    nso: "Ya dikolo", st: "Bakeng sa dikolo", ss: "Etikolweni", ts: "Eka swikolo", nr: "Eemtjhaneni", ve: "Zwa zwikolo",
  },
  title: {
    en: "Class dashboard", tn: "Boto ya tlelase", af: "Klas-paneel", zu: "Ideshibhodi yekilasi", xh: "Ideshbhodi yeklasi",
    nso: "Boto ya klase", st: "Boto ya sehlopha", ss: "Ideshibhodi yelikilasi", ts: "Deshiborodo ya tlilasi", nr: "Ibhodi yeklasi", ve: "Bodo ya kilasi",
  },
  demoBanner: {
    en: "Demonstration only — this is not a real class. Ubuntu Heritage keeps every learner's progress on their own device and holds no learner records, so there is nothing real to show here yet.",
    tn: "Ke pontsho fela — e ga se tlelase ya mmatota. Ubuntu Heritage e boloka kgatelopele ya moithuti mongwe le mongwe mo sedirisiweng sa gagwe, mme ga e na direkoto tsa baithuti.",
    af: "Slegs 'n demonstrasie — dit is nie 'n werklike klas nie. Ubuntu Heritage hou elke leerder se vordering op hul eie toestel en hou geen leerderrekords nie.",
    zu: "Ukubonisa kuphela — leli akulona ikilasi langempela. I-Ubuntu Heritage igcina inqubekela phambili yomfundi ngamunye kudivayisi yakhe, futhi ayinawo amarekhodi abafundi.",
    xh: "Ngumboniso kuphela — le asiyoklasi yokwenene. I-Ubuntu Heritage igcina inkqubela yomfundi ngamnye kwisixhobo sakhe, kwaye ayinazo iirekhodi zabafundi.",
    nso: "Ke pontšho fela — ye ga se klase ya kgonthe. Ubuntu Heritage e boloka tšwelopele ya moithuti yo mongwe le yo mongwe sedirišweng sa gagwe, gomme ga e na direkoto tša baithuti.",
    st: "Ke pontsho feela — sena hase sehlopha sa nnete. Ubuntu Heritage e boloka tswelopele ya moithuti ka mong sesebedisweng sa hae, mme ha e na direkoto tsa baithuti.",
    ss: "Kukukhombisa kuphela — leli akusilo likilasi langempela. I-Ubuntu Heritage igcina inchubekela phambili yemfundzi ngamunye kundlela yakhe, futsi ayinawo emarekhodi ebafundzi.",
    ts: "I ku kombisa ntsena — leyi a hi tlilasi ya xiviri. Ubuntu Heritage yi hlayisa nhluvuko ya dyondzi yin'wana na yin'wana eka xitirho xa yena, naswona a yi na tirhekhodo ta swichudeni.",
    nr: "Kukutjengisa kwaphela — leli akusilo iklasi lamambala. I-Ubuntu Heritage igcina ikulukuthela phambili yomfundi ngamunye kudivayisi yakhe, begodu ayinawo amarekhodo abafundi.",
    ve: "Ndi u sumbedza fhedzi — iyi a si kilasi ya vhukuma. Ubuntu Heritage i vhulunga mvelaphanḓa ya mugudi muṅwe na muṅwe kha tshishumiswa tshawe, nahone a i na rekhodo dza vhagudi.",
  },
  assigned: {
    en: "Assigned this week", tn: "E abetswe beke e", af: "Hierdie week toegewys", zu: "Okwabelwe kuleli sonto", xh: "Okwabelwe kule veki",
    nso: "E abilwe beke ye", st: "E abetswe bekeng ena", ss: "Lokwabiwe kuleliviki", ts: "Leswi averiweke vhiki leri", nr: "Okwabelwe kuleliveke", ve: "Zwo kovhiwaho vhege ino",
  },
  due: { en: "Due", tn: "E tshwanetse ka", af: "Sperdatum", zu: "Kufanele ngo", xh: "Ifuneka ngo", nso: "E swanetše ka", st: "E lokela ka", ss: "Kufanele nga", ts: "Swi fanele hi", nr: "Kufanele nga", ve: "Zwi tea nga" },
  completion: { en: "Class completion", tn: "Go fetsa ga tlelase", af: "Klasvoltooiing", zu: "Ukuqedwa kwekilasi", xh: "Ukugqitywa kweklasi", nso: "Go fetša ga klase", st: "Ho qeta ha sehlopha", ss: "Kucedza kwelikilasi", ts: "Ku hetisa ka tlilasi", nr: "Ukuqedwa kweklasi", ve: "U fhedza ha kilasi" },
  avgScore: { en: "Average score", tn: "Palogare ya maduo", af: "Gemiddelde punt", zu: "Amaphuzu amaphakathi", xh: "Umyinge wamanqaku", nso: "Palogare ya dintlha", st: "Karolelano ya dintlha", ss: "Emaphuzu lasemkhatsini", ts: "Xiavelo xa tinhlayo", nr: "Amaphuzu asesikhathini", ve: "Vhukati ha mbuelo" },
  needHelp: { en: "Need help", tn: "Ba tlhoka thuso", af: "Benodig hulp", zu: "Badinga usizo", xh: "Bafuna uncedo", nso: "Ba nyaka thušo", st: "Ba hloka thuso", ss: "Badzinga lusito", ts: "Va lava mpfuno", nr: "Batlhoga irhelebho", ve: "Vha ṱoḓa thuso" },
  learner: { en: "Learner", tn: "Moithuti", af: "Leerder", zu: "Umfundi", xh: "Umfundi", nso: "Moithuti", st: "Moithuti", ss: "Umfundzi", ts: "Dyondzi", nr: "Umfundi", ve: "Mugudi" },
  stage: { en: "Stage", tn: "Seelo", af: "Fase", zu: "Isigaba", xh: "Inqanaba", nso: "Legato", st: "Mothati", ss: "Sigaba", ts: "Goza", nr: "Igadango", ve: "Tshiimo" },
  quiz: { en: "Quiz", tn: "Potso", af: "Toets", zu: "Isivivinyo", xh: "Uvavanyo", nso: "Potšišo", st: "Potso", ss: "Sivivinyo", ts: "Xikambelo", nr: "Isivivinyo", ve: "Mulingo" },
  cards: { en: "Cards", tn: "Dikarata", af: "Kaarte", zu: "Amakhadi", xh: "Amakhadi", nso: "Dikarata", st: "Dikarete", ss: "Emakhadi", ts: "Makhadi", nr: "Iinkharada", ve: "Khadi" },
  lesson: {
    en: "Lesson plan", tn: "Leano la thuto", af: "Lesplan", zu: "Uhlelo lwesifundo", xh: "Isicwangciso sesifundo",
    nso: "Leano la thuto", st: "Moralo wa thuto", ss: "Luhlelo lwesifundvo", ts: "Pulani ya dyondzo", nr: "Ihlelo lesifundo", ve: "Pulani ya pfunzo",
  },
  outcomes: {
    en: "By the end, learners can", tn: "Kwa bofelong, baithuti ba kgona go", af: "Aan die einde kan leerders", zu: "Ekugcineni, abafundi bangakwazi uku",
    xh: "Ekupheleni, abafundi bayakwazi uku", nso: "Mafelelong, baithuti ba kgona go", st: "Qetellong, baithuti ba kgona ho",
    ss: "Ekugcineni, bafundzi bayakwati ku", ts: "Emakumu, swichudeni swi kota ku", nr: "Ekugcineni, abafundi bangakghona uku", ve: "Mafheleloni, vhagudi vha kona u",
  },
  openStage: {
    en: "Open this stage", tn: "Bula seelo se", af: "Maak hierdie fase oop", zu: "Vula lesi sigaba", xh: "Vula eli nqanaba",
    nso: "Bula legato le", st: "Bula mothati ona", ss: "Vula lesigaba", ts: "Pfula goza leri", nr: "Vula igadango leli", ve: "Vulani tshiimo itshi",
  },
};

export function SchoolsScreen({ lang, onOpenStage }: { lang: Lang; onOpenStage: (milestoneId: string) => void }) {
  const { width } = useWindowDimensions();
  const wide = width >= 900;
  const stats = classStats();
  const milestone = assignedMilestone();
  const plan = lessonPlanFor(milestone.id);

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.page}>
      <View style={styles.head}>
        <Text style={styles.kicker}>{t(UI.kicker, lang)}</Text>
        <Text style={styles.title}>{t(UI.title, lang)}</Text>
        <Text style={styles.who}>
          {DEMO_CLASS.teacher} · {DEMO_CLASS.grade}
        </Text>
      </View>

      {/* The banner is not a footnote. A dashboard that looks real must say when it is not. */}
      <View style={styles.demoBanner}>
        <Icon.Lock size={15} color="#8FD3E8" />
        <Text style={styles.demoText}>{t(UI.demoBanner, lang)}</Text>
      </View>

      {/* ── Assigned + stats ── */}
      <View style={[styles.statGrid, wide && styles.statGridWide]}>
        <View style={[styles.statCard, styles.assignedCard]}>
          <Text style={styles.statLabel}>{t(UI.assigned, lang)}</Text>
          <Text style={styles.assignedTitle}>
            {milestone.year} — {milestone.title}
          </Text>
          <Text style={styles.assignedDue}>
            {t(UI.due, lang)} {DEMO_CLASS.dueLabel}
          </Text>
          <Pressable
            onPress={() => onOpenStage(milestone.id)}
            style={styles.openBtn}
            accessibilityRole="link"
            accessibilityLabel={`${t(UI.openStage, lang)} — ${milestone.year} ${milestone.title}`}
          >
            <Text style={styles.openBtnText}>{t(UI.openStage, lang)}</Text>
            <Icon.ArrowRight size={14} color={colors.night} />
          </Pressable>
        </View>

        <StatCard label={t(UI.completion, lang)} value={`${stats.completed} / ${stats.total}`} sub={`${stats.completionPct}%`} />
        <StatCard label={t(UI.avgScore, lang)} value={`${stats.avgScore}%`} />
        <StatCard label={t(UI.needHelp, lang)} value={`${stats.needsHelp}`} />
      </View>

      {/* ── Learner table ── */}
      <View style={styles.tableWrap}>
        <View style={styles.tableHead}>
          <Text style={[styles.th, styles.colName]}>{t(UI.learner, lang)}</Text>
          <Text style={[styles.th, styles.colNum]}>{t(UI.stage, lang)}</Text>
          <Text style={[styles.th, styles.colNum]}>{t(UI.quiz, lang)}</Text>
          <Text style={[styles.th, styles.colNum]}>{t(UI.cards, lang)}</Text>
        </View>
        {demoLearners.map((l) => (
          <View key={l.id} style={[styles.tr, l.needsHelp && styles.trFlag]}>
            <View style={[styles.colName, styles.nameCell]}>
              {l.needsHelp ? <View style={styles.flagDot} /> : null}
              <Text style={styles.td} numberOfLines={1}>
                {l.name}
              </Text>
            </View>
            <Text style={[styles.td, styles.colNum, styles.num]}>{l.stage}</Text>
            <Text style={[styles.td, styles.colNum, styles.num]}>
              {l.quiz}/{DEMO_CLASS.quizTotal}
            </Text>
            <Text style={[styles.td, styles.colNum, styles.num]}>{l.cards}</Text>
          </View>
        ))}
      </View>

      {/* ── Lesson plan ── */}
      {plan ? (
        <View style={styles.plan}>
          <Text style={styles.planLabel}>{t(UI.lesson, lang)}</Text>
          <Text style={styles.planTitle}>{plan.title}</Text>
          <Text style={styles.planMeta}>{plan.minutes} min</Text>
          <Text style={styles.outcomesLabel}>{t(UI.outcomes, lang)}:</Text>
          {plan.outcomes.map((o, i) => (
            <View key={i} style={styles.outcome}>
              <Icon.Check size={14} color={colors.dsBlue} />
              <Text style={styles.outcomeText}>{o}</Text>
            </View>
          ))}
          <Text style={styles.caps}>{plan.capsNote}</Text>
        </View>
      ) : null}

      <Text style={styles.source}>{capsSource}</Text>
    </ScrollView>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      {sub ? <Text style={styles.statSub}>{sub}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.xxl },

  head: { marginBottom: spacing.lg },
  kicker: {
    color: colors.dsBlue,
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: "uppercase",
    marginBottom: spacing.sm,
  },
  title: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 40, lineHeight: 42, letterSpacing: -1 },
  who: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.body, fontSize: 15, marginTop: 4 },

  demoBanner: {
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "flex-start",
    padding: spacing.md,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: "rgba(26,133,167,0.5)",
    backgroundColor: "rgba(26,133,167,0.10)",
    marginBottom: spacing.lg,
  },
  demoText: { flex: 1, color: "#8FD3E8", fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21 },

  statGrid: { gap: spacing.md },
  statGridWide: { flexDirection: "row", flexWrap: "wrap" },
  statCard: {
    flex: 1,
    minWidth: 170,
    gap: 4,
    padding: spacing.md,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.card,
  },
  assignedCard: { minWidth: 260, flexGrow: 2, borderColor: "rgba(26,133,167,0.45)" },
  statLabel: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: fonts.bodySemi,
    fontSize: 10.5,
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
  statValue: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 28, letterSpacing: -0.6 },
  statSub: { color: colors.dsBlue, fontFamily: fonts.bodySemi, fontSize: 13 },
  assignedTitle: { color: "#FFFFFF", fontFamily: fonts.heading, fontSize: 18, lineHeight: 24 },
  assignedDue: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.body, fontSize: 13 },
  openBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    alignSelf: "flex-start",
    backgroundColor: colors.dsBlue,
    borderRadius: radius.pill,
    paddingVertical: 9,
    paddingHorizontal: 18,
    marginTop: spacing.sm,
  },
  openBtnText: { color: colors.night, fontFamily: fonts.bodyBold, fontSize: 13 },

  tableWrap: {
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.sm,
    overflow: "hidden",
  },
  tableHead: {
    flexDirection: "row",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
    backgroundColor: colors.card,
  },
  th: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: fonts.bodySemi,
    fontSize: 10.5,
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  tr: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.07)",
  },
  trFlag: { backgroundColor: "rgba(255,255,255,0.03)" },
  colName: { flex: 1, minWidth: 0 },
  colNum: { width: 74, textAlign: "right" },
  nameCell: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  flagDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.dsBlue },
  td: { color: "rgba(255,255,255,0.85)", fontFamily: fonts.body, fontSize: 14 },
  num: { fontFamily: fonts.bodySemi, fontVariant: ["tabular-nums"] },

  plan: {
    marginTop: spacing.xl,
    gap: 6,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.card,
  },
  planLabel: {
    color: colors.dsBlue,
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  planTitle: { color: "#FFFFFF", fontFamily: fonts.heading, fontSize: 21, lineHeight: 28 },
  planMeta: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.body, fontSize: 13 },
  outcomesLabel: { color: "rgba(255,255,255,0.72)", fontFamily: fonts.bodySemi, fontSize: 14, marginTop: spacing.sm },
  outcome: { flexDirection: "row", gap: spacing.sm, alignItems: "flex-start", marginTop: 6 },
  outcomeText: { flex: 1, color: "rgba(255,255,255,0.82)", fontFamily: fonts.body, fontSize: 14, lineHeight: 21 },
  caps: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: fonts.serifItalic,
    fontSize: 12.5,
    lineHeight: 19,
    marginTop: spacing.md,
  },

  source: {
    color: "rgba(255,255,255,0.38)",
    fontFamily: fonts.serifItalic,
    fontSize: 11.5,
    lineHeight: 17,
    marginTop: spacing.lg,
    maxWidth: 640,
  },
});
