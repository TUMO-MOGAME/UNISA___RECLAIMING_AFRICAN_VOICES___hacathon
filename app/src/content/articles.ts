// Perspectives — in-depth reading for adults, attached to the history the app already tells.
//
// INTEGRITY / COPYRIGHT (AGENTS.md): we do NOT reproduce a source article's text. Each entry is our
// own grounded editorial REVIEW of a published piece — summarised and attributed, every claim traced
// to its author — with a link out to the original. `summary`/`keyPoints`/`figures` are written in our
// words and attributed to the author; `timeline` orders the dated events the article documents.
//
// Ordering: articles for a day are sorted by publication date (oldest first) so that when several
// pieces cover the same history, the reader sees how the record was written over time.

export type ArticleFigure = {
  /** Person the article recovers or foregrounds. */
  name: string;
  /** One grounded line on who they were / their role — attributed to the article. */
  note: string;
};

export type ArticleEvent = {
  /** ISO date for sorting, e.g. "1976-06-16" (day precision) or "1976" (year only). */
  iso: string;
  /** Human label, e.g. "16 June 1976". */
  date: string;
  /** What happened. */
  event: string;
};

export type Article = {
  id: string;
  /** Links the article to a National Day (e.g. "youth-day"). */
  dayId?: string;
  title: string;
  author: string;
  /** Publisher / outlet, e.g. "Pambazuka News". */
  source: string;
  /** ISO publication date — drives ordering when several articles cover the same day. */
  publishedISO: string;
  /** Display date, e.g. "22 June 2017". */
  publishedLabel: string;
  /** Canonical link to the original article. */
  url: string;
  /** When set AND the publisher allows framing (no X-Frame-Options / CSP frame-ancestors block),
   *  the reading window shows the LIVE page in an in-app frame (web only) instead of our review —
   *  the reader never leaves our site. Falls back to the review + link if the frame fails to load. */
  embedUrl?: string;
  /** One-line framing shown on the card. */
  standfirst: string;
  /** Our grounded editorial review, in our own words, attributing claims to the author. */
  summary: string;
  /** Short takeaways (our words, attributed). */
  keyPoints?: string[];
  /** People the article recovers / foregrounds. */
  figures?: ArticleFigure[];
  /** The dated events the article documents, ordered oldest → newest at read time. */
  timeline?: ArticleEvent[];
  /** Honest rights / attribution note shown in the reader. */
  rights: string;
};

