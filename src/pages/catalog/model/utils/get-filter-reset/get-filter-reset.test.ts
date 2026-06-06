import {act} from '@testing-library/react';
import {FilterCategory, FilterLevel, FilterType} from '../../enums';
import {getFilterReset} from './get-filter-reset';
import type {GetFilterResetProps} from './get-filter-reset-props';
import type {MouseEvent} from 'react';

describe('getFilterReset', () => {
  let props: GetFilterResetProps;

  beforeEach(() => {
    props = {
      types: [],
      levels: [],
      category: null,
      valueRange: [0, 0] as [number, number],
      resetPriceValues: vi.fn(),
      onResetFilters: vi.fn(),
    };
  });

  it('should return array with members of right types', () => {
    const result = getFilterReset(props);

    expect(result.length).toBe(2);
    expect(result[0]).toBe(false);
    expect(result[1]).toBeInstanceOf(Function);
  });

  it('should return true if has category filter', () => {
    props.category = FilterCategory.Photo;
    const result = getFilterReset(props);
    expect(result[0]).toBe(true);
  });

  it('should return true if has levels filter', () => {
    props.levels.push(FilterLevel.Beginner);
    const result = getFilterReset(props);
    expect(result[0]).toBe(true);
  });

  it('should return true if has types filter', () => {
    props.levels.push(FilterType.Collection);
    const result = getFilterReset(props);
    expect(result[0]).toBe(true);
  });

  it('should call resetPriceValues and onResetFilters if handleFiltersReset invoked', () => {
    const resetPriceValuesSpy = vi.spyOn(props, 'resetPriceValues');
    const onResetFiltersSpy = vi.spyOn(props, 'onResetFilters');
    const buttonEventMock = {preventDefault: vi.fn()} as unknown as MouseEvent<HTMLButtonElement>;

    const [, handleFiltersReset] = getFilterReset(props);

    act(() => {
      handleFiltersReset(buttonEventMock);
    });

    expect(resetPriceValuesSpy).toHaveBeenCalledOnce();
    expect(onResetFiltersSpy).toHaveBeenCalledOnce();
  });
});
