import {useQuery} from '@tanstack/react-query';
import {getSimilarProducts} from '@/entities/products';

export const useSimilarProducts = (productId?: string) =>
  useQuery({
    queryKey: ['similar', productId],
    queryFn: () => getSimilarProducts(productId ?? ''),
    enabled: Boolean(productId),
  });
