import {queryOptions} from '@tanstack/react-query';
import {getCart} from '../storage';

export const getCartQuery = queryOptions({
  queryKey: ['cart'],
  queryFn: () => getCart(),
});
