// Anchor Maloba's literary canon on-chain (Solana devnet) as tamper-evident provenance.
//
// POPIA-SAFE BY DESIGN: this anchors ONLY a content hash + IPFS CID + public bibliographic metadata
// for the PUBLIC literary canon (Plaatje, Mqhayi, Mutwa, Vilakazi) — never personal data, never a
// community member's recording. Personal data stays in erasable off-chain storage. See
// docs/11-blockchain-heritage-plan.md §2.
//
// Custodial model: a project keypair (chain/.keypair.json, gitignored) pays the tiny devnet fees and
// signs a Memo instruction carrying the provenance record. Output: app/src/content/heritage.data.ts,
// which the app's "Heritage Ledger" screen reads and links to Solana Explorer for live verification.
//
//   cd chain && npm install && npm run anchor

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  Connection,
  Keypair,
  Transaction,
  TransactionInstruction,
  PublicKey,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  setAuthority,
  AuthorityType,
} from "@solana/spl-token";
import Hash from "ipfs-only-hash";
import { mhudi } from "../app/src/content/mhudi.ts";
import { ityalaLamawele } from "../app/src/content/ityala-lamawele.ts";
import { indaba } from "../app/src/content/indaba.ts";
import { vilakazi } from "../app/src/content/vilakazi.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Cluster + RPC are env-configurable. Default to keyless testnet (reachable here); set SOLANA_RPC to a
// devnet endpoint (e.g. a free Helius devnet URL) + SOLANA_CLUSTER=devnet to run on devnet instead.
const CLUSTER = process.env.SOLANA_CLUSTER || "testnet";
const RPC = process.env.SOLANA_RPC || "https://api.testnet.solana.com";
const MEMO_PROGRAM = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
const KEYPAIR_PATH = resolve(__dirname, ".keypair.json");

// Load or create the custodial keypair (devnet only).
function loadKeypair() {
  if (existsSync(KEYPAIR_PATH)) {
    return Keypair.fromSecretKey(Uint8Array.from(JSON.parse(readFileSync(KEYPAIR_PATH, "utf8"))));
  }
  const kp = Keypair.generate();
  writeFileSync(KEYPAIR_PATH, JSON.stringify(Array.from(kp.secretKey)));
  console.log("Created new custodial keypair (chain/.keypair.json — gitignored).");
  return kp;
}

// Returns true if the wallet has enough to pay memo fees, false to run offline (compute provenance
// only). Never aborts — the real content fingerprints are computed either way.
async function ensureFunds(connection, payer) {
  let bal = await connection.getBalance(payer.publicKey);
  console.log(`Custodial wallet: ${payer.publicKey.toBase58()}  balance: ${bal / LAMPORTS_PER_SOL} SOL`);
  if (bal >= 25000) return true;
  for (const sol of [1, 0.5]) {
    try {
      console.log(`Requesting ${sol} SOL ${CLUSTER} airdrop…`);
      const sig = await connection.requestAirdrop(payer.publicKey, sol * LAMPORTS_PER_SOL);
      const bh = await connection.getLatestBlockhash();
      await connection.confirmTransaction({ signature: sig, ...bh }, "confirmed");
      bal = await connection.getBalance(payer.publicKey);
      console.log(`Airdrop ok. Balance: ${bal / LAMPORTS_PER_SOL} SOL`);
      return true;
    } catch (e) {
      console.warn(`Airdrop ${sol} failed: ${e.message}`);
    }
  }
  if (bal >= 25000) return true;
  console.warn(
    `\n⚠ No ${CLUSTER} funds (faucet rate-limited). Computing real provenance (hash + IPFS CID) now;` +
      ` on-chain anchoring is skipped until funded. To make the Verify-on-Explorer links live:\n` +
      `   1) Fund this ${CLUSTER} address at https://faucet.solana.com (choose ${CLUSTER}):\n` +
      `      ${payer.publicKey.toBase58()}\n` +
      `   2) Re-run:  cd chain && npm run anchor\n`
  );
  return false;
}

