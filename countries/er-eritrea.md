# Eritrea

**ISO code:** `er` · **Region:** Eastern Africa (UN M49)
**Researched by:** Tumo Olorato Mogame, with Claude · **Last updated:** 2026-08-30
**Status:** core research — languages, anthem, milestones, peoples and heritage sourced · literature empty

> **How this file is put together.** Built **claim by claim**: every row names the source it came
> from, and the numbered list at the bottom is what those names point at. Sources are
> encyclopaedia-grade — rough sources are fine at this stage ([README.md](README.md)), assertions made
> to a reader are not.

**What the app already has for Eritrea:**

| | |
|---|---|
| Flag | ✅ `app/assets/flags/er.png` |
| Country entry | ✅ listed in [`anthems.ts`](../app/src/content/anthems.ts) as `er` |
| National anthem recording | ❌ none yet — `/countries` says so honestly |
| Language map (drives the language picker) | ❌ not mapped — and see the unusual case below |

---

## 🔴 Languages — nine national languages and no official one

| Language | Status | Also spoken in SA? | Source |
|---|---|---|---|
| **Tigrinya** | **National language** · also a **working language** | No | [1] |
| **Arabic** | **National language** · also a **working language** | No | [1] |
| **English** | **Working language** | **Yes — `en`** | [1] |
| **Tigre** | National language | No | [1] |
| **Kunama** | National language | No | [1] |
| **Saho** | National language | No | [1] |
| **Afar** | National language | No | [1] |
| **Bilen** | National language | No | [1] |
| **Nara** | National language | No | [1] |
| **Beja** | National language | No | [1] |

**Official-language instrument:** ⚠️ **Source [1] states no official language at all** — only that
"Tigrinya, Arabic and English serve as the three **working** languages", alongside **nine recognised
national languages**. `[NEEDS SOURCE]` to confirm this is deliberate policy rather than a gap in the
source.

**Languages Ubuntu Heritage does not have:** all of them except English.

🔴 **A country that declines to name an official language, and recognises nine national ones instead**
[1]. If confirmed, that is a distinctive constitutional position: **refusing to rank languages at
all.** South Africa's Constitution lists eleven **without ranking them** — and the app's own
[`country-languages.ts`](../app/src/content/country-languages.ts) already records that fact for `za`,
noting the order there comes from census data rather than the Constitution. **Eritrea may be the
closest parallel on the continent to that specific choice**, and it is worth confirming for exactly
that reason.

**Tigrinya is shared with Ethiopia**, where it is official ([`et-ethiopia.md`](et-ethiopia.md));
**Afar with Ethiopia and Djibouti** ([`dj-djibouti.md`](dj-djibouti.md)); **Beja reaches into Sudan**
([`sd-sudan.md`](sd-sudan.md)), where the Beja are 5.9% of the population.

---

## National anthem

- **Title (own language):** ኤርትራ ኤርትራ ኤርትራ — **Tigrinya, in Ge'ez script**
- **Title (English):** "Eritrea, Eritrea, Eritrea"
- **Adopted:** 1993
- **Words by:** Solomon Tsehaye Beraki
- **Music by:** Isaac Abraham Meharezgi and Aron Tekle Tesfatsion
- **Recording we could use:** none sourced yet
- **Source:** [2]

> **The second anthem in this folder titled in Ge'ez script**, after Ethiopia's
> ([`et-ethiopia.md`](et-ethiopia.md)) — the two countries share the script as they share Tigrinya,
> which is precisely what thirty years of war did not undo.
>
> **Adopted in 1993, at independence** [2], after "three decades of armed conflict".

---

## Milestones

| Year | Milestone | One grounded line | Source |
|---|---|---|---|
| **c. 1 Ma** | **Hominid fossils at Madam Buya** | | [1] |
| **c. 100 AD** | **The Kingdom of Aksum** | Shared with Ethiopia — see [`et-ethiopia.md`](et-ethiopia.md). | [1] |
| c. 350 AD | Aksum adopts Christianity | | [1] |
| **7th c. AD** | **The Mosque of the Companions** | Early Muslims settle; among the earliest mosques anywhere. | [1] |
| 1520 | Francisco Álvares documents a visit | | [1] |
| **1869** | **Assab sold to an Italian missionary** | The beginning of Italian presence. | [1] |
| **1889** | **Italian Eritrea established** | | [1] |
| 1942 | British Military Administration | | [1] |
| **1952** | **Federated with Ethiopia** | Under **UN Resolution 390A**. | [1] |
| **1961** | **The armed struggle begins** | The Eritrean Liberation Front launches it. | [1] |
| **1991 (24 May)** | **De facto independence** | The EPLF defeats Ethiopian forces after **thirty years**. | [1] |
| **1993 (24 May)** | **De jure independence** | A referendum; admitted to the UN as its **182nd member**. | [1] |
| 2017 | **Asmara inscribed** | | [1] |

**Framing notes.**

