import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5585996883588"
      target="_blank"
      rel="noopener noreferrer"
      // ADICIONEI 'md:hidden' AQUI EMBAIXO V
      className="md:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform duration-300 glow animate-in fade-in zoom-in"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;