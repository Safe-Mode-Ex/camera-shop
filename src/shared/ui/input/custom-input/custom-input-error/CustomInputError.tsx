import type {PropsWithChildren} from 'react';
import {useInputContext} from '../hooks';

function CustomInputError({children}: PropsWithChildren) {
  useInputContext();
  return (
    <p className="custom-input__error">{children}</p>
  );
}

export default CustomInputError;