- 🔴 **A thirty-year war of independence** [1] — 1961 to 1991, the longest sustained liberation
  struggle in this folder. Angola's was fourteen years ([`ao-angola.md`](ao-angola.md));
  Guinea-Bissau's eleven ([`gw-guinea-bissau.md`](gw-guinea-bissau.md)); Algeria's eight
  ([`dz-algeria.md`](dz-algeria.md)). **Eritrea's was thirty, and it was fought against another
  African state**, not a European empire.
- ⚠️ **That last point is the one to get right.** Eritrea's independence was won **from Ethiopia**
  [1], after a **UN-arranged federation in 1952** [1] that was later dissolved by Ethiopia
  `[NEEDS SOURCE]`. **This does not fit the colonial template most of this folder uses**, and forcing
  it into one would misrepresent both countries. Write it with [`et-ethiopia.md`](et-ethiopia.md) in
  view, and neither file should treat the other as the villain by default.
- **Aksum belongs to both files** [1] — the kingdom spans what are now two states, as the Mali Empire
  spans four in the west. **Do not let either country claim it alone.**
- **The Mosque of the Companions, 7th century** [1], is among the oldest mosques anywhere and sits in
  the same Red Sea Islamic world as Djibouti's Zeila ([`dj-djibouti.md`](dj-djibouti.md)) and
  Ethiopia's Harar ([`et-ethiopia.md`](et-ethiopia.md)).
- ⚠️ **Source [1]'s milestones effectively stop at 1993.** Eritrea's post-independence period,
  including the 1998–2000 war with Ethiopia and the country's human-rights record, is absent. **Do not
  publish a timeline that ends at independence.**

---

## Peoples & cultures

**2021 data** [1]:

| Group | Share |
|---|---|
| **Tigrinya** | 50% |
| **Tigre** | 30% |
| Saho · Afar · Kunama | 4% each |
| Bilen | 3% |
| Beja · Nara | 2% each |
| Rashaida | 1% |

- **The ethnic groups and the nine national languages map one-to-one** [1]. That is what makes the
  language policy legible: **recognising nine languages is recognising nine peoples**, and none is
  left out of the list even at 1%. **Ubuntu Heritage's own `notYet` principle — name the languages you
  do not have rather than hiding them — is the same instinct**, and Eritrea applies it in
  constitutional form.
- **Afar, Beja and Tigrinya all cross borders** into Djibouti, Sudan and Ethiopia.

---

## Literature & voices

⚠️ **Genuinely empty.** Source [1] names no writer or work, and no literature search was run in this
pass. **A gap in the research, not a fact about the country.**

`[NEEDS SOURCE]` — and the obvious thread is **Tigrinya-language literature in Ge'ez script**, which
would connect directly to the script argument in [`et-ethiopia.md`](et-ethiopia.md). **Solomon Tsehaye
Beraki**, the anthem's lyricist [2], is the name to start with.

---

## Heritage & sites

| Site | Inscribed | Type | What it is |
|---|---|---|---|
| **Asmara** | **2017** | Cultural | Described by UNESCO as featuring **"eclectic and rationalist built forms, well-defined open spaces, and public and private buildings"** | [1] |

⚠️ **Only Asmara is named by source [1]**, and Eritrea's own World Heritage list was not fetched.

- **Asmara is an inscribed *modernist colonial city*** — Italian-built, and listed for that
  architecture. **It belongs in the same difficult category as Grand-Bassam in Côte d'Ivoire
  ([`ci-cote-d-ivoire.md`](ci-cote-d-ivoire.md)) and Saint-Louis in Senegal
  ([`sn-senegal.md`](sn-senegal.md))**: world heritage status for the built form of one's own
  colonisation. **Ubuntu Heritage should notice the pattern and say what it thinks about it**, rather
  than presenting three such sites separately as neutral tourist facts.

---

## Open questions

- [ ] 🔴 **Confirm that Eritrea names no official language.** If it holds, it is a distinctive
      constitutional position and directly comparable to South Africa's unranked eleven.
- [ ] **Literature — the whole section.** Start with Tigrinya writing and Solomon Tsehaye Beraki.
- [ ] ⚠️ **Post-1993 history**, including the 1998–2000 war and the present situation. A timeline
      ending at independence is not publishable.
- [ ] ⚠️ **How the 1952 federation ended** — the immediate cause of a thirty-year war, and absent here.
- [ ] **Eritrea's full World Heritage list.**
- [ ] **Aksum, written once**, across Eritrea and Ethiopia.
- [ ] ⚠️ **Colonial-era cities as world heritage** — Asmara, Grand-Bassam, Saint-Louis. Decide the
      project's line once.
- [ ] **The nine national languages' instrument.**

---

## Sources

1. Eritrea — Wikipedia. `en.wikipedia.org/wiki/Eritrea` — **the three working languages and nine
   national languages**, milestones from Madam Buya to 1993, the thirty-year war, the 1952 federation,
   2021 ethnic figures, and **Asmara's 2017 inscription**.
2. Eritrea — nationalanthems.info. `nationalanthems.info/er.htm` — the Tigrinya title **in Ge'ez
   script**, the 1993 adoption, Solomon Tsehaye Beraki, and the two composers.
3. *(reserved — Eritrea's World Heritage list was not fetched; Asmara comes from source [1])*
4. *(reserved — no literature search was run for Eritrea)*
