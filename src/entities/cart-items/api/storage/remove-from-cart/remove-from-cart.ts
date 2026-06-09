import {CART_KEY} from '@/entities/cart-items/config';
import type {Cart} from '@/entities/cart-items/model/types';
import {storage} from '@/shared/lib/storage';
import {getCart} from '../get-cart/get-cart';

export const removeFromCart = (id: string, clear = false): Cart | null => {
  const cart = getCart();
  if (!cart) {
    return null;
  }

  const cartItemCount = cart[id];
  if (!cartItemCount) {
    return null;
  }

  const updatedCart = {...cart, [id]: cartItemCount};
  updatedCart[id] = cartItemCount - 1;
  if (!updatedCart[id] || clear) {
    const {[id]: _removedItem, ...restCart} = {...updatedCart};
    storage.setItem(CART_KEY, restCart);
    return restCart;
  }

  storage.setItem(CART_KEY, updatedCart);
  return updatedCart;
};
