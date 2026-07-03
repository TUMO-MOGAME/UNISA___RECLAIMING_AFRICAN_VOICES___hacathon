// The Presidents. Grounded content (design/presidents-content.md is the review sheet). Democratic-era
// leaders (1994+) carry the gold accent; pre-1994 Union/apartheid heads of state are recorded in
// neutral grey — documented honestly, neither erased nor celebrated (grounding rule §6). Hard chapters
// are stated factually with sources. [VERIFY] some dates/family details before submission.

export type LifeEvent = { when: string; name: string; role: string; era?: "past" | "now" };
export type President = {
  id: string;
  order: number;
  mono: string; // monogram, e.g. "NM"
  name: string;
  clan?: string;
  term: string; // "1994 – 1999"
  role: string; // one-line
  era: "democratic" | "pre1994";
  born?: string; // "1918 · Mvezo, E. Cape"
  died?: string; // "2013 · Johannesburg"
  party?: string;
  struggle?: string;
  life?: LifeEvent[];
  family?: { rel: string; name: string }[];
  know?: string[];
  quote?: { text: string; attr: string };
  sources?: string;
};

export const presidents: President[] = [
  {
    id: "mandela",
    order: 1,
    mono: "NM",
    name: "Nelson Mandela",
    clan: "Madiba · Tata",
    term: "1994 – 1999",
    role: "Anti-apartheid icon; 27 years imprisoned; the first democratically-elected president.",
    era: "democratic",
    born: "1918 · Mvezo, E. Cape",
    died: "2013 · Johannesburg",
    party: "ANC",
    struggle:
      "Mandela joined the ANC in 1944 and helped found its Youth League. As apartheid hardened, he co-founded Umkhonto we Sizwe, its armed wing. Convicted at the 1964 Rivonia Trial, he was sentenced to life and spent 27 years in prison — much of it on Robben Island. Released on 11 February 1990, he shared the 1993 Nobel Peace Prize with F.W. de Klerk and, in 1994, became South Africa's first democratically-elected president.",
    life: [
      { when: "1918", name: "Born in Mvezo", role: "Eastern Cape; of the Thembu royal house" },
      { when: "1944", name: "Joins the ANC", role: "Co-founds the ANC Youth League" },
      { when: "1964", name: "Rivonia Trial", role: "Sentenced to life; imprisoned 27 years" },
      { when: "1990", name: "Released", role: "Walks free on 11 February" },
      { when: "1994", name: "Elected President", role: "South Africa's first free election" },
      { when: "2013", name: "Dies in Johannesburg", role: "Aged 95", era: "past" },
    ],
    family: [
      { rel: "Spouse", name: "Evelyn Mase · 1944–58" },
      { rel: "Spouse", name: "Winnie Madikizela-Mandela · 1958–96" },
      { rel: "Spouse", name: "Graça Machel · 1998" },
      { rel: "Children", name: "Six, across his marriages" },
    ],
    know: [
      "His clan name is Madiba; he is affectionately called Tata — father of the nation.",
      "He chose reconciliation over revenge — championing the Truth & Reconciliation Commission.",
      "He served a single term by choice, stepping down to strengthen the young democracy.",
    ],
    quote: { text: "It always seems impossible until it's done.", attr: "Nelson Mandela" },
    sources: "Long Walk to Freedom · the Nelson Mandela Foundation. Hard chapters are told honestly, never sanitised.",
  },
  {
    id: "mbeki",
    order: 2,
    mono: "TM",
    name: "Thabo Mbeki",
    term: "1999 – 2008",
    role: "\"I am an African\"; the African Renaissance; a decade of economic growth.",
    era: "democratic",
    born: "1942 · Mbewuleni, E. Cape",
    party: "ANC",
    struggle:
      "Mbeki spent much of the struggle in exile from the 1960s and became a key figure in the negotiations that ended apartheid.",
    life: [
      { when: "1942", name: "Born in Mbewuleni", role: "Eastern Cape" },
      { when: "1999", name: "Elected President", role: "Succeeds Mandela" },
      { when: "2008", name: "Resigns", role: "Recalled by the ANC", era: "past" },
    ],
    family: [{ rel: "Spouse", name: "Zanele Mbeki" }],
    know: [
      "His \"I am an African\" speech (1996) marked the adoption of the Constitution.",
      "He championed the African Renaissance and NEPAD, and oversaw strong economic growth.",
      "Honestly: his government's HIV/AIDS denialism and 'quiet diplomacy' on Zimbabwe drew lasting criticism.",
    ],
    quote: { text: "I am an African.", attr: "Thabo Mbeki, 1996" },
    sources: "The Presidency · Mark Gevisser, A Legacy of Liberation.",
  },
  {
    id: "motlanthe",
    order: 3,
    mono: "KM",
    name: "Kgalema Motlanthe",
    term: "2008 – 2009",
    role: "Caretaker president; trade unionist and Robben Island veteran.",
    era: "democratic",
    born: "1949 · Boksburg",
    party: "ANC",
    struggle:
      "A trade unionist (NUM secretary-general) who was imprisoned on Robben Island for ANC activity, Motlanthe steadied the country during a tense handover.",
    life: [
      { when: "1949", name: "Born in Boksburg", role: "" },
      { when: "2008", name: "Caretaker President", role: "After Mbeki's resignation, until the 2009 election" },
    ],
    know: [
      "A respected unifier who held the country steady during a difficult transition.",
      "Later chaired the High-Level Panel reviewing post-1994 legislation.",
    ],
    sources: "The Presidency · SA History Online. [VERIFY] imprisonment dates + family.",
  },
  {
    id: "zuma",
    order: 4,
    mono: "JZ",
    name: "Jacob Zuma",
    term: "2009 – 2018",
    role: "Umkhonto we Sizwe veteran; a presidency later marked by state-capture controversy.",
    era: "democratic",
    born: "1942 · Nkandla, KZN",
    party: "ANC",
    struggle:
      "Zuma joined MK and was imprisoned on Robben Island for 10 years (1963–1973), later serving in ANC intelligence in exile.",
    life: [
      { when: "1942", name: "Born in Nkandla", role: "KwaZulu-Natal" },
      { when: "1963", name: "Imprisoned", role: "10 years on Robben Island" },
      { when: "2009", name: "Elected President", role: "" },
      { when: "2018", name: "Resigns", role: "Recalled by the ANC", era: "past" },
    ],
    know: [
      "A popular orator with deep struggle credentials.",
      "Honestly: his presidency was dominated by controversy — the arms-deal and corruption charges, Nkandla, and 'state capture', later examined by the Zondo Commission.",
    ],
    sources: "The Zondo Commission report · court records · the Presidency. Stated factually.",
  },
  {
    id: "ramaphosa",
    order: 5,
    mono: "CR",
    name: "Cyril Ramaphosa",
    term: "2018 – present",
    role: "Founder of the mineworkers' union and chief negotiator of the 1996 Constitution.",
    era: "democratic",
    born: "1952 · Soweto, Johannesburg",
    party: "ANC",
    struggle:
      "Ramaphosa founded the National Union of Mineworkers in 1982 and was the ANC's chief negotiator at CODESA, chairing the Constitutional Assembly that produced the 1996 Constitution.",
    life: [
      { when: "1952", name: "Born in Soweto", role: "" },
      { when: "1982", name: "Founds the NUM", role: "National Union of Mineworkers" },
      { when: "1991–96", name: "Chief negotiator", role: "Chairs the Constitutional Assembly" },
      { when: "2018", name: "Becomes President", role: "", era: "now" },
    ],
    family: [{ rel: "Spouse", name: "Dr Tshepo Motsepe" }],
    know: [
      "Later a prominent businessman before returning to lead the country.",
      "Honestly: his role as a Lonmin director around the 2012 Marikana massacre remains a point of scrutiny.",
    ],
    sources: "The Presidency · Anthony Butler, Cyril Ramaphosa.",
  },

  // --- Before democracy · 1910–1994 (documented honestly, neutral grey) ---
  { id: "louis-botha", order: 6, mono: "LB", name: "Louis Botha", term: "PM · 1910–1919", role: "First Prime Minister of the Union; Boer general turned statesman.", era: "pre1994" },
  { id: "jan-smuts", order: 7, mono: "JS", name: "Jan Smuts", term: "PM · 1919–24 & 1939–48", role: "A global statesman abroad who upheld segregation at home.", era: "pre1994" },
  { id: "hertzog", order: 8, mono: "JH", name: "J.B.M. Hertzog", term: "PM · 1924–1939", role: "Afrikaner nationalism; laws that stripped Black South Africans' rights.", era: "pre1994" },
  { id: "malan", order: 9, mono: "DM", name: "D.F. Malan", term: "PM · 1948–1954", role: "The National Party's 1948 victory — apartheid becomes law.", era: "pre1994" },
  { id: "strijdom", order: 10, mono: "JGS", name: "J.G. Strijdom", term: "PM · 1954–1958", role: "Entrenched white-minority rule; removed Coloured voters from the roll.", era: "pre1994" },
  { id: "verwoerd", order: 11, mono: "HV", name: "H.F. Verwoerd", term: "PM · 1958–1966", role: "The 'architect of apartheid'; Bantu Education; assassinated in 1966.", era: "pre1994" },
  { id: "vorster", order: 12, mono: "BV", name: "B.J. Vorster", term: "PM · 1966–1978", role: "A security state — detention without trial and hard repression.", era: "pre1994" },
  { id: "pw-botha", order: 13, mono: "PW", name: "P.W. Botha", term: "PM / State President · 1978–1989", role: "'Die Groot Krokodil'; the states of emergency of the 1980s.", era: "pre1994" },
  { id: "de-klerk", order: 14, mono: "FW", name: "F.W. de Klerk", term: "State President · 1989–1994", role: "Unbanned the ANC, freed Mandela and negotiated apartheid's end; shared the 1993 Nobel.", era: "pre1994" },
];

export const democraticPresidents = presidents.filter((p) => p.era === "democratic");
export const pre1994Leaders = presidents.filter((p) => p.era === "pre1994");
export const presidentById = (id: string) => presidents.find((p) => p.id === id);
