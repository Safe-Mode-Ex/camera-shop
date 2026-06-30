import type {ChangeEvent, FocusEvent} from 'react';
import {useState} from 'react';
import {useUpdatePrice} from '../use-update-price/use-update-price';
import {usePriceParams} from '../use-price-params/use-price-params';

export const usePrice = (
  minPrice: number,
  maxPrice: number,
  setMinPriceValue: (value: number | null) => void,
  setMaxPriceValue: (value: number | null) => void,
): {
  valueRange: [number, number],
  handleMinPriceChange: ({target}: ChangeEvent<HTMLInputElement>) => void,
  handleMaxPriceChange: ({target}: ChangeEvent<HTMLInputElement>) => void,
  handleMinPriceBlur: ({target}: FocusEvent<HTMLInputElement>) => void,
  handleMaxPriceBlur: ({target}: FocusEvent<HTMLInputElement>) => void,
  resetPriceValues: () => void,
} => {
  const {
    initialMinPrice,
    initialMaxPrice,
  } = usePriceParams();
  const [minValue, setMinValue] = useState<number>(initialMinPrice ?? 0);
  const [maxValue, setMaxValue] = useState<number>(initialMaxPrice ?? 0);

  useUpdatePrice(minPrice, maxPrice, setMinValue, setMaxValue);

  const setMinimum = (value: number) => {
    setMinValue(value);
    setMinPriceValue(value);
  };

  const setMaximum = (value: number) => {
    setMaxValue(value);
    setMaxPriceValue(value);
  };

  const resetPriceValues = () => {
    setMinValue(0);
    setMaxValue(0);
  };

  const handleMinPriceChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setMinValue(Number(target.value));
  };

  const handleMaxPriceChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setMaxValue(Number(target.value));
  };

  const handleMinPriceBlur = ({target}: FocusEvent<HTMLInputElement>) => {
    if (target.value === '') {
      setMinPriceValue(0);
      return;
    }

    const value = Number(target.value);

    if (maxValue && value > maxValue) {
      setMinimum(maxValue);
      return;
    }

    if (value < minPrice) {
      setMinimum(minPrice);
      return;
    }

    if (value > maxPrice) {
      setMinimum(maxPrice);
      return;
    }

    setMinPriceValue(value);
  };

  const handleMaxPriceBlur = ({target}: FocusEvent<HTMLInputElement>) => {
    if (target.value === '') {
      setMaxPriceValue(null);
      return;
    }

    const value = Number(target.value);

    if (minValue && value < minValue) {
      setMaximum(minValue);
      return;
    }

    if (value < minPrice) {
      setMaximum(minPrice);
      return;
    }

    if (value > maxPrice) {
      setMaximum(maxPrice);
      return;
    }

    setMaxPriceValue(value);
  };

  return {
    valueRange: [minValue, maxValue],
    handleMinPriceChange,
    handleMaxPriceChange,
    handleMinPriceBlur,
    handleMaxPriceBlur,
    resetPriceValues,
  };
};
