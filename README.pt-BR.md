# 🚀 Portfólio Pessoal - Nícolas Harnisch

> **Experiência Profissional** — Aplicação React + TypeScript focada em performance, acessibilidade e design responsivo.

<div style="display: inline-block; margin-bottom: 15px;">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white" alt="Prettier" />
  <img src="https://img.shields.io/badge/Framer%20Motion-0CE9F4?style=for-the-badge&logo=framer&logoColor=black" alt="Framer Motion" />
</div>

---

## 📋 Sumário

- [Sobre](#-sobre)
- [Visão Geral da Arquitetura](#-visão-geral-da-arquitetura)
- [Tecnologias](#-tecnologias)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Configuração](#-configuração)
- [Rodando Localmente](#-rodando-localmente)
- [Testes](#-testes)
- [Deploy](#-deploy)
- [Melhorias Futuras](#-melhorias-futuras)
- [Autor](#-autor)

---

## 🇬🇧 English

Read the English version here: [README.md](README.md)

## 🎯 Sobre

Este projeto de portfólio por **Nícolas Harnisch** demonstra habilidades avançadas em:

- Componentização em React com `TypeScript`
- Layout responsivo com `Tailwind CSS`
- Acessibilidade e navegação por teclado
- Animações suaves com `framer-motion`
- Internacionalização com `LanguageContext`
- Hooks customizados e renderização otimizada

O site contém seções: Hero, Sobre, Experiência, Tech Stack, Projetos, Contato e Footer.

---

## 🏗️ Visão Geral da Arquitetura

- **Vite + React + TypeScript**: servidor de desenvolvimento rápido e build para produção.
- **Arquitetura baseada em componentes**: separação de UI e lógica.
- **Context API**: `LanguageContext` (i18n), `theme-provider` (modo claro/escuro).
- **Hooks customizados**:
  - `useMobile` (detecção de breakpoint mobile)
  - `useScrollAnimation` (animação na rolagem)
  - `useTypingEffect` (efeito digitador no Hero)
  - `useToast` (notificações toast)

---

## 🛠️ Tecnologias

### Principais

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- shadcn/ui (sistema de design)

### Ferramentas

- ESLint
- Prettier
- Husky (hooks git, opcional)
- Vitest + Testing Library

---

## 📁 Estrutura de Pastas

```
src/
├── components/
│   ├── ui/                    # Componentes de UI reutilizáveis
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── NavLink.tsx
│   ├── ProjectCard.tsx
│   ├── Projects.tsx
│   ├── TechStack.tsx
│   └── WhatsAppButton.tsx
├── contexts/
│   ├── LanguageContext.tsx
│   └── theme-provider.tsx
├── hooks/
│   ├── use-mobile.tsx
│   ├── use-scroll-animation.tsx
│   ├── use-typing-effect.tsx
│   └── use-toast.ts
├── lib/
│   └── utils.ts
├── locales/
│   └── translations.ts
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
├── App.tsx
├── main.tsx
├── index.css
└── vite-env.d.ts
```

---

## ✅ Funcionalidades Principais

### Navegação
- Navbar fixa com rolagem suave por seção
- Menu mobile com toggle
- Seção ativa destacada ao rolar
- Suporte responsive mobile-first (320px)

### Hero
- Efeito de digitação com `useTypingEffect`
- CTAs para CV, LinkedIn e GitHub
- Modo claro/escuro persistente

### Sobre & Experiência
- Timeline de experiência
- Destaques de habilidades e educação
- Botões para download do CV e contato

### Tech Stack
- Cartões por categoria
- Chips interativos

### Projetos
- Cards de projeto com tags e links
- Suporte modo escuro

### Contato
- Formulário com validação básica
- Links sociais e WhatsApp

### Acessibilidade
- Foco permutável por teclado
- Contraste e tipografia acessíveis

---

## ⚙️ Configuração

### Pré-requisitos
- Node.js 18+
- npm 10+ ou pnpm

### Instalação

```bash
git clone https://github.com/NicolasHarnisch/Portifolio.git
cd Portifolio
npm install
```

---

## ▶️ Rodando Localmente

```bash
npm run dev
```

Acesse: `http://localhost:5173`

### Build produção

```bash
npm run build
npm run preview
```

---

## 🧪 Testes

Instale dependências de teste:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

Execute:

```bash
npm run test
```

---

## 🚀 Deploy

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

- Conectar o repositório
- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages

- Deploy opcional com `gh-pages`

---

## 🗺️ Melhorias Futuras

- Testes unitários e E2E
- SEO, sitemap e metadata detalhada
- Novas seções (blog/case studies)
- CI/CD com GitHub Actions

---

## 👨‍💻 Autor

**Nícolas Harnisch**

- GitHub: https://github.com/NicolasHarnisch
- LinkedIn: https://linkedin.com/in/nicolasharnisch
- Email: nicolasgomeshar@gmail.com
