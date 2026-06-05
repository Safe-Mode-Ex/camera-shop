import type {ButtonHTMLAttributes, MouseEventHandler, ReactNode} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

interface Props {
  children: ReactNode;
  to?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>,
}

function FilledButton({children, to, type = 'button', className, onClick}: Props) {
  return to ? (
    <Link to={to} className={classNames('btn btn--purple', className)}>{children}</Link>
  ) : (
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
