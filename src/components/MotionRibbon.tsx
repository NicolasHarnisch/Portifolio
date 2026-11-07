import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInView, usePageVisible } from "@/hooks/useVisible";

export default function MotionRibbon() {
  const { language } = useLanguage();
  const ribbonRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ribbonRef);
  const pageVisible = usePageVisible();
  const labels = language === "pt"
    ? ["Ideias em movimento", "Código com propósito", "Do conceito ao produto", "Soluções sob medida"]
    : ["Ideas in motion", "Code with purpose", "From concept to product", "Tailored solutions"];

  // Duplicado para garantir loop contínuo perfeito em qualquer largura de tela
  const items = [...labels, ...labels, ...labels, ...labels];

  return (
    <div ref={ribbonRef} className="motion-ribbon" aria-hidden="true">
      <div className="motion-ribbon-track" style={{ animationPlayState: inView && pageVisible ? "running" : "paused" }}>
        {items.map((label, index) => (
          <span key={index} className="motion-ribbon-part">
            <span className={index % 2 === 1 ? "motion-ribbon-outline" : ""}>{label}</span>
            <span className="motion-ribbon-star">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
