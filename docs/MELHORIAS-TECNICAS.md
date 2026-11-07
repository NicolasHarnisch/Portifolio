# Entrega técnica do portfólio

Auditoria iniciada em 09/10/2026 e validação concluída em 10/10/2026.

## Escopo e preservação

Implementação local, sem redesign, reorganização das seções, novas páginas de conteúdo, filtros, carrosséis ou modais. Mantidas composição, tipografia, fundos, cores da marca, temas PT/EN e ordem dos seis projetos. As alterações visuais funcionais são: foco visível, link de salto exibido somente ao receber foco, texto acessível nos botões roxos e indicação desabilitada de projeto sem demonstração disponível.

O Git já estava modificado antes desta tarefa. Não houve reset, checkout, commit, push nem deploy. O arquivo de currículo PDF já estava excluído no estado inicial; essa exclusão foi mantida. Os PNGs originais, a fotografia e `Experience.tsx` foram comparados com a cópia inicial por SHA-256 e permanecem idênticos.

Cópia inicial dos 124 arquivos do projeto, fora do repositório, sem `node_modules`, `dist` ou `.git`:

```text
C:\Users\nicol\AppData\Local\Temp\portfolio-tech-before-65846532266241ffaeddda3b19696c3b
```

O documento anterior `docs/PROMPT-MELHORIAS-PORTFOLIO.md` constava dessa cópia inicial, mas deixou de existir na pasta atual durante o trabalho. Nenhuma operação desta implementação o removeu. Não foi recriado automaticamente; sua cópia permanece no backup.

## Auditoria confirmada

Ambiente: Windows, Node 20.19.5, npm 11.7.0, Vite instalado 5.4.21. `npm ls --depth=0` passou antes e depois; as quatro bibliotecas ausentes não estavam declaradas, portanto não apareciam como dependências quebradas nesse comando.

| Verificação | Estado inicial | Entrega |
| --- | --- | --- |
| Build de produção | Passava, com avisos de chunks grandes | Passa; recursos WebGL ainda geram esses avisos |
| Lint | 3 erros e 7 avisos | 0 erros e os mesmos 7 avisos |
| Tipos da aplicação | 4 módulos ausentes | Aplicação, configuração Vite e Vitest passam |
| Testes | Sem script de testes | 29 testes passam em 6 arquivos |
| JavaScript principal, gzip | 168,80 kB | 120,21 kB |
| JavaScript principal, tamanho informado pelo Vite | 498,50 kB | 365,02 kB |
| CSS, gzip | 16,56 kB | 16,48 kB |
| Imagens carregadas pelos seis projetos | 6.928.053 bytes | 151.942 bytes |
| Conteúdo inicial | Bloqueado pelo preloader/Spline | Texto, navegação e ações independentes do 3D |
| Sitemap anunciado pelo robots.txt | Não existia em `public/` | Arquivo criado e servido por HTTP |
| Currículo Hero/Footer | Dois destinos diferentes | Um único destino centralizado |

Os valores dos bundles foram obtidos em builds locais de produção. São tamanhos de código, não medições de carregamento, LCP, FPS ou consumo de GPU. A redução das imagens representa os arquivos selecionados pelos cards, não o tamanho da pasta `public/`: os originais foram preservados.

## Funcionamento e estabilidade

- Corrigidos os três erros de lint, sem desativar as regras correspondentes.
- Declaradas as dependências dos componentes shadcn existentes: `react-day-picker` 8.10.2, `date-fns` 3.6.0, `embla-carousel-react` 8.6.0, `recharts` 2.15.4 e `react-hook-form` 7.62.0. Componentes existentes não foram apagados para contornar erros de tipos.
- A API existente do calendário é da geração v8; não foi feita migração ampla de componentes ou bibliotecas.
- Preferências de tema e idioma toleram armazenamento bloqueado ou inválido. Idioma persiste entre visitas; tema `system` acompanha mudanças do sistema operacional.
- Tema inicial aplicado antes da renderização; controles usam o tema efetivamente resolvido. Transições de tema têm fallback e tratam rejeições.
- Erros de importação/renderização dos gráficos opcionais são isolados. A cena externa tem timeout próprio de 15 segundos, sem impedir o uso do restante da página.
- Timers, frames, observadores, listeners e animações de hover possuem limpeza. O hover restaura a borda e a sombra do tema atual.

