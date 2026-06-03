import BasketPromo from './basket-promo/BasketPromo';
import BasketSummaryOrder from './basket-summary-order/BasketSummaryOrder';

interface Props {
  total: number;
}

function BasketSummary({total}: Props) {
  return (
    <div className="basket__summary">
      <BasketPromo />

      <BasketSummaryOrder total={total} />
    </div>
  );
}

export default BasketSummary;
