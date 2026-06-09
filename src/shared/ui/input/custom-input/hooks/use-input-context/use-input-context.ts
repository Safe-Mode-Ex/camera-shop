import {createContext, use} from 'react';

const ERROR_MESSAGE = 'useInputContext должен использоваться внутри компонента Modal';

export const InputContext = createContext<boolean | null>(null);

export const useInputContext = () => {
  const context = use(InputContext);
  if (!context) {
    throw new Error(ERROR_MESSAGE);
  }
};
