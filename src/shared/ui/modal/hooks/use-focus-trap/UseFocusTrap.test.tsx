import {renderHook, render, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {useFocusTrap} from './use-focus-trap';

const {mockGetFocusableElements} = vi.hoisted(() => ({
  mockGetFocusableElements: vi.fn(),
}));

vi.mock('@/shared/lib/get-focusable-elements', () => ({
  getFocusableElements: mockGetFocusableElements,
}));

function renderDialog() {
  const hookResult = renderHook(useFocusTrap);
  const dialogRef = hookResult.result.current[0];
  const focusFirstElement = hookResult.result.current[1];
  const handleKeyDown = hookResult.result.current[2];

  const view = render(
    <dialog ref={dialogRef} onKeyDown={handleKeyDown} />,
  );

  const dialog = dialogRef.current;

  if (!dialog) {
    throw new Error('dialog ref not set');
  }

  return {dialog, dialogRef, focusFirstElement, handleKeyDown, ...view, ...hookResult};
}

describe('useFocusTrap', () => {
  beforeEach(() => {
    mockGetFocusableElements.mockReset();
  });

  describe('focusFirstElement', () => {
    it('focuses the first focusable element with focusVisible', () => {
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      const focusSpy = vi.spyOn(button1, 'focus');
      mockGetFocusableElements.mockReturnValue([button1, button2]);

      const {focusFirstElement} = renderDialog();
      focusFirstElement();

      expect(focusSpy).toHaveBeenCalledWith({focusVisible: true});
    });

    it('does nothing when there are no focusable elements', () => {
      mockGetFocusableElements.mockReturnValue([]);

      const {focusFirstElement} = renderDialog();
      focusFirstElement();
    });
  });

  describe('handleKeyDown', () => {
    it('ignores non-Tab keys', () => {
      const {dialog} = renderDialog();

      mockGetFocusableElements.mockReturnValue([document.createElement('button')]);

      fireEvent.keyDown(dialog, {key: 'Enter'});
    });

    it('does nothing when there are no focusable elements', () => {
      mockGetFocusableElements.mockReturnValue([]);

      const {dialog} = renderDialog();
      fireEvent.keyDown(dialog, {key: 'Tab'});
    });

    it('traps Tab from last element to first', () => {
      const firstButton = document.createElement('button');
      const lastButton = document.createElement('button');
      const focusSpy = vi.spyOn(firstButton, 'focus');
      mockGetFocusableElements.mockReturnValue([firstButton, lastButton]);
      vi.spyOn(document, 'activeElement', 'get').mockReturnValue(lastButton);

      const {dialog} = renderDialog();
      fireEvent.keyDown(dialog, {key: 'Tab'});

      expect(focusSpy).toHaveBeenCalled();
    });

    it('does not intervene on Tab from non-last element', () => {
      const firstButton = document.createElement('button');
      const lastButton = document.createElement('button');
      const focusSpy = vi.spyOn(firstButton, 'focus');
      mockGetFocusableElements.mockReturnValue([firstButton, lastButton]);
      vi.spyOn(document, 'activeElement', 'get').mockReturnValue(firstButton);

      const {dialog} = renderDialog();
      fireEvent.keyDown(dialog, {key: 'Tab'});

      expect(focusSpy).not.toHaveBeenCalled();
    });

    it('traps Shift+Tab from first element to last', () => {
      const firstButton = document.createElement('button');
      const lastButton = document.createElement('button');
      const focusSpy = vi.spyOn(lastButton, 'focus');
      mockGetFocusableElements.mockReturnValue([firstButton, lastButton]);
      vi.spyOn(document, 'activeElement', 'get').mockReturnValue(firstButton);

      const {dialog} = renderDialog();
      fireEvent.keyDown(dialog, {key: 'Tab', shiftKey: true});

      expect(focusSpy).toHaveBeenCalled();
    });

    it('does not intervene on Shift+Tab from non-first element', () => {
      const firstButton = document.createElement('button');
      firstButton.name = 'first';
      const lastButton = document.createElement('button');
      lastButton.name = 'last';
      const focusSpy = vi.spyOn(lastButton, 'focus');
      mockGetFocusableElements.mockReturnValue([firstButton, lastButton]);
      vi.spyOn(document, 'activeElement', 'get').mockReturnValue(lastButton);

      const {dialog} = renderDialog();
      fireEvent.keyDown(dialog, {key: 'Tab', shiftKey: true});

      expect(focusSpy).not.toHaveBeenCalled();
    });

    it('traps Shift+Tab when activeElement name matches firstElement name', () => {
      const firstButton = document.createElement('button');
      firstButton.name = 'date-input';
      const lastButton = document.createElement('button');
      const focusSpy = vi.spyOn(lastButton, 'focus');
      mockGetFocusableElements.mockReturnValue([firstButton, lastButton]);

      const differentNode = document.createElement('input');
      differentNode.name = 'date-input';
      vi.spyOn(document, 'activeElement', 'get').mockReturnValue(differentNode);

      const {dialog} = renderDialog();
      fireEvent.keyDown(dialog, {key: 'Tab', shiftKey: true});

      expect(focusSpy).toHaveBeenCalled();
    });
  });
});
