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
  /** Film to play after the picture (require of a bundled .mp4). Web plays it inline. */
  video?: number;
};

export const journeyMedia: Record<string, JourneyMedia> = {
  // 1652 — the arrival of the Dutch at the Cape (start of colonial settlement).
  y1652: {
    image: require("../../assets/journey/y1652.webp"),
    imageIsAI: true,
    video: require("../../assets/journey/1652.mp4"),
  },
};

export const mediaFor = (id: string): JourneyMedia | undefined => journeyMedia[id];
export const hasStory = (id: string): boolean => {
  const m = journeyMedia[id];
  return !!(m && (m.image != null || m.video != null));
};
