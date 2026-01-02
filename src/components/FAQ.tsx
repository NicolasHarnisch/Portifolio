import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Briefcase, Code2, Palette, GraduationCap, HelpCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    icon: <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
    question: "Como você concilia duas graduações e projetos?",
    answer: "O segredo é a gestão de tempo. A UFC (presencial) é minha base principal de aprofundamento teórico, enquanto a UniAteneu (EAD) funciona como um complemento flexível. Organizo meu calendário mensalmente para antecipar demandas, garantindo que o foco acadêmico de uma fortaleça a outra.",
  },
  {
    icon: <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
    question: "Você atua mais no Frontend ou Backend?",
    answer: "Meu foco de carreira é o Backend, com especialização no ecossistema Java. Embora eu tenha conhecimentos sólidos de Frontend (React/Vue) para tirar projetos do papel e ter uma visão Full Stack, minha paixão e aprofundamento técnico estão na lógica de servidor e arquitetura.",
  },
  {
    icon: <Palette className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
    question: "O design é um diferencial no seu trabalho?",
    answer: "Com certeza. Minha experiência criando identidades visuais (como na SESCOMP UFC) me permite programar pensando na experiência do usuário (UX) e na estética (UI). Não entrego apenas código funcional, entrego interfaces agradáveis e intuitivas.",
  },
  {
    icon: <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
    question: "Você está disponível para novas oportunidades?",
    answer: "Sim! Estou sempre aberto a propostas de estágio, freelance ou colaborações open-source, especialmente em projetos que envolvam educação, gamificação ou desafios técnicos de interface.",
  },
];

const FAQ = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="faq" className="py-16 sm:py-20 md:py-24 relative overflow-hidden px-4 sm:px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div 
        ref={ref}
        className={`container max-w-3xl relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
            <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div className="text-center sm:text-left">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-primary font-semibold block mb-1">
              Dúvidas?
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Perguntas Frequentes
            </h2>
          </div>
        </div>
        
        <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-white/5 bg-card/5 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 data-[state=open]:bg-card/10 data-[state=open]:border-primary/20 transition-all duration-300"
            >
              <AccordionTrigger className="text-left hover:no-underline px-3 sm:px-4 py-4 sm:py-6 group">
                <div className="flex items-center gap-3 sm:gap-4">
                  
                  <div className="p-2 sm:p-3 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all shrink-0">
                    {faq.icon}
                  </div>
                  
                  <span className="text-sm sm:text-base md:text-lg font-medium text-foreground/90 group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-3 sm:px-4 pb-4 sm:pb-6 pl-[3.5rem] sm:pl-[4.5rem] text-muted-foreground leading-relaxed text-sm sm:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;