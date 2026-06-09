import {storage} from '@/shared/lib/storage';
import {COUPON_KEY} from '../config';

export const clearCoupon = (): void => {
  storage.removeItem(COUPON_KEY);
};
