import { test } from "node:test";
import assert from "node:assert/strict";
import {
  describeConnection,
  shouldAskBeforeDownload,
  formatBytes,
  ASK_ABOVE_BYTES,
} from "./data-cost.ts";

const UNKNOWN = describeConnection(null);
const WIFI = describeConnection({ type: "wifi", effectiveType: "4g" });
const CELL = describeConnection({ type: "cellular", effectiveType: "4g" });
const SLOW = describeConnection({ effectiveType: "2g" });
const SAVER = describeConnection({ type: "wifi", saveData: true });

test("a browser that says nothing leaves us honestly not knowing", () => {
  assert.deepEqual(UNKNOWN, { known: false, saveData: false, metered: false });
  assert.deepEqual(describeConnection(undefined), UNKNOWN);
  assert.deepEqual(describeConnection({}), UNKNOWN, "an empty object is no information either");
  assert.equal(UNKNOWN.metered, false, "not knowing is not the same as claiming Wi-Fi — see shouldAsk");
});

test("describeConnection reads the connection type when there is one", () => {
  assert.equal(WIFI.metered, false);
  assert.equal(CELL.metered, true);
  assert.equal(describeConnection({ type: "ethernet" }).metered, false);
  assert.equal(WIFI.known, true);
});

test('"4g" alone never proves an unmetered link — fast Wi-Fi reports it too', () => {
  const only4g = describeConnection({ effectiveType: "4g" });
  assert.equal(only4g.known, true);
  assert.equal(only4g.metered, false, "we do not claim it is metered…");
  // …and because we cannot prove it is not, the gate still opens for a first-time reader.
  assert.equal(shouldAskBeforeDownload({ bytes: 13e6, allowed: false, connection: only4g }), true);
});

test("a slow connection counts as one worth asking about", () => {
  assert.equal(SLOW.metered, true);
  assert.equal(describeConnection({ effectiveType: "slow-2g" }).metered, true);
  assert.equal(describeConnection({ effectiveType: "3g" }).metered, true);
});

test("data saver is treated as metered however fast the link is", () => {
  assert.equal(SAVER.saveData, true);
  assert.equal(SAVER.metered, true, "the reader asked for less data; the link speed is beside the point");
});

test("the gate opens only for genuinely large media", () => {
  const small = { allowed: false, connection: CELL };
  assert.equal(shouldAskBeforeDownload({ bytes: 136 * 1024, ...small }), false, "a scene image");
  assert.equal(shouldAskBeforeDownload({ bytes: 822 * 1024, ...small }), false, "a narration track");
  assert.equal(shouldAskBeforeDownload({ bytes: ASK_ABOVE_BYTES, ...small }), false, "exactly at the line");
  assert.equal(shouldAskBeforeDownload({ bytes: 12_930_585, ...small }), true, "a film");
});

test('"don\'t ask again" is remembered — the gate is a warning, not a toll', () => {
  assert.equal(shouldAskBeforeDownload({ bytes: 13e6, allowed: true, connection: WIFI }), false);
  assert.equal(shouldAskBeforeDownload({ bytes: 13e6, allowed: true, connection: CELL }), false);
});

test("an active data saver outranks a remembered choice", () => {
  // Someone turned this on in their browser or their phone, today. A box ticked in this app last
  // month does not get to cancel it.
  assert.equal(shouldAskBeforeDownload({ bytes: 13e6, allowed: true, connection: SAVER }), true);
});

test("formatBytes gives a reader a number they can weigh against their bundle", () => {
  assert.equal(formatBytes(14_194_910), "13.5 MB");
  assert.equal(formatBytes(12_319_577 + 12_930_585), "24.1 MB", "1816 plays two films back to back");
  assert.equal(formatBytes(136 * 1024), "136 KB", "no decimal above 100 — it adds nothing");
  assert.equal(formatBytes(320_000), "313 KB");
  assert.equal(formatBytes(48_000), "46.9 KB", "below 100 the decimal still carries information");
  assert.equal(formatBytes(900), "900 B");
  assert.equal(formatBytes(0), "0 KB");
  assert.equal(formatBytes(-5), "0 KB");
  assert.equal(formatBytes(Number.NaN), "0 KB");
  assert.equal(formatBytes(2.5 * 1024 ** 3), "2.5 GB");
});
