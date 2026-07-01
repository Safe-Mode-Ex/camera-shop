import type {MouseEvent} from 'react';
import {createElement} from 'react';
import {renderHook} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import {TabsContext} from '../use-tabs-context/use-tabs-context';
import {useActiveValue} from './use-active-value';

describe('useActiveValue', () => {
  const wrapper = (
    activeValue: string,
    setActiveValue: (value: string) => void,
  ) =>
    ({children}: {children: React.ReactNode}) =>
      createElement(
        TabsContext.Provider,
        {value: {activeValue, setActiveValue}},
        children,
      );

  it('returns true when value matches activeValue', () => {
    const setActiveValue = vi.fn<(value: string) => void>();

    const {result} = renderHook(() => useActiveValue('tab1'), {
      wrapper: wrapper('tab1', setActiveValue),
    });

    expect(result.current[0]).toBe(true);
  });

  it('returns false when value does not match activeValue', () => {
    const setActiveValue = vi.fn<(value: string) => void>();

    const {result} = renderHook(() => useActiveValue('tab2'), {
      wrapper: wrapper('tab1', setActiveValue),
    });

    expect(result.current[0]).toBe(false);
  });

  it('calls setActiveValue with the value on handleTabsControlClick', () => {
    const setActiveValue = vi.fn<(value: string) => void>();

    const {result} = renderHook(() => useActiveValue('tab1'), {
      wrapper: wrapper('tab1', setActiveValue),
    });

    result.current[1]({} as MouseEvent<HTMLAnchorElement>);

    expect(setActiveValue).toHaveBeenCalledWith('tab1');
  });

  it('throws when used outside TabsContext', () => {
    vi.spyOn(console, 'error').mockImplementation(() => ({}));

    expect(() => renderHook(() => useActiveValue('test'))).toThrow(
      'useTabsContext должен использоваться внутри компонента Tabs',
    );
  });
});
