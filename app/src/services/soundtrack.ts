// A shared, non-repeating soundtrack playlist for the cinematic Journey player.
//
// Behaviour (agreed with the builder):
//   • Clips are played in a random order (a shuffle bag), not the order they were sliced — this
//     avoids the "same section again" feel of the overlapping source windows.
//   • Every clip that starts playing consumes the NEXT clip from the bag. This is true both when a
//     clip ends inside a journey AND when a fresh journey opens, so no clip is reused across
//     journeys until the whole bag has been played.
//   • Once every clip has been used the bag reshuffles for a new cycle, taking care not to open the
//     new cycle on the clip that just closed the old one.
//
// This module holds only the ordering logic (plain indices) so it can be unit-tested without
// importing the bundled .mp3 assets. Journey.tsx maps each index onto `soundtrackClips` from
// ../content/soundtrackClips.

export type Playlist = {
  /** Return the next clip index from the shuffled bag and advance. Reshuffles after the last clip. */
  next(): number;
  /** Number of clips in the pool. */
  readonly size: number;
};

function range(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i);
}

/** Fisher–Yates shuffle (in place), returns the same array for convenience. */
function shuffle(arr: number[], rng: () => number): number[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Create a shuffle-bag playlist over `count` clips. Every clip plays exactly once per cycle before
 * any repeats; when the bag empties it reshuffles for the next cycle and won't hand out the clip
 * that just finished as the first of the new cycle.
 */
export function createPlaylist(count: number, rng: () => number = Math.random): Playlist {
  if (count <= 0) throw new Error("createPlaylist: need at least one clip");
  let order = shuffle(range(count), rng);
  let cursor = 0;
  return {
    get size() {
      return count;
    },
    next() {
      const i = order[cursor];
      cursor += 1;
      if (cursor >= count) {
        order = shuffle(range(count), rng);
        // avoid an immediate back-to-back repeat across the cycle boundary
        if (count > 1 && order[0] === i) {
          [order[0], order[1]] = [order[1], order[0]];
        }
        cursor = 0;
      }
      return i;
    },
  };
}

// One playlist shared by every Journey for the whole app session, so the shuffled sequence carries
// over as the user moves between stories — one clip in this journey, the next in the following one.
let shared: Playlist | null = null;
export function sharedPlaylist(count: number): Playlist {
  if (!shared) shared = createPlaylist(count);
  return shared;
}