As versões instaladas das dependências diretas preexistentes permaneceram iguais. O npm alterou três versões transitivas ao resolver as adições: `@jridgewell/sourcemap-codec` 1.5.0 → 1.6.0, `hasown` 2.0.2 → 2.0.4 e `semver` 7.7.2 → 7.8.5.

## Carregamento e recursos gráficos

- Removidos preloader bloqueante, progresso aleatório e atrasos de acesso ao conteúdo. `Preloader.tsx` permanece como componente inativo de compatibilidade.
- Removidos preload e preconnect incondicionais do Spline no HTML.
- O controlador leve verifica largura já na primeira renderização. O Spline não monta no mobile, com movimento reduzido, economia de dados, memória declarada de até 2 GB ou ausência da API WebGL.
- Imports dos gráficos começam apenas quando elegíveis, com o Hero visível e a aba ativa, após dar oportunidade ao primeiro paint do conteúdo. O adiamento de 600/1.200 ms aplica-se somente aos gráficos, não ao conteúdo.
- Spline usa `renderOnDemand` e chamadas `stop`/`play` para visibilidade. Não é desmontado/recarregado simplesmente por scroll. O espaço do gráfico é reservado durante o carregamento e nas falhas.
- As estrelas mantêm quantidade, cores e composição existentes. O frame loop pausa fora de vista/aba e usa modo sob demanda com movimento reduzido.
- O Hero sticky também considera a seção opaca de Projetos que o encobre; a interseção geométrica sozinha não seria suficiente para pausar o gráfico.
- Preservadas animações existentes, com respeito a movimento reduzido e cancelamento de parallax/typing fora da área visível. Nome, descrição, cargo completo e ações estão disponíveis na abertura; o texto não depende de fade-in ou da cena externa.
- Removidas montagens de providers/toasters sem consumidores na aplicação atual e o menu desktop cujo acionador era permanentemente oculto. As bibliotecas e componentes reutilizáveis correspondentes foram mantidos.
- A abertura do Hero não importa mais o plugin ScrollTrigger sem utilizá-lo. As outras animações mantêm a API de utilitários existente.

## Imagens

Comparados os PNGs e WebPs existentes. Os WebPs são adequados à exibição dos cards; TFBrand contém outra captura do mesmo destaque rotativo, e não uma conversão pixel a pixel da captura PNG. Foi gerado apenas o WebP que faltava, de Opnora, em 1200 × 680, qualidade 88. Nenhum original foi substituído ou excluído.

| Projeto | PNG original, bytes | WebP utilizado, bytes |
| --- | ---: | ---: |
| Opnora | 796.524 | 29.372 |
| TV Russas | 1.636.676 | 41.662 |
| TFBrand | 1.908.001 | 19.058 |
| ANS | 272.719 | 16.256 |
| Triagem | 850.455 | 12.010 |
| Engremaq | 1.463.678 | 33.584 |

Imagens dos projetos possuem dimensões intrínsecas, `decoding="async"` e lazy loading, pois ficam abaixo da área inicial. A foto conserva o arquivo e a proporção visual atuais, com dimensões declaradas. Não foram inventados `srcset` ou variantes inexistentes.

## Acessibilidade, navegação e conteúdo

