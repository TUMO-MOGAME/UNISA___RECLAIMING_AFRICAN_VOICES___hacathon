# Review Handoff for Emma — before 9 July submission

> You are the Setswana + cultural authority (the integrity rule says machine drafts are never passed off
> as authoritative). Everything below is either an **AI-assisted Setswana draft** or a **cultural-accuracy
> question**. Nothing here blocks the demo — the app runs and reads in English + Setswana today — but
> these are what would make the submission airtight. Work top-down; the ⭐ items are highest-value.

---

## 1 ⭐ UI strings shown on camera (fastest wins — 3 strings)

These appear on screen in the demo, so wrong-in-language here is the most visible risk. All marked
`[REVIEW: Setswana]` in code.

| String (Setswana) | English | File |
|---|---|---|
| **Reetsa** | 🔊 Listen | [CinematicReader.tsx:30](../app/src/components/CinematicReader.tsx#L30) |
| **Simolola go bala** | Begin reading | [HomeGallery.tsx:27](../app/src/components/HomeGallery.tsx#L27) |
| **Rekoto ya Boswa** | Heritage Ledger | [HeritageLedgerScreen.tsx:15](../app/src/components/HeritageLedgerScreen.tsx#L15) |

## 2 ⭐ Setswana story drafts (`tn` fields) — 7 modules

Each content file has `tn` drafts for titles, blurbs, scene text and the "record your family's version"
prompt. They're AI-assisted and need your ear. Files:

- Literary: [mhudi.ts](../app/src/content/mhudi.ts) · [ityala-lamawele.ts](../app/src/content/ityala-lamawele.ts) · [indaba.ts](../app/src/content/indaba.ts) · [vilakazi.ts](../app/src/content/vilakazi.ts)
- Atlas: [unsung-heroes.ts](../app/src/content/unsung-heroes.ts) · [marriage-rites.ts](../app/src/content/marriage-rites.ts) · [peopling-of-sa.ts](../app/src/content/peopling-of-sa.ts)

**How the app treats your edits:** any `tn` value you fix is shown as reviewed, authoritative text. The
9 other official languages currently show English (clearly labelled) until real translations land — that
honesty is by design, not a gap to hide.

## 3 Cultural-accuracy questions (Atlas)

Content is sourced (SAHO, SciELO, Ditsong, BeingAfrican — see each file's `references`), but these are
judgement calls only a culture-holder should make:

- **Sotho-Tswana marriage terms** ([marriage-rites.ts](../app/src/content/marriage-rites.ts)): we use
  *bogadi/magadi* for the Sotho-Tswana practice and describe **Patlo** (Malome/Rakgadi roles,
  *Pulamolomo*, Shweshwe, Basotho blanket). Are the terms and roles right for **Setswana** specifically
  (vs Sesotho)? Flagged in-file at the `patlo` scene.
- **Lineage chronology** ([peopling-of-sa.ts](../app/src/content/peopling-of-sa.ts)): we deliberately
  frame the Hurutshe/Kwena/Rolong lineages as *"took shape / branched"*, **not** a ranked "who's oldest",
  and we cut the genetic-admixture data on purpose (race-science risk). Confirm that framing sits right
  with you.
- **Sensitive customs**: kept with context, neither sanitised nor sensationalised (integrity rule §6).
  Flag anything you'd frame differently.

## 4 Nice-to-refine (not required)

- **Atlas hero art** ([assets/generated/](../app/assets/generated/)): the 3 new Gemini images
  (Galeshewe, lobola, first-people) are dignified and cinematic, but the aesthetic reads pan-African
  "savanna" more than specifically northern-Cape Batlhaping / highveld. They're **labelled AI
  interpretations** in the Reader, so this is within the integrity rule — but the prompts in
  [generate-scene-images.mjs](../app/scripts/generate-scene-images.mjs) / each scene's `imagePrompt`
  could be made more geographically specific and regenerated (`npm run gen:images -- --force`) if you
  want tighter fidelity. Low priority.

---

### What I (Claude) will NOT do
Write or "correct" Setswana myself — machine text passed off as authoritative is exactly what the
integrity rule forbids. These wait for you.
