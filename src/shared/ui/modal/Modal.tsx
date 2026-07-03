import {type PropsWithChildren} from 'react';
import {createPortal} from 'react-dom';
import classNames from 'classnames';
import {CrossButton} from '../button/cross-button';
import {ModalContext, useFocusRestore, useFocusTrap, useModal} from './hooks';
import ModalButtons from './modal-buttons/ModalButtons';
import './Modal.css';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  isNarrow?: boolean;
  onClose: () => void;
  onTransitionEnd?: () => void;
}

function Modal({children, isOpen, isNarrow = false, onClose, onTransitionEnd}: Props) {
  const [modalRef, focusFirstElement, handleKeyDown] = useFocusTrap();

  const [
    isActive,
    isMounted,
    handleTransitionEnd,
  ] = useModal(isOpen, onClose, focusFirstElement, onTransitionEnd);

  useFocusRestore(isOpen);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <ModalContext value={true}>
      <dialog
        className={classNames(
          'modal',
          {'is-active': isActive},
          {'modal--narrow': isNarrow},
        )}
        onTransitionEnd={handleTransitionEnd}
        ref={modalRef}
        onKeyDown={handleKeyDown}
      >
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={onClose} aria-hidden="true" />
          <div className="modal__content">
            {children}
            <CrossButton aria-label="Закрыть попап" onClick={onClose} />
          </div>
        </div>
      </dialog>
    </ModalContext>,
    document.body,
  );
}

Modal.Buttons = ModalButtons;

export default Modal;
