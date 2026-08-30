# Lesotho

**ISO code:** `ls` · **Region:** Southern Africa (UN M49) · **SADC member**
**Researched by:** Tumo Olorato Mogame, with Claude · **Last updated:** 2026-08-30
**Status:** core research — languages, anthem, milestones, peoples and literature sourced · heritage empty

> **How this file is put together.** Built **claim by claim**: every row names the source it came
> from, and the numbered list at the bottom is what those names point at. Sources are
> encyclopaedia-grade — rough sources are fine at this stage ([README.md](README.md)), assertions made
> to a reader are not.
>
> 🔴 **This file contains the most important literary finding in the entire folder.** **The first novel
> ever published in an African language was written in Sesotho, in Lesotho, in 1907** — and Sesotho is
> a language Ubuntu Heritage already speaks. See Literature.

**What the app already has for Lesotho:**

| | |
|---|---|
| Flag | ✅ `app/assets/flags/ls.png` |
| Country entry | ✅ listed in [`anthems.ts`](../app/src/content/anthems.ts) as `ls` |
| National anthem recording | ❌ none yet — `/countries` says so honestly |
| Language map | ✅ **live and sourced** — [`country-languages.ts`](../app/src/content/country-languages.ts) cites **Constitution of Lesotho, 1993, §3(1)**, leading with **Sesotho** |
| Reviewed content in Sesotho | ❌ `reviewedContent: false` in [`languages.ts`](../app/src/i18n/languages.ts) |

---

## Languages

| Language | Status | Also spoken in SA? | Source |
|---|---|---|---|
| **Sesotho** | **Official** | **Yes — the same language**, `st`, one of South Africa's eleven | [1], app data |
| **English** | **Official** | Yes — `en` | [1], app data |
| **isiXhosa** | Source [1] names it as official too | Yes — `xh` | [1] |
| **SiPhuthi** | Source [1] names it as official too | No | [1] |

⚠️ **Source [1] is internally inconsistent** — its prose says Sesotho is official "along with English,
IsiXhosa, and SiPhuthi", while **its infobox lists only Sesotho and English** [1]. **The app's existing
citation — Constitution of Lesotho, 1993, §3(1) — names two.** `[NEEDS SOURCE]` to resolve whether
isiXhosa and SiPhuthi were added later.

🔴 **If isiXhosa is official in Lesotho, the app's `ls` entry is incomplete.** It currently supports
`["st", "en"]`. **isiXhosa is `xh` — the app already has it.** Adding it would cost nothing and would
make the entry more accurate. **SiPhuthi would go in `notYet`.** **This is the second place where this
research could directly improve shipping data**, after Zimbabwe ([`zw-zimbabwe.md`](zw-zimbabwe.md)).

**Languages Ubuntu Heritage does not have:** SiPhuthi only.

---

## National anthem

- **Title (own language):** ***Lesotho fatše la bo ntat'a rona*** (Sesotho)
- **Title (English):** "Lesotho, Land of Our Fathers"
- **Adopted:** **1967** — royal decree of 1 June 1967, **backdated to 4 October 1966**
- **Words by:** **François Coillard**, a French missionary
- **Music by:** **Ferdinand-Samuel Laur**
- **Recording we could use:** none sourced yet
- **Source:** [2]

> ⚠️ **The melody is Swiss.** Source [2]: it comes from a **Swiss songbook of c. 1823**, composed by
> Laur under the title ***"Freiheit"*** (Freedom); the words were written by **a French missionary**;
> and the piece **first appeared in a Lesotho high-school song collection in 1869**.
>
> 🔴 **And source [2] records why it is shorter than it was.** The anthem originally had **five
> verses** and was cut to **two** by the twentieth century, **because the middle sections addressing
> traditional customs were deemed inappropriate for national use.**
>
> **Read that sentence twice.** A national anthem, written by a missionary to a Swiss tune, from which
> **the verses about Basotho custom were removed as unsuitable.** That is not a neutral editorial
> trim — **it is the exact mechanism this whole project exists to reverse**, documented in the
> country's own national song.
>
> **Compare Niger**, which threw out its anthem in 2023 for containing "racist and subservient"
> language written by French citizens ([`ne-niger.md`](ne-niger.md)), and **The Gambia**, whose
> Mandinka melody survived under English words ([`gm-gambia.md`](gm-gambia.md)). **Lesotho kept a
> European tune and European words and cut the African custom out of the middle.**
> **If Ubuntu Heritage ever wants one example of what "reclaiming African voices" means concretely,
> those three missing verses are it.** `[NEEDS SOURCE]` — **finding out what they said is the single
> most compelling research task this folder has generated.**

