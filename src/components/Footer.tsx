import {
  Linkedin,
  Github,
  Mail,
  MapPin,
  Terminal,
  ArrowUp,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { RESUME_URL, CONTACT_URL } from "@/lib/links";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer
      id="contact"
      className="relative z-10 pt-12 md:pt-16 pb-10 md:pb-12 border-t border-[#ECE5FA] dark:border-white/10 overflow-hidden px-4 sm:px-6"
    >
      {/* Luzes de fundo (Blobs) */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none dark:hidden">
        <div className="absolute -left-[10%] top-[10%] w-[30%] h-[40%] rounded-full bg-primary/10 dark:bg-primary/5 blur-[120px] mix-blend-normal" />
        <div className="absolute right-[15%] bottom-[-10%] w-[35%] h-[45%] rounded-full bg-fuchsia-500/10 dark:bg-fuchsia-500/5 blur-[120px] mix-blend-normal" />
        <div className="absolute left-[35%] top-[-15%] w-[40%] h-[50%] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] mix-blend-normal" />
        <div className="absolute -right-[5%] top-[40%] w-[25%] h-[35%] rounded-full bg-primary/10 dark:bg-primary/5 blur-[100px] mix-blend-normal" />
      </div>

      <div data-motion-item className="container relative z-10">
        {/* CTA Section com spinning border isolado na borda */}
        <div 
          className="surface-card relative mb-8 md:mb-16 group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(168,85,247,0.14)] rounded-2xl sm:rounded-[1.5rem] hover:border-primary/30"
        >
          {/* Anel de luz giratório COM MÁSCARA (SÓ aparece nos 1.5px da borda, nunca no fundo!) */}
          <div className="spinning-border-container">
            <div className="spinning-border-mask">
              <div className="spinning-border-gradient" />
            </div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-8 p-5 sm:p-8 md:p-10">
          <div className="flex-1 text-left md:pr-8">
            <h3 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-foreground mb-2.5 sm:mb-3 leading-tight">
              {t.footer.ctaTitle}
            </h3>
            <p className="text-sm sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              {t.footer.ctaDescription}
            </p>
          </div>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center shrink-0 w-full md:w-auto px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-primary/25"
          >
              {t.footer.talkToMe || "Fale comigo"}
          </a>
        </div>
        </div>

        <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap gap-x-6 sm:gap-x-12 lg:gap-x-24 gap-y-7 md:gap-y-10 mb-8 md:mb-10 items-start">
          <div 
            className="col-span-2 surface-card w-full md:w-auto group relative overflow-hidden flex items-center gap-4 p-4 sm:p-5 md:p-6 rounded-2xl shadow-[0_12px_32px_rgba(88,28,135,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition-all duration-500 hover:border-primary/30 hover:shadow-[0_24px_60px_rgba(168,85,247,0.14)] md:min-w-[480px]"
          >
            <div className="relative z-10 flex items-center gap-3.5 sm:gap-4">
              <div
                className="
                  flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl shrink-0
                  bg-gradient-to-br from-primary/15 to-fuchsia-100 dark:from-primary/10 dark:to-transparent
                  border border-primary/20
                  transition-all duration-500
                "
              >
                <Terminal className="h-5 w-5 sm:h-6 sm:w-6 text-primary transition-colors duration-500" />
              </div>

              <div>
                <p className="font-bold text-base sm:text-lg text-slate-900 dark:text-foreground">
                  Nícolas Harnisch
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-muted-foreground">
                  {t.footer.role}
                </p>
                <a
                  href="https://github.com/NicolasHarnisch/Portifolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-1.5 sm:mt-2 text-[10px] font-medium uppercase tracking-wider text-primary/70 hover:text-primary transition-colors group/link"
                >
                  <Github className="h-3 w-3 transition-transform group-hover/link:scale-110" />
                  {t.footer.sourceCode}
                </a>
              </div>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 space-y-2.5 sm:space-y-3">
            <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
              {t.footer.contactTitle}
            </h4>

            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
              <Mail className="h-4 w-4 shrink-0 text-primary/80" />
              <a href="mailto:nicolasgomeshar@gmail.com" className="truncate">
                nicolasgomeshar@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <MapPin className="h-4 w-4 shrink-0 text-primary/80" />
              <span>Russas, Ceará</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
              <Terminal className="h-4 w-4 shrink-0 text-primary/80" />
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.hero.resumeBtn}
              </a>
            </div>
          </div>

          <div className="col-span-1 space-y-2.5 sm:space-y-3">
            <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
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

          <div className="col-span-1 space-y-2.5 sm:space-y-3">
            <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
              {t.footer.socialTitle}
            </h4>

            <div className="flex gap-2.5 sm:gap-3 mt-2">
              <a
                href="https://www.linkedin.com/in/nicolasharnisch/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  p-2.5 sm:p-3 rounded-xl
                  bg-black/5 dark:bg-white/[0.04]
                  border border-black/10 dark:border-white/10
                  text-foreground
                  transition-all duration-300
                  hover:bg-slate-900 hover:text-primary hover:border-slate-800 hover:shadow-md
                  dark:hover:bg-white dark:hover:text-primary dark:hover:border-white
                  hover-shake shadow-sm active:scale-95
                "
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>

              <a
                href="https://github.com/NicolasHarnisch"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  p-2.5 sm:p-3 rounded-xl
                  bg-black/5 dark:bg-white/[0.04]
                  border border-black/10 dark:border-white/10
                  text-foreground
                  transition-all duration-300
                  hover:bg-slate-900 hover:text-primary hover:border-slate-800 hover:shadow-md
                  dark:hover:bg-white dark:hover:text-primary dark:hover:border-white
                  hover-shake shadow-sm active:scale-95
                "
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>

              <a
                href="mailto:nicolasgomeshar@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                className="
                  p-2.5 sm:p-3 rounded-xl
                  bg-black/5 dark:bg-white/[0.04]
                  border border-black/10 dark:border-white/10
                  text-foreground
                  transition-all duration-300
                  hover:bg-slate-900 hover:text-primary hover:border-slate-800 hover:shadow-md
                  dark:hover:bg-white dark:hover:text-primary dark:hover:border-white
                  hover-shake shadow-sm active:scale-95
                "
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-[#ECE5FA] dark:border-white/10 flex flex-col-reverse md:flex-row justify-between items-center gap-4 sm:gap-6 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-600 dark:text-muted-foreground">
              © {currentYear} Nícolas Harnisch - {t.footer.role}.{" "}
              {t.footer.rights}
            </p>
          </div>

          <div className="w-full sm:w-auto flex items-center justify-center">
            <a
              href="#top"
              className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-xl border border-[#E8E0FA] dark:border-white/10 bg-[#F8F5FF] dark:bg-white/[0.04] hover:border-primary/40 hover:bg-primary/10 text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-[0.16em] hover:text-primary transition-all duration-300 shadow-sm"
            >
              <ArrowUp className="h-4 w-4 text-primary transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>{t.footer.backToTop}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
