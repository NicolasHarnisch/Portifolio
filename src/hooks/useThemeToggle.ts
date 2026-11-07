import { useCallback, MouseEvent } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "@/contexts/theme-provider";
import { useMediaQuery } from "./useMediaQuery";

export function useThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const toggleTheme = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    if (reduced || !document.startViewTransition || !document.documentElement.animate) {
      setTheme(nextTheme);
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    try {
      const transition = document.startViewTransition(() => flushSync(() => setTheme(nextTheme)));
      void transition.ready.then(() => {
        document.documentElement.animate({ clipPath: [
          `circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`,
        ] }, { duration: 500, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" });
      }).catch(() => { /* Interrupted transitions do not undo the preference. */ });
    } catch { setTheme(nextTheme); }
  }, [resolvedTheme, setTheme, reduced]);
  return { resolvedTheme, toggleTheme };
}
