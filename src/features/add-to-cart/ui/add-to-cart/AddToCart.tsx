import type {Product} from '@/shared/dto';
import {FilledButton} from '@/shared/ui/button';
import {Icon} from '@/shared/ui/icon';
import {Modal} from '@/shared/ui/modal';
import {ShortCartItem} from '@/shared/ui/short-cart-item';
import {useHandleCartAddition} from '../../model';


interface Props {
  product: Product;
  onSuccess: () => void;
}

function AddToCart({product, onSuccess}: Props) {
  const {id} = product;
  const handleCartAddition = useHandleCartAddition(id, onSuccess);

  return (
    <>
      <p className="title title--h4">Добавить товар в корзину</p>

      <ShortCartItem product={product} />

      <Modal.Buttons>
        <FilledButton
          className="modal__btn modal__btn--fit-width"
          onClick={handleCartAddition}
        >
          <Icon title="icon-add-basket" width="24" height="16" />
          Добавить в корзину
        </FilledButton>
      </Modal.Buttons>
    </>
  );
}

export default AddToCart;
