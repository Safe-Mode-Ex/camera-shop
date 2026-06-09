import type {MutationFunctionContext} from '@tanstack/react-query';
import type {Cart} from '../types';

export const onSuccess = (
  updatedCart: Cart | null,
  _vars: string | [string, boolean?],
  _onMutateResult: unknown,
  {client}: MutationFunctionContext) => {
  client.setQueryData(['cart'], updatedCart);
};
