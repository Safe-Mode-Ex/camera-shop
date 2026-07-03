import {mutationOptions} from '@tanstack/react-query';
import type {Cart} from '../../model/types';
import {setItemQuantity} from '../storage';

export const setQuantityMutation = mutationOptions<Cart, Error, [string, number]>({
  mutationKey: ['setQuantity'],
  mutationFn: async ([productId, quantity]) => {
    const result = setItemQuantity(productId, quantity);
    return Promise.resolve(result);
  },
  onSuccess: (updatedCart, _vars, _onMutateResult, {client}) => {
    client.setQueryData(['cart'], updatedCart);
  },
});
