import type {TransitionEvent} from 'react';
import {renderHook, act} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import {useModal} from './use-modal';

vi.mock('../use-esc-keydown/use-esc-keydown');
vi.mock('../use-scroll-lock/use-scroll-lock');

describe('useModal', () => {
  let rafCbs: FrameRequestCallback[];

  beforeEach(() => {
    rafCbs = [];

    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(
      (cb: FrameRequestCallback) => {
        rafCbs.push(cb);
        return rafCbs.length;
      },
    );

    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const flushRaf = () => {
    act(() => {
      while (rafCbs.length > 0) {
        const batch = [...rafCbs];
        rafCbs = [];
        for (const cb of batch) {
          cb(performance.now());
        }
      }
    });
  };

  it('sets isMounted initially from isOpen prop (true)', () => {
    const {result} = renderHook(() => useModal(true, vi.fn(), vi.fn()));

    expect(result.current[1]).toBe(true);
    expect(result.current[0]).toBe(false);
  });

  it('sets isMounted initially from isOpen prop (false)', () => {
    const {result} = renderHook(() => useModal(false, vi.fn(), vi.fn()));

    expect(result.current[1]).toBe(false);
    expect(result.current[0]).toBe(false);
  });

  it('activates isActive after two RAFs when isOpen is true', () => {
    const {result} = renderHook(() => useModal(true, vi.fn(), vi.fn()));

    flushRaf();
    flushRaf();

    expect(result.current[0]).toBe(true);
  });

  it('deactivates isActive after two RAFs when isOpen changes to false', () => {
    const {result, rerender} = renderHook(
      ({isOpen}) => useModal(isOpen, vi.fn(), vi.fn()),
      {initialProps: {isOpen: true}},
    );

    flushRaf();
    flushRaf();

    rerender({isOpen: false});
    flushRaf();
    flushRaf();

    expect(result.current[0]).toBe(false);
  });

  it('calls focusCb on handleTransitionEnd when isActive is true', () => {
    const focusCb = vi.fn();
    const {result} = renderHook(() => useModal(true, vi.fn(), focusCb));

    flushRaf();
    flushRaf();

    const el = document.createElement('div');

    act(() => {
      result.current[2]({
        target: el,
        currentTarget: el,
      } as unknown as TransitionEvent);
    });

    expect(focusCb).toHaveBeenCalledTimes(1);
  });

  it('does not call focusCb on handleTransitionEnd when isActive is false', () => {
    const focusCb = vi.fn();
    const {result, rerender} = renderHook(
      ({isOpen}) => useModal(isOpen, vi.fn(), focusCb),
      {initialProps: {isOpen: true}},
    );

    flushRaf();
    flushRaf();

    rerender({isOpen: false});
    flushRaf();
    flushRaf();

    const el = document.createElement('div');

    act(() => {
      result.current[2]({
        target: el,
        currentTarget: el,
      } as unknown as TransitionEvent);
    });

    expect(focusCb).not.toHaveBeenCalled();
  });

  it('sets isMounted to false on handleTransitionEnd when isActive is false', () => {
    const {result, rerender} = renderHook(
      ({isOpen}) => useModal(isOpen, vi.fn(), vi.fn()),
      {initialProps: {isOpen: true}},
    );

    flushRaf();
    flushRaf();

    rerender({isOpen: false});
    flushRaf();
    flushRaf();

    expect(result.current[1]).toBe(true);

    const el = document.createElement('div');

    act(() => {
      result.current[2]({
        target: el,
        currentTarget: el,
      } as unknown as TransitionEvent);
    });

    expect(result.current[1]).toBe(false);
  });

  it('early returns from handleTransitionEnd when target does not match currentTarget', () => {
    const focusCb = vi.fn();
    const onTransitionEnd = vi.fn();
    const {result} = renderHook(() => useModal(true, vi.fn(), focusCb, onTransitionEnd));

    flushRaf();
    flushRaf();

    act(() => {
      result.current[2]({
        target: document.createElement('div'),
        currentTarget: document.createElement('span'),
      } as unknown as TransitionEvent);
    });

    expect(focusCb).not.toHaveBeenCalled();
    expect(onTransitionEnd).not.toHaveBeenCalled();
  });

  it('calls onTransitionEnd callback when provided', () => {
    const onTransitionEnd = vi.fn();
    const {result} = renderHook(() => useModal(true, vi.fn(), vi.fn(), onTransitionEnd));

    flushRaf();
    flushRaf();

    const el = document.createElement('div');

    act(() => {
      result.current[2]({
        target: el,
        currentTarget: el,
      } as unknown as TransitionEvent);
    });

    expect(onTransitionEnd).toHaveBeenCalledTimes(1);
  });

  it('cancels pending RAFs on unmount', () => {
    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame');

    const {unmount} = renderHook(() => useModal(true, vi.fn(), vi.fn()));

    unmount();

    expect(cancelSpy).toHaveBeenCalled();
  });
});
