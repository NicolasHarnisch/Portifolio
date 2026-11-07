import { useEffect, useRef, useState } from "react";
import { Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const SCENE_LOAD_DEADLINE = 20000;

export default function Preloader({ active, onContinue }: { active: boolean; onContinue: () => void }) {
  const { language } = useLanguage();
  const [present, setPresent] = useState(active);
  const dialogRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const portuguese = language === "pt";

  useEffect(() => {
    if (active) { setPresent(true); return; }
    if (!present) return;
    const timer = window.setTimeout(() => setPresent(false), 280);
    return () => window.clearTimeout(timer);
  }, [active, present]);

  useEffect(() => {
    if (!active) return;
    const overflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    document.body.style.overflow = "hidden";
    dialog?.focus({ preventScroll: true });
    // Covers the download of the optional chunk as well as the external scene.
    const timeout = window.setTimeout(onContinue, SCENE_LOAD_DEADLINE);
    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = overflow;
      const focused = document.activeElement;
      if (focused instanceof HTMLElement && dialog?.contains(focused)) {
        if (previousFocus?.isConnected && previousFocus !== document.body) {
          previousFocus.focus({ preventScroll: true });
        } else {
          focused.blur();
        }
      }
    };
  }, [active, onContinue]);

  if (!present) return null;
  return <div ref={dialogRef} tabIndex={-1} className={`site-preloader ${active ? "" : "site-preloader-leaving"}`}
    role={active ? "dialog" : undefined} aria-modal={active ? true : undefined}
    aria-hidden={!active || undefined} aria-labelledby="preloader-title"
    onKeyDown={event => {
      if (event.key === "Escape") onContinue();
      if (event.key === "Tab") { event.preventDefault(); buttonRef.current?.focus(); }
    }}>
    <div className="preloader-content">
      <Rocket className="preloader-rocket" strokeWidth={1.5} aria-hidden="true" />
      <p id="preloader-title" role="status" className="text-xs text-muted-foreground">
        {portuguese ? "Carregando..." : "Loading..."}
      </p>
      <button ref={buttonRef} type="button" onClick={onContinue}
        className="preloader-skip">
        {portuguese ? "Pular" : "Skip"}
      </button>
    </div>
  </div>;
}
