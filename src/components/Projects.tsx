import { Github, ExternalLink, Folder, Rocket } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

const projectData = [
  {
    image: "/TvRussas.png",
    tags: ["Next.js", "React", "Node.js", "PostgreSQL"],
    github: "",
    live: "https://tvrussas.com.br/",
    privateRepo: true,
  },
  {
    image: "/TFBrand.png",
    tags: ["React", "Node.js", "E-commerce", "Mobile First"],
    github: "",
    live: "",
    inDevelopment: true,
    privateRepo: true,
  },
  {
    image: "/ansanalytics.png",
    tags: ["Java", "Python", "FastAPI", "Vue.js"],
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
    tags: ["JavaScript", "Node.js", "MongoDB"],
    github: "https://github.com/NicolasHarnisch/Engremaq-web-project.git",
    live: "https://engremaq.vercel.app",
  },
];

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { t } = useLanguage();

  return (
    <section
      id="projects"
      className="py-16 md:py-28 relative overflow-hidden px-4 sm:px-6"
    >
      <div
        ref={ref}
        className={`container relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-row items-center gap-3 sm:gap-4 mb-8 sm:mb-12 ml-1">
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
            if (!data) return null;

            return (
              <div
                key={index}
                className={`group rounded-xl border border-[#E9E2F8] dark:border-white/10 bg-white/92 dark:bg-card/20 backdrop-blur-md overflow-hidden hover:border-primary/35 hover:bg-white dark:hover:bg-card/30 transition-all duration-500 hover:-translate-y-2 flex flex-col min-h-[400px] md:min-h-[440px] shadow-[0_14px_36px_rgba(88,28,135,0.07)] hover:shadow-[0_20px_46px_rgba(168,85,247,0.16)] ${
                  isVisible ? "animate-fade-up opacity-100" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Se não houver imagem, não renderizar o bloco vazio para evitar que o card fique com aparência de quebrado/inacabado */}
                {data.image && (
                  <div className="h-32 sm:h-48 overflow-hidden relative shrink-0 bg-[#F8F5FF] dark:bg-black/20">
                    <img
                      src={data.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-white/5 to-transparent dark:from-black/30 dark:via-transparent dark:to-transparent z-10 pointer-events-none" />
                  </div>
                )}

                <div className="p-4 sm:p-5 flex flex-col flex-grow relative z-20">
                  <h3 className="text-lg font-bold mb-1.5 text-slate-900 dark:text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-slate-700 dark:text-slate-300 text-[15px] sm:text-base mb-4 leading-relaxed line-clamp-2 md:line-clamp-none">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {data.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-[#F7F4FF] dark:bg-white/5 border border-[#E7DFFC] dark:border-white/10 text-slate-600 dark:text-muted-foreground text-[10px] sm:text-xs font-medium hover:bg-primary/10 hover:border-primary/40 hover:text-primary dark:hover:bg-primary/20 dark:hover:border-primary/50 dark:hover:text-primary transition-all duration-300 cursor-default hover:shadow-[0_0_12px_rgba(168,85,247,0.25)] hover:-translate-y-0.5 ${
                          isVisible
                            ? "animate-fade-in opacity-100"
                            : "opacity-0"
                        }`}
                        style={{
                          animationDelay: `${index * 0.05 + tagIndex * 0.03}s`,
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E8E0FA] dark:via-white/10 to-transparent mb-4" />

                  <div className="flex flex-col sm:flex-row gap-3 pt-2 mt-auto w-full">
                    {data.github && (
                      <a
                        href={data.github}
                        target="_blank"
                        rel="noreferrer"
                        className={
                          data.live || data.inDevelopment
                            ? "flex-1 group/btn"
                            : "w-full group/btn"
                        }
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
                    )}

                    {(data.live || data.inDevelopment) && (
                      <a
                        href={data.live || "#"}
                        target={data.live ? "_blank" : undefined}
                        rel={data.live ? "noreferrer" : undefined}
                        className={
                          data.github ? "flex-1 group/btn" : "w-full group/btn"
                        }
                        onClick={(e) => {
                          if (!data.live) e.preventDefault();
                        }}
                      >
                        <Button className="w-full rounded-xl shadow-md shadow-primary/20 hover:shadow-primary/40 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 gap-2 h-10 text-sm font-medium">
                          <ExternalLink
                            size={16}
                            className="transition-transform duration-300 group-hover/btn:-translate-y-[1px] group-hover/btn:translate-x-[1px]"
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

export default Projects;
