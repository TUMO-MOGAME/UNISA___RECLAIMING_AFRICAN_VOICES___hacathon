// useTts — the one hook the UI calls. Botlhale AI (neural, indigenous-language) is tried first
// when an API key is present; on ANY failure — or when there's no key — it falls back to the
// on-device engine (expo-speech), which is free, offline and quota-free. So "Listen" always works
// and silently upgrades to real Setswana audio the moment the Botlhale key is set in `.env`.
//
// Only this file touches React/Expo; the mapping, request-building and selection logic live in
// sibling pure modules (lang/botlhale/select) that are unit-tested with `node --test`.

import { useCallback, useEffect, useRef, useState } from "react";
import * as Speech from "expo-speech";
import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from "expo-audio";
import { LangCode, toBcp47, toBotlhaleCode } from "../../i18n/languages";
import { botlhaleSynthesize } from "./botlhale";
import { chooseProvider, TtsProviderId } from "./select";

const BOTLHALE_KEY = process.env.EXPO_PUBLIC_BOTLHALE_API_KEY ?? "";
const BOTLHALE_BASE_URL = process.env.EXPO_PUBLIC_BOTLHALE_BASE_URL || undefined;

export type UseTts = {
  /** True while audio is being synthesised or played. */
  speaking: boolean;
  /** Which engine will be tried first (for a small "AI voice" vs "device voice" hint). */
  provider: TtsProviderId;
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
  const provider = chooseProvider({ hasBotlhaleKey: BOTLHALE_KEY.length > 0 });

  // Botlhale audio plays through the shared player; reset when it finishes.
  useEffect(() => {
    if (activeRef.current === "botlhale" && status?.didJustFinish) {
      activeRef.current = null;
      setSpeaking(false);
    }
  }, [status?.didJustFinish]);

  const stop = useCallback(() => {
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
    Speech.speak(text, {
      language: toBcp47(lang),
      onDone: () => {
        activeRef.current = null;
        setSpeaking(false);
      },
      onStopped: () => {
        activeRef.current = null;
        setSpeaking(false);
      },
      onError: () => {
        activeRef.current = null;
        setSpeaking(false);
      },
    });
  }, []);

  const speak = useCallback(
    async (text: string, lang: LangCode) => {
      stop(); // restart cleanly if something was already playing
      if (!text || !text.trim()) return;

      if (provider === "botlhale") {
        try {
          const uri = await botlhaleSynthesize({
            text,
            languageCode: toBotlhaleCode(lang),
            apiKey: BOTLHALE_KEY,
            baseUrl: BOTLHALE_BASE_URL,
          });
          await setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
          activeRef.current = "botlhale";
          setSpeaking(true);
          player.replace(uri);
          player.play();
          return;
        } catch {
          // Botlhale unavailable (no confirmed endpoint yet, offline, rate-limited…) —
          // fall through to on-device speech so the button never dead-ends.
        }
      }
      speakDevice(text, lang);
    },
    [provider, player, stop, speakDevice]
  );

  // Silence any speech if the screen unmounts mid-sentence.
  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  return { speaking, provider, speak, stop };
}
