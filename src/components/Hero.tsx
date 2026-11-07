import {
  useState,
  useEffect,
  useMemo,
  memo,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { Button } from "@/components/ui/button";
import { FileText, Github, Linkedin, Mail, ArrowDownRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { animateHero } from "@/animations/hero";
import DeferredGraphics from "./DeferredGraphics";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useInView, usePageVisible } from "@/hooks/useVisible";
import { RESUME_URL } from "@/lib/links";
import { useNavigationState } from "@/hooks/useNavigationState";
import type { GraphicLoadResult } from "@/hooks/useSplineEligibility";

/* ─── Typewriter ─────────────────────────────────────────────────────────────── */
// Memoizado para evitar que o componente Hero inteiro re-renderize a cada nova letra digitada.
const TypewriterLoop = memo(({ text, active }: { text: string; active: boolean }) => {
  const [displayedText, setDisplayedText] = useState(text);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => { setDisplayedText(text); setIsDeleting(false); }, [text]);

  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  useEffect(() => {
    if (!active || reduced) return;
    let timeout: ReturnType<typeof setTimeout>;
    const typeSpeed = 60;
    const deleteSpeed = 60;
    const pauseTime = 8000;

    if (!isDeleting && displayedText === text) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayedText === "") {
      timeout = setTimeout(() => setIsDeleting(false), 1000);
    } else {
      const nextDelay = isDeleting ? deleteSpeed : typeSpeed;
      timeout = setTimeout(() => {
        setDisplayedText(
          text.substring(0, displayedText.length + (isDeleting ? -1 : 1)),
        );
      }, nextDelay);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, text, active, reduced]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{reduced ? text : displayedText}
        <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 animate-pulse" />
      </span>
    </>
  );
});

TypewriterLoop.displayName = "TypewriterLoop";

