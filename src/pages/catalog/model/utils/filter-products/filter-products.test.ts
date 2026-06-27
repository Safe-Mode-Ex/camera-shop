import {productsMock} from '@/shared/model';
import {filteredProductsMock, filterMock} from '../../mocks';
import {filterProducts} from './filter-products';

describe('filterProducts', () => {
  it('should return filtered products', () => {
    const filter = filterMock;
    const expected = filteredProductsMock;

    const filtered = filterProducts(productsMock, filter);

    expect(filtered).toEqual(expected);
  });
});
