# Nigeria

**ISO code:** `ng` · **Region:** Western Africa (UN M49)
**Researched by:** Tumo Olorato Mogame, with Claude · **Last updated:** 2026-08-30
**Status:** core research — languages, anthem, milestones, peoples, literature and heritage sourced

> **How this file is put together.** Built **claim by claim**: every row names the source it came
> from, and the numbered list at the bottom is what those names point at. Sources are
> encyclopaedia-grade — rough sources are fine at this stage ([README.md](README.md)), assertions made
> to a reader are not.
>
> 🔴 **Nigeria has the largest literary canon in this folder and the first African Nobel Prize in
> Literature.** If Ubuntu Heritage ever extends its four pillars beyond South Africa, the argument
> starts here.

**What the app already has for Nigeria:**

| | |
|---|---|
| Flag | ✅ `app/assets/flags/ng.png` |
| Country entry | ✅ listed in [`anthems.ts`](../app/src/content/anthems.ts) as `ng` |
| National anthem recording | ❌ none yet — **and Nigeria has two anthems in live political use; see below** |
| Language map (drives the language picker) | ❌ not mapped — technically possible (English); see below |

---

## Languages

| Language | Status | Also spoken in SA? | Source |
|---|---|---|---|
| **English** | **Official** | **Yes — `en`** | [1] |
| **Hausa** | Major indigenous language | No | [1] |
| **Yoruba** | Major indigenous language | No | [1] |
| **Igbo** | Major indigenous language | No | [1] |

**Over 525 languages are spoken in Nigeria** [1] — the page also gives "500 distinct languages" in
another section, and the discrepancy is recorded here rather than resolved.

**Official-language instrument:** `[NEEDS SOURCE]`.

**Languages Ubuntu Heritage does not have:** all 525-odd indigenous ones.

🔴 **525 languages is the number that should reframe how the app talks about linguistic diversity.**
South Africa's Constitution names eleven and Ubuntu Heritage was built to honour them. **One West
African country has more than five hundred.** The app's model — a fixed registry of named languages —
simply does not scale to Nigeria, and saying so honestly is more valuable than pretending otherwise.

**`ng` is technically wirable** (`lead: "en"`) and would need the Zimbabwe-style honest comment, with
Hausa, Yoruba and Igbo named in `notYet` at minimum. Same argument as
[`gh-ghana.md`](gh-ghana.md) and [`gm-gambia.md`](gm-gambia.md) — but here the `notYet` list can never
be complete, and that limitation should be stated in the data rather than hidden.

**Hausa crosses the border into Niger, where it is now the official language**
([`ne-niger.md`](ne-niger.md)). One language, two countries, two completely different legal statuses.

---

## 🔴 National anthem — a colonial-era anthem *restored* in 2024

- **Title:** "Nigeria, We Hail Thee" (English)
- **Adopted:** originally **1 October 1960** · replaced **1978** · **restored 29 May 2024**
- **Words by:** **Lilian Jean Williams — a British expatriate** [2]
- **Music by:** Frances Benda
- **Recording we could use:** none sourced yet
- **Source:** [2]

> **Source [2]'s account.** The anthem was chosen by contest before independence and adopted on
> 1 October 1960; **the winning entry was written by a British expatriate.** In **1978 a military
> government replaced it**, and that replacement stayed in use through the return to civilian rule.
> In **May 2024 President Tinubu reintroduced "Nigeria, We Hail Thee", signing it into law on the
> 29th.** The change **"generated public opposition, partly because the anthem was composed by a
> former colonial power"** and over the speed of the legislative process. Source [2] records that
> **supporters of the president use the restored anthem while critics continue using the 1978
> version.**
>
> 🔴 **Nigeria and Niger are neighbours who reached opposite conclusions about the same question,
> one year apart.**
>
> | | Niger, 2023 | Nigeria, 2024 |
> |---|---|---|
> | Decision | **Discarded** its anthem | **Restored** an earlier anthem |
> | Reason given | It was written by French citizens and had "racist" and subservient language [`ne`] | Restoration of a pre-independence national symbol |
> | Colonial authorship | The reason to **reject** | The reason critics **objected** |
>
> See [`ne-niger.md`](ne-niger.md). **This pairing is the single best illustration in the folder that
> decolonisation is an argument, not a settled position** — two African states, adjacent, sharing the
> Hausa language, deciding the colonial inheritance question in opposite directions inside twelve
> months. Ubuntu Heritage should present it as the live disagreement it is, not resolve it.
>
> ⚠️ **A country currently singing two different anthems by political allegiance** [2] means any app
> feature that plays "Nigeria's anthem" is making a political choice. Say which one and when it was
> adopted, or do not play one.

---

## Milestones

