import {CART_KEY} from '@/entities/cart-items/config';
import {storage} from '@/shared/lib/storage';
import type {Cart} from '@/entities/cart-items/model/types';
import {getCart} from '../get-cart/get-cart';

export const setItemQuantity = (id: string, quantity: number): Cart => {
  const cart = getCart();
  if (!cart) {
    const createdCart = {[id]: quantity};
    storage.setItem(CART_KEY, createdCart);
    return createdCart;
  }

  const updatedCart = {...cart, [id]: quantity};
  storage.setItem(CART_KEY, updatedCart);
  return updatedCart;
};
