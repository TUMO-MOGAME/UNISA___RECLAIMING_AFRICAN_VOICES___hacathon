# Sudan

**ISO code:** `sd` · **Region:** Northern Africa (UN M49 — **not** the SADC/Southern grouping; see [README.md](README.md))
**Researched by:** Tumo Olorato Mogame, with Claude · **Last updated:** 2026-08-30
**Status:** core research — languages, anthem, milestones, literature and heritage sourced

> **How this file is put together.** Built **claim by claim**: every row names the source it came
> from, and the numbered list at the bottom is what those names point at. Sources are
> encyclopaedia-grade — rough sources are fine at this stage ([README.md](README.md)), assertions made
> to a reader are not.
>
> ⚠️ **Sudan has been at war since April 2023** [1]. Everything demographic in this file predates it,
> and heritage listed as safe may not be. Say so wherever this material is used.

**What the app already has for Sudan:**

| | |
|---|---|
| Flag | ✅ `app/assets/flags/sd.png` |
| Country entry | ✅ listed in [`anthems.ts`](../app/src/content/anthems.ts) as `sd` |
| National anthem recording | ❌ none yet — `/countries` says so honestly |
| Language map (drives the language picker) | ❌ not mapped — but **this one is closer than most**; see below |

---

## Languages

| Language | Status | Also spoken in SA? | Source |
|---|---|---|---|
| Arabic | **Official** | No | [1] |
| English | **Official** | **Yes — `en`**, the same language the app already speaks | [1] |

**Official-language instrument:** `[NEEDS SOURCE]` — source [1] names both official languages but not
the constitutional article.

**Languages Ubuntu Heritage does not have:** Arabic. Other Sudanese languages are **not stated by
source [1] at all** — see the warning below.

**Sudan is the first country in this folder that `country-languages.ts` could actually take.** English
is official [1] and the app speaks it, so unlike Burkina Faso, Algeria, Egypt, Libya and Morocco, a
`lead` value exists (`en`) and `supported` would not be empty. **But do not wire it yet** — for the
same reason Zimbabwe's entry carries an honest technicality: English leading would say something
false about what Sudanese people actually speak. First find the real language spread; then decide
whether an entry helps a reader or misleads one.

⚠️ **The silence in this section is the finding.** Source [1] does not detail *any* language other than
the two official ones, while the same page records **Beja, Nuba, Fur and Nubian peoples** (below).
Those communities have their own languages, and Nubian in particular is one of Africa's
longest-attested written languages `[NEEDS SOURCE]`. A file that lists only Arabic and English is
recording a state's position, not a country's speech.

---

## National anthem

- **Title (own language):** نحن جند الله جند الوطن — *Nahnu Djundulla Djundulwatan*
- **Title (English):** "We Are the Army of God and of Our Land"
- **Adopted:** 1956
- **Words by:** Sayed Ahmad Muhammad Salih
- **Music by:** Ahmad Murjan
- **Recording we could use:** none sourced yet
- **Source:** [2]

> Source [2] records that the anthem was established at independence from Britain and Egypt, and that
> it was **drawn from what had previously been the armed forces' official song**. Given that Sudan is
> now in a war between two armed forces [1], a national anthem that began as a military song is a fact
> to state plainly and handle with care — not a colourful detail.

---

## Milestones

Sudan's is one of the **deepest timelines in this folder** — the kingdoms below are contemporaries of
pharaonic Egypt, not successors to it.

| Year | Milestone | One grounded line | Source |
|---|---|---|---|
| c. 2500 BC | The Kingdom of Kerma | | [1] |
| c. 1504–1550 BC | Kerma culture flourishes | | [1] |
| c. 780 BC | The Kingdom of Kush | Its capital, Meroë, is a World Heritage site today. | [1], [3] |
| 900–270 BCE | The Napatan period | The archaeological area around Gebel Barkal. | [3] |
| c. 350–1500 | The Christian Nubian kingdoms | Nobatia, Makuria and Alodia. | [1] |
| c. 1500–1820 | The Islamic kingdoms | Sennar and Darfur. | [1] |
| 1820 | The Turco-Egyptian conquest | | [1] |
| 1881–1885 | The Mahdist War and state | | [1] |
| 1899 | The Anglo-Egyptian Condominium | | [1] |
| 1956 (1 Jan) | Independence | Declared an independent state, from the Anglo-Egyptian Condominium. | [1] |
| 2011 | **South Sudan secedes** | Following a referendum. Sudan becomes two countries. | [1] |
| 2023– | The third civil war | Between the Sudanese Armed Forces and the Rapid Support Forces; ongoing. | [1] |

**Framing notes.**

- **Kush is the correction to "Egypt invented everything".** The Kingdom of Kush ruled Egypt itself as
  its 25th Dynasty `[NEEDS SOURCE — not stated by source [1], verify before using]`, and Meroë's
  Nubian pyramids [3] are a distinct architectural tradition, not an imitation. Any Ubuntu Heritage
  treatment of the Nile should start here rather than at Giza — see the same warning in
  [`eg-egypt.md`](eg-egypt.md).
- **Sudan and South Sudan are one story told from two sides.** [`ss-south-sudan.md`](ss-south-sudan.md)
  must be written so that the 2011 separation reads consistently from both files. Neither is the
  "real" Sudan.
- ⚠️ **The current war is not history yet.** Source [1] gives it as ongoing. Nothing in the app should
  imply a resolution, and nothing should turn a living catastrophe into atmosphere.
