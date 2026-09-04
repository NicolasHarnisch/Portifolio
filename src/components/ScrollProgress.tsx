import { useEffect, useRef } from "react";

/**
 * Barra de progresso de scroll fixada no topo da página.
 * Atualiza via requestAnimationFrame direto no DOM (sem setState)
 * para não causar re-renders no React.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${Math.min(progress, 100)}%`;
      rafRef.current = null;
    };

    const onScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // Estado inicial

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      id="scroll-progress"
      ref={barRef}
      style={{ width: "0%" }}
      aria-hidden="true"
    />
  );
}
