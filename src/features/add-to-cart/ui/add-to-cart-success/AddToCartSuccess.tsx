import {AppRoute} from '@/shared/enums';
import {FilledButton, TransparentButton} from '@/shared/ui/button';
import {Icon} from '@/shared/ui/icon';
import {Modal} from '@/shared/ui/modal';

interface Props {
  onContinue: () => void;
}

function AddToCartSuccess({onContinue}: Props) {
  return (
    <>
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <Icon className="modal__icon" title="icon-success" width="86" height="80" />

      <Modal.Buttons>
        <TransparentButton
          onClick={onContinue}
          className="modal__btn"
        >
          Продолжить покупки
        </TransparentButton>

        <FilledButton
          className="modal__btn modal__btn--fit-width"
          to={AppRoute.Cart}
        >
          Перейти в корзину
        </FilledButton>
      </Modal.Buttons>
    </>
  );
}

export default AddToCartSuccess;
