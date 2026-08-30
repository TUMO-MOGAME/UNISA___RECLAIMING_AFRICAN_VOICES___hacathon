# Zimbabwe

**ISO code:** `zw` · **Region:** Eastern Africa (UN M49 — **but a SADC member**; see [README.md](README.md))
**Researched by:** Tumo Olorato Mogame, with Claude · **Last updated:** 2026-08-30
**Status:** core research — languages, anthem, milestones and peoples sourced · literature and heritage partial

> **How this file is put together.** Built **claim by claim**: every row names the source it came
> from, and the numbered list at the bottom is what those names point at. Sources are
> encyclopaedia-grade — rough sources are fine at this stage ([README.md](README.md)), assertions made
> to a reader are not.
>
> ✅ **Zimbabwe is already live in the app.** [`country-languages.ts`](../app/src/content/country-languages.ts)
> carries a sourced `zw` entry citing **Constitution Amendment (No. 20) Act, 2013, §6**. **Reuse that
> citation rather than re-deriving it** — and note that this research **confirms** it.

**What the app already has for Zimbabwe:**

| | |
|---|---|
| Flag | ✅ `app/assets/flags/zw.png` |
| Country entry | ✅ listed in [`anthems.ts`](../app/src/content/anthems.ts) as `zw` |
| National anthem recording | ❌ none yet — **and Zimbabwe changed anthem in 1994**; see below |
| Language map | ✅ **live and sourced** — leads with `en` on an honest technicality, with Shona and Ndebele in `notYet` |

---

## Languages

Source [1] confirms what the app already records: **16 official languages** — **Chewa, Chibarwe,
English, Kalanga, Khoisan, Nambya, Ndau, Ndebele, Shangani, Shona, Sotho, Tonga, Tswana, Venda, Xhosa
and Zimbabwean Sign Language.**

| Language | Also spoken in SA? | In the app? | Source |
|---|---|---|---|
| **Shona** | No | ❌ `notYet` | [1] |
| **Ndebele** (Northern) | ⚠️ **NOT the same as South Africa's isiNdebele** | ❌ `notYet` | [1] |
| **English** | Yes — `en` | ✅ `lead` | [1] |
| **Shangani** | Yes — **corresponds to Xitsonga, `ts`** | ✅ | app data |
| **Venda** | Yes — Tshivenḓa, `ve` | ✅ | app data |
| **Sotho** | Yes — `st` | ✅ | app data |
| **Tswana** | Yes — Setswana, `tn` | ✅ | app data |
| **Xhosa** | Yes — isiXhosa, `xh` | ✅ | app data |
| Chewa · Chibarwe · Kalanga · Khoisan · Nambya · Ndau · Tonga · Zimbabwean Sign Language | No | ❌ `notYet` | [1] |

⚠️ **Source [1] adds something the app's entry does not say:** "The constitution acknowledges 16
languages, **but only embraces two of them nationally, Shona and English**" [1].

🔴 **That materially sharpens the app's existing comment.** `country-languages.ts` currently explains
that English leads "on an honest technicality" because Shona and Ndebele are the two largest languages
and the app has neither. **Source [1] says the constitution itself elevates Shona and English above
the other fourteen.** If that holds, **the honest technicality is even narrower than the comment
claims** — English is not merely the biggest language the app happens to have, it is one of two the
constitution treats as national. `[NEEDS SOURCE]` to verify against the Act itself; **if confirmed,
the code comment should be updated.** **This is the one place where this research directly improves
data already shipping.**

⚠️ **Chewa appears in Zimbabwe's sixteen** [1] — and in Zambia's regional languages
([`zm-zambia.md`](zm-zambia.md)) and Malawi's ([`mw-malawi.md`](mw-malawi.md)). **The Chewa / Nyanja /
Chichewa naming tangle now touches three files and the app's live data.** See the open question in
[`zm-zambia.md`](zm-zambia.md).

---

## 🔴 National anthem — the country that *left* the Sontonga melody

- **Title (Shona):** ***Simudzai Mureza WeZimbabwe***
- **Title (Ndebele):** ***Kalibusiswe Ilizwe leZimbabwe***
- **Title (English):** "Blessed Be the Land of Zimbabwe"
- **Adopted:** **18 April 1994**
- **Words by:** **Solomon Mutswairo** — a poet and academic
- **Music by:** Fred Lecture Changundega
- **Recording we could use:** none sourced yet
- **Source:** [2]

