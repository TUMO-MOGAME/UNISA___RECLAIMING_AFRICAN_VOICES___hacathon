# countries/ — research, one file per African nation

Tumo's research notes. **One markdown file per country**, named `<iso2>-<slug>.md` — the same
two-letter code the app already uses for flags (`app/assets/flags/za.png`) and for the country list in
[`app/src/content/anthems.ts`](../app/src/content/anthems.ts). So:

```
countries/
  za-south-africa.md      ← worked example, already filled in
  bw-botswana.md
  ke-kenya.md
  ...
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

## The 54

All 54 files exist as **scaffolds** — repo facts and the UN M49 region only. Nothing about any
country's languages, history or culture has been written into them yet; that is the research.
`za-south-africa.md` is filled in as a worked example.

**Northern Africa** — [Algeria](dz-algeria.md) · [Egypt](eg-egypt.md) · [Libya](ly-libya.md) · [Morocco](ma-morocco.md) · [Sudan](sd-sudan.md) · [Tunisia](tn-tunisia.md)

**Western Africa** — [Benin](bj-benin.md) · [Burkina Faso](bf-burkina-faso.md) · [Cabo Verde](cv-cabo-verde.md) · [Côte d'Ivoire](ci-cote-d-ivoire.md) · [Gambia](gm-gambia.md) · [Ghana](gh-ghana.md) · [Guinea](gn-guinea.md) · [Guinea-Bissau](gw-guinea-bissau.md) · [Liberia](lr-liberia.md) · [Mali](ml-mali.md) · [Mauritania](mr-mauritania.md) · [Niger](ne-niger.md) · [Nigeria](ng-nigeria.md) · [Senegal](sn-senegal.md) · [Sierra Leone](sl-sierra-leone.md) · [Togo](tg-togo.md)

**Middle (Central) Africa** — [Angola](ao-angola.md) · [Cameroon](cm-cameroon.md) · [Central African Republic](cf-central-african-republic.md) · [Chad](td-chad.md) · [Congo (Republic)](cg-congo-republic.md) · [Congo (DRC)](cd-congo-drc.md) · [Equatorial Guinea](gq-equatorial-guinea.md) · [Gabon](ga-gabon.md) · [São Tomé and Príncipe](st-sao-tome-and-principe.md)

**Eastern Africa** — [Burundi](bi-burundi.md) · [Comoros](km-comoros.md) · [Djibouti](dj-djibouti.md) · [Eritrea](er-eritrea.md) · [Ethiopia](et-ethiopia.md) · [Kenya](ke-kenya.md) · [Madagascar](mg-madagascar.md) · [Malawi](mw-malawi.md) · [Mauritius](mu-mauritius.md) · [Mozambique](mz-mozambique.md) · [Rwanda](rw-rwanda.md) · [Seychelles](sc-seychelles.md) · [Somalia](so-somalia.md) · [South Sudan](ss-south-sudan.md) · [Tanzania](tz-tanzania.md) · [Uganda](ug-uganda.md) · [Zambia](zm-zambia.md) · [Zimbabwe](zw-zimbabwe.md)

**Southern Africa** — [Botswana](bw-botswana.md) · [Eswatini](sz-eswatini.md) · [Lesotho](ls-lesotho.md) · [Namibia](na-namibia.md) · [South Africa](za-south-africa.md)
