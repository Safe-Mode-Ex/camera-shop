import type {ReactNode} from 'react';
import {createElement, Fragment} from 'react';
import {act, renderHook} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {withHistory} from '@/shared/lib/with-history';
import {priceUpSort} from '../../config';
import {useSortParams} from './use-sort-params';
import {SortOrder, SortType} from '../../enums';

const createWrapper = (initialEntries?: string) => {
  const history = createMemoryHistory({
    initialEntries: initialEntries ? [initialEntries] : undefined,
  });
  const wrapper = ({children}: {children: ReactNode}) =>
    withHistory(createElement(Fragment, null, children), history);
  return {wrapper, history};
};

describe('Hook: useSortParams', () => {
  it('should return default sort params when no URL params', () => {
    const {wrapper} = createWrapper();
    const {result} = renderHook(() => useSortParams(), {wrapper});

    expect(result.current[0]).toEqual(priceUpSort);
    expect(result.current[1]).toBeInstanceOf(Function);
  });

  it('should read sort params from URL', () => {
    const {wrapper} = createWrapper('/?type=rating&order=down');
    const {result} = renderHook(() => useSortParams(), {wrapper});

    expect(result.current[0]).toEqual({
      type: SortType.Popular,
      order: SortOrder.Down,
    });
  });

  it('should use default for missing URL params', () => {
    const {wrapper} = createWrapper('/?type=rating');
    const {result} = renderHook(() => useSortParams(), {wrapper});

    expect(result.current[0]).toEqual({
      type: SortType.Popular,
      order: priceUpSort.order,
    });
  });

  it('should set sort type param', () => {
    const {wrapper, history} = createWrapper();
    const {result} = renderHook(() => useSortParams(), {wrapper});

    act(() => {
      result.current[1]('type', SortType.Popular);
    });

    const params = new URLSearchParams(history.location.search);
    expect(params.get('type')).toBe(SortType.Popular);
  });

  it('should set sort order param', () => {
    const {wrapper, history} = createWrapper();
    const {result} = renderHook(() => useSortParams(), {wrapper});

    act(() => {
      result.current[1]('order', SortOrder.Down);
    });

    const params = new URLSearchParams(history.location.search);
    expect(params.get('order')).toBe(SortOrder.Down);
  });
});
