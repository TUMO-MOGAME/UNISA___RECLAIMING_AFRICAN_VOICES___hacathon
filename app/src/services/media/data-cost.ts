// What a piece of media actually costs to fetch, and whether to ask first (PWA-06).
//
// THE PROBLEM THIS FIXES. docs/07-accessibility.md promises a low-data app, and the measured payload
// backs that up everywhere but one place: a story to read is ~0.3 MB, a scene image 136 KB — and a
// film is 12–14 MB. The 1816 milestone plays two back to back, so one tap on "Watch the film" could
// pull ~24 MB down a metered line without ever telling the reader. On South African prepaid data
// that is real money spent by someone who was not asked. The promise was not honest while that was
// true, and no amount of caching fixes a first view.
//
// THE FIX. Say the number, then ask. The film button carries its size, and anything over
// ASK_ABOVE_BYTES opens a gate first. "Don't ask again on this device" is remembered — this is a
// warning, not a toll gate, and a reader on uncapped fibre should meet it once.
//
// This file is pure so it unit-tests under `node --test`. It takes the connection object rather than
// reading `navigator` itself, which is also what lets the tests describe a 2G phone.

/** Ask before fetching anything above this. Films (12–14 MB) trip it; images and audio never do. */
export const ASK_ABOVE_BYTES = 2 * 1024 * 1024;

/** What the browser will tell us about the connection, which on most browsers is nothing at all. */
export type NetworkInformationLike = {
  saveData?: boolean;
  /** "cellular" | "wifi" | "ethernet" | "none" | "unknown" — Android Chrome only, in practice. */
  type?: string;
  /** "slow-2g" | "2g" | "3g" | "4g" — the round-trip-derived estimate, widely available. */
  effectiveType?: string;
};

export type ConnectionInfo = {
  /** Whether the browser told us anything at all. Safari and Firefox implement none of this. */
  known: boolean;
  /** The reader has asked their browser or OS to save data. An explicit instruction, not a guess. */
  saveData: boolean;
  /** True only when the connection looks like one that is paid for by the megabyte, or is slow
   *  enough that 13 MB is a long wait either way. Never asserted from `effectiveType: "4g"`, which
   *  a fast Wi-Fi link also reports. */
  metered: boolean;
  effectiveType?: string;
};

const METERED_TYPES = new Set(["cellular", "wimax"]);
const UNMETERED_TYPES = new Set(["wifi", "ethernet"]);
const SLOW = new Set(["slow-2g", "2g", "3g"]);

/**
 * Read what the connection is willing to say. The honest default when it says nothing is "we do not
 * know" — NOT "assume Wi-Fi", because assuming Wi-Fi is exactly the assumption that spends someone
 * else's airtime.
 */
export function describeConnection(c: NetworkInformationLike | null | undefined): ConnectionInfo {
  if (!c || (c.saveData === undefined && c.type === undefined && c.effectiveType === undefined)) {
    return { known: false, saveData: false, metered: false };
  }
  const saveData = c.saveData === true;
  const type = c.type?.toLowerCase();
  const effectiveType = c.effectiveType?.toLowerCase();

  let metered: boolean;
  if (type && METERED_TYPES.has(type)) metered = true;
  else if (type && UNMETERED_TYPES.has(type)) metered = false;
  else metered = !!effectiveType && SLOW.has(effectiveType);

  return { known: true, saveData, metered: metered || saveData, effectiveType };
}

/** Read the live connection on web; `null` anywhere it is not exposed. */
export function currentConnection(): ConnectionInfo {
  const nav: any = typeof navigator !== "undefined" ? navigator : undefined;
  return describeConnection(nav?.connection ?? nav?.mozConnection ?? nav?.webkitConnection);
}

/**
 * Whether to open the gate before fetching `bytes`.
 *
 * `allowed` is the reader's remembered "don't ask again on this device". It is deliberately
 * OVERRIDDEN by an active data saver: that switch is something a person turned on in their browser
 * or their phone, and a choice they made in this app last week does not get to cancel it.
 */
export function shouldAskBeforeDownload({
  bytes,
  allowed,
  connection,
}: {
  bytes: number;
  allowed: boolean;
  connection: ConnectionInfo;
}): boolean {
  if (!(bytes > ASK_ABOVE_BYTES)) return false;
  if (connection.saveData) return true;
  return !allowed;
}

/**
 * A size a person can act on: "13.5 MB". Binary units, one decimal below 100, none above — a
 * "1,024 KB" or a "13.4712 MB" tells a reader nothing they can weigh against their bundle.
 */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 KB";
  const units = ["B", "KB", "MB", "GB"];
  let n = bytes;
  let u = 0;
  while (n >= 1024 && u < units.length - 1) {
    n /= 1024;
    u++;
  }
  const decimals = u === 0 ? 0 : n >= 100 ? 0 : 1;
  return `${n.toFixed(decimals)} ${units[u]}`;
}
