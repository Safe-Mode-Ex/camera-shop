import {queryOptions} from '@tanstack/react-query';
import {getProducts} from '../products';

export const getProductsQuery = queryOptions({
  queryKey: ['produсts'],
  queryFn: () => getProducts(),
});
