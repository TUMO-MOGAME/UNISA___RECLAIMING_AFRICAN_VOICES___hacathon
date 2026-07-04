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

const WC = require("../../assets/places/western-cape.webp");
const GP = require("../../assets/places/gauteng.webp");
const NC = require("../../assets/places/northern-cape.webp");
const EC = require("../../assets/places/eastern-cape.webp");
const KZN = require("../../assets/places/kwazulu-natal.webp");
const FS = require("../../assets/places/free-state.webp");
const LP = require("../../assets/places/limpopo.webp");
const MP = require("../../assets/places/mpumalanga.webp");
const NW = require("../../assets/places/north-west.webp");

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
  {
    id: "eastern-cape",
    name: "Eastern Cape",
    capital: "Bhisho",
    formed: "1994",
    populationStat: { label: "People (Census 2022)", value: "~7.2M", status: "verify" },
    languages: "isiXhosa · Afrikaans · English",
    overview:
      "Formed in 1994 from the old Cape Province and the Ciskei and Transkei 'homelands', the Eastern Cape is the Xhosa heartland and the frontier where the Cape Colony met the amaXhosa in a century of wars. It gave the liberation struggle Nelson Mandela, Oliver Tambo, Steve Biko, Walter Sisulu and Robert Sobukwe.",
    hero: EC,
    cities: [
      {
        id: "gqeberha",
        name: "Gqeberha",
        provinceId: "eastern-cape",
        founded: "1820",
        subtitle: "Port Elizabeth · the friendly city",
        hero: EC,
        beforeTheCity:
          "The shores of Algoa Bay were long the country of Khoikhoi herders and, inland, the amaXhosa. The Gqunukhwebe and other groups lived and traded here before the port.",
        origins:
          "A British settlement grew from 1820, when some 4,000 British settlers were landed at Algoa Bay to secure the eastern frontier. The acting governor Sir Rufane Donkin named the town Port Elizabeth after his late wife. In 2021 it was officially renamed Gqeberha, and it anchors the Nelson Mandela Bay metro.",
        leaders: [
          { when: "Before 1820", name: "Khoikhoi & amaXhosa", role: "Peoples of Algoa Bay and the frontier", era: "past" },
          { when: "1820", name: "The 1820 Settlers", role: "British settlement founded at Algoa Bay" },
          { when: "1820", name: "Sir Rufane Donkin", role: "Acting Cape governor · named the town for his wife Elizabeth", era: "past" },
        ],
        stats: [
          { label: "Founded (settlers)", value: "1820", status: "cited" },
          { label: "Renamed Gqeberha", value: "2021", status: "cited" },
          { label: "Metro (NMB) pop.", value: "~1.2M", status: "verify" },
          { label: "University", value: "Nelson Mandela University", status: "cited" },
        ],
        landmarks: ["Donkin Reserve & lighthouse", "Route 67", "Algoa Bay", "St George's Park", "the boardwalk"],
        sources: "StatsSA Census 2022 · standard histories of the 1820 Settlers · SA Geographical Names Council (2021 renaming).",
      },
      {
        id: "mthatha",
        name: "Mthatha",
        provinceId: "eastern-cape",
        founded: "1882",
        subtitle: "Heart of the former Transkei · Mandela country",
        hero: EC,
        beforeTheCity:
          "The Mthatha River valley is the land of the abaThembu, the Xhosa-speaking people into whose royal house Nelson Mandela was born.",
        origins:
          "Founded as Umtata in 1882 on the Mthatha River, the town became the capital of the Transkei — first a territory and, from 1976, a nominally 'independent' apartheid homeland. It sits close to Mvezo, where Nelson Mandela was born in 1918, and Qunu, where he grew up and is buried. The Nelson Mandela Museum stands here.",
        leaders: [
          { when: "Long-standing", name: "The abaThembu", role: "Xhosa-speaking people of the Mthatha valley", era: "past" },
          { when: "1976 – 1994", name: "Transkei homeland", role: "Apartheid 'independent' homeland (capital)", era: "past" },
        ],
        stats: [
          { label: "Founded", value: "1882", status: "cited" },
          { label: "Mandela born (Mvezo)", value: "1918", status: "cited" },
          { label: "Nelson Mandela Museum", value: "Mthatha & Qunu", status: "cited" },
        ],
        landmarks: ["Nelson Mandela Museum", "Qunu", "Mvezo", "Bumbane Great Place"],
        sources: "Standard biography of Nelson Mandela · Nelson Mandela Museum · standard histories of the Transkei. Links to the liberation story.",
      },
      {
        id: "makhanda",
        name: "Makhanda",
        provinceId: "eastern-cape",
        founded: "1812",
        subtitle: "Grahamstown · the frontier & festival city",
        hero: EC,
        beforeTheCity:
          "This was contested frontier country between the Cape Colony and the amaXhosa. The city's later name honours Makhanda (Nxele), the Xhosa warrior-prophet who led the 1819 attack on the garrison.",
        origins:
          "Established in 1812 by Lieutenant-Colonel John Graham as a military headquarters on the eastern frontier, Grahamstown became a settler town and later a centre of education and law — home to Rhodes University and the National Arts Festival. In 2018 it was renamed Makhanda.",
        leaders: [
          { when: "1812", name: "John Graham", role: "Founded the frontier garrison (Grahamstown)", era: "past" },
          { when: "1819", name: "Makhanda (Nxele)", role: "Xhosa prophet-leader; led the assault on the garrison", era: "past" },
        ],
        stats: [
          { label: "Founded (garrison)", value: "1812", status: "cited" },
          { label: "Renamed Makhanda", value: "2018", status: "cited" },
          { label: "University", value: "Rhodes University", status: "cited" },
          { label: "National Arts Festival", value: "annual", status: "cited" },
        ],
        landmarks: ["Rhodes University", "Cathedral of St Michael & St George", "the 1820 Settlers Monument", "Egazini"],
        sources: "Standard frontier histories · Rhodes University · SA Geographical Names Council (2018 renaming).",
      },
    ],
  },
  {
    id: "kwazulu-natal",
    name: "KwaZulu-Natal",
    capital: "Pietermaritzburg",
    formed: "1994",
    populationStat: { label: "People (Census 2022)", value: "~12.4M", status: "verify" },
    languages: "isiZulu · English · Afrikaans",
    overview:
      "KwaZulu-Natal joins the old British colony of Natal with KwaZulu, the Zulu heartland. It is the land of the Zulu kingdom forged by King Shaka, of the 1879 Anglo-Zulu War, and of a large community descended from indentured Indian labourers — among them a young lawyer, M.K. Gandhi.",
    hero: KZN,
    cities: [
      {
        id: "durban",
        name: "Durban",
        provinceId: "kwazulu-natal",
        founded: "1824",
        subtitle: "eThekwini — the bay",
        hero: KZN,
        beforeTheCity:
          "The bay the Zulu call eThekwini was Nguni country long before the traders. It lay within the reach of the Zulu kingdom rising under Shaka in the early 19th century.",
        origins:
          "British traders settled at Port Natal in 1824; the town was named D'Urban in 1835 after the Cape governor Sir Benjamin D'Urban. From 1860 ships brought indentured Indian labourers to the Natal sugar estates, giving Durban one of the largest Indian-descended populations outside India. M.K. Gandhi lived and practised in Natal from 1893, developing satyagraha before returning to India.",
        leaders: [
          { when: "Early 1800s", name: "The Zulu kingdom", role: "Nguni power of the region under Shaka", era: "past" },
          { when: "1824", name: "British traders (Port Natal)", role: "Trading settlement founded on the bay" },
          { when: "1893 – 1914", name: "M.K. Gandhi", role: "Lawyer & activist in Natal; developed satyagraha", era: "past" },
        ],
        stats: [
          { label: "Settled (Port Natal)", value: "1824", status: "cited" },
          { label: "Metro (eThekwini) pop.", value: "~4.2M", status: "verify" },
          { label: "Universities", value: "UKZN · DUT", status: "cited" },
          { label: "Busiest port in Africa", value: "Durban harbour", status: "verify" },
        ],
        landmarks: ["The Golden Mile", "uShaka Marine World", "Moses Mabhida Stadium", "Phoenix Settlement (Gandhi)", "Victoria Street Market"],
        sources: "StatsSA Census 2022 · standard histories of Natal & Indian indenture · Gandhi biography.",
      },
      {
        id: "pietermaritzburg",
        name: "Pietermaritzburg",
        provinceId: "kwazulu-natal",
        founded: "1838",
        subtitle: "The capital · 'the last outpost'",
        hero: KZN,
        origins:
          "Founded in 1838 by Voortrekkers after the Battle of Blood River, and named for their leaders Piet Retief and Gerrit Maritz. It became the capital of the Colony of Natal and remains the provincial capital. In 1893 Gandhi was thrown off a first-class train at Pietermaritzburg station for being Indian — an event he later described as the turning point that set him on the path of resistance.",
        leaders: [
          { when: "1838", name: "Voortrekkers (Retief & Maritz)", role: "Founded and named the town", era: "past" },
          { when: "1893", name: "M.K. Gandhi", role: "Ejected from the train here — a turning point", era: "past" },
        ],
        stats: [
          { label: "Founded", value: "1838", status: "cited" },
          { label: "Provincial capital", value: "KwaZulu-Natal", status: "cited" },
          { label: "Gandhi's train", value: "1893", status: "cited" },
        ],
        landmarks: ["City Hall (red-brick)", "the Gandhi statue & station", "Tatham Art Gallery", "the Msunduzi River"],
        sources: "Standard histories of Natal · Gandhi biography.",
      },
      {
        id: "ulundi",
        name: "Ulundi",
        provinceId: "kwazulu-natal",
        founded: "1873",
        subtitle: "oNdini — capital of the Zulu kingdom",
        hero: KZN,
        beforeTheCity:
          "Ulundi is not a colonial town but a royal capital of the Zulu nation, in the Emakhosini valley — 'the valley of the kings' where the early Zulu kings are buried.",
        origins:
          "King Cetshwayo established his capital oNdini ('Ulundi') around 1873. It was here, on 4 July 1879, that the British destroyed the Zulu army at the Battle of Ulundi, ending the Anglo-Zulu War and the kingdom's independence. The site and the royal graves of the Emakhosini remain central to Zulu heritage.",
        leaders: [
          { when: "c. 1873 – 1879", name: "King Cetshwayo kaMpande", role: "Zulu king; built the capital oNdini", era: "past" },
          { when: "4 July 1879", name: "Battle of Ulundi", role: "British defeat of the Zulu army", era: "past" },
        ],
        stats: [
          { label: "Royal capital", value: "c. 1873", status: "cited" },
          { label: "Battle of Ulundi", value: "1879", status: "cited" },
        ],
        landmarks: ["oNdini royal homestead (reconstructed)", "Emakhosini — the valley of the kings", "the Ulundi battlefield"],
        sources: "Standard histories of the Zulu kingdom & the Anglo-Zulu War · Amafa/KZN heritage.",
      },
    ],
  },
  {
    id: "free-state",
    name: "Free State",
    capital: "Bloemfontein",
    formed: "1994",
    populationStat: { label: "People (Census 2022)", value: "~2.9M", status: "verify" },
    languages: "Sesotho · Afrikaans · isiXhosa",
    overview:
      "The central plains between the Vaal and the Orange were Sotho-Tswana and, later, Voortrekker country — the Orange Free State Boer republic. It is where the ANC was founded in 1912, and where the gold of the northern goldfields built new towns from nothing.",
    hero: FS,
    cities: [
      {
        id: "bloemfontein",
        name: "Bloemfontein",
        provinceId: "free-state",
        founded: "1846",
        subtitle: "Mangaung · the judicial capital",
        hero: FS,
        beforeTheCity:
          "The highveld around Mangaung ('place of cheetahs' in Sesotho) was long home to Sotho-Tswana communities before the Boer republic.",
        origins:
          "Bloemfontein grew from a British fort established in 1846 and became the capital of the Orange Free State republic. Today it is one of South Africa's three national capitals — the judicial capital, seat of the Supreme Court of Appeal. It holds a founding place in the freedom struggle: the South African Native National Congress (later the ANC) was founded here on 8 January 1912.",
        leaders: [
          { when: "Before 1846", name: "Sotho-Tswana of Mangaung", role: "Communities of the central highveld", era: "past" },
          { when: "1854 – 1902", name: "Orange Free State republic", role: "Boer republic (capital)", era: "past" },
          { when: "8 Jan 1912", name: "Founding of the SANNC / ANC", role: "The liberation movement is born here", era: "past" },
        ],
        stats: [
          { label: "Founded (fort)", value: "1846", status: "cited" },
          { label: "ANC founded", value: "1912", status: "cited" },
          { label: "National role", value: "Judicial capital", status: "cited" },
          { label: "University", value: "University of the Free State", status: "cited" },
        ],
        landmarks: ["Naval Hill & Nelson Mandela statue", "the National Women's Memorial", "Waaihoek (ANC founding site)", "Oliewenhuis Art Museum"],
        sources: "StatsSA Census 2022 · standard histories of the OFS · ANC founding record (1912).",
      },
      {
        id: "welkom",
        name: "Welkom",
        provinceId: "free-state",
        founded: "1948",
        subtitle: "The city gold built",
        hero: FS,
        origins:
          "Welkom was laid out in 1948 as a planned town for the new Free State goldfields, developed by Anglo American on the farm Welkom. Unusually, it was designed from the start with traffic circles and green belts rather than traffic lights — a mid-century mining boom-town made deliberately.",
        leaders: [
          { when: "1948", name: "Free State goldfields", role: "Planned mining town established", era: "past" },
        ],
        stats: [
          { label: "Founded (planned)", value: "1948", status: "cited" },
          { label: "Built for", value: "the Free State gold rush", status: "cited" },
        ],
        landmarks: ["the goldfields headgears", "the traffic-circle street plan", "Oppenheimer Park"],
        sources: "Standard histories of the Free State goldfields.",
      },
    ],
  },
  {
    id: "limpopo",
    name: "Limpopo",
    capital: "Polokwane",
    formed: "1994",
    populationStat: { label: "People (Census 2022)", value: "~6.6M", status: "verify" },
    languages: "Sepedi · Xitsonga · Tshivenḓa",
    overview:
      "South Africa's northernmost province, named for the Limpopo River, is the land of the Bapedi, the Vhavenḓa and the Vatsonga. It holds Mapungubwe — a 13th-century kingdom and the country's earliest known state, whose golden rhino rewrote the story of pre-colonial southern Africa.",
    hero: LP,
    cities: [
      {
        id: "polokwane",
        name: "Polokwane",
        provinceId: "limpopo",
        founded: "1886",
        subtitle: "Pietersburg · 'place of safety'",
        hero: LP,
        beforeTheCity:
          "The plateau was long settled by Northern Sotho (Bapedi) communities before the republic laid out a town here.",
        origins:
          "The town was established in 1886 by the South African Republic (ZAR) as Pietersburg. Renamed Polokwane — 'place of safety' in Sepedi — it is the capital and commercial hub of Limpopo, a gateway between Gauteng and the Zimbabwe border.",
        leaders: [
          { when: "Before 1886", name: "Bapedi communities", role: "Northern Sotho people of the plateau", era: "past" },
          { when: "1886", name: "South African Republic (ZAR)", role: "Laid out the town (Pietersburg)", era: "past" },
        ],
        stats: [
          { label: "Founded", value: "1886", status: "cited" },
          { label: "Provincial capital", value: "Limpopo", status: "cited" },
          { label: "University", value: "University of Limpopo", status: "verify" },
        ],
        landmarks: ["the Bakone Malapa open-air museum", "Polokwane Game Reserve", "the Irish House"],
        sources: "StatsSA Census 2022 · standard histories. [VERIFY exact institutional details]",
      },
      {
        id: "thohoyandou",
        name: "Thohoyandou",
        provinceId: "limpopo",
        founded: "1979",
        subtitle: "Heart of Venḓa · 'head of the elephant'",
        hero: LP,
        beforeTheCity:
          "This is the heartland of the Vhavenḓa, a people with a distinct language and a deep tradition of sacred sites — among them Lake Fundudzi and the Thathe Vondo forest.",
        origins:
          "Thohoyandou — 'head of the elephant', named for an 18th-century Venḓa ruler — was built as the capital of Venḓa, a nominally 'independent' apartheid homeland created in 1979. It remains the cultural and administrative centre of the Vhavenḓa, near the ancient stone-walled site of Dzata and the hilltop kingdom of Thulamela.",
        leaders: [
          { when: "Long-standing", name: "The Vhavenḓa", role: "People of the far north; distinct language & customs", era: "past" },
          { when: "1979 – 1994", name: "Venḓa homeland", role: "Apartheid 'independent' homeland (capital)", era: "past" },
        ],
        stats: [
          { label: "Built (homeland capital)", value: "1979", status: "cited" },
          { label: "Sacred sites", value: "Lake Fundudzi · Dzata", status: "cited" },
          { label: "University", value: "University of Venda", status: "cited" },
        ],
        landmarks: ["Lake Fundudzi (sacred)", "Dzata ruins", "Thathe Vondo forest", "Thulamela"],
        sources: "Standard histories of the Vhavenḓa · Indigenous Knowledge Systems research (Fundudzi, Machovhela) from the project's history sources.",
      },
    ],
  },
  {
    id: "mpumalanga",
    name: "Mpumalanga",
    capital: "Mbombela",
    formed: "1994",
    populationStat: { label: "People (Census 2022)", value: "~5.1M", status: "verify" },
    languages: "siSwati · isiZulu · Xitsonga",
    overview:
      "Mpumalanga — 'the place where the sun rises' — drops from the Highveld down the Great Escarpment to the Lowveld. It holds much of the Kruger National Park, the Barberton greenstone belt of some of the oldest rocks on Earth, and the heritage of the Swazi, Ndebele and Tsonga peoples.",
    hero: MP,
    cities: [
      {
        id: "mbombela",
        name: "Mbombela",
        provinceId: "mpumalanga",
        founded: "1895",
        subtitle: "Nelspruit · gateway to the Kruger",
        hero: MP,
        origins:
          "The town grew from the mid-1890s around the railway the ZAR built from Pretoria to the sea at Delagoa Bay (Maputo). Long known as Nelspruit and now Mbombela, it is the provincial capital and the main gateway to the southern Kruger National Park.",
        leaders: [
          { when: "1890s", name: "The Delagoa Bay railway", role: "Railway town founded (Nelspruit)", era: "past" },
        ],
        stats: [
          { label: "Founded (railway)", value: "1890s", status: "verify" },
          { label: "Provincial capital", value: "Mpumalanga", status: "cited" },
          { label: "Gateway to", value: "Kruger National Park", status: "cited" },
        ],
        landmarks: ["Lowveld National Botanical Garden", "the Kruger's southern gates", "Mbombela Stadium"],
        sources: "Standard histories of the Eastern Transvaal railway. [VERIFY exact founding year]",
      },
      {
        id: "barberton",
        name: "Barberton",
        provinceId: "mpumalanga",
        founded: "1884",
        subtitle: "Gold rush · Earth's oldest rocks",
        hero: MP,
        origins:
          "Barberton sprang up in 1884 during a gold rush in the De Kaap valley — one of the first in South Africa, before the Witwatersrand. It sits against the Makhonjwa Mountains (Barberton Greenstone Belt), which hold some of the oldest and best-preserved rocks on the planet, around 3.2–3.6 billion years old — a UNESCO World Heritage Site.",
        leaders: [
          { when: "1884", name: "The De Kaap gold rush", role: "Boom town founded before the Witwatersrand", era: "past" },
        ],
        stats: [
          { label: "Founded (gold)", value: "1884", status: "cited" },
          { label: "Makhonjwa rocks", value: "~3.2–3.6 billion yrs", status: "cited" },
          { label: "World Heritage", value: "Barberton Makhonjwa", status: "cited" },
        ],
        landmarks: ["the Makhonjwa Mountains (UNESCO)", "the historic gold-rush streets", "Eureka City ruins"],
        sources: "UNESCO World Heritage listing (Barberton Makhonjwa) · standard gold-rush histories.",
      },
    ],
  },
  {
    id: "north-west",
    name: "North West",
    capital: "Mahikeng",
    formed: "1994",
    populationStat: { label: "People (Census 2022)", value: "~3.8M", status: "verify" },
    languages: "Setswana · Afrikaans · isiXhosa",
    overview:
      "The North West is the Setswana heartland — the country of the Barolong, Bahurutshe, Bakwena and other Tswana chiefdoms whose decentralised agro-towns and Kgotla governance shaped the highveld. It holds the world's richest platinum reserves, and its Barolong history runs straight into Sol Plaatje's Mhudi.",
    hero: NW,
    cities: [
      {
        id: "mahikeng",
        name: "Mahikeng",
        provinceId: "north-west",
        founded: "1852",
        subtitle: "Mafikeng · Barolong capital",
        hero: NW,
        beforeTheCity:
          "Mahikeng — 'place of stones' — was the great town of the Barolong boo Ratshidi under Kgosi Montshiwa, one of the senior Tswana lineages. This is the very people and country of Sol Plaatje's Mhudi.",
        origins:
          "The Barolong settled Mahikeng around 1852. The adjacent colonial town of Mafeking became famous for the 217-day Siege of Mafeking (1899–1900) in the South African War — during which Sol Plaatje, then a court interpreter, kept a now-celebrated diary. Later the capital of the Bophuthatswana homeland, it is today the capital of the North West province.",
        leaders: [
          { when: "c. 1852", name: "Kgosi Montshiwa", role: "Barolong boo Ratshidi kgosi; founded the town", era: "past" },
          { when: "1899 – 1900", name: "The Siege of Mafeking", role: "217-day siege; Sol Plaatje kept his diary here", era: "past" },
          { when: "1977 – 1994", name: "Bophuthatswana homeland", role: "Apartheid 'independent' homeland (capital)", era: "past" },
        ],
        stats: [
          { label: "Barolong town", value: "c. 1852", status: "cited" },
          { label: "Siege of Mafeking", value: "1899–1900", status: "cited" },
          { label: "University", value: "North-West University", status: "cited" },
        ],
        landmarks: ["Mmabatho", "the Mafikeng Museum", "Cookes Lake", "the Barolong royal kraal"],
        sources: "Standard histories of the Barolong & the Siege of Mafeking · Sol Plaatje's Mafeking Diary. Links directly to the Mhudi module.",
      },
      {
        id: "rustenburg",
        name: "Rustenburg",
        provinceId: "north-west",
        founded: "1851",
        subtitle: "The platinum city",
        hero: NW,
        origins:
          "Founded by Voortrekkers in 1851 at the foot of the Magaliesberg, Rustenburg ('resting town') lies on the Bushveld Igneous Complex — the source of the world's largest platinum-group-metal reserves. Paul Kruger, president of the ZAR, farmed nearby at Boekenhoutfontein. The Pilanesberg and Sun City are close by.",
        leaders: [
          { when: "1851", name: "Voortrekkers", role: "Founded the town below the Magaliesberg", era: "past" },
        ],
        stats: [
          { label: "Founded", value: "1851", status: "cited" },
          { label: "Platinum reserves", value: "world's largest (region)", status: "verify" },
          { label: "Nearby", value: "Pilanesberg · Sun City", status: "cited" },
        ],
        landmarks: ["the Magaliesberg", "Kruger's farm (Boekenhoutfontein)", "Pilanesberg National Park", "Sun City"],
        sources: "Standard histories · geology of the Bushveld Complex. [VERIFY reserve phrasing]",
      },
    ],
  },
];

export const provinceById = (id: string) => provinces.find((p) => p.id === id);
export const cityById = (id: string) => provinces.flatMap((p) => p.cities).find((c) => c.id === id);
