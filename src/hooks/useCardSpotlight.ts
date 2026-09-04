import { useRef, useCallback } from "react";

export function useCardSpotlight() {
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) return;
    const card = e.currentTarget;
    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--x", `${x.toFixed(1)}%`);
      card.style.setProperty("--y", `${y.toFixed(1)}%`);
      rafRef.current = null;
    });
  }, []);

  return handleMouseMove;
}
