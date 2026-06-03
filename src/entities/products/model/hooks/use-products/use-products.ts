import {useQuery} from '@tanstack/react-query';
import {getProductsQuery} from '@/entities/products/api';

const QUERY_MIN_LENGTH = 3;

export const useProducts = (query?: string) => {
  const shouldUseQuery = query && query.length >= QUERY_MIN_LENGTH;
  const result = useQuery({
    ...getProductsQuery,
    select: (data) => shouldUseQuery ?
      data.filter(({name}) => name.toLowerCase().includes(query.toLowerCase())) :
      data,
  });
  const hasResult = !query || shouldUseQuery;
  return {...result, data: hasResult ? result.data ?? [] : []};
};
