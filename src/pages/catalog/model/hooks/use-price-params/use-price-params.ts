import {useSearchParams} from 'react-router-dom';

export const usePriceParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMinPrice = Number(searchParams.get('priceMin')) || null;
  const initialMaxPrice = Number(searchParams.get('priceMax')) || null;

  const setMinPriceParams = (value: number | null) => {
    setSearchParams((params) => {
      if (value) {
        params.set('priceMin', value.toString());
      }
      return params;
    });
  };

  const setMaxPriceParams = (value: number | null) => {
    setSearchParams((params) => {
      if (value) {
        params.set('priceMax', value.toString());
      }
      return params;
    });
  };

  const resetPriceParams = () => {
    setSearchParams((params) => {
      params.delete('priceMin');
      params.delete('priceMax');
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
