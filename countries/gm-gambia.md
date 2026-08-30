# The Gambia

**ISO code:** `gm` · **Region:** Western Africa (UN M49)
**Researched by:** Tumo Olorato Mogame, with Claude · **Last updated:** 2026-08-30
**Status:** core research — languages, anthem, milestones, peoples, literature and heritage sourced

> **How this file is put together.** Built **claim by claim**: every row names the source it came
> from, and the numbered list at the bottom is what those names point at. Sources are
> encyclopaedia-grade — rough sources are fine at this stage ([README.md](README.md)), assertions made
> to a reader are not.

**What the app already has for The Gambia:**

| | |
|---|---|
| Flag | ✅ `app/assets/flags/gm.png` |
| Country entry | ✅ listed in [`anthems.ts`](../app/src/content/anthems.ts) as `gm` |
| National anthem recording | ❌ none yet — `/countries` says so honestly |
| Language map (drives the language picker) | ❌ not mapped — **but this is one of the few that could be**; see below |

---

## Languages

| Language | Status | Also spoken in SA? | Source |
|---|---|---|---|
| **English** | **Sole official language** | **Yes — `en`**, which the app speaks | [1] |
| Mandinka | National language | No | [1] |
| Pulaar · Fula | National language | No | [1] |
| Wolof | National language | No | [1] |
| Serer · Jola · Jola-Fonyi · Balanta · Mandjak · Mankanya · Noon · Dyula · Soninke · Karon · Kassonke · Cangin · Arabic | National languages named by source [1] | No | [1] |
| **Gambian Sign Language** | Named by source [1] among the country's languages | No | [1] |

**Official-language instrument:** `[NEEDS SOURCE]` — source [1] says "English is the country's sole
official language" but does not cite the instrument.

**Languages Ubuntu Heritage does not have:** everything except English.

**`gm` is technically wirable — and doing it naively would be the Zimbabwe mistake.** English is the
sole official language [1] and the app speaks it, so `lead: "en"` would type-check. But English is not
what most Gambians speak at home, and an entry saying "The Gambia → English" would state something
false by implication. [`country-languages.ts`](../app/src/content/country-languages.ts) already has
precedent for this: Zimbabwe leads with English **on an honest technicality, and says so in a
comment**. If `gm` is added, it needs the same treatment and a `notYet` list of at least Mandinka,
Fula, Wolof, Jola and Soninke.

**Gambian Sign Language is named by source [1]** — worth noticing, because South Africa's own entry in
`country-languages.ts` lists South African Sign Language under `notYet`. Two countries, same
recognition, same gap in the app.

---

## National anthem

- **Title:** "For The Gambia, Our Homeland" (English)
- **Adopted:** 18 February 1965 — independence day itself
- **Words by:** Virginia Julia Howe
- **Music:** a **traditional Mandinka melody**, *"Foday Kaba Dumbuya"*, adapted by Jeremy Frederic Howe
- **Recording we could use:** none sourced yet
- **Source:** [2]

> **This is the anthem entry that matters most in the folder so far.** Source [2] records that the
> music is **not composed but adapted** — it is the traditional Mandinka song *Foday Kaba Dumbuya*,
> carrying English words written by Virginia Julia Howe, with the adaptation by her husband.
>
> An indigenous melody with a colonial-language lyric laid over it is the whole problem of this
> project in one object: **the tune survived, the words were replaced.** Compare Morocco, which kept a
> colonial melody and changed the words ([`ma-morocco.md`](ma-morocco.md)) — the exact inverse. If
> Ubuntu Heritage ever builds a feature about what survives a translation and what does not, these
> two anthems are the example.

---

## Milestones

| Year | Milestone | One grounded line | Source |
|---|---|---|---|
| 3rd c. BC – 16th c. AD | **The Senegambian stone circles built** | Over 1,000 monuments along 350 km of the River Gambia. | [3] |
| 9th–10th c. | The first written accounts | Arab traders provide them, and introduce Islam. | [1] |
| mid-15th c. | The Portuguese reach the region | | [1] |
| 1588 | Trade rights sold to English merchants | | [1] |
| 1618 | James I grants a trade charter | | [1] |
| 1651–1661 | Courland rule | Parts of the territory come under the Duchy of Courland and Semigallia. | [1] |
| 1664 | Formally ceded to England | | [1] |
| 1758 | British occupation | Following the capture of Senegal. | [1] |
| 1816 | **Bathurst founded** | The British military post that is now Banjul. | [1] |
| 1906 | **Slavery abolished** | Source [1]'s own date — and it is late. | [1] |
| 1965 (18 Feb) | **Independence** from the United Kingdom | The anthem is adopted the same day. | [1], [2] |
| 1970 (24 Apr) | A republic within the Commonwealth | | [1] |

**Framing notes.**

- **"Slavery was abolished in 1906"** [1]. Not 1807, not 1833 — **1906**, within the lifetime of
  people whose grandchildren are alive now. The British abolition dates taught in schools describe the
  *trade*, and then Britain's own territories; the practice continued in this colony for another
  century. **That single date corrects more received history than anything else in this file.**
- **The stone circles predate every European date above by up to two thousand years** [3] and are
  described by UNESCO as the largest concentration of stone circles anywhere in the world [1]. A
  timeline that begins with Portuguese arrival is missing 1,800 years of it.
- **The Gambia's shape is a colonial artefact** — a strip of land following a river, cut out of
  Senegal. Source [1] does not say this; `[NEEDS SOURCE]`, but it is the first thing anyone notices on
  a map and it should be explained rather than left as a curiosity.

