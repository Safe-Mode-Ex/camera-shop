import type {ApiError} from '@/shared/api';
import {showApiError} from '@/shared/api';

export const handleCacheError = (error: Error) => {
  showApiError(error as ApiError, 'api-error');
};
