import type {ButtonHTMLAttributes, MouseEventHandler, ReactNode} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {ButtonProxy} from '../button-proxy';

interface Props {
  children: ReactNode;
  to?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>,
  disabled?: boolean,
}

function FilledButton({
  children,
  to,
  className,
  onClick,
  type = 'button',
  disabled = false,
}: Props) {
  return (
    <ButtonProxy>
      {to ? (
        <Link to={to} className={classNames('btn btn--purple', className)}>{children}</Link>
      ) : (
        <button
          className={classNames('btn btn--purple', className)}
          type={type}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </ButtonProxy>
  );
}

export default FilledButton;
