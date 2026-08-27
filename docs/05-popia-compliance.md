# 05 — POPIA Compliance & Data Privacy

POPIA (Protection of Personal Information Act) compliance is **mandatory** in the hackathon rules and
code of conduct — and it scores under Sustainability/Ethics (10%) and Community Impact (25%). Because
Maloba's Community Archive captures **voice recordings**, and **a person's voice, recollections, and
opinions are "personal information" under POPIA**, ethical data governance is a core feature, not an
afterthought.

> **Rule (from [AGENTS.md](../AGENTS.md)):** no PII-collecting feature ships without all four safeguards
> below. If you build the recorder, you build the consent gate in the *same* change.

## The four safeguards

### 1. Explicit consent checkpoint (before the mic is ever activated)
- A clear, **non-technical** consent sheet appears before recording can start.
- The user (and, where relevant, the person being recorded) must **opt in** explicitly.
- The user chooses **private archiving** vs **public community sharing** at this point.
- No dark patterns: declining is one tap and fully respected.

### 2. Purpose specification & transparency
- The UI states plainly: *"Your recording will be sent to Lelapa AI to create a transcript, and stored
  on Supabase, only to archive and translate your story."*
- No secondary use beyond archiving/translation without fresh consent.

### 3. Data security — Supabase Row-Level Security (RLS)
- RLS policies at the database level: a recording is **isolated to its uploader** until they explicitly
  mark it public.
- Private audio + transcripts are accessible only to the authenticated owner.
- The Supabase **anon key is safe to ship only because RLS is on** — verify policies before any sync.

### 4. Right to erasure
- The profile screen has a one-tap **"Delete my recording"** that removes the audio + transcript from
  Supabase (and the local DB).
- Deletion is real and immediate, not a "mark hidden."

## Implementation checklist

- [ ] `ConsentSheet` component blocks `startRecording()` until consent + visibility choice given.
- [ ] Consent choice (private/public) + timestamp stored with each recording.
- [ ] Supabase tables created with RLS enabled and owner-only policies **before** first upload.
- [ ] Transparency copy shown on the consent sheet (who receives the data and why).
- [ ] Erasure action wired to delete local + remote rows + the storage object.
- [ ] "About the Sources" / settings explains data handling in plain language.

## Why this also wins points

Visibly robust, plain-language guardrails demonstrate "responsible and purposeful" digital-humanities
practice and **respect for community ownership** — the opposite of an extractive tech approach. Judges
explicitly reward this under Community Impact and Sustainability. Show the consent screen in the demo
video.

## Minimum for the concept demo

Even before cloud sync exists, ship the **consent sheet + local-only save + delete**. That alone
proves the ethical model end-to-end. Cloud RLS + Lelapa transcription are the online stretch.

---

## Architecture v2 review — 2026-08-27 (V2-30)

Every room added in the v2 programme was reviewed against this document. **No new personal
information is collected anywhere**, so no new consent surface was required.

| Surface | Data it holds | Verdict |
|---|---|---|
| `services/progress/` | Stages finished, stars, streak day, card ids, country codes, watched fractions, quiz tallies | **No PII.** No name, no account, no contact detail, no device identifier. Web stores it in `localStorage`; native keeps it for the session and reports `persists: false` honestly. |
| Passport | Renders the above | **No PII.** Deliberately holds no name and no photo — the one place a "passport" metaphor would normally invite them. Carries a two-step **"Forget everything"** that erases the store outright. |
| Journey / Stage | Reads the trail and the quiz; writes stage completion | **No PII.** |
| Kids / Kids stage | Totem art, totem terms, card awards | **No PII**, and no account — which is the point. This is the surface most likely to be used by a child, and it collects nothing, so there is nothing to consent to and nothing to breach. |
| Schools | Seeded demo class in `content/schools.ts` | **Not real data.** The names are fictional and the banner says so on screen at all times. Real class data would mean minors' records and is explicitly **not** built. |
| Watch / Countries | Search boxes | Local filter state only — never stored, never sent. |

**Verified mechanically:** no `fetch`, `axios`, `XMLHttpRequest`, Supabase call or upload path exists
in any v2 room or in `services/progress/`. The progress store has no network code at all.

**A test guards the shape.** `progress.test.ts` asserts the exact key list of the `Progress` object,
so an identifying field cannot be added later without a test failing and someone having to justify it.

**If Schools ever needs real class data** it requires, together and in advance: accounts, guardian
consent for learners under 18, RLS owner-only policies, a stated retention period, and an erasure
path for a learner leaving the school. That is a separate decision, not an increment — and
`content/schools.ts` says so in its header so the next person cannot drift into it.
