import {useState} from 'react';

export const useAddToCartProcess = (): [
  boolean,
  () => void,
  () => void,
] => {
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSuccessAddition = () => {
    setIsSuccess(true);
  };
  const handleTransitionEnd = () => {
    setIsSuccess(false);
  };
  return [isSuccess, handleSuccessAddition, handleTransitionEnd];
};
