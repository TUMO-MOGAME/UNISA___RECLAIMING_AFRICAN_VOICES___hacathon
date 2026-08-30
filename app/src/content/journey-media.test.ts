import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// PWA-06 — the film sizes shown to a reader must be the sizes of the actual films.
//
// journey-media.ts declares `videoBytes` / `videosBytes` next to each `require()` because that is
// the number the data gate quotes before spending someone's airtime. A number is easy to forget when
// a film is re-cut, and a stale one is worse than none: it tells a reader on prepaid data that a
// 24 MB fetch costs 12 MB. So this test stats the real files and fails the build on any drift.
//
// It parses the SOURCE rather than importing the module, because `require("*.mp4")` is Metro's, not
// node's — importing journey-media.ts under `node --test` would throw on the first asset.

const HERE = new URL(".", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SRC = join(HERE, "journey-media.ts");
const source = readFileSync(SRC, "utf8");

/** Slice each `yNNNN: { … }` entry out of the registry by matching braces. */
function entries(src: string): { id: string; body: string }[] {
  const out: { id: string; body: string }[] = [];
  const re = /\n {2}(y\d{4}): \{/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const open = src.indexOf("{", m.index + m[0].length - 1);
    let depth = 0;
    for (let i = open; i < src.length; i++) {
      if (src[i] === "{") depth++;
      else if (src[i] === "}") {
        depth--;
        if (depth === 0) {
          out.push({ id: m[1], body: src.slice(open, i + 1) });
          break;
        }
      }
    }
  }
  return out;
}

const all = entries(source);

/** The declared byte counts in an entry, in source order — `videoBytes` then `videosBytes: [...]`. */
function declaredBytes(body: string): number[] {
  const single = /videoBytes:\s*([\d_]+)/.exec(body);
  const list = /videosBytes:\s*\[([^\]]*)\]/.exec(body);
  if (list) {
    return list[1]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => Number(s.replace(/_/g, "")));
  }
  return single ? [Number(single[1].replace(/_/g, ""))] : [];
}

/** The .mp4 paths an entry requires, in play order. */
function filmPaths(body: string): string[] {
  return [...body.matchAll(/require\("([^"]+\.mp4)"\)/g)].map((m) => m[1]);
}

test("the journey media registry parses and holds every milestone", () => {
  assert.ok(all.length >= 20, `expected the full trail, parsed ${all.length} entries`);
  assert.ok(all.some((e) => e.id === "y1652"));
  assert.ok(all.some((e) => e.id === "y1816"));
});

test("every film declares its size, and the size is the file's real size", () => {
  const problems: string[] = [];

  for (const { id, body } of all) {
    const films = filmPaths(body);
    const bytes = declaredBytes(body);
    if (films.length === 0) {
      if (bytes.length) problems.push(`${id}: declares film sizes but requires no film`);
      continue;
    }
    if (films.length !== bytes.length) {
      problems.push(`${id}: ${films.length} film(s) but ${bytes.length} size(s) declared`);
      continue;
    }
    films.forEach((rel, i) => {
      const abs = join(HERE, rel);
      let real: number;
      try {
        real = statSync(abs).size;
      } catch {
        problems.push(`${id}: ${rel} is required but not on disk`);
        return;
      }
      if (real !== bytes[i]) {
        problems.push(`${id}: ${rel} is ${real} bytes, declared ${bytes[i]} — update journey-media.ts`);
      }
    });
  }

  assert.deepEqual(problems, [], `\n  ${problems.join("\n  ")}\n`);
});

test("the films really are big enough to be worth asking about", () => {
  // Guards the premise of PWA-06 itself. If a transcode ever brings these under the gate's
  // threshold the gate stops firing, and this test is where that gets noticed rather than assumed.
  const sizes = all.flatMap(({ body }) => (filmPaths(body).length ? declaredBytes(body) : []));
  assert.ok(sizes.length >= 3, "expected the three bundled films");
  for (const s of sizes) {
    assert.ok(s > 2 * 1024 * 1024, `a ${s}-byte film would slip under ASK_ABOVE_BYTES unnoticed`);
  }
});
