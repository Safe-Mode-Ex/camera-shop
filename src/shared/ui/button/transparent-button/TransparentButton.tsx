import classNames from 'classnames';
import type {MouseEventHandler, PropsWithChildren} from 'react';

interface Props extends PropsWithChildren {
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

function TransparentButton({onClick, className, children}: Props) {
  return (
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
