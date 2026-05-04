import { memo, useMemo } from "react";
import { Github, ExternalLink, Folder, Rocket } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { t } = useLanguage();

  // useMemo para estabilizar os dados estáticos e evitar re-processamento
  const projectData = useMemo(
    () => [
      {
        image: "/ansanalytics.png",
        tags: [
          "Java",
          "Python",
          "FastAPI",
          "MySQL",
          "ETL",
          "Docker",
          "Maven",
          "Vue.js",
        ],
        github: "https://github.com/NicolasHarnisch/health-data-analysis",
        live: "https://ansanalytics.vercel.app",
      },
      {
        image: "/sistema-triagem-hospitalar.png",
        tags: ["Java", "Swing", "JUnit 5", "MVC"],
        github: "https://github.com/NicolasHarnisch/sistema-triagem-hospitalar",
        live: "",
      },
      {
        image: "/Engremaq-Web.png",
        tags: ["HTML5", "CSS3", "JavaScript", "Node.js", "MongoDB"],
        github: "https://github.com/NicolasHarnisch/Engremaq-web-project.git",
        live: "https://engremaq.vercel.app",
      },
    ],
    [],
  );

  return (
    <section
      id="projects"
      className="py-20 md:py-28 relative overflow-hidden px-4 sm:px-6"
    >
      <div
        ref={ref}
        className={`container relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-12 ml-1">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
            <Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <span className="text-xs sm:text-sm uppercase tracking-[0.22em] text-primary font-semibold block mb-1">
              {t.projects.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-foreground">
              {t.projects.title}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-20">
          {t.projects.items.map((project, index) => {
            const data = projectData[index];
            if (!data) return null; // Prevenção contra erros de índice

            return (
              <div
                key={index}
                className="group rounded-xl border border-[#E9E2F8] dark:border-white/10 bg-white/95 dark:bg-[#08070b]/90 backdrop-blur-xl overflow-hidden hover:border-primary/35 dark:hover:bg-[#0d0c12] transition-all duration-500 flex flex-col min-h-[520px] shadow-[0_14px_36px_rgba(88,28,135,0.07)] hover:shadow-[0_24px_60px_rgba(168,85,247,0.14)]"
              >
                <div className="aspect-video w-full overflow-hidden relative shrink-0 bg-[#F8F5FF] dark:bg-black/60">
                  {data.image ? (
                    <>
                      <img
                        src={data.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-white/10 to-transparent dark:from-black/50 dark:via-black/10 dark:to-transparent z-10 pointer-events-none" />
                    </>
                  ) : (
                    <div className="w-full h-full bg-[#F8F5FF] dark:bg-card/30 flex items-center justify-center">
                      <Folder className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50" />
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-7 flex flex-col flex-grow relative z-20">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 text-slate-900 dark:text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 dark:text-muted-foreground text-sm mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {data.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="px-3 py-1 rounded-full bg-[#F7F4FF] dark:bg-white/5 border border-[#E7DFFC] dark:border-white/10 text-slate-600 dark:text-muted-foreground text-xs font-medium hover:bg-primary/10 hover:border-primary/40 hover:text-primary dark:hover:bg-primary/20 dark:hover:border-primary/50 dark:hover:text-primary transition-all duration-300 cursor-default hover:shadow-[0_0_12px_rgba(168,85,247,0.25)] hover:-translate-y-0.5"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E8E0FA] dark:via-white/10 to-transparent mb-6" />

                  <div className="flex gap-3 pt-2 mt-auto">
                    <a
                      href={data.github}
                      target="_blank"
                      rel="noreferrer"
                      className={data.live ? "flex-1 group/btn" : "w-full group/btn"}
                    >
                      <Button
                        variant="outline"
                        className="w-full rounded-xl border-[#E2D8FA] dark:border-white/10 bg-white dark:bg-transparent text-foreground dark:text-white shadow-sm hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all duration-300 gap-2 h-10 text-sm font-medium"
                      >
                        <Github
                          size={16}
                          className="opacity-90 transition-all duration-300 group-hover/btn:opacity-100 group-hover/btn:-translate-y-[1px]"
                        />
                        {t.projects.codeBtn}
                      </Button>
                    </a>

                    {data.live && (
                      <a
                        href={data.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 group/btn"
                      >
                        <Button
                          className="w-full rounded-xl bg-primary text-white border border-primary/20 hover:bg-primary/90 hover:text-white hover:border-primary hover:shadow-[0_12px_30px_rgba(168,85,247,0.28)] transition-all duration-300 gap-2 h-10 text-sm font-medium"
                        >
                          <ExternalLink
                            size={16}
                            className="opacity-90 transition-all duration-300 group-hover/btn:opacity-100 group-hover/btn:-translate-y-[1px] group-hover/btn:translate-x-[1px]"
                          />
                          {t.projects.viewBtn}
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default memo(Projects);