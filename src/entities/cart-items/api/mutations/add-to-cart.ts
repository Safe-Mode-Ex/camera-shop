import {mutationOptions} from '@tanstack/react-query';
import type {Cart} from '../../model/types';
import {onSuccess} from '../../model/utils';
import {addToCart} from '../storage';

export const addToCartMutation = mutationOptions<Cart, Error, string>({
  mutationKey: ['addToCart'],
  mutationFn: async (productId: string) => {
    const result = addToCart(productId);
    return Promise.resolve(result);
  },
  onSuccess,
});
