import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Briefcase, Code2, Palette, MessageCircle, GraduationCap } from "lucide-react";

const faqs = [
  {
    icon: <Briefcase className="h-5 w-5 text-primary" />,
    question: "Como você concilia duas graduações e projetos?",
    answer: "O segredo é a gestão de tempo. A UFC (presencial) é minha base principal de aprofundamento teórico, enquanto a UniAteneu (EAD) funciona como um complemento flexível. Organizo meu calendário mensalmente para antecipar demandas, garantindo que o foco acadêmico de uma fortaleça a outra.",
  },
  {
    icon: <Code2 className="h-5 w-5 text-primary" />,
    question: "Você atua mais no Frontend ou Backend?",
    answer: "Meu foco de carreira é o Backend, com especialização no ecossistema Java. Embora eu tenha conhecimentos sólidos de Frontend (React/Vue) para tirar projetos do papel e ter uma visão Full Stack, minha paixão e aprofundamento técnico estão na lógica de servidor e arquitetura.",
  },
  {
    icon: <Palette className="h-5 w-5 text-primary" />,
    question: "O design é um diferencial no seu trabalho?",
    answer: "Com certeza. Minha experiência criando identidades visuais (como na SESCOMP UFC) me permite programar pensando na experiência do usuário (UX) e na estética (UI). Não entrego apenas código funcional, entrego interfaces agradáveis e intuitivas.",
  },
  {
    icon: <GraduationCap className="h-5 w-5 text-primary" />,
    question: "Você está disponível para novas oportunidades?",
    answer: "Sim! Estou sempre aberto a propostas de estágio, freelance ou colaborações open-source, especialmente em projetos que envolvam educação, gamificação ou desafios técnicos de interface.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Background Decorativo Suave */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container max-w-3xl relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-widest text-muted-foreground">
            Dúvidas?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Perguntas Frequentes
          </h2>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              // Estilo de Vidro + Borda que brilha no hover
              className="border border-white/5 bg-card/5 backdrop-blur-sm rounded-xl px-2 data-[state=open]:bg-card/10 data-[state=open]:border-primary/20 transition-all duration-300"
            >
              <AccordionTrigger className="text-left hover:no-underline px-4 py-6 group">
                <div className="flex items-center gap-4">
                  {/* Ícone com fundo sutil */}
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    {faq.icon}
                  </div>
                  <span className="text-base md:text-lg font-medium text-foreground/90 group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-4 pb-6 pl-[4.5rem] text-muted-foreground leading-relaxed text-base">
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