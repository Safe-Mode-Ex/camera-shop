import {Breadcrumbs} from '@/widgets/breadcrumbs';
import {useCartItems} from '../model/hooks';
import BasketList from './basket-list/BasketList';
import BasketSummary from './basket-summary/BasketSummary';
import './Cart.css';
import BasketEmpty from './basket-empty/BasketEmpty';

function Cart() {
  const {data: cartItems} = useCartItems();
  const cartTotal = cartItems.reduce((result, {product, quantity}) => (
    result + product.price * quantity
  ), 0);

  return (
    <main className="page">
      <div className="page-content">
        <Breadcrumbs />

        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>

            {cartTotal ? <BasketList cartItems={cartItems} /> : <BasketEmpty />}

            <BasketSummary total={cartTotal} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Cart;
