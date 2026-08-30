// useTts — the one hook the UI calls for narration.
//
// It walks a LADDER of engines, chosen per language (see ./select.ts): ElevenLabs for English and
// Afrikaans, Botlhale for the nine indigenous languages, on-device speech underneath everything.
// Any failure at one rung — no key, no network, a 429, an unsupported language — falls to the next,
// so "Listen" always does something and never dead-ends.
//
// Two properties worth stating plainly, because both are easy to lose in a refactor:
//
//   1. AN INDIGENOUS LANGUAGE IS NEVER SENT TO ELEVENLABS. Not as a fallback, not "just to try".
//      ElevenLabs does not speak them and does not say so — it returns fluent, wrong pronunciation.
//      select.ts keeps it off the ladder and elevenlabs.ts refuses a second time.
//   2. THE SAME PASSAGE IS SYNTHESISED ONCE. The account allows 40 000 characters a month and one
//      passage is ~800 of them. Every remote clip goes through ./cache.ts first, keyed on the exact
//      text + language + voice, so a re-press, a Child⇄Adult flip and back, or tomorrow's visit all
//      cost nothing. Without that the Listen button stops working partway through the month.
//
// Only this file touches React/Expo; the mapping, request-building, selection and cache-key logic
// live in sibling pure modules that are unit-tested with `node --test`.

import { useCallback, useEffect, useRef, useState } from "react";
import * as Speech from "expo-speech";
import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from "expo-audio";
import { LangCode, toBcp47, toBotlhaleCode } from "../../i18n/languages";
import { botlhaleSynthesize } from "./botlhale";
import { elevenLabsSynthesize, DEFAULT_VOICE_ID } from "./elevenlabs";
import { getCachedNarration, putCachedNarration, narrationKey } from "./cache";
import { chooseProvider, providerLadder, TtsProviderId } from "./select";

const BOTLHALE_KEY = process.env.EXPO_PUBLIC_BOTLHALE_API_KEY ?? "";
const BOTLHALE_BASE_URL = process.env.EXPO_PUBLIC_BOTLHALE_BASE_URL || undefined;
const ELEVENLABS_KEY = process.env.EXPO_PUBLIC_ELEVENLABS_API_KEY ?? "";
const ELEVENLABS_VOICE = process.env.EXPO_PUBLIC_ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;

export type UseTts = {
  /** True while audio is being synthesised or played. */
  speaking: boolean;
  /** Which engine would be tried first for `lang` (for an "AI voice" vs "device voice" hint). */
  providerFor: (lang: LangCode) => TtsProviderId;
  /** Speak `text` in `lang`. Restarts if already speaking. */
  speak: (text: string, lang: LangCode) => void;
  /** Stop any current speech/playback. */
  stop: () => void;
};

export function useTts(): UseTts {
  const player = useAudioPlayer();
  const status = useAudioPlayerStatus(player);
  const [speaking, setSpeaking] = useState(false);
  // Which engine produced the current sound, so we reset state on the right signal.
  const activeRef = useRef<TtsProviderId | null>(null);
  // Bumped on every `speak`, so a slow synthesis that resolves after the reader moved on is dropped
  // instead of talking over whatever is playing now.
  const genRef = useRef(0);

  const keys = { hasElevenLabsKey: ELEVENLABS_KEY.length > 0, hasBotlhaleKey: BOTLHALE_KEY.length > 0 };
  const providerFor = useCallback((lang: LangCode) => chooseProvider({ lang, ...keys }), [keys.hasElevenLabsKey, keys.hasBotlhaleKey]);

  // Remote audio plays through the shared player; reset when it finishes.
  useEffect(() => {
    if (activeRef.current && activeRef.current !== "device" && status?.didJustFinish) {
      activeRef.current = null;
      setSpeaking(false);
    }
  }, [status?.didJustFinish]);

  const stop = useCallback(() => {
    genRef.current++;
    Speech.stop();
    try {
      player.pause();
    } catch {
      // player may not be loaded yet — nothing to pause
    }
    activeRef.current = null;
    setSpeaking(false);
  }, [player]);

  const speakDevice = useCallback((text: string, lang: LangCode) => {
    activeRef.current = "device";
    setSpeaking(true);
    const done = () => {
      activeRef.current = null;
      setSpeaking(false);
    };
    Speech.speak(text, { language: toBcp47(lang), onDone: done, onStopped: done, onError: done });
  }, []);

  const playUri = useCallback(
    async (uri: string, provider: TtsProviderId) => {
      await setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
      activeRef.current = provider;
      setSpeaking(true);
      player.replace(uri);
      player.play();
    },
    [player]
  );

  const speak = useCallback(
    async (text: string, lang: LangCode) => {
      stop(); // restart cleanly if something was already playing
      const trimmed = text?.trim();
      if (!trimmed) return;
      const generation = ++genRef.current;
      const stale = () => generation !== genRef.current;

      for (const provider of providerLadder({ lang, ...keys })) {
        if (stale()) return;
        if (provider === "device") {
          speakDevice(trimmed, lang);
          return;
        }

        const voice = provider === "elevenlabs" ? ELEVENLABS_VOICE : "default";
        const key = narrationKey({ provider, lang, voice, text: trimmed });

        // Cache first, always. A hit costs no quota, no network and no wait.
        const cached = await getCachedNarration(key);
        if (stale()) return;
        if (cached) {
          await playUri(cached, provider);
          return;
        }

        try {
          const uri =
            provider === "elevenlabs"
              ? await elevenLabsSynthesize({ text: trimmed, lang, apiKey: ELEVENLABS_KEY, voiceId: ELEVENLABS_VOICE })
              : await botlhaleSynthesize({
                  text: trimmed,
                  languageCode: toBotlhaleCode(lang),
                  apiKey: BOTLHALE_KEY,
                  baseUrl: BOTLHALE_BASE_URL,
                });
          if (stale()) return;
          // Cache before playing: if playback throws, we have still paid for the clip and should
          // not pay again. Botlhale hands back a URL that may expire, so only self-contained data
          // URIs are worth keeping.
          if (uri.startsWith("data:")) await putCachedNarration(key, uri);
          if (stale()) return;
          await playUri(uri, provider);
          return;
        } catch (err) {
          // Quota exhausted, offline, bad key, unsupported language — try the next rung down.
          //
          // Silence here is right for a READER (the Listen button just works, one rung lower) and
          // wrong for a DEVELOPER: "it fell back to the device voice" and "it never tried" look
          // identical from the outside, and that cost real debugging time the day this shipped.
          // So in dev, and only in dev, the rung says why it gave up.
          if (__DEV__) {
            // eslint-disable-next-line no-console
            console.warn(`[tts] ${provider} failed for "${lang}", falling to the next engine:`, err);
          }
        }
      }
    },
    [keys.hasElevenLabsKey, keys.hasBotlhaleKey, playUri, stop, speakDevice]
  );

  // Silence any speech if the screen unmounts mid-sentence.
  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  return { speaking, providerFor, speak, stop };
}
