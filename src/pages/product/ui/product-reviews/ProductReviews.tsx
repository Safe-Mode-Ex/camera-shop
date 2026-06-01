import {useReviews} from '../../api';
import ProductReviewCard from './product-review-card/ProductReviewCard';
import './ProductReviews.css';

interface Props {
  productId?: string;
}

function ProductReviews({productId}: Props) {
  const {data: reviews} = useReviews(productId);

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
          <button className="btn btn--purple" type="button">Показать больше отзывов
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductReviews;
