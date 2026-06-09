import {storage} from '@/shared/lib/storage';
import type {Coupon} from '../../model/types';
import {COUPON_KEY} from '../config';

export const setCoupon = (coupon: Coupon): void => {
  storage.setItem(COUPON_KEY, coupon);
};
