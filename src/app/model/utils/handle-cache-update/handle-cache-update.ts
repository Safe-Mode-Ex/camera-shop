import type {QueryCache} from '@tanstack/react-query';
import {toast} from 'react-toastify';
import {REQUEST_CONNECTION_ERROR} from '@/shared/api';
import {QueryFetchStatus} from '../../enums';
import {debounce} from 'es-toolkit/function';

let offlineToastId: ReturnType<typeof toast> | null = null;

export const handleCacheUpdate = debounce((queryCache: QueryCache) => {
  const hasPausedQuery = queryCache
    .getAll()
    .some(({state}) => !state.data && state.fetchStatus === QueryFetchStatus.Paused);

  if (!hasPausedQuery && offlineToastId) {
    toast.dismiss(offlineToastId);
    offlineToastId = null;
    return;
  }

  if (hasPausedQuery && !offlineToastId) {
    offlineToastId = toast.warning(
      REQUEST_CONNECTION_ERROR,
      {autoClose: false, closeButton: false, draggable: false},
    );
  }
}, 0);
