import {renderHook} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import {useFocusRestore} from './use-focus-restore';

describe('useFocusRestore', () => {
  it('saves active element when isOpen becomes true', () => {
    const button = document.createElement('button');
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(button);

    renderHook(() => {
      useFocusRestore(true);
    });

    expect(document.activeElement).toBe(button);
  });

  it('restores focus to saved element on cleanup when isOpen changes to false', () => {
    const button = document.createElement('button');
    const focusSpy = vi.spyOn(button, 'focus');
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(button);

    const {rerender} = renderHook(
      ({isOpen}) => {
        useFocusRestore(isOpen);
      },
      {initialProps: {isOpen: true}},
    );

    rerender({isOpen: false});

    expect(focusSpy).toHaveBeenCalledTimes(1);
  });

  it('restores focus to saved element on unmount', () => {
    const button = document.createElement('button');
    const focusSpy = vi.spyOn(button, 'focus');
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(button);

    const {unmount} = renderHook(() => {
      useFocusRestore(true);
    });

    unmount();

    expect(focusSpy).toHaveBeenCalledTimes(1);
  });

  it('does not call focus on unmount when isOpen was never true', () => {
    const {unmount} = renderHook(() => {
      useFocusRestore(false);
    });

    unmount();
  });
});
