import type {ChangeEventHandler, FocusEventHandler, SubmitEventHandler} from 'react';
import {InputType} from '@/shared/enums';
import {CustomInput} from '@/shared/ui/input';
import classNames from 'classnames';

interface Props {
  promoCode?: string;
  isCouponValueValid: boolean;
  handlePromoCodeChange: ChangeEventHandler<HTMLInputElement>;
  handleCouponValidate: SubmitEventHandler<HTMLFormElement>;
  handleCouponBlur: FocusEventHandler<HTMLInputElement>;
  isError?: boolean;
}

function BasketPromo({
  promoCode = '',
  handlePromoCodeChange,
  handleCouponValidate,
  isCouponValueValid,
  handleCouponBlur,
  isError,
}: Props) {
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
            value={promoCode}
            onChange={handlePromoCodeChange}
            onBlur={handleCouponBlur}
            placeholder="Введите промокод"
            label="Промокод"
            className={classNames({
              'is-valid': isCouponValueValid,
              'is-invalid': isError,
            })}
          >
            {/* TODO: сделать составной компонент */}
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </CustomInput>

          <button className="btn" type="submit">Применить</button>
        </form>
      </div>
    </div>
  );
}

export default BasketPromo;
