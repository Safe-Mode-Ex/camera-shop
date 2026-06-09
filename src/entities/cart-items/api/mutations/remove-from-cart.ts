import {mutationOptions} from '@tanstack/react-query';
import type {Cart} from '../../model/types';
import {onSuccess} from '../../model/utils';
import {removeFromCart} from '../storage';

export const removeFromCartMutation = mutationOptions<Cart | null, Error, [string, boolean?]>({
  mutationKey: ['removeFromCart'],
  mutationFn: async ([productId, clear = false]) => {
    const result = removeFromCart(productId, clear);
    return Promise.resolve(result);
  },
  onSuccess,
});
