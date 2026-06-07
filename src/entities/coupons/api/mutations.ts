import type {MutationFunctionContext} from '@tanstack/react-query';
import {mutationOptions} from '@tanstack/react-query';
import {validateCoupon} from './coupons';
import {setCoupon} from './storage';

export const validateCouponMutation = mutationOptions({
  mutationKey: ['coupons', 'validate'],
  mutationFn: async (coupon: string) => validateCoupon(coupon),
  onSuccess: (
    discount: number,
    coupon: string,
    _onMutateResult: unknown,
    {client}: MutationFunctionContext,
  ) => {
    client.setQueryData(['coupon'], {coupon, discount});
    setCoupon({coupon, discount});
  },
});
