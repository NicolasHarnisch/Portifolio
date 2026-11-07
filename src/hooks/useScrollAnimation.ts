import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "./useMediaQuery";

export function useScrollAnimation({ threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true }: {
  threshold?: number; rootMargin?: string; triggerOnce?: boolean;
} = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const supported = typeof window !== "undefined" && Boolean(window.IntersectionObserver);
  const [isVisible, setIsVisible] = useState(() => !supported || reduced);
  useEffect(() => {
    const element = ref.current;
    if (!element || !supported || reduced) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (triggerOnce) observer.unobserve(element);
      } else if (!triggerOnce) setIsVisible(false);
    }, { threshold, rootMargin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, reduced, supported]);
  return { ref, isVisible: isVisible || reduced || !supported };
}
