import {useEffect} from 'react';

const IOS_REGEXP = /iPad|iPhone|iPod/;
const SCROLL_LOCK_CLASS = 'scroll-lock';
const SCROLL_LOCK_CLASS_IOS = 'scroll-lock-ios';

export const useScrollLock = (isActive: boolean): void => {
  useEffect(() => {
    if (isActive) {
      const isIOS = IOS_REGEXP.test(navigator.userAgent);
      document.body.classList.add(isIOS ? SCROLL_LOCK_CLASS_IOS : SCROLL_LOCK_CLASS);
    }
    return () => {
      document.body.classList.remove(SCROLL_LOCK_CLASS_IOS, SCROLL_LOCK_CLASS);
    };
  }, [isActive]);
};
