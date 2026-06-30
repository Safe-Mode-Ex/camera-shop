import {useState} from 'react';

export const useUpdatePrice = (
  minPrice: number,
  maxPrice: number,
  setMinValue: (value: (value: number) => number) => void,
  setMaxValue: (value: (value: number) => number) => void,
) => {
  const [prevMinPrice, setPrevMinPrice] = useState(minPrice);
  const [prevMaxPrice, setPrevMaxPrice] = useState(maxPrice);

  const setValueCb = (prev: number) => {
    if (prev === 0) {
      return 0;
    }

    if (prev > maxPrice) {
      return maxPrice;
    }

    if (prev < minPrice) {
      return minPrice;
    }

    return prev;
  };

  if (prevMinPrice !== minPrice || prevMaxPrice !== maxPrice) {
    setPrevMinPrice(minPrice);
    setPrevMaxPrice(maxPrice);

    setMinValue(setValueCb);
    setMaxValue(setValueCb);
  }
};
