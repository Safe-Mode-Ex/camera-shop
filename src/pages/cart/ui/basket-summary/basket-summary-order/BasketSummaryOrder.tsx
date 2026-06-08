import {useState, type MouseEvent} from 'react';
import {useMutation} from '@tanstack/react-query';
import {formatPrice} from '@/shared/lib/format-price';
import {FilledButton} from '@/shared/ui/button';
import {LoadingScreen} from '@/shared/ui/loading-screen';
import {Modal} from '@/shared/ui/modal';
import {Icon} from '@/shared/ui/icon';
import {AppRoute} from '@/shared/enums';
import {useDiscount} from '@/entities/coupons';
import {createOrderMutation} from '@/entities/orders';
import {useCartItems} from '@/pages/cart/model';

interface Props {
  total: number;
  coupon: string | null;
}

function BasketSummaryOrder({total, coupon}: Props) {
  const {data: discount} = useDiscount();
  const bonus = discount ? total * discount / 100 : 0;
  const payment = total - bonus;

  const {mutate: createOrder, isSuccess, isPending} = useMutation(createOrderMutation);
  const {data: cartItems} = useCartItems();
  const [isOrderCreated, setIsOrderCreated] = useState(isSuccess);

  const handleOrderCreate = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    const camerasIds = cartItems.map(({product}) => product.id);
    const order = {
      camerasIds,
      coupon,
    };

    createOrder(order);
  };

  const handleModalClose = () => {
    setIsOrderCreated(false);
  };

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
