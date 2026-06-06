import {httpApi} from '@/shared/api';
import {Domen} from '../enums';

export const validateCoupon = async (coupon: string) =>
  httpApi
    .post<number>(Domen.Coupons, coupon)
    .then(({data}) => data);