export const articles: Article[] = [
  {
    id: "time-soweto-photograph",
    dayId: "youth-day",
    title: "This Photo Inspired the World to Fight Against Apartheid",
    author: "Aryn Baker",
    source: "TIME",
    publishedISO: "2016-06-15",
    publishedLabel: "15 June 2016",
    url: "https://time.com/4365138/soweto-anniversary-photograph/",
    embedUrl: "https://time.com/4365138/soweto-anniversary-photograph/",
    standfirst:
      "The story behind Sam Nzima's photograph of the dying Hector Pieterson — the image that carried 16 June 1976 around the world.",
    summary:
      "Marking forty years since the Soweto uprising, TIME's Aryn Baker retells the story behind the single photograph that came to define the day: Sam Nzima's image of eighteen-year-old Mbuyisa Makhubu carrying the mortally wounded twelve-year-old Hector Pieterson, with Pieterson's sister Antoinette running alongside. Nzima, a press photographer, captured the frame moments after police opened fire on the marching schoolchildren; the picture ran in the world's newspapers and became one of the most recognisable images of the anti-apartheid struggle. Baker traces what the photograph cost those in and behind it — Nzima's own life under surveillance, and Makhubu's flight into an exile from which he never returned.",
    keyPoints: [
      "Sam Nzima's photograph of Hector Pieterson became the defining image of the Soweto uprising and a global symbol against apartheid.",
      "The article follows the lives behind the frame — the photographer Nzima, the boy Mbuyisa Makhubu who carried Pieterson, and Antoinette Sithole.",
      "It shows how a single image shifted world opinion on apartheid — and the price paid by those it made famous.",
    ],
    figures: [
      { name: "Sam Nzima", note: "The press photographer who took the photograph, then lived for years under police surveillance." },
      { name: "Hector Pieterson", note: "The twelve-year-old shot by police, whose death the photograph made known to the world." },
      { name: "Mbuyisa Makhubu", note: "The eighteen-year-old who carried Pieterson; he later fled into exile and disappeared." },
      { name: "Antoinette Sithole", note: "Pieterson's sister, running beside them in the frame." },
    ],
    timeline: [
      { iso: "1976-06-16", date: "16 June 1976", event: "Police open fire on the Soweto march; Sam Nzima photographs Mbuyisa Makhubu carrying the dying Hector Pieterson." },
      { iso: "2016-06-15", date: "15 June 2016", event: "On the 40th anniversary, TIME retells the story behind the photograph and the people in it." },
    ],
    rights:
      "The original article is shown from TIME's own website inside this window; all rights remain with TIME and the author. If it does not load, use 'Read the original' to open it directly. © TIME USA, LLC.",
  },
  {
    id: "herstory-soweto-erasure",
    dayId: "youth-day",
    title: "Herstory: The Soweto uprising and the erasure of Black women",
    author: "Thando Sipuye",
    source: "Pambazuka News",
    publishedISO: "2017-06-22",
    publishedLabel: "22 June 2017",
    url: "https://www.pambazuka.org/herstory-soweto-uprising-and-erasure-black-women",
    standfirst:
      "Why the standard story of 16 June 1976 remembers a handful of young men — and forgets the women who organised, marched, sheltered and died.",
    summary:
      "Writing on the forty-first anniversary of the uprising, the essayist and historian Thando Sipuye argues that the familiar account of 16 June 1976 commits what he calls epistemic violence against Black women. The day is remembered, he writes, through a small cast of male student leaders, while the women who helped organise the march, who marched in it, who hid and fed the students afterward, and who were themselves shot and detained, are left at the edges of the record — or out of it entirely.\n\n" +
      "Sipuye recovers specific names. He points to Sibongile Mkhabela, the only woman on the executive of the Soweto Students' Representative Council and General Secretary of the South African Students' Movement, whose organising role, he argues, is rarely matched by her place in the history books. He recalls Winnie Motlalepula Kgware — a teacher and, he notes, the first president of the Black People's Convention — as part of an older generation of women whose political work prepared the ground the students stood on. And he names young women killed in the violence that followed the first day, such as Hermina Leroke, shot in Diepkloof on 17 June 1976, whose deaths seldom reach the commemorations.\n\n" +
      "Even the most reproduced image of the day, he observes, carries the pattern: Antoinette Sithole, running beside the dying Hector Pieterson in Sam Nzima's photograph, is remembered as 'Hector's sister' rather than as a protester in her own right. Sipuye traces this habit of forgetting back to Euro-patriarchal traditions of history-writing that centre men as the makers of events, and he calls on us to correct the record — to write the women of 1976 back into it, by name.",
    keyPoints: [
      "The dominant narrative of 16 June 1976 foregrounds male student leaders and marginalises the women who organised, marched and died — a pattern the author calls epistemic violence.",
      "The article names specific women erased from the record, from student organisers to those killed in the days after the march.",
      "It reads even Sam Nzima's iconic photograph as an example: Antoinette Sithole reduced to 'Hector's sister' rather than a protester.",
      "The author locates the erasure in Euro-patriarchal ways of writing history and calls for the record to be corrected by name.",
    ],
    figures: [
      {
        name: "Sibongile Mkhabela",
        note: "The only woman on the executive of the Soweto Students' Representative Council and General Secretary of the South African Students' Movement.",
      },
      {
        name: "Winnie Motlalepula Kgware",
        note: "Teacher and, the article notes, the first president of the Black People's Convention — of the generation whose political work preceded the students.",
      },
      {
        name: "Antoinette Sithole",
        note: "Running beside Hector Pieterson in Sam Nzima's photograph; remembered as 'Hector's sister' rather than as a protester in her own right.",
      },
      {
        name: "Hermina Leroke",
        note: "A young woman shot dead in Diepkloof on 17 June 1976 — among those killed after the first day whose names rarely reach the commemorations.",
      },
      {
        name: "Dikeledi Motswene · Priscilla Msesenyane · Naledi Kedi Motsau · Martha Matthews",
        note: "Student participants the article lists among the women whose stories remain largely unrecorded.",
      },
    ],
    timeline: [
      {
        iso: "1976-06-16",
        date: "16 June 1976",
        event: "Soweto pupils march against being forced to learn in Afrikaans; police open fire. Women help organise and march alongside the students.",
      },
      {
        iso: "1976-06-17",
        date: "17 June 1976",
        event: "Hermina Leroke is shot dead in Diepkloof — among the women killed in the repression that followed the first day.",
      },
      {
        iso: "2017-06-22",
        date: "22 June 2017",
        event: "On the 41st anniversary, Thando Sipuye publishes this call to write the women of 1976 back into the record.",
      },
    ],
    rights:
      "Summarised and reviewed here in our own words, with attribution, under fair quotation — not reproduced. The views are the author's and do not necessarily reflect those of Pambazuka News. © Pambazuka News. Please read the full article at the link above.",
  },
];

/** Articles for a National Day, oldest publication first — so several pieces on the same event read
 *  in the order the record was written. */
export function articlesForDay(dayId: string): Article[] {
  return articles
    .filter((a) => a.dayId === dayId)
    .sort((a, b) => a.publishedISO.localeCompare(b.publishedISO));
}

/** A single article's dated events, ordered oldest → newest. */
export function orderedTimeline(a: Article): ArticleEvent[] {
  return [...(a.timeline ?? [])].sort((x, y) => x.iso.localeCompare(y.iso));
}
