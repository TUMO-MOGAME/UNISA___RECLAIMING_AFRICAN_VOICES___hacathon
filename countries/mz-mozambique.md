# Mozambique

**ISO code:** `mz` · **Region:** Eastern Africa (UN M49 — **but a SADC member**; see [README.md](README.md))
**Researched by:** Tumo Olorato Mogame, with Claude · **Last updated:** 2026-08-30
**Status:** core research — languages, anthem, milestones, peoples and literature sourced · heritage empty

> **How this file is put together.** Built **claim by claim**: every row names the source it came
> from, and the numbered list at the bottom is what those names point at. Sources are
> encyclopaedia-grade — rough sources are fine at this stage ([README.md](README.md)), assertions made
> to a reader are not.

**What the app already has for Mozambique:**

| | |
|---|---|
| Flag | ✅ `app/assets/flags/mz.png` |
| Country entry | ✅ listed in [`anthems.ts`](../app/src/content/anthems.ts) as `mz` |
| National anthem recording | ❌ none yet — **and anything recorded before 2002 is the wrong anthem**; see below |
| Language map (drives the language picker) | ❌ not mapped — **and one of its languages the app already speaks**; see below |

---

## Languages

| Language | Status | Also spoken in SA? | Source |
|---|---|---|---|
| **Portuguese** | **Official** — "spoken in urban areas as a first or second language by most, and generally as a lingua franca between younger Mozambicans with access to formal education" | No | [1] |
| **Tsonga** | Indigenous | 🔴 **YES — this is Xitsonga, `ts`, one of the app's eleven** | [1] |
| **Makhuwa** | Indigenous — the largest | No | [1] |
| **Sena** | Indigenous | No | [1] |
| **Lomwe** | Indigenous | No | [1] |
| **Swahili** | Spoken in the north | No | [1] |

**Official-language instrument:** `[NEEDS SOURCE]`.

**Languages Ubuntu Heritage does not have:** Portuguese, Makhuwa, Sena, Lomwe, Swahili.

🔴 **Mozambique is the first country outside the app's existing six where Ubuntu Heritage already
speaks an indigenous language of the country.** Source [1] names **Tsonga** — and **Xitsonga (`ts`) is
one of the eleven in [`languages.ts`](../app/src/i18n/languages.ts)**.

The app already knows this crossing exists: its Zimbabwe entry in
[`country-languages.ts`](../app/src/content/country-languages.ts) records that **"Zimbabwe's Shangani
corresponds to Xitsonga"**. **Mozambique is the third state in that language's range.**

⚠️ **Apply the README's first trap before wiring anything.** "Tsonga" in Mozambique, "Shangani" in
Zimbabwe and "Xitsonga" in South Africa need confirming as the same language — the app has already done
that work once for Zimbabwe, and **the citation there should be reused rather than re-derived**.

**If confirmed, `mz` becomes a genuinely honest entry**: `lead: "ts"`, with Portuguese, Makhuwa, Sena,
Lomwe and Swahili in `notYet`. **That would be the first new `country-languages.ts` entry this whole
research has produced, and the strongest candidate for LANG-03.**

⚠️ **But note the honest complication:** Makhuwa is the largest indigenous language [1], not Tsonga.
Leading with Xitsonga because it is the one the app happens to speak would repeat the Zimbabwe
technicality — so the entry must carry the same explicit comment.

---

## National anthem

- **Title (own language):** *Pátria Amada* (Portuguese)
- **Title (English):** "Lovely Fatherland"
- **Adopted:** **30 April 2002** — replacing the anthem used since independence in 1975
- **Words by:** Salomão J. Manhiça
- **Music by:** unknown [2]
- **Recording we could use:** none sourced yet
- **Source:** [2]

> **Changed to fit a new political system, not a new government** [2]: source [2] records that the
> anthem was adopted to align with Mozambique's transition to a **multi-party** system, replacing the
> one-party-era anthem of 1975.
>
> **That is precisely the change Angola has a commission still studying** — its anthem's lyrics
> reference "important dates and events for the previous sole ruling party"
> ([`ao-angola.md`](ao-angola.md)). **Mozambique made the same transition and finished the job in
> 2002.** Two Lusophone neighbours, the same problem, one solved.
>
> ⚠️ **Any pre-2002 recording of "Mozambique's anthem" is the wrong anthem.** This is the eleventh
> politically-changed national song in the folder.

