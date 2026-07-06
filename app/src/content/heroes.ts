// Heroes of the Nation — South Africans, men and women, who gave something of themselves to the
// country's freedom and dignity. GROUNDED CONTENT ONLY (humanities-grounding rule): every claim
// traces to the public record and is cited in `sources`. Contested legacies are told honestly —
// neither sanitised nor sensationalised (rule §6). Uncertain specifics are flagged [VERIFY] for
// Tumo/Emma to confirm before submission; national-honour post-nominals are deliberately NOT asserted
// until verified. This is a starter set — add figures the same way, always with a source.

export type HeroEvent = { when: string; name: string; role: string; era?: "past" | "now" };

export type Hero = {
  id: string;
  /** Monogram fallback (used only if no photo is set — we don't fabricate portraits). */
  mono: string;
  /** Portrait — require("../../assets/heroes/<id>/<file>"). Real, rights-cleared photo only. */
  photo?: number;
  /** Additional real photos for the detail-page gallery. */
  gallery?: number[];
  name: string;
  /** Short honorific / how they're known, e.g. "‘Prof’ · Founder of the PAC". */
  honorific?: string;
  /** Life span, e.g. "1924 – 1978". */
  dates: string;
  /** One-line summary. */
  role: string;
  born?: string;
  died?: string;
  /** Movement / organisation they're most associated with. */
  movement?: string;
  /** The main grounded paragraph — their contribution and journey. */
  contribution: string;
  /** Life timeline (drives the detail sidebar). */
  life?: HeroEvent[];
  /** What to know — including honest complexity where it exists. */
  know?: string[];
  /** A grounded, attributed quote (or a documented slogan). Omitted rather than guessed. */
  quote?: { text: string; attr: string };
  /** Citation(s) — every hero must carry one. */
  sources: string;
};

