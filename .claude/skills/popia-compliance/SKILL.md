---
name: popia-compliance
description: Maloba's POPIA data-protection guardrails. Use WHENEVER building or editing anything that records audio, collects personal info, uploads to Supabase, transcribes via Lelapa, or stores/deletes user data. POPIA compliance is mandatory in the hackathon rules and scores under Community Impact + Sustainability. A person's voice IS personal information. No PII feature ships without all four safeguards.
---

# POPIA Compliance — build the guardrails WITH the feature

A person's voice, recollections, and opinions are **personal information** under POPIA. The Community
Archive records voices, so ethical data governance is a core feature. (See
[docs/05-popia-compliance.md](../../../docs/05-popia-compliance.md) and [AGENTS.md](../../../AGENTS.md) §4.)

## The four safeguards — ALL required before any PII feature ships

1. **Explicit consent before the mic activates.** A clear, non-technical `ConsentSheet` must block
   `startRecording()` until the user opts in AND chooses private vs public. Declining is one tap.
2. **Purpose transparency.** State plainly that audio goes to Lelapa AI (transcription) + Supabase
   (storage), only to archive/translate their story.
3. **Row-Level Security.** Supabase tables created with RLS + owner-only policies **before** the first
   upload. The shipped anon key is safe *only* because RLS is on — verify it.
4. **Right to erasure.** A one-tap delete that really removes the audio + transcript (local + remote +
   storage object), not a hide.

## The rule

> If you build the recorder, you build the consent gate and the delete path **in the same change.**
> Never a recording feature first and "consent later."

## Minimum for the concept demo

Even before cloud sync: ship **consent sheet → local-only save → delete**. That proves the ethical
model end-to-end. Show the consent screen in the demo video — judges reward visible guardrails.

## Checklist

- [ ] `ConsentSheet` blocks recording until consent + visibility choice.
- [ ] Consent choice + timestamp stored with each recording.
- [ ] RLS enabled + owner-only policies before any upload.
- [ ] Plain-language transparency copy on the consent sheet.
- [ ] Erasure deletes local + remote rows + storage object.
- [ ] `EXPO_PUBLIC_*` only ever holds public/anon keys (never a service key).
