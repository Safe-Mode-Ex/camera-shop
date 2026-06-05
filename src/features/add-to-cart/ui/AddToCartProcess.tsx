import type {Product} from '@/shared/dto';
import {Modal} from '@/shared/ui/modal';
import AddToCart from './add-to-cart/AddToCart';
import AddToCartSuccess from './add-to-cart-success/AddToCartSuccess';

interface Props {
  product: Product;
  inCart: boolean;
  isOpen: boolean;
  onClose: () => void;
}

function AddToCartProcess({product, inCart, isOpen, onClose}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isNarrow={inCart}>
      {inCart ? (
        <AddToCartSuccess onClose={onClose} />
      ) : (
        <AddToCart
          product={product}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Modal>
  );
}

export default AddToCartProcess;