---

## Peoples & cultures

**2024 Population and Housing Census** [1] — the most recent census data in this folder:

| Group | Share |
|---|---|
| Mandinka | 34.4% |
| Fula | 25.0% |
| Wolof | 15.4% |
| Jola | 9.5% |
| Soninke | 8.2% |
| Serer | 2.9% |
| Other | 4.6% |

- ⚠️ **The griot tradition is central here and is absent from source [1].** Source [4] confirms that
  **oral literature — griots, ritual poetry — "has historically been the predominant type of cultural
  transmission" in the wider Senegambia.** For a project built on oral history, the Gambian griot
  (*jali*) is among the most important cultural forms on this continent, and this file currently has
  one sentence about it. **This is the biggest research gap in the file and the most valuable one to
  close.**
- **Mandinka, Wolof, Fula and Serer all straddle the Senegal border** — see
  [`sn-senegal.md`](sn-senegal.md). The stone circles are shared with Senegal too [3]. Senegambia is
  one cultural region with two states.

---

## Literature & voices

| Writer | Work | Year | Language | Source |
|---|---|---|---|---|
| Lenrie Peters | *The Second Round* (his only novel); two poetry collections | 1960s | English | [4] |
| Lenrie Peters | ***Katchikali*** — "his first distinctly Gambian work" per critics | **1971** | English | [4] |
| Ebrima "Ebou" Dibba | **the first Gambian writer to set his stories in The Gambia** | `[NEEDS years]` | English | [4] |
| Tijan Sallah (b. Serekunda) | *Before The New Earth* — poetry | **1988** | English | [4] |

**Lenrie Peters is described as the founder of Gambian literature** [4], and the detail worth keeping
is the critics' judgement that his *first distinctly Gambian work* came in **1971, after he returned
to The Gambia** — not with his first publication. A writer becoming national by coming home.

**But the real literature of this country is older than any of these names.** Source [4] is explicit
that oral literature and the griots have been the predominant mode of cultural transmission. The
written canon here is roughly sixty years old; the oral one is centuries. **A Literature section that
lists only the four writers above would be recording what happens to be printed, not what The Gambia
has actually produced** — which is exactly the error Ubuntu Heritage exists to correct.

---

## Heritage & sites

Two UNESCO World Heritage Sites [3]:

| Site | Inscribed | Type | Shared | What it is |
|---|---|---|---|---|
| **Kunta Kinteh Island and Related Sites** | 2003 | Cultural | — | "Testimony to the main periods and facets of the encounter between Africa and Europe along the River Gambia" — inscribed for its significance to **the slave trade and its abolition** |
| **Stone Circles of Senegambia** | 2006 | Cultural | **Senegal** | **Over 1,000 monuments** in a band 100 km wide along 350 km of the river; stone circles and burial mounds, **3rd century BC to 16th century AD** |

Two tentative sites: the Wassu Stone Circles Quarry and Historic Georgetown [3].

- **Kunta Kinteh Island is named for a person in a book.** The island was James Island; it was renamed
  for the character in Alex Haley's *Roots*, whose story is set at Juffureh on this river.
  `[NEEDS SOURCE]` — the sources used here do not state it, and it must be verified before use. But if
  it holds, it is remarkable: **a World Heritage site renamed after a literary character, because that
  book returned a severed diaspora lineage to a specific African village.** That is this entire
  project's thesis — that literature repairs inheritance — with a UNESCO inscription attached.
- **The stone circles are shared with Senegal** and should be written once across both files.

---

## Open questions

- [ ] ⚠️ **The griot / *jali* tradition** — the largest and most valuable gap here. Kora, praise
      genealogy, the Mandinka epic tradition. This is the country's real literature.
- [ ] ⚠️ **Verify the Kunta Kinteh / *Roots* / Juffureh connection** properly. Named above as unverified
      on purpose. If it holds it may be the single best story in the West African files.
- [ ] **Confirm the 1906 abolition date** with a second source. It is the most striking claim in the
      file and it should not rest on one encyclopaedia line.
- [ ] **Why is The Gambia the shape it is?** The colonial partition of Senegambia, sourced.
- [ ] **Decide whether to wire `gm`** with the Zimbabwe-style honest technicality, or leave it out.
- [ ] **Gambian Sign Language** — recognised here, and paralleled by SASL in the app's own `za` entry.
- [ ] **Dates for Ebou Dibba**, and whether any Gambian literature exists in Mandinka or Wolof.

---

## Sources

1. The Gambia — Wikipedia. `en.wikipedia.org/wiki/The_Gambia` — sole official language and the
   national-languages list, milestones, **the 1906 abolition date**, the 2024 census figures.
2. The Gambia — nationalanthems.info. `nationalanthems.info/gm.htm` — anthem title, 1965 adoption,
   lyricist, and **the traditional Mandinka melody *Foday Kaba Dumbuya***.
3. List of World Heritage Sites in the Gambia — Wikipedia.
   `en.wikipedia.org/wiki/List_of_World_Heritage_Sites_in_the_Gambia` — both sites, dates, the
   stone-circle extent, and the shared inscription with Senegal.
4. Gambian literature — surfaced via search across Wikipedia (Gambian literature), *The Standard*
   (Gambia), Asymptote Journal (Tijan Sallah) and Gambian Writers. The Wikipedia and Asymptote entries
   are the checkable ones.
