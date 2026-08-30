# Malawi

**ISO code:** `mw` · **Region:** Eastern Africa (UN M49 — **but a SADC member**; see [README.md](README.md))
**Researched by:** Tumo Olorato Mogame, with Claude · **Last updated:** 2026-08-30
**Status:** core research — languages, anthem, milestones, peoples and heritage sourced · literature empty

> **How this file is put together.** Built **claim by claim**: every row names the source it came
> from, and the numbered list at the bottom is what those names point at. Sources are
> encyclopaedia-grade — rough sources are fine at this stage ([README.md](README.md)), assertions made
> to a reader are not.
>
> ⚠️ **Region note.** The UN M49 geoscheme puts Malawi in **Eastern** Africa; SADC and most Southern
> African usage put it with the south. [README.md](README.md) already flags this exact discrepancy.

**What the app already has for Malawi:**

| | |
|---|---|
| Flag | ✅ `app/assets/flags/mw.png` |
| Country entry | ✅ listed in [`anthems.ts`](../app/src/content/anthems.ts) as `mw` |
| National anthem recording | ❌ none yet — `/countries` says so honestly |
| Language map (drives the language picker) | ❌ not mapped — technically possible (English); see below |

---

## Languages

| Language | Status | Also spoken in SA? | Source |
|---|---|---|---|
| **English** | **Official** | **Yes — `en`** | [1] |
| **Chichewa (Chewa)** | **Recognised regional language** | ⚠️ **Related, not the same** — see below | [1] |
| **Chitumbuka (Tumbuka)** | **Recognised regional language** | No | [1] |

⚠️ Source [1] states there are **no recognised *national* languages** — Chichewa and Chitumbuka are
recognised **regionally**.

**Official-language instrument:** `[NEEDS SOURCE]`.

**Languages Ubuntu Heritage does not have:** Chichewa, Chitumbuka.

⚠️ **A "same name ≠ same language" check is needed here, and it is not straightforward.** Zimbabwe's
entry in [`country-languages.ts`](../app/src/content/country-languages.ts) lists **"Chewa"** among the
languages the app does **not** have. **That is the same language as Malawi's Chichewa**
`[NEEDS SOURCE]` — Chewa/Chichewa/Nyanja are names for one language across Malawi, Zambia and Zimbabwe.
**The app already names it once. If `mw` is ever wired, the two entries must agree**, and the naming
must be settled: Chichewa in Malawi, Chewa in Zimbabwe, Nyanja in Zambia are, on the evidence of source
[1]'s own ethnic table (which lists **Chewa** and **Nyanja** as separate groups), a genuinely tangled
case. **Do not resolve it by assumption.**

**`mw` is technically wirable** (`lead: "en"`) and would need the Zimbabwe-style honest comment, with
Chichewa and Chitumbuka in `notYet`.

---

## National anthem

- **Title (own language):** ***Mulungu dalitsa Malawi*** (Chichewa)
- **Title (English):** "Oh God Bless Our Land of Malawi"
- **Adopted:** February 1964 — **months before independence**
- **Words and music by:** Michael-Fredrick Paul Sauka (both)
- **Recording we could use:** none sourced yet
- **Source:** [2]

> **Chosen by competition, months before independence** [2] — like Ghana's later lyric contest
> ([`gh-ghana.md`](gh-ghana.md)) and Libya's 1955 competition ([`ly-libya.md`](ly-libya.md)).
>
> **The lyrics are in Chichewa** [2] — the country's primary language — **with English translations
> provided**, even though English is the only official language [1]. **The anthem is more indigenous
> than the law**, as in Djibouti ([`dj-djibouti.md`](dj-djibouti.md)).
>
> Source [2] notes the anthem "reflects musical characteristics common to southern African
> compositions" — worth following up, because that is a claim about a **regional musical idiom** that
> would connect Malawi to the app's existing Southern African coverage.

---

## Milestones

| Year | Milestone | One grounded line | Source |
|---|---|---|---|
| **c. 10th c. CE** | **Bantu peoples arrive** | The same migration the app's Atlas material already covers. | [1] |
| **c. 1000 BCE onward** | **The Chongoni rock art** | Inscribed 2006 — see Heritage. | [1] |
| **16th c.** | **The Maravi Empire** | Extending from north of Nkhotakota to the Zambezi — **and the country's name comes from it**. | [1] |
| 1859 | Livingstone reaches Lake Malawi | | [1] |
| **1891** | **The British Central African Protectorate** | | [1] |
| 1907 | Renamed **Nyasaland** | | [1] |
| 1944 | The Nyasaland African Congress formed | | [1] |
| 1961 | Banda's Malawi Congress Party wins a majority | | [1] |
| **1964 (6 Jul)** | **Independence from the United Kingdom** | | [1] |
| **1971** | **Banda declares himself president for life** | | [1] |
| 1993 | A referendum approves multi-party politics | | [1] |

**Framing notes.**

- **The country renamed itself after a precolonial empire.** *Malawi* comes from **Maravi**
  `[NEEDS SOURCE]` — the 16th-century state in source [1]'s own timeline. **That is the same move as
  Ghana (named for an empire in what is now Mauritania and Mali) and Benin.** ⚠️ Verify the etymology;
  it is widely stated and not sourced here. **If it holds, this folder now has several countries that
  took precolonial names at independence**, which is a pattern worth writing once.
