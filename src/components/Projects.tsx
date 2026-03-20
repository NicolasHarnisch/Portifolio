import { Github, ExternalLink, Folder, Rocket } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// LISTA DOS MEUS PROJETOS
const projects = [
  {
    title: "Sistema de Triagem",
    description:
      "Sistema Desktop desenvolvido em Java Swing utilizando o Protocolo de Manchester para classificar pacientes e gerenciar filas de prioridade automaticamente.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
    tags: ["Java", "Swing", "JUnit 5", "MVC"],
    github: "https://github.com/NicolasHarnisch/sistema-triagem-hospitalar",
    live: "",
  },
  {
    title: "Aerofix",
    description:
      "Aplicação desenvolvida em C++ que simula um sistema de reserva de lugares, oferecendo uma experiência imersiva e intuitiva.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop",
    tags: ["Backend", "C++", "Algoritmos"],
    github: "https://github.com/NicolasHarnisch/Aerofix-backend-project.git",
    live: "",
  },
  {
    title: "Engremaq-Web",
    description:
      "Projeto de desenvolvimento web focado na criação de um site simulado de comércio eletrônico de peças de tratores.",
    image: "/Engremaq-Web.png",
    tags: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/NicolasHarnisch/Engremaq-web-project.git",
    live: "https://engremaq-web-project.vercel.app/index.html",
  },
];

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="projects"
      className="py-20 md:py-28 relative overflow-hidden px-4 sm:px-6"
    >
      <div
        ref={ref}
        className={`container relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Titulo da seção */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-12 ml-1">
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

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-20">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group rounded-[1.5rem] border border-white/10 bg-card/20 backdrop-blur-md overflow-hidden hover:border-primary/40 hover:bg-card/30 transition-all duration-500 hover:-translate-y-2 flex flex-col min-h-[520px] shadow-lg hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)]"
            >
              {/* Container da Imagem */}
              <div className="h-52 sm:h-60 overflow-hidden relative shrink-0 bg-black/60">
                {project.image ? (
                  project.title === "Engremaq-Web" ? (
                    <div className="absolute inset-0 z-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full relative z-0 ${
                          project.title === "Engremaq-Web"
                            ? "object-cover object-top scale-[1.0]"
                            : "object-cover object-top"
                        }`}
                      />
                    </div>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top relative z-0"
                    />
                  )
                ) : (
                  <div className="w-full h-full bg-card/30 flex items-center justify-center relative z-0">
                    <Folder className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent z-10 pointer-events-none opacity-90" />
              </div>

              {/* Conteúdo */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow relative z-20">
                <h3 className="text-lg sm:text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground text-xs font-medium hover:bg-primary/20 hover:text-primary hover:border-primary/40 transition-colors duration-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Linha elegante */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                {/* Botões */}
                <div className="flex gap-3 pt-2 mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className={project.live ? "flex-1 group/btn" : "w-full group/btn"}
                  >
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-white/10 bg-transparent text-white
                                 hover:bg-white hover:text-black hover:border-white
                                 transition-all duration-300 gap-2 h-10 text-sm font-medium"
                    >
                      <Github
                        size={16}
                        className="opacity-90 transition-all duration-300 group-hover/btn:opacity-100 group-hover/btn:-translate-y-[1px]"
                      />
                      Code
                    </Button>
                  </a>

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 group/btn"
                    >
                      <Button
                        className="w-full rounded-xl bg-primary/10 text-primary border border-primary/20
                                   hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]
                                   transition-all duration-300 gap-2 h-10 text-sm font-medium"
                      >
                        <ExternalLink
                          size={16}
                          className="opacity-90 transition-all duration-300 group-hover/btn:opacity-100 group-hover/btn:-translate-y-[1px] group-hover/btn:translate-x-[1px]"
                        />
                        Ver projeto
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