import {useState} from 'react';
import type {Product} from '@/shared/dto';
import type {SortType, SortOrder} from '../../enums';
import type {Sort, SortOrderHandler, SortTypeHandler} from '../../types';
import {sortProducts} from '../../utils';
import {useSortParams} from '../use-sort-params/use-sort-params';

export const useSort = (products: Product[] = []): {
  sortedProducts: Product[],
  sort: Sort,
  changeSortTypeHandler: SortTypeHandler,
  changeSortOrderHandler: SortOrderHandler,
} => {
  const [initialParams, setSortParams] = useSortParams();
  const [sort, setSort] = useState<Sort>(initialParams);
  const sortedProducts = sortProducts(products, sort);

  const changeSortTypeHandler = (type: SortType) => () => {
    setSort((state) => ({
      ...state,
      type,
    }));

    setSortParams('type', type);
  };

  const changeSortOrderHandler = (order: SortOrder) => () => {
    setSort((state) => ({
      ...state,
      order,
    }));

    setSortParams('order', order);
  };

  return {sortedProducts, sort, changeSortTypeHandler, changeSortOrderHandler};
};
