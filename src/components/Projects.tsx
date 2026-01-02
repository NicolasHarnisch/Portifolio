import { Github, ExternalLink, Folder, Rocket } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge"; 
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// LISTA DOS MEUS PROJETOS (Adicionar novos aqui)
const projects = [
  {
    title: "Aerofix",
    description: "Aplicação desenvolvida em C++ que simula um sistema de reserva de lugares, oferecendo uma experiência imersiva e intuitiva.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop",
    tags: ["Backend", "C++", "Algoritmos"],
    github: "https://github.com/NicolasHarnisch/Aerofix-backend-project.git", 
    live: "" 
  },
  {
    title: "Engremaq-web",
    description: "Projeto de desenvolvimento web focado na criação de um site simulado de comércio eletrônico de peças de tratores.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    tags: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/NicolasHarnisch/Engremaq-web-project.git",
    live: ""
  },
];

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 relative overflow-hidden px-4 sm:px-6">
      <div 
        ref={ref}
        className={`container relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        
        {/* Titulo da seção */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12 ml-1">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
            <Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-primary font-semibold block mb-1">
              Portfólio
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              O que já desenvolvi
            </h2>
          </div>
        </div>

        {/* Loop que cria os cards automaticamente */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group rounded-xl sm:rounded-2xl border border-white/10 bg-card/10 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 flex flex-col"
            >
              {/* Container da Imagem */}
              <div className="h-40 sm:h-48 overflow-hidden relative shrink-0 bg-black">
                
                {project.image ? (
                   <img 
                   src={project.image} 
                   alt={project.title} 
                   className="w-full h-full object-cover relative z-0"
                 />
                ) : (
                  <div className="w-full h-full bg-card/30 flex items-center justify-center relative z-0">
                    <Folder className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none" />
              </div>

              {/* Conteúdo */}
              <div className="p-4 sm:p-6 flex flex-col flex-grow relative z-20">
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6 mt-auto">
                  {project.tags.map((tag) => (
                    <Badge
                        key={tag} 
                        variant="secondary"
                        className="bg-white/5 border border-white/10 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/50 transition-colors duration-300 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Botões */}
                <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-white/5">
                  <a href={project.github} target="_blank" className="flex-1 group/btn">
                    <Button 
                      variant="outline" 
                      className="w-full border-white/10 bg-transparent text-white
                                 hover:bg-white hover:text-black hover:border-white
                                 transition-all duration-300 gap-2 h-8 sm:h-9 text-xs sm:text-sm font-medium"
                    >
                      <Github size={14} className="sm:w-4 sm:h-4 transition-transform group-hover/btn:scale-110" />
                      Code
                    </Button>
                  </a>

                  {project.live && (
                    <a href={project.live} target="_blank" className="flex-1 group/btn">
                        <Button 
                        className="w-full bg-primary/10 text-primary border border-primary/20
                                   hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]
                                   transition-all duration-300 gap-2 h-8 sm:h-9 text-xs sm:text-sm font-medium"
                        >
                        <ExternalLink size={14} className="sm:w-4 sm:h-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                        Live
                        </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;