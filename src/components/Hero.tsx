import { useState, useEffect, useMemo, memo, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import StarBackground from "./StarBackground";

// Code Splitting: O Spline é uma biblioteca pesada, isolamos o carregamento para não travar o carregamento inicial da página.
const SplineScene = lazy(() => import("./SplineScene"));

/* ─── Typewriter ─────────────────────────────────────────────────────────────── */
// Memoizado para evitar que o componente Hero inteiro re-renderize a cada nova letra digitada.
const TypewriterLoop = memo(({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
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
  }, [displayedText, isDeleting, text]);

  return (
    <>
      {displayedText}
      <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 animate-pulse" />
    </>
  );
});

TypewriterLoop.displayName = "TypewriterLoop";

/* ─── Hero ───────────────────────────────────────────────────────────────────── */
const Hero = () => {
  const { t } = useLanguage();

  // useMemo para estabilizar as referências e evitar recriação de objetos em cada render.
  const links = useMemo(
    () => ({
      curriculo:
        "https://drive.google.com/file/d/139dr8jYnxxpTTrC9aRdwwc_VzdJjGMg9/view?usp=sharing",
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
    <section className="relative min-h-[60vh] md:min-h-[85vh] flex items-center overflow-hidden px-4 sm:px-6 bg-transparent">
      {/* Background limpo - Apenas as estrelas globais aparecerão aqui */}

      <div className="container relative z-10 pt-24 sm:pt-28 md:pt-28 lg:pt-28 xl:pt-32 pb-8 flex flex-col justify-center min-h-[60vh] md:min-h-[85vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 items-center w-full mt-4 md:mt-0">
          {/* ── COLUNA ESQUERDA (Textos) ── */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-3 sm:mb-6 animate-fade-up text-foreground"
              style={{ animationDelay: "0.05s" }}
            >
              Nícolas Gomes
              <br />
              <span className="text-gradient">Harnisch</span>
            </h1>

            <p
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-3 animate-fade-up min-h-[1.75em] sm:min-h-[2em] flex items-center justify-center md:justify-start"
              style={{ animationDelay: "0.1s" }}
            >
              <TypewriterLoop text={t.hero.role} />
            </p>

            <p
              className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-xl mb-8 sm:mb-10 animate-fade-up mx-auto md:mx-0 px-2 sm:px-0 leading-relaxed"
              style={{ animationDelay: "0.2s" }}
            >
              {t.hero.description}
            </p>

            <div
              className="flex flex-col sm:flex-row items-center gap-4 animate-fade-up mx-auto md:mx-0 w-full sm:w-auto justify-center md:justify-start"
              style={{ animationDelay: "0.4s" }}
            >
              {/* BOTÕES PRINCIPAIS */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 sm:px-0">
                <a
                  href={links.curriculo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/80 hover:brightness-110 active:scale-95 transition-all duration-300 group shadow-lg shadow-primary/25 w-full sm:w-auto text-base px-6 sm:px-8 rounded-xl h-12 sm:h-[46px]"
                  >
                    <FileText className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    {t.hero.resumeBtn}
                  </Button>
                </a>
                <a href="#projects" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-base px-6 sm:px-8 rounded-xl border-[#E2D8FA] dark:border-white/10 bg-white dark:bg-transparent text-foreground dark:text-white shadow-sm hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all duration-300 h-12 sm:h-[46px]"
                  >
                    {t.hero.projectsBtn}
                  </Button>
                </a>
              </div>

              {/* BOTÕES SOCIAIS */}
              <div className="flex gap-4 sm:gap-3 mt-4 sm:mt-0">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="
                      p-4 sm:p-3 rounded-xl sm:rounded-lg
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
                    <social.icon className="h-6 w-6 sm:h-5 sm:w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── COLUNA DIREITA: Spline 3D — Robô interativo ── */}
          <div
            className="hidden md:flex items-center justify-center animate-fade-up relative"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="w-full h-full flex items-center justify-center">
              {/* Suspense com placeholder de baixo custo para evitar Layout Shift */}
              <Suspense
                fallback={
                  <div className="w-full aspect-square max-w-[14rem] sm:max-w-[18rem] md:max-w-[22rem] lg:max-w-[28rem] bg-primary/5 rounded-3xl animate-pulse" />
                }
              >
                <SplineScene />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
