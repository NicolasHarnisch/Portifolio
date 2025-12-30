import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X, Terminal } from "lucide-react"; // Terminal adicionado aqui

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Quem sou", id: "about" },
    { name: "Experiência", id: "experience" },
    { name: "Stack", id: "stack" },
    { name: "Projetos", id: "projects" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-4 shadow-md" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        
        {/* --- NOVO LOGO (ÍCONE TECH) --- */}
        <a 
          href="#" 
          onClick={(e) => { 
            e.preventDefault(); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
          }} 
          className="flex items-center gap-3 group"
        >
          {/* A "Caixinha" Roxa Neon */}
          <div className="
              flex items-center justify-center w-10 h-10 rounded-xl 
              bg-primary/10 border border-primary/20 
              shadow-[0_0_15px_rgba(168,85,247,0.3)] 
              group-hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] 
              group-hover:border-primary/50 group-hover:bg-primary/20 
              transition-all duration-300"
          >
            <Terminal className="h-6 w-6 text-primary" />
          </div>

          {/* O Nome */}
          <span className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors">
            Nicolas Harnisch
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary decoration-2 underline-offset-4"
            >
              {link.name}
            </button>
          ))}
          <Button 
            variant="default" 
            size="sm" 
            className="bg-primary hover:bg-primary/80"
            onClick={() => window.open("https://wa.me/5585996883588", "_blank")}
          >
            Fale Comigo
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className="text-lg font-medium text-left py-2 border-b border-white/5"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;