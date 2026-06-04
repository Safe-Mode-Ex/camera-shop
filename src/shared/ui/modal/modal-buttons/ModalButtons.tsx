import type {PropsWithChildren} from 'react';
import {useModalContext} from '../hooks';

function ModalButtons({children}: PropsWithChildren) {
  useModalContext();
  return (
    <div className="modal__buttons">{children}</div>
  );
}

export default ModalButtons;
