import { Briefcase, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    title: "Monitor Pedagógico e Desenvolvedor",
    company: "Projeto JOGA — UFC",
    period: "Outubro/2024 - Atualmente",
    description: "Atuo no desenvolvimento de cursos de programação com React Native e Node.js, aplicando técnicas de gamificação para suporte direto aos estudantes.",
    skills: ["React Native", "Node.js", "Gamificação"]
  },
  {
    title: "Design e Marketing",
    company: "Atlética Indomável — UFC",
    period: "Outubro/2024 - Agosto/2025",
    description: "Responsável pela criação da identidade visual de campanhas e elaboração de artes gráficas para materiais de eventos esportivos e sociais.",
    skills: ["Design Gráfico", "Identidade Visual", "Figma"]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Título */}
          <div className="md:col-span-4">
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              Trajetória
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Experiência Acadêmica
            </h2>
          </div>

          {/* Lista de Experiências */}
          <div className="md:col-span-7 md:col-start-6 space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 md:pl-12 group">
                {/* Linha da timeline */}
                {index !== experiences.length - 1 && (
                  <div className="absolute left-[7px] md:left-[11px] top-8 bottom-0 w-[2px] bg-border/50 group-hover:bg-primary/30 transition-colors" />
                )}
                
                {/* Bolinha da timeline */}
                <div className="absolute left-0 top-0 w-4 h-4 md:w-6 md:h-6 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_rgba(168,85,247,0.4)] z-10" />

                {/* Cartão */}
                <div className="p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm group-hover:border-primary/30 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 h-fit w-fit">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        // MUDANÇA AQUI:
                        // Usei 'group-hover:' para que as tags mudem de cor quando você passar o mouse no CARTÃO inteiro.
                        className="bg-white/5 border border-white/10 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/50 transition-colors duration-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;