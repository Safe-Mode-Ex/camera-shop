import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import {Icon} from '@/shared/ui/icon';
import {ProductCard} from '@/entities/product-cards';
import {useSimilarProducts} from '../../api/queries';
import './ProductSimilar.css';


interface Props {
  productId: string | undefined;
}

function ProductSimilar({productId}: Props) {
  const {data: similarProducts} = useSimilarProducts(productId);

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            <Swiper
              modules={[Navigation]}
              slidesPerView={3}
              spaceBetween={32}
              navigation={{
                prevEl: '.slider-controls--prev',
                nextEl: '.slider-controls--next',
              }}
            >
              {similarProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} className="is-active" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
          >
            <Icon title="icon-arrow" width="7" height="12" />
          </button>

          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
          >
            <Icon title="icon-arrow" width="7" height="12" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductSimilar;
