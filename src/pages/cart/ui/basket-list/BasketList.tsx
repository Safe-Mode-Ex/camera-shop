import {FilledButton, TransparentButton} from '@/shared/ui/button';
import {Modal} from '@/shared/ui/modal';
import {ShortCartItem} from '@/shared/ui/short-cart-item';
import type {CartItem} from '../../model/types';
import {useRemoveFromCartModal} from '../../model/hooks';
import BasketItem from './basket-item/BasketItem';

interface Props {
  cartItems: CartItem[];
}

function BasketList({cartItems}: Props) {
  const {
    itemToRemove,
    isRemoveModalOpen,
    handleRemoveModalOpen,
    handleRemoveModalClose,
    handleRemoveItem,
  } = useRemoveFromCartModal(cartItems);

  return (
    <ul className="basket__list">
      {cartItems.map(({product, quantity}) => (
        <BasketItem
          key={product.id}
          product={product}
          quantity={quantity}
          handleRemoveModalOpen={handleRemoveModalOpen}
        />
      ))}

      <Modal isOpen={isRemoveModalOpen} onClose={handleRemoveModalClose}>
        <p className="title title--h4">Удалить этот товар?</p>

        {itemToRemove && <ShortCartItem product={itemToRemove} showPrice={false} />}

        <Modal.Buttons>
          <FilledButton
            className="modal__btn modal__btn--half-width"
            onClick={handleRemoveItem}
          >
            Удалить
          </FilledButton>

          <TransparentButton
            className="modal__btn modal__btn--half-width"
            onClick={handleRemoveModalClose}
          >
            Продолжить покупки
          </TransparentButton>
        </Modal.Buttons>
      </Modal>
    </ul>
  );
}

export default BasketList;
