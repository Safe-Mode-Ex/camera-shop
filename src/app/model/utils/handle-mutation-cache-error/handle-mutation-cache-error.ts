import type {Mutation} from '@tanstack/react-query';
import type {ApiError} from '@/shared/api';
import {showApiError} from '@/shared/api';

export const handleMutationCacheError = (
  error: Error,
  _vars: unknown,
  _conte: unknown,
  mutation: Mutation<unknown, unknown>,
) => {
  if (mutation.meta?.suppressGlobalToast) {
    return;
  }
  showApiError(error as ApiError, 'api-error');
};
