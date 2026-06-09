import {mutationOptions} from '@tanstack/react-query';
import {onSuccess} from '../../model/utils';
import {clearCart} from '../storage';

export const clearCartMutation = mutationOptions<null>({
  mutationKey: ['clearCart'],
  mutationFn: async () => {
    const result = clearCart();
    return Promise.resolve(result);
  },
  onSuccess: (updatedCart, _vars, _onMutateResult, context) => {
    onSuccess(updatedCart, '', null, context);
  },
});
