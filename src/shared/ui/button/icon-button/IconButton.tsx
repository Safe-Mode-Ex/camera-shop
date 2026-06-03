import type {PropsWithChildren} from 'react';
import classNames from 'classnames';

interface Props extends PropsWithChildren {
  'aria-label': string;
  className: string;
}

function IconButton({children, 'aria-label': ariaLabel, className}: Props) {
  return (
    <button
      type="button"
      className={classNames('btn-icon', className)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default IconButton;
