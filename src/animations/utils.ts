import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Registra o plugin ScrollTrigger de forma segura para SSR.
 */
let registered = false;

export function initGSAP() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/**
 * Verifica se o usuário prefere redução de movimento (Acessibilidade)
 */
export { shouldReduceMotion } from "./motion";

/**
 * Easings padrão de alta elegância para o tema Opnora
 */
export { OPNORA_EASINGS } from "./motion";
