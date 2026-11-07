import anime from "animejs";

/** Keep the existing hover, but clean up animations and restore the current theme. */
export function setupCardHover(card: HTMLElement | null) {
  if (!card || typeof window === "undefined" || !window.matchMedia) return;
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const initial = { transform: card.style.transform, boxShadow: card.style.boxShadow, borderColor: card.style.borderColor };
  let resting = { shadow: "", border: "" };
  const restore = () => {
    anime.remove(card);
    Object.assign(card.style, initial);
  };
  const enter = () => {
    if (media.matches || !window.matchMedia("(pointer: fine)").matches) return;
    restore();
    const style = getComputedStyle(card);
    resting = { shadow: style.boxShadow, border: style.borderColor };
    anime({ targets: card, scale: 1.02, translateY: -4,
      boxShadow: "0 20px 40px rgba(162, 128, 255, 0.16)", borderColor: "rgba(162, 128, 255, 0.4)",
      duration: 150, easing: "easeOutSine" });
  };
  const leave = () => {
    if (!resting.border || media.matches) { restore(); return; }
    anime.remove(card);
    anime({ targets: card, scale: 1, translateY: 0, boxShadow: resting.shadow, borderColor: resting.border,
      duration: 150, easing: "easeOutSine", complete: restore });
  };
  const preferenceChanged = () => { if (media.matches) restore(); };
  card.addEventListener("mouseenter", enter);
  card.addEventListener("mouseleave", leave);
  media.addEventListener?.("change", preferenceChanged);
  return () => {
    card.removeEventListener("mouseenter", enter);
    card.removeEventListener("mouseleave", leave);
    media.removeEventListener?.("change", preferenceChanged);
    restore();
  };
}
