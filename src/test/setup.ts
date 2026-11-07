import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';
import { resetProjectVisitForTests } from '@/hooks/useSplineEligibility';

const matches = new Map<string, boolean>();
const listeners = new Map<string, Set<() => void>>();
export function setMedia(query: string, value: boolean) {
  matches.set(query, value);
  listeners.get(query)?.forEach(listener => listener());
}

beforeEach(() => {
  matches.clear();
  listeners.clear();
  matches.set('(min-width: 768px)', true);
  matches.set('(pointer: fine)', true);
  Object.defineProperty(window, 'matchMedia', { configurable: true, writable: true,
    value: vi.fn((query: string) => {
      if (!listeners.has(query)) listeners.set(query, new Set());
      return {
        media: query,
        get matches() { return matches.get(query) ?? false; },
        addEventListener: (_: string, listener: () => void) => listeners.get(query)!.add(listener),
        removeEventListener: (_: string, listener: () => void) => listeners.get(query)!.delete(listener),
      };
    }),
  });
  window.localStorage.clear();
  document.documentElement.className = '';
  document.documentElement.lang = 'pt-BR';
  Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' });
});

afterEach(() => {
  cleanup();
  resetProjectVisitForTests();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
