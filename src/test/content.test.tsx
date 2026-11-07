import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import Projects from '@/components/Projects';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { RESUME_URL } from '@/lib/links';
import Index from '@/pages/Index';
import { ThemeProvider } from '@/contexts/theme-provider';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@/animations/hero', () => ({ animateHero: () => () => {} }));
vi.mock('@/animations/cards', () => ({ setupCardHover: () => () => {} }));
vi.mock('@/components/DeferredGraphics', () => ({ default: () => null }));

describe('preserved content and functional links', () => {
  it('preserves page section order, hash targets, and clears a previous 404 noindex', () => {
    const robots = document.createElement('meta');
    robots.name = 'robots'; robots.content = 'noindex, follow'; document.head.append(robots);
    const { container } = render(<MemoryRouter><ThemeProvider><LanguageProvider><Index /></LanguageProvider></ThemeProvider></MemoryRouter>);
    expect(Array.from(container.querySelectorAll('main section[id], main footer[id]')).map(node => node.id))
      .toEqual(['projects', 'about', 'experience', 'stack', 'contact']);
    expect(container.querySelector('#top')).toBeInTheDocument();
    expect(container.querySelector('#main-content')).toHaveAttribute('tabindex', '-1');
    expect(document.querySelector('meta[name="robots"]')).toBeNull();
    expect(container.querySelector('a button, button a')).toBeNull();
  });
  it('keeps the six projects and their PT/EN identifier order', () => {
    const ids = ['opnora', 'tv-russas', 'tfbrand', 'ans', 'triagem', 'engremaq'];
    expect(translations.pt.projects.items.map(item => item.id)).toEqual(ids);
    expect(translations.en.projects.items.map(item => item.id)).toEqual(ids);
    render(<MemoryRouter><LanguageProvider><Projects /></LanguageProvider></MemoryRouter>);
    expect(screen.getAllByRole('heading', { level: 3 }).map(item => item.textContent)).toEqual(translations.pt.projects.items.map(item => item.title));
  });
  it('uses WebP images with intrinsic dimensions and async decoding', () => {
    const { container } = render(<MemoryRouter><LanguageProvider><Projects /></LanguageProvider></MemoryRouter>);
    const images = container.querySelectorAll('#projects img');
    expect(images).toHaveLength(6);
    for (const image of images) {
      expect(image.getAttribute('src')).toMatch(/\.webp$/);
      expect(Number(image.getAttribute('width'))).toBeGreaterThan(0);
      expect(Number(image.getAttribute('height'))).toBeGreaterThan(0);
      expect(image).toHaveAttribute('decoding', 'async');
    }
  });
  it('links every card to its own detail page, including work in development', () => {
    const { container } = render(<MemoryRouter><LanguageProvider><Projects /></LanguageProvider></MemoryRouter>);
    expect(screen.getAllByRole('link', { name: /Conhecer projeto/ })).toHaveLength(6);
    expect(screen.getByRole('link', { name: /Conhecer projeto: TFBrand/ })).toHaveAttribute('href', '/projects/tfbrand');
    expect(container.querySelector('a[href="#"]')).toBeNull();
    expect(container.querySelector('a button, button a')).toBeNull();
  });
  it('uses the same curriculum in Hero and Footer without nested actions', () => {
    const { container } = render(<LanguageProvider><Hero /><Footer /></LanguageProvider>);
    const resumes = screen.getAllByRole('link', { name: /Ver currículo/i });
    expect(resumes).toHaveLength(2);
    for (const resume of resumes) expect(resume).toHaveAttribute('href', RESUME_URL);
    expect(container.querySelector('a button, button a')).toBeNull();
  });
  it('renders the name, description and primary actions immediately', () => {
    render(<LanguageProvider><Hero /></LanguageProvider>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Nícolas GomesHarnisch');
    expect(screen.getByText(translations.pt.hero.description)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver currículo' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver projetos' })).toHaveAttribute('href', '#projects');
  });
});