---

## Milestones

| Year | Milestone | One grounded line | Source |
|---|---|---|---|
| 1804 | **Moshoeshoe I becomes a chief** | | [1] |
| **1822** | **Basutoland emerges as a single polity** | Under **King Moshoeshoe I** — the founding of the Basotho nation, during the Difaqane. | [1] |
| 1868 | A British protectorate | Following Queen Victoria's agreement. | [1] |
| **1884** | **A Crown colony** | Under the name **Basutoland**. | [1] |
| **1966 (4 Oct)** | **Independence from the United Kingdom** | | [1] |
| 1967 | The anthem formally decreed | Backdated to independence day. | [2] |
| 1970 | The first post-independence elections | The BNP loses to the BCP. | [1] |
| 1986 | Military coup | Prime Minister Jonathan removed. | [1] |
| 1993 | Democratic government restored | After seven years of military rule — **and the constitution the app's language data cites**. | [1] |
| 1995 | Letsie III abdicates | In favour of his father, Moshoeshoe II. | [1] |
| 1996 (15 Jan) | Letsie III returns to the throne | After Moshoeshoe II's death. | [1] |

**Framing notes.**

- 🔴 **1822 is the Difaqane** [1] — the same upheaval Ubuntu Heritage already narrates through *Mhudi*
  and through [`bw-botswana.md`](bw-botswana.md). **Moshoeshoe I built a nation out of it**, on a
  mountain, by gathering the scattered. **Botswana's file tells the Difaqane as destruction —
  Kaditshwene sacked in 1821, the Bahurutshe decimated. Lesotho's tells it as formation.** **The same
  years, the same event, one country made and another broken.** ⚠️ Source [1] does not use the word
  *Difaqane* — `[NEEDS SOURCE]` to connect them explicitly, but the dates align exactly and this is
  the most valuable cross-reference in the Southern African files.
- **The Basotho nation is a 19th-century political achievement, not an ancient given** [1]. That is
  worth saying plainly: **Moshoeshoe I assembled it**, and it survived where others did not.
- **1884: a Crown colony named Basutoland** [1] — and unlike Botswana, whose Dikgosi went to London in
  1895 to stay out of the British South Africa Company
  ([`bw-botswana.md`](bw-botswana.md)), Lesotho's protectorate came earlier and differently.
  ⚠️ **How Lesotho avoided incorporation into South Africa is not in source [1]** and is a significant
  gap — it is the reason the country exists.

---

## Peoples & cultures

**Source [1]: the Basotho are 99.7% of the population**; about 1% are "Europeans, Asians, and Xhosa".

- **The most homogeneous country in the entire folder** [1] — higher than Eswatini's 97%
  ([`sz-eswatini.md`](sz-eswatini.md)) and Comoros' 97.1% ([`km-comoros.md`](km-comoros.md)).
- **Sesotho speakers also live in South Africa** — `st` is one of the eleven — so this is a language
  and a people spanning a border into the app's home country, like Setswana and siSwati.
- ⚠️ **Basotho cultural forms are entirely absent from source [1]** — no mention of *lifela* migrant
  workers' poetry, the Basotho blanket, or *mokorotlo*. `[NEEDS SOURCE]`. **Lifela in particular is
  poetry composed by migrant mineworkers** `[NEEDS SOURCE]` — **if that holds it is an oral form
  created by labour migration to South African mines, which connects Lesotho's culture directly to the
  history the app already tells.**

---

## 🔴 Literature & voices — the first novel in an African language

| Writer | Work | Year | Language | Source |
|---|---|---|---|---|
| **Thomas Mokopu Mofolo** (1876–1948) | ***Moeti oa Bochabela*** (*The Traveller of the East*) — **"widely accepted as the first novel published in an African language"** | **1907** | **Sesotho** | [4] |
| Thomas Mofolo | ***Chaka*** — a fictional retelling of the rise and fall of the Zulu king **Shaka**; "the classic on which his reputation rests" | **1925** | **Sesotho** | [4] |

