# Eswatini

**ISO code:** `sz` · **Region:** Southern Africa (UN M49) · **SADC member**
**Researched by:** Tumo Olorato Mogame, with Claude · **Last updated:** 2026-08-30
**Status:** core research — languages, anthem, milestones and peoples sourced · literature and heritage empty

> **How this file is put together.** Built **claim by claim**: every row names the source it came
> from, and the numbered list at the bottom is what those names point at. Sources are
> encyclopaedia-grade — rough sources are fine at this stage ([README.md](README.md)), assertions made
> to a reader are not.
>
> ✅ **Eswatini is already live in the app.** [`country-languages.ts`](../app/src/content/country-languages.ts)
> carries a sourced `sz` entry citing **Constitution of the Kingdom of Eswatini, 2005, §3(1)** —
> siSwati and English as the official languages, leading with **siSwati**. **This research confirms
> the language pair** and adds the 2005 date to the milestone list. **Reuse the existing citation.**

**What the app already has for Eswatini:**

| | |
|---|---|
| Flag | ✅ `app/assets/flags/sz.png` |
| Country entry | ✅ listed in [`anthems.ts`](../app/src/content/anthems.ts) as `sz` |
| National anthem recording | ❌ none yet — `/countries` says so honestly |
| Language map | ✅ **live and sourced** — choosing Eswatini leads with **siSwati** (`ss`) |
| Reviewed content in siSwati | ❌ `reviewedContent: false` in [`languages.ts`](../app/src/i18n/languages.ts) — the app speaks siSwati but has no human-reviewed literary text in it |

---

## Languages

| Language | Status | Also spoken in SA? | Source |
|---|---|---|---|
| **siSwati (Swazi)** | **Official** | **Yes — the same language**, `ss`, one of South Africa's eleven | [1], app data |
| **English** | **Official** | Yes — `en` | [1], app data |

**Official-language instrument:** **Constitution of the Kingdom of Eswatini, 2005, §3(1)** — already
cited in the app's data. Source [1] confirms both languages are official but **does not itself give
the provision**; the app's existing citation is the stronger one.

**Languages Ubuntu Heritage does not have:** none. **This is one of only a handful of countries in the
folder where the app speaks everything the source names.**

🔴 **Eswatini is one of the four countries where Ubuntu Heritage's language layer genuinely works** —
with Lesotho ([`ls-lesotho.md`](ls-lesotho.md)), Botswana ([`bw-botswana.md`](bw-botswana.md)) and
South Africa. **After forty-eight country files, that number has not grown**, and the reason is
structural, not accidental: the app's registry is South Africa's eleven, and it fits the countries that
share those languages.

**The real gap here is not the language — it is the content.** `reviewedContent: false` for `ss` means
**the app can display siSwati chrome but has no human-authored literary text in it.** For Eswatini,
where siSwati is the national language of 97% of the population [1], **that is the honest limitation to
name.**

---

## National anthem

- **Title (own language):** ***Nkulunkulu Mnikati wetibusiso temaSwati*** (siSwati)
- **Title (English):** "Oh God, Bestower of the Blessings of the Swazi"
- **Adopted:** 6 September 1968 — independence day itself
- **Words by:** Andrease Enoke Fanyana Simelane
- **Music by:** David Kenneth Rycroft
- **Recording we could use:** none sourced yet
- **Source:** [2]

> 🔴 **Source [2] describes it as "a compromise between Swazi and western styles of music",
> incorporating the intricate polyphonic characteristics typical of traditional Swazi music.**
>
> **That is the most technically specific statement about musical form in any anthem entry in this
> folder** — and it names exactly the thing Ubuntu Heritage keeps circling: **an indigenous musical
> structure surviving inside an imported form.** Kenya's anthem is a lullaby
> ([`ke-kenya.md`](ke-kenya.md)); The Gambia's is a Mandinka melody under English words
> ([`gm-gambia.md`](gm-gambia.md)); **Eswatini's is described as polyphony carried into a Western
> frame.**
>
> **This is also the folder's only anthem whose siSwati title the app could actually render in the
> reader's own language** — `ss` is in the registry. **If one anthem is going to be presented
> bilingually in `/countries`, this is the easiest one to do properly.**

---

## Milestones

| Year | Milestone | One grounded line | Source |
|---|---|---|---|
| **c. 1720–1744** | **Dlamini III** | His son **Ngwane III** founds the modern Swazi state. | [1] |
| **mid-18th c.** | **The kingdom established** | "The Swazis established their kingdom… under the leadership of Ngwane III." | [1] |
| **1881** | **Boundaries drawn** | During the Scramble for Africa. | [1] |
| 1903 | A British High Commission Territory | After the Second Boer War. | [1] |
| **1968 (6 Sep)** | **Independence regained** | From the United Kingdom; the anthem is adopted the same day. | [1], [2] |
| **1972** | **The constitution suspended** | By King **Sobhuza II**, who then ruled by decree. | [1] |
| **1982** | **Sobhuza II dies** | After **almost 83 years** as king. | [1] |
| 1986 | **Mswati III crowned** | | [1] |
| 2005 | The current constitution | The instrument the app's language data already cites. | [1] |
| **2018 (19 Apr)** | **Renamed the Kingdom of Eswatini** | Announced by Mswati III, using the native Swazi name — to mark **50 years of independence** and to prevent confusion with Switzerland. | [1] |

