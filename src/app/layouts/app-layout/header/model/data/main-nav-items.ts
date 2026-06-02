import {AppRoute} from '@/shared/enums';
import type {MainMavItem} from '../types';

export const mainNavItems: MainMavItem[] = [{
  name: 'Каталог',
  route: AppRoute.Catalog,
}, {
  name: 'Гарантии',
  route: AppRoute.Warranty,
}, {
  name: 'Доставка',
  route: AppRoute.Delivery,
}, {
  name: 'О компании',
  route: AppRoute.About,
}];