/* ─── Hero ───────────────────────────────────────────────────────────────────── */
const Hero = ({ introReady = true, onSceneSettled }: {
  introReady?: boolean; onSceneSettled?: (result: GraphicLoadResult) => void;
}) => {
  const { t, language } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const desktop = useMediaQuery("(min-width: 768px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const finePointer = useMediaQuery("(pointer: fine)");
  const inView = useInView(sectionRef);
  const { activeSection } = useNavigationState();
  const graphicVisible = inView && activeSection === "top";
  const pageVisible = usePageVisible();
  const rafRef = useRef<number | null>(null);
  // O Hero é sticky; quando o conteúdo o cobre por completo ele é ocultado para não vazar durante a rolagem.
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = sectionRef.current;
      if (el) setCovered(window.scrollY >= el.offsetHeight);
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
  }, []);

  useLayoutEffect(() => {
    if (!introReady) return;
    const cleanup = animateHero({
      containerRef: sectionRef,
      badgeRef,
      titleRef,
      subtitleRef,
      ctaRef,
      showcaseRef,
    });
    return cleanup;
  }, [reduced, introReady]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (window.innerWidth < 768 || !sectionRef.current) return;
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      const el = sectionRef.current;
      if (!el) {
        rafRef.current = null;
        return;
      }
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const nx = (clientX / innerWidth - 0.5) * 2;
      const ny = (clientY / innerHeight - 0.5) * 2;
      el.style.setProperty("--px-mid", `${(nx * 6).toFixed(2)}px`);
      el.style.setProperty("--py-mid", `${(ny * 6).toFixed(2)}px`);
      el.style.setProperty("--px-main", `${(nx * 10).toFixed(2)}px`);
      el.style.setProperty("--py-main", `${(ny * 10).toFixed(2)}px`);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    if (!desktop || reduced || !finePointer || !graphicVisible || !pageVisible) {
      for (const name of ["--px-mid", "--py-mid", "--px-main", "--py-main"]) sectionRef.current?.style.removeProperty(name);
      return;
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [handleMouseMove, desktop, reduced, finePointer, graphicVisible, pageVisible]);

  // useMemo para estabilizar as referências e evitar recriação de objetos em cada render.
  const links = useMemo(
    () => ({
      curriculo: RESUME_URL,
      github: "https://github.com/NicolasHarnisch",
      linkedin: "https://www.linkedin.com/in/nicolasharnisch/",
      email: "mailto:nicolasgomeshar@gmail.com",
    }),
    [],
  );

  const socials = useMemo(
    () => [
      { icon: Github, href: links.github, label: "GitHub" },
      { icon: Linkedin, href: links.linkedin, label: "LinkedIn" },
      { icon: Mail, href: links.email, label: "Email" },
    ],
    [links],
  );

  return (
    <section
      ref={sectionRef}
      className={`sticky top-0 z-0 w-full min-h-[calc(100svh+2.5rem)] sm:min-h-[calc(100svh+5rem)] flex items-center overflow-hidden px-4 sm:px-6 bg-transparent ${covered ? "invisible" : ""}`}
    >
      <DeferredGraphics kind="stars" inView={graphicVisible && introReady} />

      <div data-hero-content className="container relative z-10 pt-24 pb-16 md:pt-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 items-center w-full">
          {/* ── COLUNA ESQUERDA (Textos) ── */}
          <div
            className="flex flex-col items-start text-left"
            style={{
              transform: "translate(var(--px-mid, 0), var(--py-mid, 0))",
              transition: "transform 0.1s linear",
            }}
          >
            <h1
              ref={titleRef}
              className="text-[2.35rem] sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-extrabold leading-[1.08] tracking-tight mb-3 sm:mb-5 text-foreground"
            >
              <span className="hero-name-window"><span data-hero-line>Nícolas Gomes</span></span>
              <span className="hero-name-window"><span data-hero-line className="text-gradient">Harnisch</span></span>
            </h1>

            <p
              ref={badgeRef}
              className="text-lg sm:text-2xl lg:text-[1.65rem] font-semibold text-foreground/95 mb-3 min-h-[1.75em] sm:min-h-[2em] flex items-center justify-start"
            >
              <TypewriterLoop text={t.hero.role} active={graphicVisible && pageVisible} />
            </p>

            <p
              ref={subtitleRef}
              className="text-[0.98rem] sm:text-[1.1rem] lg:text-[1.15rem] text-slate-600 dark:text-slate-300/90 max-w-[34rem] mb-7 sm:mb-8 leading-relaxed"
            >
              <span className="sm:hidden">{t.hero.mobileDescription}</span>
              <span className="hidden sm:inline">{t.hero.description}</span>
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 w-full sm:w-auto justify-start"
            >
              {/* BOTÕES PRINCIPAIS */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full sm:w-auto">
                <div className="w-full sm:w-auto">
                  <Button asChild
                    size="lg"
                    className="btn-primary-motion bg-primary text-primary-foreground hover:bg-primary/80 hover:brightness-110 active:scale-95 group shadow-lg shadow-primary/25 w-full sm:w-auto text-base px-6 sm:px-8 rounded-xl h-12 sm:h-[48px]"
                  >
                    <a href={links.curriculo} target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                      {t.hero.resumeBtn}
                    </a>
                  </Button>
                </div>
                <div className="w-full sm:w-auto">
                  <Button asChild
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-base px-6 sm:px-8 rounded-xl border-[#E2D8FA] dark:border-white/10 bg-white dark:bg-transparent text-foreground dark:text-white shadow-sm hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all [transition-duration:220ms] h-12 sm:h-[48px]"
                  >
                    <a href="#projects">{t.hero.projectsBtn}</a>
                  </Button>
                </div>
              </div>

              {/* BOTÕES SOCIAIS */}
              <div
                className="flex gap-4 sm:gap-3 mt-1 sm:mt-0"
              >
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="
                      p-3 rounded-xl
                      bg-black/5 dark:bg-background/50
                      border border-black/10 dark:border-white/10
                      text-foreground
                      transition-all duration-300
                      hover:bg-slate-900 hover:text-primary hover:border-slate-800 hover:shadow-md
                      dark:hover:bg-white dark:hover:text-primary dark:hover:border-white
                      hover-shake
                      shadow-sm
                      active:scale-95
                    "
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── COLUNA DIREITA: Spline 3D — Robô interativo ── */}
          <div
            ref={showcaseRef}
            className="hidden md:flex items-center justify-center relative"
          >
            <div className="hero-orbit" aria-hidden="true"><span /><span /><i /></div>
            <div className="w-full h-full flex items-center justify-center relative"
              style={{ transform: "translate(var(--px-main, 0), var(--py-main, 0))", transition: "transform 0.12s linear" }}>
              <DeferredGraphics kind="spline" inView={graphicVisible} eager={!introReady} onSettled={onSceneSettled} />
            </div>
          </div>
        </div>
      </div>
      <a href="#projects" className="hero-scroll-cue hidden md:inline-flex">
        <span>{language === "pt" ? "Role para explorar" : "Scroll to explore"}</span>
        <ArrowDownRight aria-hidden="true" className="h-5 w-5" />
      </a>
    </section>
  );
};

export default memo(Hero);
