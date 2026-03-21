import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, Terminal, Globe, Sun } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-3 sm:py-4 shadow-md"
          : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6">
        {/* LOGO */}
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
              bg-primary/10 border border-primary/20
              shadow-[0_0_15px_rgba(168,85,247,0.3)]
              group-hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]
              group-hover:border-primary/50 group-hover:bg-primary/20
              transition-all duration-300
            "
          >
            <Terminal className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
          </div>

          <span className="font-bold text-base sm:text-xl tracking-tight group-hover:text-primary transition-colors">
            Nicolas Harnisch
          </span>
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-5 lg:gap-6">
          {/* Links */}
          <div className="flex items-center gap-5 lg:gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* divisor */}
          <div className="hidden lg:block h-5 w-px bg-white/10" />

          {/* ações */}
          <div className="flex items-center gap-2.5">
            {/* grupo tema + idioma */}
            <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] px-1.5 py-1 backdrop-blur-sm">
              <button
                className="flex items-center justify-center h-7 w-7 rounded-md text-muted-foreground hover:text-primary hover:bg-white/5 transition-all duration-300"
                title="Tema"
                type="button"
              >
                <Sun className="h-3.5 w-3.5" />
              </button>

              <div className="h-3.5 w-px bg-white/10" />

              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center gap-1.5 h-7 px-2 rounded-md text-xs font-medium text-white hover:bg-white/5 transition-all duration-300"
                title={language === "pt" ? "Switch to English" : "Mudar para Português"}
                type="button"
              >
                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="uppercase tracking-wide">{language}</span>
              </button>
            </div>

            {/* botão principal */}
            <Button
              className="h-9 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              onClick={() => window.open("https://wa.me/5585996883588", "_blank")}
            >
              {t.nav.contact}
            </Button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[280px] bg-background/95 backdrop-blur-xl border-white/10"
          >
            <SheetHeader>
              <SheetTitle className="text-left flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
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
                  className="text-base font-medium text-left py-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </button>
              ))}

              <div className="h-px bg-white/10 my-2" />

              <div className="flex items-center gap-3 py-2">
                <button
                  onClick={toggleLanguage}
                  className="flex flex-1 items-center justify-center gap-2 h-10 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/5 transition-all text-sm font-medium"
                  type="button"
                >
                  <Globe className="h-4 w-4" />
                  <span className="uppercase">{language}</span>
                </button>

                <button
                  className="flex items-center justify-center h-10 w-10 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/5 transition-all"
                  type="button"
                >
                  <Sun className="h-4 w-4" />
                </button>
              </div>

              <Button
                className="mt-2 h-10 rounded-xl bg-primary hover:bg-primary/80 w-full"
                onClick={() => {
                  setIsOpen(false);
                  window.open("https://wa.me/5585996883588", "_blank");
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