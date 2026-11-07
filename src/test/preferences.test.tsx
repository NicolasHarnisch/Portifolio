import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/contexts/theme-provider';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { setMedia } from './setup';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

function Preferences() {
  const { resolvedTheme, setTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  return <><button onClick={() => setTheme('light')}>{resolvedTheme}</button><button onClick={toggleLanguage}>{language}</button></>;
}
const renderPreferences = () => render(<ThemeProvider><LanguageProvider><Preferences /></LanguageProvider></ThemeProvider>);

describe('safe preferences', () => {
  it('renders and changes preferences when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new DOMException('blocked'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new DOMException('blocked'); });
    renderPreferences();
    fireEvent.click(screen.getByRole('button', { name: 'dark' }));
    expect(document.documentElement).toHaveClass('light');
    fireEvent.click(screen.getByRole('button', { name: 'pt' }));
    expect(document.documentElement.lang).toBe('en');
  });
  it('rejects an invalid saved theme', () => {
    localStorage.setItem('vite-ui-theme', 'not-a-theme');
    renderPreferences();
    expect(document.documentElement).toHaveClass('dark');
  });
  it('updates the system theme without reloading', () => {
    localStorage.setItem('vite-ui-theme', 'system');
    renderPreferences();
    expect(document.documentElement).toHaveClass('light');
    act(() => setMedia('(prefers-color-scheme: dark)', true));
    expect(document.documentElement).toHaveClass('dark');
  });
  it('restores the saved language', () => {
    localStorage.setItem('portfolio-language', 'en');
    renderPreferences();
    expect(document.documentElement.lang).toBe('en');
    fireEvent.click(screen.getByRole('button', { name: 'en' }));
    expect(localStorage.getItem('portfolio-language')).toBe('pt');
  });
});

function Reveal() {
  const { ref, isVisible } = useScrollAnimation();
  return <div ref={ref} data-testid="reveal" data-visible={isVisible} />;
}
describe('accessible reveal', () => {
  it('does not hide content without IntersectionObserver', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(<Reveal />);
    expect(screen.getByTestId('reveal')).toHaveAttribute('data-visible', 'true');
  });
  it('shows content immediately for reduced motion', () => {
    setMedia('(prefers-reduced-motion: reduce)', true);
    render(<Reveal />);
    expect(screen.getByTestId('reveal')).toHaveAttribute('data-visible', 'true');
  });
});
