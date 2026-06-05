import type {MouseEvent, MouseEventHandler} from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '@/shared/enums';

export const useAddToCartModal = (): {
  isAddCartOpen: boolean;
  handleModalOpen: MouseEventHandler<HTMLButtonElement>;
  handleModalClose: () => void;
  onContinue: () => void;
} => {
  const [isAddCartOpen, setIsAddCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleModalOpen = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsAddCartOpen(true);
  };
  const handleModalClose = () => {
    setIsAddCartOpen(false);
  };
  const onContinue = () => {
    void navigate(AppRoute.Catalog);
  };

  return {
    isAddCartOpen,
    handleModalOpen,
    handleModalClose,
    onContinue,
  };
};
