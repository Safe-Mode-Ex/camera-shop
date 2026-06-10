import {queryOptions} from '@tanstack/react-query';
import {getPromo} from '../endpoints';

export const getPromoQuery = queryOptions({
  queryKey: ['promo'],
  queryFn: () => getPromo(),
});
