import {queryOptions} from '@tanstack/react-query';
import type {Coupon} from '../../model/types';
import {getCoupon} from '../storage';
import {COUPON_KEY} from '../config';

export const getCouponQuery = queryOptions<Coupon | null>({
  queryKey: [COUPON_KEY],
  queryFn: getCoupon,
});
