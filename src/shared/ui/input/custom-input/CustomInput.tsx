import type {ChangeEvent, FocusEvent, PropsWithChildren} from 'react';
import type {InputType} from '@/shared/enums';
import './CustomInput.css';
import classNames from 'classnames';

interface Props extends PropsWithChildren {
  type: InputType;
  name: string;
  placeholder: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (evt: FocusEvent<HTMLInputElement>) => void;
  label?: string
  className?: string;
  value?: string | number;
  defaultValue?: string;
}

function CustomInput({
  type,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  label,
  className,
  children,
  defaultValue,
}: Props) {
  return (
    <div className={classNames('custom-input', className)}>
      <label>
        <span className={classNames('custom-input__label', {'visually-hidden': !label})}>
          {label ?? placeholder}
        </span>
        <input
          type={type}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
      </label>
      {children}
    </div>
  );
}

export default CustomInput;
