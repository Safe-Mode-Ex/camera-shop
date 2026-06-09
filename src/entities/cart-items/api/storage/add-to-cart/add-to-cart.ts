import {CART_KEY} from '@/entities/cart-items/config';
import {storage} from '@/shared/lib/storage';
import type {Cart} from '@/entities/cart-items/model/types';
import {getCart} from '../get-cart/get-cart';

export const addToCart = (id: string): Cart => {
  const cart = getCart();
  if (!cart) {
    const createdCart = {[id]: 1};
    storage.setItem(CART_KEY, createdCart);
    return createdCart;
  }

  const cartItemCount = cart[id];
  const updatedCart = {...cart, [id]: cartItemCount};

  if (!cartItemCount) {
    updatedCart[id] = 1;
    storage.setItem(CART_KEY, updatedCart);
    return updatedCart;
  }

  updatedCart[id] = updatedCart[id] + 1;
  storage.setItem(CART_KEY, updatedCart);
  return updatedCart;
};
