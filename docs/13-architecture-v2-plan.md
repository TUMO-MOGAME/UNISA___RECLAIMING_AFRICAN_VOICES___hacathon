# 13 — Architecture v2: the multi-page transformation

> **Programme:** 3 weeks · **Wed 26 Aug → Tue 15 Sep 2026**
> **Source designs:** `Ubuntu Heritage Website (standalone).html`, `Ubuntu Heritage Countries (standalone)_Undated.html`,
> `Ubuntu Heritage Wireframes (standalone).html` (screens 2a–2h)
> **Live board:** [STATUS.md](../STATUS.md) · **Backlog:** [specs/tasks.md](../specs/tasks.md) (Phase 5)

---

## 1. Why

Ubuntu Heritage today is **one long scrolling page** ([HomeGallery.tsx](../app/src/components/HomeGallery.tsx), 1155 lines)
with a stack-based push/pop router in [App.tsx](../app/App.tsx). Every pillar — Atlas, Provinces, Presidents,
Heroes, Totems, National Days, Archive, Ledger — is a section that pushes a full-screen route. It works, but:

- there is **no persistent chrome** — each screen re-invents its own header, and the footer exists only on Home;
- there is **no progression** — nothing to come back for, no reason to finish a chapter;
- the four literary pillars and the Cultural Atlas are **buried mid-scroll** rather than browsable;
- **Kids**, **Schools** and the **Passport** do not exist at all.

The v2 architecture turns it into a **site with rooms**: a persistent shell, a browsable cinematic library,
and a real watch → quiz → collect loop that gives the humanities content somewhere to land.

---

## 2. Decisions locked (2026-08-26, with Tumo)

| # | Decision | Consequence |
|---|----------|-------------|
| **D1** | **Nav = `Journey · Watch · Atlas · Archive · Kids · Schools`** + country ▾ + language ▾ + Passport chip | Resolves the three conflicting navs across the source designs. Nothing already built loses its home. |
| **D2** *(revised 2026-08-26)* | **The hero trail is the FREE TRAILER and stays exactly as it was — it opens in place, it does not hand off** | Tapping "Start the journey" walks the SA road, 1652 to today, with no lock and no sign-in. The deeper staged `/journey` page is reached from the nav instead, and is where future chapters get locked. Originally D2 had the hero navigating to `/journey`; that was reversed once the free-vs-locked split was decided. |
| **D3** | **Country selection moves to the new `/countries` page — but national anthems come with it** | The floating [CountryPicker](../app/src/components/CountryPicker.tsx) leaves the hero. All 54 countries, flags and [anthem playback](../app/src/content/anthems.ts) are re-homed into the Countries page, which has far more room for them than a dropdown did. |
| **D4** | **Keep the current palette: pure black `#000000` + sa-blue accent `#1A85A7`** | We take the source designs' **structure and layout**, not their gold-on-brown skin. The kept hero and footer stay coherent with every new page, and none of the 15 existing screens need retouching. See [tokens.ts](../app/src/theme/tokens.ts). |
| **D5** | **Progress is local-only. No accounts, no PII.** | Stars, streaks, heritage cards, stamps and the Passport persist on-device (same pattern as the Archive: IndexedDB on web, AsyncStorage on native). Schools ships as a working dashboard over **seeded demo class data**. POPIA-clean by construction — no minor's data leaves the device. |
| **D6** | **Kept byte-for-byte: the hero section and the footer** | These are lifted out of `HomeGallery` into their own components **without visual change**, then reused. The SA road, the walking figure, the branch side-roads, the partner logos, the sound credit, the built-with strip — all unchanged. |

---

## 3. What is kept, unchanged

