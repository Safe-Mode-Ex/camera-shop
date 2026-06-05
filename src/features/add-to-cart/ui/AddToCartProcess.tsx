import type {Product} from '@/shared/dto';
import {Modal} from '@/shared/ui/modal';
import AddToCart from './add-to-cart/AddToCart';
import AddToCartSuccess from './add-to-cart-success/AddToCartSuccess';
import {useState} from 'react';

interface Props {
  product: Product;
  isOpen: boolean;
  onContinue: () => void;
  onClose: () => void;
}

function AddToCartProcess({
  product,
  isOpen,
  onContinue,
  onClose,
}: Props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSuccessAddition = () => {
    setIsSuccess(true);
  };
  const handleTransitionEnd = () => {
    setIsSuccess(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isNarrow={isSuccess}
      onTransitionEnd={handleTransitionEnd}
    >
      {isSuccess ? (
        <AddToCartSuccess onContinue={onContinue} />
      ) : (
        <AddToCart
          product={product}
          onSuccess={handleSuccessAddition}
        />
      )}
    </Modal>
  );
}

export default AddToCartProcess;
