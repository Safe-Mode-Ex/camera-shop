import {useLocation} from 'react-router-dom';
import {BreadcrumbTitle} from '../../../enums/breadcrumb-title';
import type {Breadcrumb} from '../../types';

export const useBreadcrumbs = (pageTitle = ''): Breadcrumb[] => {
  const {pathname} = useLocation();
  const pathNames = pathname.split('/');

  return pathNames.reduce<Breadcrumb[]>((result, path, index, array) => {
    const isLast = array.length - 1 === index;
    const isFirst = index === 0;
    const prevHref = isFirst ? '' : result[index - 1].href;
    const preparedPrevHref = prevHref !== '/' ? prevHref : '';
    const href = `/${path}`;

    result.push({
      title: BreadcrumbTitle[href] ?? pageTitle,
      href: isLast ? '' : `${preparedPrevHref}${href}`,
      isLast,
    });
    return result;
  }, []);
};
