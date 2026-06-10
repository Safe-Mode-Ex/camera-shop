import {getPromoQuery} from '@/widgets/banners/api/queries';
import {useQuery} from '@tanstack/react-query';

export const usePromo = () => {
  const result = useQuery(getPromoQuery);
  return result;
};
