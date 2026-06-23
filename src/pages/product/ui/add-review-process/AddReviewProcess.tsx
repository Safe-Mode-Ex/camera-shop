import {Modal} from '@/shared/ui/modal';
import AddReview from './add-review/AddReview';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function AddReviewProcess({isOpen, onClose}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AddReview />
    </Modal>
  );
}

export default AddReviewProcess;
