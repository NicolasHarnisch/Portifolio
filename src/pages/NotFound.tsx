import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  useEffect(() => {
    const previousTitle = document.title;
    const previous = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const robots = previous ?? document.createElement("meta");
    const previousContent = previous?.content;
    robots.name = "robots";
    robots.content = "noindex, follow";
    if (!previous) document.head.append(robots);
    document.title = language === "pt" ? "Página não encontrada | Nícolas Harnisch" : "Page not found | Nícolas Harnisch";
    return () => {
      document.title = previousTitle;
      if (previous) previous.content = previousContent ?? ""; else robots.remove();
    };
  }, [language]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center px-4">
      <div className="p-6 rounded-full bg-primary/10 mb-6 animate-pulse">
        <Terminal className="h-12 w-12 text-primary" />
      </div>
      <h1 className="text-4xl font-bold mb-2 text-foreground">404</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        {language === "pt" ? "Ops! Parece que o caminho " : "Oops! The path "}
        <span className="text-primary font-mono bg-primary/10 px-1 rounded">{location.pathname}</span>
        {language === "pt" ? " não existe." : " does not exist."}
      </p>
      <Button asChild className="bg-primary hover:bg-primary/80 transition-all duration-300">
        <Link to="/">{language === "pt" ? "Voltar para o Início" : "Back to Home"}</Link>
      </Button>
    </div>
  );
};
export default NotFound;
