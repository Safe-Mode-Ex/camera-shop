import BasketPromo from './basket-promo/BasketPromo';
import BasketSummaryOrder from './basket-summary-order/BasketSummaryOrder';

function BasketSummary() {
  return (
    <div className="basket__summary">
      <BasketPromo />

      <BasketSummaryOrder />
    </div>
  );
}

export default BasketSummary;
