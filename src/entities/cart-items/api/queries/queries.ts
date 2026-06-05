import {queryOptions} from '@tanstack/react-query';
import {getCart} from '../storage';

export const getCartQuery = queryOptions({
  queryKey: ['cart'],
  queryFn: () => getCart(),
});

export const getCartLengthQuery = queryOptions({
  queryKey: ['cart'],
  queryFn: () => getCart(),
  select: (data) => data ?
    Object
      .values(data)
      .reduce((result, count) => (result + count), 0) :
    0,
});
