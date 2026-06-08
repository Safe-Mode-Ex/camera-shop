import type {AxiosResponse} from 'axios';
import {httpApi} from '@/shared/api';
import type {Order} from '../../model/types';
import {Domen} from '../../model/enums';

export const createOrder = async (order: Order) =>
  httpApi
    .post<unknown, AxiosResponse<void>, Order>(Domen.Orders, order)
    .then(({data}) => data);
