// Provinces → Cities → City history. Grounded content (design/provinces-content.md is the review
// sheet). Every fact traces to the public record; stats carry a status: "cited" | "verify" so the UI
// can honestly flag figures still to be confirmed against StatsSA / Dept. of Basic Education.
// Setswana translations are still TODO — [REVIEW: Setswana]. See humanities-grounding skill.

import type { ImageSourcePropType } from "react-native";

export type StatStatus = "cited" | "verify";
export type Stat = { label: string; value: string; status: StatStatus };
export type Leader = { when: string; name: string; role: string; era?: "past" | "now" };

export type City = {
  id: string;
  name: string;
  provinceId: string;
  founded: string; // "1652"
  subtitle?: string; // e.g. "iKapa — the Mother City"
  hero: ImageSourcePropType;
  beforeTheCity?: string;
  origins: string;
  leaders: Leader[];
  stats: Stat[];
  landmarks: string[];
  sources: string;
};

export type Province = {
  id: string;
  name: string;
  capital: string;
  formed: string;
  populationStat: Stat;
  languages: string;
  overview: string;
  hero: ImageSourcePropType;
  cities: City[];
};

const WC = require("../../assets/places/western-cape.jpg");
const GP = require("../../assets/places/gauteng.jpg");
const NC = require("../../assets/places/northern-cape.jpg");

