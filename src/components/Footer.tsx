import { Instagram, Linkedin, Github, Mail, MapPin, Terminal } from "lucide-react";
// Removi o import da imagem logoIcon pois não vamos mais usar

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          
          {/* Logo e Nome */}
          <div className="flex items-center gap-4">
            <div className="
                flex items-center justify-center w-12 h-12 rounded-xl 
                bg-primary/10 border border-primary/20 
                shadow-[0_0_15px_rgba(168,85,247,0.3)] 
                transition-all duration-300"
            >
              <Terminal className="h-6 w-6 text-primary" />
            </div>

            <div>
              <p className="font-bold text-lg">Nícolas Harnisch</p>
              <p className="text-sm text-muted-foreground">
                Desenvolvedor Full Stack & Designer
              </p>
            </div>
          </div>
          
          {/* Contato */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Contato</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-4 w-4" />
              <a href="mailto:nicolasgomeshar@gmail.com">nicolasgomeshar@gmail.com</a>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Russas, Ceará</span>
            </div>
          </div>
          
          {/* Social */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Social</h4>
            <div className="flex items-center gap-2">
              <a 
                href="https://www.instagram.com/nick.harnisch_/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/nicolasharnisch/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com/NicolasHarnisch" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Nícolas Harnisch. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;