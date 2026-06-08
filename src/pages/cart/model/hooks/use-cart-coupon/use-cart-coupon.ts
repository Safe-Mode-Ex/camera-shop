import type {ChangeEvent, SubmitEvent} from 'react';
import {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import type {AxiosError} from 'axios';
import {validateCouponMutation, useCoupon, useClearCoupon} from '@/entities/coupons';
import {SPACE_SYMBOL} from '../../config';

export const useCartCoupon = () => {
  const clearCoupon = useClearCoupon();
  const {
    mutate: validateCoupon,
    isPending,
    isError,
    reset,
  } = useMutation<number, AxiosError<{messages: string[]}>, string>({
    ...validateCouponMutation,
    onError: () => {
      clearCoupon();
    },
  });
  const {data: promoCode} = useCoupon();

  const [couponValue, setCouponValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [hasError, setHasError] = useState(false);
  const isCouponValueValid = Boolean(promoCode && promoCode === couponValue);

  if (promoCode && !couponValue && !isTouched) {
    setCouponValue(promoCode);
  }

  const handleCouponChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCouponValue(evt.target.value);
    setIsTouched(true);

    if (hasError) {
      setHasError(false);
    }
  };

  const handleCouponValidate = (evt: SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const preparedCouponValue = couponValue.trim();
    if (preparedCouponValue !== couponValue) {
      setCouponValue(preparedCouponValue);
    }
    if (!preparedCouponValue) {
      return;
    }

    const isRestricted = preparedCouponValue.includes(SPACE_SYMBOL);
    if (isRestricted) {
      setHasError(true);
      return;
    }

    validateCoupon(preparedCouponValue);
    setIsTouched(false);

    if (hasError) {
      setHasError(false);
    }
  };

  const handleCouponBlur = () => {
    if (!couponValue) {
      clearCoupon();
    }
  };

  const clearCouponValue = () => {
    if (couponValue) {
      setCouponValue('');
    }
    if (isError) {
      reset();
    }
  };

  return {
    couponValue,
    isCouponValueValid,
    handleCouponChange,
    handleCouponValidate,
    handleCouponBlur,
    clearCouponValue,
    isPending,
    isError: (isError && !isTouched) || hasError,
  };
};
