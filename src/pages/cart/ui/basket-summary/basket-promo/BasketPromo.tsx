import type {ChangeEventHandler, FocusEventHandler, SubmitEventHandler} from 'react';
import classNames from 'classnames';
import {InputType} from '@/shared/enums';
import {CustomInput} from '@/shared/ui/input';
import {COUPON_MIN_LENGTH} from '@/pages/cart/model/config';

interface Props {
  promoCode?: string | null;
  isCouponValueValid: boolean;
  handlePromoCodeChange: ChangeEventHandler<HTMLInputElement>;
  handleCouponValidate: SubmitEventHandler<HTMLFormElement>;
  handleCouponBlur: FocusEventHandler<HTMLInputElement>;
  isError?: boolean;
}

function BasketPromo({
  promoCode,
  handlePromoCodeChange,
  handleCouponValidate,
  isCouponValueValid,
  handleCouponBlur,
  isError,
}: Props) {
  const isSubmitButtonDisabled = !promoCode || promoCode.length < COUPON_MIN_LENGTH;

  return (
    <div className="basket__promo">
      <p className="title title--h4">
        Если у вас есть промокод на скидку,
        примените его в этом поле
      </p>

      <div className="basket-form">
        <form onSubmit={handleCouponValidate}>
          <CustomInput
            type={InputType.text}
            name="promo"
            value={promoCode ?? ''}
            onChange={handlePromoCodeChange}
            onBlur={handleCouponBlur}
            placeholder="Введите промокод"
            label="Промокод"
            className={classNames({
              'is-valid': isCouponValueValid,
              'is-invalid': isError && !isCouponValueValid,
            })}
          >
            <CustomInput.Error>Промокод неверный</CustomInput.Error>
            <CustomInput.Success>Промокод принят!</CustomInput.Success>
          </CustomInput>

          <button
            className="btn"
            type="submit"
            disabled={isSubmitButtonDisabled}
          >Применить
          </button>
        </form>
      </div>
    </div>
  );
}

export default BasketPromo;
