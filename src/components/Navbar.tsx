import { useState, useEffect } from "react";
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
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: t.nav.about, id: "about" },
    { name: t.nav.experience, id: "experience" },
    { name: t.nav.tech, id: "stack" },
    { name: t.nav.projects, id: "projects" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/75 dark:bg-background/80 backdrop-blur-xl border-b border-[#ECE5FA] dark:border-white/10 py-3 sm:py-4 shadow-[0_8px_30px_rgba(88,28,135,0.08)]"
          : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6">
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
              shadow-[0_8px_22px_rgba(168,85,247,0.18)]
              group-hover:shadow-[0_12px_28px_rgba(168,85,247,0.28)]
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
                className="
                  text-sm font-medium
                  text-slate-600 dark:text-muted-foreground
                  hover:text-primary
                  dark:hover:text-primary
                  transition-colors duration-300
                "
              >
                {link.name}
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
              className="h-9 px-4 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground text-sm font-medium transition-all duration-300 shadow-[0_8px_22px_rgba(168,85,247,0.24)] hover:shadow-[0_12px_28px_rgba(168,85,247,0.34)]"
              onClick={() => window.open("https://wa.me/5585999973965", "_blank")}
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
                <div className="flex items-center gap-2 text-slate-900 dark:text-foreground">
                  <Terminal className="h-5 w-5 text-primary" />
                  Menu
                </div>
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="
                    text-base font-medium text-left py-2
                    text-slate-600 dark:text-muted-foreground
                    hover:text-primary dark:hover:text-primary
                    transition-colors duration-300
                  "
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
                className="mt-2 h-10 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground w-full shadow-[0_8px_20px_rgba(168,85,247,0.24)]"
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

export default Navbar;