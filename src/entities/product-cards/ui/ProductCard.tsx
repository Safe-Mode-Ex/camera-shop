import type {MouseEvent} from 'react';
import {useState} from 'react';
import classNames from 'classnames';
import {FilledButton, OutlinedButton, TextButton} from '@/shared/ui/button';
import {PreviewImage} from '@/shared/ui/preview-image';
import {Rate} from '@/shared/ui/rate';
import {Icon} from '@/shared/ui/icon';
import type {Product} from '@/shared/dto';
import {AppRoute} from '@/shared/enums';
import {formatPrice} from '@/shared/lib/format-price';
import {AddToCartProcess} from '@/features/add-to-cart';
import './ProductCard.css';

const {BASE_URL} = import.meta.env;

interface Props {
  product: Product;
  inCart: boolean;
  className?: string;
}

function ProductCard({product, inCart, className}: Props) {
  const {
    id,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    name,
    rating,
    reviewCount,
    price,
  } = product;
  const formattedPrice = formatPrice(price);
  const productDetailsRoute = `${AppRoute.Catalog}/${id.toString()}`;
  /* TODO: Вынести уже, наконец, в хэлпер */
  const imageSource = {
    previewImg: `${BASE_URL}${previewImg}`,
    previewImg2x: `${BASE_URL}${previewImg2x}`,
    previewImgWebp: `${BASE_URL}${previewImgWebp}`,
    previewImgWebp2x: `${BASE_URL}${previewImgWebp2x}`,
  };

  const [isAddCartOpen, setIsAddCartOpen] = useState(false);
  const handleModalOpen = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsAddCartOpen(true);
  };
  const handleModalClose = () => {
    setIsAddCartOpen(false);
  };

  return (
    <div className={classNames('product-card', className)}>
      <div className="product-card__img">
        <PreviewImage
          imageSource={imageSource}
          width="280"
          height="240"
          alt={name}
        />
      </div>

      <div className="product-card__info">
        <Rate rating={rating} total={reviewCount} className="product-card__rate" />
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{formattedPrice}
        </p>
      </div>

      <div className="product-card__buttons">
        {inCart ? (
          <OutlinedButton
            className="product-card__btn product-card__btn--in-cart"
            to={AppRoute.Cart}
          >
            <Icon title="icon-basket" width="16" height="16" />
            В корзине
          </OutlinedButton>
        ) : (
          <FilledButton
            className="product-card__btn"
            onClick={handleModalOpen}
          >
            Купить
          </FilledButton>
        )}

        <TextButton href={productDetailsRoute}>Подробнее</TextButton>
      </div>

      <AddToCartProcess
        product={product}
        inCart={inCart}
        isOpen={isAddCartOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default ProductCard;
