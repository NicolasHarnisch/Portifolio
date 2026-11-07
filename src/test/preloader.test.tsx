import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Index from '@/pages/Index';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/theme-provider';
import { SCENE_LOAD_DEADLINE } from '@/components/Preloader';
import type { GraphicLoadResult } from '@/hooks/useSplineEligibility';
import { setMedia } from './setup';
import { MemoryRouter } from 'react-router-dom';

const scene = vi.hoisted(() => ({
  settle: undefined as undefined | ((result: GraphicLoadResult) => void),
  intro: vi.fn(),
}));
vi.mock('@/hooks/usePortfolioMotion', () => ({ usePortfolioMotion: () => {} }));
vi.mock('@/animations/hero', () => ({ animateHero: () => { scene.intro(); return () => {}; } }));
vi.mock('@/components/DeferredGraphics', () => ({
  default: ({ kind, onSettled }: { kind: string; onSettled?: typeof scene.settle }) => {
    if (kind === 'spline') scene.settle = onSettled;
    return null;
  },
}));

beforeEach(() => {
  vi.stubGlobal('WebGLRenderingContext', class {});
  vi.stubGlobal('scrollY', 0);
  scene.settle = undefined;
  scene.intro.mockClear();
});
afterEach(() => window.history.replaceState(null, '', '/'));

function renderPage() {
  return render(<MemoryRouter initialEntries={[`/${window.location.hash}`]}><ThemeProvider><LanguageProvider><Index /></LanguageProvider></ThemeProvider></MemoryRouter>);
}

describe('initial loading cover', () => {
  it('waits for the robot and plays the intro after unlocking the page', () => {
    const { container } = renderPage();
    expect(screen.getByRole('dialog')).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Pular' })).not.toHaveFocus();
    expect(container.querySelector('#top')).toHaveAttribute('inert');
    expect(document.body.style.overflow).toBe('hidden');
    expect(scene.intro).not.toHaveBeenCalled();

    act(() => scene.settle?.('ready'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(container.querySelector('#top')).not.toHaveAttribute('inert');
    expect(document.body.style.overflow).toBe('');
    expect(document.body).toHaveFocus();
    expect(screen.getByRole('main')).not.toHaveFocus();
    expect(scene.intro).toHaveBeenCalledTimes(1);
  });

  it('unlocks the content when the scene fails', () => {
    renderPage();
    act(() => scene.settle?.('unavailable'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver projetos' })).toBeInTheDocument();
  });

  it.each(['mobile', 'reduced motion'])('does not wait for a disabled robot: %s', mode => {
    setMedia(mode === 'mobile' ? '(min-width: 768px)' : '(prefers-reduced-motion: reduce)', mode !== 'mobile');
    renderPage();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it.each(['#projects', '#about'])('waits for the robot without changing the section URL: %s', hash => {
    window.history.replaceState(null, '', hash);
    vi.stubGlobal('scrollY', 1500);
    renderPage();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    act(() => scene.settle?.('ready'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(window.location.hash).toBe(hash);
    expect(window.scrollY).toBe(1500);
    expect(document.body).toHaveFocus();
  });

  it('focuses the skip button only when the visitor presses Tab', () => {
    renderPage();
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Tab' });
    expect(screen.getByRole('button', { name: 'Pular' })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole('button', { name: 'Pular' }), { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body).toHaveFocus();
  });

  it('unlocks on the overall deadline even if the optional module never responds', () => {
    vi.useFakeTimers();
    renderPage();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(SCENE_LOAD_DEADLINE));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });

  it('lets the visitor continue without waiting for the robot', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Pular' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