**Framing notes.**

- 🔴 **"Independence *regained*" is source [1]'s own word** [1]. Most files in this folder say
  "independence from"; this one says **regained** — because the Swazi kingdom existed continuously
  from the mid-18th century and the British period was an interruption, not an origin. **That single
  verb is worth keeping.**
- 🔴 **A country renamed itself in 2018, using its own language's name for itself** [1]. **This is the
  most recent self-renaming in the folder** — Dahomey→Benin (1975,
  [`bj-benin.md`](bj-benin.md)), Upper Volta→Burkina Faso (1984,
  [`bf-burkina-faso.md`](bf-burkina-faso.md)), Zaire→DRC (1997,
  [`cd-congo-drc.md`](cd-congo-drc.md)), **Swaziland→Eswatini (2018)**. **Four countries, four
  decades, one act.** ⚠️ And note source [1]'s second stated reason — avoiding confusion with
  Switzerland — **which is a more mundane motive than the others and should be reported, not tidied
  away.**
- **Sobhuza II reigned for almost 83 years** [1] — among the longest documented reigns anywhere in the
  world. ⚠️ **He also suspended the constitution in 1972 and ruled by decree** [1]; both facts belong
  together, and Eswatini's present political arrangements are contested `[NEEDS SOURCE]`. **Do not
  present the monarchy only as heritage.**
- **1881's boundaries** [1] are the same Scramble that produced almost every other border in this
  folder — but here they were drawn **around an existing kingdom** rather than across peoples.

---

## Peoples & cultures

**2017 census** [1]: **Emaswati 97% · others 3%.**

- **97% one people** [1] — among the most homogeneous countries in the folder, with Comoros
  ([`km-comoros.md`](km-comoros.md)) and Seychelles ([`sc-seychelles.md`](sc-seychelles.md)).
- ⚠️ **Incwala and Umhlanga are the obvious cultural entries and source [1] gives almost nothing.**
  Source [1] mentions ***incwala*** only in passing — King Ngwane V "died during incwala" [1] — and
  **does not mention *Umhlanga* at all**, though both were searched for.
  🔴 **These are living royal ceremonies, and they are exactly the kind of material Ubuntu Heritage
  exists to carry** — and exactly the kind that gets photographed by outsiders and explained by
  nobody. `[NEEDS SOURCE]`, and **this needs a Swazi source, not a tourism page.** ⚠️ *Umhlanga* in
  particular is regularly covered internationally in ways Swazi people contest `[NEEDS SOURCE]` —
  **handle with the same care the project applies to *botlhanka* in
  [`bw-botswana.md`](bw-botswana.md)**: it belongs in the story, and how it is told is not a call to
  make alone.
- **siSwati speakers also live in South Africa** — `ss` is one of the eleven — so **this is a language
  and a people spanning a border into the app's home country**, like Setswana and Botswana.

---

## Literature & voices

⚠️ **Genuinely empty.** Source [1] names no writer or work, and no literature search was run in this
pass. **A gap in the research, not a fact about the country.**

🔴 **And it is the gap that matters most here.** The app **speaks siSwati** but has
`reviewedContent: false` for it. **Finding siSwati literature — written or oral — is not an academic
exercise for this country; it is the missing input for a language the app already supports.**
`[NEEDS SOURCE]`, and **this is arguably the single most actionable literature gap in the whole
folder.**

---

## Heritage & sites

⚠️ **Not researched.** Source [1] names no World Heritage site and no list page was fetched.

---

## Open questions

- [ ] 🔴 **siSwati literature and oral tradition.** The app speaks the language and has no reviewed
      content in it. **The most directly actionable gap in the folder.**
- [ ] 🔴 **Incwala and Umhlanga**, from Swazi sources, with the framing agreed before anything is
      written.
- [ ] ⚠️ **The monarchy's present political arrangements** — the file cannot present a reigning
      monarchy purely as heritage.
- [ ] **Heritage — the whole section.**
- [ ] **The four self-renamings** — Benin, Burkina Faso, DRC, Eswatini. Write once.
- [ ] **A recording of the anthem** — the easiest bilingual presentation in `/countries`, since the app
      already renders siSwati.
- [ ] **Ngwane III and the founding of the kingdom** — one line for the state's origin.

---

## Sources

1. Eswatini — Wikipedia. `en.wikipedia.org/wiki/Eswatini` — both official languages, milestones from
   Dlamini III to the **2018 renaming**, "independence regained", Sobhuza II's 83-year reign, and the
   2017 census figure.
2. Eswatini — nationalanthems.info. `nationalanthems.info/sz.htm` — the siSwati title, the 1968
   adoption, Simelane and Rycroft, and **the description of Swazi polyphony inside a Western form**.
3. *(reserved — no World Heritage source was fetched for Eswatini)*
4. *(reserved — no literature search was run; see Open questions, this is the priority)*
