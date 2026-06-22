import type {MouseEvent} from 'react';
import {useState} from 'react';
import type {Review} from '@/pages/product/dto';
import {REVIEWS_PER_PAGE, REVIEWS_START_PAGE} from '../../config';
import {useReviews} from '@/pages/product/api/queries';

export const useProductReviews = (productId = ''): [
  Review[],
  boolean,
  (evt: MouseEvent<HTMLButtonElement>) => void,
] => {
  const [limit, setLimit] = useState<number>(REVIEWS_START_PAGE);
  const {data} = useReviews(productId, limit);
  const {reviews, total} = data;
  const isShowMoreBtnVisible = reviews.length < total || total <= REVIEWS_PER_PAGE;

  const handleShowMoreBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setLimit((prev) => prev + 1);
  };

  return [reviews, isShowMoreBtnVisible, handleShowMoreBtnClick];
};
