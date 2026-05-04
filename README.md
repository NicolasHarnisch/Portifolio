# 🚀 Personal Portfolio - Nícolas Harnisch

> **Professional Portfolio** — React + TypeScript application focused on performance, accessibility, and responsive design.

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0CE9F4?style=for-the-badge&logo=framer&logoColor=black)

---

## 📋 Table of Contents

- [About](#about)
- [Architecture Overview](#architecture-overview)
- [Technologies](#technologies)
- [Folder Structure](#folder-structure)
- [Core Features](#core-features)
- [Setup](#setup)
- [Run Locally](#run-locally)
- [Testing](#testing)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## 🇧🇷 Português

Read the full Portuguese version here: [README.pt-BR.md](README.pt-BR.md)

## About 🎯

This portfolio project by **Nícolas Harnisch** demonstrates advanced skills in:

- React componentization with `TypeScript`
- Responsive design with `Tailwind CSS`
- Accessibility and keyboard-first navigation
- Smooth transitions with `framer-motion`
- Internationalization with `LanguageContext`
- Custom hooks and optimized UI rendering

The site includes sections: Hero, About, Experience, Tech Stack, Projects, Contact, and Footer.

---

## Architecture Overview 🏗️

- **Vite + React + TypeScript**: fast development server and production build.
- **Component-based architecture**: UI and logic separation.
- **Context API**: `LanguageContext` (i18n), `theme-provider` (dark/light mode).
- **Custom hooks**:
  - `useMobile` (mobile breakpoint detection)
  - `useScrollAnimation` (entry animation on scroll)
  - `useTypingEffect` (typewriter effect in Hero)
  - `useToast` (toast notifications)

---

## Technologies 🛠️

### Core

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- shadcn/ui (design system)

### Dev Tools

- ESLint
- Prettier
- Husky (git hooks, optional)
- Vitest + Testing Library

---

## Folder Structure 📁

```text
src/
├── components/
│   ├── ui/                     # Reusable UI components
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

## Core Features ✅

### Navigation

- Fixed top navbar with smooth section scrolling
- Mobile menu toggle
- Active section indicator based on scroll position
- 320px mobile-first responsive support

### Hero

- Typewriter effect using `useTypingEffect`
- CTA links: CV, LinkedIn, GitHub
- Persistent dark/light theme toggle

### About & Experience

- Timeline style experience section
- Skills and education highlights
- Buttons for downloading CV and contacting author

### Tech Stack

- Categorized stack cards
- Interactive chips and context-aware display

### Projects

- Project cards with descriptions, tags, and links
- Dark mode style support on cards
- Search/filter hooks (if configured)

### Contact

- Contact form with basic form validation
- Social and WhatsApp quick contact links

### Accessibility

- Keyboard focus styles and skip-to-content model
- High contrast and responsive typography

---

## Setup ⚙️

### Prerequisites

- Node.js v18+ recommended
- npm 10+ or pnpm

### Installation

```bash
git clone https://github.com/NicolasHarnisch/Portifolio.git
cd Portifolio
npm install
```

---

## Run Locally ▶️

```bash
npm run dev
```

Open: `http://localhost:5173`

### Production build

```bash
npm run build
npm run preview
```

---

## Testing 🧪

Install test dependencies:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

Run tests:

```bash
npm run test
```

---

## Deployment 🚀

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

- Connect repository
- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages

- Optional: setup with `gh-pages` package

---

## Future Improvements 🗺️

- Add unit tests and E2E tests
- Improve SEO with metadata and sitemap
- Add more content sections (blog/case studies)
- Add analytics and CI/CD pipeline

---

## Author 👨‍💻

### Nícolas Harnisch

- GitHub: <https://github.com/NicolasHarnisch>
- LinkedIn: <https://linkedin.com/in/nicolasharnisch>
- Email: <nicolasgomeshar@gmail.com>
