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

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer
      id="contact"
      className="relative pt-12 md:pt-16 pb-10 md:pb-12 border-t border-[#ECE5FA] dark:border-white/10 bg-transparent overflow-hidden px-4 sm:px-6"
    >
      <div className="container relative z-10">
        {/* CTA Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 md:p-10 mb-10 md:mb-16 rounded-3xl bg-white/95 dark:bg-[#08070b]/90 border border-[#EEE7FB] dark:border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-500 hover:shadow-[0_24px_60px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] dark:hover:border-primary/30">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-foreground mb-3 leading-tight">
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
            <button className="w-full md:w-auto px-8 py-4 rounded-xl bg-primary text-white font-semibold text-lg hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-primary/25">
              {t.footer.talkToMe || "Fale comigo"}
            </button>
          </a>
        </div>

        <div className="flex flex-col md:flex-row md:flex-wrap gap-x-12 lg:gap-x-24 gap-y-10 mb-8 md:mb-10 items-start">
          <div className="w-full md:w-auto group relative overflow-hidden flex items-center gap-4 p-5 md:p-6 rounded-2xl bg-white/95 dark:bg-[#08070b]/90 border border-[#EEE7FB] dark:border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-500 hover:shadow-[0_24px_60px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] dark:hover:border-primary/30 md:min-w-[480px]">
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
              className="group flex items-center gap-2 text-[10px] font-bold text-slate-500 dark:text-muted-foreground/80 uppercase tracking-[0.2em] hover:text-primary transition-all duration-300"
            >
              <div className="p-1.5 rounded-full border border-slate-200 dark:border-white/10 group-hover:border-primary/50 group-hover:bg-primary/5 transition-colors">
                <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </div>
              {t.footer.backToTop}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
