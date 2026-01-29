import Navbar from "@/components/Navbar"; 
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen relative bg-background">
      
      <div className="fixed inset-0 z-[1] opacity-5 pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} 
      />

      <Navbar />

      <main className="relative z-10">
        <Hero /> 
        <About />
        <Experience />
        <TechStack />
        <Projects />
        
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;