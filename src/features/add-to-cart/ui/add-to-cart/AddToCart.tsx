import type {Product} from '@/shared/dto';
import {formatPrice} from '@/shared/lib/format-price';
import {FilledButton} from '@/shared/ui/button';
import {Icon} from '@/shared/ui/icon';
import {Modal} from '@/shared/ui/modal';
import {PreviewImage} from '@/shared/ui/preview-image';
import {useHandleCartAddition} from '../../model';

const {BASE_URL} = import.meta.env;

interface Props {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

function AddToCart({product}: Props) {
  const {
    id,
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
  const handleCartAddition = useHandleCartAddition(id);

  return (
    <>
      <p className="title title--h4">Добавить товар в корзину</p>

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
              <span className="basket-item__article">Артикул:</span>
              <span className="basket-item__number">{vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{type} {category}</li>
            <li className="basket-item__list-item">{level} уровень</li>
          </ul>
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>
            {formatPrice(price)}
          </p>
        </div>
      </div>

      <Modal.Buttons>
        <FilledButton
          className="modal__btn modal__btn--fit-width"
          onClick={handleCartAddition}
        >
          <Icon title="icon-add-basket" width="24" height="16" />
          Добавить в корзину
        </FilledButton>
      </Modal.Buttons>
    </>
  );
}

export default AddToCart;
