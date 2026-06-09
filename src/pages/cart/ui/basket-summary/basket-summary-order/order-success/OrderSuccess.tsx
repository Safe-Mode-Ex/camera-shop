import {AppRoute} from '@/shared/enums';
import {FilledButton} from '@/shared/ui/button';
import {Icon} from '@/shared/ui/icon';
import {Modal} from '@/shared/ui/modal';

function OrderSuccess() {
  return (
    <>
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
    </>
  );
}

export default OrderSuccess;
