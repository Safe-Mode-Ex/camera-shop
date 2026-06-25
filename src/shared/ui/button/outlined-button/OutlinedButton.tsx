import type {PropsWithChildren} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {ButtonProxy} from '../button-proxy';

interface Props extends PropsWithChildren {
  to: string;
  className?: string;
}

function OutlinedButton({to, className, children}: Props) {
  return (
    <ButtonProxy>
      <Link
        className={classNames('btn btn--purple-border', className)}
        to={to}
      >
        {children}
      </Link>
    </ButtonProxy>
  );
}

export default OutlinedButton;
