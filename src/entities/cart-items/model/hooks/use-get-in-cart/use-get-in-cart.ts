import {useQuery} from '@tanstack/react-query';
import {getCartQuery} from '@/entities/cart-items';

export const useGetInCart = () => {
  const {data: cart} = useQuery(getCartQuery);
  return (productId: number): boolean => Boolean(cart?.[productId]);
};
