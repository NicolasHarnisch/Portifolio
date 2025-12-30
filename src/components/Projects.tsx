import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "EA4 Mobilidade",
    description: "Gestão inteligente de transporte corporativo para empresas.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: ["Design", "Programação"],
  },
  {
    title: "Box299",
    description: "Serviços especializados de estética automotiva premium.",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop",
    tags: ["Design", "Programação"],
  },
  {
    title: "WP Builders",
    description: "Gestão completa e organizada de projetos de reforma.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    tags: ["Design", "Programação"],
  },
  {
    title: "Tecnousp",
    description: "Serviços ágeis de manutenção em residências e condomínios.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    tags: ["Design", "Programação"],
  },
  {
    title: "Hair Skin",
    description: "Produto físico inovador de beleza para cuidados capilares.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop",
    tags: ["Design", "Programação"],
  },
  {
    title: "Riqueza Planejada",
    description: "Infoproduto sobre estabilidade e educação financeira.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop",
    tags: ["Design", "Programação"],
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
            Clientes reais
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
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