- Links continuam sendo links, inclusive ações com aparência de botão. Eliminado aninhamento de botão em link nas áreas montadas da aplicação.
- Navegação utiliza hashes reais, margens de scroll e retângulos relativos ao viewport, sem o erro de `offsetTop` em pais posicionados. Restaurada a navegação nativa do navegador, sem forçar topo em recarga ou volta.
- Menu mobile fechado fica invisível para interação/leitores de tela e fora da ordem de tabulação. Possui nome acessível, estado expandido, Escape, clique externo e restauração de foco.
- Adicionados link de salto para o conteúdo, foco visível e `aria-current` para seção ativa.
- O typewriter fornece uma versão estável do cargo para leitores de tela. Ícones de tecnologia não repetem o nome já exibido ao lado.
- Conteúdo de scroll reveal permanece disponível sem IntersectionObserver e com preferência por movimento reduzido.
- Contraste calculado dos botões roxos: branco sobre `hsl(262 100% 71%)` era 3,46:1; o texto escuro existente no tema dark resulta em 5,12:1. Esse mesmo texto é agora usado no tema claro e na CTA do Footer, preservando o roxo da marca. Isso não constitui certificação de contraste de toda a página.
- Projetos e traduções se associam por identificador, mantendo a ordem. TFBrand sem URL apresenta “Em desenvolvimento”, desabilitado, em vez de um falso link `#`.
- Hero e Footer usam o currículo que já era o destino do Hero. Não foi inventado ou restaurado um PDF local.
- Corrigida somente a inconsistência factual da Triagem em PT/EN: trata-se de um simulador desktop Java/Swing, não um sistema web, conforme o [README público do autor](https://github.com/NicolasHarnisch/sistema-triagem-hospitalar/blob/main/README.md). Experiências profissionais e demais descrições foram mantidas.

## SEO e hospedagem

Criados sitemap, canonical, metadados de compartilhamento e dados estruturados `Person` com informações já presentes no portfólio. Mantido o domínio anunciado pelo robots.txt. Metadados da página acompanham o idioma; não foram declaradas versões indexáveis PT/EN em URLs que não existem.

A página 404 existente foi traduzida e recebeu `noindex`, sem logar um erro de console para uma rota inválida esperada. O postbuild gera `dist/404.html` a partir da aplicação existente. A reescrita indiscriminada para a home foi removida para permitir status 404 no hosting estático, seguindo a [orientação oficial da Vercel](https://vercel.com/kb/guide/custom-404-page). Isso precisa ser confirmado no próximo deploy; não houve publicação nesta tarefa. A única rota de conteúdo atual é `/` e a navegação das seções continua usando hashes.

Adicionados cache imutável somente para `/assets/` com hash, `nosniff` e política de referrer. Não foram introduzidos cache permanente de HTML, service worker ou CSP que pudesse bloquear Spline/fontes.

## Como validar e executar

```bash
npm install
npm run check
npm run verify:build
npm run assets:report
npm run dev
```

`check` executa lint, tipos, testes e produção. `verify:build` inicia preview temporário em 127.0.0.1:4173, verifica HTML, sitemap, robots, favicon, seis WebPs e o documento 404, e fecha seu servidor. A porta precisa estar livre. A ausência de preload dos gráficos no HTML gerado também é verificada.

Para regenerar somente o asset Opnora a partir do PNG original: `node scripts/assets.mjs --generate`.

## Validação realizada e limites

- `npm ls --depth=0`: passou.
- `npm run check`: passou, com 29 testes em 6 arquivos.
- `npm run verify:build`: passou; 11 endpoints locais responderam 200, com conteúdo e tipos MIME apropriados. `/404.html` foi testado como arquivo; isso não é uma medição de status 404 para rota desconhecida na Vercel.
- `npm run assets:report`: confirmou tamanhos e dimensões acima.
- `git diff --check`: passou. Avisos de normalização LF/CRLF do Git não são erros de whitespace.
- Testes cobrem armazenamento bloqueado, idioma salvo, tema do sistema, movimento reduzido, menu/Escape/foco, ordem/semântica dos links, conteúdo inicial, gate do 3D, falha isolada, timeout e pausa/retomada do Spline, além de transição de tema rejeitada.

Não havia app ou navegador habilitado na sessão. Não foram medidos Lighthouse, Core Web Vitals, waterfall real, erros de console/rede de navegador, FPS, GPU ou comparação visual em dispositivos reais. Testes DOM usam jsdom e mocks de WebGL; não comprovam a renderização da cena no hardware do visitante. As verificações HTTP não executam React nem acessam automaticamente todos os serviços externos.

Antes de publicar, revisar visualmente desktop/mobile, PT/EN, light/dark, foco/teclado, links externos, redução de movimento, falha de rede do Spline e rota desconhecida no hosting. Não há afirmação de ausência de overflow/contraste insuficiente em todos os tamanhos sem essa revisão.

Avisos mantidos: sete avisos de Fast Refresh nos componentes shadcn preexistentes; base Browserslist antiga; chunks WebGL grandes. O limite de chunks não foi aumentado para esconder esses avisos. Recharts v2 também emite aviso de descontinuação na instalação; migrar o componente para v3 é uma tarefa separada, não uma atualização automática incompatível.
