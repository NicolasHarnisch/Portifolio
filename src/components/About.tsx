const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              Como te ajudo
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Quem sou
            </h2>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold">
              Transformando linhas de código em experiências de aprendizado e design
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              Busco excelência técnica não apenas para desenvolver sistemas, mas para criar soluções que ampliem a visão do usuário através de <span className="text-gradient font-semibold">criatividade e tecnologia</span>. Atualmente, divido minha rotina entre a graduação na <span className="text-gradient font-semibold">UFC</span> (Campus Russas) e na <span className="text-gradient font-semibold">UniAteneu</span>, o que me proporciona uma visão ampla de arquitetura e desenvolvimento de software.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Minha trajetória é marcada pelo envolvimento em <span className="text-gradient font-semibold">projetos de extensão universitária</span>, onde aplico gamificação e desenvolvimento front-end para resolver problemas reais e educar novos talentos.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Fora das telas de código, trago a experiência em <span className="text-gradient font-semibold">design gráfico</span> para garantir que a usabilidade e a estética caminhem juntas em cada projeto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
