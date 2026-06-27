import {productsMock} from '@/shared/model';
import {SortOrder, SortType} from '../../enums';
import {sortProducts} from './sort-products';

describe('sortProducts', () => {
  it('return products sorted down by rating', () => {
    const sort = {
      type: SortType.Popular,
      order: SortOrder.Down,
    };
    const expected = [...productsMock].sort(({rating: rateA}, {rating: rateB}) => rateB - rateA);

    const sorted = sortProducts(productsMock, sort);

    expect(sorted).toEqual(expected);
  });

  it('return products sorted up by price', () => {
    const sort = {
      type: SortType.Price,
      order: SortOrder.Up,
    };
    const expected = [...productsMock].sort(({price: priceA}, {price: priceB}) => priceA - priceB);

    const sorted = sortProducts(productsMock, sort);

    expect(sorted).toEqual(expected);
  });
});
