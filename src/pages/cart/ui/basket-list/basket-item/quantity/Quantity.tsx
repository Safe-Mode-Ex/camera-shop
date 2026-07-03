import {IconButton} from '@/shared/ui/button';
import {Icon} from '@/shared/ui/icon';
import {MIN_PRODUCT_QUANTITY, MAX_PRODUCT_QUANTITY} from '@/pages/cart/model/config';
import {useQuantity} from '@/pages/cart/model/hooks';
import './Quantity.css';

interface Props {
  quantity: number;
  handleQuantityChange: (quantity: number) => void,
}

function Quantity({quantity, handleQuantityChange}: Props) {
  const {
    displayValue,
    isMin,
    isMax,
    handleDecreaseMouseDown,
    handleIncreaseMouseDown,
    handleChange,
    handleBlur,
    handleFocus,
    handleKeyDown,
  } = useQuantity({quantity, handleQuantityChange});

  return (
    <div className="quantity">
      <IconButton
        className="btn-icon--prev"
        aria-label="уменьшить количество товара"
        disabled={isMin}
        onMouseDown={isMin ? undefined : handleDecreaseMouseDown}
      >
        <Icon title="icon-arrow" width="7" height="12" />
      </IconButton>

      <input
        type="number"
        value={displayValue}
        min={MIN_PRODUCT_QUANTITY}
        max={MAX_PRODUCT_QUANTITY}
        aria-label="количество товара"
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />

      <IconButton
        className="btn-icon--next"
        aria-label="увеличить количество товара"
        disabled={isMax}
        onMouseDown={isMax ? undefined : handleIncreaseMouseDown}
      >
        <Icon title="icon-arrow" width="7" height="12" />
      </IconButton>
    </div>
  );
}

export default Quantity;
