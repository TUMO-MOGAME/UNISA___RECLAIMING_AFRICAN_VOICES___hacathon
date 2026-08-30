# Uganda

**ISO code:** `ug` · **Region:** Eastern Africa (UN M49)
**Researched by:** Tumo Olorato Mogame, with Claude · **Last updated:** 2026-08-30
**Status:** core research — languages, anthem, milestones and peoples sourced · literature and heritage empty

> **How this file is put together.** Built **claim by claim**: every row names the source it came
> from, and the numbered list at the bottom is what those names point at. Sources are
> encyclopaedia-grade — rough sources are fine at this stage ([README.md](README.md)), assertions made
> to a reader are not.

**What the app already has for Uganda:**

| | |
|---|---|
| Flag | ✅ `app/assets/flags/ug.png` |
| Country entry | ✅ listed in [`anthems.ts`](../app/src/content/anthems.ts) as `ug` |
| National anthem recording | ❌ none yet — `/countries` says so honestly |
| Language map (drives the language picker) | ❌ not mapped — technically possible (English); see below |

---

## Languages

| Language | Status | Also spoken in SA? | Source |
|---|---|---|---|
| **English** | **Official** | **Yes — `en`** | [1] |
| **Swahili** | **Official** | No | [1] |
| **Luganda** | Widely spoken — **the language of the largest group** | No | [1] |

⚠️ **Source [1] does not state how many languages Uganda has.**

**Official-language instrument:** `[NEEDS SOURCE]`.

**Languages Ubuntu Heritage does not have:** Swahili, Luganda, and every other Ugandan language.

🔴 **The fifth file to record Swahili as official or national** — after the DRC
([`cd-congo-drc.md`](cd-congo-drc.md)), Kenya ([`ke-kenya.md`](ke-kenya.md)), Rwanda
([`rw-rwanda.md`](rw-rwanda.md)) and Tanzania ([`tz-tanzania.md`](tz-tanzania.md)).

**Five countries. One language. The app does not have it.** This is no longer a research observation;
it is the clearest actionable finding in the whole folder, and it belongs in
[`specs/tasks.md`](../specs/tasks.md) as a proposal to extend
[`languages.ts`](../app/src/i18n/languages.ts) beyond the eleven.

⚠️ **Note the tension inside Uganda's own list.** Swahili is official [1], but **Luganda is the
language of the largest group** and widely spoken. `[NEEDS SOURCE]` — Swahili's status in Uganda has
been politically contested `[NEEDS SOURCE]`, unlike in Tanzania where it is the unquestioned national
language. **Do not present the five Swahili countries as identical cases.**

**`ug` is technically wirable** (`lead: "en"`) and would need the Zimbabwe-style honest comment, with
Swahili and Luganda named in `notYet`.

---

## National anthem

- **Title:** "Oh Uganda, Land of Beauty!" (English)
- **Adopted:** 9 October 1962 — independence day itself
- **Words and music by:** **George Wilberforce Kakoma** (both)
- **Recording we could use:** none sourced yet
- **Source:** [2]

> **The shortest national anthem in this folder, and among the shortest in the world** — source [2]:
> **nine bars**, "a factor that contributed significantly to its selection."
>
> **And it was written in a day** [2]: a selection committee ran a composition contest before
> independence; when the submissions proved inadequate, the chair asked **Kakoma** — a graduate of
> Trinity College of Music and Durham University — to write one, and **he produced the winning
> composition in a single day.**
>
> **A contest that failed, and then one musician in one day** [2]. Compare South Sudan's 49 writers and
> televised contest ([`ss-south-sudan.md`](ss-south-sudan.md)), Ghana's public lyric competition
> ([`gh-ghana.md`](gh-ghana.md)) and Malawi's ([`mw-malawi.md`](mw-malawi.md)). **Five countries in
> this folder chose their anthem by competition** — the method is much more common in Africa than the
> "handed down from the founders" framing suggests.

---

## Milestones

| Year | Milestone | One grounded line | Source |
|---|---|---|---|
| 1830s | Arab traders arrive | | [1] |
| 1877 | British Anglican missionaries reach **Buganda** | | [1] |
| 1879 | French Catholic missionaries arrive | | [1] |
| **1885** | **The Uganda Martyrs die** | | [1] |
| **1894** | **The Uganda Protectorate** | Established by Britain. | [1] |
| **1962 (9 Oct)** | **Independence from the United Kingdom** | With Queen Elizabeth II as head of state; a republic from 1963. | [1] |
| **1966** | **The Mengo Crisis** | Obote removes the **Kabaka**; conflict with the **Buganda kingdom**. | [1] |
| **1971** | **Idi Amin seizes power** | Military coup. | [1] |
| **1979** | **Amin's regime ends** | During the **Uganda–Tanzania War**. | [1] |
| 1986 | Museveni becomes president | After the Ugandan Bush War. | [1] |

**Framing notes.**

