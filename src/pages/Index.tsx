import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StarBackground from "@/components/StarBackground";

// Lazy loading das seções que estão "abaixo da dobra" (below the fold)
// Isso reduz o tamanho do arquivo JavaScript inicial carregado pelo navegador.
const About = lazy(() => import("@/components/About"));
const Experience = lazy(() => import("@/components/Experience"));
const Projects = lazy(() => import("@/components/Projects"));
const TechStack = lazy(() => import("@/components/TechStack"));
const Footer = lazy(() => import("@/components/Footer"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));

const Index = () => {
  return (
    <div className="min-h-screen relative bg-white dark:bg-[#050505] text-foreground transition-colors duration-500">
      <StarBackground />
      {/* Noise Texture - pointer-events-none para performance */}
      <div
        className="fixed inset-0 z-[1] opacity-5 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("/noise.svg")' }}
      />

      <Navbar />

      <main className="relative z-10">
        {/* Hero é crítico (LCP), então mantemos o carregamento síncrono */}
        <Hero />
        
        {/* Suspense agrupa o carregamento das seções secundárias */}
          <Suspense fallback={null}>
            <About />
            <Experience />
            <TechStack />
            <Projects />
            <Footer />
            <WhatsAppButton />
          </Suspense>
        </main>
    </div>
  );
};

export default Index;
