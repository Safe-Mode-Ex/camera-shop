import classNames from 'classnames';
import type {MouseEvent, ReactNode} from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: (evt: MouseEvent<HTMLButtonElement>) => void,
}

function FilledButton({children, className, onClick}: Props) {
  return (
    <button
      className={classNames('btn btn--purple', className)}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default FilledButton;
