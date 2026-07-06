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
};

export const historyTrail: HistoryMilestone[] = [
  { id: "y1652", year: "1652", title: "Settlement at the Cape", note: "The Dutch East India Company sets up a supply station at the Cape — the start of European settlement in South Africa." },
  { id: "y1795", year: "1795", title: "Britain takes the Cape", note: "Britain first occupies the Cape; after 1806 it holds it permanently." },
  { id: "y1816", year: "1816", title: "Rise of the Zulu kingdom", note: "Shaka builds the Zulu kingdom into a major power during the upheavals of the Mfecane." },
  { id: "y1834", year: "1834", title: "Abolition & the Great Trek", note: "Slavery is abolished at the Cape; from 1836 Voortrekkers move inland from British rule." },
  { id: "y1838", year: "1838", title: "Battle of Blood River", note: "Voortrekkers defeat a Zulu army at the Ncome River on 16 December 1838." },
  { id: "y1867", year: "1867", title: "Diamonds at Kimberley", note: "Diamonds are found near Kimberley, drawing capital and labour and reshaping the region." },
  { id: "y1886", year: "1886", title: "Gold on the Witwatersrand", note: "Gold is discovered on the Reef; Johannesburg is born and mining transforms the country." },
  { id: "y1899", year: "1899", title: "The South African War", note: "The Anglo-Boer / South African War (1899–1902) between Britain and the Boer republics." },
  { id: "y1910", year: "1910", title: "Union of South Africa", note: "The four colonies unite as the Union of South Africa — under white-minority rule." },
  { id: "y1912", year: "1912", title: "The ANC is founded", note: "The South African Native National Congress (later the ANC) is formed in Bloemfontein." },
  { id: "y1913", year: "1913", title: "The Natives Land Act", note: "The 1913 Land Act reserves most of the land for whites, dispossessing Black South Africans." },
  { id: "y1948", year: "1948", title: "Apartheid becomes law", note: "The National Party wins power and makes racial segregation official state policy." },
  { id: "y1955", year: "1955", title: "The Freedom Charter", note: "The Congress of the People adopts the Freedom Charter at Kliptown: 'The people shall govern.'" },
  { id: "y1960", year: "1960", title: "Sharpeville", note: "Police kill 69 people protesting the pass laws; the ANC and PAC are banned." },
  { id: "y1976", year: "1976", title: "Soweto Uprising", note: "On 16 June, Soweto pupils march against Afrikaans-medium schooling and are met with gunfire." },
  { id: "y1990", year: "1990", title: "Mandela walks free", note: "Nelson Mandela is released on 11 February; the liberation movements are unbanned." },
  { id: "y1994", year: "1994", title: "The first free election", note: "On 27 April, South Africans of all races vote together; Mandela becomes president." },
  { id: "y1996", year: "1996", title: "The Constitution", note: "One of the world's most progressive constitutions is adopted, with a Bill of Rights." },
  { id: "y2010", year: "2010", title: "The World Cup", note: "South Africa hosts the FIFA World Cup — the first on the African continent." },
  { id: "y2013", year: "2013", title: "Madiba passes", note: "Nelson Mandela dies on 5 December, aged 95, mourned around the world." },
  { id: "y2024", year: "2024", title: "Thirty years of freedom", note: "South Africa marks three decades of democracy since 1994." },
  { id: "y2026", year: "2026", title: "Today", note: "The story continues — carried now by the people who remember and retell it." },
];

export const historyTrailSource =
  "Dates from the public record of South African history (South African History Online, sahistory.org.za). These are milestones, not the whole story; framing kept honest.";
