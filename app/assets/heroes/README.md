# Heroes — photos

One folder per person, named to match their `id` in `src/content/heroes.ts`:

| Folder | Person |
|--------|--------|
| `sobukwe/` | Robert Mangaliso Sobukwe |
| `ngoyi/`   | Lilian Ngoyi |
| `biko/`    | Steve Biko |
| `winnie/`  | Winnie Madikizela-Mandela |

## How to add photos
- Drop as many images as you like into the person's folder — `.jpg`, `.png` or `.webp`.
- Name the **main portrait** `portrait.jpg` (or `.png`/`.webp`). Extra images can be `01.jpg`, `02.jpg`, …
- Keep files reasonably small (long edge ~1200px is plenty). We can batch-optimise later.

## Important — real photos only, with rights
- These are **real historical people**, so use **real, rights-cleared photographs** — public-domain,
  Creative-Commons, or otherwise licensed. **Note the source** (a `sources.txt` in the folder is ideal).
- **Never an AI-generated face** presented as the person (project integrity rule: AI images are
  interpretations, never evidence, and we don't fabricate portraits).

## What happens next
Once photos are in, tell me and I'll wire them into `content/heroes.ts` (a `photo` for the portrait and,
if you want, a small gallery on each person's page) — replacing the initials monogram placeholder.

When you add a **new** hero later, create a folder here named after their `id`.
