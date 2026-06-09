import {useQueryClient} from '@tanstack/react-query';
import {clearCoupon} from '@/entities/coupons/api/storage';
import {COUPON_KEY} from '@/entities/coupons/api/config';

export const useClearCoupon = (): () => void => {
  const queryClient = useQueryClient();
  return () => {
    clearCoupon();
    queryClient.setQueryData([COUPON_KEY], null);
  };
};
