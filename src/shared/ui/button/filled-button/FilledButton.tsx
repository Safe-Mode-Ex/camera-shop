import classNames from 'classnames';
import type {ButtonHTMLAttributes, MouseEvent, ReactNode} from 'react';

interface Props {
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
  onClick?: (evt: MouseEvent<HTMLButtonElement>) => void,
}

function FilledButton({children, type = 'button', className, onClick}: Props) {
  return (
    <button
      className={classNames('btn btn--purple', className)}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default FilledButton;
