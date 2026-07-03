// Provider selection — pure, dependency-free (unit-tested under `node --test`).
// Decides which TTS engine to try first. Botlhale is preferred whenever we hold an API key
// (it's the only engine that truly voices Setswana); otherwise we use the on-device engine,
// which is free, offline and quota-free so the Listen button always works.

export type TtsProviderId = "botlhale" | "device";

export function chooseProvider(opts: { hasBotlhaleKey: boolean }): TtsProviderId {
  return opts.hasBotlhaleKey ? "botlhale" : "device";
}
