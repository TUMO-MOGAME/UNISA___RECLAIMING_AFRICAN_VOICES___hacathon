import type { LocalizedText } from "./types";

// Journey quiz questions — one small check per milestone, tied to content/history-trail.ts.
//
// INTEGRITY (AGENTS.md §4). Two rules govern every question here:
//
//  1. The correct answer must be defensible from the milestone's own `note`, or from a branch under
//     it. Nothing is asked that the app has not already told the reader, from a cited source.
//
//  2. **A distractor must never teach a falsehood.** Where possible a wrong option is a REAL fact
//     from a different milestone — true, just not the answer to this question. The one deliberate
//     exception is the colonial "empty land" myth at 1652: it is offered precisely so that choosing
//     it is corrected on the spot, which is the opposite of teaching it.
//
// Strings are English-only, like the rest of the content layer; i18n/localize falls back to English
// honestly rather than passing off machine text as a reviewed translation.

export type QuizOption = {
  text: LocalizedText;
  correct?: boolean;
};

export type QuizQuestion = {
  id: string;
  /** The history-trail milestone this belongs to. */
  milestoneId: string;
  prompt: LocalizedText;
  options: QuizOption[];
  /** Shown after answering — why the answer is what it is. Traces to the milestone note. */
  explain: LocalizedText;
};

