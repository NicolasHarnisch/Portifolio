import { memo, useMemo } from "react";
import { Layout, Server, Settings, Database, Cpu } from "lucide-react";
import MotionTitle from "./MotionTitle";
import { useLanguage } from "@/contexts/LanguageContext";

const TechStack = () => {
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
            name: "Supabase",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
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
          {
            name: "Framer Motion",
            icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><defs><linearGradient id='fm' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23ff0080'/><stop offset='50%' stop-color='%23a855f7'/><stop offset='100%' stop-color='%230070f3'/></linearGradient></defs><path fill='url(%23fm)' d='M4 0h16v8h-8zm0 8h8l8 8H4zm0 8h8v8z'/></svg>",
          },
          {
            name: "Three.js",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
            invertInDarkMode: true,
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
      className="relative py-16 md:py-28 bg-transparent overflow-hidden px-4 sm:px-6"
    >
      <div className="container relative z-10">
        <div data-motion-heading className="motion-heading flex flex-row items-center gap-3 sm:gap-4 mb-8 md:mb-12 ml-1">
          <span data-motion-chapter className="motion-chapter" aria-hidden="true">04</span>
          <span data-motion-rule className="motion-heading-rule" aria-hidden="true" />
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
            <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>

          <div>
            <span className="text-xs sm:text-sm uppercase tracking-[0.22em] text-primary font-semibold block mb-1">
              {t.tech.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-foreground">
              <MotionTitle>{t.tech.title}</MotionTitle>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {skillsData.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              data-motion-item
              className="surface-card group p-4 md:p-6 rounded-xl sm:rounded-2xl hover:border-primary/30 transition-[background-color,border-color,box-shadow] duration-300 ease-out shadow-[0_12px_32px_rgba(88,28,135,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.22)] hover:shadow-[0_24px_60px_rgba(168,85,247,0.14)]"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 md:mb-6">
                <div className="p-2 sm:p-3 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 shrink-0">
                  {category.iconComp}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-foreground group-hover:text-primary transition-colors leading-tight">
                  {t.tech.categories[categoryIndex]}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group/skill flex items-center gap-1.5 md:gap-2 rounded-full border border-[#ECE4FB] dark:border-white/10 bg-[#FCFAFF] dark:bg-white/5 px-2.5 py-1.5 md:px-3 md:py-2 transition-colors duration-200 hover:border-primary/30 hover:bg-[#F7F1FF] dark:hover:bg-primary/[0.1] hover:shadow-[0_4px_16px_rgba(168,85,247,0.15)] active:scale-95"
                  >
                    <img
                      src={skill.icon}
                      alt=""
                      width={16}
                      height={16}
                      className={`h-4 w-4 object-contain flex-shrink-0 ${
                        skill.invertInDarkMode
                          ? "dark:invert dark:opacity-90"
                          : ""
                      }`}
                      loading="lazy"
                      decoding="async"
                    />
                    <p className="text-xs font-semibold text-slate-900 dark:text-white/80 group-hover/skill:text-primary transition-colors duration-300 whitespace-nowrap">
                      {skill.name}
                    </p>
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
