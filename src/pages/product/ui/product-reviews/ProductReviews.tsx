import {FilledButton} from '@/shared/ui/button';
import {useAddReviewModal, useProductReviews} from '../../model/hooks';
import AddReviewProcess from '../add-review-process/AddReviewProcess';
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
  const {isAddReviewOpen, handleModalOpen, handleModalClose} = useAddReviewModal();

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button" onClick={handleModalOpen}>Оставить свой отзыв</button>
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

      <AddReviewProcess
        isOpen={isAddReviewOpen}
        onClose={handleModalClose}
      />
    </section>
  );
}

export default ProductReviews;
