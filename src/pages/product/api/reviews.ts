import {httpApi} from '@/shared/api';
import {Domen} from '@/entities/products';
import type {Review} from '../dto';

export const getReviews = async (reviewId: string) =>
  httpApi
    .get<Review[]>(`${Domen.Cameras}/${reviewId}${Domen.Reviews}`)
    .then(({data}) => data);
