import {queryOptions} from '@tanstack/react-query';
import {getCoupon} from './storage';
import type {Coupon} from '../model/types';

export const getCouponQuery = queryOptions<Coupon | null>({
  queryKey: ['coupon'],
  queryFn: getCoupon,
});
