import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import logoIcon from "@/assets/icon.svg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(262 100% 71% / 0.3), transparent)"
        }}
      />
      
      {/* Floating orbs */}
      <div className="absolute top-20 right-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container relative z-10 pt-20 pb-12">

        <div className="max-w-4xl mx-auto text-center md:text-left md:mx-0">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6 animate-fade-up">
            Nícolas Gomes<br />
            <span className="text-gradient">Harnisch</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-medium text-foreground mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Desenvolvedor Full Stack & Designer
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Estudante de Ciência da Computação (UFC) e Engenharia de Software (UniAteneu), focado em unir a base teórica sólida com a criação de interfaces modernas e funcionais.
          </p>
          
          <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <a 
              href="/curriculo.pdf"
              download="Nicolas-Gomes-Harnisch-Curriculo.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/80 hover:brightness-75 transition-all duration-300 group shadow-lg shadow-primary/20"
              >
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Baixar currículo
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;