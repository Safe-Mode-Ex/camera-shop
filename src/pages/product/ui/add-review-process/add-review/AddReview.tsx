import type {UseMutateFunction} from '@tanstack/react-query';
import type {Review, UserReview} from '@/pages/product/dto';
import ReviewForm from '../review-form/ReviewForm';

interface Props {
  createReview: UseMutateFunction<Review, Error, UserReview>;
  isPending: boolean;
}

function AddReview({createReview, isPending}: Props) {
  return (
    <>
      <p className="title title--h4">Оставить отзыв</p>
      <ReviewForm createReview={createReview} isPending={isPending} />
    </>
  );
}

export default AddReview;
