import type {ChangeEvent, FocusEvent, PropsWithChildren} from 'react';
import classNames from 'classnames';
import type {InputType} from '@/shared/enums';
import {TextFieldProxy} from '../../text-field-proxy';
import {InputContext} from './hooks';
import {Icon} from '../../icon';
import CustomInputSuccess from './custom-input-success/CustomInputSuccess';
import CustomInputError from './custom-input-error/CustomInputError';
import './CustomInput.css';

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
  required?: boolean;
  error?: string;
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
  required,
  error,
}: Props) {
  return (
    <TextFieldProxy>
      <InputContext value={true}>
        <div className={classNames('custom-input', className, {'is-invalid': error})}>
          <label>
            <span className={classNames('custom-input__label', {'visually-hidden': !label})}>
              {label ?? placeholder}
              {required && <Icon title="icon-snowflake" width="9" height="9" />}
            </span>
            <input
              type={type}
              name={name}
              value={value}
              defaultValue={defaultValue}
              placeholder={placeholder}
              onChange={onChange}
              onBlur={onBlur}
              required={required}
            />
          </label>
          {children}
        </div>
      </InputContext>
    </TextFieldProxy>
  );
}

CustomInput.Success = CustomInputSuccess;
CustomInput.Error = CustomInputError;

export default CustomInput;
