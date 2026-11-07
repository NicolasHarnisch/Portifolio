import { act, fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ScrollProgress from '@/components/ScrollProgress';
import { setMedia } from './setup';

function pageHeight(height: number) {
  vi.stubGlobal('innerHeight', 1000);
  return vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(height);
}

describe('scroll progress', () => {
  it('clamps overscroll and updates the transform while keeping its full width', () => {
    pageHeight(2000);
    vi.stubGlobal('scrollY', 500);
    let pending: FrameRequestCallback | undefined;
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => { pending = callback; return 0; });
    const { container } = render(<ScrollProgress />);
    const bar = container.querySelector<HTMLElement>('#scroll-progress')!;
    expect(bar.style.transform).toBe('scaleX(0.5)');
    for (const [scroll, expected] of [[2000, 'scaleX(1)'], [-100, 'scaleX(0)']] as const) {
      vi.stubGlobal('scrollY', scroll);
      fireEvent.scroll(window);
      act(() => { pending?.(16); });
      expect(bar.style.transform).toBe(expected);
      expect(bar.style.width).toBe('100%');
    }
  });

  it('recalculates after resizing and cancels a pending frame on unmount, including id zero', () => {
    const height = pageHeight(2000);
    vi.stubGlobal('scrollY', 500);
    let pending: FrameRequestCallback | undefined;
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => { pending = callback; return 0; });
    const cancel = vi.fn();
    vi.stubGlobal('cancelAnimationFrame', cancel);
    const { container, unmount } = render(<ScrollProgress />);
    height.mockReturnValue(3000);
    fireEvent.resize(window);
    act(() => { pending?.(16); });
    expect(container.querySelector<HTMLElement>('#scroll-progress')!.style.transform).toBe('scaleX(0.25)');
    fireEvent.scroll(window);
    unmount();
    expect(cancel).toHaveBeenCalledWith(0);
  });

  it('omits the indicator when reduced motion is requested', () => {
    setMedia('(prefers-reduced-motion: reduce)', true);
    const { container } = render(<ScrollProgress />);
    expect(container).toBeEmptyDOMElement();
  });
});
