// Media for the history-trail "dot stories" — each milestone can open a full-screen story that starts
// on a picture, then plays a film. Keyed by milestone id (see content/history-trail.ts).
//
// Integrity: the 1652 picture is a DIGNIFIED AI interpretation (labelled as such in the story). Films
// are real archival/documentary media the user supplies. Only add an entry once its media exists.
// require() paths must be static string literals (Metro), so entries are listed explicitly.

export type JourneyMedia = {
  /** Opening still (require of a bundled image). */
  image?: number;
  /** Whether the image is an AI artistic interpretation (shown labelled) vs a real photo. */
  imageIsAI?: boolean;
  /** Single film to play after the picture (require of a bundled .mp4). Web plays it inline. */
  video?: number;
  /** Ordered playlist of films to play back-to-back after the picture (require of bundled .mp4s).
   *  Takes precedence over `video` when present; the player advances through them in order. */
  videos?: number[];
  /**
   * PWA-06 — the measured byte size of `video`, and of each entry of `videos` in the same order.
   *
   * These are what the reader is shown before a film is fetched, so they are not decoration: a film
   * swapped without updating its number would quote someone the wrong price for their airtime.
   * `journey-media.test.ts` stats the real files and fails the build if any of these drifts.
   */
  videoBytes?: number;
  videosBytes?: number[];
};

/** Everything a `Watch the film` press will actually pull down — the WHOLE playlist, because that
 *  is what one press commits to. 1816 plays two films back to back and must say so. */
export function filmBytes(m: JourneyMedia | undefined): number {
  if (!m) return 0;
  if (m.videos?.length) return (m.videosBytes ?? []).reduce((a, b) => a + b, 0);
  return m.videoBytes ?? 0;
}

// Every "big dot" (top-level milestone in history-trail.ts) opens on a dignified AI interpretation of
// its event (labelled as such). Films are added per-dot later as Tumo supplies them — until then a dot
// shows its picture + description and "Skip" only (the "Watch the film" button appears once a video is
// added). 1652 already has both a picture and a film.
export const journeyMedia: Record<string, JourneyMedia> = {
  // 1652 — the arrival of the Dutch at the Cape (start of colonial settlement).
  y1652: {
    image: require("../../assets/journey/y1652.webp"),
    imageIsAI: true,
    video: require("../../assets/journey/1652.mp4"),
    videoBytes: 14_194_910,
  },
  y1779: { image: require("../../assets/journey/y1779.webp"), imageIsAI: true },
  y1806: { image: require("../../assets/journey/y1806.webp"), imageIsAI: true },
  // 1816 — the rise of the Zulu kingdom. Picture, then two films in order (Tumo's selection).
  y1816: {
    image: require("../../assets/journey/y1816.webp"),
    imageIsAI: true,
    videos: [
      require("../../assets/journey/1816-we-are-growing.mp4"),
      require("../../assets/journey/1816-song-of-kings.mp4"),
    ],
    videosBytes: [12_319_577, 12_930_585],
  },
  y1834: { image: require("../../assets/journey/y1834.webp"), imageIsAI: true },
  y1838: { image: require("../../assets/journey/y1838.webp"), imageIsAI: true },
  y1867: { image: require("../../assets/journey/y1867.webp"), imageIsAI: true },
  y1879: { image: require("../../assets/journey/y1879.webp"), imageIsAI: true },
  y1886: { image: require("../../assets/journey/y1886.webp"), imageIsAI: true },
  y1899: { image: require("../../assets/journey/y1899.webp"), imageIsAI: true },
  y1910: { image: require("../../assets/journey/y1910.webp"), imageIsAI: true },
  y1912: { image: require("../../assets/journey/y1912.webp"), imageIsAI: true },
  y1913: { image: require("../../assets/journey/y1913.webp"), imageIsAI: true },
  y1948: { image: require("../../assets/journey/y1948.webp"), imageIsAI: true },
  y1955: { image: require("../../assets/journey/y1955.webp"), imageIsAI: true },
  y1956: { image: require("../../assets/journey/y1956.webp"), imageIsAI: true },
  y1960: { image: require("../../assets/journey/y1960.webp"), imageIsAI: true },
  y1964: { image: require("../../assets/journey/y1964.webp"), imageIsAI: true },
  y1976: { image: require("../../assets/journey/y1976.webp"), imageIsAI: true },
  y1990: { image: require("../../assets/journey/y1990.webp"), imageIsAI: true },
  y1994: { image: require("../../assets/journey/y1994.webp"), imageIsAI: true },
  y2010: { image: require("../../assets/journey/y2010.webp"), imageIsAI: true },
  y2013: { image: require("../../assets/journey/y2013.webp"), imageIsAI: true },
  y2024: { image: require("../../assets/journey/y2024.webp"), imageIsAI: true },
  y2026: { image: require("../../assets/journey/y2026.webp"), imageIsAI: true },
};

export const mediaFor = (id: string): JourneyMedia | undefined => journeyMedia[id];
export const hasStory = (id: string): boolean => {
  const m = journeyMedia[id];
  return !!(m && (m.image != null || m.video != null || (m.videos?.length ?? 0) > 0));
};
