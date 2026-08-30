# Mauritius

**ISO code:** `mu` · **Region:** Eastern Africa (UN M49)
**Researched by:** Tumo Olorato Mogame, with Claude · **Last updated:** 2026-08-30
**Status:** core research — languages, anthem, milestones, peoples and heritage sourced · literature partial

> **How this file is put together.** Built **claim by claim**: every row names the source it came
> from, and the numbered list at the bottom is what those names point at. Sources are
> encyclopaedia-grade — rough sources are fine at this stage ([README.md](README.md)), assertions made
> to a reader are not.

**What the app already has for Mauritius:**

| | |
|---|---|
| Flag | ✅ `app/assets/flags/mu.png` |
| Country entry | ✅ listed in [`anthems.ts`](../app/src/content/anthems.ts) as `mu` |
| National anthem recording | ❌ none yet — `/countries` says so honestly |
| Language map (drives the language picker) | ❌ not mapped — **and Mauritius has no *de jure* official language at all**; see below |

---

## 🔴 Languages — no official language in law, and one everybody speaks

| Language | Status | Speakers (2022, home language) | Also spoken in SA? | Source |
|---|---|---|---|---|
| **Mauritian Creole** | **No official status** | **90.0%** | No | [1] |
| Bhojpuri | No official status | 5.1% | No | [1] |
| French | ***De facto* official** | 4.4% | No | [1] |
| English | ***De facto* official** | **0.6%** | Yes — `en` | [1] |

⚠️ **Source [1]: there is no *de jure* official language.** English and French are official **in
practice only**.

**Official-language instrument:** ⚠️ **None exists**, per source [1]. `[NEEDS SOURCE]` to confirm.

**Languages Ubuntu Heritage does not have:** Mauritian Creole, Bhojpuri, French.

🔴 **English is the de facto language of government and 0.6% of people speak it at home** [1].
**Mauritian Creole is spoken by 90% and has no legal status at all.**

**That 0.6% figure is the most extreme official-≠-spoken number in this entire folder** — worse than
Equatorial Guinea's three European official languages against 85.7% Fang
([`gq-equatorial-guinea.md`](gq-equatorial-guinea.md)), and the mirror image of Sierra Leone, where
Krio reaches 97% with no status ([`sl-sierra-leone.md`](sl-sierra-leone.md)).

⚠️ **This is why `mu` must not be wired with `lead: "en"`.** It would be technically true, and it would
tell a reader that Mauritius is an English-speaking country. **It is not.** The honest entry is no
entry — record the reason in the data.

**The folder's creole count reaches ten with Mauritian Creole** — and **still only Sango holds full
official status** ([`cf-central-african-republic.md`](cf-central-african-republic.md)).

---

## National anthem

- **Title:** "Motherland" (English)
- **Adopted:** 12 March 1968 — independence day
- **Words by:** Jean Georges Prosper
- **Music by:** **Philippe Gentil**, a member of the **Mauritius Police Force band**
- **Recording we could use:** none sourced yet
- **Source:** [2]

> ⚠️ **The composer was misattributed in print.** Source [2]: when the composition was published in a
> national newspaper, **band master Philippe Oh San was incorrectly credited**, though Gentil wrote it.
>
> **A small item, and exactly the kind this project should care about.** Ubuntu Heritage's whole
> argument is that attribution matters — that Hampâté Bâ's sentence became an anonymous "African
> proverb" ([`ml-mali.md`](ml-mali.md)), that Kenya's only named writer in an encyclopaedia is a
> Danish settler ([`ke-kenya.md`](ke-kenya.md)). **Here a national anthem's composer was printed under
> someone else's name.** Getting Gentil's credit right in this file is a very small instance of the
> thing the whole project is for.
>
> **The anthem is in English** [2] — the language 0.6% of the country speaks at home [1].

---

## Milestones

