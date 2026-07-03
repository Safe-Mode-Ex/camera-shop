import type {TransitionEvent, TransitionEventHandler} from 'react';
import {useState, useEffect} from 'react';
import {useScrollLock} from '../use-scroll-lock/use-scroll-lock';
import {useEscKeyDown} from '../use-esc-keydown/use-esc-keydown';

export const useModal = (
  isOpen: boolean,
  onClose: () => void,
  focusCb: () => void,
  onTransitionEnd?: () => void,
): [
  boolean,
  boolean,
  TransitionEventHandler,
] => {
  const [isActive, setIsActive] = useState(false);
  const [isMounted, setIsMounted] = useState(isOpen);

  const handleTransitionEnd = (evt: TransitionEvent) => {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    setIsMounted(isActive);
    if (isActive) {
      focusCb();
    }
    if (onTransitionEnd) {
      onTransitionEnd();
    }
  };

  useEffect(() => {
    let activeFrame: number;

    const mountedFrame = requestAnimationFrame(() => {
      if (isOpen) {
        setIsMounted(true);
      }

      activeFrame = requestAnimationFrame(() => {
        setIsActive(isOpen);
      });
    });

    return () => {
      cancelAnimationFrame(mountedFrame);

      if (activeFrame) {
        cancelAnimationFrame(activeFrame);
      }
    };
  }, [isOpen]);

  useEscKeyDown(isActive, onClose);
  useScrollLock(isActive);

  return [isActive, isMounted, handleTransitionEnd];
};
