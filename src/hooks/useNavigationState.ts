import { useEffect, useState } from "react";

export const SECTION_IDS = ["projects", "about", "experience", "stack", "contact"] as const;

export function useNavigationState(scrollThreshold = 20) {
  const [state, setState] = useState({ activeSection: "top", isScrolled: false });
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let activeSection = "top";
      // offsetTop is relative to the offset parent, not the document.
      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 110) activeSection = id;
      }
      const isScrolled = window.scrollY > scrollThreshold;
      setState(previous => previous.activeSection === activeSection && previous.isScrolled === isScrolled
        ? previous : { activeSection, isScrolled });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [scrollThreshold]);
  return state;
}
