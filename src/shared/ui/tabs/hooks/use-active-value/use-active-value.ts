import type {MouseEvent} from 'react';
import {useTabsContext} from '../use-tabs-context/use-tabs-context';

export const useActiveValue = (value: string): [
  boolean,
  (evt: MouseEvent<HTMLAnchorElement>) => void,
] => {
  const {activeValue, setActiveValue} = useTabsContext();
  const isActive = activeValue === value;

  const handleTabsControlClick = () => {
    setActiveValue(value);
  };

  return [isActive, handleTabsControlClick];
};
