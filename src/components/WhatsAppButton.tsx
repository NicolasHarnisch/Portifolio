import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhatsAppButton = () => {
  const { t } = useLanguage();

  return (
    <a
      href="https://wa.me/5585999973965"
      target="_blank"
      rel="noopener noreferrer"
      className="md:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform duration-300 glow animate-in fade-in zoom-in"
      aria-label={t.whatsapp}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;