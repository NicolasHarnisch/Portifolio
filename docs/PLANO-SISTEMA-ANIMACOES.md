# Plano para o sistema de animações do portfólio

Proposta inicial de 18/10/2026, baseada na leitura do código atual, nas páginas dos autores e em demonstrações públicas. Os efeitos ainda precisam de avaliação visual em navegador e dispositivos reais. Este documento planeja a implementação; nenhuma dependência ou animação foi alterada nesta etapa.

**Direção recomendada**

Usar Dennis Snellenberg como referência de composição e interações, e as demonstrações de Olivier Larose como referência para transições ligadas à rolagem. Brittany Chiang serve como referência de clareza e organização do conteúdo. Manter a identidade roxa, os interiores escuros dos cards e a aparência atual do hero.

O movimento principal deve acompanhar a passagem do hero para os projetos. As demais seções devem ter entradas mais discretas e um ritmo consistente. Os valores abaixo são pontos de partida para um protótipo, sujeitos a ajustes visuais.

**Referências para explorar primeiro**

| Referência | Onde olhar | Aplicação proposta |
| --- | --- | --- |
| [Dennis Snellenberg](https://dennissnellenberg.com/) | Apresentação, trabalhos, navegação e interações. | Direção principal para a experiência de um desenvolvedor criativo. |
| [Minh Pham](https://minhpham.design/) | Tipografia, personalidade e presença de motion e 3D. | Dar mais expressão aos títulos e aos momentos de destaque. |
| [Brittany Chiang](https://brittanychiang.com/) | Hierarquia, experiência profissional e apresentação de projetos. | Manter o conteúdo fácil de percorrer e ler. |
| [Cards Parallax — demonstração](https://blog.olivierlarose.com/demos/cards-parallax) | Relação entre rolagem, escala e sobreposição dos cards. | Protótipo opcional para projetos em destaque. |
| [Perspective Section Transition — demonstração](https://blog.olivierlarose.com/demos/perspective-section-transition) | Passagem visual entre duas seções. | Referência para a transição hero → projetos. |
| [Bruno Simon](https://bruno-simon.com/) | Experiência interativa em Three.js. | Referência complementar para a qualidade e personalidade do 3D. Seu formato de exploração é diferente do portfólio atual. |

As aplicações propostas são escolhas de direção para este projeto, não uma indicação de que os sites de referência usam a mesma arquitetura ou de que foi medido seu desempenho.

**Diagnóstico do código atual**

- O hero já utiliza GSAP em `src/animations/hero.ts`.
- Os cards de projetos utilizam Anime.js em `src/animations/cards.ts`.
- Sobre, Experiência e Tecnologias usam `useScrollAnimation`, com IntersectionObserver e transições em CSS.
- Existem módulos de ScrollTrigger em `src/animations`, mas as funções de rolagem, navbar e footer não estão conectadas aos componentes correspondentes nos usos encontrados.
- Há um componente de progresso da rolagem que não está montado na página. Ele anima largura; a proposta é usar escala horizontal.
- Algumas entradas são aplicadas ao contêiner e também a seus descendentes, o que pode acumular deslocamentos e atrasos.
- O hero sticky e sua visibilidade já dependem de controle de rolagem. Essa lógica deve ser revisada antes de acrescentar novas transformações.

O primeiro trabalho é definir quem controla cada propriedade. Uma entrada por rolagem, um hover e o movimento do mouse não devem escrever no mesmo `transform` do mesmo elemento.

**Comportamento proposto por seção**

| Área | Movimento proposto | Comportamento em telas menores |
| --- | --- | --- |
| Hero | Entrada curta dos elementos de apoio, com sequência de 60–100 ms entre grupos. Nome, descrição e ações continuam disponíveis desde o carregamento. | Entrada simples, com deslocamento menor. |
| Hero → projetos | Uma sequência vinculada ao progresso da rolagem: discreta redução do conteúdo do hero enquanto a superfície de projetos o cobre. Começar com escala de 1 para aproximadamente 0,97. | Transição vertical natural, sem exigir um trecho longo de fixação. |
| Projetos | Entrada por card ou por linha, deslocamento inicial de 16–24 px e intervalo de 50–80 ms. Imagens podem ter um parallax curto dentro de uma máscara estável. | Cards em fluxo normal; efeito sem depender de hover. |
| Sobre | Título entra primeiro; foto e texto entram em grupos. A foto pode se deslocar 12–20 px dentro de seu enquadramento durante a rolagem. | Entrada única e foto estável. |
| Experiência | A linha da timeline progride com a leitura; cada item recebe destaque quando alcança a área de leitura. | Mesma ordem de conteúdo e efeitos reduzidos. |
| Tecnologias | Entrada por categoria, com sequência breve entre os grupos. | Sequência curta por linha. |
| Contato | Entrada curta da chamada e dos elementos de apoio. Efeito magnético de 3–6 px apenas em ações selecionadas e com ponteiro preciso. | Feedback de toque e foco. |
| Cabeçalho | Interpolação curta dos estados existentes e indicador de seção coerente com a posição da página. | Menu continua utilizável durante qualquer transição. |

A grade atual dos seis projetos é a primeira versão a animar. O empilhamento de cards será um protótipo separado, caso essa referência seja escolhida, para avaliar duração da rolagem, acesso aos links e adaptação ao celular.

**Arquitetura proposta**

1. **GSAP + ScrollTrigger para sequências e rolagem.** Aproveitar o GSAP já presente. ScrollTrigger permite vincular progresso à rolagem com `scrub` e fixar trechos com `pin`, quando necessário. [Documentação oficial](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).
2. **CSS para feedback simples.** Cor, borda, foco e pequenos estados de botão continuam em CSS, com propriedades de transição explícitas.
3. **Migração gradual dos usos de Anime.js.** Migrar as interações utilizadas para a arquitetura escolhida e só remover a dependência depois de conferir todos os usos.
4. **Separar as camadas de movimento.** O contêiner externo cuida da entrada; um elemento interno cuida do hover; a imagem pode ter seu próprio movimento. A geometria usada como gatilho fica estável.
5. **Centralizar parâmetros.** Durações, curvas, deslocamentos e intervalos ficam em tokens compartilhados. Ponto inicial: 150–220 ms para feedback e 450–700 ms para entradas. Animações vinculadas ao scroll usam uma faixa de rolagem definida por seção.
6. **Responsividade e limpeza.** Usar `gsap.matchMedia()` para condições de viewport, ponteiro e movimento reduzido, com reversão das animações ao mudar de condição. Remover também listeners, timers e callbacks próprios. [Documentação oficial](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/).
7. **Atualizar medidas quando o layout mudar.** Recalcular os gatilhos após mudanças relevantes de fontes, imagens e idioma; evitar atualizações indiscriminadas a cada renderização.
8. **3D com ciclo próprio.** Manter o carregamento adiado e a suspensão dos gráficos quando não estiverem ativos. Avaliar sua carga junto com a das animações de rolagem.

**Rolagem suave**

A primeira versão usa a rolagem nativa com animações sincronizadas. Avaliar [Lenis](https://lenis.dev/) em uma etapa posterior, comparando a sensação de controle e o desempenho com a versão nativa.

Caso seja adotado, integrar seu ciclo de atualização ao sistema de animações, resolver a concorrência com o `scroll-behavior` existente e verificar âncoras, histórico, teclado, foco e movimento reduzido. A suavização não deve alongar o acesso aos projetos e ao contato.

**Ordem de implementação e entregáveis**

1. **Inventário e base de comparação.** Registrar vídeos e medições da versão atual; mapear efeitos realmente utilizados, controladores duplicados e condições de execução. Entregável: mapa de responsabilidades e casos de regressão.
2. **Protótipo hero → projetos.** Construir a sequência principal e animar a grade existente. Validar rolagem para cima e para baixo, mudanças de viewport e entrada direta por âncora. Entregável: prévia curta para avaliar intensidade e ritmo.
3. **Sistema compartilhado.** Consolidar tokens, inicialização, reversão e camadas de transformação. Migrar as interações usadas. Entregável: uma base reutilizável para entradas e sequências por seção.
4. **Aplicação às demais seções.** Implementar Sobre, timeline, Tecnologias, Contato e indicador de progresso. Entregável: percurso completo com movimentos coerentes.
5. **Adaptação e validação final.** Ajustar celular, tablet, teclado e movimento reduzido; avaliar Lenis somente com a base estável. Entregável: comparação antes/depois e relatório dos dispositivos verificados.

**Critérios de conclusão**

- Conteúdo e ações principais disponíveis sem aguardar uma introdução.
- Uma animação interrompida não deixa conteúdo permanentemente invisível ou deslocado.
- Âncoras, voltar/avançar e recarregar no meio da página continuam funcionando.
- Sem sobreposição indevida de hero, cabeçalho e seções ao rolar rapidamente.
- Sem corte de botões, texto ou foco nos tamanhos de tela verificados.
- Trocas de idioma, tema e viewport não duplicam gatilhos e listeners.
- Voltar à aba retoma corretamente as interações.
- Movimento reduzido mantém todo o conteúdo acessível com efeitos mínimos.
- Comparação de carregamento, estabilidade do layout e fluidez antes/depois em navegador real e em pelo menos um celular com capacidade mais limitada.
- Testes de regressão das lógicas alteradas, lint, tipos e build aprovados. Testes de DOM complementam a validação visual e de desempenho.

**Material técnico das demonstrações**

- [Cards Parallax: explicação e código do autor](https://blog.olivierlarose.com/tutorials/cards-parallax).
- [Perspective Section Transition: explicação e código do autor](https://blog.olivierlarose.com/tutorials/perspective-section-transition).
- [Recriação da landing page de Dennis por Olivier](https://blog.olivierlarose.com/tutorials/awwwards-landing-page).

Esses tutoriais são referências de comportamento e composição. A implementação será adaptada à base React/Vite existente, com parâmetros, organização e tratamento de acessibilidade próprios.
