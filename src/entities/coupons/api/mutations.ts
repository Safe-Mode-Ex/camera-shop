import type {MutationFunctionContext} from '@tanstack/react-query';
import {mutationOptions} from '@tanstack/react-query';
import {validateCoupon} from './coupons';

export const validateCouponMutation = mutationOptions({
  mutationKey: ['coupons'],
  mutationFn: async (coupon: string) => validateCoupon(coupon),
  onSuccess: (
    discount: number,
    _vars: string,
    _onMutateResult: unknown,
    {client}: MutationFunctionContext,
  ) => {
    client.setQueryData(['coupon'], discount);
  },
});
