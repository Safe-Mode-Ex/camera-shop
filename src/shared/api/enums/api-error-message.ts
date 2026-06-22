import {AxiosError} from 'axios';
import {REQUEST_SERVER_UNAVAILABE_MESSAGE, REQUEST_TIMEOUT_ERROR_MESSAGE} from '../config';

export const ApiErrorMessage: Record<string, string> = {
  [AxiosError.ERR_NETWORK]: REQUEST_SERVER_UNAVAILABE_MESSAGE,
  [AxiosError.ECONNABORTED]: REQUEST_TIMEOUT_ERROR_MESSAGE,
} as const;