| Year | Milestone | One grounded line | Source |
|---|---|---|---|
| late 10th c. | **First recorded visit** | By Arab sailors — **the island was uninhabited**. | [1] |
| 1507 | Portuguese sailors visit | Still uninhabited. | [1] |
| 1598 | **Named "Mauritius"** | By the Dutch, after Prince Maurice of Nassau. | [1] |
| **1715** | **France takes control** | Renaming it *Isle de France*. | [1] |
| **1715–1810** | **Enslaved people brought from Mozambique and Zanzibar** | The population rises from 15,000 to 49,000 in thirty years; **60,000 enslaved people by the early 19th century**. | [1] |
| 1810 (20–27 Aug) | Britain seizes the island | At the Battle of Grand Port. | [1] |
| **1833–1921** | **Abolition, then indenture** | **Around half a million indentured labourers** arrive from India, 1834–1921, to work the sugar estates. | [1] |
| **1965** | **The Chagos Archipelago excised** | Removed from Mauritius to form the British Indian Ocean Territory. | [1] |
| **1968 (12 Mar)** | **Independence from the United Kingdom** | Sir Seewoosagur Ramgoolam becomes first Prime Minister. | [1] |
| **1973** | **Malaria-free** | **The first country in Africa** to be declared so. | [1] |
| 1992 (12 Mar) | A republic | | [1] |
| **2025 (May)** | **A bilateral agreement on Chagos sovereignty signed** | | [1] |

**Framing notes.**

- 🔴 **Mauritius is the second country in this folder that was uninhabited before European contact**,
  after São Tomé and Príncipe ([`st-sao-tome-and-principe.md`](st-sao-tome-and-principe.md)). **Both
  populations were assembled by force and by contract**, and in both cases the creole language is the
  thing the population made for itself. **Written together, these two files say something no single
  country's history can**: that some African nations have no precolonial past to reclaim, and are not
  less African for it.
- 🔴 **Two coercive labour systems, back to back** [1] — **enslavement from Mozambique and Zanzibar
  under the French**, then **half a million indentured Indians after abolition**. Source [1] gives the
  sequence plainly. **Aapravasi Ghat, the World Heritage site below, is where the second system's
  people arrived**; Le Morne is associated with the first. **Both are inscribed. Both must be told.**
- ⚠️ **The Chagos Archipelago is a live sovereignty dispute** [1]: excised in 1965, agreement signed
  May 2025. **The Chagossians were forcibly removed** `[NEEDS SOURCE]` — source [1] does not say so,
  and the omission is significant. **Handle exactly as Western Sahara
  ([`ma-morocco.md`](ma-morocco.md)) and Mayotte ([`km-comoros.md`](km-comoros.md))**: say it is
  disputed, name the parties, and get a proper source before saying anything about the people who
  lived there. **Three sovereignty disputes now sit in this folder and the app needs one policy.**
- **1973's malaria certification** [1] — Cabo Verde was the *third* African country to be certified
  malaria-free, in 2024 ([`cv-cabo-verde.md`](cv-cabo-verde.md)). **Mauritius was the first, fifty-one
  years earlier.**

---

## Peoples & cultures

**Ethnic groups** [1]: **Indian 67% · Creole 28% · Chinese 3% · French 2%**

**Religion (2022)** [1]: **Hinduism 47.9% · Christianity 32.3% · Islam 18.2% · other/none 1.6%**

- 🔴 **The only Hindu-majority country in this folder** [1], and the only one where an Asian-origin
  population is the majority. **Mauritius is African by geography and membership and Indian Ocean by
  population** — which, with Madagascar's Austronesian language
  ([`mg-madagascar.md`](mg-madagascar.md)), means **two of this folder's fifty-four countries do not
  fit a continental-ancestry definition of "African" at all.** Ubuntu Heritage should be explicit that
  its subject is a continent and its people, not a single heritage.
