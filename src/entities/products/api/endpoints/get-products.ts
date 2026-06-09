import {httpApi} from '@/shared/api';
import type {Product} from '@/shared/dto';
import {Domen} from '../../model/enums';

export const getProducts = async () =>
  httpApi
    .get<Product[]>(Domen.Cameras)
    .then(({data}) => data);
