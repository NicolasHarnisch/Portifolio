import { Layout, Server, Settings, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// LISTA DE TECNOLOGIAS
const stack = [
  {
    title: "Back-end & Arquitetura",
    icon: <Server className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    skills: ["Node.js", "Java", "Spring Boot", "Python", "C", "SQL", "MVC"]
  },
  {
    title: "Frontend & Mobile",
    icon: <Layout className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    skills: ["React.js", "Next.js", "React Native","HTML5/CSS3", "TypeScript", "JavaScript"]
  },
  {
    title: "Ferramentas & DevOps",
    icon: <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    skills: ["Git", "GitHub", "IntelliJ IDEA", "Apidog", "Figma", "Vercel"]
  }
];

const TechStack = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="stack" className="py-16 sm:py-20 md:py-24 bg-card/5 relative overflow-hidden px-4 sm:px-6">
      {/* Background Decorativo Sutil */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div 
        ref={ref}
        className={`container relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        
        {/* --- TÍTULO --- */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-16 ml-1">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
            <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-primary font-semibold block mb-1">
              Tecnologias
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Minha Stack Tecnológica
            </h2>
          </div>
        </div>

        {/* --- GRID DE 3 COLUNAS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stack.map((category, index) => (
            <div 
              key={index}
              className="group p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/5 bg-card/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Cabeçalho do Card */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="p-2 sm:p-3 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 shrink-0">
                  {category.icon}
                </div>
                
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">
                  {category.title}
                </h3>
              </div>

              {/* Lista de Skills */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {category.skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary"
                    // AQUI A MUDANÇA: text-sm (maior) e px-3 py-1 (mais espaçamento)
                    className="bg-white/5 border border-white/10 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/50 transition-colors duration-300 cursor-default text-sm px-3 py-1"
                  >
                    {skill}
                  </Badge>
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