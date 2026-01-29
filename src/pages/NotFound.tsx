import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button"; // Importando o botão do seu tema
import { Terminal } from "lucide-react"; // Importando ícone tech

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Mantive sua lógica original de log, pois é útil para debug
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    // Usei 'bg-background' para garantir que o fundo fique escuro igual ao resto do site
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center px-4">
      
      {/* Círculo decorativo com animação de pulso */}
      <div className="p-6 rounded-full bg-primary/10 mb-6 animate-pulse">
        <Terminal className="h-12 w-12 text-primary" />
      </div>

      <h1 className="text-4xl font-bold mb-2 text-foreground">404</h1>
      
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        Ops! Parece que o caminho <span className="text-primary font-mono bg-primary/10 px-1 rounded">{location.pathname}</span> não existe.
      </p>

      {/* Botão estilizado em vez de um link simples */}
      <Link to="/">
        <Button className="bg-primary hover:bg-primary/80 transition-all duration-300">
          Voltar para o Início
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;