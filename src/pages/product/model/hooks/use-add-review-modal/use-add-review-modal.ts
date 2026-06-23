import type {MouseEvent} from 'react';
import {useState} from 'react';

export const useAddReviewModal = () => {
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);

  const handleModalOpen = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsAddReviewOpen(true);
  };

  const handleModalClose = () => {
    setIsAddReviewOpen(false);
  };

  return {
    isAddReviewOpen,
    handleModalOpen,
    handleModalClose,
  };
};
