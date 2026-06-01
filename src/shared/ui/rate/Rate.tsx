import classNames from 'classnames';
import {RateStars} from '../rate-stars';

interface Props {
  rating: number;
  total?: number;
  className?: string;
  hiddenLabel?: string;
}

function Rate({rating, total, className, hiddenLabel = 'Рейтинг'}: Props) {
  return (
    <div className={classNames('rate', className)}>
      <RateStars rating={rating} />
      <p className="visually-hidden">{hiddenLabel}: { rating }</p>
      {Boolean(total) && (
        <p className="rate__count">
          <span className="visually-hidden">Всего оценок:</span>
          { total }
        </p>
      )}
    </div>
  );
}

export default Rate;
