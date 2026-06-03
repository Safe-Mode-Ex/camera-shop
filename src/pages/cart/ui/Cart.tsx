import {Breadcrumbs} from '@/widgets/breadcrumbs';
import {useCartItems} from '../model';
import BasketList from './basket-list/BasketList';
import BasketSummary from './basket-summary/BasketSummary';
import './Cart.css';

function Cart() {
  const {data: cartItems} = useCartItems();

  return (
    <main>
      <div className="page-content">
        <Breadcrumbs />

        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>

            <BasketList cartItems={cartItems} />

            <BasketSummary />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Cart;
