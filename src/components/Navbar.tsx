import { useState, useEffect, useMemo, memo, useCallback } from "react";
import { Button } from "./ui/button";
import { Menu, Terminal, Globe, Sun, Moon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/theme-provider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const navLinks = useMemo(
    () => [
      { name: t.nav.about, id: "about" },
      { name: t.nav.experience, id: "experience" },
      { name: t.nav.tech, id: "stack" },
      { name: t.nav.projects, id: "projects" },
    ],
    [t],
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 100;

      const sections = navLinks.map((link) => {
        const el = document.getElementById(link.id);
        return {
          id: link.id,
          offset: el ? el.offsetTop : 0,
          height: el ? el.offsetHeight : 0,
        };
      });

      const current = sections.find(
        (section) =>
          scrollPosition >= section.offset &&
          scrollPosition < section.offset + section.height,
      );

      if (current) {
        setActiveSection(current.id);
      } else if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  const scrollToSection = useCallback((id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop - 80;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 ${
        isScrolled
          ? "bg-white/75 dark:bg-background/80 backdrop-blur-xl border-b border-[#ECE5FA] dark:border-white/10 py-3 sm:py-4 shadow-sm"
          : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
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
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`
                  relative text-sm font-medium py-1
                  ${
                    activeSection === link.id
                      ? "text-primary dark:text-primary"
                      : "text-slate-600 dark:text-muted-foreground hover:text-primary dark:hover:text-primary"
                  }
                  transition-colors duration-300
                  group/link
                `}
              >
                {link.name}
                <span
                  className={`
                    absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300
                    ${activeSection === link.id ? "w-full" : "w-0 group-hover/link:w-full"}
                  `}
                />
              </button>
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
                title="Alterar tema"
                type="button"
              >
                {theme === "dark" ? (
                  <Sun className="h-3.5 w-3.5" />
                ) : (
                  <Moon className="h-3.5 w-3.5" />
                )}
              </button>

              <div className="h-3.5 w-px bg-[#E6DFFC] dark:bg-white/10" />

              <button
                onClick={toggleLanguage}
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

            <Button
              className="h-9 px-4 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground text-sm font-medium transition-all duration-300 shadow-sm"
              onClick={() =>
                window.open("https://wa.me/5585999973965", "_blank")
              }
            >
              {t.nav.contact}
            </Button>
          </div>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-foreground hover:bg-primary/5 hover:text-primary dark:hover:text-primary"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[280px] bg-white/95 dark:bg-background/95 backdrop-blur-xl border-[#E9E2F8] dark:border-white/10"
          >
            <SheetHeader>
              <SheetTitle className="text-left flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 text-slate-900 dark:text-foreground">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/5 border border-primary/20">
                    <Terminal className="h-4 w-4 text-primary" />
                  </div>
                  Menu
                </div>
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`
                    text-base font-medium text-left py-2
                    ${activeSection === link.id ? "text-primary" : "text-slate-600 dark:text-muted-foreground"}
                    hover:text-primary dark:hover:text-primary
                    transition-colors duration-300
                  `}
                >
                  {link.name}
                </button>
              ))}

              <div className="h-px bg-[#E6DFFC] dark:bg-white/10 my-2" />

              <div className="flex items-center gap-3 py-2">
                <button
                  onClick={toggleLanguage}
                  className="
                    group
                    flex items-center justify-center gap-2 h-10 px-3 rounded-xl
                    border border-[#E9E2F8] dark:border-white/10
                    bg-white dark:bg-white/[0.03]
                    text-sm font-medium text-slate-900 dark:text-white
                    hover:text-primary hover:bg-primary/5
                    dark:hover:text-primary dark:hover:bg-white/5
                    transition-all duration-300 shadow-sm
                  "
                  type="button"
                >
                  <Globe className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  <span className="uppercase">{language}</span>
                </button>

                <button
                  onClick={toggleTheme}
                  className="
                    flex items-center justify-center h-10 w-10 rounded-xl
                    border border-[#E9E2F8] dark:border-white/10
                    bg-white dark:bg-white/[0.03]
                    text-muted-foreground
                    hover:text-primary hover:bg-primary/5
                    dark:hover:text-primary dark:hover:bg-white/5
                    transition-all duration-300 shadow-sm
                  "
                  type="button"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </button>
              </div>

              <Button
                className="mt-2 h-10 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground w-full shadow-sm"
                onClick={() => {
                  setIsOpen(false);
                  window.open("https://wa.me/5585999973965", "_blank");
                }}
              >
                {t.nav.contact}
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default memo(Navbar);
