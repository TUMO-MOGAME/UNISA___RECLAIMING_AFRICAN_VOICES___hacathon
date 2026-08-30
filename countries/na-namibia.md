# Namibia

**ISO code:** `na` · **Region:** Southern Africa (UN M49) · **SADC member**
**Researched by:** Tumo Olorato Mogame, with Claude · **Last updated:** 2026-08-30
**Status:** core research — languages, milestones, peoples and heritage sourced · anthem and literature empty

> **How this file is put together.** Built **claim by claim**: every row names the source it came
> from, and the numbered list at the bottom is what those names point at. Sources are
> encyclopaedia-grade — rough sources are fine at this stage ([README.md](README.md)), assertions made
> to a reader are not.
>
> ✅ **Namibia is already live in the app.** [`country-languages.ts`](../app/src/content/country-languages.ts)
> carries a sourced `na` entry citing **Constitution of Namibia, Article 3(1)** — English as the sole
> official language — with **Oshiwambo, Otjiherero, Khoekhoegowab, RuKwangali and German** in `notYet`.
> **This research confirms that entry and adds two languages to it.** See Languages.
>
> ⚠️ **This file records a genocide.** Nothing here is app content without proper sources.

**What the app already has for Namibia:**

| | |
|---|---|
| Flag | ✅ `app/assets/flags/na.png` |
| Country entry | ✅ listed in [`anthems.ts`](../app/src/content/anthems.ts) as `na` |
| National anthem recording | ❌ none yet — **and the anthem was not researched in this pass** |
| Language map | ✅ **live and sourced** — leads with `en`, Afrikaans (`af`) supported, five languages named in `notYet` |

---

## 🔴 Languages — and two the app's data is missing

| Language | Status | Also spoken in SA? | In the app? | Source |
|---|---|---|---|---|
| **English** | **Official** — the only one | Yes — `en` | ✅ `lead` | [1] |
| **Afrikaans** | Recognised national | Yes — `af` | ✅ supported | [1] |
| **Setswana** | **Recognised national** | 🔴 **Yes — Setswana, `tn`, one of the app's eleven** | ⚠️ **NOT in the `na` entry** | [1] |
| **siLozi** | **Recognised national** | ⚠️ **Possibly related to Sesotho** — see below | ⚠️ **NOT in the entry** | [1] |
| **Oshiwambo** | Recognised national | No | ✅ in `notYet` | [1] |
| **Otjiherero** | Recognised national | No | ✅ in `notYet` | [1] |
| **Khoekhoegowab** | Recognised national | No | ✅ in `notYet` | [1] |
| **RuKwangali** | Recognised national | No | ✅ in `notYet` | [1] |
| **German** | Recognised national | No | ✅ in `notYet` | [1] |
| ǃKung · Gciriku · Thimbukushu | Recognised **regional** | No | ❌ not named | [1] |

🔴 **Source [1] names Setswana as a recognised national language of Namibia — and the app's `na` entry
does not include it.** Setswana is `tn`, already in the registry, already the app's Botswana lead
([`bw-botswana.md`](bw-botswana.md)). **Adding `tn` to Namibia's `supported` array would cost nothing
and would make the entry truer.**

**This is the third and clearest place where this research directly improves shipping data**, after
Zimbabwe ([`zw-zimbabwe.md`](zw-zimbabwe.md)) and Lesotho ([`ls-lesotho.md`](ls-lesotho.md)).
⚠️ **Verify against Article 3 first** — the app's existing citation is the authority, and source [1]
does not give the constitutional provision for the national-language list.

⚠️ **siLozi needs the "same name ≠ same language" check.** Lozi is also a recognised regional language
of **Zambia** ([`zm-zambia.md`](zm-zambia.md)) at 5.4%, and it is a Sotho-related language
`[NEEDS SOURCE]`. **Do not map it to `st` on resemblance** — that is exactly the error the app's
Zimbabwe comment exists to prevent.

