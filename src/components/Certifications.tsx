import { Award, BookOpen, Shield, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// LISTA DOS MEUS CURSOS (Adicionar ou remover aqui)
const certificates = [
  {
    name: "Java Completo: Programação Orientada a Objetos",
    platform: "Udemy (Nelio Alves)",
    date: "Em andamento",
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    skills: ["Java 17+", "Spring Boot", "JPA/Hibernate", "POO Avançada"],
    status: "in-progress"
  },
  {
    name: "Introduction to Cybersecurity",
    platform: "Cisco Networking Academy",
    date: "Set 2024",
    icon: <Shield className="h-6 w-6 text-primary" />,
    skills: ["Segurança de Redes", "Proteção de Dados", "Ameaças Cibernéticas"],
    status: "completed"
  },
  {
    name: "Networking Basics",
    platform: "Cisco Networking Academy",
    date: "Out 2024",
    icon: <Globe className="h-6 w-6 text-primary" />,
    skills: ["Protocolos de Rede", "TCP/IP", "Infraestrutura"],
    status: "completed"
  },
  {
    name: "Desenvolvimento de Software 2.0",
    platform: "LearningLab",
    date: "Dez 2024",
    icon: <Award className="h-6 w-6 text-primary" />,
    skills: ["Engenharia de Software", "Qualidade de Código"],
    status: "completed"
  },
  {
    name: "Desenvolvimento Web com HTML5",
    platform: "IFRS",
    date: "Out 2024",
    icon: <Award className="h-6 w-6 text-primary" />,
    skills: ["HTML5", "Semântica Web", "Acessibilidade"],
    status: "completed"
  }
];

const Certifications = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      id="certifications" 
      ref={ref}
      className={`py-16 sm:py-24 relative overflow-hidden bg-card/5 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container relative z-10 px-4 sm:px-6">
        
        {/* Titulo da seção */}
        <div className="mb-12 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
              <Award className="h-6 w-6 text-primary" />
            </div>
            
            <div>
              <span className="text-sm uppercase tracking-widest text-primary font-semibold block mb-1">
                Aperfeiçoamento
              </span>
              
              <h2 className="text-2xl sm:text-3xl font-bold">Certificações & Estudos</h2>
            </div>
          </div>
        </div>

        {/* Loop dos certificados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div 
              key={index}
              className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                cert.status === 'in-progress' 
                  ? 'bg-primary/5 border-primary/20 hover:border-primary/50' 
                  : 'bg-card border-white/5 hover:border-white/10 hover:bg-card/50'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms"
              }}
            >
              <div className="flex justify-between items-start mb-4">
                
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.15)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300">
                  {cert.icon}
                </div>

                {cert.status === 'in-progress' && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    Cursando
                  </Badge>
                )}
              </div>

              <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                {cert.name}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                {cert.platform} • {cert.date}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {cert.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-[10px] px-2 py-0.5 border-white/10 text-muted-foreground group-hover:text-primary group-hover:border-primary/20 transition-colors">
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

export default Certifications;
