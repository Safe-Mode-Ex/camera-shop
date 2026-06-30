import {useState} from 'react';
import type {Product} from '@/shared/dto';
import {usePriceParams} from '../use-price-params/use-price-params';

export const usePriceFilter = (products: Product[]): {
  priceRangedProducts: Product[],
  setMinPriceValue: (value: number | null) => void,
  setMaxPriceValue: (value: number | null) => void,
  resetPriceFilter: () => void,
} => {
  const {
    initialMinPrice,
    initialMaxPrice,
    setMinPriceParams,
    setMaxPriceParams,
  } = usePriceParams();
  const [minPriceValue, setMinPriceValue] = useState<number | null>(initialMinPrice);
  const [maxPriceValue, setMaxPriceValue] = useState<number | null>(initialMaxPrice);

  const priceRangedProducts = [...products].filter(({price}) => {
    const minValue = Number(minPriceValue);
    const isFitMinPrice = minValue <= price;
    return maxPriceValue ? isFitMinPrice && maxPriceValue >= price : isFitMinPrice;
  });

  const setMinPrice = (value: number | null) => {
    setMinPriceValue(value);
    setMinPriceParams(value);
  };

  const setMaxPrice = (value: number | null) => {
    setMaxPriceValue(value);
    setMaxPriceParams(value);
  };

  const resetPriceFilter = () => {
    setMinPriceValue(null);
    setMaxPriceValue(null);
  };

  return {
    priceRangedProducts,
    setMinPriceValue: setMinPrice,
    setMaxPriceValue: setMaxPrice,
    resetPriceFilter,
  };
};
