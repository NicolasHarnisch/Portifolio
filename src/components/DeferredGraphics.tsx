import { lazy, Suspense, useEffect, useState } from "react";
import { hasCachedSpline, useSplineEligibility, type GraphicLoadResult } from "@/hooks/useSplineEligibility";
import { usePageVisible } from "@/hooks/useVisible";
import GraphicsBoundary from "./GraphicsBoundary";

const Stars = lazy(() => import("./StarBackground"));
const Spline = lazy(() => import("./SplineScene"));

function SplinePlaceholder({ loading = true }: { loading?: boolean }) {
  return <div className="relative aspect-square" style={{ width: "min(100%, 35rem, 75vh)" }} aria-hidden="true">
    {loading && <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-md"><div className="spline-loading-orb" /></div>}
  </div>;
}

export default function DeferredGraphics({ kind, inView, eager = false, onSettled }: {
  kind: "stars" | "spline"; inView: boolean; eager?: boolean; onSettled?: (result: GraphicLoadResult) => void;
}) {
  const { desktop, eligible: splineEligible } = useSplineEligibility();
  const pageVisible = usePageVisible();
  const [started, setStarted] = useState(() => kind === "spline" && hasCachedSpline());
  const supported = typeof window.WebGLRenderingContext !== "undefined";
  const eligible = kind === "stars" ? supported : splineEligible;

  useEffect(() => {
    if (kind === "spline" && !eligible) onSettled?.("skipped");
  }, [kind, eligible, onSettled]);

  useEffect(() => {
    if (!eligible) {
      if (started) setStarted(false);
      return;
    }
    if (kind === "spline" && hasCachedSpline()) {
      if (!started) setStarted(true);
      return;
    }
    // Direct section links can put the hero offscreen while its initial cover is visible.
    if ((!inView && !(kind === "spline" && eager)) || !pageVisible || started) return;
    // Give text, navigation and primary actions their first paint before importing WebGL.
    const timer = window.setTimeout(() => setStarted(true), kind === "spline" ? (eager ? 0 : 1200) : 600);
    return () => window.clearTimeout(timer);
  }, [eligible, inView, pageVisible, started, kind, eager]);

  if (!eligible) return kind === "spline" && desktop ? <SplinePlaceholder loading={false} /> : null;
  if (!started) return kind === "spline" ? <SplinePlaceholder /> : null;
  return <GraphicsBoundary onError={kind === "spline" ? () => onSettled?.("unavailable") : undefined}
    fallback={kind === "spline" ? <SplinePlaceholder loading={false} /> : null}><Suspense fallback={kind === "spline" ? <SplinePlaceholder /> : null}>
    {kind === "spline" ? <Spline visible={inView} onSettled={onSettled} /> : <Stars visible={inView} />}
  </Suspense></GraphicsBoundary>;
}
