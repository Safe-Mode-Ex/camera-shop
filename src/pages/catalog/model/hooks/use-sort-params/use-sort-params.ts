import {useSearchParams} from 'react-router-dom';
import {priceUpSort} from '../../config';
import type {SortOrder, SortType} from '../../enums';
import type {Sort} from '../../types';

export const useSortParams = (): [
  Sort,
  (key: 'type' | 'order', value: SortType | SortOrder) => void,
] => {
  const [searchParams, setSearchParams] = useSearchParams(priceUpSort);
  const initialParams = Object.keys(priceUpSort)
    .reduce((result, key) => {
      const param = searchParams.get(key);

      if (!param) {
        return result;
      }

      return {...result, [key]: param};
    }, priceUpSort);

  const setSortParams = (key: 'type' | 'order', value: SortType | SortOrder) => {
    setSearchParams((params) => {
      params.set(key, value);
      return params;
    });
  };

  return [initialParams, setSortParams];
};
