# 07 — Accessibility & Inclusivity (20% of the score — build it in, not on)

The rubric rewards inclusive design across **language, ability, and connectivity**. These are
requirements from day one, verified at each phase.

## Connectivity & data cost (South African reality)

- **Offline-first reading:** literary content ships with the app (bundled JSON) or caches on first
  open; it must be readable with the radio off. (WatermelonDB local store.)
- **Cache every generated asset:** Pollinations images and Gemini text cache by stable key and never
  re-fetch. Data is expensive; respect it.
- **Lazy-load + low-res option:** load scene images at a sensible resolution; offer a "data saver" that
  uses bundled static images instead of generating.
- **Graceful degradation:** every network feature has a no-network path — never a spinner that hangs or
  a crash. (Failed image → static fallback + Lottie; failed transcription → queued retry.)

## Language diversity

- **Setswana + English** at minimum, via an `i18n/` string layer + language context.
- Architected to extend to **all 11 official SA languages** — strings are data, not hardcoded.
- Indigenous languages are **first-class** (Lelapa code-switching STT), not bolted on.
- Literary translations are **human-reviewed drafts**, never presented as authoritative machine output.

## Varying abilities

- **Scalable text** (respect OS font scaling); minimum comfortable body size.
- **High contrast** between overlaid text and cinematic backgrounds (scrim/gradient behind text).
- **Large tap targets** (≥44px) and clear focus states; simple, predictable navigation.
- **Child Mode** is itself an accessibility feature — same history, lower reading level.
- Provide **text alternatives** for audio (transcripts) and treat audio as enhancement, not the only
  channel.

## Device reality

- Runs on **low-cost Android** and in any **browser** from one codebase (Expo).
- Keep bundle and memory modest; test on a small viewport / cheap device profile.

## Verification per phase

- [ ] Phase 1: turn off network → a module still reads; text scales; contrast is legible on a phone.
- [ ] Phase 1: ST/EN toggle changes UI + content strings.
- [ ] Phase 2: recorder + consent usable with large touch targets; works without immediate connectivity
      (saves locally, syncs later).
- [ ] Phase 3: data-saver path verified; all spinners have a timeout + fallback.
