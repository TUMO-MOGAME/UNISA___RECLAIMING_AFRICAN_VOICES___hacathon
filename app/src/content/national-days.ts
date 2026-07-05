import type { LocalizedText } from "./types";

// National Days — the commemorative days that carry South Africa's history. Grounded content only
// (AGENTS.md): every fact below is the well-documented public record of each day. Media (photos,
// video, audio) is being added by Emma — the optional fields below are the placeholders; drop files
// into app/assets/days/ and wire them here (see app/assets/days/README.md).

export type NationalDay = {
  id: string;
  /** Display date, e.g. "27 April" (day order in the year drives the list order). */
  date: string;
  name: string;
  /** One line — what the day commemorates. */
  commemorates: string;
  /** Grounded history paragraph (English base; UI chrome is localized separately). */
  history: string;
  /** Honest flag for days that are commemorative but not public holidays. */
  notPublicHoliday?: boolean;
  // ── media placeholders — wire when the files land in assets/days/ ──
  image?: number; // require("../../assets/days/<id>.webp")
  /** Real archival photograph credit — when set, the image is a HISTORICAL PHOTO (shown
   *  letterboxed and credited), NOT an AI interpretation, and is labelled accordingly. */
  imageCredit?: string;
  video?: number; // require("../../assets/days/<id>.mp4")
  /** YouTube video id — embedded (muted) in the media panel WHILE the day's poem plays;
   *  the photograph returns when the poem ends. Web only; native keeps the photo. */
  videoEmbed?: string;
  audio?: number; // a poem/recording for this day (plays once; listener replays)
  /** Attribution for the audio — the performer/poet's name, shown on the player. */
  audioBy?: string;
};

export const nationalDays: NationalDay[] = [
  {
    id: "human-rights-day",
    image: require("../../assets/days/human-rights-day.webp"),
    date: "21 March",
    name: "Human Rights Day",
    commemorates: "The Sharpeville massacre, 1960",
    history:
      "On 21 March 1960, police opened fire on a crowd in Sharpeville that had gathered to protest the pass laws, killing 69 people and wounding about 180. The massacre shocked the world, led to the banning of the ANC and PAC, and marked a turning point toward armed resistance. Since 1994 the day honours those who died and the human rights the Constitution now guarantees.",
  },
  {
    id: "freedom-day",
    image: require("../../assets/days/freedom-day.webp"),
    date: "27 April",
    name: "Freedom Day",
    commemorates: "The first democratic election, 1994",
    history:
      "On 27 April 1994, South Africans of all races voted together for the first time. Queues stretched for kilometres as millions cast the first ballot of their lives. The election ended over three centuries of colonial and apartheid rule and made Nelson Mandela the country's first democratically elected president.",
  },
  {
    id: "workers-day",
    image: require("../../assets/days/workers-day.webp"),
    date: "1 May",
    name: "Workers' Day",
    commemorates: "The workers and unions who fought for dignity",
    history:
      "International Workers' Day honours the labour movement — and in South Africa the trade unions were also a front line of the struggle against apartheid, organising under laws designed to silence them. It became an official public holiday after the 1994 elections.",
  },
  {
    id: "youth-day",
    image: require("../../assets/days/youth-day.webp"),
    imageCredit: "Photograph: Sam Nzima — Mbuyisa Makhubu carrying Hector Pieterson, 16 June 1976",
    videoEmbed: "xa8NO0JmDik",
    date: "16 June",
    name: "Youth Day",
    commemorates: "The Soweto Uprising, 1976",
    history:
      "On 16 June 1976, thousands of Soweto school pupils marched against being forced to learn in Afrikaans. Police opened fire on the children. Sam Nzima's photograph of the dying Hector Pieterson, carried by Mbuyisa Makhubu with Antoinette Sithole running alongside, carried the horror around the world. The uprising spread across the country and a generation of young people joined the struggle.",
    audio: require("../../assets/audio/youth-day-poem.mp3"),
    audioBy: "Sekhutlwana sa Bannye",
  },
  {
    id: "mandela-day",
    image: require("../../assets/days/mandela-day.webp"),
    date: "18 July",
    name: "Nelson Mandela International Day",
    commemorates: "Madiba's birthday — 67 minutes of service",
    notPublicHoliday: true,
    history:
      "Declared by the United Nations in 2009, Mandela Day falls on his birthday. People everywhere are asked to give 67 minutes of service to others — one minute for each of Mandela's 67 years in public life and struggle. It is a working day, not a public holiday: the point is to act, not to rest.",
  },
  {
    id: "womens-day",
    image: require("../../assets/days/womens-day.webp"),
    date: "9 August",
    name: "National Women's Day",
    commemorates: "The Women's March to the Union Buildings, 1956",
    history:
      "On 9 August 1956, about 20,000 women marched to the Union Buildings in Pretoria to protest the extension of pass laws to women, led by Lilian Ngoyi, Helen Joseph, Rahima Moosa and Sophia Williams-De Bruyn. They stood in silence for thirty minutes, then sang: Wathint' abafazi, wathint' imbokodo — you strike the women, you strike a rock.",
    audio: require("../../assets/audio/womens-day-poem.mp3"),
    audioBy: "Jessica Mbangeni",
  },
  {
    id: "heritage-day",
    image: require("../../assets/days/heritage-day.webp"),
    date: "24 September",
    name: "Heritage Day",
    commemorates: "The cultures, languages and traditions of all South Africans",
    history:
      "Heritage Day celebrates the nation's many cultures, languages, beliefs and traditions. In KwaZulu-Natal the date had long been marked as Shaka Day, honouring the Zulu king; when the new public-holiday calendar was negotiated after 1994, the day became a celebration of every South African's heritage.",
  },
  {
    id: "reconciliation-day",
    image: require("../../assets/days/reconciliation-day.webp"),
    date: "16 December",
    name: "Day of Reconciliation",
    commemorates: "Turning a divided past into a shared future",
    history:
      "16 December carried heavy and opposite meanings: for Afrikaners it was the Day of the Vow, marking the Battle of Blood River in 1838; for the liberation movement it was the day Umkhonto weSizwe was founded in 1961. Democratic South Africa deliberately kept the date and renamed it the Day of Reconciliation in 1995 — a day for the nation to face its history together.",
  },
];

export const dayById = (id: string) => nationalDays.find((d) => d.id === id);
