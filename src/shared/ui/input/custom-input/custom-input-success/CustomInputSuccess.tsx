import type {PropsWithChildren} from 'react';
import {useInputContext} from '../hooks';

function CustomInputSuccess({children}: PropsWithChildren) {
  useInputContext();
  return (
    <p className="custom-input__success">{children}</p>
  );
}

export default CustomInputSuccess;
