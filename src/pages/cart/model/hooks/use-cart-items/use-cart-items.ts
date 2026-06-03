import {useQuery} from '@tanstack/react-query';
import {useProducts} from '@/entities/products';
import {getCartQuery} from '@/entities/cart-items';
import type {CartItem} from '../../types';

export const useCartItems = () => {
  const {data: products} = useProducts();
  const result = useQuery({
    ...getCartQuery,
    select: (data): CartItem[] => {
      if (!data) {
        return [];
      }

      return products
        .filter(({id}) => data[id])
        .map((product) => ({
          product,
          quantity: data[product.id],
        }));
    },
  });

  return {...result, data: result.data ?? []};
};
