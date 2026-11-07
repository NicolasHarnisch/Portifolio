import { useCallback, useSyncExternalStore } from "react";

export function useMediaQuery(query: string, fallback = false) {
  const subscribe = useCallback((onChange: () => void) => {
    if (!window.matchMedia) return () => {};
    const media = window.matchMedia(query);
    if (media.addEventListener) {
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    }
    media.addListener(onChange);
    return () => media.removeListener(onChange);
  }, [query]);
  const snapshot = useCallback(() => window.matchMedia?.(query).matches ?? fallback, [query, fallback]);
  return useSyncExternalStore(subscribe, snapshot, () => fallback);
}
