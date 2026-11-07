import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePageVisible } from "@/hooks/useVisible";

/**
 * Barra de progresso de scroll fixada no topo da página.
 * Atualiza via requestAnimationFrame direto no DOM (sem setState)
 * para não causar re-renders no React.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const visible = usePageVisible();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || reduced || !visible) return;
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? Math.max(0, Math.min(1, window.scrollY / height)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onScroll) : undefined;
    observer?.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update(); // Estado inicial

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer?.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [reduced, visible]);

  if (reduced) return null;
  return (
    <div
      id="scroll-progress"
      ref={barRef}
      style={{ width: "100%", transform: "scaleX(0)" }}
      aria-hidden="true"
    />
  );
}
