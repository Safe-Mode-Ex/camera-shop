import {AppRoute} from '@/shared/enums';

export const BreadcrumbTitle: Record<string, string> = {
  [AppRoute.Main]: 'Главная',
  [AppRoute.Catalog]: 'Каталог',
  [AppRoute.Cart]: 'Корзина',
} as const;
