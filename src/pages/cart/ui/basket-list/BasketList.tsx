import type {CartItem} from '../../model/types';
import BasketItem from './basket-item/BasketItem';

interface Props {
  cartItems: CartItem[];
}

function BasketList({cartItems}: Props) {
  return (
    <ul className="basket__list">
      {cartItems.map(({product, quantity}) => (
        <BasketItem key={product.id} />
      ))}
    </ul>
  );
}

export default BasketList;
