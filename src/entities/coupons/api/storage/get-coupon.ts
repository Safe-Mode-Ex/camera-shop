import {storage} from '@/shared/lib/storage';
import type {Coupon} from '../../model/types';
import {COUPON_KEY} from '../config';

export const getCoupon = (): Coupon | null => storage.getItem(COUPON_KEY) as Coupon;
