import { Code2, Server, Wrench } from "lucide-react";

const techCategories = [
  {
    icon: Code2,
    title: "Frontend",
    techs: ["JavaScript", "TypeScript", "HTML5", "CSS3", "React.js", "Vue.js"],
  },
  {
    icon: Server,
    title: "Backend",
    techs: ["C", "C++", "Python", "Java", "POO"],
  },
  {
    icon: Wrench,
    title: "Ferramentas",
    techs: ["Git", "GitHub", "Figma", "Prettier"],
  },
];

const TechStack = () => {
  return (
    <section id="stack" className="py-24 relative">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse 50% 50% at 50% 50%, hsl(262 100% 71% / 0.15), transparent)"
        }}
      />
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-widest text-muted-foreground">
            Tecnologias
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Minha Stack Tecnológica
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Trabalho com ferramentas modernas para entregar performance e design
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {techCategories.map((category) => (
            <div 
              key={category.title}
              className="p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.techs.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1.5 text-sm rounded-full border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                  >
                    {tech}
                  </span>
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
