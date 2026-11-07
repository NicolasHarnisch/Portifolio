import { useRef, useCallback, useEffect } from "react";
import { useMediaQuery } from "./useMediaQuery";

export function useCardSpotlight() {
  const frame = useRef<number | null>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const fine = useMediaQuery("(pointer: fine)");
  useEffect(() => () => { if (frame.current !== null) cancelAnimationFrame(frame.current); }, []);
  return useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !fine || frame.current !== null) return;
    // Capture values now; React's currentTarget is not available in a later frame.
    const { currentTarget: card, clientX, clientY } = event;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      if (!card.isConnected) return;
      const rect = card.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      card.style.setProperty("--x", `${(((clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
      card.style.setProperty("--y", `${(((clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
    });
  }, [reduced, fine]);
}
