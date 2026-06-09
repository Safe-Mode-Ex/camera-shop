import {queryOptions} from '@tanstack/react-query';
import {getProducts} from '../endpoints';

export const getProductsQuery = queryOptions({
  queryKey: ['produсts'],
  queryFn: () => getProducts(),
});
