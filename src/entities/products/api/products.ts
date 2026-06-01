import type {Product, DetailedProduct} from '@/shared/dto';
import {Domen} from '../enums';
import {httpApi} from '@/shared/api';

export const getProducts = async () =>
  httpApi
    .get<Product[]>(Domen.Cameras)
    .then(({data}) => data);

export const getProductById = async (productId: number) => {
  const entityId = productId.toString();
  return httpApi
    .get<DetailedProduct>(`${Domen.Cameras}/${entityId}`)
    .then(({data}) => data);
};

export const getSimilarProducts = async (productId: string) =>
  httpApi
    .get<Product[]>(`${Domen.Cameras}/${productId}${Domen.Similar}`)
    .then(({data}) => data);