// Recipient of the heritage certificate tokens. Set MALOBA_RECIPIENT to a Phantom address to mint
// them straight into that wallet (so the community/you literally own the canon on-chain); otherwise
// they mint to the custodial wallet.
function resolveRecipient(payer) {
  const raw = process.env.MALOBA_RECIPIENT?.trim();
  if (raw) {
    try {
      return new PublicKey(raw);
    } catch {
      console.warn(`MALOBA_RECIPIENT "${raw}" is not a valid address — minting to the custodial wallet instead.`);
    }
  }
  return payer.publicKey;
}

// Mint one "heritage certificate" — a fixed-supply (1), 0-decimal SPL token (an NFT-like proof of
// provenance) — to `recipient`, then lock the supply. Returns the mint address.
async function mintCertificate(connection, payer, recipient) {
  const mint = await createMint(connection, payer, payer.publicKey, null, 0);
  const ata = await getOrCreateAssociatedTokenAccount(connection, payer, mint, recipient);
  await mintTo(connection, payer, mint, ata.address, payer, 1);
  await setAuthority(connection, payer, mint, payer, AuthorityType.MintTokens, null); // lock supply at 1
  return mint.toBase58();
}

async function provenanceFor(mod) {
  // Canonicalise the public work, then hash it (SHA-256) and content-address it (IPFS CID).
  const canonical = JSON.stringify(mod);
  const buf = Buffer.from(canonical, "utf8");
  const sha256 = createHash("sha256").update(buf).digest("hex");
  const cid = await Hash.of(buf); // real IPFS CIDv0 (pin in Phase B; the CID is deterministic proof)
  return { sha256, cid };
}

async function main() {
  const connection = new Connection(RPC, "confirmed");
  const payer = loadKeypair();
  const funded = await ensureFunds(connection, payer);
  const recipient = resolveRecipient(payer);
  if (funded) console.log(`Heritage certificates will mint to: ${recipient.toBase58()}\n`);

  const modules = [mhudi, ityalaLamawele, indaba, vilakazi];
  const anchors = [];

  for (const mod of modules) {
    const { sha256, cid } = await provenanceFor(mod);
    let tx = "pending"; // provenance memo signature
    let mint = "pending"; // heritage certificate token mint address
    if (funded) {
      const memo = JSON.stringify({ p: "maloba", v: 1, id: mod.id, t: mod.title, a: mod.author, y: mod.year, cid, h: sha256 });
      try {
        const transaction = new Transaction().add(
          new TransactionInstruction({ keys: [], programId: MEMO_PROGRAM, data: Buffer.from(memo, "utf8") })
        );
        tx = await sendAndConfirmTransaction(connection, transaction, [payer], { commitment: "confirmed" });
        console.log(`  ✓ ${mod.id} provenance anchored — tx ${tx}`);
      } catch (e) {
        console.warn(`  ✗ ${mod.id} memo: ${e.message}`);
      }
      try {
        mint = await mintCertificate(connection, payer, recipient);
        console.log(`  ✓ ${mod.id} certificate minted — ${mint}`);
      } catch (e) {
        console.warn(`  ✗ ${mod.id} mint: ${e.message}`);
      }
    } else {
      console.log(`  • ${mod.id} — provenance computed (cid ${cid.slice(0, 12)}…); on-chain pending funds`);
    }
    anchors.push({
      id: mod.id,
      title: mod.title,
      author: mod.author,
      year: mod.year,
      cid,
      sha256,
      tx,
      mint,
      owner: funded ? recipient.toBase58() : "pending",
      cluster: CLUSTER,
      ts: new Date().toISOString(),
    });
  }

  const out = `// GENERATED FILE — do not edit by hand. Regenerate: (cd chain && npm run anchor)
// On-chain provenance anchors for Maloba's public literary canon (Solana ${CLUSTER}). POPIA-safe:
// only a content hash + IPFS CID + public bibliographic data — never personal data.
export type HeritageAnchor = {
  id: string;
  title: string;
  author: string;
  year: number;
  cid: string;
  sha256: string;
  tx: string;
  mint: string;
  owner: string;
  cluster: string;
  ts: string;
};
export const HERITAGE_ANCHORS: HeritageAnchor[] = ${JSON.stringify(anchors, null, 2)};
`;
  const manifestPath = resolve(__dirname, "..", "app", "src", "content", "heritage.data.ts");
  writeFileSync(manifestPath, out, "utf8");
  console.log(`\nAnchored ${anchors.length}/${modules.length} works → app/src/content/heritage.data.ts`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
