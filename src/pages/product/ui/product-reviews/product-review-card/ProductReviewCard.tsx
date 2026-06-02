import {Rate} from '@/shared/ui/rate';
import type {Review} from '@/pages/product/dto';
import {getReviewDate} from '@/pages/product/model/utils';

function ProductReviewCard({
  userName,
  rating,
  advantage,
  disadvantage,
  review,
  createAt,
}: Review) {
  const [dateTime, reviewDate] = getReviewDate(createAt);

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={dateTime}>{reviewDate}</time>
      </div>

      <Rate rating={rating} className="review-card__rate" hiddenLabel="Оценка" />

      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ProductReviewCard;