- 🔴 **Buganda is a kingdom that outlasted the country's independence, and then was abolished by it.**
  Source [1] records missionaries arriving *in Buganda* in 1877 — **seventeen years before the
  protectorate** — and the **1966 Mengo Crisis, in which the post-independence government removed the
  Kabaka** [1]. **An African kingdom overthrown not by a European empire but by the independent state
  that succeeded it.** That is a genuinely different shape from Burundi's monarchy abolished by
  referendum ([`bi-burundi.md`](bi-burundi.md)) or Rwanda's ([`rw-rwanda.md`](rw-rwanda.md)), and it
  complicates any simple account of independence as restoration. **Source [1] gives it one line.**
- ⚠️ **The Idi Amin period (1971–79) was extremely violent** `[NEEDS SOURCE]` — source [1] gives the
  dates and nothing else. As with the Derg ([`et-ethiopia.md`](et-ethiopia.md)), Macías
  ([`gq-equatorial-guinea.md`](gq-equatorial-guinea.md)) and Banda ([`mw-malawi.md`](mw-malawi.md)),
  **the neutral date-list is a false account.** Source properly or leave out.
  ⚠️ **And Amin is the one thing many readers already "know" about Uganda** — which is a reason to
  lead with Buganda, not with him.
- ⚠️ **The Lord's Resistance Army is absent from source [1]'s milestones** — searched for and not
  returned. **A conflict that displaced large parts of northern Uganda into the 2000s is not in this
  timeline**, and a published version must not stop at 1986.
- **Uganda's ethnic table has 37.1% "others"** [1] — the largest unnamed share in the folder after
  Angola's 30% ([`ao-angola.md`](ao-angola.md)).

---

## Peoples & cultures

**2024 census** [1] — among the most recent data in the folder:

| Group | Share |
|---|---|
| **Baganda** | 15.3% |
| Banyankole | 9.1% |
| Basoga | 8.1% |
| Iteso | 6.8% |
| Bakiga | 6.4% |
| Langi | 5.9% |
| Bagisu | 4.5% |
| **Acholi** | 4.2% |
| Lugbara | 2.6% |
| **Others** | **37.1%** |

- **No group exceeds 16%** [1] — the most evenly distributed country in this research, and 37.1% of
  the population is not named at all.
- **The Baganda are the people of the Buganda kingdom** and speak Luganda [1].
- **The Acholi and Langi are Luo-speaking peoples** `[NEEDS SOURCE]`, connecting to South Sudan
  ([`ss-south-sudan.md`](ss-south-sudan.md)) and Kenya ([`ke-kenya.md`](ke-kenya.md)) — **the Luo
  language group spans three files.**

---

## Literature & voices

⚠️ **Genuinely empty.** Source [1] names no writer or work, and no literature search was run in this
pass. **A gap in the research, not a fact about the country.**

`[NEEDS SOURCE]` — **Okot p'Bitek's *Song of Lawino*** is the obvious starting point: a long poem
**written first in Acholi and then translated by its own author into English** `[NEEDS SOURCE]`.
**Verify — because if that holds it is one of the most important works in Africa for this project's
argument**, sitting exactly beside Ngũgĩ's switch to Gikuyu ([`ke-kenya.md`](ke-kenya.md)) and
Vilakazi's isiZulu poetry. **A named priority, not a vague gap.**

---

## Heritage & sites

⚠️ **Not researched.** Source [1] names no World Heritage site and no list page was fetched.

`[NEEDS SOURCE]` — the **Kasubi Tombs**, the burial site of the Kabakas of Buganda, were searched for
and **not returned by source [1]**. They are the obvious candidate, and they would tie the heritage
section directly to the Buganda material above. **The tombs were damaged by fire in 2010**
`[NEEDS SOURCE]` — verify.

---

## Open questions

- [ ] 🔴 **Okot p'Bitek and *Song of Lawino*** — potentially one of the most important works in this
      folder for the project's argument. **Top priority.**
- [ ] 🔴 **Swahili as the app's twelfth language.** Five files now. Make it a task.
- [ ] 🔴 **Buganda** — a kingdom with a Kabaka, removed in 1966 by an independent African government.
      One line in source [1].
- [ ] ⚠️ **The Amin period**, sourced properly — and not made the headline.
- [ ] ⚠️ **The Lord's Resistance Army** and northern Uganda. Absent from source [1]; a published
      timeline cannot stop at 1986.
- [ ] **Heritage — the whole section**, starting with the Kasubi Tombs.
- [ ] **How many languages Uganda has** — source [1] does not say.
- [ ] ⚠️ **Swahili's contested status in Uganda** — do not flatten the five Swahili countries into one
      case.

---

## Sources

1. Uganda — Wikipedia. `en.wikipedia.org/wiki/Uganda` — English and Swahili as official, Luganda,
   milestones from the 1830s to 1986, independence, **the Mengo Crisis**, and the 2024 census figures.
2. Uganda — nationalanthems.info. `nationalanthems.info/ug.htm` — "Oh Uganda, Land of Beauty!", the
   1962 adoption, **George Wilberforce Kakoma writing it in a single day**, and **the nine-bar length**.
3. *(reserved — no World Heritage source was fetched for Uganda)*
4. *(reserved — no literature search was run for Uganda; see Open questions, Okot p'Bitek is the
   priority)*
