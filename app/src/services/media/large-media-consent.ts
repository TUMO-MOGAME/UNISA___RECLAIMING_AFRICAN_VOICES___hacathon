// "Don't ask again on this device" for the large-media gate (PWA-06).
//
// PRIVACY: this stores one boolean. No identifier, no counter, no timestamp, nothing that says who
// or when — and like everything else in this app it never leaves the device (D5). It is a display
// preference, not personal information, which is why it needs no consent flow of its own.
//
// One file rather than the platform-split the progress store uses: `localStorage` simply does not
// exist on native, so the guard below already degrades to memory there — and the films this gates
// are web-only anyway (JourneyStory plays them through an inline <video>).

const KEY = "ubuntu-heritage-allow-large-media";

let memory = false;

function store(): Storage | null {
  try {
    if (typeof localStorage === "undefined") return null;
    const probe = `${KEY}:probe`;
    localStorage.setItem(probe, "1");
    localStorage.removeItem(probe);
    return localStorage;
  } catch {
    // Private mode, blocked site data, or a quota error. None of these is a reason to break a film.
    return null;
  }
}

export function isLargeMediaAllowed(): boolean {
  const s = store();
  if (!s) return memory;
  try {
    return s.getItem(KEY) === "1";
  } catch {
    return memory;
  }
}

export function setLargeMediaAllowed(allowed: boolean): void {
  memory = allowed;
  const s = store();
  if (!s) return;
  try {
    if (allowed) s.setItem(KEY, "1");
    else s.removeItem(KEY);
  } catch {
    /* keep the session copy; the reader is not shown an error for a preference */
  }
}
