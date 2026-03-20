import {
  Calendar,
  MapPin,
  Gamepad2,
  Palette,
  GraduationCap,
  Code2,
  BookOpen,
  Building2,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// EXPERIÊNCIAS PROFISSIONAIS
const experiences = [
  {
    role: "Monitor Pedagógico e Desenvolvedor",
    company: "Projeto JOGA — UFC",
    period: "Outubro/2024 - Atualmente",
    description:
      "Atuo no desenvolvimento de cursos de programação com React Native e Node.js, aplicando técnicas de gamificação para suporte direto aos estudantes.",
    tags: ["React Native", "Node.js", "Gamificação", "Ensino"],
    icon: <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
  },
  {
    role: "Desenvolvedor Front-end (Voluntário)",
    company: "NERDS - Pesquisa e Inovação",
    period: "Setembro/2025 - Janeiro/2026",
    description:
      "Desenvolvimento de interfaces web interativas com Vue.js e JavaScript, com experiência em controle de versão com Git e colaboração em equipes multidisciplinares.",
    tags: ["Vue.js", "JavaScript", "Git", "Trabalho em Equipe"],
    icon: <Code2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
  },
  {
    role: "Design e Marketing",
    company: "SESCOMP UFC",
    period: "Abril/2025 - Setembro/2025",
    description:
      "Desenvolvimento de materiais gráficos para divulgação do evento em redes sociais e criação da identidade visual de palestras, workshops e peças de uso institucional.",
    tags: ["Design Gráfico", "Marketing", "Identidade Visual"],
    icon: <Palette className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
  },
  {
    role: "Design e Marketing",
    company: "Atlética Indomável — UFC",
    period: "Outubro/2024 - Agosto/2025",
    description:
      "Responsável pela elaboração da identidade visual de campanhas e criação de artes gráficas para materiais de eventos esportivos e sociais, visando o engajamento do público.",
    tags: ["Design", "Social Media", "Branding"],
    icon: <Palette className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
  },
];

// FORMAÇÃO ACADÊMICA
const education = [
  {
    course: "Ciência da Computação",
    institution: "Universidade Federal do Ceará (UFC)",
    period: "Outubro/2024 - Dezembro/2028",
    status: "Graduação em andamento",
    description:
      "Formação com foco em fundamentos da computação, programação, estruturas de dados, algoritmos e desenvolvimento de software.",
    icon: <GraduationCap className="h-5 w-5 text-primary" />,
  },
  {
    course: "Engenharia de Software",
    institution: "UniAteneu",
    period: "Fevereiro/2024 - Julho/2028",
    status: "Formação acadêmica",
    description:
      "Estudos voltados para processos de desenvolvimento, arquitetura de software, qualidade, documentação e construção de soluções digitais.",
    icon: <BookOpen className="h-5 w-5 text-primary" />,
  },
];

const Experience = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="experience"
      className="py-16 sm:py-20 md:py-24 relative overflow-hidden px-4 sm:px-6"
    >
      <div
        ref={ref}
        className={`container relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Título da seção */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-16 ml-1">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
            <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-primary font-semibold block mb-1">
              Trajetória
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Experiência & Formação
            </h2>
          </div>
        </div>

        {/* Layout principal */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-10">
          {/* COLUNA ESQUERDA - EXPERIÊNCIA */}
          <div className="xl:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                Experiência Profissional
              </h3>
            </div>

            <div className="relative border-l border-white/10 ml-2 sm:ml-4 space-y-8 sm:space-y-10">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-6 sm:pl-8 md:pl-10 group"
                >
                  <div className="absolute -left-[6px] top-1 h-3 w-3 rounded-full bg-primary border border-primary shadow-[0_0_12px_rgba(168,85,247,0.45)] group-hover:scale-125 transition-transform duration-300" />

                  <div className="rounded-2xl bg-card/5 border border-white/5 hover:border-white/10 hover:bg-card/10 transition-all duration-300 p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit h-fit shadow-[0_0_10px_rgba(168,85,247,0.15)] shrink-0">
                        {exp.icon}
                      </div>

                      <div className="flex-1">
                        <h4 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {exp.role}
                        </h4>

                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
                            <Calendar className="h-3 w-3" />
                            {exp.period}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4" />
                          {exp.company}
                        </div>

                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-muted-foreground hover:bg-primary/20 hover:border-primary hover:text-primary transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUNA DIREITA - FORMAÇÃO */}
          <div className="xl:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                Formação Acadêmica
              </h3>
            </div>

            <div className="space-y-4">
              {education.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/5 bg-card/5 hover:bg-card/10 hover:border-white/10 transition-all duration-300 p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                      {item.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4 className="text-lg font-bold leading-tight">
                          {item.course}
                        </h4>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 border border-primary/20 text-primary">
                          {item.status}
                        </span>
                      </div>

                      {/* Atualizado aqui para mostrar instituição e data juntos */}
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
                        <span>{item.institution}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {item.period}
                        </span>
                      </div>

                      <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Experience;