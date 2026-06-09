import {useEffect} from 'react';

export const useEscKeyDown = (isActive: boolean, onClose: () => void): void => {
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
};
