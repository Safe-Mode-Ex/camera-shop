import type {ReactNode} from 'react';
import {Fragment} from 'react';
import {act, renderHook} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {createElement} from 'react';
import {withHistory} from '@/shared/lib/with-history';
import {usePriceParams} from './use-price-params';

const createWrapper = (initialEntries?: string) => {
  const history = createMemoryHistory({initialEntries: initialEntries ? [initialEntries] : undefined});
  const wrapper = ({children}: {children: ReactNode}) =>
    withHistory(createElement(Fragment, null, children), history);
  return {wrapper, history};
};

describe('Hook: usePriceParams', () => {
  it('should return object with right properties', () => {
    const {wrapper} = createWrapper();
    const {result} = renderHook(() => usePriceParams(), {wrapper});

    expect(result.current.initialMinPrice).toBeNull();
    expect(result.current.initialMaxPrice).toBeNull();
    expect(result.current.setMinPriceParams).toBeInstanceOf(Function);
    expect(result.current.setMaxPriceParams).toBeInstanceOf(Function);
    expect(result.current.resetPriceParams).toBeInstanceOf(Function);
  });

  it('should parse initial prices from search params', () => {
    const {wrapper} = createWrapper('/?priceMin=1000&priceMax=50000');
    const {result} = renderHook(() => usePriceParams(), {wrapper});

    expect(result.current.initialMinPrice).toBe(1000);
    expect(result.current.initialMaxPrice).toBe(50000);
  });

  it('should set null for missing price params', () => {
    const {wrapper} = createWrapper('/?category=video');
    const {result} = renderHook(() => usePriceParams(), {wrapper});

    expect(result.current.initialMinPrice).toBeNull();
    expect(result.current.initialMaxPrice).toBeNull();
  });

  it('should set min price param', () => {
    const {wrapper, history} = createWrapper();
    const {result} = renderHook(() => usePriceParams(), {wrapper});

    act(() => {
      result.current.setMinPriceParams(2000);
    });

    const params = new URLSearchParams(history.location.search);
    expect(params.get('priceMin')).toBe('2000');
  });

  it('should set max price param', () => {
    const {wrapper, history} = createWrapper();
    const {result} = renderHook(() => usePriceParams(), {wrapper});

    act(() => {
      result.current.setMaxPriceParams(100000);
    });

    const params = new URLSearchParams(history.location.search);
    expect(params.get('priceMax')).toBe('100000');
  });

  it('should not set min price param when value is null', () => {
    const {wrapper, history} = createWrapper('/?priceMin=2000');
    const {result} = renderHook(() => usePriceParams(), {wrapper});

    act(() => {
      result.current.setMinPriceParams(null);
    });

    const params = new URLSearchParams(history.location.search);
    expect(params.get('priceMin')).toBe('2000');
  });

  it('should not set max price param when value is null', () => {
    const {wrapper, history} = createWrapper('/?priceMax=50000');
    const {result} = renderHook(() => usePriceParams(), {wrapper});

    act(() => {
      result.current.setMaxPriceParams(null);
    });

    const params = new URLSearchParams(history.location.search);
    expect(params.get('priceMax')).toBe('50000');
  });

  it('should reset both price params', () => {
    const {wrapper, history} = createWrapper('/?priceMin=1000&priceMax=50000');
    const {result} = renderHook(() => usePriceParams(), {wrapper});

    act(() => {
      result.current.resetPriceParams();
    });

    const params = new URLSearchParams(history.location.search);
    expect(params.has('priceMin')).toBe(false);
    expect(params.has('priceMax')).toBe(false);
  });
});
