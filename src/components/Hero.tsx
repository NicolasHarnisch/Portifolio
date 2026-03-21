import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Componente isolado que faz a mágica de escrever, esperar 8s, apagar, e repetir
const TypewriterLoop = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const typeSpeed = 60; // Velocidade de escrever
    const deleteSpeed = 60; // "apague igual quando escreve" (mesma velocidade)
    const pauseTime = 8000; // 8 segundos de pausa quando o texto está completo

    if (!isDeleting && displayedText === text) {
      // Terminou de escrever: espera 8 segundos e começa a apagar
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayedText === "") {
      // Terminou de apagar: espera 1 segundinho e começa a escrever de novo
      timeout = setTimeout(() => setIsDeleting(false), 1000);
    } else {
      // Processo de escrever (adiciona 1 letra) ou apagar (tira 1 letra)
      const nextDelay = isDeleting ? deleteSpeed : typeSpeed;
      timeout = setTimeout(() => {
        setDisplayedText(
          text.substring(0, displayedText.length + (isDeleting ? -1 : 1))
        );
      }, nextDelay);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, text]);

  return (
    <>
      {displayedText}
      {/* O cursor piscando sempre visível ao final do texto */}
      <span className="inline-block w-[3px] h-[1em] bg-[#9b87f5] ml-1 animate-pulse" />
    </>
  );
};

const Hero = () => {
  const { t } = useLanguage();

  const links = {
    curriculo: "https://drive.google.com/file/d/1y6GDWAJMyIpAZW49UwM49GMbY5C0aiU8/view?usp=sharing",
    github: "https://github.com/NicolasHarnisch",
    linkedin: "https://www.linkedin.com/in/nicolasharnisch/",
    email: "mailto:nicolasgomeshar@gmail.com"
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-6">
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(262 100% 71% / 0.3), transparent)"
        }}
      />
      
      <div className="absolute top-20 right-1/4 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container relative z-10 pt-24 sm:pt-20 pb-12">
        <div className="max-w-4xl mx-auto text-center md:text-left md:mx-0">
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-4 sm:mb-6 animate-fade-up">
            Nícolas Gomes<br />
            <span className="text-gradient">Harnisch</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-foreground mb-4 animate-fade-up min-h-[1.75em] sm:min-h-[2em] flex items-center justify-center md:justify-start" style={{ animationDelay: "0.1s" }}>
            {/* Usando o nosso novo componente de looping */}
            <TypewriterLoop text={t.hero.role} />
          </p>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mb-8 sm:mb-10 animate-fade-up mx-auto md:mx-0" style={{ animationDelay: "0.2s" }}>
            {t.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-up mx-auto md:mx-0 w-full sm:w-auto justify-center md:justify-start" style={{ animationDelay: "0.4s" }}>
            
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
                <FileText className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                {t.hero.resumeBtn}
              </Button>
            </a>

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