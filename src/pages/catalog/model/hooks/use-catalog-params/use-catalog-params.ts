import {useSearchParams} from 'react-router-dom';
import {COMMA_SYMBOL} from '@/shared/config';
import {CATEGORY_FILTER_NAME} from '../../config';
import type {Filter} from '../../types';
import {PriceFilterName} from '../../enums';

export const useCatalogParams = (defaultFilter: Filter) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = Object.keys(defaultFilter)
    .reduce((result, key) => {
      const param = searchParams.get(key);

      if (!param) {
        return result;
      }

      const paramValue = (key === CATEGORY_FILTER_NAME) ? param : param.split(COMMA_SYMBOL);

      return {...result, [key]: paramValue};
    }, defaultFilter);

  const setRadioSearchParam = (filterParam: string, targetValue: string) => {
    setSearchParams((params) => {
      params.set(filterParam, targetValue);
      return params;
    });
  };

  const setChackboxSearchParam = (filterParam: string, targetValue: string, isChecked: boolean) => {
    setSearchParams((params) => {
      const currentParam = params.get(filterParam)?.split(COMMA_SYMBOL) ?? [];

      params.set(
        filterParam,
        (isChecked ?
          [...currentParam, targetValue] :
          currentParam.filter((paramValue) => paramValue !== targetValue)).join(COMMA_SYMBOL),
      );

      const newValue = params.get(filterParam);

      if (!newValue) {
        params.delete(filterParam);
      }

      return params;
    });
  };

  const resetSearchParams = () => {
    setSearchParams((params) => {
      for (const param of Object.keys(defaultFilter)) {
        params.delete(param);
      }

      params.delete(PriceFilterName.Min);
      params.delete(PriceFilterName.Max);

      return params;
    });
  };

  return {
    initialFilter,
    setRadioSearchParam,
    setChackboxSearchParam,
    resetSearchParams,
  };
};
