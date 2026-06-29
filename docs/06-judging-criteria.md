# 06 — Judging Criteria & How Lentswe Maps to Each

Total: **100 points**. Submissions are scored on this rubric (and an AI pre-rater); the top 50 advance
to the Red Horizon Metaverse finals. Design and demo decisions should trace to a row here.

## 1. Humanities Depth & Relevance — 30% (the biggest lever)

> *Rich, nuanced engagement with African histories/languages/cultures; critical thinking; purpose
> beyond technical novelty.*

**How we win it:** four real foundational texts (Plaatje, Mqhayi, Mutwa, Vilakazi) — not summaries.
Indigenous jurisprudence (*inkundla*), cosmology, proto-feminist agency, oral→written preservation.
The "About the Sources" screen shows critical/ethical reflection. **Tech is subordinate to the
humanities.** → see [04-humanities-sources.md](04-humanities-sources.md).

## 2. Community Impact — 25%

> *Grounded in real community needs; amplifies marginalised voices; community participation/benefit.*

**How we win it:** the **Community Archive** turns users from consumers into **archivists of their own
families' histories** — recorded in their own languages, transcribed by an African-built model
(Lelapa), owned by them (private/public + erasure). Democratises the archive; reclaims voices excluded
from mainstream records. → [01-architecture.md](01-architecture.md), [05](05-popia-compliance.md).

## 3. Accessibility & Inclusivity — 20%

> *Language diversity, accessibility, connectivity constraints, varying abilities; clear, context-
> sensitive interface.*

**How we win it:** one Expo codebase runs on **web + cheap Android**; **offline-first** (WatermelonDB)
protects users from data costs and poor connectivity; **Setswana + English** (extensible to all 11 SA
languages); **Child/Adult modes**; large tap targets, high contrast, scalable text.
→ [07-accessibility.md](07-accessibility.md).

## 4. Creativity & Innovation — 15%

> *Original concept; imaginative, effective use of digital tools; tech + humanities well integrated.*

**How we win it:** a **cinematic AI graphic novel of African history** — Gemini narrative adaptation +
Pollinations dynamic visuals, on a **free-tier** pipeline that sidesteps the usual GPU/API costs.
Novel, and tightly fused to the texts. → [03-ai-pipeline.md](03-ai-pipeline.md).

## 5. Sustainability & Future Potential — 10%

> *Longevity, reuse, scaling; ethical data practice; community ownership; feasible maintenance.*

**How we win it:** **zero monthly cost** (all free tier) → it can live on indefinitely. **POPIA**
compliance + community ownership. Content-as-data means anyone can add new texts/languages without
touching app logic. → [02-tech-stack.md](02-tech-stack.md), [05](05-popia-compliance.md).

## Score-maximising checklist (revisit before submission)

- [ ] At least 3 modules with **real, sourced** content (not lorem).
- [ ] "About the Sources" screen credits every author + links references.
- [ ] Community Archive: record → consent → save → delete all work in the demo.
- [ ] App reads **offline**; images cached; works on a small screen.
- [ ] Setswana + English toggle works on at least the home + one module.
- [ ] Child/Adult toggle visibly changes the reading level.
- [ ] Demo video (2–3 min) explicitly shows: a text's depth, the consent screen, offline, multilingual.
- [ ] Written narrative states: the gap addressed, whose voices are centred, relevance to African DH.

## Deliverables (don't lose easy points)

1. **Functional prototype / working concept** — the Expo app (web link or build + Expo Go).
2. **2–3 minute demo video** — walkthrough hitting each rubric criterion above.
3. **Written narrative** — problem/gap, communities/narratives centred, relevance to African digital
   humanities. Draft lives in [specs/concept-submission.md](../specs/concept-submission.md).
