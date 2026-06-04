import {useState, useEffect} from 'react';

export const useModal = (isOpen: boolean, onClose: () => void): [
  boolean,
  boolean,
  () => void,
] => {
  const [isActive, setIsActive] = useState(false);
  const [isMounted, setIsMounted] = useState(isOpen);

  const handleTransitionEnd = () => {
    setIsMounted(isActive);
  };

  useEffect(() => {
    const activeFrame = requestAnimationFrame(() => {
      setIsActive(isOpen);
    });

    return () => {
      cancelAnimationFrame(activeFrame);
    };
  }, [isOpen, isActive]);

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    if (isActive) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (isActive) {
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [isActive, onClose]);

  return [isActive, isMounted, handleTransitionEnd];
};
