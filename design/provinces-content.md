# Provinces → Cities → City History — content structure & grounded draft

> **Design-lab scaffold.** Source of truth for the Provinces feature. Every fact must trace to a real
> source or be flagged. Markers: **[VERIFY]** = plausible, confirm the exact figure before ship ·
> **[NEEDS SOURCE]** = do not state until sourced · **[REVIEW: Setswana]** = Emma to check the tn.
> Grounding rule = truth only, no invented heritage (`.claude/skills/humanities-grounding`).

## Data model

```ts
type Province = {
  id: string;
  name: string;             // "Western Cape"
  capital: string;
  formed: string;           // "1994" (all 9 provinces) + pre-1994 note
  population: Stat;          // StatsSA Census 2022
  topLanguages: string[];
  overview: LocalizedText;   // grounded, acknowledges pre-1994 history
  heroImage: string;        // credited photo
  cities: City[];
};

type City = {
  id: string;
  name: string;
  province: string;
  founded: { year: number; note: string };     // "how it came to existence"
  nameOrigin?: string;                          // etymology
  beforeTheCity: LocalizedText;                 // who lived here first (indigenous) — REQUIRED
  origins: LocalizedText;                        // founding narrative
  leaders: Leader[];                            // "people in charge, from when till when"
  stats: Stat[];                                // founded, population, schools, universities…
  landmarks: string[];
  relatedModules?: string[];                    // link to the Four Pillars / Cultural Atlas
  heroImage: string;                            // credited photo
  sources: string[];
};

type Leader = { title: string; name: string; from: string; till: string; note?: string };
type Stat   = { label: string; value: string; source: string; status: "cited" | "verify" };
```

**Stats policy (per your call): province-level, cited.** School/hospital counts are reported by the
Dept. of Basic Education and provincial departments per **province/district**, not per city — so we
show e.g. *"~1,500 public schools (Western Cape, WCED)"* and label it as province-level. City-only
figures that can't be cleanly cited are dropped, not guessed.

---

## 1 · Western Cape

- **Capital:** Cape Town · **Formed:** 1994 · **Population:** ~7.43M (Census 2022) [VERIFY]
- **Top languages:** Afrikaans · isiXhosa · English
- **Public schools:** ~1,500 (Western Cape Education Dept) [VERIFY exact]
- **Overview:** The provinces were drawn in 1994, but the Western Cape's story runs from the Khoikhoi
  and San, through the 1652 Dutch station at the Cape, the wine-lands and the Overberg, to today.

### City — Cape Town
- **Founded:** 1652 — Dutch East India Company (VOC) refreshment station under Jan van Riebeeck; the
  first colonial town in southern Africa.
- **Name origin:** iKapa / eKapa; "the Mother City".
- **Before the city:** Home to Khoikhoi herders (Goringhaiqua, Gorachouqua) and San hunter-gatherers;
  Autshumato was an early leader/interpreter with passing ships.
- **Leaders (illustrative — confirm full civic list):**
  - Khoikhoi & San peoples — until the 1650s (indigenous inhabitants)
  - Jan van Riebeeck — 1652–1662 (VOC Commander)
  - VOC & British colonial governors — 1662–1910 [NEEDS SOURCE for the roster]
  - Patricia de Lille — 2011–2018 (Executive Mayor) [VERIFY dates]
  - Dan Plato — 2018–2021 (Executive Mayor) [VERIFY dates]
  - Geordin Hill-Lewis — 2021–present (Executive Mayor) [VERIFY]
- **By the numbers:** Founded 1652 (cited) · Metro pop ~4.77M, Census 2022 (cited) [VERIFY] ·
  Universities: UCT, UWC, CPUT (cited) · Public schools ~1,500 WC province (verify) · Hospitals [NEEDS SOURCE]
- **Landmarks:** Table Mountain · Robben Island (UNESCO) · Castle of Good Hope · District Six ·
  Bo-Kaap · V&A Waterfront
- **Other cities:** Stellenbosch (founded 1679, Simon van der Stel) · George (founded 1811)

---

## 2 · Gauteng

