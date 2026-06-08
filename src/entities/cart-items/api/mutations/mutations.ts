import type {MutationFunctionContext} from '@tanstack/react-query';
import {mutationOptions} from '@tanstack/react-query';
import type {Cart} from '../storage';
import {addToCart, removeFromCart, clearCart} from '../storage';

const onSuccess = (
  updatedCart: Cart | null,
  _vars: string | [string, boolean?],
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

export const removeFromCartMutation = mutationOptions<Cart | null, Error, [string, boolean?]>({
  mutationKey: ['removeFromCart'],
  mutationFn: async ([productId, clear = false]) => {
    const result = removeFromCart(productId, clear);
    return Promise.resolve(result);
  },
  onSuccess,
});

export const clearCartMutation = mutationOptions<null>({
  mutationKey: ['clearCart'],
  mutationFn: async () => {
    const result = clearCart();
    return Promise.resolve(result);
  },
  onSuccess: (updatedCart, _vars, _onMutateResult, context) => {
    onSuccess(updatedCart, '', null, context);
  },
});
