# Maloba UI kit — build every page with these

One brand, one type system, one source of truth. **Never** hardcode a colour, font name, or font
size in a screen. Build pages out of these primitives and they stay consistent automatically —
including any new tab you add later.

## The design language (from the AADHIH "Reclaiming African Voices" brief)

- **Colour:** deep **navy** (`colors.navy`) text + **burnt orange** (`colors.orange`) accents +
  **gold** (`colors.gold`) highlights on **warm cream** (`colors.paper`). Immersive/reader surfaces
  use the dark navy world (`tone="dark"`, cream text via `onDark`).
- **Type:** **Anton** (heavy condensed caps) for display/headlines; **Barlow** for everything else.
  Both come from `theme/tokens.ts` `fonts.*` — repoint there to restyle the whole app.
- **Accent shape:** the short orange `<Rule />` under a heading.
- **Depth:** white `<Card />`s on cream with a soft shadow; navy cards for call-to-action blocks.

## Recipe for a new page

```tsx
import { Screen, ScreenHeader, Card, Rule, Kicker, Display, Title, Body, Meta, Muted } from "../ui";

export function MyScreen({ lang, onBack }: { lang: Lang; onBack: () => void }) {
  return (
    <Screen tone="paper">                 {/* cream background + safe area + padding + warm wash */}
      <ScreenHeader kicker="Section" title="My Page" onBack={onBack} />
      <Card>
        <Title>A heading</Title>
        <Body>Readable paragraph text in Barlow.</Body>
        <Meta>Author · Year</Meta>
      </Card>
    </Screen>
  );
}
```

## Rules

1. **Text only via `Type.tsx`** — `Display / Title / Kicker / SectionLabel / Body / Meta / Muted`.
   On dark surfaces pass `onDark`. No raw `<Text fontFamily=…>`.
2. **Every screen is wrapped in `<Screen>`** — never re-implement the background/safe-area.
3. **Colours & fonts come from `theme/tokens.ts`** — if you need a new role, add it there.
4. **Strings are localized** — wrap user-facing text with `t(obj, lang)` from `../i18n`
   (see setswana-i18n skill). Provide at least `{ en, tn }`.
5. **Motion** from `components/Motion.tsx` — `Reveal` for staggered load, `PressScale` for tappables.

Change the brand once in `tokens.ts` (colours + `fonts`) and every page — old and new — follows.
