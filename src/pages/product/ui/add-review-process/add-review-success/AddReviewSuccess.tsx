import {FilledButton} from '@/shared/ui/button';
import {Icon} from '@/shared/ui/icon';
import {Modal} from '@/shared/ui/modal';

interface Props {
  onContinue: () => void;
}

function AddReviewSuccess({onContinue}: Props) {
  return (
    <>
      <p className="title title--h4">Спасибо за отзыв</p>
      <Icon className="modal__icon" title="icon-review-success" width="80" height="78" />

      <Modal.Buttons>
        <FilledButton
          className="modal__btn modal__btn--fit-width"
          onClick={onContinue}
        >
          Вернуться к покупкам
        </FilledButton>
      </Modal.Buttons>
    </>
  );
}

export default AddReviewSuccess;
