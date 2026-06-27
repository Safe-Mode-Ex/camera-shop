import {createElement} from 'react';
import {MemoryRouter} from 'react-router-dom';
import {act, renderHook} from '@testing-library/react';
import {productsMock} from '@/shared/model';
import {PRODUCTS_PER_PAGE} from '../../config';
import {usePagination} from './use-pagination';

describe('Hook: usePagination', () => {
  const expectedPagesCount = Math.ceil(productsMock.length / PRODUCTS_PER_PAGE);
  const wrapper = ({children}: {children: React.ReactNode}) => createElement(
    MemoryRouter,
    {initialEntries: ['/catalog?page=1']},
    children,
  );

  it('should return object with right properties', () => {
    const expectedProducts = productsMock.slice(0, PRODUCTS_PER_PAGE);

    const {result} = renderHook(() => usePagination(productsMock), {wrapper});
    const {
      pageProducts,
      currentPage,
      pagesCount,
      isPaginationShown,
      changePage,
    } = result.current;

    expect(pageProducts).toEqual(expectedProducts);
    expect(currentPage).toBe(1);
    expect(pagesCount).toBe(expectedPagesCount);
    expect(isPaginationShown).toBe(true);
    expect(changePage).toBeInstanceOf(Function);
  });

  it('should change page', () => {
    const expectedPage = 2;
    const expectedProducts = productsMock.slice(PRODUCTS_PER_PAGE, PRODUCTS_PER_PAGE * expectedPage);

    const {result} = renderHook(() => usePagination(productsMock), {wrapper});
    const {changePage} = result.current;
    act(() => {
      changePage(expectedPage);
    });
    const {
      pageProducts,
      currentPage,
      pagesCount,
      isPaginationShown,
    } = result.current;

    expect(pageProducts).toEqual(expectedProducts);
    expect(currentPage).toBe(expectedPage);
    expect(pagesCount).toBe(expectedPagesCount);
    expect(isPaginationShown).toBe(true);
  });
});
