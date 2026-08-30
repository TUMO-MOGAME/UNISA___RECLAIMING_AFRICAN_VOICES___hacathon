# Cameroon

**ISO code:** `cm` · **Region:** Middle (Central) Africa (UN M49)
**Researched by:** Tumo Olorato Mogame, with Claude · **Last updated:** 2026-08-30
**Status:** core research — languages, anthem, milestones, peoples and literature sourced · heritage partial

> **How this file is put together.** Built **claim by claim**: every row names the source it came
> from, and the numbered list at the bottom is what those names point at. Sources are
> encyclopaedia-grade — rough sources are fine at this stage ([README.md](README.md)), assertions made
> to a reader are not.
>
> ⚠️ **Cameroon's language question is an armed conflict**, not a policy debate. See the Anglophone
> crisis below. Nothing in this file should be written as though "bilingual country" were a neutral
> fact.

**What the app already has for Cameroon:**

| | |
|---|---|
| Flag | ✅ `app/assets/flags/cm.png` |
| Country entry | ✅ listed in [`anthems.ts`](../app/src/content/anthems.ts) as `cm` |
| National anthem recording | ❌ none yet — and **there are two official versions**; see below |
| Language map (drives the language picker) | ❌ not mapped — technically possible (English) and **politically loaded**; see below |

---

## Languages

| Language | Status | Also spoken in SA? | Source |
|---|---|---|---|
| **French** | **Official** | No | [1] |
| **English** | **Official** | **Yes — `en`** | [1] |
| **250 native languages** | Spoken by a population of nearly 31 million | No | [1] |

**Official-language instrument:** `[NEEDS SOURCE]`.

**Languages Ubuntu Heritage does not have:** all 250 indigenous ones, and French.

⚠️ **This is the one country in the folder where wiring the app's language data could be read as taking
a political side.** English and French are both official [1] — and **since 2016 the English-speaking
Northwest and Southwest regions have been in open conflict with the state**, escalating in September
2017 into "a guerilla war for the independence of the Anglophone region as the Federal Republic of
Ambazonia" [1].

An entry saying `lead: "en"` would be defensible on the app's usual logic (English is official; the app
speaks it) and would nonetheless be **a statement about which half of a country at war with itself the
app leads with**. **Recommendation: leave `cm` unmapped, and record the reason in the data comment
rather than in silence.** The flat fallback list is the honest default — exactly as
[`country-languages.ts`](../app/src/content/country-languages.ts) already argues.

**250 languages** [1] puts Cameroon second only to Nigeria's 525 ([`ng-nigeria.md`](ng-nigeria.md)) in
this research, and source [1] names **none of them** — a striking omission when it names the two
European ones in the header.

---

## National anthem

- **Title (own language):** *Ô Cameroun, Berceau de nos Ancêtres* (French)
- **Title (English):** "O Cameroon, Cradle of Our Forefathers"
- **Adopted:** composed **1928**; unofficial from **1948**; **official 1957**; lyrics revised **1978**
- **French words by:** René Djam Afame, Samuel Minkio Bamba and Moïse Nyatte Nko'o
- **English words by:** **Dr Bernard Nsokika Fonlon**
- **Music by:** René Djam Afame
- **Recording we could use:** none sourced yet
- **Source:** [2]

> **Two sets of official lyrics, in two languages, with "slight variations between the two versions"**
> [2]. Most countries in this folder have one anthem text; Cameroon has two, because it has two
> official languages — and, per source [1], a war over exactly that arrangement.
>
> **This is the most directly relevant anthem in the folder for Ubuntu Heritage's own design problem.**
> The app's whole language layer exists to avoid presenting a translation as the original. Cameroon
> has a national song where **neither version is the translation** — both are official, and they do
> not say quite the same thing. If the app ever plays Cameroon's anthem, **it must say which version**,
> and that choice is not neutral.
>
> **Composed in 1928, unofficial from 1948, official in 1957** [2] — the anthem predates the country's
> independence by decades, like Liberia's ([`lr-liberia.md`](lr-liberia.md)).

---

