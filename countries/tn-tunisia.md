# Tunisia

**ISO code:** `tn` (country) · **Region:** Northern Africa (UN M49)
**Researched by:** Tumo Olorato Mogame, with Claude · **Last updated:** 2026-08-30
**Status:** core research — languages (with instrument), anthem, milestones, literature and heritage sourced

> ⚠️ **READ THE CODE CAREFULLY.** `tn` here is **Tunisia, the country** (ISO 3166-1). In
> [`app/src/i18n/languages.ts`](../app/src/i18n/languages.ts), `tn` is **Setswana** (ISO 639). They are
> unrelated and they collide. Anything that reads a code out of this filename and hands it to the
> language layer will silently switch a reader into Setswana for Tunisia. See
> [README.md](README.md#one-more-trap-iso-country-codes-collide-with-language-codes).

> **How this file is put together.** Built **claim by claim**: every row names the source it came
> from, and the numbered list at the bottom is what those names point at. Sources are
> encyclopaedia-grade — rough sources are fine at this stage ([README.md](README.md)), assertions made
> to a reader are not.

**What the app already has for Tunisia:**

| | |
|---|---|
| Flag | ✅ `app/assets/flags/tn.png` |
| Country entry | ✅ listed in [`anthems.ts`](../app/src/content/anthems.ts) as `tn` |
| National anthem recording | ❌ none yet — `/countries` says so honestly |
| Language map (drives the language picker) | ❌ not mapped — and the code collision above makes this the **riskiest** country in the folder to wire |

---

## Languages

| Language | Status | Also spoken in SA? | Source |
|---|---|---|---|
| Modern Standard Arabic | **Official** — **Article 1 of the constitution** | No | [1] |
| Tunisian Arabic | Vernacular, most widely spoken | No | [1] |
| French | Used in administration and education; **no official status** | No | [1] |
| Jerba Berber · Matmata Berber | Minority languages | No | [1] |
| Judeo-Tunisian Arabic | Minority language | No | [1] |

**Official-language instrument:** **Article 1 of the constitution** [1] — named, like Libya's. This is
the standard the other files should reach.

**Languages Ubuntu Heritage does not have:** all of them.

**Judeo-Tunisian Arabic is the entry worth not skipping.** Source [1] lists it as a living minority
language, and source [1] separately records a Jewish population among "Jews and others" at 1%. A North
African Jewish language, still named in 2026, is exactly the kind of thing a heritage project loses by
rounding to "Arabic". Tunisia's greatest essayist was Tunisian Jewish (below).

**Same structural blocker as Burkina Faso** — see [`bf-burkina-faso.md`](bf-burkina-faso.md#languages)
— **plus** the `tn` collision above. If any country is going to break the language layer, it is this one.

---

## National anthem

- **Title (own language):** حماة الحمى — *Humat al-Hima*
- **Title (English):** "Defenders of the Homeland"
- **Adopted:** **25 July 1957**; **restored 7 November 1987**
- **Words by:** Mustafa Sadik al-Rafi'i and **Aboul-Qacem Echebbi**
- **Music by:** Mohamed Abdel Wahab
- **Recording we could use:** none sourced yet
- **Source:** [2]

> **The anthem and the literature section are the same story.** Source [2]: the lyric began in the
> 1930s as a **single verse by an Egyptian**, and **a Tunisian national poet later expanded it to
> three** — that poet is **Aboul-Qacem Echebbi**, who appears in Literature below and whose verse "O
> Defenders of the Homeland" gives the anthem its name [4]. He died in **1934, aged 25** [4].
>
> It served as an interim anthem after the monarchy was removed, and was **reintroduced in 1987
> because the anthem it replaced was too closely tied to Habib Bourguiba, who had just been deposed**
> [2]. Like Libya's, this is a national song that has been swapped out for political reasons and
> brought back — compare [`ly-libya.md`](ly-libya.md), which shares the **same composer**, Mohamed
> Abdel Wahab.

---

## Milestones

| Year | Milestone | One grounded line | Source |
|---|---|---|---|
| 12th c. BC | Phoenician settlement of the coast begins | | [1] |
| 9th c. BC | **Carthage founded** | | [1] |
| 146 BC | Carthage conquered by Rome | The territory is renamed the province of Africa — **the name the continent now carries**. | [1] |
| 670 AD | The Great Mosque of Kairouan built | Kairouan is described as one of the holiest cities of Islam. | [1], [3] |
| 800 | The Aghlabid dynasty | | [1] |
| 1546 | Ottoman control | | [1] |
| 1881 (12 May) | The French protectorate | | [1] |
| 1956 (20 Mar) | Independence from France | | [1] |
| 1957 (25 Jul) | The republic declared | The anthem is adopted the same day. | [1], [2] |
| 2011 (14 Jan) | **The Tunisian Revolution** | President Ben Ali flees; the uprising that began the Arab Spring. | [1] |

**Framing notes.**

- **"Africa" is a Roman administrative name given to conquered Carthage** [1]. The continent this
  entire project is about carries, as its name, a label applied by an empire to a defeated African
  city. That is not a fun fact — it is the thesis of the whole `countries/` folder in one line, and it
  belongs somewhere prominent in Ubuntu Heritage.
- **2011 started here.** Source [1] dates the revolution to 14 January 2011; Algeria's and Egypt's
  entries both record Arab Spring events following it ([`dz-algeria.md`](dz-algeria.md),
  [`eg-egypt.md`](eg-egypt.md)). These three files should cross-reference rather than each telling it
  as a national event.
- **The ethnic figures (98% Arab) are the least plausible in the folder.** See below.

---

## Peoples & cultures

Source [1] gives: **Arabs 98% · Berbers 1% · Jews and others 1%**.

⚠️ **Treat this table as a claim about official categories, not about ancestry.** A 98% figure in a
country whose own language list includes two living Berber languages and a Judeo-Tunisian language
[1] is describing how people are *counted*, not who they descend from. Across the Maghreb, Arab and
Amazigh identity is a political question — the same warning is on
[`dz-algeria.md`](dz-algeria.md) and [`ma-morocco.md`](ma-morocco.md), where Morocco's *language*
figures show ~25% Berber-speaking. **Use language data, not ethnic percentages.**

- **Djerba** — an island whose settlement pattern developed around the 9th century, inscribed in 2023
  [3]; historically home to one of the oldest Jewish communities in Africa `[NEEDS SOURCE]`.
- **Kairouan** — "one of the holiest cities of Islam" [3].

---

## Literature & voices

| Writer | Work | Year | Language | Source |
|---|---|---|---|---|
| Aboul-Qacem Echebbi (1909–1934) | poetry on nature, love, revolution and nationalism; first published in Cairo in the 1930s. Wrote verses of the **national anthem** | 1930s | Arabic | [4], [2] |
| Mahmoud Messadi (1911–2004) | *The Dam* (*Al-Sudd*) · ***Thus Spoke Abu Huraira*** — voted **no. 9 in the Arab Writers' Union list of Arabic books of the 20th century** | 1930s | Arabic | [4] |
| Albert Memmi (1920–2020) | ***Portrait du colonisé*** (*The Colonizer and the Colonized*) — sociological | `[NEEDS year]` | French | [4] |
| Albert Memmi | *La Statue de sel* (*Pillar of Salt*) · *Strangers* — autobiographical novels | 1950s | French | [4] |

**Albert Memmi is the most directly useful writer this research has found for Ubuntu Heritage's
actual argument.** *The Colonizer and the Colonized* is a foundational text of decolonisation — it
analyses what colonial rule does to the mind of both parties. That is the intellectual frame behind
Sankara's "psychological independence" in [`bf-burkina-faso.md`](bf-burkina-faso.md) and behind the
whole "reclaiming African voices" brief this project was built for. **Memmi was Tunisian Jewish and
wrote in French** [4] — the canon's most important anti-colonial theorist was a minority writing in
the coloniser's language, which is a complication worth keeping rather than smoothing.

**Echebbi died at 25 and is on the banknotes** [4]. A poet who is national currency and national
anthem at once — there is no better illustration of the claim that literature *is* infrastructure,
which is precisely what this project asserts about Plaatje, Mqhayi, Mutwa and Vilakazi.

---

## Heritage & sites

**Ten** UNESCO World Heritage Sites — the largest count in the folder so far [3]:

| Site | Inscribed | Type | What it is |
|---|---|---|---|
| Medina of Tunis | 1979 | Cultural | "One of the wealthiest cities of the Islamic world" |
| Archaeological Site of Carthage | 1979 | Cultural | The Phoenician trading empire; remains from several periods |
| Amphitheatre of El Jem | 1979 | Cultural | **North Africa's largest amphitheatre** |
| Ichkeul National Park | 1980 | **Natural** | Wetland for migratory birds; **was on the danger list 1996–2006** |
| Punic Town of Kerkuane | 1985 | Cultural | Never rebuilt after its destruction — a Phoenicio-Punic town plan preserved intact |
| Medina of Sousse | 1988 | Cultural | Medina, ribat and mosques |
| Kairouan | 1988 | Cultural | "One of the holiest cities of Islam" |
| Dougga / Thugga | 1997 | Cultural | Roman town with **multilingual inscriptions** from the empire's fringe |
| Djerba | 2023 | Cultural | Island settlement pattern from around the 9th century |
| Village of Sidi Bou Saïd | 2026 | Cultural | Coastal village; mixed architecture and spiritual significance |

Fifteen further properties sit on the tentative list [3].

- **Kerkuane is rare and worth the emphasis** — a Punic town that Rome never built over, so what
  survives is Carthaginian urban planning rather than a Roman layer on top of it. Almost everything
  else known about Carthage is known through its conquerors.
- **Dougga's multilingual inscriptions** [3] are a literal record of languages in contact at an
  imperial edge — the same phenomenon Botswana's file records in Setswana's Khoisan loanwords
  ([`bw-botswana.md`](bw-botswana.md)).
- **Ichkeul came off the danger list in 2006** — pair it with Ghadamès in [`ly-libya.md`](ly-libya.md)
  as evidence that danger-listing is not a one-way door.

---

## Open questions

- [ ] ⚠️ **Decide how the app handles the `tn` collision** before any country→language wiring is
      extended. This file is the test case.
- [ ] **Publication years** for Memmi's *Portrait du colonisé* and Messadi's works.
- [ ] **The Jewish communities of Djerba and Tunis** — named obliquely in three sources here and
      described in none.
- [ ] **The 98% Arab figure** needs either a real census citation with its methodology, or removal.
- [ ] **Echebbi's poems by title.** Source [4] gives themes and the anthem verses but not a single
      poem's name.
- [ ] **An anthem recording**, and whether source [2]'s audio is licensed.
- [ ] **Cross-file:** write the Arab Spring once, across `tn` / `eg` / `dz` / `ly`, rather than four
      times.

---

## Sources

1. Tunisia — Wikipedia. `en.wikipedia.org/wiki/Tunisia` — official language **with the Article 1
   citation**, the minority languages, milestones, independence, ethnic percentages.
2. Tunisia — nationalanthems.info. `nationalanthems.info/tn.htm` — anthem titles, the 1957 adoption
   and 1987 restoration, lyricists, composer, and the Bourguiba context.
3. List of World Heritage Sites in Tunisia — Wikipedia.
   `en.wikipedia.org/wiki/List_of_World_Heritage_Sites_in_Tunisia` — ten sites, years, types, and
   Ichkeul's danger-listing dates.
4. Tunisian literature — surfaced via search across Wikipedia (Aboul-Qacem Echebbi; Mahmoud Messadi;
   Albert Memmi; List of Tunisian writers), **Britannica** (Memmi) and **ARABLIT**. The Britannica and
   Wikipedia biographical entries are the checkable ones.
