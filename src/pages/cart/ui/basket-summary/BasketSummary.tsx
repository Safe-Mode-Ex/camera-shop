import type {ChangeEvent, SubmitEvent} from 'react';
import {useState} from 'react';
import type {AxiosError} from 'axios';
import {useMutation} from '@tanstack/react-query';
import {useClearCoupon, useCoupon, validateCouponMutation} from '@/entities/coupons';
import BasketSummaryOrder from './basket-summary-order/BasketSummaryOrder';
import BasketPromo from './basket-promo/BasketPromo';

interface Props {
  total: number;
}

function BasketSummary({total}: Props) {
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

  if (isTouched && isError) {
    setIsTouched(false);
  }

  const handleCouponChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCouponValue(evt.target.value);
    setIsTouched(true);
  };

  const handleCouponValidate = (evt: SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (couponValue) {
      validateCoupon(couponValue);
    }
  };

  const handleCouponBlur = () => {
    if (!couponValue) {
      clearCoupon();
    }
  };

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div className="basket__summary">
      <BasketPromo
        promoCode={couponValue}
        isCouponValueValid={isCouponValueValid}
        handlePromoCodeChange={handleCouponChange}
        handleCouponValidate={handleCouponValidate}
        handleCouponBlur={handleCouponBlur}
        isError={isError}
      />

      <BasketSummaryOrder total={total} />
    </div>
  );
}

export default BasketSummary;
