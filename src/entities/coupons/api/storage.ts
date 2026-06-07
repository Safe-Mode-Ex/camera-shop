import {storage} from '@/shared/lib/storage';
import type {Coupon} from '../model/types';

export const COUPON_KEY = 'coupon';

export const setCoupon = (coupon: Coupon): void => {
  storage.setItem(COUPON_KEY, coupon);
};

export const getCoupon = (): Coupon | null => storage.getItem(COUPON_KEY) as Coupon;
