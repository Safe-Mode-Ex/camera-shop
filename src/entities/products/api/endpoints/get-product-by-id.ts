import {httpApi} from '@/shared/api';
import type {DetailedProduct} from '@/shared/dto';
import {Domen} from '../../model/enums';

export const getProductById = async (productId: number) => {
  const entityId = productId.toString();
  return httpApi
    .get<DetailedProduct>(`${Domen.Cameras}/${entityId}`)
    .then(({data}) => data);
};
