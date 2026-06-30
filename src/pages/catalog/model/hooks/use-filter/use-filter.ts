import type {ChangeEvent, MouseEvent} from 'react';
import {useState} from 'react';
import type {Product} from '@/shared/dto';
import type {CATEGORY_FILTER_NAME} from '../../config';
import type {FilterType, FilterLevel} from '../../enums';
import type {ChangeCheckableHandler, Filter} from '../../types';
import {filterProducts} from '../../utils';
import {useCatalogParams} from '../use-catalog-params/use-catalog-params';

export const useFilter = (products: Product[] = []): {
  filteredProducts: Product[],
  activeFilter: Filter,
  changeRadioHandler: ChangeCheckableHandler<Filter>,
  changeCheckboxHandler: ChangeCheckableHandler<Omit<Filter, typeof CATEGORY_FILTER_NAME>>,
  resetFilters: (evt: MouseEvent<HTMLButtonElement>) => void,
} => {
  const defaultFilter = {category: null, types: [], levels: []};
  const {
    initialFilter,
    setRadioSearchParam,
    setChackboxSearchParam,
    resetSearchParams,
  } = useCatalogParams(defaultFilter);
  const [activeFilter, setActiveFilter] = useState<Filter>(initialFilter);
  const filteredProducts = filterProducts(products, activeFilter);

  const changeRadioHandler = (filterParam: keyof Filter) =>
    ({target}: ChangeEvent<HTMLInputElement>) => {
      setActiveFilter((state) => ({
        ...state,
        [filterParam]: target.value,
      }));

      setRadioSearchParam(filterParam, target.value);
    };


  const changeCheckboxHandler = (filterParam: Exclude<keyof Filter, typeof CATEGORY_FILTER_NAME>) =>
    ({target}: ChangeEvent<HTMLInputElement>) => {
      const {checked, value} = target as {
        checked: boolean, value: FilterType | FilterLevel
      };

      setActiveFilter((state) => ({
        ...state,
        [filterParam]: checked ?
          [...(state[filterParam] as (FilterType | FilterLevel)[]), value] :
          state[filterParam].filter((filter) => filter !== value),
      }));

      setChackboxSearchParam(filterParam, target.value, checked);
    };

  const resetFilters = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setActiveFilter(defaultFilter);
    resetSearchParams();
  };

  return {
    filteredProducts,
    activeFilter,
    changeRadioHandler,
    changeCheckboxHandler,
    resetFilters,
  };
};
