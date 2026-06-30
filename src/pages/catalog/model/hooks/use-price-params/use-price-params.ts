import {useSearchParams} from 'react-router-dom';
import {PriceFilterName} from '../../enums';

export const usePriceParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMinPrice = Number(searchParams.get(PriceFilterName.Min)) || null;
  const initialMaxPrice = Number(searchParams.get(PriceFilterName.Max)) || null;

  const setMinPriceParams = (value: number | null) => {
    setSearchParams((params) => {
      if (value) {
        params.set(PriceFilterName.Min, value.toString());
      }
      return params;
    });
  };

  const setMaxPriceParams = (value: number | null) => {
    setSearchParams((params) => {
      if (value) {
        params.set(PriceFilterName.Max, value.toString());
      }
      return params;
    });
  };

  const resetPriceParams = () => {
    setSearchParams((params) => {
      params.delete(PriceFilterName.Min);
      params.delete(PriceFilterName.Max);
      return params;
    });
  };

  return {
    initialMinPrice,
    initialMaxPrice,
    setMinPriceParams,
    setMaxPriceParams,
    resetPriceParams,
  };
};