export const quizSource =
  "Every question follows the milestone notes in content/history-trail.ts, which are drawn from the " +
  "public record of South African history (South African History Online, Wikipedia, Britannica, gov.za).";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1652-who",
    milestoneId: "y1652",
    prompt: { en: "Who was already living at the Cape when the Dutch arrived in 1652?" },
    options: [
      { text: { en: "The Khoikhoi and the San" }, correct: true },
      { text: { en: "Nobody — the land was empty" } },
      { text: { en: "Only traders from Europe" } },
      { text: { en: "The Zulu kingdom" } },
    ],
    explain: {
      en: "Khoikhoi herders and San hunter-gatherers had lived at the Cape for thousands of years. Within seven years the Khoe under Doman were fighting the Dutch over the Liesbeek farms. The idea that the land was empty is a colonial myth, and 1652 marks the start of permanent European settlement — not a discovery.",
    },
  },
  {
    id: "q1652-what",
    milestoneId: "y1652",
    prompt: { en: "What did Jan van Riebeeck come to the Cape to build in 1652?" },
    options: [
      { text: { en: "A supply station for the Dutch East India Company" }, correct: true },
      { text: { en: "A gold mine" } },
      { text: { en: "A university" } },
      { text: { en: "A diamond field" } },
    ],
    explain: {
      en: "Van Riebeeck landed on 6 April 1652 to found a refreshment and supply station for ships of the Dutch East India Company. Gold and diamonds came much later — diamonds at Kimberley in 1867, gold on the Witwatersrand in 1886.",
    },
  },
  {
    id: "q1779-over",
    milestoneId: "y1779",
    prompt: { en: "What were the first Cape Frontier Wars fought over?" },
    options: [
      { text: { en: "The Zuurveld grazing lands" }, correct: true },
      { text: { en: "Control of the gold mines" } },
      { text: { en: "The right to vote" } },
      { text: { en: "Shipping routes around the Cape" } },
    ],
    explain: {
      en: "The nine Cape Frontier Wars (1779–1879) were fought between settlers and the Xhosa over the Zuurveld grazing lands. Land, not minerals, was the first great conflict — the mineral revolution began ninety years later.",
    },
  },
  {
    id: "q1816-shaka",
    milestoneId: "y1816",
    prompt: { en: "Who forged the Zulu into a major military power?" },
    options: [
      { text: { en: "Shaka" }, correct: true },
      { text: { en: "Cetshwayo" } },
      { text: { en: "Dingane" } },
      { text: { en: "Makhanda" } },
    ],
    explain: {
      en: "Shaka built the Zulu into a major power during the upheavals of the Mfecane. The others are real figures from nearby moments: Dingane's army met the Voortrekkers at Blood River in 1838, Cetshwayo led the Zulu against Britain in 1879, and Makhanda led 10,000 Xhosa against Grahamstown in 1819.",
    },
  },
  {
    id: "q1838-river",
    milestoneId: "y1838",
    prompt: { en: "At which river did Voortrekkers defeat Dingane's army on 16 December 1838?" },
    options: [
      { text: { en: "The Ncome, later called Blood River" }, correct: true },
      { text: { en: "The Liesbeek" } },
      { text: { en: "The Orange" } },
      { text: { en: "The Vaal" } },
    ],
    explain: {
      en: "The battle was fought at the Ncome River, afterwards called Blood River. The Liesbeek is a real place in this story too — it is where the Khoe fought the Dutch in 1659 — but it is at the Cape, not in Zululand.",
    },
  },
  {
    id: "q1867-kimberley",
    milestoneId: "y1867",
    prompt: { en: "What was found at Kimberley in 1867?" },
    options: [
      { text: { en: "Diamonds" }, correct: true },
      { text: { en: "Gold" } },
      { text: { en: "Coal" } },
      { text: { en: "Iron" } },
    ],
    explain: {
      en: "Diamonds at Kimberley in 1867 began the mineral revolution — and with it a hunger for cheap Black labour. Gold followed on the Witwatersrand in 1886, and built Johannesburg.",
    },
  },
  {
    id: "q1886-gold",
    milestoneId: "y1886",
    prompt: { en: "Which city was born from the 1886 gold discovery?" },
    options: [
      { text: { en: "Johannesburg" }, correct: true },
      { text: { en: "Kimberley" } },
      { text: { en: "Bloemfontein" } },
      { text: { en: "Cape Town" } },
    ],
    explain: {
      en: "Gold on the Witwatersrand built Johannesburg and industrialised the country on migrant Black labour. Kimberley was the diamond town of 1867; Bloemfontein is where the ANC was founded in 1912; Cape Town grew from the 1652 supply station.",
    },
  },
  {
    id: "q1910-union",
    milestoneId: "y1910",
    prompt: { en: "Who was excluded from the vote when the Union of South Africa was formed in 1910?" },
    options: [
      { text: { en: "The Black majority" }, correct: true },
      { text: { en: "Nobody — everyone could vote" } },
      { text: { en: "Only people under 21" } },
      { text: { en: "Recent arrivals from Britain" } },
    ],
    explain: {
      en: "The four colonies united on 31 May 1910 as a white-ruled state that shut the Black majority out of the vote. It took until 27 April 1994 for South Africans of all races to vote together.",
    },
  },
  {
    id: "q1912-anc",
    milestoneId: "y1912",
    prompt: { en: "Where was the South African Native National Congress — later the ANC — founded?" },
    options: [
      { text: { en: "Bloemfontein" }, correct: true },
      { text: { en: "Kliptown" } },
      { text: { en: "Sharpeville" } },
      { text: { en: "Soweto" } },
    ],
    explain: {
      en: "It was founded in Bloemfontein on 8 January 1912. The other three are real places in this history: the Freedom Charter was adopted at Kliptown in 1955, police killed 69 protesters at Sharpeville in 1960, and Soweto pupils rose in 1976.",
    },
  },
  {
    id: "q1913-land",
    milestoneId: "y1913",
    prompt: { en: "How much of the land did the 1913 Natives Land Act reserve for the Black majority?" },
    options: [
      { text: { en: "About 7%" }, correct: true },
      { text: { en: "About half" } },
      { text: { en: "About 70%" } },
      { text: { en: "All of it" } },
    ],
    explain: {
      en: "The Natives Land Act of 19 June 1913 reserved roughly 7% of the land for the majority of the population, and built the migrant-labour system on that dispossession.",
    },
  },
  {
    id: "q1955-charter",
    milestoneId: "y1955",
    prompt: { en: "Which words open the Freedom Charter adopted at Kliptown in 1955?" },
    options: [
      { text: { en: "The people shall govern" }, correct: true },
      { text: { en: "You strike a woman, you strike a rock" } },
      { text: { en: "One settler, one bullet" } },
      { text: { en: "Freedom in our lifetime" } },
    ],
    explain: {
      en: "'The people shall govern' opens the Freedom Charter, adopted by the Congress of the People at Kliptown. 'You strike a woman, you strike a rock' is also real — it belongs to the women's march on the Union Buildings in 1956.",
    },
  },
  {
    id: "q1956-march",
    milestoneId: "y1956",
    prompt: { en: "What were the 20,000 women marching against on 9 August 1956?" },
    options: [
      { text: { en: "The pass laws" }, correct: true },
      { text: { en: "Afrikaans-medium schooling" } },
      { text: { en: "The price of bread" } },
      { text: { en: "The 1913 Land Act" } },
    ],
    explain: {
      en: "They marched on the Union Buildings against the pass laws, and the day is now Women's Day. Afrikaans-medium schooling is what Soweto's pupils marched against twenty years later, in 1976.",
    },
  },
  {
    id: "q1976-soweto",
    milestoneId: "y1976",
    prompt: { en: "What were Soweto pupils marching against on 16 June 1976?" },
    options: [
      { text: { en: "Being taught in Afrikaans" }, correct: true },
      { text: { en: "School fees" } },
      { text: { en: "The banning of the ANC" } },
      { text: { en: "The Rivonia sentences" } },
    ],
    explain: {
      en: "Pupils marched against Afrikaans-medium schooling and were met with gunfire. The ANC and PAC bannings followed Sharpeville in 1960, and the Rivonia sentences came in 1964 — both real, both earlier.",
    },
  },
  {
    id: "q1994-vote",
    milestoneId: "y1994",
    prompt: { en: "What happened on 27 April 1994?" },
    options: [
      { text: { en: "South Africans of all races voted together for the first time" }, correct: true },
      { text: { en: "Nelson Mandela was released from prison" } },
      { text: { en: "The Freedom Charter was adopted" } },
      { text: { en: "South Africa hosted the World Cup" } },
    ],
    explain: {
      en: "On 27 April 1994 South Africans of all races voted together, and Mandela became the first Black president. The other three are real events on other dates: his release was 11 February 1990, the Charter was 1955, and the World Cup was 2010.",
    },
  },
];

/** Questions for one milestone, in authored order. */
export const quizFor = (milestoneId: string): QuizQuestion[] =>
  quizQuestions.filter((q) => q.milestoneId === milestoneId);

/** Whether a milestone has a quiz yet — the rest are authored as their sources are checked. */
export const hasQuiz = (milestoneId: string): boolean =>
  quizQuestions.some((q) => q.milestoneId === milestoneId);

/** The one correct option, or undefined if a question is malformed. */
export const answerOf = (q: QuizQuestion): QuizOption | undefined => q.options.find((o) => o.correct);

/**
 * Option indices in a shuffled order, for re-asking a question after a correction (KTR-01, D7).
 *
 * When a wrong answer hands the question back, the options are reordered so that answering again is
 * a deliberate re-read rather than tapping a remembered position. Reordering is presentation only:
 * it can never add, drop or change a correct answer, and `quiz.test.ts` pins that.
 *
 * `rand` is injectable so the invariant can be tested against every permutation rather than hoped at.
 */
export function shuffledOptionOrder(q: QuizQuestion, rand: () => number = Math.random): number[] {
  const order = q.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}
