import { Calendar, MapPin, Gamepad2, Palette, GraduationCap, Code2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// LISTA DAS MINHAS EXPERIÊNCIAS
const experiences = [
  {
    role: "Monitor Pedagógico e Desenvolvedor",
    company: "Projeto JOGA — UFC",
    period: "Outubro/2024 - Atualmente",
    description: "Atuo no desenvolvimento de cursos de programação com React Native e Node.js, aplicando técnicas de gamificação para suporte direto aos estudantes.",
    tags: ["React Native", "Node.js", "Gamificação", "Ensino"],
    icon: <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" /> 
  },
  {
    role: "Desenvolvedor Front-end (Voluntário)",
    company: "NERDS - Pesquisa e Inovação",
    period: "Setembro/2025 - Janeiro/2026",
    description: "Desenvolvimento de interfaces web interativas com Vue.js e JavaScript, com experiência em controle de versão com Git e colaboração em equipes multidisciplinares.",
    tags: ["Vue.js", "JavaScript", "Git", "Trabalho em Equipe"],
    icon: <Code2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
  },
  {
    role: "Design e Marketing",
    company: "SESCOMP UFC",
    period: "Abril/2025 - Setembro/2025",
    description: "Desenvolvimento de materiais gráficos para divulgação do evento em redes sociais e criação da identidade visual de palestras, workshops e peças de uso institucional.",
    tags: ["Design Gráfico", "Marketing", "Identidade Visual"],
    icon: <Palette className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
  },
  {
    role: "Design e Marketing",
    company: "Atlética Indomável — UFC",
    period: "Outubro/2024 - Agosto/2025",
    description: "Responsável pela elaboração da identidade visual de campanhas e criação de artes gráficas para materiais de eventos esportivos e sociais, visando o engajamento do público.",
    tags: ["Design", "Social Media", "Branding"],
    icon: <Palette className="h-5 w-5 sm:h-6 sm:w-6 text-primary" /> 
  }
];

const Experience = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24 relative overflow-hidden px-4 sm:px-6">
      <div 
        ref={ref}
        className={`container relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        
        {/* Titulo da seção */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-16 ml-1">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
            <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-primary font-semibold block mb-1">
              Trajetória
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Experiência Profissional
            </h2>
          </div>
        </div>

        <div className="relative border-l border-white/10 ml-2 sm:ml-4 md:ml-10 space-y-8 sm:space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-6 sm:pl-8 md:pl-12 group">
              <div className="absolute -left-[5px] top-0 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-primary border border-primary shadow-[0_0_10px_rgba(168,85,247,0.5)] group-hover:scale-150 transition-transform duration-300" />

              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card/5 border border-white/5 hover:border-white/10 hover:bg-card/10 transition-all duration-300">
                <div className="flex flex-col gap-4 mb-4">
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* --- CARD ICON PADRONIZADO --- */}
                    <div className="p-2 sm:p-3 rounded-lg bg-primary/10 border border-primary/20 w-fit h-fit shadow-[0_0_10px_rgba(168,85,247,0.15)]">
                      {exp.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-primary bg-primary/10 px-2 sm:px-3 py-1 rounded-full w-fit">
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                        {exp.company}
                      </div>

                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-muted-foreground group-hover:border-primary/20 group-hover:text-primary transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;