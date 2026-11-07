import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { hasCachedSpline, hasVisitedProject, useSplineEligibility } from "@/hooks/useSplineEligibility";
import { usePortfolioMotion } from "@/hooks/usePortfolioMotion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const { language, t } = useLanguage();
  const location = useLocation();
  const { hash } = location;
  const [fromProject] = useState(
    () => (location.state as { fromProject?: boolean } | null)?.fromProject === true || hasVisitedProject(),
  );
  const { eligible } = useSplineEligibility();
  const [awaitAtLaunch] = useState(() => eligible && !fromProject && !hasCachedSpline());
  const [sceneSettled, setSceneSettled] = useState(false);
  const completeScene = useCallback(() => setSceneSettled(true), []);
  const waiting = awaitAtLaunch && eligible && !sceneSettled;
  const motionRef = useRef<HTMLElement>(null);
  usePortfolioMotion(motionRef, language, !waiting);
  useEffect(() => {
    if (waiting) return;
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView?.({ block: "start", behavior: "instant" as ScrollBehavior });
      else if (fromProject) window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    });
    return () => cancelAnimationFrame(frame);
  }, [fromProject, hash, waiting]);
  useEffect(() => {
    if (location.pathname !== "/") return;
    document.title = `Nícolas Harnisch | ${t.hero.role}`;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", t.hero.description);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute("content", document.title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute("content", t.hero.description);
    document.querySelector<HTMLMetaElement>('meta[property="og:locale"]')?.setAttribute("content", language === "pt" ? "pt_BR" : "en_US");
    document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute("content", document.title);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute("content", t.hero.description);
    // A visitor can navigate here from the statically served 404 document.
    document.querySelector('meta[name="robots"][content*="noindex"]')?.remove();
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = "https://nicolasharnisch.vercel.app/";
  }, [language, t.hero.role, t.hero.description, location.pathname]);

  return (
    <>
    <Preloader active={waiting} onContinue={completeScene} />
    <div id="top" aria-busy={waiting} {...(waiting ? { inert: "", "aria-hidden": true as const } : {})}
      className="min-h-screen relative bg-white dark:bg-background text-foreground transition-colors duration-500">
      <a href="#main-content" className="skip-link">{language === "pt" ? "Ir para o conteúdo" : "Skip to content"}</a>
      {/* Luzes difusas no fundo para quebrar o preto chapado */}
      <div aria-hidden="true" className="fixed inset-0 z-[0] pointer-events-none flex justify-center items-center overflow-hidden">
        <div className="absolute top-[-20%] w-[800px] h-[800px] bg-primary/10 dark:bg-primary/5 rounded-full blur-[150px] mix-blend-screen opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 dark:bg-purple-600/5 rounded-full blur-[120px] mix-blend-screen opacity-50" />
      </div>

      {/* Noise Texture - pointer-events-none para performance */}
      <div
        className="fixed inset-0 z-[1] opacity-5 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("/noise.svg")' }}
      />

      <Navbar />
      <BottomNav />

      <main ref={motionRef} id="main-content" tabIndex={-1} className="relative z-10">
        {/* Hero é crítico (LCP), então mantemos o carregamento síncrono */}
        <Hero introReady={!waiting} onSceneSettled={completeScene} />

        {/* Uma superfície opaca cobre o Hero e mantém o degradê contínuo até o rodapé. */}
        <div className="site-content relative z-20 -mt-10 sm:-mt-20 rounded-t-[2.5rem] md:rounded-t-[4rem] overflow-hidden border-t border-slate-200 dark:border-white/15 shadow-[0_-10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <Projects />
          <About />
          <Experience />
          <TechStack />
          <Footer />
        </div>
      </main>
    </div>
    </>
  );
};

export default Index;
