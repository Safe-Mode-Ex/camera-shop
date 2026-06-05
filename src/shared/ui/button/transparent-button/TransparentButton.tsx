import type {MouseEventHandler, PropsWithChildren} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

interface Props extends PropsWithChildren {
  to?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

function TransparentButton({to, onClick, className, children}: Props) {
  return to ? (
    <Link
      to={to}
      className={classNames('btn btn--transparent', className)}
    >
      {children}
    </Link>
  ) : (
    <button
      className={classNames('btn btn--transparent', className)}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default TransparentButton;
