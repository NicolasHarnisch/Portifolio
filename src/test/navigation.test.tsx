import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import BottomNav from '@/components/BottomNav';
import { ThemeProvider } from '@/contexts/theme-provider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useNavigationState } from '@/hooks/useNavigationState';

describe('mobile navigation', () => {
  it('hides closed controls and closes with Escape, restoring focus', () => {
    render(<ThemeProvider><LanguageProvider><BottomNav /></LanguageProvider></ThemeProvider>);
    const trigger = screen.getByRole('button', { name: 'Abrir menu' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('link', { name: 'Projetos' })).not.toBeInTheDocument();
    fireEvent.click(trigger);
    expect(screen.getByRole('link', { name: 'Projetos' })).toHaveAttribute('href', '#projects');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
  it('closes after a native hash link, preserving real link semantics', () => {
    render(<ThemeProvider><LanguageProvider><BottomNav /></LanguageProvider></ThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
    fireEvent.click(screen.getByRole('link', { name: 'Sobre' }));
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false');
  });
  it('closes on an outside pointer click', () => {
    render(<ThemeProvider><LanguageProvider><BottomNav /></LanguageProvider></ThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
    fireEvent.pointerDown(document.body);
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false');
  });
  it('uses document rectangles, not nested offsetTop, in section order', () => {
    const ids = ['projects', 'about', 'experience', 'stack', 'contact'];
    const elements = ids.map((id, index) => {
      const node = document.createElement('section');
      node.id = id;
      vi.spyOn(node, 'getBoundingClientRect').mockReturnValue({ top: index < 2 ? -100 : 800 } as DOMRect);
      document.body.append(node);
      return node;
    });
    const { result } = renderHook(() => useNavigationState());
    expect(result.current.activeSection).toBe('about');
    act(() => fireEvent.scroll(window));
    elements.forEach(node => node.remove());
  });
});
