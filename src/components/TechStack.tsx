import { memo, useMemo } from "react";
import { Layout, Server, Settings, Database, Cpu } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

const TechStack = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { t } = useLanguage();

  // useMemo para estabilizar os dados de habilidades e evitar recriação de elementos JSX
  const skillsData = useMemo(
    () => [
      {
        iconComp: <Server className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
        skills: [
          {
            name: "Java",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
          },
          {
            name: "Python",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
          },
          {
            name: "C / C++",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
          },
          {
            name: "JavaScript",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
          },
          {
            name: "Spring Boot",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
          },
          {
            name: "FastAPI",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
          },
          {
            name: "Node.js",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
          },
        ],
      },
      {
        iconComp: <Database className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
        skills: [
          {
            name: "PostgreSQL",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
          },
          {
            name: "MySQL",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
          },
          {
            name: "MongoDB",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
          },
          {
            name: "Prisma",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
            invertInDarkMode: true,
          },
          {
            name: "Redis",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
          },
          {
            name: "Docker",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
          },
        ],
      },
      {
        iconComp: <Layout className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
        skills: [
          {
            name: "TypeScript",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
          },
          {
            name: "JavaScript",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
          },
          {
            name: "Tailwind CSS",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
          },
          {
            name: "Next.js",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
            invertInDarkMode: true,
          },
          {
            name: "React.js",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
          },
          {
            name: "React Native",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
          },
          {
            name: "Vue.js",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
          },
        ],
      },
      {
        iconComp: <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
        skills: [
          {
            name: "Git",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
          },
          {
            name: "Postman",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
          },
          {
            name: "Figma",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
          },
          {
            name: "Vercel",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
            invertInDarkMode: true,
          },
        ],
      },
    ],
    [],
  );

  return (
    <section
      id="stack"
      className="relative py-20 md:py-28 bg-transparent overflow-hidden px-4 sm:px-6"
    >
      <div
        ref={ref}
        className={`container relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-12 ml-1">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
            <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>

          <div>
            <span className="text-xs sm:text-sm uppercase tracking-[0.22em] text-primary font-semibold block mb-1">
              {t.tech.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-foreground">
              {t.tech.title}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`group p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-[#E9E2F8] dark:border-white/5 bg-white/85 dark:bg-[#08070b]/90 backdrop-blur-md hover:border-primary/30 dark:hover:bg-[#0d0c12] transition-all duration-700 ease-out shadow-[0_12px_32px_rgba(88,28,135,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.22)] hover:shadow-[0_24px_60px_rgba(168,85,247,0.14)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${categoryIndex * 50}ms` }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="p-2 sm:p-3 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 shrink-0">
                  {category.iconComp}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-foreground group-hover:text-primary transition-colors leading-tight">
                  {t.tech.categories[categoryIndex]}
                </h3>
              </div>

              <div className="grid gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className={`group/skill rounded-xl border border-[#ECE4FB] dark:border-white/10 bg-[#FCFAFF] dark:bg-[#110f1a]/60 px-4 py-3 transition-all duration-500 ease-out hover:border-primary/25 hover:bg-[#F7F1FF] dark:hover:bg-primary/[0.1] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(168,85,247,0.10)] ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                    style={{
                      transitionDelay: `${categoryIndex * 50 + skillIndex * 20}ms`,
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate transition-colors duration-300 group-hover/skill:text-primary">
                          {skill.name}
                        </p>
                      </div>

                      <div className="shrink-0 transition-transform duration-300 group-hover/skill:scale-110 group-hover/skill:-rotate-3">
                        <img
                          src={skill.icon}
                          alt={`${skill.name} icon`}
                          className={`h-7 w-7 sm:h-8 sm:w-8 object-contain ${
                            skill.invertInDarkMode
                              ? "dark:invert dark:opacity-90"
                              : ""
                          }`}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(TechStack);
