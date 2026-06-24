import type {ChangeEventHandler, FocusEventHandler} from 'react';
import classNames from 'classnames';
import {Icon} from '../icon';
import './CustomTextarea.css';

interface Props {
  label: string;
  name: string;
  placeholder: string;
  onChange: ChangeEventHandler;
  onBlur?: FocusEventHandler;
  className?: string;
  minLength?: number;
  value?: string;
  error?: string;
  required?: boolean;
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
  onBlur,
  required,
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
          onBlur={onBlur}
          required={required}
        />
      </label>
      {error && <div className="custom-textarea__error">{error}</div>}
    </div>
  );
}

export default CustomTextarea;
