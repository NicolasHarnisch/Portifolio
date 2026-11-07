import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '@/contexts/theme-provider';
import { useThemeToggle } from '@/hooks/useThemeToggle';
import { setMedia } from './setup';

function Toggle() {
  const { resolvedTheme, toggleTheme } = useThemeToggle();
  return <button onClick={toggleTheme}>{resolvedTheme}</button>;
}
describe('stable theme transitions', () => {
  afterEach(() => {
    Reflect.deleteProperty(document, 'startViewTransition');
    Reflect.deleteProperty(document.documentElement, 'animate');
  });
  it('switches immediately for reduced motion, without requesting a transition', () => {
    setMedia('(prefers-reduced-motion: reduce)', true);
    const start = vi.fn();
    Object.defineProperty(document, 'startViewTransition', { configurable: true, value: start });
    render(<ThemeProvider><Toggle /></ThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'dark' }));
    expect(document.documentElement).toHaveClass('light');
    expect(start).not.toHaveBeenCalled();
  });
  it('keeps the selected theme when transition readiness rejects', async () => {
    Object.defineProperty(document.documentElement, 'animate', { configurable: true, value: vi.fn() });
    Object.defineProperty(document, 'startViewTransition', { configurable: true, value: (update: () => void) => {
      update(); return { ready: Promise.reject(new Error('interrupted')) };
    } });
    render(<ThemeProvider><Toggle /></ThemeProvider>);
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'dark' })); });
    expect(document.documentElement).toHaveClass('light');
  });
});