**Also missing from the app's entry: ǃKung, Gciriku and Thimbukushu** [1], recognised regionally.
🔴 **ǃKung is a click language** — and the app's Botswana file already records **Khoisan languages and
Setswana's Khoisan loanwords** ([`bw-botswana.md`](bw-botswana.md)). **Namibia's Khoekhoegowab and
ǃKung are the same linguistic world**, and they are the strongest link between this folder and the
app's existing content on the peopling of Southern Africa.

---

## National anthem

⚠️ **Not researched.** No anthem source was fetched for Namibia in this pass. **A gap in the research,
not a fact about the country.**

- **Title / adopted / authors:** `[NEEDS SOURCE]`
- **Recording we could use:** none
- **Source:** `[NEEDS SOURCE]`

---

## Milestones

| Year | Milestone | One grounded line | Source |
|---|---|---|---|
| 1485–86 | Diogo Cão and Bartolomeu Dias explore the coast | **No territorial claims made.** | [1] |
| 1878 | Britain annexes Walvis Bay and the Penguin Islands | To the Cape Colony. | [1] |
| **1884** | **German South West Africa** | The German Empire establishes the colony. | [1] |
| 1897 | **The rinderpest epidemic** | Kills **around 95% of cattle** in southern and central Namibia. | [1] |
| 🔴 **1904–1908** | **The Herero and Nama genocide** | Source [1]: **"the first genocide of the 20th century"** — Germans kill **~65,000 Herero (80% of the population)** and **10,000 Nama (50%)**. | [1] |
| 1915 | German rule ends | South African forces take control. | [1] |
| 1920 | A League of Nations mandate | Administration given to South Africa. | [1] |
| **1948** | **Apartheid applied to South West Africa** | By South Africa's National Party. | [1] |
| 1966 | The UN assumes direct responsibility | **SWAPO launches an armed insurgency.** | [1] |
| **1990 (21 Mar)** | **Independence from South Africa** | Sam Nujoma sworn in as first President. | [1] |
| 2007 | **Twyfelfontein inscribed** | | [1] |

**Framing notes.**

- 🔴 **The Herero and Nama genocide, 1904–08.** Source [1] calls it **"the first genocide of the 20th
  century"** and gives the proportions: **80% of the Herero and 50% of the Nama** [1]. **This is the
  most severe single event documented anywhere in this folder**, and it is far less widely known than
  what followed it in Europe.
  ⚠️ **Handle with the full weight of [AGENTS.md §4](../AGENTS.md).** Use source [1]'s figures with
  attribution, do not narrow them, and get scholarly sources before publishing. **The German
  government's acknowledgement and the reparations negotiations are recent and contested**
  `[NEEDS SOURCE]` — as is the restitution of remains and objects taken to Germany. **This belongs in
  the app eventually. It does not belong there quickly.**
- 🔴 **Namibia is where this folder's history and Ubuntu Heritage's own history become the same
  history.** **South Africa ruled Namibia from 1915 to 1990 and applied apartheid to it from 1948**
  [1]. **The app already tells the South African liberation story; Namibia is that story's other
  half, and the app has never said so.** Independence came in **1990 — four years before South
  Africa's own.**
- **1897's rinderpest** [1] killed 95% of the cattle immediately before the 1904 uprising. **Cattle
  loss on that scale is not background** — it destroyed the economic basis of Herero and Nama society
  and preceded the dispossession. Source [1] places them adjacent without connecting them;
  `[NEEDS SOURCE]`, but the sequence matters.
- **Compare Botswana** ([`bw-botswana.md`](bw-botswana.md)): the Three Dikgosi went to London in 1895
  and kept their territory out of company rule. **Namibia's peoples faced Germany instead, and
  1904–08 is what happened.** **Those two files, read together, are the strongest argument in this
  research about what African diplomacy achieved and what its absence cost.**

---

## Peoples & cultures

**2023 census** [1]: **Indigenous African 93.2% · Coloured and Basters 3.6% · White 1.8% · Asian/Other
1.4%.**

