# South Sudan

**ISO code:** `ss` (country) · **Region:** Eastern Africa (UN M49)
**Researched by:** Tumo Olorato Mogame, with Claude · **Last updated:** 2026-08-30
**Status:** core research — languages, anthem, milestones and peoples sourced · literature and heritage empty

> ⚠️ **READ THE CODE CAREFULLY.** `ss` here is **South Sudan, the country** (ISO 3166-1). In
> [`app/src/i18n/languages.ts`](../app/src/i18n/languages.ts), `ss` is **siSwati** (ISO 639).
> Unrelated, and they collide. One of the three collisions named in
> [README.md](README.md#one-more-trap-iso-country-codes-collide-with-language-codes), with `tn`
> ([`tn-tunisia.md`](tn-tunisia.md)) and `st` ([`st-sao-tome-and-principe.md`](st-sao-tome-and-principe.md)).

> **How this file is put together.** Built **claim by claim**: every row names the source it came
> from, and the numbered list at the bottom is what those names point at. Sources are
> encyclopaedia-grade — rough sources are fine at this stage ([README.md](README.md)), assertions made
> to a reader are not.
>
> ⚠️ **The youngest country in this folder, and it has been at war for much of its existence.** Nothing
> here should be written in the present tense without re-checking.

**What the app already has for South Sudan:**

| | |
|---|---|
| Flag | ✅ `app/assets/flags/ss.png` |
| Country entry | ✅ listed in [`anthems.ts`](../app/src/content/anthems.ts) as `ss` |
| National anthem recording | ❌ none yet — `/countries` says so honestly |
| Language map (drives the language picker) | ❌ not mapped — technically possible (English), **and the code collision makes it risky**; see below |

---

## Languages

| Language | Status | Also spoken in SA? | Source |
|---|---|---|---|
| **English** | **Official** | **Yes — `en`** | [1] |
| **Dinka** | Recognised national language — **the largest group** | No | [1] |
| **Nuer** | Recognised national language | No | [1] |
| **Bari** | Recognised national language | No | [1] |
| **Zande** | Recognised national language | No | [1] |
| **Murle · Ma'di · Otuho** | Recognised national languages | No | [1] |
| **Luo** (Anyuak, Acholi, Shilluk, Pari, Jur-Luo and others) | Recognised national languages | No | [1] |

Plus **around 60 other languages** [1].

**Official-language instrument:** `[NEEDS SOURCE]`.

**Languages Ubuntu Heritage does not have:** all the indigenous ones.

⚠️ **English is the sole official language of a country where it is nobody's mother tongue**
`[NEEDS SOURCE]` — and where roughly 70 languages are spoken [1]. The choice was made partly in
distinction from **Arabic**, the language of the state South Sudan separated from
([`sd-sudan.md`](sd-sudan.md)) `[NEEDS SOURCE]`. **If that holds, English here is not a colonial
inheritance but a deliberate post-independence choice against a neighbour's language** — a different
story from anywhere else in this folder, and worth getting right.

**`ss` is technically wirable** and carries **two** hazards: the usual misleading `lead: "en"`, and the
**siSwati code collision**. **Recommendation: leave unmapped**, and record both reasons.

**Luo connects to Kenya** ([`ke-kenya.md`](ke-kenya.md), 10.65%); **Zande to the Central African
Republic** ([`cf-central-african-republic.md`](cf-central-african-republic.md)).

---

## National anthem

- **Title:** "South Sudan Oyee!" — "South Sudan Hurray!"
- **Adopted:** **9 July 2011** — independence day itself
- **Words by:** **collectively — 49 writers submitted entries, and winners were chosen by televised
  competition** [2]
- **Music by:** **Mido Samuel and students from Juba University**
- **Recording we could use:** none sourced yet
- **Source:** [2]

> 🔴 **The most democratically authored anthem in this folder.** Source [2]: the **South Sudan National
> Anthem Committee solicited contributions from 49 writers** ahead of the January 2011 referendum;
> submissions had to incorporate **the nation's history, people, resources and independence struggle**;
> the winners were selected through a **televised competition**; and the lyrics were revised over
> several months, with a final version in March 2011.
>
> **A country wrote its national song before it was a country, by public contest, on television.**
> Compare Ghana's lyric contest ([`gh-ghana.md`](gh-ghana.md)), Malawi's competition
> ([`mw-malawi.md`](mw-malawi.md)) and Chad's schoolchildren ([`td-chad.md`](td-chad.md)) — but this
> is the fullest case, and **the music was written by a composer with university students**.
>
> **For a project about whose voices get recorded, an anthem with 49 named contributors and a student
> chorus behind it is a genuinely different object** from one written by a Spanish army officer
> ([`gq-equatorial-guinea.md`](gq-equatorial-guinea.md)) or a British expatriate
> ([`ng-nigeria.md`](ng-nigeria.md)).

---

## Milestones

| Year | Milestone | One grounded line | Source |
|---|---|---|---|
| 1972 | The first autonomous region | | [1] |
| **1983–2005** | **The Second Sudanese Civil War** | Twenty-two years. | [1] |
| 2005 | The Comprehensive Peace Agreement | A second autonomous region is formed. | [1] |
| **2011 (Jan)** | **The referendum** | **98.83% of those who took part voted for separation.** | [1] |
| **2011 (9 Jul)** | **Independence from Sudan** | | [1] |
| 2011 (14 Jul) | Joins the United Nations | As its **193rd member**. | [1] |
| ⚠️ **2013 (Dec)** | **Civil war** | Between President Kiir and Riek Machar — **two years after independence**. | [1] |
| 2015 (Aug) | A peace agreement | | [1] |
| 2018 (Aug) | A power-sharing agreement | | [1] |
| 2020 (20 Feb) | A peace deal | Machar sworn in as First Vice-President. | [1] |

**Framing notes.**

- **98.83%** [1]. One of the most decisive referendum results anywhere, and the reason this country
  exists. **State the figure with its source.**
- ⚠️ **Civil war two years after independence** [1] — the same shape as Angola, where it began
  immediately ([`ao-angola.md`](ao-angola.md)), and Mozambique, where it came two years after
  ([`mz-mozambique.md`](mz-mozambique.md)). **This folder has now documented it three times, and it is
  not a coincidence that needs a lazy explanation.** Do not reach for one; source it or leave it.
- 🔴 **South Sudan and Sudan are one story from two sides.** [`sd-sudan.md`](sd-sudan.md) records the
  2011 secession from the north's vantage and is itself now describing a country at war since 2023.
  **Neither file may treat the other as a footnote**, and the two must agree on 2011.
- ⚠️ **Source [1]'s milestones start in 1972.** Everything before — the Nilotic peoples' history, the
  first civil war from 1955, the Anglo-Egyptian period — is missing. **A timeline beginning at an
  autonomous region is a timeline that starts with the state, not the people.** For a project about
  heritage, that is the wrong end.

---

## Peoples & cultures

Source [1] names the major groups **and gives no percentages**: **Dinka** (largest), **Nuer**
(second), **Azande** (third), **Bari** (fourth).

- ⚠️ **No figures — invent none.**
- **The Dinka and Nuer are cattle-keeping Nilotic peoples with substantial oral traditions**
  `[NEEDS SOURCE]` — entirely absent from source [1]. **For this project that absence is the point:
  the encyclopaedia records the war between them and nothing of what they carry.**
- **The 2013 conflict is frequently narrated as Dinka-versus-Nuer** [1 gives Kiir and Machar by name,
  not by ethnicity] — ⚠️ **and this file should not add the ethnic framing that source [1] declines to
  use.** The same discipline as Rwanda and Burundi ([`rw-rwanda.md`](rw-rwanda.md),
  [`bi-burundi.md`](bi-burundi.md)).

---

## Literature & voices

⚠️ **Genuinely empty.** Source [1] names no writer or work, and no literature search was run in this
pass. **A gap in the research, not a fact about the country.**

**The one literary fact this file does hold is the anthem**: 49 writers, a televised contest, and
students at Juba University [2]. **That is a national literary event with names attached, and none of
the names are recorded here.** Finding them would be worth doing.

---

## Heritage & sites

⚠️ **Not researched.** Source [1] names no World Heritage site and no list page was fetched. South
Sudan is a very young state party `[NEEDS SOURCE]` and may have no inscriptions at all — **but that
must be checked rather than assumed.**

---

## Open questions

- [ ] ⚠️ **Pre-1972 history.** Source [1] gives none, and a heritage file cannot begin with an
      autonomous region.
- [ ] **Dinka and Nuer oral tradition** — the peoples are named, what they carry is not.
- [ ] **The 49 anthem writers** — a named national literary event with no names recorded.
- [ ] **Literature and heritage — both sections are empty.**
- [ ] ⚠️ **Why English?** If it was chosen against Arabic rather than inherited from Britain, that is a
      distinctive language-policy story and it needs a source.
- [ ] ⚠️ **Keep this file and [`sd-sudan.md`](sd-sudan.md) consistent on 2011.**
- [ ] ⚠️ **The `ss` collision** with siSwati — decide alongside `tn` and `st`.
- [ ] **Current situation** — the file's most perishable content.

---

## Sources

1. South Sudan — Wikipedia. `en.wikipedia.org/wiki/South_Sudan` — English as official and the
   recognised national languages, **the ~60 further languages**, milestones from 1972 to 2020, **the
   98.83% referendum result**, and the four largest ethnic groups.
2. South Sudan — nationalanthems.info. `nationalanthems.info/ss.htm` — "South Sudan Oyee!", the 9 July
   2011 adoption, **the 49-writer solicitation and televised contest**, and Mido Samuel with Juba
   University students.
3. *(reserved — no World Heritage source was fetched for South Sudan)*
4. *(reserved — no literature search was run for South Sudan)*
