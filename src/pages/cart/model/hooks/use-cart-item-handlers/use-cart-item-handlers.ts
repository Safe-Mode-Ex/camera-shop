import type {MouseEvent, MouseEventHandler} from 'react';
import {useMutation} from '@tanstack/react-query';
import {addToCartMutation, removeFromCartMutation} from '@/entities/cart-items';

export const useCartItemHandlers = (id: number): [
  MouseEventHandler<HTMLButtonElement>,
  MouseEventHandler<HTMLButtonElement>,
  MouseEventHandler<HTMLButtonElement>,
] => {
  const {mutate: increaseQuantity} = useMutation(addToCartMutation);
  const {mutate: decreaseQuantity} = useMutation(removeFromCartMutation);

  const handleQuantityIncrease = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    increaseQuantity(id.toString());
  };

  const handleQuantityDecrease = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    decreaseQuantity([id.toString()]);
  };

  const handleRemoveItem = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    decreaseQuantity([id.toString(), true]);
  };

  return [handleQuantityIncrease, handleQuantityDecrease, handleRemoveItem];
};
