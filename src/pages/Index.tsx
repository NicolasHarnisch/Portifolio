import Navbar from "@/components/Navbar"; // Importa a Navbar nova
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen relative bg-background">
      
      {/* 1. TEXTURA DE GRANULAÇÃO (Noise) 
          Isso dá o toque sutil e profissional no fundo todo */}
      <div className="fixed inset-0 z-[1] opacity-5 pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} 
      />

      {/* 2. NAVBAR FIXA (Fica acima de tudo, z-50) */}
      <Navbar />

      <main className="relative z-10">
        {/* Precisamos remover a <nav> antiga de dentro do Hero.tsx se formos usar esta */}
        <Hero /> 
        <About />
        <Experience />
        <TechStack />
        <Projects />
        <FAQ />
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;