---

## Milestones

| Year | Milestone | One grounded line | Source |
|---|---|---|---|
| **4th c. BC** | **Bantu-speaking peoples migrate into Mozambique** | | [1] |
| 1st–5th c. AD | Waves of migration through the Zambezi valley | | [1] |
| **9th c. onward** | **The Swahili coast** | Port towns develop along the East African coast; **Swahili culture emerges**. | [1] |
| **15th c.** | **Sofala, Angoche and Mozambique Island become regional powers** | African port cities as powers in their own right. | [1] |
| 1498 | Vasco da Gama arrives | | [1] |
| **1505** | **Portuguese colonisation begins** | | [1] |
| **1964 (25 Sep) – 1974 (8 Sep)** | **The War of Independence** | Almost exactly ten years. | [1] |
| **1975 (25 Jun)** | **Independence from Portugal** | | [1] |
| **1977–1992** | **The Civil War** | Fifteen years, beginning two years after independence. | [1] |
| 1994 | First multi-party elections | | [1] |
| 2025 (15 Jan) | Daniel Chapo sworn in as fifth president | | [1] |

**Framing notes.**

- 🔴 **The Bantu migration reaches Mozambique in the 4th century BC** [1] — earlier than Madagascar's
  c. 1000 CE crossing ([`mg-madagascar.md`](mg-madagascar.md)) and later than Gabon's 13th century BCE
  ([`ga-gabon.md`](ga-gabon.md)). **Four files in this folder now hold dated points on the same
  migration the app's Atlas already narrates for South Africa.** Somebody should draw that map;
  it is the clearest thread connecting this research to shipped content.
- 🔴 **The 15th-century Swahili port cities — Sofala, Angoche, Mozambique Island** [1] — were regional
  powers **before** Vasco da Gama. **With Kenya's 1st-century Swahili city-states
  ([`ke-kenya.md`](ke-kenya.md)) and Zheng He's 1414 visit, this folder now documents an Indian Ocean
  world in which East African cities traded with Arabia, India and China for over a millennium.**
  That is the eastern counterpart of the trans-Saharan network in the West African files, and neither
  has yet been written as one thing.
- ⚠️ **War of independence 1964–74, civil war 1977–92** [1] — twenty-five years of war in twenty-eight
  years, the same shape as Angola ([`ao-angola.md`](ao-angola.md)), the other Portuguese colony.
  **Independence was not an ending in either.**
- **Enslaved people were taken from Mozambique to Mauritius** under French rule
  ([`mu-mauritius.md`](mu-mauritius.md)), and **the Makua appear in Comoros**
  ([`km-comoros.md`](km-comoros.md)). **The Indian Ocean slave trade connects four files** and none of
  them yet documents it properly.

---

## Peoples & cultures

**2017 census** [1]: **African 99.0% · Mestiço 0.8% · White 0.1% · Other 0.1%**

- ⚠️ **This table is almost useless as demography** — "African 99%" tells a reader nothing about the
  Makhuwa, Sena, Lomwe, Tsonga and Swahili communities source [1] names elsewhere. **It records a
  colonial-era racial classification, not the country's peoples.** Use the language list above
  instead, and say why.
- **The Makua/Makhuwa are the largest group** `[NEEDS SOURCE]` — and appear in Comoros' ethnic table
  ([`km-comoros.md`](km-comoros.md)).
- **The Gaza Empire** — a 19th-century state founded by Nguni migrants during the Mfecane
  `[NEEDS SOURCE]` — **is absent from source [1] and was searched for.** If it holds, it is the second
  Mfecane connection in the Eastern African files after Malawi's Ngoni
  ([`mw-malawi.md`](mw-malawi.md)), **and it is directly continuous with the events *Mhudi* narrates.**
  **A priority gap.**

---

## Literature & voices

