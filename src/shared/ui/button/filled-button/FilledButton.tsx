import type {ButtonHTMLAttributes, MouseEventHandler, ReactNode} from 'react';
import classNames from 'classnames';

interface Props {
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>,
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
