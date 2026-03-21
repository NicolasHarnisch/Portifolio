import { Layout, Server, Settings, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

// Lista apenas com as tecnologias fixas (o nível vai ser traduzido dinamicamente)
const skillsData = [
  {
    iconComp: <Server className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    skills: [
      { name: "Node.js", baseLevel: "intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "Java", baseLevel: "advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
      { name: "Spring Boot", baseLevel: "basic", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
      { name: "JUnit (Testes)", baseLevel: "intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
      { name: "Python", baseLevel: "advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "C / C++", baseLevel: "intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
      { name: "MongoDB", baseLevel: "advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
      { name: "SQL", baseLevel: "intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
    ],
  },
  {
    iconComp: <Layout className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    skills: [
      { name: "React.js", baseLevel: "basic", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Vue.js", baseLevel: "intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg"},
      { name: "Next.js", baseLevel: "intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", invertInDarkMode: true },
      { name: "React Native", baseLevel: "basic", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "HTML5", baseLevel: "advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
      { name: "CSS3", baseLevel: "advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
      { name: "Tailwind CSS", baseLevel: "basic", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "TypeScript", baseLevel: "intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { name: "JavaScript", baseLevel: "advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    ],
  },
  {
    iconComp: <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    skills: [
      { name: "Git", baseLevel: "advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "GitHub", baseLevel: "advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", invertInDarkMode: true },
      { name: "IntelliJ IDEA", baseLevel: "intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg" },
      { name: "Apidog", baseLevel: "advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg" },
      { name: "Figma", baseLevel: "advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
      { name: "Vercel", baseLevel: "advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg", invertInDarkMode: true },
      { name: "Inglês", baseLevel: "intermediate", icon: "https://cdn-icons-png.flaticon.com/512/197/197484.png" },
    ],
  },
];

const TechStack = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { t } = useLanguage();

  return (
    <section id="stack" className="py-20 md:py-28 bg-card/5 relative overflow-hidden px-4 sm:px-6">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div
        ref={ref}
        className={`container relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* TÍTULO */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-12 ml-1">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
            <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-primary font-semibold block mb-1">
              {t.tech.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              {t.tech.title}
            </h2>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillsData.map((category, index) => (
            <div
              key={index}
              className="group p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/5 bg-card/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Cabeçalho */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="p-2 sm:p-3 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 shrink-0">
                  {category.iconComp}
                </div>

                <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">
                  {t.tech.categories[index]}
                </h3>
              </div>

              {/* Lista de Skills */}
              <div className="grid gap-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group/skill rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.05] hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.18)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate transition-colors duration-300 group-hover/skill:text-primary">
                          {skill.name}
                        </p>

                        <Badge
                          variant="secondary"
                          className={`inline-flex mt-2 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all duration-300
                            ${
                              skill.baseLevel === "advanced"
                                ? "bg-green-500/10 text-green-400 border-green-500/15 group-hover/skill:bg-green-500/15"
                                : skill.baseLevel === "intermediate"
                                ? "bg-primary/10 text-primary border-primary/20 group-hover/skill:border-primary/40"
                                : "bg-white/5 text-muted-foreground border-white/10 group-hover/skill:text-primary group-hover/skill:border-primary/20"
                            }`}
                        >
                          {t.tech.levels[skill.baseLevel as keyof typeof t.tech.levels]}
                        </Badge>
                      </div>

                      <div className="shrink-0 transition-transform duration-300 group-hover/skill:scale-110 group-hover/skill:-rotate-3">
                        <img
                          src={skill.icon}
                          alt={`${skill.name} icon`}
                          className={`h-7 w-7 sm:h-8 sm:w-8 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.08)] ${
                            skill.invertInDarkMode ? "invert opacity-90" : ""
                          }`}
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

export default TechStack;