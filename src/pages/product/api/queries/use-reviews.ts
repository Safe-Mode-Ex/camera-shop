import {useQuery} from '@tanstack/react-query';
import {REVIEWS_PER_PAGE} from '../../model/config';
import {getReviews} from '../reviews';

export const useReviews = (productId?: string, reviewsPage?: number) => {
  const page = reviewsPage ?? 0;
  const query = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => getReviews(productId ?? ''),
    enabled: Boolean(productId),
    select: (data) => data
      .sort((reviewA, reviewB) =>
        new Date(reviewB.createAt).getTime() - new Date(reviewA.createAt).getTime())
      .slice(page * REVIEWS_PER_PAGE, REVIEWS_PER_PAGE),
  });
  return {...query, data: query.data ?? []};
};
