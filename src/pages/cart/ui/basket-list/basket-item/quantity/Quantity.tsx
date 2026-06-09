import type {MouseEventHandler} from 'react';
import {IconButton} from '@/shared/ui/button';
import {Icon} from '@/shared/ui/icon';
import {MIN_PRODUCT_QUANTITY, MAX_PRODUCT_QUANTITY} from '@/pages/cart/model/config';
import './Quantity.css';

interface Props {
  quantity: number;
  handleQuantityIncrease: MouseEventHandler<HTMLButtonElement>,
  handleQuantityDecrease: MouseEventHandler<HTMLButtonElement>,
}

function Quantity({quantity, handleQuantityIncrease, handleQuantityDecrease}: Props) {
  return (
    <div className="quantity">
      <IconButton
        className="btn-icon--prev"
        aria-label="уменьшить количество товара"
        disabled={quantity === MIN_PRODUCT_QUANTITY}
        onClick={handleQuantityDecrease}
      >
        <Icon title="icon-arrow" width="7" height="12" />
      </IconButton>

      <input
        type="number"
        value={quantity}
        min={MIN_PRODUCT_QUANTITY}
        max={MAX_PRODUCT_QUANTITY}
        aria-label="количество товара"
        readOnly
      />

      <IconButton
        className="btn-icon--next"
        aria-label="увеличить количество товара"
        onClick={handleQuantityIncrease}
        disabled={quantity === MAX_PRODUCT_QUANTITY}
      >
        <Icon title="icon-arrow" width="7" height="12" />
      </IconButton>
    </div>
  );
}

export default Quantity;
