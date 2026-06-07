import {useQuery} from '@tanstack/react-query';
import {getCouponQuery} from '@/entities/coupons/api/queries';

export const useCoupon = () => useQuery({
  ...getCouponQuery,
  select: (data) => data?.coupon ?? '',
});
