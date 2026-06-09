import type {MutationFunctionContext} from '@tanstack/react-query';
import {mutationOptions} from '@tanstack/react-query';
import {validateCoupon} from '../endpoints';
import {setCoupon} from '../storage';
import {COUPON_KEY} from '../config';

export const validateCouponMutation = mutationOptions({
  mutationKey: ['coupons', 'validate'],
  mutationFn: async (coupon: string) => validateCoupon(coupon),
  onSuccess: (
    discount: number,
    coupon: string,
    _onMutateResult: unknown,
    {client}: MutationFunctionContext,
  ) => {
    client.setQueryData([COUPON_KEY], {coupon, discount});
    setCoupon({coupon, discount});
  },
});
