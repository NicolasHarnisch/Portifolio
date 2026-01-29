import { Button } from "@/components/ui/button";
import { FileText, Github, Linkedin, Mail } from "lucide-react"; // 1. Import atualizado
import { useTypingEffect } from "@/hooks/useTypingEffect";

const Hero = () => {
  const { displayedText: typedRole, isComplete: roleComplete } = useTypingEffect({
    text: "Desenvolvedor Full Stack & Designer",
    speed: 60,
    delay: 800,
  });

  const links = {
    curriculo: "https://drive.google.com/file/d/1y6GDWAJMyIpAZW49UwM49GMbY5C0aiU8/view?usp=sharing",
    github: "https://github.com/NicolasHarnisch",
    linkedin: "https://www.linkedin.com/in/nicolasharnisch/",
    email: "mailto:nicolasgomeshar@gmail.com"
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-6">
      {/* Efeitos de fundo */}      
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(262 100% 71% / 0.3), transparent)"
        }}
      />
      
      {/* Floating orbs */}
      <div className="absolute top-20 right-1/4 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container relative z-10 pt-24 sm:pt-20 pb-12">
        <div className="max-w-4xl mx-auto text-center md:text-left md:mx-0">
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-4 sm:mb-6 animate-fade-up">
            Nícolas Gomes<br />
            <span className="text-gradient">Harnisch</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-foreground mb-4 animate-fade-up min-h-[1.75em] sm:min-h-[2em]" style={{ animationDelay: "0.1s" }}>
            {typedRole}
            {!roleComplete && <span className="inline-block w-0.5 h-5 sm:h-6 bg-primary ml-1 animate-pulse" />}
          </p>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mb-8 sm:mb-10 animate-fade-up mx-auto md:mx-0" style={{ animationDelay: "0.2s" }}>
            Estudante de Ciência da Computação (UFC) e Engenharia de Software (UniAteneu), focado em unir a base teórica sólida com a criação de interfaces modernas e funcionais.
          </p>
          
          {/* Container dos Botões */}
          <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-up mx-auto md:mx-0 w-full sm:w-auto justify-center md:justify-start" style={{ animationDelay: "0.4s" }}>
            
            {/* Botão Principal - Currículo */}
            <a 
              href={links.curriculo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button 
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/80 hover:brightness-110 transition-all duration-300 group shadow-lg shadow-primary/25 w-full sm:w-auto text-base"
              >
                {/* 2. Ícone de Arquivo com efeito de zoom */}
                <FileText className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Visualizar Currículo
              </Button>
            </a>

            {/* Botões Sociais */}
            <div className="flex gap-3">
              {[
                { icon: Github, href: links.github, label: "GitHub" },
                { icon: Linkedin, href: links.linkedin, label: "LinkedIn" },
                { icon: Mail, href: links.email, label: "Email" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 rounded-lg bg-background/50 border border-input transition-all duration-300 hover:bg-white hover:text-primary hover:-translate-y-1 shadow-sm"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;