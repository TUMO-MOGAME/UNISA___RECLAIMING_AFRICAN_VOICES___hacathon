# South Africa

**ISO code:** `za` · **Region:** Southern Africa
**Researched by:** Tumo Olorato Mogame · **Last updated:** 2026-08-27

> **Worked example.** This one is filled in from research already in the repo, so the template has
> something concrete to be compared against. Everything below traces to a source that is already
> cited in `app/src/content/` or `docs/04-humanities-sources.md` — nothing here is new research.
> The other 53 are yours.

---

## Languages

| Language | Status | Also spoken in SA? | Source |
|---|---|---|---|
| isiZulu | official | — | Constitution §6 |
| isiXhosa | official | — | Constitution §6 |
| Afrikaans | official | — | Constitution §6 |
| English | official | — | Constitution §6 |
| Sepedi (Northern Sotho) | official | — | Constitution §6 |
| Setswana | official | — | Constitution §6 |
| Sesotho | official | — | Constitution §6 |
| Xitsonga | official | — | Constitution §6 |
| siSwati | official | — | Constitution §6 |
| Tshivenḓa | official | — | Constitution §6 |
| isiNdebele (Southern) | official | — | Constitution §6 |
| South African Sign Language | official since 2023 | — | Constitution Eighteenth Amendment Act, 2023 |

**Official-language instrument:** Constitution of the Republic of South Africa, 1996, §6 — eleven
official languages; South African Sign Language added as a twelfth by the Constitution Eighteenth
Amendment Act, 2023.

**Languages Ubuntu Heritage does not have:** South African Sign Language. The app speaks the eleven
written official languages; SASL would need video, not text, and is not built.

> ⚠️ **isiNdebele here is Southern Ndebele (`nr`)** — not the Northern Ndebele of Zimbabwe. See the
> trap note in [README.md](README.md).

---

## National anthem

- **Title (own language):** "Nkosi Sikelel' iAfrika" / "Die Stem van Suid-Afrika"
- **Title (English):** National anthem of South Africa — a hybrid of the two
- **Adopted:** 1997 (current combined form)
- **Words / music by:** Enoch Sontonga (1897, "Nkosi Sikelel' iAfrika"); C. J. Langenhoven and
  M. L. de Villiers ("Die Stem")
- **Recording we could use:** **bundled** — the only one of the 54 with audio today
- **Source:** gov.za, national symbols

---

## Milestones

*The full 25-milestone trail with branches and per-event citations lives in
[`app/src/content/history-trail.ts`](../app/src/content/history-trail.ts) — it is the source of truth,
not this table. The first few are shown so the format is clear.*

| Year | Milestone | One grounded line | Source |
|---|---|---|---|
| 1652 | Cape settlement | Jan van Riebeeck lands for the Dutch East India Company (6 April), founding a supply station — the start of permanent European settlement. | SAHO |
| 1779 | Frontier wars begin | The first of nine Cape Frontier Wars (1779–1879) between settlers and the Xhosa over the Zuurveld grazing lands. | SAHO |
| 1806 | Britain takes the Cape | Britain occupies the Cape permanently, bringing new settlers and English institutions. | SAHO |
| 1994 | The first democratic election | On 27 April South Africans of all races voted together; Mandela became the first Black president. | SAHO, gov.za |

**Framing note:** 1652 is named as **the start of colonial settlement, not a discovery**, and the
"empty land" idea appears in the app only as a myth that gets corrected — pinned by a test in
`app/src/content/quiz.test.ts`.

---

## Peoples & cultures

- 27 clan totems with their Sotho-Tswana, Nguni and Tshivenḓa terms, clans and meanings:
  [`app/src/content/totems.ts`](../app/src/content/totems.ts) — 22 of them have recorded animal calls.
- Peoples, traditions, marriage rites and food are authored Cultural Atlas modules in
  `app/src/content/`. Oral genesis stories are presented **as oral tradition**, not as settled fact.

---

## Literature & voices

| Writer | Work | Year | Language | Source |
|---|---|---|---|---|
| Sol T. Plaatje | *Mhudi* | 1930 (written c.1917) | English | docs/04-humanities-sources.md |
| S. E. K. Mqhayi | *Ityala Lamawele* | 1914 | isiXhosa | docs/04-humanities-sources.md |
| Credo Mutwa | *Indaba, My Children* | 1964 | English | docs/04-humanities-sources.md |
| B. W. Vilakazi | poetry | 1935–1945 | isiZulu | docs/04-humanities-sources.md |

---

## Heritage & sites

- Nine provinces, their capitals and cities: `app/src/content/provinces.ts`
- Presidents, unsung heroes and national days: `presidents.ts`, `unsung-heroes.ts`, `national-days.ts`

---

## Open questions

- [ ] Setswana and the nine other non-English UI languages are machine-quality drafts and need a
      first-language review — the standing ask in [STATUS.md](../STATUS.md).

---

## Sources

1. Constitution of the Republic of South Africa, 1996, §6; Constitution Eighteenth Amendment Act, 2023.
2. South African History Online (sahistory.org.za) — the milestone notes in `history-trail.ts`.
3. gov.za — national symbols and the anthem.
4. [docs/04-humanities-sources.md](../docs/04-humanities-sources.md) — the four literary pillars.
