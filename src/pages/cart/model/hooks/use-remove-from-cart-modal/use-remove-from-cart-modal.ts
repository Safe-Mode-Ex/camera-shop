import type {MouseEvent, MouseEventHandler} from 'react';
import {useState} from 'react';
import type {Product} from '@/shared/dto';
import type {CartItem} from '../../types';

export const useRemoveFromCartModal = (cartItems: CartItem[]): {
  itemToRemove: Product | null;
  isRemoveModalOpen: boolean;
  handleRemoveModalOpen: (id: number, onRemoveCb: () => void) =>
  (evt: MouseEvent<HTMLButtonElement>) => void;
  handleRemoveModalClose: () => void;
  handleRemoveItem: MouseEventHandler<HTMLButtonElement>;
} => {
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

  return {
    itemToRemove,
    isRemoveModalOpen,
    handleRemoveModalOpen,
    handleRemoveModalClose,
    handleRemoveItem,
  };
};
