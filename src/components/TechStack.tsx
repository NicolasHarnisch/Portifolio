import { Layout, Server, Settings, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const stack = [
  {
    title: "Frontend",
    icon: <Layout className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    description: "Criação de interfaces responsivas e interativas.",
    skills: ["JavaScript", "TypeScript", "React.js", "Vue.js", "HTML5", "CSS3"]
  },
  {
    title: "Backend",
    icon: <Server className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    description: "Lógica de servidor robusta e escalável.",
    skills: ["Node.js", "Java", "Python", "C", "C++"]
  },
  {
    title: "Ferramentas",
    icon: <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    description: "DevOps e utilitários para produtividade.",
    skills: ["Git", "GitHub", "Figma", "Apidog"]
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
        
        {/* --- TÍTULO PADRONIZADO (Alinhado à Esquerda) --- */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-16 ml-1">
          {/* Ícone Principal da Seção */}
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

        {/* --- GRID DE CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {stack.map((category, index) => (
            <div 
              key={index}
              className="group p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/5 bg-card/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Cabeçalho do Card */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                
                {/* Ícone Interno Padronizado (Caixinha Roxa Neon) */}
                <div className="p-2 sm:p-3 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300">
                  {category.icon}
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
              </div>

              {/* Lista de Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary"
                    className="bg-white/5 border border-white/10 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/50 transition-colors duration-300 cursor-default text-xs sm:text-sm"
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