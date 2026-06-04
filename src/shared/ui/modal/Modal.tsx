import {useEffect, useState, type PropsWithChildren} from 'react';
import {createPortal} from 'react-dom';
import classNames from 'classnames';
import {CrossButton} from '../button/cross-button';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

function Modal({children, isOpen, onClose}: Props) {
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
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

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <div
      className={classNames('modal', {'is-active': isActive})}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onClose} aria-hidden="true" />
        <div className="modal__content">
          {children}
          <CrossButton aria-label="Закрыть попап" onClick={onClose} />
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