| Writer | Work | Year | Language | Source |
|---|---|---|---|---|
| **Mia Couto** (b. 1955) | ***Terra Sonâmbula*** (*Sleepwalking Land*) | **1992** | Portuguese | [4] |
| Mia Couto | **XXV Camões Prize** — the most prestigious award in Portuguese-language literature | **2013** | — | [4] |
| **José Craveirinha** (1922–2003) | poetry — **"combining Portuguese structures with African rhythms and themes"** | — | Portuguese | [4] |
| **Paulina Chiziane** (b. 1955, Manjacaze) | ***Niketche: Uma História de Poligamia*** — **José Craveirinha Prize 2003** | 2003 (prize) | Portuguese | [4] |
| Paulina Chiziane | **Camões Prize 2021** | 2021 | — | [4] |

**Two Camões Prizes** [4] — Couto in 2013, Chiziane in 2021 — **in the most prestigious award in the
Portuguese language, won by two writers from one African country.**

🔴 **Craveirinha is the entry that matters most here.** Source [4] describes him as having helped shape
modern Mozambican writing during the independence struggle **by "combining Portuguese structures with
African rhythms and themes."**

**That is the same technique this folder has now documented in five languages**: Kourouma bending
French ([`ci-cote-d-ivoire.md`](ci-cote-d-ivoire.md)), Silá and Semedo bending Portuguese
([`gw-guinea-bissau.md`](gw-guinea-bissau.md)), Tutuola carrying Yoruba tales into English
([`ng-nigeria.md`](ng-nigeria.md)), Vilakazi writing isiZulu into European metre — **and Craveirinha
putting African rhythm inside Portuguese verse.** It is no longer a set of individual curiosities.
**It is a continental method, and naming it is one of the most valuable things this research could
contribute to the submission narrative.**

**And note the prize's name.** Chiziane won the **José Craveirinha Prize** [4] — a national literary
award named after the poet. **Mozambique built an institution around its own writer**, the way Liberia
built the National Cultural Center around Bai T. Moore
([`lr-liberia.md`](lr-liberia.md)).

⚠️ **Source [1] — the country's own encyclopaedia entry — names none of these writers.** All four names
came from a separate search. **Third time in this folder** after Kenya ([`ke-kenya.md`](ke-kenya.md))
and Mauritius ([`mu-mauritius.md`](mu-mauritius.md)).

---

## Heritage & sites

⚠️ **Not researched.** Source [1] mentions the **Island of Mozambique** historically but **does not
identify it as a UNESCO site**, and no list page was fetched.

`[NEEDS SOURCE]` — the **Island of Mozambique** is the obvious candidate: source [1] records it as a
**15th-century regional power** before the Portuguese arrived, which would make it a Swahili-coast
site rather than only a colonial one.

---

## Open questions

- [ ] 🔴 **Confirm Tsonga = Xitsonga = Shangani**, reusing the app's existing Zimbabwe citation. **If it
      holds, wire `mz` — the strongest LANG-03 candidate this research has produced.**
- [ ] 🔴 **"African rhythms inside a European form"** — Craveirinha, Kourouma, Silá, Tutuola, Vilakazi.
      **Write this up once. It is a submission-narrative item.**
- [ ] 🔴 **The Gaza Empire and the Mfecane** — connects directly to *Mhudi*.
- [ ] **The anthem's composer** — unknown per source [2]; worth one more look.
- [ ] **Heritage — the whole section**, starting with the Island of Mozambique.
- [ ] **The Indian Ocean slave trade** — four files point at it, none documents it.
- [ ] **The Swahili coast as one story** — Kenya, Tanzania, Mozambique, Comoros.
- [ ] ⚠️ **Replace the "African 99%" table** with the language data, and say why.

---

## Sources

1. Mozambique — Wikipedia. `en.wikipedia.org/wiki/Mozambique` — Portuguese as official and the
   indigenous languages **including Tsonga**, the Bantu migration dates, **the Swahili port cities**,
   the wars, independence, and the 2017 census categories.
2. Mozambique — nationalanthems.info. `nationalanthems.info/mz.htm` — *Pátria Amada*, the **30 April
   2002** adoption, Salomão J. Manhiça, and the replacement of the 1975 one-party-era anthem.
3. *(reserved — no World Heritage source was fetched)*
4. Mozambican literature — surfaced via search across Wikipedia (Paulina Chiziane; *Sleepwalking Land*;
   List of Mozambican writers), the **Centre for the Study of Contemporary Women's Writing** (Institute
   of Languages, Cultures and Societies), the University of Porto's Mozambican Literature course page,
   and Books Africana. The CCWW and Wikipedia entries are the checkable ones.
