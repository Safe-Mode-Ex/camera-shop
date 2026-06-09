import {CART_KEY} from '@/entities/cart-items/config';
import {storage} from '@/shared/lib/storage';

export const clearCart = (): null => {
  storage.removeItem(CART_KEY);
  return null;
};
