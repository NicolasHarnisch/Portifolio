import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initGSAP } from "./utils";

export function setupPortfolioMotion(root: HTMLElement) {
  initGSAP();
  const media = gsap.matchMedia(root);
  let disposed = false;

  try {
    media.add({
      desktop: "(min-width: 1024px) and (pointer: fine)",
      mobile: "(max-width: 1023px), (pointer: coarse)",
      reduced: "(prefers-reduced-motion: reduce)",
    }, context => {
      const { desktop, reduced } = context.conditions!;
      if (reduced) return;
      const reveals = new Map<HTMLElement, gsap.core.Animation>();
      const thresholdRatio = desktop ? 0.76 : 0.82;
      // A hash target or an already-read block must not disappear during setup.
      const shouldReveal = (element: HTMLElement) => element.getBoundingClientRect().top > window.innerHeight * thresholdRatio;

      root.querySelectorAll<HTMLElement>("[data-motion-heading]").forEach(heading => {
        if (!shouldReveal(heading)) return;
        const words = heading.querySelectorAll("[data-motion-word]");
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: heading,
          start: desktop ? "top 80%" : "top 85%",
          once: true,
        } });
        if (words.length) timeline.fromTo(words,
          { yPercent: 110, rotation: desktop ? 4 : 0 },
          { yPercent: 0, rotation: 0, duration: 0.75, stagger: 0.065, ease: "power4.out" }, 0);
        const chapter = heading.querySelector("[data-motion-chapter]");
        if (chapter) timeline.fromTo(chapter,
          { x: desktop ? 40 : 15, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.85, ease: "power3.out" }, 0);
        const rule = heading.querySelector("[data-motion-rule]");
        if (rule) timeline.fromTo(rule,
          { scaleX: 0 }, { scaleX: 1, duration: 0.85, ease: "power3.out" }, 0.1);
        reveals.set(heading, timeline);
      });

      // Animação de cards em grade com stagger relativo a cada linha
      root.querySelectorAll<HTMLElement>(".grid").forEach(grid => {
        const cards = grid.querySelectorAll<HTMLElement>(":scope > [data-motion-card]");
        cards.forEach((card, cardIndex) => {
          if (!shouldReveal(card)) return;
          const animation = gsap.fromTo(card,
            {
              opacity: 0,
              y: desktop ? 46 : 24,
              scale: desktop ? 0.96 : 1,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: desktop ? 0.8 : 0.55,
              delay: desktop ? (cardIndex % 3) * 0.08 : 0,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: card,
                start: desktop ? "top 82%" : "top 86%",
                once: true,
              },
            });
          reveals.set(card, animation);
        });
      });

      // Animação de itens individuais (fora da grade de cards)
      root.querySelectorAll<HTMLElement>("[data-motion-item]").forEach((element, index) => {
        if (!shouldReveal(element)) return;
        const animation = gsap.fromTo(element,
          {
            opacity: 0,
            y: desktop ? 32 : 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: desktop ? 0.75 : 0.5,
            delay: desktop ? Math.min((index % 2) * 0.06, 0.12) : 0,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: element,
              start: desktop ? "top 82%" : "top 86%",
              once: true,
            },
          });
        reveals.set(element, animation);
      });

      const timeline = root.querySelector<HTMLElement>("[data-motion-timeline]");
      const line = timeline?.querySelector("[data-motion-line]");
      if (timeline && line) gsap.fromTo(line, { scaleY: 0 }, {
        scaleY: 1, ease: "none", scrollTrigger: {
          trigger: timeline, start: "top 70%", end: "bottom 70%", scrub: 0.4,
        },
      });

      if (desktop) {
        const projects = root.querySelector("#projects");
        const hero = root.querySelector<HTMLElement>("[data-hero-content]");
        if (projects && hero) {
          gsap.fromTo(
            hero,
            { y: 0, scale: 1, opacity: 1 },
            {
              y: -70,
              scale: 0.95,
              opacity: 0.08,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: projects,
                start: "top bottom",
                end: "top 15%",
                scrub: 0.4,
                invalidateOnRefresh: true,
              },
            },
          );
        }
        root.querySelectorAll<HTMLElement>("[data-motion-image]").forEach(image => {
          gsap.fromTo(image, { yPercent: -4, scale: 1.07 }, {
            yPercent: 4, scale: 1.07, ease: "none",
            scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 },
          });
        });
      }

      const showFocusedContent = (event: FocusEvent) => {
        if (!(event.target instanceof Node)) return;
        reveals.forEach((animation, element) => {
          if (element.contains(event.target as Node)) animation.progress(1);
        });
      };
      root.addEventListener("focusin", showFocusedContent);
      return () => root.removeEventListener("focusin", showFocusedContent);
    });
  } catch (error) {
    media.revert();
    throw error;
  }

  const refresh = () => {
    if (!disposed) ScrollTrigger.refresh();
  };
  const refreshFrame = requestAnimationFrame(refresh);
  void document.fonts?.ready.then(refresh).catch(() => {});
  return () => {
    disposed = true;
    cancelAnimationFrame(refreshFrame);
    media.revert();
  };
}
