import type {RefObject} from 'react';
import {useState} from 'react';
import {useClickAway} from '@uidotdev/usehooks';

export const useSearchListToggle = (): {
  isListOpen: boolean;
  searchInputRef: RefObject<HTMLFormElement>;
  handleOpenList: () => void;
  handleCloseList: () => void;
} => {
  const [isListOpen, setIsListOpen] = useState(false);

  const searchInputRef = useClickAway<HTMLFormElement>(() => {
    setIsListOpen(false);
  });

  const handleOpenList = () => {
    if (!isListOpen) {
      setIsListOpen(true);
    }
  };

  const handleCloseList = () => {
    setIsListOpen(false);
  };

  return {
    isListOpen,
    searchInputRef,
    handleOpenList,
    handleCloseList,
  };
};
