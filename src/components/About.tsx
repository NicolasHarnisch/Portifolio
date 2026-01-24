import { User } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 relative overflow-hidden px-4 sm:px-6">
      <div 
        ref={ref}
        className={`container relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        
        {/* Cabeçalho com ícone e títulos */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12 ml-1">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
            <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-primary font-semibold block mb-1">
              Sobre mim
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Quem sou
            </h2>
          </div>
        </div>

        <div className="relative group rounded-2xl sm:rounded-[2rem] border border-white/10 bg-card/20 backdrop-blur-md shadow-2xl p-4 sm:p-6 md:p-8 overflow-hidden">
          
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 items-center">
            
            {/* MINHA FOTO */}
            <div className="w-full md:w-4/12 max-w-[280px] sm:max-w-sm shrink-0 relative group/photo">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white/5 shadow-lg transform transition-transform duration-500 group-hover/photo:scale-[1.02]">
                <img 
                  src="/minha-foto.jpeg" 
                  alt="Nícolas Gomes Harnisch" 
                  className="w-full aspect-[3/4] object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />
              </div>
            </div>

            <div className="w-full md:w-8/12 space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight text-foreground/90 text-center md:text-left">
                Transformo ideias em experiências digitais
              </h3>
              
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Busco excelência técnica não apenas para desenvolver sistemas, mas para criar soluções que ampliem a visão do usuário através de <span className="text-gradient font-semibold">criatividade e tecnologia</span>. Atualmente, divido minha rotina entre a graduação na <span className="text-gradient font-semibold">Universidade Federal do Ceará</span> (Campus Russas) e na <span className="text-gradient font-semibold">UniAteneu</span>, o que me proporciona uma visão ampla de arquitetura e desenvolvimento de software.
              </p>
              
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Minha trajetória é fortalecida pela atuação em <span className="text-gradient font-semibold">projetos de extensão universitária</span>, onde uno tecnologia e educação. No desenvolvimento, direciono essa dedicação para o Back-end e a Arquitetura de Software, projetando sistemas que vão além da funcionalidade: busco soluções robustas, escaláveis e fundamentadas em código limpo e decisões técnicas sustentáveis.
              </p>
              
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Fora das telas de código, trago a experiência em <span className="text-gradient font-semibold">design gráfico</span> para garantir que a usabilidade e a estética caminhem juntas em cada projeto.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;