- **Careful with the ISO trap:** `sd` here is the **country** Sudan; `ss` is the country South Sudan
  but is also the app's language code for **siSwati**. See [README.md](README.md).

---

## Peoples & cultures

Source [1] gives a full ethnic breakdown — one of the few country pages that does:

| Group | Share | Source |
|---|---|---|
| Sudanese Arab | 70% | [1] |
| Beja | 5.9% | [1] |
| Nuba | 2.5% | [1] |
| Fur | 2.0% | [1] |
| Egyptian | 2.0% | [1] |
| Nubian | 1.3% | [1] |
| Others | 16.3% | [1] |

**Read these figures with care.** They predate the 2023 war and the mass displacement it caused, and
"Sudanese Arab" at 70% is a category with a political history — Arabisation was state policy and is
part of what the Darfur conflict was about. **Cite the figures with their limits, or not at all.**
The Fur (2%) give Darfur its name; the war there is inseparable from this table.

---

## Literature & voices

| Writer | Work | Year | Language | Source |
|---|---|---|---|---|
| Tayeb Salih (1929–2009) | *The Wedding of Zein* | 1962 | Arabic | [4] |
| Tayeb Salih | ***Season of Migration to the North*** | **1966** | Arabic | [4] |
| Leila Aboulela (b. 1964) | *The Translator* | 1999 | English | [4] |
| Leila Aboulela | *Minaret* | 2005 | English | [4] |
| Leila Aboulela | *Lyrics Alley* | 2010 | English | [4] |
| Abdelaziz Baraka Sakin | named in the canon; no work sourced here | — | Arabic | [4] |

**This is the strongest literary find in the folder so far, and it is not close.** Source [4] describes
***Season of Migration to the North*** (1966) as **one of the most significant works in modern Arabic
literature** and, for many critics, one of the best examples of Arabic fiction — a novel that "caused
controversy and sensation" on publication and tells Sudan's history of European colonialism through
two Sudanese men returning home from Europe.

**Why it matters to Ubuntu Heritage specifically.** That premise — *the colonised subject who goes to
the metropole, is changed, and comes back* — is the exact question Plaatje lived and *Mhudi* circles.
Salih wrote it in **Arabic**, from inside the language, and it became world literature anyway. If the
app ever argues that indigenous-language literature is not a smaller stage, this is the strongest
evidence on the continent.

**Leila Aboulela won the inaugural Caine Prize in 2000** [4], writes in **English**, and has been
translated into fifteen languages. Sudan therefore offers both halves of the argument this project
keeps having: the writer who stayed in the mother tongue and the writer who crossed. Neither is the
sell-out.

---

## Heritage & sites

Three UNESCO World Heritage Sites, from source [3]:

| Site | Inscribed | Type | What it is |
|---|---|---|---|
| Gebel Barkal and the Sites of the Napatan Region | 2003 | Cultural | Archaeological area in Nubia; Napatan (900–270 BCE) and Meroitic cultures |
| Archaeological Sites of the Island of Meroe | 2011 | Cultural | Meroë, former capital of the **Kingdom of Kush** — Nubian pyramids, temples, tombs, residential buildings |
| Sanganeb Marine National Park & Dungonab Bay – Mukkawar Island | 2016 | **Natural** | Red Sea coral reefs, mangroves and **endangered dugongs** |

Sudan accepted the UNESCO convention in 1974 and holds a tentative list of **15 further properties**
[3].

⚠️ **None of these is listed as "in danger" in source [3] — and that listing predates or does not
reflect the 2023–present war.** Do not repeat "not in danger" as a current fact.

---

## Open questions

- [ ] **The languages Sudanese people actually speak.** Source [1] gives only the two official ones
      while naming four non-Arab peoples. This is the biggest hole in the file.
- [ ] **Nubian as a written language** — potentially one of Africa's oldest literate traditions, and
      entirely absent here.
- [ ] **Verify the Kush 25th-Dynasty claim** before it goes anywhere near the app. Flagged above and
      not asserted.
- [ ] **Current heritage condition** given the war. The 2016-era "not in danger" status cannot be
      quoted as present tense.
- [ ] **Decide whether to wire `sd` into `country-languages.ts`.** It is technically possible (English)
      and probably misleading. Written up above; needs a decision, not a default.
- [ ] **Keep this file and [`ss-south-sudan.md`](ss-south-sudan.md) consistent** on 2011.
- [ ] **The constitutional article** naming Arabic and English.

---

## Sources

1. Sudan — Wikipedia. `en.wikipedia.org/wiki/Sudan` — official languages, milestones from Kerma to the
   2023 war, independence, the ethnic breakdown.
2. Sudan — nationalanthems.info. `nationalanthems.info/sd.htm` — anthem title, 1956 adoption,
   lyricist, composer, and its origin as the armed forces' song.
3. List of World Heritage Sites in Sudan — Wikipedia.
   `en.wikipedia.org/wiki/List_of_World_Heritage_Sites_in_Sudan` — three sites, years, types, and the
   15-property tentative list.
4. Sudanese literature — surfaced via search across **ARABLIT** (`arablit.org`), Wikipedia (Tayeb
   Salih; Leila Aboulela; Abdelaziz Baraka Sakin), Brittle Paper and Books Africana. The Salih and
   Aboulela facts are the checkable ones.