> 🔴 **Source [2] settles the question Zambia's file raised.** Zimbabwe held a **competition in 1994 to
> create a uniquely national anthem, precisely because "God Bless Africa" — Sontonga's melody — was
> shared by several southern African nations.** The new anthem **replaced** it.
>
> **So the Sontonga cluster has a defector, and its reason is the most interesting part.** Tanzania
> adopted the melody first, in 1961 ([`tz-tanzania.md`](tz-tanzania.md)); Zambia in 1964
> ([`zm-zambia.md`](zm-zambia.md)); South Africa's anthem contains it. **Zimbabwe left it in 1994 —
> the same year South Africa adopted its version — because it wanted something that was only its
> own.**
>
> **That is a genuine argument about heritage, with two defensible sides**: a shared Pan-African song
> versus a distinctly national one. **Ubuntu Heritage should present both, not resolve them.** Note
> ⚠️ that Zambia's source [2] listed Zimbabwe among the melody's users with the hedge "previously or
> currently" — **this file resolves that: previously.**
>
> **The lyrics are in all three of Zimbabwe's primary languages** [2] — Ndebele, Shona and English —
> **written by one poet.** Compare Cameroon's two European-language versions
> ([`cm-cameroon.md`](cm-cameroon.md)) and the CAR's French/Sango
> ([`cf-central-african-republic.md`](cf-central-african-republic.md)). **Zimbabwe's is the only
> trilingual anthem in the folder, and two of its three languages are African.**

---

## Milestones

| Year | Milestone | One grounded line | Source |
|---|---|---|---|
| **11th c.** | **Great Zimbabwe built** | By the **Shona**. | [1] |
| **13th c.** | **A major African trade centre** | Great Zimbabwe at its height. | [1] |
| **c. 1450–1760** | **The Kingdom of Mutapa** | | [1] |
| **1683** | **The Rozvi Empire expels the Portuguese** | From the Zimbabwean plateau. | [1] |
| **1821** | **Mzilikazi establishes the Ndebele** | | [1] |
| **1890** | **The British South Africa Company** | Demarcates Rhodesia; conquers Mashonaland. | [1] |
| 1893 | The First Matabele War | The BSAP defeats the Ndebele. | [1] |
| **1896–1897** | **The Chimurenga revolts** | Shona risings against company rule. | [1] |
| 1898 | "Southern Rhodesia" | The official name for the region south of the Zambezi. | [1] |
| **1965 (11 Nov)** | **UDI** | Ian Smith's Unilateral Declaration of Independence. | [1] |
| **1980 (18 Apr)** | **Independence recognised** | Through the Lancaster House Agreement; **Robert Mugabe** becomes Prime Minister. | [1] |
| 1994 (18 Apr) | A new anthem | | [2] |

**Framing notes.**

- 🔴 **1683: an African empire expelled a European power** [1]. The **Rozvi** drove the Portuguese off
  the plateau. **Put it beside Ethiopia's Adwa (1896, [`et-ethiopia.md`](et-ethiopia.md)), Botswana's
  Dimawe (1852, [`bw-botswana.md`](bw-botswana.md)) and Mossi cavalry repelling Songhai
  ([`bf-burkina-faso.md`](bf-burkina-faso.md))** — **this folder now documents African military success
  against outside powers across four centuries and five countries.** That is a body of evidence, not
  an anecdote.
- 🔴 **Great Zimbabwe is the country's name.** An 11th-century Shona city that was a major trade centre
  by the 13th [1], **and the modern state took its name from it** — like Ghana, Benin and Malawi.
  ⚠️ **Colonial-era archaeology notoriously attributed Great Zimbabwe to non-African builders**
  `[NEEDS SOURCE]`. **That falsification is itself a central story for this project** — a case where
  African heritage was not merely neglected but actively reassigned. **Source it properly; it may be
  the best single illustration in the folder of why [AGENTS.md §4](../AGENTS.md) exists.**
- 🔴 **1890: the British South Africa Company again** [1] — the same company that took mineral rights
  from the Lozi in 1888 ([`zm-zambia.md`](zm-zambia.md)) and that the Three Dikgosi travelled to
  London in 1895 to keep out of Botswana ([`bw-botswana.md`](bw-botswana.md)). **Three files, one
  company, three different outcomes.** **This is the clearest cross-file structure the research has
  produced and it should be written up once.**
