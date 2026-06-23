import type {ChangeEventHandler} from 'react';
import classNames from 'classnames';
import {Icon} from '../icon';

interface Props {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: ChangeEventHandler;
  className?: string;
  minLength?: number;
  error?: string;
}

function CustomTextarea({
  label,
  name,
  value,
  placeholder,
  className,
  minLength,
  error,
  onChange,
}: Props) {
  return (
    <div className={classNames('custom-textarea', className, {'is-invalid': error})}>
      <label>
        <span className="custom-textarea__label">
          {label}
          <Icon title="icon-snowflake" width="9" height="9" />
        </span>

        <textarea
          name={name}
          value={value}
          minLength={minLength}
          placeholder={placeholder}
          onChange={onChange}
        />
      </label>
      {error && <div className="custom-textarea__error">{error}</div>}
    </div>
  );
}

export default CustomTextarea;
