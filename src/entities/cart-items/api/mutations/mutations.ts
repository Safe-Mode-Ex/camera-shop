import type {MutationFunctionContext} from '@tanstack/react-query';
import {mutationOptions} from '@tanstack/react-query';
import type {Cart} from '../storage';
import {addToCart, removeFromCart, clearCart} from '../storage';

const onSuccess = (
  updatedCart: Cart | null,
  _vars: string,
  _onMutateResult: unknown,
  {client}: MutationFunctionContext) => {
  client.setQueryData(['cart'], updatedCart);
};

export const addToCartMutation = mutationOptions<Cart, Error, string>({
  mutationKey: ['addToCart'],
  mutationFn: async (productId: string) => {
    const result = addToCart(productId);
    return Promise.resolve(result);
  },
  onSuccess,
});

export const removeFromCartMutation = mutationOptions<Cart | null, Error, string>({
  mutationKey: ['removeFromCart'],
  mutationFn: async (productId: string) => {
    const result = removeFromCart(productId);
    return Promise.resolve(result);
  },
  onSuccess,
});

export const clearCartMutation = mutationOptions<null, Error, string>({
  mutationKey: ['clearCart'],
  mutationFn: async () => {
    const result = clearCart();
    return Promise.resolve(result);
  },
  onSuccess,
});
