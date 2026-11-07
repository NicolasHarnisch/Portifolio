import { useMemo, memo } from "react";
import { Button } from "./ui/button";
import { Terminal, Globe, Sun, Moon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigationState } from "@/hooks/useNavigationState";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { CONTACT_URL } from "@/lib/links";

const Navbar = () => {
  const { activeSection, isScrolled } = useNavigationState(50);
  const { language, toggleLanguage, t } = useLanguage();
  const { resolvedTheme, toggleTheme } = useThemeToggle();

  const navLinks = useMemo(
    () => [
      { name: t.nav.projects, id: "projects" },
      { name: t.nav.about, id: "about" },
      { name: t.nav.experience, id: "experience" },
      { name: t.nav.tech, id: "stack" },
    ],
    [t],
  );

  return (
    <nav
      aria-label={language === "pt" ? "Navegação principal" : "Main navigation"}
      className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 ${
        isScrolled
          ? "site-header-glass py-3 sm:py-4"
          : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2 sm:gap-3 group"
        >
          <div
            className="
              flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl
              bg-gradient-to-br from-primary/15 to-fuchsia-100 dark:from-primary/10 dark:to-transparent
              border border-primary/20
              group-hover:border-primary/40
              transition-all duration-300
            "
          >
            <Terminal className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
          </div>

          <span className="font-bold text-base sm:text-xl tracking-tight group-hover:text-primary transition-colors text-slate-900 dark:text-foreground">
            Nicolas Harnisch
          </span>
        </a>

        <div className="hidden md:flex items-center gap-5 lg:gap-6">
          <div className="flex items-center gap-5 lg:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={activeSection === link.id ? "location" : undefined}
                className={`
                  relative text-sm font-medium px-3 py-1.5 rounded-lg
                  transition-colors [transition-duration:220ms]
                  ${
                    activeSection === link.id
                      ? "text-primary"
                      : "text-slate-600 dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground"
                  }
                `}
                style={{
                  background:
                    activeSection === link.id
                      ? "rgba(168,85,247,0.08)"
                      : "transparent",
                  transition:
                    "color 220ms ease, background 350ms cubic-bezier(0.215,0.61,0.355,1)",
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:block h-5 w-px bg-[#E6DFFC] dark:bg-white/10" />

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1 rounded-xl border border-[#E9E2F8] dark:border-white/10 bg-white/80 dark:bg-white/[0.03] px-1.5 py-1 backdrop-blur-sm shadow-sm">
              <button
                onClick={toggleTheme}
                className="
                  flex items-center justify-center h-7 w-7 rounded-md
                  text-muted-foreground
                  hover:text-primary hover:bg-primary/5
                  dark:hover:text-primary dark:hover:bg-white/5
                  transition-all duration-300
                "
                title={language === "pt" ? "Alterar tema" : "Toggle theme"}
                aria-label={language === "pt" ? "Alterar tema" : "Toggle theme"}
                type="button"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-3.5 w-3.5" />
                ) : (
                  <Moon className="h-3.5 w-3.5" />
                )}
              </button>

              <div className="h-3.5 w-px bg-[#E6DFFC] dark:bg-white/10" />

              <button
                onClick={toggleLanguage}
                aria-label={language === "pt" ? "Switch to English" : "Mudar para Português"}
                className="
                  group
                  flex items-center justify-center gap-1.5 h-7 px-2 rounded-md
                  text-xs font-medium text-slate-900 dark:text-white
                  hover:text-primary
                  hover:bg-primary/5
                  dark:hover:text-primary
                  dark:hover:bg-white/5
                  transition-all duration-300
                "
                title={
                  language === "pt"
                    ? "Switch to English"
                    : "Mudar para Português"
                }
                type="button"
              >
                <Globe className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                <span className="uppercase tracking-wide">{language}</span>
              </button>
            </div>

            <Button asChild
              className="btn-primary-motion h-9 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium shadow-sm shadow-primary/20"
            >
              <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">{t.nav.contact}</a>
            </Button>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default memo(Navbar);