## Milestones

| Year | Milestone | One grounded line | Source |
|---|---|---|---|
| **1884** | **Kamerun** | The German Empire claims the territory as a colony. | [1] |
| **1919** | **Partition** | After the First World War, Kamerun becomes a League of Nations mandate and is **split into French and British Cameroon**. | [1] |
| 1928 | The anthem composed | | [2] |
| 1957 | Autonomous republic status within France | The anthem becomes official. | [2] |
| **1960 (1 Jan)** | **French Cameroun independent** | As the Republic of Cameroon. | [1] |
| **1961 (1 Oct)** | **British Southern Cameroons independent** | And **merged into the Republic** to form the Federal Republic of Cameroon. | [1] |
| **1972 (20 May)** | **The federation abolished** | A referendum creates the United Republic. | [1] |
| 1982 (4 Nov) | Ahidjo steps down | Power passes to Paul Biya. | [1] |
| 1990 (Dec) | Multi-party politics reintroduced | | [1] |
| **2016 (Nov)** | **The Anglophone crisis begins** | Protests from the Northwest and Southwest regions. | [1] |
| **2017 (Sep)** | **Guerrilla war declared** | Separatists fight for independence as the **Federal Republic of Ambazonia**. | [1] |
| 2021 (Dec) | Displacement | More than 30,000 people flee northern Cameroon into Chad after ethnic clashes. | [1] |

**Framing notes.**

- ⚠️ **The Anglophone crisis is ongoing and people are dying in it** [1]. It is not "a language
  debate". Write about it in the past tense at your peril, and do not use it as an interesting example
  of multilingualism.
- **1919 is the root.** Germany's colony was divided between two other empires after a European war
  [1] — the same thing that happened to Togo in 1916 ([`tg-togo.md`](tg-togo.md)), which was **also**
  German. **Two files in this folder describe the same partition of the same German empire**, and both
  countries still carry the consequences. Togo's Ewe were split; Cameroon's Anglophone regions are at
  war.
- **1972 abolished the federal system** that had joined the two Cameroons eleven years earlier [1].
  The 2017 separatists are, in effect, contesting that referendum.
- **Cameroon was colonised by three European powers in sequence** — German, then French and British
  simultaneously [1]. Like Togo, it is a clean demonstration that these borders record European
  history, not African.

---

## Peoples & cultures

**2022 data** [1] — one of the most detailed breakdowns in the folder:

| Group | Share |
|---|---|
| Bamileke, Bamun | 22.2% |
| Biu-Mandara | 16.4% |
| Shuwa Arab, Hausa, Kanuri | 13.5% |
| Beti-Bassa | 13.1% |
| Fulani | 12.0% |
| Tikar | 9.9% |
| Adamawa-Ubangi (Mbum-Gbaya) | 9.8% |
| Sawa | 4.6% |
| Southwest Bantu | 4.3% |
| **Pygmy peoples** | **2.3%** |
| Others / foreigners | 3.8% |

- ⚠️ **"Pygmy peoples" is source [1]'s term and it should not be reproduced uncritically.** It is an
  exonym applied to several distinct forest peoples — Baka, Bakola, Bedzan and others — many of whom
  reject it `[NEEDS SOURCE]`. **Ubuntu Heritage must find and use the peoples' own names**, exactly as
  the app's language registry puts the endonym first rather than an English label. This is the same
  principle, applied to a people rather than a language.
- **Hausa, Kanuri and Fulani reach here from West Africa** ([`ng-nigeria.md`](ng-nigeria.md),
  [`ne-niger.md`](ne-niger.md)) — Cameroon is where the West African and Central African files meet.
- **"Southwest Bantu" (4.3%)** [1] marks the northern edge of the Bantu-speaking world that runs south
  to the app's own eleven languages. `[NEEDS SOURCE]`, but Cameroon is widely held to be near the
  **origin point of the Bantu expansion** — which, if confirmed, makes this country directly relevant
  to the Atlas material the app already carries on the peopling of Southern Africa. **Worth real
  research effort.**

---

## Literature & voices

