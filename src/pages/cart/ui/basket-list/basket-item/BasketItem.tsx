import type {MouseEventHandler} from 'react';
import type {Product} from '@/shared/dto';
import {formatPrice} from '@/shared/lib/format-price';
import {Icon} from '@/shared/ui/icon';
import {PreviewImage} from '@/shared/ui/preview-image';
import {useCartItemHandlers} from '@/pages/cart/model/hooks';
import Quantity from './quantity/Quantity';

interface Props {
  product: Product;
  quantity: number;
  handleRemoveModalOpen: (id: number, onRemoveCb: () => void) =>
  MouseEventHandler<HTMLButtonElement>;
}

function BasketItem({product, quantity, handleRemoveModalOpen}: Props) {
  const {
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    vendorCode,
    type,
    level,
    price,
    category,
    id,
  } = product;

  const imageSource = {previewImg, previewImg2x, previewImgWebp, previewImgWebp2x};
  const {handleQuantityChange, handleRemoveItem} = useCartItemHandlers(id);

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <PreviewImage
          imageSource={imageSource}
          width="140"
          height="120"
          alt={`${category} ${name}`}
        />
      </div>

      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>&nbsp;
            <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{type} {category.toLowerCase()}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
      </div>

      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>
        {formatPrice(price)}
      </p>

      <Quantity
        quantity={quantity}
        handleQuantityChange={handleQuantityChange}
      />

      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>
        {formatPrice(price * quantity)}
      </div>

      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={handleRemoveModalOpen(id, handleRemoveItem)}
      >
        <Icon title="icon-close" width="10" height="10" />
      </button>
    </li>
  );
}

export default BasketItem;
