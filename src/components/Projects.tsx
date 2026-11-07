import { ArrowUpRight, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { projectData } from "@/data/projects";
import MotionTitle from "./MotionTitle";
import MotionRibbon from "./MotionRibbon";

const Projects = () => {
  const { t } = useLanguage();

  return (
    <section
      id="projects"
      className="py-20 md:py-28 relative px-4 sm:px-6"
    >
      <MotionRibbon />
      <div className="container relative z-10">
        <div data-motion-heading className="motion-heading project-title-area flex flex-row items-center gap-3 sm:gap-4 mb-8 sm:mb-12 ml-1">
          <span data-motion-chapter className="motion-chapter" aria-hidden="true">01</span>
          <span data-motion-rule className="motion-heading-rule" aria-hidden="true" />
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
            <Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <span className="text-xs sm:text-sm uppercase tracking-[0.22em] text-primary font-semibold block mb-1">
              {t.projects.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-foreground">
              <MotionTitle>{t.projects.title}</MotionTitle>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-20">
          {t.projects.items.map((project) => {
            const data = projectData.find(item => item.id === project.id);
            if (!data) return null;

            return (
              <Link
                key={project.id}
                data-motion-card
                to={`/projects/${project.id}`}
                data-project-id={project.id}
                className="block h-full rounded-xl group"
                aria-label={`${t.projects.detailsBtn}: ${project.title}`}
              >
                <div className="surface-card project-card rounded-xl overflow-hidden flex flex-col h-full min-h-[400px] md:min-h-[440px] shadow-[0_14px_36px_rgba(88,28,135,0.07)]">
                  {/* Se não houver imagem, não renderizar o bloco vazio para evitar que o card fique com aparência de quebrado/inacabado */}
                  {data.image && (
                    <div className="h-32 sm:h-48 overflow-hidden relative shrink-0 bg-[#F8F5FF] dark:bg-white/[0.02]">
                      <img
                        data-motion-image
                        src={data.image}
                        width={data.width}
                        height={data.height}
                        decoding="async"
                        alt=""
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t dark:from-black/30 dark:via-transparent dark:to-transparent z-10 pointer-events-none" />
                      {data.inDevelopment && <span className="absolute right-3 top-3 z-20 rounded-full border border-primary/30 bg-[#160f28]/90 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">{t.projects.inDevelopment}</span>}
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
                      {data.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-[#F7F4FF] dark:bg-white/5 border border-[#E7DFFC] dark:border-white/10 text-slate-600 dark:text-muted-foreground text-[10px] sm:text-xs font-medium hover:bg-primary/10 hover:border-primary/40 hover:text-primary dark:hover:bg-primary/20 dark:hover:border-primary/50 dark:hover:text-primary transition-all duration-300 cursor-default hover:shadow-[0_0_12px_rgba(168,85,247,0.25)] hover:-translate-y-0.5"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E8E0FA] dark:via-white/10 to-transparent mb-4" />

                    <div className="flex items-center justify-between gap-3 pt-2 text-sm font-semibold text-primary">
                      <span>{t.projects.detailsBtn}</span>
                      <ArrowUpRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
