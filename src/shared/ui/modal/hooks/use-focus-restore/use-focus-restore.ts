import {useRef, useEffect} from 'react';

export const useFocusRestore = (isOpen: boolean) => {
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerButtonRef.current = document.activeElement as HTMLButtonElement;
    }
    return () => {
      triggerButtonRef.current?.focus();
    };
  }, [isOpen]);
};
