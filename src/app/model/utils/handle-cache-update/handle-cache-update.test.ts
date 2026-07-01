import type {QueryCache} from '@tanstack/react-query';
import {toast} from 'react-toastify';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {REQUEST_CONNECTION_ERROR} from '@/shared/api';
import {QueryFetchStatus} from '../../enums';

vi.mock('es-toolkit/function', () => ({
  debounce: <T extends (...args: never[]) => unknown>(fn: T) => fn,
}));

vi.mock('react-toastify', () => ({
  toast: {warning: vi.fn(), dismiss: vi.fn()},
}));

function createQuery({
  hasData = false,
  fetchStatus = QueryFetchStatus.Idle,
}: {
  hasData?: boolean;
  fetchStatus?: string;
} = {}) {
  return {
    state: {
      data: hasData ? ({} as const) : undefined,
      fetchStatus,
    },
  };
}

function createCache(queries: ReturnType<typeof createQuery>[]) {
  return {getAll: () => queries} as unknown as QueryCache;
}

const TOAST_ID = 'toast-1';

describe('handleCacheUpdate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(toast.warning).mockReturnValue(TOAST_ID);
  });

  it('does nothing when no paused queries exist and no toast is shown', async () => {
    vi.resetModules();
    const {handleCacheUpdate} = await import('./handle-cache-update');

    handleCacheUpdate(
      createCache([
        createQuery({hasData: true, fetchStatus: QueryFetchStatus.Idle}),
        createQuery({hasData: true, fetchStatus: QueryFetchStatus.Fetching}),
      ]),
    );

    expect(toast.warning).not.toHaveBeenCalled();
    expect(toast.dismiss).not.toHaveBeenCalled();
  });

  it('shows warning toast when a paused query without data exists', async () => {
    vi.resetModules();
    const {handleCacheUpdate} = await import('./handle-cache-update');

    handleCacheUpdate(
      createCache([createQuery({fetchStatus: QueryFetchStatus.Paused})]),
    );

    expect(toast.warning).toHaveBeenCalledTimes(1);
    expect(toast.warning).toHaveBeenCalledWith(
      REQUEST_CONNECTION_ERROR,
      {autoClose: false, closeButton: false, draggable: false},
    );
    expect(toast.dismiss).not.toHaveBeenCalled();
  });

  it('does not show duplicate toast when called multiple times with paused queries', async () => {
    vi.resetModules();
    const {handleCacheUpdate} = await import('./handle-cache-update');

    const cache = createCache([
      createQuery({fetchStatus: QueryFetchStatus.Paused}),
    ]);

    handleCacheUpdate(cache);
    handleCacheUpdate(cache);

    expect(toast.warning).toHaveBeenCalledTimes(1);
  });

  it('dismisses toast when paused queries are no longer present', async () => {
    vi.resetModules();
    const {handleCacheUpdate} = await import('./handle-cache-update');

    handleCacheUpdate(
      createCache([createQuery({fetchStatus: QueryFetchStatus.Paused})]),
    );

    handleCacheUpdate(
      createCache([createQuery({hasData: true})]),
    );

    expect(toast.dismiss).toHaveBeenCalledWith(TOAST_ID);
  });
});
