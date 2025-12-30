import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Projeto JOGA — UFC",
    description: "Desenvolvimento de curso completo de jogos educacionais utilizando React Native e Node.js. Apliquei técnicas de gamificação para criar uma experiência interativa e ofereci suporte direto aos estudantes como monitor pedagógico.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop",
    tags: ["React Native", "Node.js", "Gamificação"],
  },
  {
    title: "NERDS — UFC",
    description: "No Núcleo de Reengenharia e Desenvolvimento de Software, foco na criação de interfaces web interativas utilizando Vue.js e JavaScript. Trabalho em equipes multidisciplinares com controle de versão rigoroso via Git.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    tags: ["Vue.js", "JavaScript", "Git"],
  },
  {
    title: "SESCOMP & Atlética Indomável",
    description: "Responsável pela identidade visual de grandes eventos acadêmicos, como a SESCOMP UFC, desenvolvendo materiais para redes sociais, workshops e peças institucionais que visam o engajamento e a presença digital de marca.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
    tags: ["Design", "Marketing"],
  },
  {
    title: "Aerofix",
    description: "Aplicação desenvolvida em C++ que simula um sistema de reserva de lugares, oferecendo uma experiência imersiva e intuitiva.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop",
    tags: ["Backend", "C++"],
  },
  {
    title: "Engremaq-web",
    description: "Projeto de desenvolvimento web focado na criação de um site simulado de comércio eletrônico de peças de tratores, aplicando HTML, CSS e JavaScript.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    tags: ["Web", "HTML/CSS/JS"],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 100%, hsl(262 100% 71% / 0.1), transparent)"
        }}
      />
      
      <div className="container relative z-10">
        <div className="mb-12">
          <span className="text-sm uppercase tracking-widest text-muted-foreground">
            Projetos & Experiências
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            O que já desenvolvi
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
