// A one-slot bridge from any screen to the floating "Ask Ubuntu" widget.
//
// The widget is mounted once at the app root (outside the shell, so it survives navigation) and
// owns its own open/closed state. A page that wants to hand it a question — the Watch page's
// "Ask Ubuntu about this story", for instance — has no reference to it. Rather than lift the whole
// chat state into App and thread it through every screen, the widget registers itself here and
// pages call `askUbuntu(question)`.
//
// Deliberately tiny: one listener, because exactly one widget is ever mounted. If nothing has
// registered — the widget is unmounted while a full-screen film is playing — the call is a silent
// no-op rather than a crash.

type Listener = (question: string) => void;

let listener: Listener | null = null;

/** Called by ChatbotWidget on mount. Returns the unsubscribe for its cleanup. */
export function onAsk(fn: Listener): () => void {
  listener = fn;
  return () => {
    if (listener === fn) listener = null;
  };
}

/** Open the guide and ask it `question`. No-op when no widget is mounted. */
export function askUbuntu(question: string): void {
  listener?.(question);
}
