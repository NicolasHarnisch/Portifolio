import { useState } from "react";
import Spline from "@splinetool/react-spline";

export default function SplineScene() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-square max-w-[14rem] sm:max-w-[22rem] md:max-w-[26rem] lg:max-w-[32.5rem] max-h-[70vh] overflow-hidden">
      {/* Skeleton / Loading State */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-md z-10">
          <div className="spline-loading-orb" />
        </div>
      )}

      <div
        className={`w-full h-full transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{ transform: "scale(1.0)" }}
      >
        <Spline
          scene="https://prod.spline.design/QvwWJuxjXQNLFlpO/scene.splinecode"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
