import {renderHook} from '@testing-library/react';
import {fireEvent} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import {useEscKeyDown} from './use-esc-keydown';

describe('useEscKeyDown', () => {
  it('adds event listener when isActive is true', () => {
    const onClose = vi.fn();
    const addSpy = vi.spyOn(window, 'addEventListener');

    renderHook(() => {
      useEscKeyDown(true, onClose);
    });

    expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('does not call onClose when isActive is false and Escape is pressed', () => {
    const onClose = vi.fn();

    renderHook(() => {
      useEscKeyDown(false, onClose);
    });

    fireEvent.keyDown(window, {key: 'Escape'});

    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();

    renderHook(() => {
      useEscKeyDown(true, onClose);
    });

    fireEvent.keyDown(window, {key: 'Escape'});

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('removes event listener on cleanup', () => {
    const onClose = vi.fn();
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const {unmount} = renderHook(() => {
      useEscKeyDown(true, onClose);
    });

    unmount();

    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('removes listener when isActive changes to false', () => {
    const onClose = vi.fn();
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const {rerender} = renderHook(
      ({isActive}) => {
        useEscKeyDown(isActive, onClose);
      },
      {initialProps: {isActive: true}},
    );

    rerender({isActive: false});

    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});
