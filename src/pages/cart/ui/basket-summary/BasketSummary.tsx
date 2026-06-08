import {LoadingScreen} from '@/shared/ui/loading-screen';
import {useCartCoupon} from '../../model/hooks';
import BasketSummaryOrder from './basket-summary-order/BasketSummaryOrder';
import BasketPromo from './basket-promo/BasketPromo';

interface Props {
  total: number;
}

function BasketSummary({total}: Props) {
  const {
    couponValue,
    isCouponValueValid,
    handleCouponChange,
    handleCouponValidate,
    handleCouponBlur,
    isPending,
    isError,
  } = useCartCoupon();

  if (isPending) {
    return <LoadingScreen />;
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
