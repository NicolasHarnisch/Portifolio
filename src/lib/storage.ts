// Preferences must not prevent rendering in private or restricted browsing.
export function readPreference(key: string): string | null {
  try { return window.localStorage.getItem(key); } catch { return null; }
}

export function writePreference(key: string, value: string): void {
  try { window.localStorage.setItem(key, value); } catch { /* Keep the in-memory preference. */ }
}