| Year | Milestone | One grounded line | Source |
|---|---|---|---|
| **c. 1500 BC** | **The Nok culture** | "One of the earliest known civilisations in the region". | [1] |
| 8th c. | **Ile-Ife** | The Yoruba develop the city-state. | [1] |
| 10th c. | **The Kingdom of Nri** | Consolidated among the Igbo. | [1] |
| early 19th c. | **The Sokoto Caliphate** | Established after Usman dan Fodio's jihad. | [1] |
| **1914 (1 Jan)** | **The amalgamation** | Britain formally unites the Southern and Northern Protectorates into one Colony and Protectorate of Nigeria. | [1] |
| **1960 (1 Oct)** | **Independence** | As the Federation of Nigeria, with Abubakar Tafawa Balewa as Prime Minister. | [1] |
| 1963 (1 Oct) | A republic | | [1] |
| **1967 (6 Jul)** | **The Nigerian Civil War begins** | | [1] |
| **1970 (Jan)** | The war ends | **"Estimates of the number of dead range from one to three million."** | [1] |
| 1999 (29 May) | The current constitution | | [1] |

**Framing notes.**

- **1914 is the country.** Nigeria's borders are an administrative merger of two British protectorates
  [1] containing over 500 language communities. Almost everything difficult in Nigeria's later
  history — including the civil war — runs back to that sentence. **The app should say plainly that
  the state was assembled, and by whom.**
- ⚠️ **"One to three million" dead** [1]. A range that wide is itself a fact about how the war was
  recorded. Give the range and its source; **never pick a number to sound authoritative**, and never
  use the figure as colour.
- **The Igbo Kingdom of Nri (10th c.) and Yoruba Ile-Ife (8th c.)** [1] are the corrective to any
  account that starts Nigerian history at the coast with Europeans. Ile-Ife is also the source of the
  Ife bronzes `[NEEDS SOURCE]` — and, with the **Benin Bronzes**, the centre of the restitution
  argument. **Source [1] does not mention the Benin Empire or the 1897 punitive expedition at all**,
  which is a striking omission and a priority gap.
- **The Sokoto Caliphate** connects to Niger's and Cameroon's histories, and to **Ajami** — Hausa
  written in Arabic script `[NEEDS SOURCE]`, which would link Nigeria to the West African script
  story in [`lr-liberia.md`](lr-liberia.md) and [`gn-guinea.md`](gn-guinea.md).

---

## Peoples & cultures

**2018 figures** [1]:

| Group | Share |
|---|---|
| **Hausa** | 25% |
| **Yoruba** | 21% |
| **Igbo** | 18% |
| Fulani | 6% |
| Ibibio | 3.5% |
| Kanuri | 2.4% |
| Tiv | 2.4% |
| Ijaw | 1.8% |
| Others | **19.9%** |

- **"Others" at 19.9%** [1] is roughly one Nigerian in five, and it holds most of those 525 languages.
  A table that names eight groups and bundles forty million people into "other" is a reminder of how
  much national statistics flatten.
- **Yoruba religion and the Osun-Osogbo grove** — see Heritage. Yoruba spiritual practice crossed the
  Atlantic and survives as Santería, Candomblé and Vodun-adjacent traditions `[NEEDS SOURCE]`.
  **Together with Benin's Vodun ([`bj-benin.md`](bj-benin.md)), this is the strongest diaspora thread
  in the West African files.**
- **The Igbo, Yoruba and Hausa are three of the largest ethnolinguistic groups in Africa** and each
  has a written and oral literature of its own `[NEEDS SOURCE]`.

---

## Literature & voices

| Writer | Work | Year | Language | Source |
|---|---|---|---|---|
| **Chinua Achebe** | ***Things Fall Apart*** — "allegedly the most widely-read book in modern African literature" | **1958** | English | [4] |
| **Wole Soyinka** | **Nobel Prize in Literature 1986** — "the first African recipient of the prize" | 1986 | English | [4] |
| **Amos Tutuola** (1920–1997) | ***The Palm-Wine Drinkard*** — based in part on **Yoruba folk-tales** | **1952** | English | [4] |
| Amos Tutuola | *My Life in the Bush of Ghosts* | **1954** | English | [4] |
| **Buchi Emecheta** (1944–2017) | *In the Ditch* | **1972** | English | [4] |
| Buchi Emecheta | *Second Class Citizen* | **1974** | English | [4] |
| Buchi Emecheta | *The Slave Girl* | **1977** | English | [4] |
| Buchi Emecheta | *The Joys of Motherhood* | **1979** | English | [4] |
| **Chimamanda Ngozi Adichie** (b. 1977, Enugu) | *Half of a Yellow Sun* — on the Nigerian Civil War | **2006** | English | [4] |
| Chimamanda Ngozi Adichie | *Americanah* | **2013** | English | [4] |
| Chimamanda Ngozi Adichie | *We Should All Be Feminists* | **2014** | English | [4] |
| Chimamanda Ngozi Adichie | *Notes on Grief* | **2021** | English | [4] |

**The Nobel citation is worth quoting exactly** [4]: Soyinka was awarded the 1986 prize **"who in a
wide cultural perspective and with poetic overtones fashions the drama of existence"** — the first
African to receive it. Source [4] also records that Achebe and Soyinka were both considered strong
candidates, that **Achebe never won**, and that he "joined the rest of Nigeria in celebrating the first
African ever to win the prize".

