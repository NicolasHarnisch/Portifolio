import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DeferredGraphics from '@/components/DeferredGraphics';
import GraphicsBoundary from '@/components/GraphicsBoundary';
import { setMedia } from './setup';

vi.mock('@/components/SplineScene', () => ({
  default: ({ visible }: { visible: boolean }) => <div data-testid="spline" data-visible={visible} />,
}));
vi.mock('@/components/StarBackground', () => ({ default: () => <div data-testid="stars" /> }));
function supportWebGL() { vi.stubGlobal('WebGLRenderingContext', class {}); }

describe('optional graphics', () => {
  it('preloads an offscreen robot behind the initial cover without marking it as skipped', async () => {
    supportWebGL(); vi.useFakeTimers();
    const onSettled = vi.fn();
    render(<DeferredGraphics kind="spline" inView={false} eager onSettled={onSettled} />);
    await act(async () => { vi.advanceTimersByTime(1); });
    expect(screen.getByTestId('spline')).toHaveAttribute('data-visible', 'false');
    expect(onSettled).not.toHaveBeenCalled();
  });
  it('keeps an offscreen robot deferred when there is no initial cover', async () => {
    supportWebGL(); vi.useFakeTimers();
    render(<DeferredGraphics kind="spline" inView={false} />);
    await act(async () => { vi.advanceTimersByTime(20000); });
    expect(screen.queryByTestId('spline')).not.toBeInTheDocument();
  });
  it('reports an unavailable device as skipped instead of leaving the loader waiting', () => {
    supportWebGL(); setMedia('(min-width: 768px)', false);
    const onSettled = vi.fn();
    render(<DeferredGraphics kind="spline" inView onSettled={onSettled} />);
    expect(onSettled).toHaveBeenCalledTimes(1);
    expect(onSettled).toHaveBeenCalledWith('skipped');
  });
  it('starts an eligible scene immediately behind the initial loading cover', async () => {
    supportWebGL(); vi.useFakeTimers();
    render(<DeferredGraphics kind="spline" inView eager />);
    await act(async () => { vi.advanceTimersByTime(1); });
    expect(screen.getByTestId('spline')).toBeInTheDocument();
  });
  it('never mounts Spline on mobile, even on the first render', async () => {
    supportWebGL(); setMedia('(min-width: 768px)', false); vi.useFakeTimers();
    render(<DeferredGraphics kind="spline" inView />);
    await act(async () => { vi.advanceTimersByTime(20000); });
    expect(screen.queryByTestId('spline')).not.toBeInTheDocument();
  });
  it('does not mount Spline for reduced motion', async () => {
    supportWebGL(); setMedia('(prefers-reduced-motion: reduce)', true); vi.useFakeTimers();
    render(<DeferredGraphics kind="spline" inView />);
    await act(async () => { vi.advanceTimersByTime(20000); });
    expect(screen.queryByTestId('spline')).not.toBeInTheDocument();
  });
  it('does not start Spline while the page is hidden', async () => {
    supportWebGL(); vi.useFakeTimers();
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' });
    render(<DeferredGraphics kind="spline" inView />);
    await act(async () => { vi.advanceTimersByTime(20000); });
    expect(screen.queryByTestId('spline')).not.toBeInTheDocument();
  });
  it('does not mount graphics without WebGL support', () => {
    vi.stubGlobal('WebGLRenderingContext', undefined);
    render(<DeferredGraphics kind="stars" inView />);
    expect(screen.queryByTestId('stars')).not.toBeInTheDocument();
  });
  it('defers Spline until after the first render', async () => {
    supportWebGL(); vi.useFakeTimers();
    render(<DeferredGraphics kind="spline" inView />);
    expect(screen.queryByTestId('spline')).not.toBeInTheDocument();
    await act(async () => { vi.advanceTimersByTime(1200); });
    expect(screen.getByTestId('spline')).toBeInTheDocument();
  });
  it('does not start resources out of view', async () => {
    supportWebGL(); vi.useFakeTimers();
    render(<DeferredGraphics kind="stars" inView={false} />);
    await act(async () => { vi.advanceTimersByTime(20000); });
    expect(screen.queryByTestId('stars')).not.toBeInTheDocument();
  });
  it('isolates a failing optional graphic', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    function FailedGraphic(): never { throw new Error('unavailable'); }
    render(<><p>Portfolio content</p><GraphicsBoundary><FailedGraphic /></GraphicsBoundary></>);
    expect(screen.getByText('Portfolio content')).toBeInTheDocument();
  });
});
