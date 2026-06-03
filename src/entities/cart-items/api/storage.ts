import {storage} from '@/shared/lib/storage';

const CART_KEY = 'cart';

export type Cart = Record<string, number>;

export const getCart = (): Cart | null => {
  const cart = storage.getItem(CART_KEY) as Cart;
  return cart;
};

export const addToCart = (id: string): Cart => {
  const cart = getCart();
  if (!cart) {
    const createdCart = {id: 1};
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

export const clearCart = (): null => {
  storage.removeItem(CART_KEY);
  return null;
};