**Three connections this project should make.**

1. 🔴 **Amos Tutuola's *The Palm-Wine Drinkard* (1952) is the closest thing in African literature to
   what Ubuntu Heritage is trying to build.** Source [4]: books "based in part on Yoruba folk-tales" —
   an author taking oral material and making a novel of it in English, keeping the logic of the tales
   rather than tidying them into European narrative shape. **That is Credo Mutwa's project, six years
   before *Things Fall Apart*.** Put Tutuola, Sutherland's *Anansewa*
   ([`gh-ghana.md`](gh-ghana.md)), Hampâté Bâ ([`ml-mali.md`](ml-mali.md)) and Mutwa together and the
   app has a continental argument instead of a South African one.
2. **Achebe and Plaatje are doing the same job forty years apart.** *Mhudi* (published 1930) and
   *Things Fall Apart* (1958) are both novels that narrate a precolonial African society on its own
   terms, in English, against the colonial account. Achebe's is "allegedly the most widely-read book
   in modern African literature" [4]; Plaatje's is barely known outside South Africa. **The app can
   say why that difference exists.**
3. **Emecheta and Adichie give the folder its clearest women's line** — *The Joys of Motherhood*
   (1979) and *Half of a Yellow Sun* (2006), the latter narrating the civil war whose death toll
   source [1] can only give as a range. Set beside *Mhudi*'s woman narrator and Morocco's Fatema
   Mernissi ([`ma-morocco.md`](ma-morocco.md)), this is a thread running through the whole continent.

---

## Heritage & sites

Two UNESCO World Heritage Sites [3] — strikingly few for a country of this size:

| Site | Inscribed | Type | What it is |
|---|---|---|---|
| **Sukur Cultural Landscape** | 1999 | Cultural | Adamawa state; the granite throne of the Bugu Festival Ground |
| **Osun-Osogbo Sacred Grove** | 2005 | Cultural | Osun state; statuary of spiritual and maternal significance |

Thirteen properties are on the tentative list, including the **Ancient Kano City Walls**, **Idanre
Hill**, the **Niger Delta Mangroves**, Gashaka Gumti National Park and a **Lake Chad** cultural
landscape [3].

- **Osun-Osogbo is a living sacred grove**, not a ruin — a place of active Yoruba religious practice
  inscribed as world heritage. That is the same category as Mali's Bandiagara
  ([`ml-mali.md`](ml-mali.md)): **heritage that is still being performed.**
- **Two sites for 220 million people and 525 languages** is a fact about the World Heritage system as
  much as about Nigeria. Worth noting rather than passing over.

---

## Open questions

- [ ] 🔴 **Which anthem does the app play?** Two are in concurrent use along political lines [2]. Get
      a news-grade source on the 2024 restoration and the objections, and decide the app's position
      explicitly rather than by default.
- [ ] 🔴 **The Benin Empire, the 1897 punitive expedition and the Benin Bronzes** — entirely absent
      from source [1], and among the most important restitution stories in the world. Directly on this
      project's theme. Pair with Benin's Abomey claims ([`bj-benin.md`](bj-benin.md)) — note these are
      **different Benins**, which is itself a trap worth naming.
- [ ] 🔴 **Ajami — Hausa written in Arabic script.** Would connect Nigeria to the West African
      indigenous-script thread.
- [ ] **Yoruba religion's Atlantic crossing** — Santería, Candomblé. The diaspora argument.
- [ ] **Reconcile "525" and "500" languages** [1], and find the authority for either.
- [ ] **Literature in Igbo, Yoruba and Hausa** — every work listed above is in English. Nigeria
      certainly has literature in its own languages; this section does not yet show it.
- [ ] **Why Achebe never won the Nobel** — source [4] surfaces several opinion pieces on this. Handle
      as contested commentary, not fact.
- [ ] **Decide whether to wire `ng`**, knowing `notYet` can never be complete.

---

## Sources

1. Nigeria — Wikipedia. `en.wikipedia.org/wiki/Nigeria` — official language, the 525/500 language
   counts, milestones from Nok to 1999, independence, the civil-war death range, 2018 ethnic figures.
2. Nigeria — nationalanthems.info. `nationalanthems.info/ng.htm` — "Nigeria, We Hail Thee", the 1960
   contest and its British expatriate author, the 1978 replacement, the **29 May 2024 restoration**,
   and the public opposition to it.
3. List of World Heritage Sites in Nigeria — Wikipedia.
   `en.wikipedia.org/wiki/List_of_World_Heritage_Sites_in_Nigeria` — both sites and the tentative list.
4. Nigerian literature — surfaced via search across **NobelPrize.org** (1986 press release),
   Wikipedia (1986 Nobel Prize in Literature; Amos Tutuola; Buchi Emecheta), **Britannica** (Adichie)
   and Columbia University Library's *The Novel in Africa* guide. The Nobel and Britannica citations
   are the strongest in this file.
