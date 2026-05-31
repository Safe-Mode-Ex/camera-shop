import {ProductCard} from '@/entities/product-cards';
import {useSimilarProducts} from '../../model/hooks';
import './ProductSimilar.css';

interface Props {
  productId: string | undefined;
}

function ProductSimilar({productId}: Props) {
  const {data: similarProducts} = useSimilarProducts(productId);

  if (!similarProducts) {
    return null;
  }

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {similarProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} className={index < 3 ? 'is-active' : ''} />
            ))}
          </div>
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            disabled
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductSimilar;
