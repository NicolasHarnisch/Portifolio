import { memo } from "react";
import { User } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="py-12 sm:py-16 md:py-24 relative overflow-hidden px-4 sm:px-6"
    >
      <div
        ref={ref}
        className={`container relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12 ml-1">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
            <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <span className="text-xs sm:text-sm uppercase tracking-[0.22em] text-primary font-semibold block mb-1">
              {t.about.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-foreground">
              {t.about.title}
            </h2>
          </div>
        </div>

        <div className="relative group rounded-2xl sm:rounded-[2rem] border border-[#E9E2F8] dark:border-white/10 bg-white/95 dark:bg-[#08070b]/90 backdrop-blur-xl shadow-[0_18px_50px_rgba(88,28,135,0.08)] hover:shadow-[0_24px_60px_rgba(168,85,247,0.14)] p-4 sm:p-6 md:p-8 overflow-hidden transition-all duration-500">
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 items-center">
            <div className="w-full md:w-4/12 max-w-[280px] sm:max-w-sm shrink-0 relative group/photo">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8E0FA] dark:border-white/5 shadow-[0_12px_30px_rgba(88,28,135,0.10)] transform transition-transform duration-500 group-hover/photo:scale-[1.02]">
                <img
                  src="/minha-foto.jpeg"
                  alt="Nícolas Gomes Harnisch"
                  className="w-full aspect-[3/4] object-cover transition-all duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />
              </div>
            </div>

            <div className="w-full md:w-8/12 space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight text-slate-900 dark:text-foreground/90 text-center md:text-left">
                {t.about.subtitle}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-muted-foreground leading-relaxed">
                {t.about.p1_1}
                <span className="text-gradient font-semibold">
                  {t.about.p1_hi1}
                </span>
                {t.about.p1_2}
                <span className="text-gradient font-semibold">
                  {t.about.p1_hi2}
                </span>
                {t.about.p1_3}
                <span className="text-gradient font-semibold">
                  {t.about.p1_hi3}
                </span>
                {t.about.p1_4}
              </p>

              <p className="text-sm sm:text-base text-slate-600 dark:text-muted-foreground leading-relaxed">
                {t.about.p2_1}
                <span className="text-gradient font-semibold">
                  {t.about.p2_hi1}
                </span>
                {t.about.p2_2}
              </p>

              <p className="text-sm sm:text-base text-slate-600 dark:text-muted-foreground leading-relaxed">
                {t.about.p3_1}
                <span className="text-gradient font-semibold">
                  {t.about.p3_hi1}
                </span>
                {t.about.p3_2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
