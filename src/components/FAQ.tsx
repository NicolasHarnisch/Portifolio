import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Você está disponível para estágios ou trabalhos freelance?",
    answer: "Sim! Estou aberto a oportunidades de estágio, trabalhos freelance e projetos colaborativos. Minha rotina entre as duas graduações me permite flexibilidade para novos desafios.",
  },
  {
    question: "Qual é a sua área de maior interesse?",
    answer: "Tenho grande interesse em desenvolvimento frontend com React e Vue.js, além de projetos que envolvam gamificação e experiências interativas. Também gosto muito de unir design gráfico com programação.",
  },
  {
    question: "Quais tecnologias você domina?",
    answer: "No frontend trabalho com JavaScript, TypeScript, React.js e Vue.js. No backend tenho experiência com C, C++, Python e Java. Utilizo Git para versionamento e Figma para design de interfaces.",
  },
  {
    question: "Você trabalha com design também?",
    answer: "Sim! Tenho experiência em design gráfico e já fui responsável pela identidade visual de eventos acadêmicos como a SESCOMP UFC. Acredito que unir design e código resulta em produtos mais completos.",
  },
  {
    question: "Como posso entrar em contato?",
    answer: "Você pode me encontrar pelo e-mail nicolasgomeshar@gmail.com, pelo LinkedIn ou GitHub. Também pode clicar no botão do WhatsApp para uma conversa rápida!",
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