| Thing | Where it lives now | Where it goes |
|-------|--------------------|---------------|
| **Hero + SA road trail** | [HomeGallery.tsx:413-513](../app/src/components/HomeGallery.tsx#L413-L513) + [HistoryTrail.tsx](../app/src/components/HistoryTrail.tsx) | → `components/home/HomeHero.tsx` — same markup, same styles, same behaviour. The walk still opens **in place** (D2 revised); nothing about the hero changed but the file it lives in. |
| **Footer** | [HomeGallery.tsx:598-705](../app/src/components/HomeGallery.tsx#L598-L705) | → `components/shell/SiteFooter.tsx` — same markup, same styles. Now rendered by the shell on **every** route. |
| **All 15 existing screens** | `src/components/*Screen*.tsx` | Unchanged internals. They gain the shell's header and footer, and lose their bespoke back-bars where the shell supersedes them. |
| **All content modules** | `src/content/*.ts` | Unchanged. |
| **i18n, TTS, chatbot, archive, ledger services** | `src/services/*`, `src/i18n/*` | Unchanged; extended with new strings only. |

**Non-negotiable:** if the hero or the footer *looks* different after a change, that change is wrong.

---

## 4. Target information architecture

```
/                     Home        kept hero → new sections → kept footer
/countries            Countries   54 countries, flags, anthems, "the journey ahead"   [NEW]
/watch                Watch       cinematic library: featured + rails + filters       [NEW]
/watch/:id            Watch page  player · sources & provenance · Ask Ubuntu          [NEW]
/journey              Journey     staged trail for the selected country               [NEW]
/journey/:stage       Stage       WATCH → QUIZ → REWARD                               [NEW]
/atlas                Atlas hub   gathers everything below                            [REGROUPED]
  ├── /provinces  /province/:id  /city/:id        (existing, unchanged)
  ├── /presidents /president/:id                  (existing, unchanged)
  ├── /heroes     /hero/:id                       (existing, unchanged)
  ├── /totems                                     (existing, unchanged)
  └── /days                                       (existing, unchanged)
/archive              Archive     community oral history (existing)
  ├── /heritage       Heritage Ledger             (existing, unchanged)
  └── /about          Sources & provenance        (existing, unchanged)
/kids                 Kids        audio-first home, animal guide                      [NEW]
/kids/:stage          Kids stage  picture quiz + stickers                             [NEW]
/schools              Schools     teacher dashboard over demo class                   [NEW]
/passport             Passport    stamps · cards · stars · streak                     [NEW]
/reader/:id           Reader      cinematic reader (existing, unchanged)
```

**Mobile** collapses the nav to a 4-tab bar — `Journey · Watch · Atlas · Me` — per wireframes 2b and 2h.
`Me` is the Passport. Kids and Schools are reached from Home and from the Passport's grown-ups corner.

---

## 5. The app shell

The single biggest structural change. Today every route renders standalone; after this, every route
renders **inside** a shell.

```
<AppShell>
  <SiteHeader />        ← persistent: nav, country ▾, language ▾, Passport chip
    <route content />   ← the only part that swaps
  <SiteFooter />        ← persistent, byte-for-byte the current footer
  <ChatbotWidget />     ← already app-wide; unchanged
</AppShell>
```

- **Full-bleed routes** (Home, Reader, Journey stage, Kids stage) let content run under a *transparent*
  header and suppress the footer while a film or story is playing — the existing `storyActive` flag
  already does exactly this and is reused.
- **Content routes** keep the header solid and always show the footer.
- The existing `fullBleed` list in [App.tsx:214-225](../app/App.tsx#L214-L225) becomes shell configuration
  rather than a special case.

---

## 6. Progress data model (D5 — local only)

```ts
// src/services/progress/types.ts
export type Progress = {
  country: string;                        // "za" — the selected country
  stagesDone: string[];                   // ["za:1", "za:2"]
  currentStage: string | null;            // "za:3"
  stars: number;
  streak: { count: number; lastDayISO: string };
  cards: string[];                        // heritage card ids (22 totems + others)
  stamps: string[];                       // country codes with a finished journey
  watched: Record<string, number>;        // moduleId → 0..1 fraction watched
  quiz: Record<string, { correct: number; total: number }>;
};
```

One module, `src/services/progress/`, mirroring the Archive's platform split
(`store.ts` native / `store.web.ts` web). No network, no account, no PII — a POPIA non-event.
Wiped by a single "reset my progress" action in the Passport.

---

## 7. Week 1 — the shell and the split (Wed 26 Aug → Tue 1 Sep)

**Goal:** every room exists and is reachable; nav and footer persist; *nothing that works today stops working.*

| ID | Task | Notes |
|----|------|-------|
| V2-01 | Extend the `Route` union with `countries · watch · watchItem · journey · stage · kids · kidsStage · schools · passport` | Keep the existing push/pop stack — it works and Back is correct. |
| V2-02 | `components/shell/AppShell.tsx` — header + content + footer + full-bleed rules | |
| V2-03 | `components/shell/SiteHeader.tsx` — D1 nav, country ▾, language ▾, Passport chip, active-route underline | Full nav ≥900px. |
| V2-04 | `components/shell/MobileTabBar.tsx` — `Journey · Watch · Atlas · Me` | <900px. |
| V2-05 | **Extract the footer** from `HomeGallery` → `components/shell/SiteFooter.tsx`, verbatim | D6. Visual diff must be nil. |
| V2-06 | **Extract the hero** from `HomeGallery` → `components/home/HomeHero.tsx`, verbatim | D6. The walk stays in place — the hero is the free trailer (D2 revised). |
| V2-07 | Rebuild Home to the new section order | Hero → Continue → Watch rail → Journey preview → Countries strip → Atlas → Kids/Schools → Archive → Footer. |
| V2-08 | `components/CountriesScreen.tsx` — the `/countries` page | Left rail of countries, centre atmosphere panel, right "journey ahead" + tags. |
| V2-09 | **Move anthems into `/countries`** — flags, 54 countries, [PlayOnceRow](../app/src/components/PlayOnceRow.tsx) playback, honest "anthem coming" | D3. Retire the floating hero picker. |
| V2-10 | `components/AtlasHubScreen.tsx` — one hub linking Provinces · Presidents · Heroes · Totems · Days | Existing screens untouched; the hub just gathers them. |
| V2-11 | Archive gains its Trust sub-nav (Ledger, Sources) | Existing screens untouched. |
| V2-12 | Typecheck + web bundle green · every old route still reachable · STATUS updated | **Week gate.** |

**Week 1 done =** you can click every item in the new nav, land on a real page, and the hero and footer
look exactly as they do today.

---

## 8. Week 2 — Watch and Journey, the core loop (Wed 2 Sep → Tue 8 Sep)

**Goal:** the loop that makes the content worth returning to.

| ID | Task | Notes |
|----|------|-------|
| V2-13 | `services/progress/` — types, local store (web + native), React hook | D5. Unit-tested. |
| V2-14 | `components/WatchScreen.tsx` — featured hero + rails + filter chips + search | Chips: All · The 4 Great Books · Unsung Heroes · Totems & Clans · National Days · Nine Provinces. Sourced from the existing content registry — **no new content invented**. |
| V2-15 | `components/WatchItemScreen.tsx` — player, Child⇄Adult, language ▾, **Sources & provenance**, "Continue the Journey →", Ask Ubuntu | The provenance block is mandatory (AGENTS.md §4): real citation plus the AI-imagery label. |
| V2-16 | `components/JourneyScreen.tsx` — staged trail, done/current/locked, era ribbon, chapter-reward preview | Built from [history-trail.ts](../app/src/content/history-trail.ts) milestones, so it stays grounded. |
| V2-17 | **Quiz content model** + authored questions for chapters 1–3 | `src/content/quiz.ts`. Every question and every distractor must be defensible from a cited source. Wrong answers must not teach a falsehood. |
| V2-18 | `components/StageScreen.tsx` — WATCH → QUIZ → REWARD, three steps, per wireframe 2e | Includes "stuck? Ask Ubuntu for a hint". |
| V2-19 | Heritage cards: award on stage completion, 22 totems from [totems.ts](../app/src/content/totems.ts) | Card art reuses existing totem assets. |
| V2-20 | "Continue your journey" resume bar on Home, wired to real progress | |
| V2-21 | Tests + typecheck + bundle green · STATUS updated | **Week gate.** |

**Week 2 done =** you can start at Home, enter the Journey, watch a scene, answer a grounded quiz,
earn a totem card, and see it persist across a page refresh.

---

## 9. Week 3 — Kids, Schools, Passport, polish (Wed 9 Sep → Tue 15 Sep)

| ID | Task | Notes |
|----|------|-------|
| V2-22 | `components/PassportScreen.tsx` — level, streak, country stamps, card collection grid, reset-my-progress | Wireframe 2h. |
| V2-23 | `components/KidsScreen.tsx` — greeting in the home language, animal guide, today's story, Songs, My cards | Wireframe 2f. Audio-first, large targets. |
| V2-24 | `components/KidsStageScreen.tsx` — picture quiz, four big image answers, star rating | |
| V2-25 | Grown-ups corner — hold-3-seconds gate out of Kids mode | |
| V2-26 | `components/SchoolsScreen.tsx` — class progress, assigned chapter, completion, average score, learner table, assign, live class quiz | D5: seeded demo class, clearly labelled as demo data. |
| V2-27 | CAPS-alignment and lesson-plan content for chapters 1–3 | Grounded; cite the CAPS document. |
| V2-28 | **i18n sweep** — every new string across all 11 languages, honest EN fallback | Non-negotiable: Accessibility and Inclusivity is 20% of the rubric. |
| V2-29 | Accessibility and responsive pass — labels, contrast, touch targets, keyboard nav on web | |
| V2-30 | POPIA review of every new surface | Should be a formality under D5 — confirm it. |
| V2-31 | Final polish · docs updated · STATUS and tasks.md reconciled | **Programme gate.** |

---

## 10. File inventory

**New (18 files)**

```
src/components/shell/AppShell.tsx  SiteHeader.tsx  SiteFooter.tsx  MobileTabBar.tsx
src/components/home/HomeHero.tsx   HomeSections.tsx
src/components/CountriesScreen.tsx  AtlasHubScreen.tsx
src/components/WatchScreen.tsx      WatchItemScreen.tsx
src/components/JourneyScreen.tsx    StageScreen.tsx
src/components/PassportScreen.tsx
src/components/KidsScreen.tsx       KidsStageScreen.tsx
src/components/SchoolsScreen.tsx
src/content/quiz.ts                 src/content/schools.ts
src/services/progress/{types,store,store.web,useProgress}.ts
```

**Changed (3 files)**

```
App.tsx                           route union + shell
src/components/HomeGallery.tsx    hero and footer extracted out; becomes the Home page body
src/components/CountryPicker.tsx  repurposed for the header ▾ / retired into CountriesScreen
```

**Untouched:** every `*Screen.tsx` listed in §3, all of `src/content/` except the two new files,
all of `src/services/` except the new `progress/`, all of `src/i18n/` except added strings.

---

## 11. Risks and the de-scope order

| Risk | Mitigation |
|------|-----------|
| Extracting the hero/footer causes visual drift | Extract **verbatim** first, commit, verify, *then* re-wire. Never refactor and restyle in the same step. |
| Quiz content invents history | Every question authored against a cited source; `[NEEDS SOURCE]` rather than a guess. This is the project's integrity rule. |
| Three weeks is tight for 31 tasks | Fixed de-scope order below — cut from the bottom, never the middle. |
| Existing routes silently break | The Week 1 gate explicitly re-walks every old route. |

**De-scope order** (cut in this order if the window tightens):

1. Schools / teacher dashboard (V2-26, V2-27) — the least load-bearing for the core story
2. Kids stage flow (V2-24, V2-25) — the Kids home can ship alone
3. Quiz chapters beyond 3 (V2-17 partial)
4. Watch search (V2-14 partial)

**Never cut:** the shell, the kept hero and footer, `/countries` plus anthems, i18n, POPIA.

---

## 12. Definition of done

- [ ] Nav D1 is live on every route; footer D6 is on every route; both look identical to today's footer
- [ ] The hero SA road is pixel-unchanged and opens `/journey`
- [ ] All 54 countries plus anthem playback live on `/countries`
- [ ] Watch → quiz → reward loop completes and persists across a refresh
- [ ] Passport shows real earned cards, stars, streak and stamps
- [ ] Every new string exists in all 11 languages, or falls back to EN honestly
- [ ] No new personal data is collected anywhere
- [ ] `npx tsc --noEmit` clean · web bundle green · existing tests pass
- [ ] STATUS.md and specs/tasks.md reconciled
