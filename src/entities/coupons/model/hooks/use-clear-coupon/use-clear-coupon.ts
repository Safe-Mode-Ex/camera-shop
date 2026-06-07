import {useQueryClient} from '@tanstack/react-query';
import {clearCoupon, COUPON_KEY} from '@/entities/coupons/api/storage';

export const useClearCoupon = (): () => void => {
  const queryClient = useQueryClient();
  return () => {
    clearCoupon();
    queryClient.setQueryData([COUPON_KEY], null);
  };
};
