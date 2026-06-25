import {Icon} from '../icon';

const MAX_RATING = 5;

interface Props {
  rating: number;
}

function RateStars({rating}: Props) {
  return (
    Array.from({length: MAX_RATING}).map((_, index) => {
      const isFullStar = index + 1 <= rating;
      const key = `star-${index.toString()}`;

      return isFullStar ?
        <Icon key={key} title="icon-full-star" width="17" height="16" /> :
        <Icon key={key} title="icon-star" width="17" height="16" />;
    })
  );
}

export default RateStars;
