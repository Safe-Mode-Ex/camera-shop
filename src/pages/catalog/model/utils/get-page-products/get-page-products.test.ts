import {productsMock} from '@/shared/model';
import {PRODUCTS_PER_PAGE} from '../../config';
import {getPageProducts} from './get-page-products';

describe('getPageProducts', () => {
  it('should return first page products', () => {
    const currentPage = 1;
    const expectedProducts = productsMock.slice(0, PRODUCTS_PER_PAGE);

    const pageProducts = getPageProducts(currentPage, productsMock);

    expect(pageProducts).toEqual(expectedProducts);
  });

  it('should return second page products', () => {
    const currentPage = 2;
    const expectedProducts = productsMock.slice(PRODUCTS_PER_PAGE, PRODUCTS_PER_PAGE * currentPage);

    const pageProducts = getPageProducts(currentPage, productsMock);

    expect(pageProducts).toEqual(expectedProducts);
  });
});
