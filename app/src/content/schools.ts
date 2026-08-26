import { historyTrail } from "./history-trail";

// Seeded demo data for the Schools dashboard (Architecture v2, D5).
//
// THIS IS NOT REAL CLASS DATA, and the screen says so plainly on every load. Decision D5 keeps all
// progress device-local with no accounts, which means the app holds no learner records at all —
// there is nothing real to show a teacher yet. Rather than invent an account system to fill the
// screen, the dashboard runs over this obviously-fictional class so the shape of the feature can be
// judged honestly.
//
// The learner names are ordinary South African first names with an initial, chosen to look like a
// class register and nothing more. They are not people. If real class data ever lands (it would need
// accounts, minors' consent, and RLS — see docs/05-popia-compliance.md), this file is deleted rather
// than migrated.

export type DemoLearner = {
  id: string;
  name: string;
  /** Stage number reached along the 25-milestone trail. */
  stage: number;
  /** Best quiz score for the assigned chapter, out of `quizTotal`. */
  quiz: number;
  cards: number;
  /** Flagged for the teacher's attention — well behind the class. */
  needsHelp?: boolean;
};

export const DEMO_CLASS = {
  teacher: "Mrs Dlamini",
  grade: "Grade 7B",
  /** The milestone assigned this week — a real one from the trail. */
  assignedMilestoneId: "y1652",
  dueLabel: "Friday",
  quizTotal: 10,
};

export const demoLearners: DemoLearner[] = [
  { id: "l1", name: "Thabo M.", stage: 6, quiz: 9, cards: 12 },
  { id: "l2", name: "Naledi K.", stage: 6, quiz: 8, cards: 11 },
  { id: "l3", name: "Sipho N.", stage: 2, quiz: 4, cards: 3, needsHelp: true },
  { id: "l4", name: "Lerato P.", stage: 5, quiz: 7, cards: 9 },
  { id: "l5", name: "Ayanda B.", stage: 6, quiz: 10, cards: 13 },
  { id: "l6", name: "Kagiso S.", stage: 4, quiz: 6, cards: 7 },
  { id: "l7", name: "Zanele T.", stage: 5, quiz: 8, cards: 10 },
  { id: "l8", name: "Mpho R.", stage: 1, quiz: 3, cards: 2, needsHelp: true },
  { id: "l9", name: "Bongani D.", stage: 6, quiz: 9, cards: 12 },
  { id: "l10", name: "Refilwe M.", stage: 5, quiz: 7, cards: 8 },
  { id: "l11", name: "Sne Z.", stage: 4, quiz: 6, cards: 6 },
  { id: "l12", name: "Karabo L.", stage: 6, quiz: 10, cards: 14 },
];

/** The assigned milestone, resolved against the real trail. */
export const assignedMilestone = () =>
  historyTrail.find((m) => m.id === DEMO_CLASS.assignedMilestoneId) ?? historyTrail[0];

export const classStats = () => {
  const total = demoLearners.length;
  const assignedStage = 6;
  const completed = demoLearners.filter((l) => l.stage >= assignedStage).length;
  const avg = demoLearners.reduce((a, l) => a + l.quiz, 0) / total;
  return {
    total,
    completed,
    completionPct: Math.round((completed / total) * 100),
    avgScore: Math.round((avg / DEMO_CLASS.quizTotal) * 100),
    needsHelp: demoLearners.filter((l) => l.needsHelp).length,
  };
};

// ── Lesson plans (V2-27) ──────────────────────────────────────────────────
//
// CAPS alignment is stated only where it can be pointed at a real document. The Department of Basic
// Education publishes the Social Sciences (History) CAPS for the Senior Phase, Grades 7–9; the
// Grade 7 History curriculum covers, among other topics, the Transatlantic slave trade and colonial
// expansion at the Cape. That is the honest extent of what this claims — a topic-level match, not a
// per-outcome mapping, which would need the document open beside it.
//
// If a specific outcome code is ever needed here, it must be read out of the CAPS document itself.
// Do not infer one.

export type LessonPlan = {
  milestoneId: string;
  title: string;
  /** What the class should be able to say afterwards. */
  outcomes: string[];
  /** Roughly how long, in minutes. */
  minutes: number;
  capsNote: string;
};

export const lessonPlans: LessonPlan[] = [
  {
    milestoneId: "y1652",
    title: "1652 — the Cape supply station",
    outcomes: [
      "Say why the Dutch East India Company established a station at the Cape, and what a supply station was for.",
      "Name the Khoe as the people whose grazing land the settlement was built on.",
      "Explain why 'the land was empty' is a myth, using the 1657 Free Burgher farms and the 1659 Khoe resistance as evidence.",
    ],
    minutes: 45,
    capsNote:
      "Fits the Grade 7 Social Sciences (History) treatment of colonial expansion at the Cape — DBE CAPS, Senior Phase Grades 7–9.",
  },
  {
    milestoneId: "y1779",
    title: "1779 — the Frontier Wars begin",
    outcomes: [
      "Identify land — the Zuurveld grazing lands — as what the Cape Frontier Wars were fought over.",
      "Place the nine wars across a century, 1779 to 1879.",
      "Describe Makhanda's 1819 attack on Grahamstown and his imprisonment on Robben Island.",
    ],
    minutes: 45,
    capsNote:
      "Fits the Grade 7 Social Sciences (History) treatment of colonial expansion and resistance — DBE CAPS, Senior Phase Grades 7–9.",
  },
  {
    milestoneId: "y1816",
    title: "1816 — the Zulu kingdom and the Mfecane",
    outcomes: [
      "Explain how Shaka built the Zulu into a major power during the Mfecane.",
      "Distinguish Shaka, Dingane and Cetshwayo, and the moment each belongs to.",
    ],
    minutes: 45,
    capsNote:
      "Fits the Grade 8 Social Sciences (History) treatment of the Mfecane and southern African kingdoms — DBE CAPS, Senior Phase Grades 7–9.",
  },
];

export const lessonPlanFor = (milestoneId: string) =>
  lessonPlans.find((p) => p.milestoneId === milestoneId);

export const capsSource =
  "Department of Basic Education, Curriculum and Assessment Policy Statement (CAPS), Social Sciences, Senior Phase Grades 7–9. Topic-level alignment only — specific outcome codes must be read from the CAPS document itself.";
