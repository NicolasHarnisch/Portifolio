export function shouldReduceMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? true;
}

export const OPNORA_EASINGS = {
  SMOOTH_OUT: "power3.out",
  EXPO_OUT: "expo.out",
  ELASTIC_SOFT: "back.out(1.4)",
} as const;