| Writer | Work | Year | Language | Source |
|---|---|---|---|---|
| **Ferdinand Oyono** (1929–2010) | ***Une vie de boy*** (*Houseboy*) — the tragicomic story of a coloniser's houseboy whose innocence leads to his death after he sees the inner workings of French colonial culture | **1956** | French | [4] |
| **Mongo Beti** (1932–2001) | anti-colonial novels | from **1954** | French | [4] |
| Benjamin Matip | anti-colonial novels | from 1954 | French | [4] |
| **Calixthe Beyala** | *Your Name Shall Be Tanga* — and novels on the lives of African immigrants in France | **1988** | French | [4] |

**Source [4]:** Beti, Oyono and Matip **published eight anti-colonial novels from 1954** — writers who
after the Second World War "analysed and criticised colonialism and **rejected assimilation**".

**That date is the point.** *Une vie de boy* appeared in **1956** — four years before independence,
inside the French empire, and it is about the empire seen from below by a servant. **Publishing an
anti-colonial novel while still colonised is the same act as Plaatje's *Mhudi* and Hazoumé's
*Doguicimi* (1938, [`bj-benin.md`](bj-benin.md))** — and Cameroon produced eight of them in a decade.

**"Rejected assimilation"** [4] is worth keeping as a phrase. French colonial doctrine held out
assimilation — becoming French — as the reward for education. These writers used the education and
refused the reward. **Compare Senghor's Négritude ([`sn-senegal.md`](sn-senegal.md)), which is the
same refusal argued positively.**

**Calixthe Beyala writes the other direction of the same story** [4] — Africans living in France
rather than France living in Africa.

---

## Heritage & sites

| Site | Inscribed | Type | What it is |
|---|---|---|---|
| **Dja Faunal Reserve** | **1987** | Natural | **Cameroon's first World Heritage Site** [1] |

⚠️ **Only one site is named by source [1], and Cameroon's own World Heritage list was not fetched.**
There are likely more. This section is incomplete rather than complete-and-short.

---

## Open questions

- [ ] ⚠️ **Decide and record the app's position on `cm`.** Recommendation above is to leave it unmapped
      and say why in the data. That decision should be explicit, not accidental.
- [ ] 🔴 **The Bantu expansion's origin in the Cameroon–Nigeria borderlands.** If it holds, this file
      connects directly to the app's existing Atlas content on the peopling of Southern Africa — the
      strongest link yet between Central Africa and what Ubuntu Heritage already ships.
- [ ] ⚠️ **Replace "Pygmy peoples" with the peoples' own names** — Baka, Bakola, Bedzan and others.
      Same principle as endonyms in the language registry.
- [ ] **Cameroon's full World Heritage list** — not fetched.
- [ ] **Which of the 250 languages are actually spoken most**, and by whom. Source [1] names none.
- [ ] **Both anthem texts.** If the app ever uses one, it needs both and a stated reason for its
      choice.
- [ ] **Titles and dates for Mongo Beti's novels** — he is named with no work at all.
- [ ] **The Anglophone crisis, from a current news-grade source.** Nothing here should be published
      about it on the strength of an encyclopaedia summary.

---

## Sources

1. Cameroon — Wikipedia. `en.wikipedia.org/wiki/Cameroon` — the two official languages and **the 250
   native languages**, the German/French/British colonial sequence, the two independence dates, the
   1972 referendum, **the Anglophone crisis and Ambazonia**, 2022 ethnic figures, Dja Faunal Reserve.
2. Cameroon — nationalanthems.info. `nationalanthems.info/cm.htm` — anthem titles, the 1928 composition
   and 1957 adoption, **the separate French and English lyrics**, and the 1978 revision.
3. *(reserved — Cameroon's World Heritage list was not fetched)*
4. Cameroonian literature — surfaced via search across Wikipedia (Ferdinand Oyono; Calixthe Beyala;
   Literature of Cameroon), **SciELO South Africa** ("Writing in Cameroon, the first hundred years")
   and Bakwa Magazine. The SciELO article is the strongest source here and should be read directly.
