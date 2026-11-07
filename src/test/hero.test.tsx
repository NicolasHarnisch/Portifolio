import { act, fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Hero from '@/components/Hero';
import { LanguageProvider } from '@/contexts/LanguageContext';

vi.mock('@/animations/hero', () => ({ animateHero: () => () => {} }));
vi.mock('@/components/DeferredGraphics', () => ({ default: () => null }));

describe('hero pointer animation', () => {
  it('responds to the pointer again after a pending frame is cancelled by hiding the tab', () => {
    const frames = new Map<number, FrameRequestCallback>();
    let nextFrame = 0;
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      frames.set(++nextFrame, callback);
      return nextFrame;
    });
    vi.stubGlobal('cancelAnimationFrame', (id: number) => frames.delete(id));
    const { container } = render(<LanguageProvider><Hero /></LanguageProvider>);
    const hero = container.querySelector('section')!;

    fireEvent.mouseMove(window, { clientX: 100, clientY: 100 });
    expect(frames.size).toBe(1);
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' });
    fireEvent(document, new Event('visibilitychange'));
    expect(frames.size).toBe(0);

    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' });
    fireEvent(document, new Event('visibilitychange'));
    fireEvent.mouseMove(window, { clientX: window.innerWidth * 0.75, clientY: window.innerHeight * 0.5 });
    act(() => {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach(callback => callback(16));
    });
    expect(hero.style.getPropertyValue('--px-main')).toBe('5.00px');
    expect(hero.style.getPropertyValue('--py-main')).toBe('0.00px');
  });
});
