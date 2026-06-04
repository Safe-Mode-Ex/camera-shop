import {createContext, use} from 'react';

const ERROR_MESSAGE = 'useModalContext должен использоваться внутри компонента Modal';

export const ModalContext = createContext<boolean | null>(null);

export const useModalContext = () => {
  const context = use(ModalContext);
  if (!context) {
    throw new Error(ERROR_MESSAGE);
  }
};
