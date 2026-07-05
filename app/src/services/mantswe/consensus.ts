// Mantswe a Batho — consensus aggregation ("Voices of the People").
//
// The academic heart of the feature: given many testimonies about the same event — each reduced to a
// set of normalised claim keys (that extraction is the Gemini stage; THIS is the deterministic tally) —
// surface where accounts AGREE and where they DIFFER. The integrity law is encoded here: this function
// COUNTS and GROUPS; it never crowns a winner. "Most said X" ≠ "X is true" — the caller renders
// divergence plainly ("of N accounts: 87 recall X, 9 recall Y, 4 add a detail no one else does").
//
// POPIA: the aggregate is DERIVED, never frozen with a person's data. On withdrawal, drop the
// testimony and re-aggregate — `withdraw()` + `aggregate()` do exactly that (tested).
//
// Pure logic → unit-tested under `node --test`.

export type Testimony = {
  id: string;
  /** Normalised claim keys this account makes about the topic. */
  claims: string[];
};

export type ClaimTally = {
  claim: string;
  /** How many testimonies make this claim. */
  count: number;
  /** Fraction of all testimonies (count / total). */
  share: number;
  /** Which testimonies support it — no orphan facts; every claim links back. */
  testimonyIds: string[];
};

export type Consensus = {
  /** Number of testimonies aggregated. */
  total: number;
  /** Every claim, most-supported first — the "of N accounts, X recall…" view. */
  claims: ClaimTally[];
  /** Claims only one account makes — the details no one else remembers. */
  unique: ClaimTally[];
};

/** Remove a withdrawn testimony (POPIA erasure). Re-run aggregate() on the result to recompute. */
export function withdraw(testimonies: Testimony[], id: string): Testimony[] {
  return testimonies.filter((t) => t.id !== id);
}

/** Tally claims across testimonies. Deterministic: sorted by count desc, then claim asc for stability.
 * A claim a single account repeats is still counted once (testimonyIds are unique). */
export function aggregate(testimonies: Testimony[]): Consensus {
  const total = testimonies.length;
  const byClaim = new Map<string, Set<string>>();

  for (const t of testimonies) {
    for (const claim of t.claims) {
      if (!byClaim.has(claim)) byClaim.set(claim, new Set());
      byClaim.get(claim)!.add(t.id);
    }
  }

  const claims: ClaimTally[] = [...byClaim.entries()]
    .map(([claim, ids]) => ({
      claim,
      count: ids.size,
      share: total ? ids.size / total : 0,
      testimonyIds: [...ids].sort(),
    }))
    .sort((a, b) => b.count - a.count || (a.claim < b.claim ? -1 : a.claim > b.claim ? 1 : 0));

  const unique = claims.filter((c) => c.count === 1);

  return { total, claims, unique };
}
