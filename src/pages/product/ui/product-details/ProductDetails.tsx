import type {DetailedProduct} from '@/shared/dto';
import {FilledButton} from '@/shared/ui/button';
import {Icon} from '@/shared/ui/icon';
import {formatPrice} from '@/shared/lib/format-price';
import {PreviewImage} from '@/shared/ui/preview-image';
import {Rate} from '@/shared/ui/rate';
import {Tabs} from '@/shared/ui/tabs';
import {AddToCartProcess} from '@/features/add-to-cart';
import {useAddToCartModal} from '../../model/hooks';
import './ProductDetails.css';

const {BASE_URL} = import.meta.env;

interface Props {
  product: DetailedProduct;
}

function ProductDetails({product}: Props) {
  const {
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    name,
    rating,
    reviewCount,
    price,
    vendorCode,
    category,
    type,
    level,
    description,
  } = product;

  const imageSource = {
    previewImg: `${BASE_URL}${previewImg}`,
    previewImg2x: `${BASE_URL}${previewImg2x}`,
    previewImgWebp: `${BASE_URL}${previewImgWebp}`,
    previewImgWebp2x: `${BASE_URL}${previewImgWebp2x}`,
  };

  const {isAddCartOpen, handleModalOpen, handleModalClose, onContinue} = useAddToCartModal();

  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <PreviewImage
            imageSource={imageSource}
            width="560"
            height="480"
            alt={name}
          />
        </div>

        <div className="product__content">
          <h1 className="title title--h3">{name}</h1>

          <Rate className="product__rate" rating={rating} total={reviewCount} />

          <p className="product__price">
            <span className="visually-hidden">Цена:</span>
            {formatPrice(price)}
          </p>

          <FilledButton onClick={handleModalOpen}>
            <Icon title="icon-add-basket" width="24" height="16" />
            Добавить в корзину
          </FilledButton>

          <Tabs className="product__tabs" defaultValue="description">
            <Tabs.Controls className="product__tabs-controls">
              <Tabs.Control value="specs">Характеристики</Tabs.Control>
              <Tabs.Control value="description">Описание</Tabs.Control>
            </Tabs.Controls>

            <Tabs.Content>
              <Tabs.Element value="specs">
                <ul className="product__tabs-list">
                  <li className="item-list">
                    <span className="item-list__title">Артикул:</span>
                    <p className="item-list__text">{vendorCode}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Категория:</span>
                    <p className="item-list__text">{category}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Тип камеры:</span>
                    <p className="item-list__text">{type}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Уровень:</span>
                    <p className="item-list__text">{level}</p>
                  </li>
                </ul>
              </Tabs.Element>

              <Tabs.Element value="description">
                <div className="product__tabs-text">
                  <p>{description}</p>
                </div>
              </Tabs.Element>
            </Tabs.Content>
          </Tabs>
        </div>
      </div>

      <AddToCartProcess
        product={product}
        isOpen={isAddCartOpen}
        onContinue={onContinue}
        onClose={handleModalClose}
      />
    </section>
  );
}

export default ProductDetails;