export const provinces: Province[] = [
  {
    id: "western-cape",
    name: "Western Cape",
    capital: "Cape Town",
    formed: "1994",
    populationStat: { label: "People (Census 2022)", value: "~7.4M", status: "verify" },
    languages: "Afrikaans · isiXhosa · English",
    overview:
      "The provinces were drawn in 1994, but the Western Cape's story runs from the Khoikhoi and San, through the 1652 Dutch station at the Cape, the wine-lands and the Overberg, to the cities of today.",
    hero: WC,
    cities: [
      {
        id: "cape-town",
        name: "Cape Town",
        provinceId: "western-cape",
        founded: "1652",
        subtitle: "iKapa — the Mother City",
        hero: WC,
        beforeTheCity:
          "Long before any harbour, the Cape was home to the Khoikhoi herders (Goringhaiqua, Gorachouqua) and San hunter-gatherers. Autshumato, a leader and interpreter, was among the first to broker with passing ships.",
        origins:
          "In 1652 the Dutch East India Company, under Jan van Riebeeck, set up a refreshment station to resupply ships on the spice route — the first colonial town in southern Africa. It grew at the meeting point, and collision, of Khoikhoi, European, and enslaved Southeast Asian and African peoples — a history still written into the city's languages, food and faiths.",
        leaders: [
          { when: "Until the 1650s", name: "Khoikhoi & San peoples", role: "Indigenous inhabitants of the Cape Peninsula", era: "past" },
          { when: "1652 – 1662", name: "Jan van Riebeeck", role: "VOC Commander · founding administrator" },
          { when: "1662 – 1910", name: "VOC & British governors", role: "Colonial administration — see sources", era: "past" },
          { when: "2011 – 2018", name: "Patricia de Lille", role: "Executive Mayor" },
          { when: "2021 – present", name: "Geordin Hill-Lewis", role: "Executive Mayor", era: "now" },
        ],
        stats: [
          { label: "Founded (VOC)", value: "1652", status: "cited" },
          { label: "Metro population", value: "~4.8M", status: "verify" },
          { label: "Universities", value: "3", status: "cited" },
          { label: "Public schools (WC)", value: "~1,500", status: "verify" },
        ],
        landmarks: ["Table Mountain", "Robben Island", "Castle of Good Hope", "District Six", "Bo-Kaap", "V&A Waterfront"],
        sources: "StatsSA Census 2022 · City of Cape Town · standard histories. Figures marked ‘to verify’ await a citation.",
      },
      {
        id: "stellenbosch",
        name: "Stellenbosch",
        provinceId: "western-cape",
        founded: "1679",
        subtitle: "The wine-lands town",
        hero: WC,
        origins:
          "Founded in 1679 by governor Simon van der Stel, Stellenbosch is the second-oldest colonial town in South Africa — today known for its wine-lands and a major university.",
        leaders: [{ when: "1679", name: "Simon van der Stel", role: "VOC governor · named the town" }],
        stats: [
          { label: "Founded", value: "1679", status: "cited" },
          { label: "University", value: "Stellenbosch", status: "cited" },
        ],
        landmarks: ["Dorp Street", "the wine estates", "Jonkershoek"],
        sources: "Standard histories. Detail to be expanded + Setswana review.",
      },
    ],
  },
  {
    id: "gauteng",
    name: "Gauteng",
    capital: "Johannesburg",
    formed: "1994",
    populationStat: { label: "People (Census 2022)", value: "~15.1M", status: "verify" },
    languages: "isiZulu · Sesotho · English · Afrikaans",
    overview:
      "Gauteng — 'place of gold' in Sesotho — was carved from the old Transvaal in 1994. It is South Africa's smallest but most populous province, built around the gold reef and the freedom struggle.",
    hero: GP,
    cities: [
      {
        id: "johannesburg",
        name: "Johannesburg",
        provinceId: "gauteng",
        founded: "1886",
        subtitle: "eGoli — the City of Gold",
        hero: GP,
        beforeTheCity:
          "Sotho-Tswana communities lived on the Highveld long before the gold rush. [to verify — specifics]",
        origins:
          "Johannesburg was founded in 1886 after gold was found on the Witwatersrand (the prospector George Harrison is credited with the find). The city grew explosively around the reef, drawing people from across the region and the world — and became a crucible of the labour and freedom struggles.",
        leaders: [
          { when: "Before 1886", name: "Sotho-Tswana communities", role: "Highveld inhabitants", era: "past" },
          { when: "1886", name: "The gold rush", role: "The reef town is proclaimed" },
          { when: "2016 – 2019", name: "Herman Mashaba", role: "Executive Mayor (a mayoralty since marked by instability)" },
        ],
        stats: [
          { label: "Founded (gold)", value: "1886", status: "cited" },
          { label: "City population", value: "~4.8M+", status: "verify" },
          { label: "Universities", value: "Wits · UJ", status: "cited" },
          { label: "Public schools (GP)", value: "~2,000+", status: "verify" },
        ],
        landmarks: ["Constitution Hill", "Apartheid Museum", "Hector Pieterson Memorial", "Mandela House", "Gold Reef City"],
        sources: "StatsSA Census 2022 · standard histories. Mayoral record is presented factually.",
      },
      {
        id: "soweto",
        name: "Soweto",
        provinceId: "gauteng",
        founded: "1931",
        subtitle: "South Western Townships",
        hero: GP,
        origins:
          "Orlando township was established in 1931; the name 'South Western Townships' was shortened to SOWETO in 1963. On 16 June 1976 the Soweto Uprising became a turning point in the struggle. Vilakazi Street is the only street to have housed two Nobel laureates — Nelson Mandela and Desmond Tutu.",
        leaders: [{ when: "16 June 1976", name: "The Soweto Uprising", role: "Students rise against Bantu Education", era: "past" }],
        stats: [
          { label: "Established", value: "1931", status: "cited" },
          { label: "Uprising", value: "1976", status: "cited" },
        ],
        landmarks: ["Vilakazi Street", "Hector Pieterson Memorial", "Mandela House", "Regina Mundi Church"],
        sources: "Standard histories · the Hector Pieterson Museum.",
      },
    ],
  },
  {
    id: "northern-cape",
    name: "Northern Cape",
    capital: "Kimberley",
    formed: "1994",
    populationStat: { label: "People (Census 2022)", value: "~1.36M", status: "verify" },
    languages: "Afrikaans · Setswana · isiXhosa",
    overview:
      "The largest province by land yet smallest by population — the Kalahari, the Karoo, and the diamond fields. Its story runs from the Khoisan and Griqua to the diamond rush and Sol Plaatje.",
    hero: NC,
    cities: [
      {
        id: "kimberley",
        name: "Kimberley",
        provinceId: "northern-cape",
        founded: "1871",
        subtitle: "The diamond city · home of Sol Plaatje",
        hero: NC,
        beforeTheCity:
          "The region was home to the Griqua (under Nicolaas Waterboer), San, and Tswana peoples before the diamond rush.",
        origins:
          "Kimberley grew from the 1871 diamond rush — the 'New Rush' at Colesberg Kopje became the Big Hole. It was named in 1873 after the Earl of Kimberley, the British Colonial Secretary. It is deeply tied to Sol T. Plaatje — author of Mhudi — who lived and worked here as a newspaper editor and first Secretary-General of the SANNC (forerunner of the ANC). He died here in 1932; the municipality bears his name.",
        leaders: [
          { when: "Pre-1871", name: "Griqua, San & Tswana", role: "Peoples of the region (Waterboer)", era: "past" },
          { when: "1871 – 1873", name: "The diamond rush", role: "New Rush → Kimberley" },
          { when: "Today", name: "Sol Plaatje Local Municipality", role: "Named for the Mhudi author", era: "now" },
        ],
        stats: [
          { label: "Founded (diamonds)", value: "1871", status: "cited" },
          { label: "University", value: "Sol Plaatje (2014)", status: "cited" },
          { label: "Municipality pop.", value: "~250k", status: "verify" },
          { label: "Public schools (NC)", value: "~570", status: "verify" },
        ],
        landmarks: ["The Big Hole", "Sol Plaatje House", "McGregor Museum", "William Humphreys Art Gallery"],
        sources: "StatsSA Census 2022 · Sol Plaatje University · standard biography. Links to the Mhudi module.",
      },
    ],
  },
];

export const provinceById = (id: string) => provinces.find((p) => p.id === id);
export const cityById = (id: string) => provinces.flatMap((p) => p.cities).find((c) => c.id === id);
