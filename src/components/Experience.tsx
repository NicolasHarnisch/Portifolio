import {
  Calendar,
  MapPin,
  Gamepad2,
  Palette,
  GraduationCap,
  Code2,
  BookOpen,
  Building2,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

const Experience = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { t } = useLanguage();

  const jobIcons = [
    <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    <Code2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    <Code2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    <Palette className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
  ];

  const eduIcons = [
    <GraduationCap className="h-5 w-5 text-primary" />,
    <BookOpen className="h-5 w-5 text-primary" />,
  ];

  return (
    <section
      id="experience"
      className="py-16 sm:py-20 md:py-24 relative overflow-hidden px-4 sm:px-6"
    >
      <div
        ref={ref}
        className={`container relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-16 ml-1">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
            <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <span className="text-xs sm:text-sm uppercase tracking-[0.22em] text-primary font-semibold block mb-1">
              {t.experience.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-foreground">
              {t.experience.title}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-10">
          <div className="xl:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-foreground">
                {t.experience.profTitle}
              </h3>
            </div>

            <div className="relative border-l border-[#E8E0FA] dark:border-white/10 ml-2 sm:ml-4 space-y-8 sm:space-y-10">
              {t.experience.jobs.map((exp, index) => (
                <div key={index} className="relative pl-6 sm:pl-8 md:pl-10 group">
                  <div className="absolute -left-[6px] top-1 h-3 w-3 rounded-full bg-primary border border-primary shadow-[0_0_12px_rgba(168,85,247,0.45)] group-hover:scale-125 transition-transform duration-300" />

                  <div className="rounded-2xl bg-white/95 dark:bg-[#08070b]/90 backdrop-blur-xl border border-[#E9E2F8] dark:border-white/10 hover:border-primary/30 dark:hover:bg-[#0d0c12] transition-all duration-500 p-5 sm:p-6 shadow-[0_18px_50px_rgba(88,28,135,0.08)] hover:shadow-[0_24px_60px_rgba(168,85,247,0.14)]">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit h-fit shadow-[0_0_10px_rgba(168,85,247,0.15)] shrink-0">
                        {jobIcons[index]}
                      </div>

                      <div className="flex-1">
                        <h4 className="text-lg sm:text-xl font-bold mb-2 text-slate-900 dark:text-foreground group-hover:text-primary transition-colors duration-300">
                          {exp.role}
                        </h4>

                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/15">
                            <Calendar className="h-3 w-3" />
                            {exp.period}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4" />
                          {exp.company}
                        </div>

                        <p className="text-sm sm:text-base text-slate-600 dark:text-muted-foreground leading-relaxed mb-5">
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-[#F7F4FF] dark:bg-white/5 border border-[#E7DFFC] dark:border-white/10 text-slate-600 dark:text-muted-foreground hover:bg-primary/10 hover:border-primary/40 hover:text-primary dark:hover:bg-primary/20 dark:hover:border-primary/50 dark:hover:text-primary transition-all duration-300 cursor-default hover:shadow-[0_0_12px_rgba(168,85,247,0.25)] hover:-translate-y-0.5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-foreground">
                {t.experience.acadTitle}
              </h3>
            </div>

            <div className="space-y-4">
              {t.experience.education.map((item, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-[#E9E2F8] dark:border-white/10 bg-white/95 dark:bg-[#08070b]/90 backdrop-blur-xl hover:border-primary/30 dark:hover:bg-[#0d0c12] transition-all duration-500 p-5 sm:p-6 shadow-[0_18px_50px_rgba(88,28,135,0.08)] hover:shadow-[0_24px_60px_rgba(168,85,247,0.14)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                      {eduIcons[index]}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4 className="text-lg font-bold leading-tight text-slate-900 dark:text-foreground group-hover:text-primary transition-colors duration-300">
                          {item.course}
                        </h4>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 border border-primary/20 text-primary">
                          {item.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-muted-foreground mb-3">
                        <span>{item.institution}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {item.period}
                        </span>
                      </div>

                      <p className="text-sm sm:text-[15px] text-slate-600 dark:text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;