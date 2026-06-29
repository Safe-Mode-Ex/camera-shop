import {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import type {Product} from '@/shared/dto';
import {PRODUCTS_PER_PAGE} from '../../config';
import {getCurrentPage, getPageProducts} from '../../utils';

export const usePagination = (products: Product[]): {
  pageProducts: Product[],
  currentPage: number,
  pagesCount: number,
  isPaginationShown: boolean,
  changePage: (page: number) => void,
} => {
  const [queryParams, setQueryParams] = useSearchParams();
  const pageFromQuery = Number(queryParams.get('page'));
  const pagesCount = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const currentPage = getCurrentPage(pagesCount, pageFromQuery);
  const pageProducts = getPageProducts(currentPage, products);
  const isPaginationShown = pagesCount > 1;

  const changePage = (page: number) => {
    setQueryParams((params) => {
      params.set('page', page.toString());
      return params;
    });
  };

  useEffect(() => {
    if (pageFromQuery !== currentPage) {
      setQueryParams({page: currentPage.toString()});
    }
  }, [pageFromQuery, currentPage, setQueryParams]);

  return {pageProducts, currentPage, pagesCount, isPaginationShown, changePage};
};