- ⚠️ **John Chilembwe is absent from source [1]'s milestones** — he led an uprising against colonial
  rule in **1915** `[NEEDS SOURCE]` and is a national hero. **Searched for in the extraction prompt and
  not returned**, which makes his absence a gap in this file rather than in Malawi's history. **A
  priority to fill**, and he belongs beside Bai Bureh ([`sl-sierra-leone.md`](sl-sierra-leone.md)),
  Samori Touré ([`gn-guinea.md`](gn-guinea.md)) and the Nandi ([`ke-kenya.md`](ke-kenya.md)).
- ⚠️ **Banda's presidency-for-life (1971–1993)** [1] was repressive `[NEEDS SOURCE]`; source [1] gives
  only the dates. As with the Derg ([`et-ethiopia.md`](et-ethiopia.md)) and Macías
  ([`gq-equatorial-guinea.md`](gq-equatorial-guinea.md)), **a neutral date-list would be a false
  account.**

---

## Peoples & cultures

**2018 census** [1]:

| Group | Share |
|---|---|
| **Chewa** | 34.4% |
| Lomwe | 18.9% |
| **Yao** | 13.3% |
| **Ngoni** | 10.4% |
| Tumbuka | 9.2% |
| Sena | 3.8% |
| Mang'anja | 3.2% |
| Tonga | 1.8% |
| **Nyanja** | 1.5% |
| Others | 3.5% |

- 🔴 **The Ngoni (10.4%) are the direct link to what the app already tells.** The Ngoni are
  descendants of Nguni-speaking groups who moved north during the **Mfecane/Difaqane**
  `[NEEDS SOURCE]` — **the same upheaval Ubuntu Heritage already narrates through *Mhudi* and through
  [`bw-botswana.md`](bw-botswana.md)'s Difaqane section.** If that holds, **the scattering the app
  tells from a Barolong vantage reaches Malawi**, a thousand kilometres north, and this file is where
  the app's existing content touches Eastern Africa. **Verify — this is the most valuable item in the
  file.**
- ⚠️ **"Chewa" (34.4%) and "Nyanja" (1.5%) are listed as separate groups** [1] while being names
  associated with one language. **Do not assume the relationship; source it** before any language
  mapping.
- **The Yao** connect to Mozambique and Tanzania, and to the Indian Ocean trade
  `[NEEDS SOURCE]`.

---

## Literature & voices

⚠️ **Genuinely empty.** Source [1] names no writer or work, and no literature search was run in this
pass. **A gap in the research, not a fact about the country.**

`[NEEDS SOURCE]` — Malawi has a well-known modern poetry tradition and **Jack Mapanje** is the name to
start with. **Michael-Fredrick Paul Sauka**, who wrote both words and music of the anthem [2], also
belongs here.

---

## Heritage & sites

| Site | Inscribed | Type | What it is | Source |
|---|---|---|---|---|
| **Lake Malawi National Park** | **1984** | Natural | | [1] |
| **Chongoni Rock Art Area** | **2006** | Cultural | | [1] |

- 🔴 **Chongoni is the fourth rock-art site in this folder** — with Tassili n'Ajjer in Algeria
  ([`dz-algeria.md`](dz-algeria.md)), Tadrart Acacus in Libya ([`ly-libya.md`](ly-libya.md)) and the
  Ennedi Massif in Chad ([`td-chad.md`](td-chad.md)) — **and the first outside the Sahara.**
  ⚠️ **Chongoni's rock art is associated with the Chewa and with women's initiation practice**
  `[NEEDS SOURCE]`, which would make it **living heritage rather than only archaeology**. Verify.
  **The rock-art thread now spans four countries and two ecological zones**, and South Africa's own
  San rock art would make it five. **This is the strongest Atlas candidate the research has produced**
  — see the same note in [`td-chad.md`](td-chad.md).

---

## Open questions

- [ ] 🔴 **Are the Ngoni descendants of the Mfecane migrations?** If yes, this file connects directly
      to *Mhudi* and the app's existing Difaqane content.
- [ ] 🔴 **Chongoni rock art and Chewa initiation practice** — living heritage or archaeology?
- [ ] 🔴 **Rock art across Algeria, Libya, Chad, Malawi and South Africa** — one Atlas entry, five
      files.
- [ ] ⚠️ **Chewa / Chichewa / Nyanja** — settle the naming before any language wiring, and reconcile
      with Zimbabwe's existing `notYet` entry.
- [ ] ⚠️ **John Chilembwe** — a national hero absent from this file.
- [ ] ⚠️ **The Banda period**, sourced properly.
- [ ] **Literature — the whole section.** Start with Jack Mapanje.
- [ ] **The Maravi → Malawi etymology.**

---

## Sources

1. Malawi — Wikipedia. `en.wikipedia.org/wiki/Malawi` — English as sole official language and the two
   regional languages, milestones from the 10th century to 1993, Nyasaland, the 2018 census, and both
   World Heritage sites.
2. Malawi — nationalanthems.info. `nationalanthems.info/mw.htm` — ***Mulungu dalitsa Malawi***, the
   February 1964 competition, Michael-Fredrick Paul Sauka, and **the Chichewa lyrics**.
3. *(reserved — heritage facts come from source [1]; no separate list page was fetched)*
4. *(reserved — no literature search was run for Malawi)*
