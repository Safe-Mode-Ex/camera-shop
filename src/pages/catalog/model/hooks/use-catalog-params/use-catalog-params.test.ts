import type {ReactNode} from 'react';
import {Fragment} from 'react';
import {createElement} from 'react';
import {act, renderHook} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {withHistory} from '@/shared/lib/with-history';
import {FilterCategory, FilterType} from '../../enums';
import type {Filter} from '../../types';
import {useCatalogParams} from './use-catalog-params';

const createWrapper = (initialEntries?: string) => {
  const history = createMemoryHistory({initialEntries: initialEntries ? [initialEntries] : undefined});
  const wrapper = ({children}: {children: ReactNode}) =>
    withHistory(createElement(Fragment, null, children), history);
  return {wrapper, history};
};

describe('Hook: useCatalogParams', () => {
  const defaultFilter: Filter = {
    category: null,
    types: [],
    levels: [],
  };

  it('should return object with right properties', () => {
    const {wrapper} = createWrapper();
    const {result} = renderHook(() => useCatalogParams(defaultFilter), {wrapper});
    const {initialFilter, setRadioSearchParam, setChackboxSearchParam, resetSearchParams} =
      result.current;

    expect(initialFilter).toEqual(defaultFilter);
    expect(setRadioSearchParam).toBeInstanceOf(Function);
    expect(setChackboxSearchParam).toBeInstanceOf(Function);
    expect(resetSearchParams).toBeInstanceOf(Function);
  });

  it('should parse initial filter from search params', () => {
    const {wrapper} = createWrapper('/?category=video&types=digital,film&levels=beginner,professional');
    const {result} = renderHook(() => useCatalogParams(defaultFilter), {wrapper});

    expect(result.current.initialFilter).toEqual({
      category: 'video',
      types: ['digital', 'film'],
      levels: ['beginner', 'professional'],
    });
  });

  it('should keep default values for missing params', () => {
    const {wrapper} = createWrapper('/?types=digital');
    const {result} = renderHook(() => useCatalogParams(defaultFilter), {wrapper});

    expect(result.current.initialFilter).toEqual({
      category: null,
      types: ['digital'],
      levels: [],
    });
  });

  it('should keep category param as string without splitting', () => {
    const {wrapper} = createWrapper('/?category=video,photo');
    const {result} = renderHook(() => useCatalogParams(defaultFilter), {wrapper});

    expect(result.current.initialFilter).toEqual({
      category: 'video,photo',
      types: [],
      levels: [],
    });
  });

  it('should set radio search param', () => {
    const {wrapper, history} = createWrapper();
    const {result} = renderHook(() => useCatalogParams(defaultFilter), {wrapper});

    act(() => {
      result.current.setRadioSearchParam('category', FilterCategory.Photo);
    });

    const params = new URLSearchParams(history.location.search);
    expect(params.get('category')).toBe('photo');
  });

  it('should add checkbox value when checked', () => {
    const {wrapper, history} = createWrapper('/?types=film');
    const {result} = renderHook(() => useCatalogParams(defaultFilter), {wrapper});

    act(() => {
      result.current.setChackboxSearchParam('types', FilterType.Digital, true);
    });

    const params = new URLSearchParams(history.location.search);
    const types = params.get('types')?.split(',');
    expect(types).toContain('film');
    expect(types).toContain('digital');
  });

  it('should remove checkbox value when unchecked', () => {
    const {wrapper, history} = createWrapper('/?types=digital,film');
    const {result} = renderHook(() => useCatalogParams(defaultFilter), {wrapper});

    act(() => {
      result.current.setChackboxSearchParam('types', FilterType.Digital, false);
    });

    const params = new URLSearchParams(history.location.search);
    const types = params.get('types')?.split(',');
    expect(types).toContain('film');
    expect(types).not.toContain('digital');
  });

  it('should delete param when all checkbox values removed', () => {
    const {wrapper, history} = createWrapper('/?types=digital');
    const {result} = renderHook(() => useCatalogParams(defaultFilter), {wrapper});

    act(() => {
      result.current.setChackboxSearchParam('types', FilterType.Digital, false);
    });

    const params = new URLSearchParams(history.location.search);
    expect(params.has('types')).toBe(false);
  });

  it('should reset all filter and price params', () => {
    const {wrapper, history} = createWrapper(
      '/?category=video&types=digital&levels=beginner&priceMin=1000&priceMax=50000',
    );
    const {result} = renderHook(() => useCatalogParams(defaultFilter), {wrapper});

    act(() => {
      result.current.resetSearchParams();
    });

    const params = new URLSearchParams(history.location.search);
    expect(params.has('category')).toBe(false);
    expect(params.has('types')).toBe(false);
    expect(params.has('levels')).toBe(false);
    expect(params.has('priceMin')).toBe(false);
    expect(params.has('priceMax')).toBe(false);
  });
});
