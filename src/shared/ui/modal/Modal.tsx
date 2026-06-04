import {type PropsWithChildren} from 'react';
import {createPortal} from 'react-dom';
import classNames from 'classnames';
import {CrossButton} from '../button/cross-button';
import {ModalContext, useModal} from './hooks';
import ModalButtons from './modal-buttons/ModalButtons';
import './Modal.css';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

function Modal({children, isOpen, onClose}: Props) {
  const [isActive, isMounted, handleTransitionEnd] = useModal(isOpen, onClose);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <ModalContext value={true}>
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
      </div>
    </ModalContext>,
    document.body,
  );
}

Modal.Buttons = ModalButtons;

export default Modal;
