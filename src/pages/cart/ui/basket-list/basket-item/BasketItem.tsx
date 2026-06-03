import type {Product} from '@/shared/dto';
import {formatPrice} from '@/shared/lib/format-price';
import {IconButton} from '@/shared/ui/button';
import {Icon} from '@/shared/ui/icon';
import {PreviewImage} from '@/shared/ui/preview-image';

interface Props {
  product: Product;
  quantity: number;
}

function BasketItem({product, quantity}: Props) {
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
  } = product;

  const imageSource = {previewImg, previewImg2x, previewImgWebp, previewImgWebp2x};

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
          <li className="basket-item__list-item">{type} {category}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
      </div>

      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>
        {formatPrice(price)}
      </p>

      <div className="quantity">
        <IconButton className="btn-icon--prev" aria-label="уменьшить количество товара">
          <Icon title="icon-arrow" width="7" height="12" />
        </IconButton>

        <input
          type="number"
          id="counter1"
          defaultValue={quantity}
          min="1"
          max="99"
          aria-label="количество товара"
        />

        <IconButton className="btn-icon--next" aria-label="увеличить количество товара">
          <Icon title="icon-arrow" width="7" height="12" />
        </IconButton>
      </div>

      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>
        {formatPrice(price * quantity)}
      </div>

      <button className="cross-btn" type="button" aria-label="Удалить товар">
        <Icon title="icon-close" width="10" height="10" />
      </button>
    </li>
  );
}

export default BasketItem;
