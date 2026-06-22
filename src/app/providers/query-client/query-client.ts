import {MutationCache, QueryCache, QueryClient} from '@tanstack/react-query';
import {TimeConstant} from '@/shared/enums';
import {STALE_MINUTES} from '@/app/model/config';
import {handleCacheError, handleCacheUpdate} from '@/app/model/utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_MINUTES * TimeConstant.SEC_IN_MIN * TimeConstant.MS_IN_SEC,
    },
    mutations: {
      networkMode: 'always',
    },
  },
  queryCache: new QueryCache({onError: handleCacheError}),
  mutationCache: new MutationCache({onError: handleCacheError}),
});

const queryCache = queryClient.getQueryCache();
queryCache.subscribe(() => {
  handleCacheUpdate(queryCache);
});

export {queryClient};
