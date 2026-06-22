import {toast} from 'react-toastify';
import type {ApiError} from '../../types';
import {ApiErrorMessage} from '../../enums';
import {shouldDisplayError} from '../should-display-error/should-display-error';

export const showApiError = ({code, response}: ApiError, errorId: string) => {
  if (code && code in ApiErrorMessage) {
    toast.error(ApiErrorMessage[code], {toastId: errorId});
    return;
  }

  if (response && shouldDisplayError(response)) {
    const detailedMessages = response.data.messages;
    detailedMessages.forEach((message) => toast.error(message));
  }
};
