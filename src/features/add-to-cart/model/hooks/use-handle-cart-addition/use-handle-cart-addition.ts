import type {MouseEvent} from 'react';
import type {MouseEventHandler} from 'react';
import {useMutation} from '@tanstack/react-query';
import {addToCartMutation} from '@/entities/cart-items';

export const useHandleCartAddition = (
  id: number,
  isSuccess: () => void,
): MouseEventHandler<HTMLButtonElement> => {
  const {mutate: addToCart} = useMutation(addToCartMutation);

  const handleCartAddition = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    addToCart(id.toString());
    isSuccess();
  };

  return handleCartAddition;
};
