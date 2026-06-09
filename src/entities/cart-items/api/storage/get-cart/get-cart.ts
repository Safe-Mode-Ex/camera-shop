import {storage} from '@/shared/lib/storage';
import {CART_KEY} from '@/entities/cart-items/config';
import type {Cart} from '@/entities/cart-items/model/types';

export const getCart = (): Cart | null => {
  const cart = storage.getItem(CART_KEY) as Cart;
  return cart;
};
