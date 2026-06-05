import type {MouseEvent, MouseEventHandler} from 'react';
import {useState} from 'react';

export const useAddToCartModal = (): [
  boolean,
  MouseEventHandler,
  () => void,
] => {
  const [isAddCartOpen, setIsAddCartOpen] = useState(false);
  const handleModalOpen = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsAddCartOpen(true);
  };
  const handleModalClose = () => {
    setIsAddCartOpen(false);
  };

  return [isAddCartOpen, handleModalOpen, handleModalClose];
};
