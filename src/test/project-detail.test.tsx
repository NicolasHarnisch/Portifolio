import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/theme-provider';
import ProjectDetail from '@/pages/ProjectDetail';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import { projectData } from '@/data/projects';
import { translations } from '@/locales/translations';
import { setMedia } from './setup';

vi.mock('@/animations/hero', () => ({ animateHero: () => () => {} }));
vi.mock('@/hooks/usePortfolioMotion', () => ({ usePortfolioMotion: () => {} }));
vi.mock('@/components/DeferredGraphics', () => ({ default: () => null }));

beforeEach(() => {
  setMedia('(min-width: 768px)', false);
  vi.stubGlobal('scrollTo', vi.fn());
});

function renderRoutes(initial: string) {
  return render(<MemoryRouter initialEntries={[initial]}><ThemeProvider><LanguageProvider>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </LanguageProvider></ThemeProvider></MemoryRouter>);
}

describe('project detail page', () => {
  it('opens a dedicated page with project information and working external links', () => {
    const { container } = renderRoutes('/');
    fireEvent.click(screen.getByRole('link', { name: 'Conhecer projeto: ANS Healthcare Analytics' }));
    expect(container.querySelector('#projects')).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('ANS Healthcare Analytics');
    expect(screen.getByRole('heading', { level: 1 })).toHaveFocus();
    expect(screen.getByText(translations.pt.projects.items[3].story)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Captura de tela do projeto ANS/ })).toHaveAttribute('src', '/ansanalytics.webp');
    expect(screen.getByRole('link', { name: /Visitar site/ })).toHaveAttribute('href', 'https://ansanalytics.vercel.app');
    expect(screen.getByRole('link', { name: /Código/ })).toHaveAttribute('href', 'https://github.com/NicolasHarnisch/health-data-analysis');
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
  });

  it.each(projectData.map(project => project.id))('supports a direct project URL: %s', id => {
    renderRoutes(`/projects/${id}`);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(translations.pt.projects.items.find(item => item.id === id)!.title);
    expect(screen.getByRole('heading', { name: 'Tecnologias utilizadas' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Voltar aos projetos' })).toHaveAttribute('href', '/#projects');
  });

  it('returns to projects without replaying the robot loading cover', () => {
    setMedia('(min-width: 768px)', true);
    vi.stubGlobal('WebGLRenderingContext', class {});
    renderRoutes('/projects/ans');
    fireEvent.click(screen.getByRole('link', { name: 'Voltar aos projetos' }));
    expect(screen.getByRole('heading', { name: 'Projetos em Destaque' })).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('switches language and resets the page when advancing to another project', () => {
    renderRoutes('/projects/opnora');
    fireEvent.click(screen.getByRole('button', { name: 'Switch to English' }));
    expect(screen.getByRole('heading', { name: 'Technologies used' })).toBeInTheDocument();
    const previousMain = screen.getByRole('main');
    fireEvent.click(screen.getByRole('link', { name: 'Next project TV Russas' }));
    expect(screen.getByRole('main')).not.toBe(previousMain);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('TV Russas');
    expect(screen.getByRole('heading', { level: 1 })).toHaveFocus();
  });

  it('shows 404 for an unknown project', () => {
    renderRoutes('/projects/unknown');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404');
  });
});
