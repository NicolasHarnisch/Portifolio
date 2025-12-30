const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container relative z-10">
        
        {/* Título fora do cartão */}
        <div className="mb-8 md:mb-12 ml-1">
          <span className="text-sm uppercase tracking-widest text-muted-foreground">
            Sobre mim
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Quem sou
          </h2>
        </div>

        {/* CORREÇÃO AQUI: Adicionei 'overflow-hidden' no final da lista de classes */}
        <div className="relative group rounded-[2rem] border border-white/10 bg-card/20 backdrop-blur-md shadow-2xl p-6 md:p-8 overflow-hidden">
          
          {/* O fundo gradiente agora será cortado corretamente pelas bordas arredondadas */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

          <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center">
            
            {/* Foto */}
            <div className="w-full md:w-4/12 max-w-sm shrink-0 relative group/photo">
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/5 shadow-lg transform transition-transform duration-500 group-hover/photo:scale-[1.02]">
                <img 
                  src="/minha-foto.jpeg" 
                  alt="Nícolas Gomes Harnisch" 
                  className="w-full aspect-[3/4] object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />
              </div>
            </div>

            {/* Texto */}
            <div className="w-full md:w-8/12 space-y-4">
              <h3 className="text-xl md:text-2xl font-bold leading-tight text-foreground/90">
                Transformando linhas de código em experiências de aprendizado e design
              </h3>
              
              <p className="text-muted-foreground leading-relaxed text-base">
                Busco excelência técnica não apenas para desenvolver sistemas, mas para criar soluções que ampliem a visão do usuário através de <span className="text-gradient font-semibold">criatividade e tecnologia</span>. Atualmente, divido minha rotina entre a graduação na <span className="text-gradient font-semibold">Universidade Federal do Ceará</span> (Campus Russas) e na <span className="text-gradient font-semibold">UniAteneu</span>, o que me proporciona uma visão ampla de arquitetura e desenvolvimento de software.
              </p>
              
              <p className="text-muted-foreground leading-relaxed text-base">
                Minha trajetória é marcada pelo envolvimento em <span className="text-gradient font-semibold">projetos de extensão universitária</span>, onde aplico gamificação e desenvolvimento front-end para resolver problemas reais e educar novos talentos.
              </p>
              
              <p className="text-muted-foreground leading-relaxed text-base">
                Fora das telas de código, trago a experiência em <span className="text-gradient font-semibold">design gráfico</span> para garantir que a usabilidade e a estética caminhem juntas em cada projeto.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;