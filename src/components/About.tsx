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
              Transformo ideias em experiências digitais
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              Acredito que <span className="text-gradient font-semibold">tecnologia e design caminham juntos para impulsionar negócios</span> e conectar marcas ao seu público de forma autêntica.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Minha missão é <span className="text-gradient font-semibold">simplificar processos complexos e entregar soluções digitais</span> que unem estética, performance e usabilidade. Cada detalhe é pensado para valorizar sua marca e criar interfaces que encantam.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Mais do que desenvolver, ajudo sua marca a ganhar voz, traduzindo visão e valores em uma presença digital única e marcante.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
