# 11 — On-Chain Heritage: Blockchain & Tokenisation Plan

> **Goal:** digitise South African history so it is preserved, provenanced, and *owned by its
> communities* — permanently. Make judges and South Africans feel it: "our history, notarised
> forever, un-erasable, and ours." This doc is the honest architecture + phased plan. Tech stays
> **subordinate to the humanities** (rubric: Humanities 30% > Community 25% > Access 20% …).

---

## 1. The honest case for blockchain here (and where it's hype)

Blockchain is the right tool for **three** real problems in this project — and the wrong tool for most others. Use it only where it genuinely earns its place:

| Real problem | Does blockchain help? | Why |
|---|---|---|
| **Permanence** — history outliving any company/server | ✅ Yes | Content on Arweave + a provenance record on Solana survives us. "Till the end of time" is literally its design goal. |
| **Provenance & tamper-evidence** — proof a text/story is authentic, unaltered, attributed | ✅ Yes | A cryptographic hash on a public ledger = anyone can verify nothing was changed or faked. Decolonial: truth that no institution can quietly rewrite. |
| **Community ownership** — communities *own* their heritage, not a platform | ✅ Yes | A token/cNFT in a community's wallet is ownership no gatekeeper can revoke. |
| Storing large audio/video | ❌ No | Chains don't store big files — use Arweave/IPFS, anchor only a hash. |
| "Tokenise everything / make it tradeable" | ⚠️ Careful | Commodifying heritage is *extractive* — the exact thing the hackathon's ethics rule forbids. See §4. |

**Bottom line:** we use blockchain for **permanence + provenance + ownership**, store the actual
content off-chain, and we do **not** turn people's voices or heritage into speculative assets.

---

## 2. Hard constraints we must design around (non-negotiable)

1. **POPIA vs immutability — the critical one.** POPIA guarantees the **right to erasure**. A
   blockchain is **immutable** — you can't delete. Putting personal data (a voice recording, a name,
   a face) on-chain **permanently violates POPIA.** → **Rule: no personal data ever goes on-chain.**
   Only *non-personal* provenance (a content hash, a timestamp, a consent flag, a public license)
   goes on-chain. Personal recordings stay in **erasable** storage (Supabase/local); we anchor only a
   hash. Delete the audio → the orphan hash is not personal data → erasure still works. ✔
2. **Two content classes, two permanence policies:**
   - **The literary canon** (Plaatje, Mqhayi, Mutwa, Vilakazi — *public-domain / cited, not personal
     data*) → **permanent** (Arweave + provenance cNFT). Safe and perfect.
   - **Community oral histories** (personal data) → **erasable** off-chain; on-chain only a
     hash-anchor **with explicit consent**, and only if the contributor opts into public provenance.
3. **Cost / "100% free" caveat.** Devnet = free (perfect for the hackathon demo). Mainnet + Arweave
   cost *pennies* (compressed NFTs ≈ fractions of a cent each; Arweave ≈ small one-time fee per MB).
   This is the one place we knowingly spend a few dollars — be transparent in the pitch.
4. **Deadline (9 Jul).** A full production chain system in ~7 days on top of everything else is not
   realistic. Ship a **working devnet proof-of-concept** that demos the *whole idea*, with the full
   build as a funded roadmap. A tight working demo beats a sprawling half-thing.
5. **Humanities first.** Judges of a *humanities* hackathon can be blockchain-skeptical. We frame it
   as **"decolonial permanence + community ownership,"** never "crypto." No coins, no speculation.

---

## 3. Architecture — "The Heritage Ledger"

Four layers. Personal data never crosses into the permanent/on-chain layers.

