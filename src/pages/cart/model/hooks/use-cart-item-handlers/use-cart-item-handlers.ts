import type {MouseEvent} from 'react';
import {useMutation} from '@tanstack/react-query';
import {
  addToCartMutation,
  removeFromCartMutation,
  setQuantityMutation,
} from '@/entities/cart-items';

interface UseCartItemHandlersResult {
  handleQuantityIncrease: (evt: MouseEvent<HTMLButtonElement>) => void;
  handleQuantityDecrease: (evt: MouseEvent<HTMLButtonElement>) => void;
  handleQuantityChange: (quantity: number) => void;
  handleRemoveItem: () => () => void;
}

export const useCartItemHandlers = (id: number): UseCartItemHandlersResult => {
  const {mutate: increaseQuantity} = useMutation(addToCartMutation);
  const {mutate: decreaseQuantity} = useMutation(removeFromCartMutation);
  const {mutate: setQuantity} = useMutation(setQuantityMutation);

  const handleQuantityIncrease = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    increaseQuantity(id.toString());
  };

  const handleQuantityDecrease = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    decreaseQuantity([id.toString()]);
  };

  const handleQuantityChange = (quantity: number) => {
    setQuantity([id.toString(), quantity]);
  };

  const handleRemoveItem = () => () => {
    decreaseQuantity([id.toString(), true]);
  };

  return {handleQuantityIncrease, handleQuantityDecrease, handleQuantityChange, handleRemoveItem};
};
