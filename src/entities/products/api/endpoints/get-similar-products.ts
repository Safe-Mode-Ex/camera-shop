import {httpApi} from '@/shared/api';
import type {Product} from '@/shared/dto';
import {Domen} from '../../model/enums';

export const getSimilarProducts = async (productId: string) =>
  httpApi
    .get<Product[]>(`${Domen.Cameras}/${productId}${Domen.Similar}`)
    .then(({data}) => data);
