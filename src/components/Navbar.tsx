import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, Terminal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
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
          ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-3 sm:py-4 shadow-md" 
          : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6">
        
        {/* --- LOGO (ÍCONE TECH) --- */}
        <a 
          href="#" 
          onClick={(e) => { 
            e.preventDefault(); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
          }} 
          className="flex items-center gap-2 sm:gap-3 group"
        >
          <div className="
              flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl 
              bg-primary/10 border border-primary/20 
              shadow-[0_0_15px_rgba(168,85,247,0.3)] 
              group-hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] 
              group-hover:border-primary/50 group-hover:bg-primary/20 
              transition-all duration-300"
          >
            <Terminal className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
          </div>

          <span className="font-bold text-base sm:text-xl tracking-tight group-hover:text-primary transition-colors">
            Nicolas Harnisch
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
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
            className="bg-primary hover:bg-primary/80 transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            onClick={() => window.open("https://wa.me/5585996883588", "_blank")}
          >
            Fale Comigo
          </Button>
        </div>

        {/* Mobile Menu - Sheet */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-background/95 backdrop-blur-xl border-white/10">
            <SheetHeader>
              <SheetTitle className="text-left flex items-center gap-2">
                <Terminal className="h-5 w-5 text-primary" />
                Menu
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="text-base font-medium text-left py-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <Button 
                variant="default" 
                className="mt-4 bg-primary hover:bg-primary/80 w-full"
                onClick={() => {
                  setIsOpen(false);
                  window.open("https://wa.me/5585996883588", "_blank");
                }}
              >
                Fale Comigo
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
