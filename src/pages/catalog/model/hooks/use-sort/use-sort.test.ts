import {act, renderHook} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {createElement} from 'react';
import type {ReactNode} from 'react';
import {HistoryRouter} from '@/shared/lib/history-router';
import {productsMock} from '@/shared/model';
import {priceUpSort} from '../../config';
import {useSort} from './use-sort';
import {SortOrder, SortType} from '../../enums';

const wrapper = ({children}: {children: ReactNode}) =>
  createElement(HistoryRouter, {history: createMemoryHistory()}, children);

describe('Hook: useSort', () => {
  let initialSortedProducts = [...productsMock].sort((a, b) => a.price - b.price);

  it('should return object with right properties', () => {
    const {result} = renderHook(() => useSort(productsMock), {wrapper});
    const {
      sortedProducts,
      sort,
      changeSortTypeHandler,
      changeSortOrderHandler,
    } = result.current;

    expect(sortedProducts).toEqual(initialSortedProducts);
    expect(sort).toEqual(priceUpSort);
    expect(changeSortTypeHandler).toBeInstanceOf(Function);
    expect(changeSortOrderHandler).toBeInstanceOf(Function);
  });

  it('should change sort type', () => {
    initialSortedProducts = [...productsMock].sort((a, b) => a.rating - b.rating);

    const {result} = renderHook(() => useSort(productsMock), {wrapper});
    const {changeSortTypeHandler} = result.current;
    act(changeSortTypeHandler(SortType.Popular));
    const {sortedProducts} = result.current;

    expect(sortedProducts).toEqual(initialSortedProducts);
  });

  it('should change sort order', () => {
    initialSortedProducts = [...productsMock].sort((a, b) => b.price - a.price);

    const {result} = renderHook(() => useSort(productsMock), {wrapper});
    const {changeSortOrderHandler} = result.current;
    act(changeSortOrderHandler(SortOrder.Down));
    const {sortedProducts} = result.current;

    expect(sortedProducts).toEqual(initialSortedProducts);
  });
});
