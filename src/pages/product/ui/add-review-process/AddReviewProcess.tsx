import {useMutation} from '@tanstack/react-query';
import {Modal} from '@/shared/ui/modal';
import {createReviewMutation} from '../../api/mutations';
import AddReview from './add-review/AddReview';
import AddReviewSuccess from './add-review-success/AddReviewSuccess';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function AddReviewProcess({isOpen, onClose}: Props) {
  const {isSuccess, isPending, mutate: createReview, reset} = useMutation(createReviewMutation);

  const handleTransitionEnd = () => {
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      isNarrow={isSuccess}
      onClose={onClose}
      onTransitionEnd={handleTransitionEnd}
    >
      {isSuccess
        ? <AddReviewSuccess onContinue={onClose} />
        : <AddReview createReview={createReview} isPending={isPending} />}
    </Modal>
  );
}

export default AddReviewProcess;