- ⚠️ **This is a racial classification, not an ethnic one** — the same problem as Mozambique's
  "African 99%" ([`mz-mozambique.md`](mz-mozambique.md)) and Zimbabwe's
  ([`zw-zimbabwe.md`](zw-zimbabwe.md)), and it is a direct inheritance of apartheid-era categories
  applied here from 1948 [1]. **Use the language list instead**, which names nine national and three
  regional languages and tells a reader far more.
- **The "Basters"** [1] are a distinct community with their own history `[NEEDS SOURCE]`; the name
  itself is a colonial-era term.
- 🔴 **The Herero and Nama are named in this file only as genocide victims.** Source [1] gives their
  peoples no other entry. **That is precisely the erasure this project exists to correct** — a people
  recorded only by what was done to them. **Otjiherero and Khoekhoegowab are living national languages
  [1]; Herero and Nama cultural life is present tense.** `[NEEDS SOURCE]`, and it is the most
  important gap in this file after the anthem.

---

## Literature & voices

⚠️ **Genuinely empty.** Source [1] names no writer or work, and no literature search was run in this
pass. **A gap in the research, not a fact about the country.**

`[NEEDS SOURCE]` — and there is a specific thing to look for: **oral testimony of 1904–08**, held in
Herero and Nama communities. **For a project whose Living Archive exists to record elders' voices,
Namibia is the clearest case on the continent of testimony that a written colonial record does not
contain.**

---

## Heritage & sites

| Site | Inscribed | Type | What it is | Source |
|---|---|---|---|---|
| **Twyfelfontein** | **2007** | Cultural | "A prehistoric site with **one of the largest concentrations of rock engravings on the African continent**" | [1] |

⚠️ **Only Twyfelfontein is named and Namibia's list was not fetched** — the **Namib Sand Sea** is the
likely second `[NEEDS SOURCE]`.

- 🔴 **Twyfelfontein completes the rock-art thread.** With **Tassili n'Ajjer** (Algeria,
  [`dz-algeria.md`](dz-algeria.md)), **Tadrart Acacus** (Libya, [`ly-libya.md`](ly-libya.md)),
  **Ennedi** (Chad, [`td-chad.md`](td-chad.md)) and **Chongoni** (Malawi,
  [`mw-malawi.md`](mw-malawi.md)), **this folder now documents major African rock art in five
  countries across the entire continent, north to south** — and South Africa's own San rock art makes
  six. **This is the single best Atlas candidate the research has produced**, and Namibia is where it
  reaches the app's home region.

---

## Open questions

- [ ] 🔴 **Add Setswana (`tn`) to the app's `na` entry** — verify against Article 3 first. **The
      clearest data improvement this research has produced.**
- [ ] 🔴 **The Herero and Nama genocide**, from scholarship, with the reparations and restitution
      questions. **Then decide how — and whether — the app tells it.**
- [ ] 🔴 **Herero and Nama cultural life, present tense.** They appear here only as victims.
- [ ] ⚠️ **The anthem — the whole section.** Not researched.
- [ ] 🔴 **Rock art across five countries** — Namibia, Malawi, Chad, Libya, Algeria, plus South Africa.
      **Write it once as an Atlas entry.**
- [ ] ⚠️ **siLozi** — do not map to `st` without a linguist-grade source.
- [ ] **ǃKung, Khoekhoegowab and the Khoisan languages** — the link to the app's existing Botswana and
      Atlas material.
- [ ] **Namibia under South African rule, 1915–1990** — the app tells one half of this story already.
- [ ] **Literature — the whole section**, starting with oral testimony of 1904–08.

---

## Sources

1. Namibia — Wikipedia. `en.wikipedia.org/wiki/Namibia` — English as sole official language and **the
   nine national and three regional languages**, milestones from 1485 to 1990, **the 1904–08 genocide
   with its figures**, the 2023 census categories, and Twyfelfontein.
2. *(reserved — **no anthem source was fetched for Namibia**)*
3. *(reserved — Namibia's World Heritage list was not fetched; Twyfelfontein comes from source [1])*
4. *(reserved — no literature search was run for Namibia)*
