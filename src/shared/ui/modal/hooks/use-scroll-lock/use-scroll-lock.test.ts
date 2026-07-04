import {renderHook} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import {useScrollLock} from './use-scroll-lock';
import {SCROLL_LOCK_CLASS, SCROLL_LOCK_CLASS_IOS} from '../../config';

describe('useScrollLock', () => {
  beforeEach(() => {
    document.body.className = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('adds scroll-lock class when isActive is true on non-iOS', () => {
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0');

    renderHook(() => {
      useScrollLock(true);
    });

    expect(document.body.classList.contains(SCROLL_LOCK_CLASS)).toBe(true);
    expect(document.body.classList.contains(SCROLL_LOCK_CLASS_IOS)).toBe(false);
  });

  it('adds scroll-lock-ios class when isActive is true on iOS', () => {
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
    );

    renderHook(() => {
      useScrollLock(true);
    });

    expect(document.body.classList.contains(SCROLL_LOCK_CLASS_IOS)).toBe(true);
    expect(document.body.classList.contains(SCROLL_LOCK_CLASS)).toBe(false);
  });

  it('does not add classes when isActive is false', () => {
    renderHook(() => {
      useScrollLock(false);
    });

    expect(document.body.classList.contains(SCROLL_LOCK_CLASS)).toBe(false);
    expect(document.body.classList.contains(SCROLL_LOCK_CLASS_IOS)).toBe(false);
  });

  it('removes classes on cleanup when isActive is true', () => {
    const {unmount} = renderHook(() => {
      useScrollLock(true);
    });

    document.body.classList.add('scroll-lock');

    unmount();

    expect(document.body.classList.contains(SCROLL_LOCK_CLASS)).toBe(false);
    expect(document.body.classList.contains(SCROLL_LOCK_CLASS_IOS)).toBe(false);
  });

  it('removes both classes when isActive changes to false', () => {
    const {rerender} = renderHook(
      ({isActive}) => {
        useScrollLock(isActive);
      },
      {initialProps: {isActive: true}},
    );

    rerender({isActive: false});

    expect(document.body.classList.contains(SCROLL_LOCK_CLASS)).toBe(false);
    expect(document.body.classList.contains(SCROLL_LOCK_CLASS_IOS)).toBe(false);
  });

  it('removes both classes regardless of which was added', () => {
    document.body.classList.add('scroll-lock-ios');

    const {unmount} = renderHook(() => {
      useScrollLock(true);
    });

    unmount();

    expect(document.body.classList.contains(SCROLL_LOCK_CLASS)).toBe(false);
    expect(document.body.classList.contains(SCROLL_LOCK_CLASS_IOS)).toBe(false);
  });
});
