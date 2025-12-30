import ProjectCard from "./ProjectCard";

const projects = [
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
          <h2 className="text-3xl md:text-4xl font-bold">
            Projetos desenvolvidos
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
