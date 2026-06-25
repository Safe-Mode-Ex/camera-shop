import classNames from 'classnames';
import type {MouseEvent, ReactNode} from 'react';
import {ButtonProxy} from '../button-proxy';

interface Props {
  children: ReactNode;
  onClick: (evt: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

function TonalButton({className, children, onClick}: Props) {
  return (
    <ButtonProxy>
      <button
        className={classNames('btn', className)}
        type="reset"
        onClick={onClick}
      >{children}
      </button>
    </ButtonProxy>
  );
}

export default TonalButton;
