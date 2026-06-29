---
name: setswana-i18n
description: Lentswe's multilingual + Setswana guidance. Use WHENEVER adding/editing UI strings, the i18n layer, language toggle, or any Setswana/other South African language content. Strings are data, not hardcoded. Accessibility & Inclusivity is 20% of the score; indigenous languages are first-class, not bolted on.
---

# Setswana & i18n — languages are first-class, strings are data

Lentswe ships **Setswana + English** and is architected to extend to all 11 official SA languages.
(See [docs/07-accessibility.md](../../../docs/07-accessibility.md).)

## Rules

1. **No hardcoded user-facing text.** Every string comes from the `i18n/` layer keyed by language.
   Content (scene text) carries per-language fields (`{ en, tn, ... }`), `tn` = Setswana.
2. **Indigenous languages are first-class**, not an afterthought. The language toggle is prominent;
   Setswana is a peer of English, not a "secondary" option.
3. **Translations are human-reviewed drafts.** Gemini may draft Setswana, but literary text especially
   must be checked by a person before shipping — machine translation of literature is a starting point,
   not authority. Mark unreviewed drafts.
4. **Respect orthography.** Setswana uses diacritics and specific spellings (e.g. *ô*, *š* where
   applicable per the variety). Don't strip accents to "simplify."
5. **Design for extension.** Adding a language = adding a strings file + content fields, never touching
   app logic. Keep the language list data-driven.

## Naming & cultural terms (keep authentic)

- Project name **Lentswe** = "voice/word" (Setswana). Tagline *Mantswe a Afrika* = "Voices of Africa".
- Keep indigenous terms in their language with a short gloss on first use (e.g. *inkundla* — the
  traditional Xhosa court; *ubulungisa* — justice; *izimbongi* — praise poets; *sangoma* — healer).
  Don't over-translate culturally specific words into flat English.

## Quick check

- [ ] Did I add the string to `i18n/`, not inline?
- [ ] Did I provide at least `en` + `tn`?
- [ ] Is any machine-translated literary text flagged for human review?
- [ ] Are cultural terms preserved (with a gloss), not flattened?
