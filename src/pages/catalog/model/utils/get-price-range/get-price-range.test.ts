import {productsMock} from '@/shared/model/products-mock';
import {getPriceRange} from './get-price-range';

describe('getPriceRange', () => {
  it('should return array of minPrice and maxPrice', () => {
    const expected = [1990, 199000];
    const priceRange = getPriceRange(productsMock);
    expect(priceRange).toEqual(expected);
  });

  it('should return array of 0 and 0, if no products', () => {
    const expected = [0, 0];
    const priceRange = getPriceRange();
    expect(priceRange).toEqual(expected);
  });
});