```
┌─────────────────────────── Maloba app (Expo) ───────────────────────────┐
│  Reader · Community Archive · NEW: "Heritage Ledger" screen              │
│  - shows each artifact's on-chain provenance + "Verify on Solana" link   │
└─────────────┬───────────────────────────────────────────┬───────────────┘
              │                                           │
   (personal, erasable)                        (non-personal, permanent)
              │                                           │
┌─────────────▼────────────┐              ┌───────────────▼─────────────────┐
│ Supabase / local (POPIA) │              │ Arweave / IPFS  (permanent store)│
│ - raw voice recordings    │              │ - canon texts, public artifacts  │
│ - PII, consent records    │   hash only  │ - content-addressed (CID/tx)     │
│ - right-to-erasure ✔      │─────────────▶│                                  │
└──────────────────────────┘              └───────────────┬─────────────────┘
                                                          │ hash + metadata
                                          ┌───────────────▼─────────────────┐
                                          │ Solana program "HeritageRegistry"│
                                          │ - artifact hash, arweave id,     │
                                          │   contributor pubkey, timestamp, │
                                          │   consent flag, license          │
                                          │ - mints a provenance cNFT        │
                                          └───────────────┬─────────────────┘
                                                          │ read via
                                          ┌───────────────▼─────────────────┐
                                          │ Helius DAS API (index/display)   │
                                          └──────────────────────────────────┘
```

- **Storage:** Arweave (permanent, pay-once) for the canon; IPFS for cheap dev. Content-addressed so
  the hash *is* the proof.
- **Chain:** a small **Anchor** program on Solana records provenance and mints a **compressed NFT**
  (Metaplex Bubblegum — mass-mint for ~$0.0001 each) as the ownership/authenticity token.
- **Wallets:** for the demo, a **project custodial wallet** mints *on behalf of* communities (simpler
  + no crypto-onboarding friction + POPIA-friendly). Real contributor wallets = Phase B.
- **Index/read:** Helius DAS API powers the in-app "Heritage Ledger" (list artifacts, verify links).

---

## 4. What to tokenise — my recommendations (and what NOT to)

**Tokenise these (they serve the mission):**

1. **Provenance cNFT per artifact** ⭐ *(the core)* — one compressed NFT per literary work and per
   consented community story: `{ title, author/contributor, arweave hash, timestamp, license }`.
   A permanent, verifiable certificate of authenticity + attribution, owned by the community. Cheap,
   scalable, and the clearest "mind-blown" artifact.
2. **Custodian recognition badges** — **non-transferable** Token-2022 tokens (soulbound-style) that
   honour elders/contributors as *custodians of heritage*. Recognition, not a tradeable asset. Deeply
   on-theme (reclaiming voices → naming their keepers).
3. **Heritage governance (later, careful)** — a *non-financial* membership token so communities
   curate their own archive (what's public, how it's described). Frame as stewardship, not a coin.

**Do NOT tokenise (extractive — violates the ethics rule):**

- ❌ People's voices/stories as tradeable/speculative assets.
- ❌ Access to heritage behind a paywall token.
- ❌ Any "fan token / coin" with price speculation. This is heritage, not a memecoin.

> The line: tokens here are **certificates of truth and ownership**, never instruments of profit.

---

## 5. Tech stack + how `solana-ai-kit` accelerates us

| Layer | Choice | Notes |
|---|---|---|
| Chain | **Solana** (devnet → mainnet) | fast, cheap, great NFT tooling |
| Program | **Anchor** (Rust) | `HeritageRegistry` program: `register_artifact`, `anchor_hash`, `mint_provenance` |
| Tokens | **Metaplex Bubblegum (cNFT)** + **Token-2022** (non-transferable extension for badges) | cNFTs = mass, near-free minting |
| Permanent storage | **Arweave** (Irys/Bundlr uploader) | canon only; IPFS for dev |
| Indexing/RPC | **Helius** (DAS API + RPC) | read cNFTs, power the Ledger screen |
| Local testing | **Surfpool** (from the kit) | agent-driven local validator / mainnet-fork |

