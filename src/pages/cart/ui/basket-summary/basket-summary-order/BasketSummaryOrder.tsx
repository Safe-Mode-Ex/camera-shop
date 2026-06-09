import {formatPrice} from '@/shared/lib/format-price';
import {FilledButton} from '@/shared/ui/button';
import {LoadingScreen} from '@/shared/ui/loading-screen';
import {Modal} from '@/shared/ui/modal';
import {Icon} from '@/shared/ui/icon';
import {AppRoute} from '@/shared/enums';
import {useOrder, usePayment} from '@/pages/cart/model/hooks';

interface Props {
  total: number;
  clearCouponValue: () => void;
}

function BasketSummaryOrder({total, clearCouponValue}: Props) {
  const [payment, bonus] = usePayment(total);

  const {
    isOrderCreated,
    handleOrderCreate,
    handleModalClose,
    isPending,
  } = useOrder(clearCouponValue);

  return (
    <>
      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">Всего:</span>
          <span className="basket__summary-value">{formatPrice(total)}</span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">Скидка:</span>
          <span className="basket__summary-value basket__summary-value--bonus">
            {formatPrice(bonus)}
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
          <span className="basket__summary-value basket__summary-value--total">
            {formatPrice(payment)}
          </span>
        </p>

        <FilledButton
          disabled={!total}
          onClick={handleOrderCreate}
        >
          Оформить заказ
        </FilledButton>
      </div>

      <Modal isOpen={isOrderCreated} onClose={handleModalClose} isNarrow>
        <p className="title title--h4">Спасибо за покупку</p>
        <Icon className="modal__icon" title="icon-review-success" width="80" height="78" />

        <Modal.Buttons>
          <FilledButton
            className="modal__btn modal__btn--fit-width"
            to={AppRoute.Catalog}
          >
            Вернуться к покупкам
          </FilledButton>
        </Modal.Buttons>
      </Modal>

      {isPending && <LoadingScreen />}
    </>
  );
}

export default BasketSummaryOrder;
