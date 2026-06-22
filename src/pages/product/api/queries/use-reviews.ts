import {useQuery} from '@tanstack/react-query';
import {REVIEWS_PER_PAGE, REVIEWS_START_PAGE} from '../../model/config';
import {getReviews} from '../endpoints/reviews';

export const useReviews = (productId?: string, page = REVIEWS_START_PAGE) => {
  const query = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => getReviews(productId ?? ''),
    enabled: Boolean(productId),
    select: (data) => ({
      total: data.length,
      reviews: data
        .sort((reviewA, reviewB) =>
          new Date(reviewB.createAt).getTime() - new Date(reviewA.createAt).getTime())
        .slice(0, page * REVIEWS_PER_PAGE),
    }),
  });

  return {...query, data: query.data ?? {total: 0, reviews: []}};
};
