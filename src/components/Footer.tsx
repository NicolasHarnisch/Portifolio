import { Instagram, Linkedin, Github, Mail, MapPin, Terminal } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="relative py-12 border-t border-[#ECE5FA] dark:border-white/10 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#faf7ff_100%)] dark:hidden pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 dark:bg-card/30 border border-[#EEE7FB] dark:border-white/10 shadow-[0_8px_24px_rgba(88,28,135,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            <div
              className="
                flex items-center justify-center w-12 h-12 rounded-xl
                bg-gradient-to-br from-primary/15 to-fuchsia-100 dark:from-primary/10 dark:to-transparent
                border border-primary/20
                shadow-[0_8px_20px_rgba(168,85,247,0.18)]
                transition-all duration-300
              "
            >
              <Terminal className="h-6 w-6 text-primary" />
            </div>

            <div>
              <p className="font-bold text-lg text-slate-900 dark:text-foreground">
                Nícolas Harnisch
              </p>
              <p className="text-sm text-slate-500 dark:text-muted-foreground">
                {t.footer.role}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
              {t.footer.contactTitle}
            </h4>

            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-4 w-4" />
              <a href="mailto:nicolasgomeshar@gmail.com">
                nicolasgomeshar@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Russas, Ceará</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
              {t.footer.socialTitle}
            </h4>

            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/nick.harnisch_/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-[#EAE3FA] dark:bg-card/30 dark:border-white/10 text-muted-foreground hover:text-primary hover:bg-[#F7F2FF] dark:hover:bg-white/10 transition-all duration-300 shadow-sm hover:shadow-[0_8px_22px_rgba(168,85,247,0.12)]"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/nicolasharnisch/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-[#EAE3FA] dark:bg-card/30 dark:border-white/10 text-muted-foreground hover:text-primary hover:bg-[#F7F2FF] dark:hover:bg-white/10 transition-all duration-300 shadow-sm hover:shadow-[0_8px_22px_rgba(168,85,247,0.12)]"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="https://github.com/NicolasHarnisch"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-[#EAE3FA] dark:bg-card/30 dark:border-white/10 text-muted-foreground hover:text-primary hover:bg-[#F7F2FF] dark:hover:bg-white/10 transition-all duration-300 shadow-sm hover:shadow-[0_8px_22px_rgba(168,85,247,0.12)]"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#ECE5FA] dark:border-white/10 text-center">
          <p className="text-sm text-slate-500 dark:text-muted-foreground">
            © {currentYear} Nícolas Harnisch. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;