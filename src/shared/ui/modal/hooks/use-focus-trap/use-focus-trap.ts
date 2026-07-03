import {getFocusableElements} from '@/shared/lib/get-focusable-elements';
import type {KeyboardEvent, RefObject} from 'react';
import {useRef} from 'react';

export const useFocusTrap = (): [
  RefObject<HTMLDialogElement | null>,
  () => void,
  (evt: KeyboardEvent<HTMLDialogElement>) => void,
] => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const focusFirstElement = () => {
    const focusableElements = getFocusableElements(modalRef.current);
    if (focusableElements.length > 0) {
      focusableElements[0].focus({focusVisible: true});
    }
  };

  const handleKeyDown = (evt: KeyboardEvent<HTMLDialogElement>) => {
    if (evt.key !== 'Tab') {
      return;
    }

    const focusableElements = getFocusableElements(modalRef.current);
    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (evt.shiftKey) {
      if (document.activeElement === firstElement ||
        (document.activeElement as HTMLInputElement).name === firstElement.name) {
        lastElement.focus();
        evt.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        evt.preventDefault();
      }
    }
  };

  return [modalRef, focusFirstElement, handleKeyDown];
};
