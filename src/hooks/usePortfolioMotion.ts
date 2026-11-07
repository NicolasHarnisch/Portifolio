import { useEffect, type RefObject } from "react";
import { useMediaQuery } from "./useMediaQuery";

export function usePortfolioMotion(rootRef: RefObject<HTMLElement>, language: string, enabled = true) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced || !enabled) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    // Keep the optional scroll engine out of the critical render path.
    void import("@/animations/portfolio").then(({ setupPortfolioMotion }) => {
      if (!disposed) cleanup = setupPortfolioMotion(root);
    }).catch(() => {
      // Content is visible by default if the optional animation chunk fails.
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [rootRef, language, reduced, enabled]);
}
