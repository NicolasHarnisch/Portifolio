import type { Application } from "@splinetool/runtime";
import { useMediaQuery } from "./useMediaQuery";

export type GraphicLoadResult = "ready" | "unavailable" | "skipped";

export interface CachedSplineSession {
  runtime: Application;
  element: HTMLElement;
}

let cachedSpline: CachedSplineSession | null = null;
let visitedProjectPage = false;

export function getCachedSpline() {
  return cachedSpline;
}

export function setCachedSpline(session: CachedSplineSession | null) {
  cachedSpline = session;
}

export function hasCachedSpline() {
  return cachedSpline !== null;
}

export function markVisitedProject() {
  visitedProjectPage = true;
}

export function hasVisitedProject() {
  return visitedProjectPage;
}

export function resetProjectVisitForTests() {
  visitedProjectPage = false;
  cachedSpline = null;
}

export function useSplineEligibility() {
  const desktop = useMediaQuery("(min-width: 768px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const device = typeof navigator === "undefined" ? undefined : navigator as Navigator & {
    connection?: { saveData?: boolean }; deviceMemory?: number;
  };
  const supported = typeof window !== "undefined" && typeof window.WebGLRenderingContext !== "undefined";
  const eligible = supported && desktop && !reduced && !device?.connection?.saveData && (device?.deviceMemory ?? 4) > 2;
  return { desktop, eligible };
}
