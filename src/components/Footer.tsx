import {
  Instagram,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Terminal,
  ArrowUp,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCardSpotlight } from "@/hooks/useCardSpotlight";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const handleSpotlight = useCardSpotlight();

  return (
    <footer
      id="contact"
      className="relative z-10 pt-12 md:pt-16 pb-10 md:pb-12 border-t border-[#ECE5FA] dark:border-white/10 bg-white dark:bg-[#050505] overflow-hidden px-4 sm:px-6"
    >
      {/* Luzes de fundo (Blobs) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-[10%] top-[10%] w-[30%] h-[40%] rounded-full bg-primary/10 dark:bg-primary/5 blur-[120px] mix-blend-normal" />
        <div className="absolute right-[15%] bottom-[-10%] w-[35%] h-[45%] rounded-full bg-fuchsia-500/10 dark:bg-fuchsia-500/5 blur-[120px] mix-blend-normal" />
        <div className="absolute left-[35%] top-[-15%] w-[40%] h-[50%] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] mix-blend-normal" />
        <div className="absolute -right-[5%] top-[40%] w-[25%] h-[35%] rounded-full bg-primary/10 dark:bg-primary/5 blur-[100px] mix-blend-normal" />
      </div>

      <div className="container relative z-10">
        {/* CTA Section com spinning border isolado na borda */}
        <div 
          onMouseMove={handleSpotlight}
          className="card-spotlight relative mb-10 md:mb-16 group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(168,85,247,0.14)] rounded-[1.5rem] bg-white/95 dark:bg-[#08070b]/90 border border-[#E9E2F8] dark:border-white/10 backdrop-blur-md dark:hover:bg-[#0d0c12] hover:border-primary/30"
        >
          {/* Anel de luz giratório COM MÁSCARA (SÓ aparece nos 1.5px da borda, nunca no fundo!) */}
          <div className="spinning-border-container">
            <div className="spinning-border-mask">
              <div className="spinning-border-gradient" />
            </div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-6 sm:p-8 md:p-10">
          <div className="flex-1 text-center md:text-left md:pr-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-foreground mb-3 leading-tight text-balance">
              {t.footer.ctaTitle}
            </h3>
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300">
              {t.footer.ctaDescription}
            </p>
          </div>
          <a
            href="https://wa.me/5585999973965"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 w-full md:w-auto"
          >
            <button className="w-full md:w-auto px-6 py-3 rounded-xl bg-primary text-white font-semibold text-base hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-primary/25">
              {t.footer.talkToMe || "Fale comigo"}
            </button>
          </a>
        </div>
        </div>

        <div className="flex flex-col md:flex-row md:flex-wrap gap-x-12 lg:gap-x-24 gap-y-10 mb-8 md:mb-10 items-start">
          <div 
            onMouseMove={handleSpotlight}
            className="card-spotlight w-full md:w-auto group relative overflow-hidden flex items-center gap-4 p-5 md:p-6 rounded-2xl bg-white/95 dark:bg-[#08070b]/90 border border-[#E9E2F8] dark:border-white/10 shadow-[0_12px_32px_rgba(88,28,135,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all duration-500 hover:border-primary/30 dark:hover:bg-[#0d0c12] hover:shadow-[0_24px_60px_rgba(168,85,247,0.14)] md:min-w-[480px]"
          >
            <div className="relative z-10 flex items-center gap-4">
              <div
                className="
                  flex items-center justify-center w-12 h-12 rounded-xl
                  bg-gradient-to-br from-primary/15 to-fuchsia-100 dark:from-primary/10 dark:to-transparent
                  border border-primary/20
                  transition-all duration-500
                "
              >
                <Terminal className="h-6 w-6 text-primary transition-colors duration-500" />
              </div>

              <div>
                <p className="font-bold text-lg text-slate-900 dark:text-foreground">
                  Nícolas Harnisch
                </p>
                <p className="text-sm text-slate-500 dark:text-muted-foreground">
                  {t.footer.role}
                </p>
                <a
                  href="https://github.com/NicolasHarnisch/Portifolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-medium uppercase tracking-wider text-primary/70 hover:text-primary transition-colors group/link"
                >
                  <Github className="h-3 w-3 transition-transform group-hover/link:scale-110" />
                  {t.footer.sourceCode}
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
              {t.footer.contactTitle}
            </h4>

            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
              <Mail className="h-4 w-4" />
              <a href="mailto:nicolasgomeshar@gmail.com">
                nicolasgomeshar@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <MapPin className="h-4 w-4" />
              <span>Russas, Ceará</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
              <Terminal className="h-4 w-4" />
              <a
                href="https://drive.google.com/file/d/139dr8jYnxxpTTrC9aRdwwc_VzdJjGMg9/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Currículo
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
              {t.footer.navTitle}
            </h4>
            <nav className="flex flex-col gap-2">
              <a
                href="#projects"
                className="text-sm text-slate-500 dark:text-muted-foreground hover:text-primary dark:hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] w-fit"
              >
                {t.nav.projects}
              </a>
              <a
                href="#about"
                className="text-sm text-slate-500 dark:text-muted-foreground hover:text-primary dark:hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] w-fit"
              >
                {t.nav.about}
              </a>
              <a
                href="#experience"
                className="text-sm text-slate-500 dark:text-muted-foreground hover:text-primary dark:hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] w-fit"
              >
                {t.nav.experience}
              </a>
              <a
                href="#stack"
                className="text-sm text-slate-500 dark:text-muted-foreground hover:text-primary dark:hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] w-fit"
              >
                {t.nav.tech}
              </a>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
              {t.footer.socialTitle}
            </h4>

            <div className="flex gap-3 mt-2">
              <a
                href="https://www.linkedin.com/in/nicolasharnisch/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  p-3 rounded-lg
                  bg-black/5 dark:bg-background/50
                  border border-black/10 dark:border-white/10
                  text-foreground
                  transition-all duration-300
                  hover:bg-slate-900 hover:text-primary hover:border-slate-800 hover:shadow-md
                  dark:hover:bg-white dark:hover:text-primary dark:hover:border-white
                  hover-shake shadow-sm active:scale-95
                "
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="https://github.com/NicolasHarnisch"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  p-3 rounded-lg
                  bg-black/5 dark:bg-background/50
                  border border-black/10 dark:border-white/10
                  text-foreground
                  transition-all duration-300
                  hover:bg-slate-900 hover:text-primary hover:border-slate-800 hover:shadow-md
                  dark:hover:bg-white dark:hover:text-primary dark:hover:border-white
                  hover-shake shadow-sm active:scale-95
                "
              >
                <Github className="h-5 w-5" />
              </a>

              <a
                href="mailto:nicolasgomeshar@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                className="
                  p-3 rounded-lg
                  bg-black/5 dark:bg-background/50
                  border border-black/10 dark:border-white/10
                  text-foreground
                  transition-all duration-300
                  hover:bg-slate-900 hover:text-primary hover:border-slate-800 hover:shadow-md
                  dark:hover:bg-white dark:hover:text-primary dark:hover:border-white
                  hover-shake shadow-sm active:scale-95
                "
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#ECE5FA] dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-900 dark:text-foreground">
              © {currentYear} Nícolas Harnisch - {t.footer.role}.{" "}
              {t.footer.rights}
            </p>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 text-[12px] font-bold text-slate-500 dark:text-muted-foreground/80 uppercase tracking-[0.2em] hover:text-primary transition-colors duration-300"
            >
              <div className="p-2 rounded-full border border-slate-200 dark:border-white/10 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                <ArrowUp className="h-4 w-4 text-slate-400 group-hover:text-primary transition-transform duration-300 group-hover:-translate-y-0.5" />
              </div>
              <span className="group-hover:text-primary transition-colors duration-300">{t.footer.backToTop}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
