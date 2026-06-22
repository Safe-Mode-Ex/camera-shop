import {FilledButton} from '@/shared/ui/button';
import {useProductReviews} from '../../model/hooks';
import ProductReviewCard from './product-review-card/ProductReviewCard';
import './ProductReviews.css';

interface Props {
  productId?: string;
}

function ProductReviews({productId}: Props) {
  const [
    reviews,
    isShowMoreBtnVisible,
    handleShowMoreBtnClick,
  ] = useProductReviews(productId);

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          {/* <button className="btn" type="button">Оставить свой отзыв</button> */}
        </div>

        <ul className="review-block__list">
          {reviews.map((review) => (
            <ProductReviewCard key={review.id} {...review} />
          ))}
        </ul>

        <div className="review-block__buttons">
          {isShowMoreBtnVisible && (
            <FilledButton onClick={handleShowMoreBtnClick}>
              Показать больше отзывов
            </FilledButton>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductReviews;
