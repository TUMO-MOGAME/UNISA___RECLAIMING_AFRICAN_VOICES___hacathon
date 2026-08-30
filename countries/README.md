# countries/ — research, one file per African nation

Tumo's research notes. **One markdown file per country**, named `<iso2>-<slug>.md` — the same
two-letter code the app already uses for flags (`app/assets/flags/za.png`) and for the country list in
[`app/src/content/anthems.ts`](../app/src/content/anthems.ts). So:

```
countries/
  za-south-africa.md      ← worked example, built from research already in the repo
  bw-botswana.md          ← long-form research (verbatim report carried in)
  bf-burkina-faso.md      ← long-form research (verbatim report carried in)
  ke-kenya.md             ← core research, built claim by claim
  ...                     ← all 54 are researched
```

Start from [`_TEMPLATE.md`](_TEMPLATE.md).

## The one rule

Same rule as everything else here ([AGENTS.md §4](../AGENTS.md)): **every factual claim carries a
source, or it is marked `[NEEDS SOURCE]` and left alone.** These files will end up driving what the
app *says* about real nations, so a guess written here becomes a falsehood shown to a reader later.
A half-filled file with three cited facts is worth more than a full one with twenty confident ones.

Rough sources are fine at this stage — a constitution, a government portal, a named encyclopaedia
entry. What matters is that the claim can be checked by someone who is not you.

## What the app can already consume

Research here is not decoration; two parts of it feed code that exists today.

| Section of the template | Feeds | Status |
|---|---|---|
| **Languages** | [`app/src/content/country-languages.ts`](../app/src/content/country-languages.ts) — orders the language picker to the selected country's languages, and names the ones Ubuntu Heritage does not yet speak | **live** for 6 countries: `za` `bw` `ls` `sz` `na` `zw`. Their citations are already in that file — copy them across rather than re-researching. |
| **Anthem** | [`app/src/content/anthems.ts`](../app/src/content/anthems.ts) — an anthem plays on `/countries` once its recording is bundled | 1 of 54 has audio |
| **Milestones** | a per-country history trail, the way `history-trail.ts` works for South Africa | South Africa only |
| **Everything else** | not wired yet — write it anyway; the shape is what tells us what to build | — |

When a file's **Languages** section is complete and cited, that country can be added to
`country-languages.ts` (task **LANG-03** in [specs/tasks.md](../specs/tasks.md)). Tell me and I'll wire
it, or add it yourself — the tests in `country-languages.test.ts` will catch a code that doesn't
exist, a language the app doesn't have, or a missing source.

### What the 2026-08-30 research found for that file specifically

**Three concrete corrections to data already shipping** — each needs its instrument verified first,
and each is written up in the country's own file:

| Country | Finding | File |
|---|---|---|
| **Namibia** | **Setswana (`tn`) is a recognised national language and is missing from the `na` entry.** The app already has `tn`. | [`na-namibia.md`](na-namibia.md) |
| **Lesotho** | Source names **isiXhosa (`xh`)** as official alongside Sesotho and English; the `ls` entry has only `st` and `en`. The app already has `xh`. | [`ls-lesotho.md`](ls-lesotho.md) |
| **Zimbabwe** | The constitution "**embraces only two nationally, Shona and English**" — which sharpens the honest-technicality comment already in the code. | [`zw-zimbabwe.md`](zw-zimbabwe.md) |

**One new entry worth adding** — **Mozambique**, whose Tsonga is the app's Xitsonga (`ts`); see
[`mz-mozambique.md`](mz-mozambique.md) and reuse the Shangani↔Xitsonga citation the `zw` entry
already carries.

