import {useQuery} from '@tanstack/react-query';
import {getCouponQuery} from '@/entities/coupons/api/queries';

export const useDiscount = () => useQuery({
  ...getCouponQuery,
  select: (data) => data?.discount ?? 0,
});
