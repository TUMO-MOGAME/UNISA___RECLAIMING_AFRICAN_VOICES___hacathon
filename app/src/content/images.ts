// Scene image resolver — prefer a pre-generated local asset (Gemini, cached & offline), else fall
// back to a live Pollinations URL. Callers pass the Pollinations URL; this swaps in the local asset
// when one exists, so generated art appears automatically once `npm run gen:images` has run.

import { sceneImageUrl } from "../services/pollinations";
import { GENERATED_IMAGES } from "./images.generated";

export type ImageSource = string | number;

export function sceneImageSource(
  moduleId: string,
  sceneId: string,
  prompt: string,
  opts: { w?: number; h?: number; seed?: number } = {}
): ImageSource {
  const local = GENERATED_IMAGES[`${moduleId}:${sceneId}`];
  return local ?? sceneImageUrl(prompt, opts);
}
