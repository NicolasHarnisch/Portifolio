import { memo } from "react";
import { User } from "lucide-react";
import MotionTitle from "./MotionTitle";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="py-12 sm:py-16 md:py-24 relative overflow-hidden px-4 sm:px-6"
    >
      <div className="container relative z-10">
        <div data-motion-heading className="motion-heading flex flex-row items-center gap-3 sm:gap-4 mb-8 sm:mb-12 ml-1">
          <span data-motion-chapter className="motion-chapter" aria-hidden="true">02</span>
          <span data-motion-rule className="motion-heading-rule" aria-hidden="true" />
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
            <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <span className="text-xs sm:text-sm uppercase tracking-[0.22em] text-primary font-semibold block mb-1">
              {t.about.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-foreground">
              <MotionTitle>{t.about.title}</MotionTitle>
            </h2>
          </div>
        </div>

        <div
          data-motion-item
          className="surface-card relative group rounded-2xl sm:rounded-[2rem] shadow-[0_18px_50px_rgba(88,28,135,0.08)] hover:shadow-[0_24px_60px_rgba(168,85,247,0.14)] p-4 sm:p-6 md:p-8 overflow-hidden transition-[background-color,border-color,box-shadow] duration-500"
        >
          <div className="flex flex-col md:flex-row gap-5 md:gap-10 items-start md:items-center">
            <div className="w-full md:w-5/12 md:max-w-[420px] shrink-0 relative group/photo">
              <div className="relative rounded-xl sm:rounded-3xl overflow-hidden border border-[#E8E0FA] dark:border-white/10 shadow-[0_12px_30px_rgba(88,28,135,0.15)] transform transition-transform duration-500 group-hover/photo:scale-[1.02]">
                <img
                  data-motion-image
                  src="/minha-foto.webp"
                  width={900}
                  height={1192}
                  alt="Nícolas Gomes Harnisch"
                  className="w-full aspect-[4/3] sm:aspect-[16/11] md:aspect-[3/4] object-cover object-[center_62%] md:object-center"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent md:bg-primary/5 md:from-transparent md: mix-blend-normal md:mix-blend-overlay pointer-events-none" />
              </div>
            </div>

            <div className="w-full min-w-0 md:w-auto md:flex-1 space-y-3.5 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold leading-tight text-slate-900 dark:text-foreground text-left">
                {t.about.subtitle}
              </h3>

              <p className="text-[14.5px] sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
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

              <p className="text-[14.5px] sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {t.about.p2_1}
                <span className="text-gradient font-semibold">
                  {t.about.p2_hi1}
                </span>
                {t.about.p2_2}
              </p>

              <p className="text-[14.5px] sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
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