- ⚠️ **"Creole" as an ethnic category (28%)** [1] here means people of African and mixed descent —
  largely the descendants of the enslaved. As with Mauritania's Haratin
  ([`mr-mauritania.md`](mr-mauritania.md)), **the category encodes a history and should not be
  presented as neutral demography.**
- **The enslaved came from Mozambique and Zanzibar** [1] — connecting this file directly to
  [`mz-mozambique.md`](mz-mozambique.md) and [`tz-tanzania.md`](tz-tanzania.md), and to the **Indian
  Ocean slave trade**, the eastern counterpart of the Atlantic system documented across the West
  African files.

---

## Literature & voices

| Writer | Work | Year | Language | Source |
|---|---|---|---|---|
| Jacques-Henri Bernardin de Saint-Pierre | *Paul et Virginie* — "a love story that made the Isle de France famous wherever the French language was spoken" | 1768–1771 | French | [1] |

⚠️ **This is the Kenya problem again.** The only literary work source [1] names for Mauritius is by a
**French colonial writer**, celebrated for making the *colony* famous — exactly as Kenya's page names
only *Out of Africa* ([`ke-kenya.md`](ke-kenya.md)). **Two encyclopaedia entries, two African
countries, and in both the named literature is a European's.**

`[NEEDS SOURCE]` — no search was run for Mauritian writers. **Look specifically for writing in
Mauritian Creole**, given that 90% of the country speaks it, and for **Ananda Devi** and **Malcolm de
Chazal**.

---

## Heritage & sites

| Site | Type | What it is | Source |
|---|---|---|---|
| **Aapravasi Ghat**, Port Louis | Cultural | **"The first British colony to serve as a major reception centre for indentured servants"** | [1] |
| **Le Morne** | Cultural | Named by source [1]'s contents but **not described in the text retrieved** | [1] |

⚠️ **No inscription years were captured and Mauritius's own World Heritage list was not fetched.**

- **Aapravasi Ghat is where the indentured arrived**; **Le Morne is associated with maroons — enslaved
  people who escaped** `[NEEDS SOURCE]`. **Two World Heritage sites, one for each of the island's two
  coerced-labour systems.** Verify Le Morne properly — if the maroon association holds, it belongs
  beside São Tomé's 1549 maroon freedom declaration
  ([`st-sao-tome-and-principe.md`](st-sao-tome-and-principe.md)) as **inscribed heritage of
  resistance**, which is rare.

---

## Open questions

- [ ] 🔴 **Le Morne** — inscription year, and the maroon history. Potentially the strongest entry here.
- [ ] 🔴 **Literature in Mauritian Creole**, and Mauritian writers generally. Source [1] names only a
      French colonial novelist.
- [ ] ⚠️ **The Chagos Archipelago and the Chagossians.** A live dispute and a forced removal source
      [1] does not mention. **Needs the same agreed policy as Western Sahara and Mayotte.**
- [ ] ⚠️ **Confirm there is genuinely no *de jure* official language.** If so, Mauritius is unique in
      this folder.
- [ ] **The Indian Ocean slave trade**, written once across Mauritius, Mozambique, Tanzania and
      Comoros.
- [ ] **Aapravasi Ghat and Le Morne inscription years.**
- [ ] **Bhojpuri** — an Indian language with 5.1% of home speakers, and no status.

---

## Sources

1. Mauritius — Wikipedia. `en.wikipedia.org/wiki/Mauritius` — **the absence of a de jure official
   language and the 2022 home-language figures**, the uninhabited settlement history, slavery and
   indenture, milestones including **Chagos**, the ethnic and religious composition, *Paul et Virginie*,
   and Aapravasi Ghat.
2. Mauritius — nationalanthems.info. `nationalanthems.info/mu.htm` — "Motherland", the 1968 adoption,
   Jean Georges Prosper, **and the misattribution of the composer**.
3. *(reserved — Mauritius's World Heritage list was not fetched; heritage facts come from source [1])*
4. *(reserved — no literature search was run for Mauritius)*
