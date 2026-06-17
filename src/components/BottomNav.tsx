import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUp, Folder, Briefcase, Mail, X,
  User, Cpu, Terminal, Globe, Sun, Moon, Menu,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/theme-provider";

const MobileTopNav = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  const menuGrid = [
    { id: "top",        icon: ArrowUp,   label: t.nav.home },
    { id: "projects",   icon: Folder,    label: t.nav.projects },
    { id: "about",      icon: User,      label: t.nav.about },
    { id: "experience", icon: Briefcase, label: t.nav.experience },
    { id: "stack",      icon: Cpu,       label: t.nav.tech },
    { id: "contact",    icon: Mail,      label: t.nav.contact },
  ];

  useEffect(() => {
    const sectionIds = ["about", "experience", "stack", "projects"];
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (window.scrollY < 100) { setActiveSection("top"); return; }
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    if (isExpanded) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isExpanded]);

  const scrollTo = useCallback((id: string) => {
    setIsExpanded(false);
    if (id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    if (id === "contact") { window.open("https://wa.me/5585999973965", "_blank"); return; }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  return (
    <div
      ref={menuRef}
      className={`
        fixed top-0 left-0 right-0 z-50 md:hidden
        transition-all duration-300 px-4 pt-3 pb-2
        ${isScrolled
          ? "bg-white/75 dark:bg-background/80 backdrop-blur-xl border-b border-[#ECE5FA] dark:border-white/10 shadow-sm"
          : "bg-transparent"
        }
      `}
    >
      {/* ── BARRA PRINCIPAL ── */}
      <div className="flex items-center justify-between">
        {/* Logo + Nome */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); scrollTo("top"); }}
          className="flex items-center gap-2 group"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-primary/15 to-fuchsia-100 dark:from-primary/10 dark:to-transparent border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
            <Terminal className="h-4 w-4 text-primary" />
          </div>
          <span className="font-bold text-base tracking-tight text-slate-900 dark:text-foreground group-hover:text-primary transition-colors">
            Nicolas Harnisch
          </span>
        </a>

        {/* Botão abrir/fechar */}
        <button
          onClick={() => setIsExpanded(v => !v)}
          className={`
            flex items-center justify-center w-9 h-9 rounded-xl
            border transition-all duration-200 active:scale-90
            ${isExpanded
              ? "bg-primary/10 border-primary/30 text-primary"
              : "border-[#E9E2F8] dark:border-white/10 bg-[#FCFAFF] dark:bg-white/5 text-slate-600 dark:text-white/60 hover:text-primary dark:hover:text-white/90"
            }
          `}
        >
          {isExpanded ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* ── MENU EXPANDIDO (dropdown para baixo) ── */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-out
          ${isExpanded ? "max-h-[400px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"}
        `}
      >
        <div className="
          bg-white/95 dark:bg-[#0F0E15]/95 backdrop-blur-xl
          border border-[#E9E2F8] dark:border-white/10
          rounded-xl
          p-3
          shadow-[0_20px_60px_-15px_rgba(168,85,247,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
        ">
          {/* Grid de navegação */}
          <div className="grid grid-cols-3 gap-1 mb-2">
            {menuGrid.map(({ id, icon: Icon, label }) => {
              const isActive = activeSection === id || (id === "top" && activeSection === "");
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`
                    flex flex-col items-center gap-1.5 px-2 py-3 rounded-lg
                    transition-all duration-200 active:scale-95
                    ${isActive
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5"
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-slate-500 dark:text-slate-400"}`} />
                  <span className="text-[11px] font-medium leading-none">{label}</span>
                </button>
              );
            })}
          </div>

          {/* Divisor */}
          <div className="h-px bg-[#E9E2F8] dark:bg-white/[0.07] my-3" />

          {/* Tema + Idioma */}
          <div className="flex gap-2">
            <button
              onClick={toggleLanguage}
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg border border-[#E9E2F8] dark:border-white/10 bg-[#FCFAFF] dark:bg-white/[0.03] text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5 hover:border-primary/20 active:scale-95 transition-all duration-200 text-xs font-medium shadow-sm"
            >
              <Globe className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span className="uppercase">{language}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg border border-[#E9E2F8] dark:border-white/10 bg-[#FCFAFF] dark:bg-white/[0.03] text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5 hover:border-primary/20 active:scale-95 transition-all duration-200 text-xs font-medium shadow-sm"
            >
              {theme === "dark" ? <Sun className="h-4 w-4 text-slate-400" /> : <Moon className="h-4 w-4 text-slate-500" />}
              <span>{theme === "dark" ? "Claro" : "Escuro"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MobileTopNav);
