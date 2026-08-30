// The narration cache key — pure, dependency-free, unit-tested under `node --test`.
//
// Split out of cache.ts for the same reason cloud-util.ts is split out of cloud.ts: cache.ts imports
// `./cache-store` WITHOUT a file extension, because that extensionless specifier is what lets Metro
// resolve it to cache-store.web.ts on web and cache-store.ts everywhere else. Node's test runner
// cannot follow an extensionless import, so the logic worth testing lives here instead.

/**
 * A stable key for one rendering of one passage.
 *
 * FNV-1a — small, fast, dependency-free and entirely adequate: this is a cache lookup, not a
 * security boundary, and a collision costs one wrong clip rather than anything worse. The text is
 * hashed rather than stored so the key stays short whatever the length of the passage.
 *
 * All four inputs matter. Provider and voice, because the same words rendered by a different engine
 * are a different clip. Language, obviously. And the text itself, so a corrected translation misses
 * the cache and is re-rendered rather than serving the old audio for the rest of the month.
 */
export function narrationKey(opts: { provider: string; lang: string; voice: string; text: string }): string {
  const material = `${opts.provider} ${opts.lang} ${opts.voice} ${opts.text.trim()}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < material.length; i++) {
    h ^= material.charCodeAt(i);
    // 32-bit FNV prime multiply, kept in range without BigInt.
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  // The length is folded in as well: two different passages that collide on the hash almost never
  // also share a character count, and it costs four characters of key to rule that out.
  return `${opts.provider}:${opts.lang}:${opts.voice}:${h.toString(36)}:${material.length.toString(36)}`;
}
