import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Você fornece desenvolvimento também?",
    answer: "Ofereço tanto design quanto desenvolvimento, e acredito que o melhor resultado acontece quando unimos as duas áreas em um só fluxo de trabalho.",
  },
  {
    question: "Qual é a duração de um projeto?",
    answer: "O tempo e o investimento variam de acordo com cada demanda. Projetos menores podem ser entregues em poucas horas, enquanto os mais complexos exigem dias de dedicação.",
  },
  {
    question: "Quais as tecnologias você usa?",
    answer: "Trabalho com um stack moderno e flexível, incluindo HTML, CSS, JavaScript, TypeScript, React, Next, Node e MongoDB. Essa combinação me permite desenvolver soluções rápidas, seguras e escaláveis.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Perguntas frequentes
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
