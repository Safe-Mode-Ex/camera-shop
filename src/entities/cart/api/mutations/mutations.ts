import {mutationOptions} from '@tanstack/react-query';
import {queryClient} from '@/app/providers';
import type {Cart} from '../storage';
import {addToCart, removeFromCart, clearCart} from '../storage';

const onSuccess = (updatedCart: Cart | null) => {
  queryClient.setQueryData(['cart'], updatedCart);
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
