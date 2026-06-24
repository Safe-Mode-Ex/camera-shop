import {Domen} from '@/entities/products';
import {httpApi} from '@/shared/api';
import type {Review, UserReview} from '../../dto';

export const createReview = async (review: UserReview) =>
  httpApi
    .post<Review>(Domen.Reviews, review)
    .then(({data}) => data);
