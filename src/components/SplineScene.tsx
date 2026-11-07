import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";
import { useInView, usePageVisible } from "@/hooks/useVisible";
import GraphicsBoundary from "./GraphicsBoundary";
import { getCachedSpline, setCachedSpline, type GraphicLoadResult } from "@/hooks/useSplineEligibility";

export default function SplineScene({ visible = true, onSettled }: {
  visible?: boolean; onSettled?: (result: GraphicLoadResult) => void;
}) {
  const [initialCached] = useState(() => getCachedSpline());
  const [loaded, setLoaded] = useState(() => initialCached !== null);
  const [failed, setFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cachedHostRef = useRef<HTMLDivElement>(null);
  const runtimeRef = useRef<Application | null>(initialCached?.runtime ?? null);
  const reportedRef = useRef(false);
  const callbackRef = useRef(onSettled);
  callbackRef.current = onSettled;
  const report = useCallback((result: GraphicLoadResult) => {
    if (reportedRef.current || !callbackRef.current) return;
    reportedRef.current = true;
    callbackRef.current(result);
  }, []);
  const inView = useInView(containerRef);
  const pageVisible = usePageVisible();
  const active = visible && inView && pageVisible;
  const activeRef = useRef(active);
  activeRef.current = active;
  const failedRef = useRef(failed);
  failedRef.current = failed;

  useLayoutEffect(() => {
    const host = cachedHostRef.current;
    if (!initialCached || !host) return;
    runtimeRef.current = initialCached.runtime;
    initialCached.runtime.canvas.style.display = "block";
    if (initialCached.element.parentElement !== host) {
      host.appendChild(initialCached.element);
    }
    if (activeRef.current) {
      initialCached.runtime.play();
      initialCached.runtime.requestRender?.();
    } else {
      initialCached.runtime.stop();
    }
    return () => {
      initialCached.runtime.stop();
    };
  }, [initialCached]);

  useEffect(() => {
    if (failed) {
      runtimeRef.current = null;
      report("unavailable");
    }
  }, [failed, report]);

  useEffect(() => {
    if (!loaded || failed || !onSettled) return;
    let secondFrame: number | undefined;
    const firstFrame = requestAnimationFrame(() => {
      // Give the loaded canvas a paint opportunity before dismissing the cover.
      secondFrame = requestAnimationFrame(() => report("ready"));
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      if (secondFrame !== undefined) cancelAnimationFrame(secondFrame);
    };
  }, [loaded, failed, onSettled, report]);

  useEffect(() => {
    if (loaded || failed) return;
    const timer = window.setTimeout(() => setFailed(true), 15000);
    return () => window.clearTimeout(timer);
  }, [loaded, failed]);

  useEffect(() => {
    const runtime = runtimeRef.current;
    if (!runtime) return;
    if (active) {
      runtime.play();
      runtime.requestRender?.();
    } else {
      runtime.stop();
    }
  }, [active, loaded]);

  return (
    <div ref={containerRef} className="relative aspect-square"
      style={{ width: "min(100%, 35rem, 75vh)" }} aria-hidden="true" role="presentation">
      {!loaded && !failed && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-md z-10">
          <div className="spline-loading-orb" />
        </div>
      )}
      {!failed && <GraphicsBoundary onError={() => setFailed(true)}>
        <div className={`w-full h-full transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          style={{ transform: "scale(1.0)" }}>
          {initialCached ? (
            <div ref={cachedHostRef} className="w-full h-full" />
          ) : (
            <Spline scene="https://prod.spline.design/QvwWJuxjXQNLFlpO/scene.splinecode" renderOnDemand
              onLoad={(runtime) => {
                if (failedRef.current) return;
                runtimeRef.current = runtime;
                if (runtime?.canvas instanceof HTMLCanvasElement && typeof runtime.dispose === "function") {
                  runtime.dispose = () => {
                    runtime.stop();
                  };
                  setCachedSpline({
                    runtime,
                    element: runtime.canvas.parentElement ?? runtime.canvas,
                  });
                }
                if (!activeRef.current) runtime.stop();
                setLoaded(true);
              }} />
          )}
        </div>
      </GraphicsBoundary>}
    </div>
  );
}
