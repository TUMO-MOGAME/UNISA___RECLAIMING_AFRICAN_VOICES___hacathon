// Read-side helpers for the on-chain Heritage Ledger. The app never talks to Solana directly — it
// reads the pre-generated manifest and links out to a public explorer for live verification.
import { HERITAGE_ANCHORS, HeritageAnchor } from "./heritage.data";

export { HERITAGE_ANCHORS };
export type { HeritageAnchor };

export function explorerUrl(tx: string, cluster: string): string {
  return `https://explorer.solana.com/tx/${tx}?cluster=${cluster}`;
}

export function explorerAddressUrl(address: string, cluster: string): string {
  return `https://explorer.solana.com/address/${address}?cluster=${cluster}`;
}

/** Short middle-truncated form for hashes/ids in the UI. */
export function shortHash(s: string, head = 8, tail = 8): string {
  return s.length > head + tail + 1 ? `${s.slice(0, head)}…${s.slice(-tail)}` : s;
}