**One blocker that stops most of the rest.** For **most of the 54, the app speaks none of the
country's languages** — and `country-languages.ts` cannot express that, because `lead` is a required
`LangCode`. The shape has to be designed before LANG-03 can move much further; written up in
[`bf-burkina-faso.md`](bf-burkina-faso.md#languages).

**One language the research keeps asking for.** **Swahili** is official or national in **five** of
these countries — Tanzania, Kenya, Uganda, Rwanda and the DRC. The app has none of it.

## Two traps worth naming

- **Same name ≠ same language.** Zimbabwe's *Ndebele* is Northern Ndebele; South Africa's
  *isiNdebele* is Southern Ndebele. They are different languages. Mapping one to the other is exactly
  the kind of plausible-looking error that is hardest to catch later. Where two countries share a
  language *name*, say explicitly whether it is the same language.
- **Official ≠ spoken.** Namibia's only official language is English, and most Namibians speak
  something else at home. Record both, and label which is which.

## One more trap: ISO country codes collide with language codes

`countries/` is named by **ISO 3166-1 country** code; the app's languages use **ISO 639** codes. Three
of them look identical and mean completely different things:

| Code | As a country (this folder) | As a language (`app/src/i18n/languages.ts`) |
|---|---|---|
| `tn` | Tunisia | Setswana |
| `ss` | South Sudan | siSwati |
| `st` | São Tomé and Príncipe | Sesotho |

They live in separate namespaces and nothing is broken today, but anything that later reads a code
out of a filename and hands it to the language layer will silently do the wrong thing. Say which kind
of code you mean.

## How a researched file is laid out

[`_TEMPLATE.md`](_TEMPLATE.md) is where a file starts. Filled-in files come in **two shapes**, and
both are legitimate:

**A. Long-form report carried in** — [`bw-botswana.md`](bw-botswana.md),
[`bf-burkina-faso.md`](bf-burkina-faso.md). Used when a big piece of research arrives as a paste:

1. **Summary sections** (Languages → Open questions), built **only** from claims in the report below
   them, each row pointing back at the § it came from.
2. **The full research report**, carried across **verbatim** — headings and tables reformatted,
   wording never touched. Rewriting it would quietly detach it from its sources.
3. **The sources**, plus an honest note on what the list is worth. Pasting loses the inline citation
   markers, so say so: claims trace to the list as a whole until someone ties them one by one.

**B. Built claim by claim** — the other 51 files. Used when the research is assembled from named
sources directly. Same sections, no verbatim report, and **every row names the numbered source it
came from**. This traceability is stronger; the trade-off is that the sources are encyclopaedia-grade
rather than primary, which each file says out loud.

Either way, a researched file is a place where the *gaps are named*, not hidden. An empty section
with a reason under it beats a filled one that guesses; a bad source called out beats a bad source
blended in. Files here use **⚠️** for "handle with care" and **🔴** for "this matters to the project."

## The 54 — all researched

**Every one of the 54 files now carries sourced research.** No scaffolds remain.

- `za-south-africa.md` — worked example, built from material already in the repo.
- [`bw-botswana.md`](bw-botswana.md) and [`bf-burkina-faso.md`](bf-burkina-faso.md) — Tumo's
  long-form research, shape **A** above.
- The other 51 — shape **B**, researched 2026-08-30 against Wikipedia country pages,
  `nationalanthems.info`, per-country UNESCO World Heritage lists, and targeted literature searches.

**What that research is and is not.** It is **core research**: languages and their legal status, the
national anthem, a milestone spine, peoples, literature and heritage, each claim carrying a source.
It is **not** Botswana-depth narrative for all 54, and it does not pretend to be — filling 54 files
from memory would have been fabrication at scale. Where a section is empty it says whether that is a
**gap in the research** or a fact about the country, and every file ends with **Open questions**
naming what it still needs.

**The findings that cut across files** — indigenous African scripts, the creole league table, the
Sontonga anthem cluster, Swahili's case for being the app's twelfth language, and the five-country
rock-art thread — are listed in [STATUS.md](../STATUS.md)'s log entry for 2026-08-30.

**Northern Africa** — **[Algeria](dz-algeria.md) ✅** · **[Egypt](eg-egypt.md) ✅** · **[Libya](ly-libya.md) ✅** · **[Morocco](ma-morocco.md) ✅** · **[Sudan](sd-sudan.md) ✅** · **[Tunisia](tn-tunisia.md) ✅**

**Western Africa** — **[Benin](bj-benin.md) ✅** · **[Burkina Faso](bf-burkina-faso.md) ✅** · **[Cabo Verde](cv-cabo-verde.md) ✅** · **[Côte d'Ivoire](ci-cote-d-ivoire.md) ✅** · **[Gambia](gm-gambia.md) ✅** · **[Ghana](gh-ghana.md) ✅** · **[Guinea](gn-guinea.md) ✅** · **[Guinea-Bissau](gw-guinea-bissau.md) ✅** · **[Liberia](lr-liberia.md) ✅** · **[Mali](ml-mali.md) ✅** · **[Mauritania](mr-mauritania.md) ✅** · **[Niger](ne-niger.md) ✅** · **[Nigeria](ng-nigeria.md) ✅** · **[Senegal](sn-senegal.md) ✅** · **[Sierra Leone](sl-sierra-leone.md) ✅** · **[Togo](tg-togo.md) ✅**

**Middle (Central) Africa** — **[Angola](ao-angola.md) ✅** · **[Cameroon](cm-cameroon.md) ✅** · **[Central African Republic](cf-central-african-republic.md) ✅** · **[Chad](td-chad.md) ✅** · **[Congo (Republic)](cg-congo-republic.md) ✅** · **[Congo (DRC)](cd-congo-drc.md) ✅** · **[Equatorial Guinea](gq-equatorial-guinea.md) ✅** · **[Gabon](ga-gabon.md) ✅** · **[São Tomé and Príncipe](st-sao-tome-and-principe.md) ✅**

**Eastern Africa** — **[Burundi](bi-burundi.md) ✅** · **[Comoros](km-comoros.md) ✅** · **[Djibouti](dj-djibouti.md) ✅** · **[Eritrea](er-eritrea.md) ✅** · **[Ethiopia](et-ethiopia.md) ✅** · **[Kenya](ke-kenya.md) ✅** · **[Madagascar](mg-madagascar.md) ✅** · **[Malawi](mw-malawi.md) ✅** · **[Mauritius](mu-mauritius.md) ✅** · **[Mozambique](mz-mozambique.md) ✅** · **[Rwanda](rw-rwanda.md) ✅** · **[Seychelles](sc-seychelles.md) ✅** · **[Somalia](so-somalia.md) ✅** · **[South Sudan](ss-south-sudan.md) ✅** · **[Tanzania](tz-tanzania.md) ✅** · **[Uganda](ug-uganda.md) ✅** · **[Zambia](zm-zambia.md) ✅** · **[Zimbabwe](zw-zimbabwe.md) ✅**

**Southern Africa** — **[Botswana](bw-botswana.md) ✅** · **[Eswatini](sz-eswatini.md) ✅** · **[Lesotho](ls-lesotho.md) ✅** · **[Namibia](na-namibia.md) ✅** · **[South Africa](za-south-africa.md) ✅**