- **Mzilikazi's Ndebele, 1821** [1] — a state founded by an Nguni leader moving north during the
  Mfecane, and **the same upheaval Ubuntu Heritage narrates through *Mhudi*.** With the Ngoni of
  Malawi and Zambia ([`mw-malawi.md`](mw-malawi.md), [`zm-zambia.md`](zm-zambia.md)) and Mozambique's
  Gaza state ([`mz-mozambique.md`](mz-mozambique.md)), **four files now carry that scattering
  northward.**

---

## Peoples & cultures

**2022 census** [1]: **Black African 99.6% · European 0.2% · Coloured 0.1% · Other 0.1%** — with source
[1] adding that **the Northern Ndebele and Shona together make up 95% of the population** [1].

- ⚠️ **The census table is a racial classification, not an ethnic one** — the same problem as
  Mozambique's "African 99%" ([`mz-mozambique.md`](mz-mozambique.md)). **The 95% Shona-and-Ndebele
  figure is the useful sentence**; the four-row table is not.
- ⚠️ **Northern Ndebele is not South Africa's isiNdebele** — the trap the app's own data comment
  already names, and the reason Zimbabwe's Ndebele sits in `notYet`. **This research confirms it**
  [1].

---

## Literature & voices

| Writer | Work | Year | Language | Source |
|---|---|---|---|---|
| **Solomon Mutswairo** | the national anthem's lyrics, in **Ndebele, Shona and English**; described as **a prominent Zimbabwean poet and academic** | **1994** | three languages | [2] |

⚠️ **Source [1] names no writer at all**, and no literature search was run in this pass. **The only
literary figure in this file arrived through the anthem source.**

`[NEEDS SOURCE]` — **Dambudzo Marechera** and **Tsitsi Dangarembga** were searched for in the
extraction prompt and **not returned by source [1]**. **Dangarembga's *Nervous Conditions* is widely
held to be the first novel in English by a Black Zimbabwean woman** `[NEEDS SOURCE]`. **A priority
gap** — and Mutswairo himself, a poet who wrote in Shona `[NEEDS SOURCE]`, deserves a proper entry.

---

## Heritage & sites

⚠️ **Not researched as a list.** Source [1] discusses **Great Zimbabwe** extensively as a historical
site **but does not state its UNESCO status**, and no list page was fetched.

`[NEEDS SOURCE]` — candidates: **Great Zimbabwe**, **Khami**, **Matobo Hills**, and **Mosi-oa-Tunya /
Victoria Falls**, **shared with Zambia** ([`zm-zambia.md`](zm-zambia.md)). ⚠️ **Use *Mosi-oa-Tunya***
— the naming policy flagged in Zambia's file applies here equally.

---

## Open questions

- [ ] 🔴 **Verify "the constitution embraces only Shona and English nationally"** against the 2013 Act.
      **If confirmed, update the comment in [`country-languages.ts`](../app/src/content/country-languages.ts)**
      — the one place this research directly improves shipping data.
- [ ] 🔴 **The colonial misattribution of Great Zimbabwe.** Possibly the best single illustration of
      this project's integrity rule anywhere in the folder.
- [ ] 🔴 **The BSAC across Zimbabwe, Zambia and Botswana** — one company, three outcomes. Write once.
- [ ] 🔴 **The Sontonga cluster, now with a defector** — Tanzania, Zambia, South Africa in; Zimbabwe
      out since 1994, and its stated reason. **A ready-made feature for `/countries`.**
- [ ] **Literature — the whole section.** Marechera, Dangarembga, Mutswairo.
- [ ] **Heritage — the full list.**
- [ ] ⚠️ **Chewa / Nyanja / Chichewa** — affects this file, Zambia, Malawi **and live app data.**
- [ ] **The Mfecane northward** — four files now.

---

## Sources

1. Zimbabwe — Wikipedia. `en.wikipedia.org/wiki/Zimbabwe` — **the 16 official languages and the
   "only two embraced nationally" statement**, milestones from the 11th century to 1980, UDI, the 2022
   census and the 95% Shona-and-Ndebele figure.
2. Zimbabwe — nationalanthems.info. `nationalanthems.info/zw.htm` — the three-language titles, **the
   18 April 1994 adoption**, Solomon Mutswairo, Fred Lecture Changundega, and **the stated reason for
   replacing "God Bless Africa"**.
3. *(reserved — no World Heritage source was fetched for Zimbabwe)*
4. *(reserved — no literature search was run for Zimbabwe; see Open questions)*
