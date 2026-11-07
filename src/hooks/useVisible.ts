import { RefObject, useEffect, useState, useSyncExternalStore } from "react";

const subscribe = (notify: () => void) => {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
};
export function usePageVisible() {
  return useSyncExternalStore(subscribe, () => document.visibilityState !== "hidden", () => true);
}

export function useInView(ref: RefObject<Element>) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!ref.current || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return visible;
}