export const heroes: Hero[] = [
  {
    id: "sobukwe",
    mono: "RS",
    photo: require("../../assets/heroes/sobukwe/01.webp"),
    gallery: [
      require("../../assets/heroes/sobukwe/02.webp"),
      require("../../assets/heroes/sobukwe/03.webp"),
      require("../../assets/heroes/sobukwe/04.webp"),
      require("../../assets/heroes/sobukwe/05.webp"),
      require("../../assets/heroes/sobukwe/07.webp"),
      require("../../assets/heroes/sobukwe/08.webp"),
    ],
    name: "Robert Mangaliso Sobukwe",
    honorific: "‘Prof’ · Founder-President of the PAC",
    dates: "1924 – 1978",
    role: "Founder of the Pan Africanist Congress; leader of the 1960 anti-pass campaign; held in isolation under a law written for him alone.",
    born: "1924 · Graaff-Reinet, E. Cape",
    died: "1978 · Kimberley",
    movement: "Pan Africanist Congress (PAC)",
    contribution:
      "A teacher and university lecturer known to his students as ‘Prof’, Robert Sobukwe broke from the ANC to found the Pan Africanist Congress in 1959, on a philosophy of African self-reliance and dignity. On 21 March 1960 he led a nationwide campaign against the pass laws, presenting himself for arrest — the same day police opened fire on protesters at Sharpeville. Sentenced to three years, he was not freed when his term ended: Parliament passed what became known as the ‘Sobukwe clause’, letting the state renew his detention year after year. He was held in isolation on Robben Island, then banished to Kimberley under restriction until his death in 1978.",
    life: [
      { when: "1924", name: "Born in Graaff-Reinet", role: "Eastern Cape" },
      { when: "1949", name: "Joins the ANC Youth League", role: "As a student at Fort Hare [VERIFY]" },
      { when: "1959", name: "Founds the PAC", role: "Elected its first president" },
      { when: "1960", name: "Leads the anti-pass campaign", role: "Arrested on 21 March, the day of Sharpeville" },
      { when: "1963", name: "The ‘Sobukwe clause’", role: "Held in isolation on Robben Island" },
      { when: "1969", name: "Banished to Kimberley", role: "Under restriction, unable to leave" },
      { when: "1978", name: "Dies in Kimberley", role: "", era: "past" },
    ],
    know: [
      "‘Prof’ insisted on the self-reliance and dignity of African people — a seed of what became Black Consciousness.",
      "The ‘Sobukwe clause’ (a General Law Amendment Act provision) was written to detain one man — him — and was renewed annually.",
      "On Robben Island he was kept apart from all other prisoners; warders were forbidden to speak to him.",
    ],
    quote: { text: "There is only one race — the human race.", attr: "Attributed to Robert Sobukwe [VERIFY wording/source]" },
    sources:
      "South African History Online (sahistory.org.za); Benjamin Pogrund, How Can Man Die Better: Sobukwe and Apartheid. Some dates [VERIFY]; national-honour post-nominals to be confirmed before publishing.",
  },
  {
    id: "ngoyi",
    mono: "LN",
    photo: require("../../assets/heroes/ngoyi/01.webp"),
    gallery: [
      require("../../assets/heroes/ngoyi/03.webp"),
      require("../../assets/heroes/ngoyi/04.webp"),
      require("../../assets/heroes/ngoyi/06.webp"),
    ],
    name: "Lilian Ngoyi",
    honorific: "‘Mma Ngoyi’",
    dates: "1911 – 1980",
    role: "Firebrand orator; first woman on the ANC national executive; a leader of the 1956 Women's March.",
    born: "1911 · Pretoria",
    died: "1980 · Orlando, Soweto",
    movement: "ANC Women's League · FEDSAW",
    contribution:
      "A seamstress and trade unionist, Lilian Ngoyi rose to become president of the ANC Women's League and, in 1956, the first woman elected to the ANC's national executive committee. On 9 August 1956 she was among the leaders of the roughly 20,000-strong women's march to the Union Buildings against the extension of pass laws to women. A commanding public speaker, she was tried for treason and spent much of her later life under banning orders and in and out of detention — silenced but unbroken — until her death in 1980.",
    life: [
      { when: "1911", name: "Born in Pretoria", role: "" },
      { when: "1952", name: "Defiance Campaign", role: "Becomes an active volunteer [VERIFY]" },
      { when: "1956", name: "Leads the Women's March", role: "9 August, to the Union Buildings" },
      { when: "1956", name: "Elected to the ANC NEC", role: "First woman to serve on it [VERIFY]" },
      { when: "1960s–70s", name: "Banning orders", role: "Long years silenced and restricted" },
      { when: "1980", name: "Dies in Soweto", role: "", era: "past" },
    ],
    know: [
      "She helped lead the ~20,000 women who marched on 9 August 1956 — the day now marked as Women's Day.",
      "She was the first woman elected to the ANC national executive committee.",
      "She spent much of her last two decades under banning orders — unable to be quoted, or to gather freely.",
    ],
    quote: { text: "Wathint' abafazi, wathint' imbokodo! — You strike the women, you strike a rock!", attr: "Slogan of the 1956 Women's March" },
    sources: "South African History Online; records of the Federation of South African Women (FEDSAW). Some dates [VERIFY].",
  },
  {
    id: "biko",
    mono: "SB",
    photo: require("../../assets/heroes/biko/08.webp"),
    gallery: [
      require("../../assets/heroes/biko/01.webp"),
      require("../../assets/heroes/biko/04.webp"),
      require("../../assets/heroes/biko/05.webp"),
      require("../../assets/heroes/biko/06.webp"),
      require("../../assets/heroes/biko/07.webp"),
      require("../../assets/heroes/biko/09.webp"),
      require("../../assets/heroes/biko/11.webp"),
      require("../../assets/heroes/biko/12.webp"),
      require("../../assets/heroes/biko/13.webp"),
      require("../../assets/heroes/biko/15.webp"),
      require("../../assets/heroes/biko/16.webp"),
    ],
    name: "Steve Biko",
    honorific: "Father of Black Consciousness",
    dates: "1946 – 1977",
    role: "Founder of the Black Consciousness Movement; died in police custody, his death igniting global outrage.",
    born: "1946 · Ginsberg, King William's Town",
    died: "1977 · in police custody, Pretoria",
    movement: "Black Consciousness Movement · SASO",
    contribution:
      "As a medical student, Steve Biko helped found the South African Students' Organisation (SASO) in 1968–69 and gave voice to Black Consciousness — the conviction that liberation had to begin with Black people freeing their own minds from the inferiority apartheid tried to teach. Writing under the pen name Frank Talk, he shaped a generation. Banned in 1973 and confined to King William's Town, he was detained in August 1977 and died on 12 September 1977 from injuries sustained in police custody. The state's attempt to excuse his death drew condemnation around the world and made him a martyr of the struggle.",
    life: [
      { when: "1946", name: "Born in Ginsberg", role: "King William's Town" },
      { when: "1968", name: "Co-founds SASO", role: "The South African Students' Organisation" },
      { when: "1972", name: "Black People's Convention", role: "Helps form it [VERIFY]" },
      { when: "1973", name: "Banned", role: "Restricted to King William's Town" },
      { when: "1977", name: "Detained, then dies in custody", role: "12 September, from his injuries", era: "past" },
    ],
    know: [
      "Black Consciousness taught psychological liberation before political liberation.",
      "His columns, written as ‘Frank Talk’, were collected as I Write What I Like.",
      "The inquest found no one responsible; accountability came only decades later, at the TRC.",
    ],
    quote: { text: "The most potent weapon in the hands of the oppressor is the mind of the oppressed.", attr: "Steve Biko" },
    sources: "South African History Online; Steve Biko, I Write What I Like; the TRC amnesty hearings. Some dates [VERIFY].",
  },
  {
    id: "winnie",
    mono: "WM",
    photo: require("../../assets/heroes/winnie/01.webp"),
    gallery: [
      require("../../assets/heroes/winnie/02.webp"),
      require("../../assets/heroes/winnie/03.webp"),
      require("../../assets/heroes/winnie/04.webp"),
      require("../../assets/heroes/winnie/05.webp"),
      require("../../assets/heroes/winnie/06.webp"),
      require("../../assets/heroes/winnie/07.webp"),
      require("../../assets/heroes/winnie/08.webp"),
      require("../../assets/heroes/winnie/09.webp"),
      require("../../assets/heroes/winnie/10.webp"),
      require("../../assets/heroes/winnie/11.webp"),
      require("../../assets/heroes/winnie/12.webp"),
      require("../../assets/heroes/winnie/13.webp"),
      require("../../assets/heroes/winnie/15.webp"),
      require("../../assets/heroes/winnie/16.webp"),
      require("../../assets/heroes/winnie/17.webp"),
    ],
    name: "Winnie Madikizela-Mandela",
    honorific: "‘Mother of the Nation’",
    dates: "1936 – 2018",
    role: "Kept the struggle visible through decades of banning, detention and banishment — a towering, and in parts contested, figure.",
    born: "1936 · Mbongweni, Bizana, E. Cape",
    died: "2018 · Johannesburg",
    movement: "ANC Women's League",
    contribution:
      "Nomzamo Winnie Madikizela trained as a social worker — reported to be the first qualified Black medical social worker at Baragwanath Hospital [VERIFY]. After marrying Nelson Mandela in 1958 and his imprisonment in 1963, she became the public face of his name and of resistance itself, enduring repeated banning orders, months of solitary detention in 1969–70, and forced banishment to the town of Brandfort. Her defiance made her a symbol of the struggle. Her legacy is also contested: in the late 1980s the Mandela United Football Club, associated with her Soweto home, was linked to violence including the 1989 killing of 14-year-old Stompie Seipei, and the Truth and Reconciliation Commission later found her accountable for gross human rights violations. South Africans hold both of these truths about her.",
    life: [
      { when: "1936", name: "Born in Bizana", role: "Eastern Cape (then Pondoland)" },
      { when: "1958", name: "Marries Nelson Mandela", role: "" },
      { when: "1969–70", name: "Solitary detention", role: "Held for months, much of it in isolation [VERIFY]" },
      { when: "1977", name: "Banished to Brandfort", role: "Restricted to the Free State town" },
      { when: "1988–89", name: "MUFC and the Stompie Seipei killing", role: "Later found accountable by the TRC" },
      { when: "2018", name: "Dies in Johannesburg", role: "", era: "past" },
    ],
    know: [
      "For much of the years Mandela was imprisoned, she was the most visible face of his name and the resistance.",
      "She endured banning, ~491 days of detention (much in solitary) and years of banishment to Brandfort [VERIFY].",
      "Honestly: the TRC found her accountable for gross human rights violations linked to the Mandela United Football Club, including the 1989 killing of Stompie Seipei.",
    ],
    sources:
      "South African History Online; the Truth and Reconciliation Commission Report (Vol. 2). Told honestly — neither sanitised nor sensationalised (project integrity rule). Some dates [VERIFY].",
  },
];

export const heroById = (id: string) => heroes.find((h) => h.id === id);
