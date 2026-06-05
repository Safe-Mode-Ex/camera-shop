import type {Product} from '@/shared/dto';
import {formatPrice} from '@/shared/lib/format-price';
import {PreviewImage} from '../preview-image';

const {BASE_URL} = import.meta.env;

interface Props {
  product: Product;
  showPrice?: boolean;
}

function ShortCartItem({product, showPrice = true}: Props) {
  const {
    category,
    type,
    name,
    level,
    vendorCode,
    price,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = product;
  /* TODO: Вынести уже, наконец, в хэлпер */
  const imageSource = {
    previewImg: `${BASE_URL}${previewImg}`,
    previewImg2x: `${BASE_URL}${previewImg2x}`,
    previewImgWebp: `${BASE_URL}${previewImgWebp}`,
    previewImgWebp2x: `${BASE_URL}${previewImgWebp2x}`,
  };

  return (
    <div className="basket-item basket-item--short">
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
        {showPrice && (
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>
            {formatPrice(price)}
          </p>
        )}
      </div>
    </div>
  );
}

export default ShortCartItem;
