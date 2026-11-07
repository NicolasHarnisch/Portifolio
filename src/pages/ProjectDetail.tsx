import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Globe, Moon, Sun, Terminal } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProject, projectData } from "@/data/projects";
import { markVisitedProject } from "@/hooks/useSplineEligibility";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { CONTACT_URL } from "@/lib/links";

const chapterIds = ["screen", "overview", "journey", "stack"] as const;
type ChapterId = typeof chapterIds[number];

function ProjectArticle({ id }: { id: string }) {
  const { language, toggleLanguage, t } = useLanguage();
  const { resolvedTheme, toggleTheme } = useThemeToggle();
  const project = getProject(id)!;
  const copy = t.projects.items.find(item => item.id === id)!;
  const projectIndex = projectData.findIndex(item => item.id === id);
  const next = projectData[(projectIndex + 1) % projectData.length];
  const nextCopy = t.projects.items.find(item => item.id === next.id)!;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeChapter, setActiveChapter] = useState<ChapterId>("screen");

  useLayoutEffect(() => {
    markVisitedProject();
    setActiveChapter("screen");
    window.scrollTo({ top: 0, behavior: "instant" });
    titleRef.current?.focus({ preventScroll: true });
  }, [id]);

  useEffect(() => {
    document.querySelector('meta[name="robots"][content*="noindex"]')?.remove();
    document.title = `${copy.title} | Nícolas Harnisch`;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", copy.description);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute("content", document.title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute("content", copy.description);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute("content", document.title);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute("content", copy.description);
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", `https://nicolasharnisch.vercel.app/projects/${id}`);
  }, [copy, id]);

  useEffect(() => {
    let frame = 0;
    const updateActiveChapter = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const cutoff = Math.max(220, window.innerHeight * 0.38);
        let current: ChapterId = "screen";
        for (const chapter of chapterIds) {
          if ((document.getElementById(`project-detail-${chapter}`)?.getBoundingClientRect().top ?? Infinity) <= cutoff) current = chapter;
        }
        const scrollHeight = document.documentElement.scrollHeight;
        if (scrollHeight > window.innerHeight && window.innerHeight + window.scrollY >= scrollHeight - 48) {
          current = chapterIds[chapterIds.length - 1];
        }
        setActiveChapter(previous => previous === current ? previous : current);
      });
    };
    window.addEventListener("scroll", updateActiveChapter, { passive: true });
    return () => { window.removeEventListener("scroll", updateActiveChapter); if (frame) cancelAnimationFrame(frame); };
  }, [id]);

  const goToChapter = (chapter: ChapterId) => {
    const section = document.getElementById(`project-detail-${chapter}`);
    if (!section) return;
    const offset = window.matchMedia("(max-width: 850px)").matches ? 155 : 96;
    window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - offset, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    setActiveChapter(chapter);
  };

  const chapters = [t.projects.screenTitle, t.projects.overviewTitle, t.projects.journeyTitle, t.projects.stackTitle];
  const navLinks = [
    { name: t.nav.projects, id: "projects" },
    { name: t.nav.about, id: "about" },
    { name: t.nav.experience, id: "experience" },
    { name: t.nav.tech, id: "stack" },
  ];

  return (
    <div className="project-detail-page">
      <header className="sticky top-0 left-0 right-0 z-50 site-header-glass px-4 sm:px-6 py-3 sm:py-4 transition-all duration-300">
        <div className="container flex items-center justify-between gap-3">
          <Link
            to="/#top"
            state={{ fromProject: true }}
            className="flex items-center gap-2 sm:gap-3 group shrink-0"
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
          </Link>

          <div className="flex items-center gap-5 lg:gap-6">
            <div className="hidden md:flex items-center gap-5 lg:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={`/#${link.id}`}
                  state={{ fromProject: true }}
                  className="
                    relative text-sm font-medium px-3 py-1.5 rounded-lg
                    text-slate-600 dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground
                    transition-colors [transition-duration:220ms]
                  "
                >
                  {link.name}
                </Link>
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
                className="hidden sm:inline-flex btn-primary-motion h-9 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium shadow-sm shadow-primary/20"
              >
                <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">{t.nav.contact}</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main key={id} className="project-detail-inner project-page-enter">
        <div className="project-detail-hero">
          <Link
            to="/#projects"
            state={{ fromProject: true }}
            className="project-detail-back"
            aria-label={t.projects.backBtn}
          >
            <ArrowLeft size={15} aria-hidden="true" />
            <span>{t.projects.backBtn}</span>
          </Link>

          <div className="project-detail-title-row">
            <h1 ref={titleRef} tabIndex={-1} className="project-detail-title">{copy.title}</h1>
            <div className="project-detail-actions">
              {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-detail-primary-action">
                {t.projects.viewBtn}<ArrowUpRight size={16} aria-hidden="true" />
              </a>}
              {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-detail-secondary-action">
                <Github size={16} aria-hidden="true" />{t.projects.codeBtn}<ArrowUpRight size={15} aria-hidden="true" />
              </a>}
              {project.inDevelopment && <span className="project-detail-status">{t.projects.inDevelopment}</span>}
            </div>
          </div>
        </div>

        <div className="project-detail-meta" aria-label={language === "pt" ? "Informações do projeto" : "Project information"}>
          <div><span>{t.projects.roleLabel}</span><strong>{copy.role}</strong></div>
          <div><span>{t.projects.projectTypeLabel}</span><strong>{copy.category}</strong></div>
          <div><span>{t.projects.stackTitle}</span><strong>{project.tags.join(", ")}</strong></div>
          <div><span>{t.projects.projectNumberLabel}</span><strong>{String(projectIndex + 1).padStart(2, "0")} / {String(projectData.length).padStart(2, "0")}</strong></div>
          <div><span>{t.projects.yearLabel}</span><strong>{project.year}</strong></div>
        </div>

        <section id="project-detail-screen" className="project-detail-showcase" aria-label={t.projects.screenTitle}>
          <div className="project-detail-image-frame">
            <img
              src={project.image}
              width={project.width}
              height={project.height}
              alt={language === "pt" ? `Captura de tela do projeto ${copy.title}` : `Screenshot of the ${copy.title} project`}
              loading="eager"
              decoding="async"
            />
          </div>
        </section>

        <div className="project-detail-columns">
          <nav className="project-detail-chapters" aria-label={t.projects.chaptersTitle}>
            <span className="project-detail-chapters-label">{t.projects.chaptersTitle}</span>
            {chapterIds.map((chapter, index) => <button
              type="button"
              key={chapter}
              onClick={() => goToChapter(chapter)}
              className={`project-detail-chapter ${activeChapter === chapter ? "is-active" : ""}`}
              aria-current={activeChapter === chapter ? "location" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>{chapters[index]}
            </button>)}
          </nav>

          <div className="project-detail-article">
            <section id="project-detail-overview" className="project-detail-section">
              <span className="project-detail-section-index">02 / {t.projects.overviewTitle}</span>
              <h2>{t.projects.overviewTitle}</h2>
              <p className="project-detail-body-copy">{copy.story}</p>
              <h3 className="project-detail-subhead">{t.projects.highlightsTitle}</h3>
              <ul className="project-detail-highlights">
                {copy.highlights.map(item => <li key={item}><span aria-hidden="true" />{item}</li>)}
              </ul>
            </section>

            <section id="project-detail-journey" className="project-detail-section">
              <span className="project-detail-section-index">03 / {t.projects.journeyTitle}</span>
              <h2>{t.projects.journeyTitle}</h2>
              <ol className="project-detail-steps">
                {copy.details.map((detail, index) => <li key={detail.title}>
                  <span className="project-detail-step-number">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{detail.title}</h3><p>{detail.description}</p></div>
                </li>)}
              </ol>
            </section>

            <section id="project-detail-stack" className="project-detail-section">
              <span className="project-detail-section-index">04 / {t.projects.stackTitle}</span>
              <h2>{t.projects.stackTitle}</h2>
              <ul className="project-detail-stack">
                {project.tags.map(tag => <li key={tag}>{tag}</li>)}
              </ul>
            </section>

            <Link to={`/projects/${next.id}`} className="project-detail-next" aria-label={`${t.projects.nextTitle} ${nextCopy.title}`}>
              <span><small>{t.projects.nextTitle}</small><strong>{nextCopy.title}</strong></span>
              <ArrowRight size={24} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  if (!getProject(id)) return <Navigate to="/404" replace />;
  return <ProjectArticle id={id!} />;
}
