import {useQuery} from '@tanstack/react-query';
import {getSimilarProducts} from '@/entities/products';

export const useSimilarProducts = (productId?: string) => {
  const query = useQuery({
    queryKey: ['similar', productId],
    queryFn: () => getSimilarProducts(productId ?? ''),
    enabled: Boolean(productId),
  });
  return {...query, data: query.data ?? []};
};
