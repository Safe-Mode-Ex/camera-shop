import type {MouseEventHandler, PropsWithChildren} from 'react';
import classNames from 'classnames';
import './IconButton.css';

interface Props extends PropsWithChildren {
  'aria-label': string;
  className: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
}

function IconButton({
  children,
  'aria-label': ariaLabel,
  className,
  onClick,
  onMouseDown,
  disabled = false,
}: Props) {
  return (
    <button
      type="button"
      className={classNames('btn-icon', className)}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {children}
    </button>
  );
}

export default IconButton;
