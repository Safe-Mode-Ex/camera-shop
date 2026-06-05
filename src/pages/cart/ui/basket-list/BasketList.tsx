import type {MouseEvent, MouseEventHandler} from 'react';
import {useState} from 'react';
import {FilledButton, IconButton, TransparentButton} from '@/shared/ui/button';
import type {Product} from '@/shared/dto';
import {Modal} from '@/shared/ui/modal';
import {ShortCartItem} from '@/shared/ui/short-cart-item';
import BasketItem from './basket-item/BasketItem';
import type {CartItem} from '../../model/types';

interface Props {
  cartItems: CartItem[];
}

function BasketList({cartItems}: Props) {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<Product | null>(null);
  const [onRemove, setOnRemove] = useState<(() => void) | null>(null);

  const handleRemoveModalOpen = (id: number, onRemoveCb: () => void) =>
    (evt: MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();

      const cartItem =
        cartItems.find(({product}) => product.id === id);

      if (cartItem) {
        setItemToRemove(cartItem.product);
        setIsRemoveModalOpen(true);
        setOnRemove(onRemoveCb);
      }
    };

  const handleRemoveModalClose = () => {
    setIsRemoveModalOpen(false);
  };

  const handleRemoveItem = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (onRemove) {
      onRemove();
      setIsRemoveModalOpen(false);
    }
  };

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
