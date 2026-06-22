import type {ApiError} from '@/shared/api';
import {showApiError} from '@/shared/api';

export const handleQueryCacheError = (error: Error) => {
  showApiError(error as ApiError, 'api-error');
};
