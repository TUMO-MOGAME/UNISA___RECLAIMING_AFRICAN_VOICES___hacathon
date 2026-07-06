// The History Trail — a winding "journey" of dated milestones that traces South Africa's story from
// the start of European settlement (1652) to today (2026). GROUNDED CONTENT (humanities rule): each
// year marks a real, well-documented event; the one-line notes are factual. These are MILESTONES, not
// the whole story — chosen to give the shape of the history, and cited below. Framing is kept honest
// (e.g. 1652 is named as the start of colonial settlement, not "discovery").

export type HistoryMilestone = {
  id: string;
  year: string;
  /** Short headline for the dot. */
  title: string;
  /** One grounded line of context. */
  note: string;
  /** Smaller events that branch off this milestone — rendered as thin side-roads with tiny dates,
   *  distinct from the thick main road. Populate more of these from research. */
  branches?: HistoryMilestone[];
};

export const historyTrail: HistoryMilestone[] = [
  {
    id: "y1652", year: "1652", title: "Cape settlement", note: "Jan van Riebeeck lands for the Dutch East India Company (6 April 1652), founding a supply station — the start of permanent European settlement.",
    branches: [
      { id: "b1657", year: "1657", title: "Free Burghers", note: "The VOC frees nine servants to farm on Khoe grazing land — the beginning of settler land dispossession." },
      { id: "b1660", year: "1659", title: "First Khoi war", note: "The Khoe under Doman fight the Dutch over the Liesbeek farms (1659–1660) — the first war of resistance." },
      { id: "b1688", year: "1688", title: "The Huguenots", note: "About 180 French Huguenot refugees arrive and are settled at Franschhoek, bringing viticulture." },
    ],
  },
  {
    id: "y1779", year: "1779", title: "Frontier wars begin", note: "The first of nine Cape Frontier Wars (1779–1879) between settlers and the Xhosa over the Zuurveld grazing lands.",
    branches: [
      { id: "b1819", year: "1819", title: "Makhanda", note: "The warrior-prophet Makhanda (Nxele) leads 10,000 Xhosa against Grahamstown; captured, he is jailed on Robben Island." },
      { id: "b1857", year: "1857", title: "The Cattle-Killing", note: "Nongqawuse's prophecy leads the Xhosa to destroy their herds and crops (1856–58); famine breaks the kingdom." },
    ],
  },
  {
    id: "y1806", year: "1806", title: "Britain takes the Cape", note: "Britain occupies the Cape permanently, bringing new settlers, English institutions and later the abolition of slavery.",
    branches: [
      { id: "b1820", year: "1820", title: "The 1820 Settlers", note: "About 4,000 British settlers land at Algoa Bay as a buffer on the Xhosa frontier." },
    ],
  },
  {
    id: "y1816", year: "1816", title: "The Zulu kingdom", note: "Shaka forges the Zulu into a major military power during the upheavals of the Mfecane.",
    branches: [
      { id: "b1828", year: "1828", title: "Shaka killed", note: "Shaka is assassinated; his successor Dingane faces the arriving Voortrekkers." },
    ],
  },
  { id: "y1834", year: "1834", title: "Great Trek", note: "Britain abolishes slavery (1834); resentful Boer Voortrekkers trek inland from 1835 to found their own republics." },
  { id: "y1838", year: "1838", title: "Blood River", note: "Voortrekkers defeat Dingane's Zulu army at the Ncome (Blood) River on 16 December 1838." },
  {
    id: "y1867", year: "1867", title: "Diamonds", note: "Diamonds are found at Kimberley — the start of the mineral revolution and a hunger for cheap Black labour.",
    branches: [
      { id: "b1868", year: "1868", title: "Basotho protected", note: "King Moshoeshoe I secures British protection for Basutoland (12 March 1868), keeping it out of Boer hands." },
    ],
  },
  {
    id: "y1879", year: "1879", title: "Anglo-Zulu War", note: "Cetshwayo's Zulu crush a British column at Isandlwana (22 Jan 1879); Britain regroups, burns Ulundi and annexes Zululand.",
    branches: [
      { id: "b1883", year: "1883", title: "Mapoch War", note: "After an eight-month siege, the Ndzundza Ndebele under Nyabela surrender to the Transvaal (1883)." },
      { id: "b1898", year: "1898", title: "Venda falls", note: "The Mphephu War ends the Venda kingdom's independence in the far north (1898)." },
    ],
  },
  {
    id: "y1886", year: "1886", title: "Gold", note: "Gold is found on the Witwatersrand; Johannesburg is born and the country industrialises on migrant Black labour.",
    branches: [
      { id: "b1893", year: "1893", title: "Gandhi arrives", note: "A young lawyer, M.K. Gandhi, reaches Natal, where he later develops satyagraha." },
      { id: "b1894", year: "1894", title: "Glen Grey Act", note: "Rhodes's law breaks communal land tenure and taxes men into the labour market — a blueprint for segregation." },
    ],
  },
  {
    id: "y1899", year: "1899", title: "South African War", note: "The Anglo-Boer / South African War (1899–1902) between Britain and the Boer republics.",
    branches: [
      { id: "b1906", year: "1906", title: "Bambatha", note: "Chief Bambatha leads an armed revolt against the poll tax — the last major armed tribal resistance (1906)." },
    ],
  },
  { id: "y1910", year: "1910", title: "Union of SA", note: "The four colonies unite (31 May 1910) as a white-ruled state that excludes the Black majority from the vote." },
  { id: "y1912", year: "1912", title: "The ANC", note: "The South African Native National Congress (later the ANC) is founded in Bloemfontein (8 January 1912)." },
  {
    id: "y1913", year: "1913", title: "Land Act", note: "The Natives Land Act (19 June 1913) reserves ~7% of the land for the Black majority, creating a migrant-labour system.",
    branches: [
      { id: "b1936", year: "1936", title: "Land Act extended", note: "The Native Trust and Land Act enlarges the reserves to 13% and tightens segregation." },
    ],
  },
  {
    id: "y1948", year: "1948", title: "Apartheid", note: "The National Party wins power (26 May 1948) and makes racial segregation a rigid legal system.",
    branches: [
      { id: "b1950", year: "1950", title: "Group Areas Act", note: "Forced removals segregate where people may live; the Immorality Act bans interracial relationships." },
      { id: "b1953", year: "1953", title: "Bantu Education", note: "A deliberately inferior schooling system is imposed on Black children." },
    ],
  },
  { id: "y1955", year: "1955", title: "Freedom Charter", note: "The Congress of the People adopts the Freedom Charter at Kliptown: 'The people shall govern.'" },
  { id: "y1956", year: "1956", title: "Women's March", note: "20,000 women march on the Union Buildings against pass laws (9 August 1956): 'you strike a rock.'" },
  {
    id: "y1960", year: "1960", title: "Sharpeville", note: "Police kill 69 people protesting the pass laws (21 March 1960); the ANC and PAC are banned.",
    branches: [
      { id: "b1962", year: "1962", title: "Mandela captured", note: "Nelson Mandela is caught near Howick (5 Aug 1962), beginning 27 years in prison." },
    ],
  },
  { id: "y1964", year: "1964", title: "Rivonia Trial", note: "Mandela, Sisulu, Mbeki and others are sentenced to life imprisonment (12 June 1964)." },
  {
    id: "y1976", year: "1976", title: "Soweto Uprising", note: "On 16 June, Soweto pupils march against Afrikaans-medium schooling and are met with gunfire.",
    branches: [
      { id: "b1977", year: "1977", title: "Biko killed", note: "The Black Consciousness leader Steve Biko dies in police custody (12 September 1977)." },
    ],
  },
  { id: "y1990", year: "1990", title: "Mandela free", note: "Nelson Mandela is released (11 February 1990); the liberation movements are unbanned." },
  {
    id: "y1994", year: "1994", title: "Democracy", note: "On 27 April, South Africans of all races vote together; Mandela becomes the first Black president.",
    branches: [
      { id: "b1996", year: "1996", title: "The Constitution", note: "A progressive new Constitution with a Bill of Rights is adopted (1996)." },
    ],
  },
  { id: "y2010", year: "2010", title: "World Cup", note: "South Africa hosts the FIFA World Cup — the first on the African continent." },
  { id: "y2013", year: "2013", title: "Madiba passes", note: "Nelson Mandela dies on 5 December, aged 95, mourned around the world." },
  { id: "y2024", year: "2024", title: "The GNU", note: "The ANC loses its majority for the first time (May 2024); a Government of National Unity forms." },
  { id: "y2026", year: "2026", title: "Today", note: "A coalition governs toward the November 2026 municipal elections — the story continues." },
];

export const historyTrailSource =
  "Dates from the public record of South African history (South African History Online, Wikipedia, Britannica, gov.za). These are milestones, not the whole story; framing kept honest.";
