// Which road the hero walks, per country.
//
// The hero trailer has always walked South Africa's road, whatever country was selected in the
// header. That was fine while South Africa was the only country in the app, and it stopped being
// fine once `/countries` offered 54. This registry is the seam: the hero asks for the selected
// country's trail, and the answer is either a real researched road or nothing.
//
// INTEGRITY (AGENTS.md §4). A country appears here ONLY when its milestones are researched and
// sourced. There is no "generate a plausible timeline" path and there must never be one — a fabricated
// national history is the worst thing this app could ship. A country that is absent is absent on
// purpose, and the hero says so out loud rather than quietly walking South Africa's road under
// another country's flag.
//
// ADDING A COUNTRY is a data edit, not a code change:
//   1. Finish the Milestones table in `countries/<iso>-<name>.md`, with a source per row.
//   2. Author them as a `HistoryMilestone[]` the way `history-trail.ts` does.
//   3. Add one line to TRAILS below.
// `countries/bw-botswana.md` has 19 dated events ready for exactly this — but its citation markers
// were lost in the paste it came from, so it is NOT wired up yet. Sourced per claim, then wired.

// NOTE the explicit `.ts`: this is the one runtime cross-import in the content layer, and the
// extension is what lets `trails.test.ts` load it under `node --test` (the type-stripping loader
// will not resolve an extensionless path). tsconfig runs `module: preserve` + `noEmit`, so tsc
// accepts it and Metro resolves it unchanged.
import { historyTrail, historyTrailSource, type HistoryMilestone } from "./history-trail.ts";

export type CountryTrail = {
  /** ISO 3166-1 alpha-2, matching `anthems.ts`. */
  country: string;
  /** The dots on the road, in order. */
  milestones: HistoryMilestone[];
  /** Where the milestone notes come from — shown under the trail. */
  sourceNote: string;
};

const TRAILS: Record<string, CountryTrail> = {
  za: {
    country: "za",
    milestones: historyTrail,
    sourceNote: historyTrailSource,
  },
};

/** The road we walk when the selected country has none of its own yet. */
export const FALLBACK_TRAIL: CountryTrail = TRAILS.za;

/** The researched trail for a country, or undefined. Undefined is a real answer — do not paper over it. */
export const trailFor = (countryCode: string): CountryTrail | undefined => TRAILS[countryCode];

/** True when this country has its own researched road. */
export const hasTrail = (countryCode: string): boolean => countryCode in TRAILS;

/**
 * What the hero should actually walk, and whether it belongs to the country the reader picked.
 * `isOwn: false` is the honest case the UI has to surface, not hide.
 */
export function trailToWalk(countryCode: string): { trail: CountryTrail; isOwn: boolean } {
  const own = trailFor(countryCode);
  return own ? { trail: own, isOwn: true } : { trail: FALLBACK_TRAIL, isOwn: false };
}
