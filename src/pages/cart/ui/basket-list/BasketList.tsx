import BasketItem from './basket-item/BasketItem';

function BasketList() {
  return (
    <ul className="basket__list">
      <BasketItem />
      <BasketItem />
    </ul>
  );
}

export default BasketList;
