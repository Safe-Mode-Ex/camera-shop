import type {RefObject} from 'react';
import {useState} from 'react';
import {useClickAway} from '@uidotdev/usehooks';

export const useSearchListToggle = (handleSearchReset: () => void): {
  isClickedAway: boolean;
  searchRef: RefObject<HTMLDivElement>;
  handleOpenList: () => void;
  handleCloseList: () => void;
} => {
  const [isClickedAway, setIsClickedAway] = useState(false);

  const searchRef = useClickAway<HTMLDivElement>(() => {
    setIsClickedAway(true);
  });

  const handleOpenList = () => {
    if (isClickedAway) {
      setIsClickedAway(false);
    }
  };

  const handleCloseList = () => {
    handleSearchReset();
    setIsClickedAway(true);
  };

  return {
    isClickedAway,
    searchRef,
    handleOpenList,
    handleCloseList,
  };
};
