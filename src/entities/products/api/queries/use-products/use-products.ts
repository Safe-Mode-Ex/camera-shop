import {useQuery} from '@tanstack/react-query';
import {getProducts} from '../../products';

const QUERY_MIN_LENGTH = 3;

export const useProducts = (query?: string) => {
  const shouldUseQuery = query && query.length >= QUERY_MIN_LENGTH;
  const result = useQuery({
    queryKey: ['produсts'],
    queryFn: () => getProducts(),
    select: (data) => shouldUseQuery ?
      data.filter(({name}) => name.toLowerCase().includes(query.toLowerCase())) :
      data,
  });
  const hasResult = !query || shouldUseQuery;
  return {...result, data: hasResult ? result.data ?? [] : []};
};
