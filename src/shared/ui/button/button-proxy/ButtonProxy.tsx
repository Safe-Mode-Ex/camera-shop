import type {PropsWithChildren} from 'react';
import './ButtonProxy.css';

function ButtonProxy({children}: PropsWithChildren) {
  return (
    <>
      {children}
    </>
  );
}

export default ButtonProxy;
