import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SplineScene from '@/components/SplineScene';

const state = vi.hoisted(() => ({ onLoad: null as null | ((runtime: { play: () => void; stop: () => void }) => void) }));
vi.mock('@splinetool/react-spline', () => ({
  default: ({ onLoad }: { onLoad: typeof state.onLoad }) => {
    state.onLoad = onLoad;
    return <div data-testid="spline-runtime" />;
  },
}));

describe('Spline lifecycle', () => {
  it.each([true, false])('reports readiness after two rendering frames with visible=%s', visible => {
    const frames = new Map<number, FrameRequestCallback>();
    let nextFrame = 0;
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      frames.set(++nextFrame, callback); return nextFrame;
    });
    vi.stubGlobal('cancelAnimationFrame', (id: number) => frames.delete(id));
    const onSettled = vi.fn();
    const runtime = { play: vi.fn(), stop: vi.fn() };
    render(<SplineScene visible={visible} onSettled={onSettled} />);
    act(() => state.onLoad?.(runtime));
    const tick = () => act(() => {
      const pending = [...frames.values()]; frames.clear(); pending.forEach(callback => callback(16));
    });
    expect(onSettled).not.toHaveBeenCalled();
    tick();
    expect(onSettled).not.toHaveBeenCalled();
    tick();
    expect(onSettled).toHaveBeenCalledTimes(1);
    expect(onSettled).toHaveBeenCalledWith('ready');
    if (!visible) {
      expect(runtime.play).not.toHaveBeenCalled();
      expect(runtime.stop).toHaveBeenCalled();
    }
  });
  it('reports a failed load and ignores a late success callback', () => {
    vi.useFakeTimers();
    const onSettled = vi.fn();
    render(<SplineScene onSettled={onSettled} />);
    act(() => vi.advanceTimersByTime(15000));
    expect(onSettled).toHaveBeenCalledTimes(1);
    expect(onSettled).toHaveBeenCalledWith('unavailable');
    act(() => state.onLoad?.({ play: vi.fn(), stop: vi.fn() }));
    act(() => vi.advanceTimersByTime(100));
    expect(onSettled).toHaveBeenCalledTimes(1);
  });
  it('pauses offscreen and resumes the same mounted scene', () => {
    const runtime = { play: vi.fn(), stop: vi.fn() };
    const { rerender } = render(<SplineScene visible />);
    act(() => state.onLoad?.(runtime));
    const scene = screen.getByTestId('spline-runtime');
    expect(runtime.play).toHaveBeenCalled();
    rerender(<SplineScene visible={false} />);
    expect(runtime.stop).toHaveBeenCalled();
    rerender(<SplineScene visible />);
    expect(screen.getByTestId('spline-runtime')).toBe(scene);
    expect(runtime.play).toHaveBeenCalledTimes(2);
  });
  it('pauses when the browser document is hidden', () => {
    const runtime = { play: vi.fn(), stop: vi.fn() };
    render(<SplineScene />);
    act(() => state.onLoad?.(runtime));
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' });
    act(() => document.dispatchEvent(new Event('visibilitychange')));
    expect(runtime.stop).toHaveBeenCalled();
  });
  it('ends a failed load without blocking portfolio content', () => {
    vi.useFakeTimers();
    render(<><p>Portfolio content</p><SplineScene /></>);
    act(() => vi.advanceTimersByTime(15000));
    expect(screen.queryByTestId('spline-runtime')).not.toBeInTheDocument();
    expect(screen.getByText('Portfolio content')).toBeInTheDocument();
  });
  it('clears the pending load timeout when unmounted', () => {
    vi.useFakeTimers();
    const { unmount } = render(<SplineScene />);
    expect(vi.getTimerCount()).toBe(1);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
  it('reuses the loaded canvas and runtime across route unmounts instead of reloading', () => {
    const wrapper = document.createElement('div');
    const canvas = document.createElement('canvas');
    wrapper.appendChild(canvas);
    const runtime = {
      canvas,
      play: vi.fn(),
      stop: vi.fn(),
      dispose: vi.fn(),
    };
    const { unmount } = render(<SplineScene visible />);
    act(() => state.onLoad?.(runtime as unknown as { play: () => void; stop: () => void }));
    unmount();
    runtime.dispose();
    expect(runtime.stop).toHaveBeenCalled();

    const second = render(<SplineScene visible />);
    expect(second.container.querySelector('canvas')).toBe(canvas);
    expect(second.queryByTestId('spline-runtime')).not.toBeInTheDocument();
  });
});
