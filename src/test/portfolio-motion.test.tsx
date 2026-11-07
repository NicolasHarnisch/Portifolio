import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { usePortfolioMotion } from '@/hooks/usePortfolioMotion';
import { setMedia } from './setup';

const engine = vi.hoisted(() => ({ setup: vi.fn(), cleanup: vi.fn() }));
vi.mock('@/animations/portfolio', () => ({ setupPortfolioMotion: engine.setup }));

beforeEach(() => {
  engine.setup.mockReset().mockReturnValue(engine.cleanup);
  engine.cleanup.mockReset();
});

describe('optional scroll animation lifecycle', () => {
  it('starts the scroll engine only after the initial cover releases the page', async () => {
    const ref = { current: document.createElement('main') };
    const { rerender } = renderHook(({ enabled }) => usePortfolioMotion(ref, 'pt', enabled), {
      initialProps: { enabled: false },
    });
    await act(async () => { await import('@/animations/portfolio'); });
    expect(engine.setup).not.toHaveBeenCalled();
    rerender({ enabled: true });
    await waitFor(() => expect(engine.setup).toHaveBeenCalledTimes(1));
  });
  it('does not initialize after the page has unmounted during loading', async () => {
    const ref = { current: document.createElement('main') };
    const { unmount } = renderHook(() => usePortfolioMotion(ref, 'pt'));
    unmount();
    await act(async () => { await import('@/animations/portfolio'); });
    expect(engine.setup).not.toHaveBeenCalled();
  });

  it('releases the previous animations before rebuilding for another language', async () => {
    const ref = { current: document.createElement('main') };
    const { rerender, unmount } = renderHook(({ language }) => usePortfolioMotion(ref, language), {
      initialProps: { language: 'pt' },
    });
    await waitFor(() => expect(engine.setup).toHaveBeenCalledTimes(1));
    rerender({ language: 'en' });
    await waitFor(() => expect(engine.setup).toHaveBeenCalledTimes(2));
    expect(engine.cleanup).toHaveBeenCalledTimes(1);
    unmount();
    expect(engine.cleanup).toHaveBeenCalledTimes(2);
  });

  it('skips setup for reduced motion and cleans up when that preference changes', async () => {
    setMedia('(prefers-reduced-motion: reduce)', true);
    const ref = { current: document.createElement('main') };
    renderHook(() => usePortfolioMotion(ref, 'pt'));
    await act(async () => { await import('@/animations/portfolio'); });
    expect(engine.setup).not.toHaveBeenCalled();
    act(() => setMedia('(prefers-reduced-motion: reduce)', false));
    await waitFor(() => expect(engine.setup).toHaveBeenCalledTimes(1));
    act(() => setMedia('(prefers-reduced-motion: reduce)', true));
    expect(engine.cleanup).toHaveBeenCalledTimes(1);
  });
});
