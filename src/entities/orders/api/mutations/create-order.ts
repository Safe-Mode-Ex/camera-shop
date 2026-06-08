import {mutationOptions} from '@tanstack/react-query';
import {createOrder} from '../endpoints/order';
import type {Order} from '../../model/types';

export const createOrderMutation = mutationOptions({
  mutationKey: ['orders'],
  mutationFn: async (order: Order) => createOrder(order),
});
