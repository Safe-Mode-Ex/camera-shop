import type {Product} from '@/shared/dto';
import {Modal} from '@/shared/ui/modal';
import AddToCart from './add-to-cart/AddToCart';
import {useAddToCartProcess} from '../model';
import AddToCartSuccess from './add-to-cart-success/AddToCartSuccess';

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
  const [isSuccess, handleSuccessAddition, handleTransitionEnd] = useAddToCartProcess();

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
