import {formatPrice} from '@/shared/lib/format-price';
import {FilledButton} from '@/shared/ui/button';

interface Props {
  total: number;
}

function BasketSummaryOrder({total}: Props) {
  return (
    <div className="basket__summary-order">
      <p className="basket__summary-item">
        <span className="basket__summary-text">Всего:</span>
        <span className="basket__summary-value">{formatPrice(total)}</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text">Скидка:</span>
        <span className="basket__summary-value basket__summary-value--bonus">0 ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
        <span className="basket__summary-value basket__summary-value--total">111 390 ₽</span>
      </p>

      <FilledButton type="submit">Оформить заказ</FilledButton>
    </div>
  );
}

export default BasketSummaryOrder;
