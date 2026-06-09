import {useDiscount} from '@/entities/coupons';

const MAX_PERCENT = 100;

export const usePayment = (total: number): [number, number] => {
  const {data: discount} = useDiscount();
  const bonus = discount ? total * discount / MAX_PERCENT : 0;
  const payment = total - bonus;

  return [payment, bonus];
};