🔴 **Source [4]: Mofolo "is often regarded as the first African novelist, and the greatest author to
write one in an African language."** Born in Kojane, Basutoland; educated in Paris Evangelical
Missionary Society schools; teacher's certificate in 1898; worked as **manuscript reader, proofreader
and secretary at the Sesotho Book Depot in Morija**, where his employers encouraged him to write [4].

**Why this is the most important finding in the folder for Ubuntu Heritage.**

1. **The first novel in any African language was written in Sesotho** [4] — **and the app already
   speaks Sesotho** (`st`). Every other major literary find in this research is in a language the app
   does not have: Ge'ez, Amharic, Arabic, Swahili, Gikuyu, Yoruba. **This one is not.**
2. ***Chaka* (1925) predates the publication of *Mhudi* (1930)** — and both are African-authored
   narratives of the Mfecane period. **Plaatje wrote the Barolong survivors' view in English; Mofolo
   wrote Shaka himself, in Sesotho, five years earlier.** **These two books belong side by side in
   this app**, and Ubuntu Heritage currently carries only one of them.
3. **Source [4]: the success of *Moeti oa Bochabela* "prompted other young teachers to try their hand
   at fiction writing, thus launching one of the earliest literary movements in sub-Saharan Africa."**
   **A literary movement, in an African language, starting in 1907.**
4. ⚠️ **And the complication the project's rules require keeping**: Mofolo was employed by a
   **missionary press**, and *Moeti oa Bochabela* is described as a **Christian allegory** [4]. **The
   first novel in an African language was produced inside a mission publishing house.** That is not a
   reason to discount it — it is the actual, complicated circumstance in which written African-language
   literature began, and flattening it either way would be dishonest.

**Recommendation:** `reviewedContent` is `false` for `st` in
[`languages.ts`](../app/src/i18n/languages.ts). **Mofolo is the obvious route to changing that** — a
public-domain-era Sesotho canon by a named author, in a language the app renders. **This is the
strongest concrete proposal this entire research has produced.**

---

## Heritage & sites

⚠️ **Not researched.** Source [1] names no World Heritage site and no list page was fetched.
**Maloti-Drakensberg** was searched for and not returned; it is **shared with South Africa**
`[NEEDS SOURCE]` and would carry **San rock art** — connecting to the rock-art thread running through
Algeria, Libya, Chad and Malawi ([`mw-malawi.md`](mw-malawi.md)).

---

## Open questions

- [ ] 🔴 **Mofolo — *Chaka* and *Moeti oa Bochabela*.** Editions, translations, rights status. **Then
      propose it as Sesotho content for the app.** The highest-value action item in the folder.
- [ ] 🔴 **The three deleted anthem verses** on Basotho custom. **Find out what they said.**
- [ ] 🔴 **Resolve Lesotho's official languages** — two or four? **If isiXhosa is official, update the
      app's `ls` entry.**
- [ ] ⚠️ **Moshoeshoe I and the Difaqane** — the counterpart to Botswana's account. Connect explicitly.
- [ ] **How Lesotho avoided incorporation into South Africa.** Absent from source [1]; it is why the
      country exists.
- [ ] ***Lifela*** — migrant mineworkers' poetry, if confirmed. Connects Lesotho to the app's existing
      South African material.
- [ ] **Heritage — the whole section**, starting with Maloti-Drakensberg and its rock art.

---

## Sources

1. Lesotho — Wikipedia. `en.wikipedia.org/wiki/Lesotho` — official languages (**inconsistently — see
   the note**), milestones from 1804 to 1996, Basutoland, independence, and the 99.7% Basotho figure.
2. Lesotho — nationalanthems.info. `nationalanthems.info/ls.htm` — the Sesotho title, the 1967 decree
   backdated to 1966, **the Swiss melody "Freiheit" of c. 1823**, François Coillard, and **the removal
   of the verses on traditional customs**.
3. *(reserved — no World Heritage source was fetched for Lesotho)*
4. Thomas Mofolo — surfaced via search across **Britannica**, **EBSCO Research Starters** (*Chaka*),
   Wikipedia, Encyclopedia.com, *The Journalist* (South Africa) and a SOAS repository entry on Sesotho
   literary aesthetics. **The Britannica and EBSCO entries are the strongest and should be read
   directly before this material is used.**
