import { Code2, Database, Wrench, Layout, Server, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stack = [
  {
    title: "Frontend",
    icon: <Layout className="h-6 w-6 text-primary" />,
    description: "Criação de interfaces responsivas e interativas.",
    skills: ["JavaScript", "TypeScript", "React.js", "Vue.js", "HTML5", "CSS3"]
  },
  {
    title: "Backend",
    icon: <Server className="h-6 w-6 text-primary" />,
    description: "Lógica de servidor robusta e escalável.",
    skills: ["Node.js", "Java", "Python", "C", "C++"]
  },
  {
    title: "Ferramentas",
    icon: <Settings className="h-6 w-6 text-primary" />,
    description: "DevOps e utilitários para produtividade.",
    skills: ["Git", "GitHub", "Figma", "Apidog"]
  }
];

const TechStack = () => {
  return (
    <section id="stack" className="py-24 bg-card/5 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-sm uppercase tracking-widest text-muted-foreground">
            Tecnologias
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Minha Stack Tecnológica
          </h2>
          <p className="text-muted-foreground">
            Trabalho com ferramentas modernas para entregar performance e design de alta qualidade em cada projeto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stack.map((category, index) => (
            <div 
              key={index}
              // Adicionei 'group' aqui para controlar o hover dos filhos
              className="group p-8 rounded-2xl border border-white/5 bg-card/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Cabeçalho do Card */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
              </div>

              {/* Lista de Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary"
                    // MUDANÇA AQUI:
                    // Adicionei os 'group-hover' para acenderem quando o mouse estiver no card
                    className="bg-white/5 border border-white/10 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/50 transition-colors duration-300 cursor-default"
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