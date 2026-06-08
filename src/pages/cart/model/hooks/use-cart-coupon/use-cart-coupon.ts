import type {ChangeEvent, SubmitEvent} from 'react';
import {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import type {AxiosError} from 'axios';
import {validateCouponMutation, useCoupon, useClearCoupon} from '@/entities/coupons';

export const useCartCoupon = () => {
  const {
    mutate: validateCoupon,
    isPending,
    isError,
  } = useMutation<number, AxiosError<{messages: string[]}>, string>(validateCouponMutation);
  const {data: promoCode} = useCoupon();
  const clearCoupon = useClearCoupon();

  const [couponValue, setCouponValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const isCouponValueValid = Boolean(promoCode && promoCode === couponValue);

  if (promoCode && !couponValue && !isTouched) {
    setCouponValue(promoCode);
  }

  const handleCouponChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCouponValue(evt.target.value);
    setIsTouched(true);
  };

  const handleCouponValidate = (evt: SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (couponValue) {
      validateCoupon(couponValue);
      setIsTouched(false);
    }
  };

  const handleCouponBlur = () => {
    if (!couponValue) {
      clearCoupon();
    }
  };

  return {
    couponValue,
    isCouponValueValid,
    handleCouponChange,
    handleCouponValidate,
    handleCouponBlur,
    isPending,
    isError: isError && !isTouched,
  };
};