- **Capital:** Johannesburg · **Formed:** 1994 (from the Transvaal) · **Population:** ~15.1M (Census 2022, most populous) [VERIFY]
- **Top languages:** isiZulu · Sesotho · English · Afrikaans [VERIFY ranking]
- **Public schools:** ~2,000+ (Gauteng Education Dept) [VERIFY]

### City — Johannesburg (+ Soweto)
- **Founded:** 1886 — after gold was found on the Witwatersrand (prospector George Harrison credited);
  the city grew explosively around the reef. "eGoli" — place of gold.
- **Before the city:** Sotho-Tswana communities lived on the Highveld before the gold rush. [NEEDS SOURCE for specifics]
- **Soweto:** Orlando township established 1931; the name "South Western Townships" → SOWETO (1963).
  The **16 June 1976 Soweto Uprising** was a turning point; Vilakazi Street is the only street to have
  housed two Nobel laureates — Nelson Mandela and Desmond Tutu.
- **Leaders:** Johannesburg's mayoralty has been notably unstable since 2016; e.g. Herman Mashaba
  2016–2019. [VERIFY — present the record honestly, incl. the instability]
- **By the numbers:** Founded 1886 (cited) · City pop ~4.8M+ Census 2022 (cited) [VERIFY] ·
  Universities: Wits, University of Johannesburg (cited) · Schools ~2,000+ Gauteng (verify)
- **Landmarks:** Constitution Hill · Apartheid Museum · Hector Pieterson Memorial · Mandela House
  (Vilakazi St) · Gold Reef City
- **Other cities:** Pretoria / Tshwane (founded 1855, Marthinus Pretorius) · Soweto

---

## 3 · Northern Cape

- **Capital:** Kimberley · **Formed:** 1994 · **Population:** ~1.36M (Census 2022, least populous) [VERIFY]
- **Top languages:** Afrikaans · Setswana · isiXhosa [VERIFY ranking]
- **Public schools:** ~570 (Northern Cape Education Dept) [VERIFY]

### City — Kimberley  ★ ties to the literature (Sol Plaatje → *Mhudi*)
- **Founded:** ~1871 — diamond rush; the "New Rush" at Colesberg Kopje became the **Big Hole**. Named
  in 1873 after John Wodehouse, 1st Earl of Kimberley (British Colonial Secretary).
- **Before the city:** Griqua (under Nicolaas Waterboer), San, and Tswana peoples of the region.
- **Sol Plaatje connection:** **Sol T. Plaatje** — author of *Mhudi* (the app's first pillar) — lived
  and worked in Kimberley: newspaper editor (*Koranta ea Becoana*, *Tsala ea Batho*), first
  Secretary-General of the SANNC (1912, forerunner of the ANC). He died in Kimberley in 1932; his house
  is a museum, and the municipality is named **Sol Plaatje Local Municipality**. → deep-link to the
  *Mhudi* module.
- **Leaders:** Griqua leadership (Waterboer) → colonial diamond-fields administration → modern Sol
  Plaatje Local Municipality. [VERIFY roster + dates]
- **By the numbers:** Founded ~1871 (cited) · Municipality pop ~250k (verify) · University: **Sol
  Plaatje University** (founded 2014, cited) · Schools ~570 NC province (verify)
- **Landmarks:** The Big Hole & Kimberley Mine Museum · Sol Plaatje House · McGregor Museum ·
  William Humphreys Art Gallery
- **Other cities:** Upington

---

## Cross-links (cohesion with the existing app)
- **Kimberley ↔ *Mhudi* / Sol Plaatje** · **Mahikeng ↔ the Barolong / *Mhudi*** · **Soweto ↔ 1976 /
  Cultural Atlas "Unsung Heroes"** · every city → **Community Archive** ("record your city's story").

## Photo credits (to place on the About the Sources screen)
Uploaded photos are Unsplash / Pexels. Credit each photographer (names are in the filenames, e.g.
Tobias Reich, Anika de Klerk, Sizwe Shabalala, Jann Bader, Khulani, Taryn Elliott, Magda Ehlers…).

## Open items before ship
1. Confirm all **[VERIFY]** figures against StatsSA Census 2022 + provincial education depts.
2. Fill **[NEEDS SOURCE]** rosters or omit them.
3. Setswana translations for all copy — **[REVIEW: Setswana]** (Emma).
4. Curate 1 credited hero photo per province + per city.
