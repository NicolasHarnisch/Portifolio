import { memo, useEffect, useRef, useState } from "react";
import {
  ArrowUp, Folder, Briefcase, Mail, X,
  User, Cpu, Terminal, Globe, Sun, Moon, Menu,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigationState } from "@/hooks/useNavigationState";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { CONTACT_URL } from "@/lib/links";

const MobileTopNav = () => {
  const { activeSection, isScrolled } = useNavigationState();
  const [isExpanded, setIsExpanded] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { resolvedTheme, toggleTheme } = useThemeToggle();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const menuGrid = [
    { id: "top",        icon: ArrowUp,   label: t.nav.home },
    { id: "projects",   icon: Folder,    label: t.nav.projects },
    { id: "about",      icon: User,      label: t.nav.about },
    { id: "experience", icon: Briefcase, label: t.nav.experience },
    { id: "stack",      icon: Cpu,       label: t.nav.tech },
    { id: "contact",    icon: Mail,      label: t.nav.contact },
  ];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
        triggerRef.current?.focus();
      }
    };
    if (isExpanded) {
      document.addEventListener("pointerdown", handler);
      document.addEventListener("keydown", onKeyDown);
    }
    return () => {
      document.removeEventListener("pointerdown", handler);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isExpanded]);

  return (
    <div
      ref={menuRef}
      className={`
        fixed top-0 left-0 right-0 z-50 lg:hidden
        transition-all duration-300 px-4 pt-3 pb-2
        ${isScrolled
          ? "site-header-glass"
          : "bg-transparent"
        }
      `}
    >
      {/* ── BARRA PRINCIPAL ── */}
      <div className="flex items-center justify-between">
        {/* Logo + Nome */}
        <a
          href="#top"
          onClick={() => setIsExpanded(false)}
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
          ref={triggerRef}
          type="button"
          aria-label={language === "pt" ? (isExpanded ? "Fechar menu" : "Abrir menu") : (isExpanded ? "Close menu" : "Open menu")}
          aria-expanded={isExpanded}
          aria-controls="mobile-navigation"
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
      <nav
        id="mobile-navigation"
        aria-label={language === "pt" ? "Navegação principal" : "Main navigation"}
        aria-hidden={!isExpanded}
        style={{ visibility: isExpanded ? "visible" : "hidden" }}
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
                <a
                  key={id}
                  href={id === "contact" ? CONTACT_URL : `#${id}`}
                  target={id === "contact" ? "_blank" : undefined}
                  rel={id === "contact" ? "noopener noreferrer" : undefined}
                  aria-current={isActive && id !== "contact" ? "location" : undefined}
                  tabIndex={isExpanded ? 0 : -1}
                  onClick={() => { setIsExpanded(false); triggerRef.current?.focus(); }}
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
                </a>
              );
            })}
          </div>

          {/* Divisor */}
          <div className="h-px bg-[#E9E2F8] dark:bg-white/[0.07] my-3" />

          {/* Tema + Idioma */}
          <div className="flex gap-2">
            <button
              tabIndex={isExpanded ? 0 : -1}
              aria-label={language === "pt" ? "Switch to English" : "Mudar para Português"}
              onClick={toggleLanguage}
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg border border-[#E9E2F8] dark:border-white/10 bg-[#FCFAFF] dark:bg-white/[0.03] text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5 hover:border-primary/20 active:scale-95 transition-all duration-200 text-xs font-medium shadow-sm"
            >
              <Globe className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span className="uppercase">{language}</span>
            </button>
            <button
              tabIndex={isExpanded ? 0 : -1}
              aria-label={language === "pt" ? "Alterar tema" : "Toggle theme"}
              onClick={toggleTheme}
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg border border-[#E9E2F8] dark:border-white/10 bg-[#FCFAFF] dark:bg-white/[0.03] text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5 hover:border-primary/20 active:scale-95 transition-all duration-200 text-xs font-medium shadow-sm"
            >
              {resolvedTheme === "dark" ? <Sun className="h-4 w-4 text-slate-400" /> : <Moon className="h-4 w-4 text-slate-500" />}
              <span>{language === "pt" ? (resolvedTheme === "dark" ? "Claro" : "Escuro") : (resolvedTheme === "dark" ? "Light" : "Dark")}</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default memo(MobileTopNav);
