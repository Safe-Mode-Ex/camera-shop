import {useQuery} from '@tanstack/react-query';
import {getProductById} from '@/entities/products';

export const useProduct = (productId: number) => (
  useQuery({
    queryKey: ['products', productId],
    queryFn: () => getProductById(productId),
    enabled: Number.isFinite(productId),
  })
);