**`solana-ai-kit` is a Claude-Code dev accelerator, not a runtime library.** It ships 15 agents
(`solana-architect`, `anchor-engineer`, `token-engineer`, `solana-frontend-engineer`) and MCP
servers (Helius, solana-dev docs, Surfpool). We'd **keep the Solana program in its own package/repo**
(`chain/` — Rust/Anchor) and use the kit's agents to design + write + test it fast, then integrate
the client into the Expo app. Install it into that `chain/` workspace (or a sibling), not over
Maloba's existing `.claude/` humanities config.

---

## 6. Phased plan (deadline-aware)

### Phase A — Devnet proof-of-concept — **demo-able by 9 Jul** (the pitch centrepiece)
Scope tight, make it *real and working* on devnet (free):
1. `chain/` workspace; install solana-ai-kit tooling.
2. Anchor **`HeritageRegistry`** program (devnet): `register_artifact(hash, arweaveId, meta)` +
   mint one **provenance cNFT**.
3. Register **one literary pillar** (e.g. *Mhudi*) and **one sample consented community story**
   (hash-anchor only — POPIA-safe).
4. New **"Heritage Ledger"** screen in the app: shows the artifact, its hash, timestamp, and a
   **"Verify on Solana Explorer"** link → judges click and see it on-chain, live.
5. Script it into the demo video: *"This story is now notarised on a public ledger, owned by the
   community, and can never be silently altered or erased — while personal data stays fully
   POPIA-protected."*

**Deliverable:** a judge clicks a link and sees South African heritage on-chain. That's the moment.

### Phase B — Finalist build (13–16 Jul, if selected)
- Arweave permanent storage for the canon; real contributor wallets (Solana wallet adapter / Solana
  Mobile); Helius-indexed public ledger; custodian recognition badges (Token-2022).

### Phase C — Post-hackathon vision (the "future potential" story)
- Heritage DAO for community curation; partnerships with archives/universities/museums; broader
  corpus; multi-country African heritage federation. This is the fundable, world-changing arc.

---

## 7. Rubric fit + the "mind-blown" beat

- **Sustainability & Future Potential (10%):** permanence + community ownership + a clear roadmap →
  top marks; this is exactly what the criterion rewards.
- **Community Impact (25%):** communities *own* provenance tokens of their own heritage; custodians
  named and honoured.
- **Creativity & Innovation (15%):** AI (Gemini/Pollinations/Lelapa/Botlhale) **+** blockchain **+**
  humanities, fused — not bolted on.
- **Humanities (30%):** still first. Blockchain serves *truth* (tamper-evidence) and *decolonial
  permanence* — the story stays the point.
- **The line that lands:** *"Africa's foundational literature and its communities' oral histories —
  notarised on-chain forever, owned by the communities themselves, un-erasable truth — while every
  person's privacy stays protected under POPIA."*

---

## 8. Risks & honest recommendation

- **Blockchain skepticism** from humanities judges → frame as permanence/ownership, never "crypto";
  no tokens with prices; show a *working* verify-link, not slideware.
- **POPIA mistake** → the §2 rule (no personal data on-chain, hash-anchor + consent only) is
  mandatory; get it wrong and it's a *harm*, not a bug.
- **Scope/deadline** → do Phase A only for 9 Jul. Resist building the DAO now.
- **Cost honesty** → devnet demo is free; note the pennies-scale mainnet/Arweave cost in the pitch.

**Recommendation:** green-light **Phase A** as a focused, working devnet PoC + the Heritage Ledger
screen. It delivers the wow, respects POPIA, keeps humanities first, and de-risks the deadline.

---

## 9. Open decisions (need Emma's call)

1. **Phase A scope for 9 Jul:** just the on-chain provenance PoC + Ledger screen? (recommended)
2. **Custodial vs real wallets for the demo:** custodial (simpler, POPIA-friendly) recommended for now.
3. **Storage for the demo:** IPFS (free, dev) vs Arweave (permanent, small cost). IPFS for Phase A.
4. **Where the chain code lives:** a new `chain/` Anchor workspace with solana-ai-kit tooling — OK?
