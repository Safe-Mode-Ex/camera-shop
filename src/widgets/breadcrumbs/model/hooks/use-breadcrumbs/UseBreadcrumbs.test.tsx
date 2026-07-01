import {renderHook} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import type {ReactNode} from 'react';
import {describe, expect, it} from 'vitest';
import {withHistory} from '@/shared/lib/with-history';
import {useBreadcrumbs} from './use-breadcrumbs';

function createWrapper(initialPath: string) {
  return ({children}: {children: ReactNode}) =>
    withHistory(<>{children}</>, createMemoryHistory({initialEntries: [initialPath]}));
}

describe('useBreadcrumbs', () => {
  it('returns one breadcrumb with Главная for root path /', () => {
    const {result} = renderHook(() => useBreadcrumbs(), {
      wrapper: createWrapper('/'),
    });

    expect(result.current).toEqual([
      {title: 'Главная', href: '', isLast: true},
    ]);
  });

  it('returns one breadcrumb with Главная for empty pathname', () => {
    const {result} = renderHook(() => useBreadcrumbs(), {
      wrapper: createWrapper(''),
    });

    expect(result.current).toEqual([
      {title: 'Главная', href: '', isLast: true},
    ]);
  });

  it('returns two breadcrumbs for /camera: Главная and Каталог', () => {
    const {result} = renderHook(() => useBreadcrumbs(), {
      wrapper: createWrapper('/camera'),
    });

    expect(result.current).toEqual([
      {title: 'Главная', href: '/', isLast: false},
      {title: 'Каталог', href: '', isLast: true},
    ]);
  });

  it('returns two breadcrumbs for /cart: Главная and Корзина', () => {
    const {result} = renderHook(() => useBreadcrumbs(), {
      wrapper: createWrapper('/cart'),
    });

    expect(result.current).toEqual([
      {title: 'Главная', href: '/', isLast: false},
      {title: 'Корзина', href: '', isLast: true},
    ]);
  });

  it('builds correct href chain for nested paths', () => {
    const {result} = renderHook(() => useBreadcrumbs(), {
      wrapper: createWrapper('/camera/cart'),
    });

    expect(result.current).toEqual([
      {title: 'Главная', href: '/', isLast: false},
      {title: 'Каталог', href: '/camera', isLast: false},
      {title: 'Корзина', href: '', isLast: true},
    ]);
  });

  it('uses pageTitle for unknown routes', () => {
    const {result} = renderHook(() => useBreadcrumbs('Название камеры'), {
      wrapper: createWrapper('/camera/some-camera-slug'),
    });

    expect(result.current).toEqual([
      {title: 'Главная', href: '/', isLast: false},
      {title: 'Каталог', href: '/camera', isLast: false},
      {title: 'Название камеры', href: '', isLast: true},
    ]);
  });

  it('uses empty string as title when no pageTitle and route is unknown', () => {
    const {result} = renderHook(() => useBreadcrumbs(), {
      wrapper: createWrapper('/camera/some-camera-slug'),
    });

    expect(result.current).toEqual([
      {title: 'Главная', href: '/', isLast: false},
      {title: 'Каталог', href: '/camera', isLast: false},
      {title: '', href: '', isLast: true},
    ]);
  });

  it('creates breadcrumbs with correct href for three-segment unknown path', () => {
    const {result} = renderHook(() => useBreadcrumbs('Details'), {
      wrapper: createWrapper('/camera/some-slug/details'),
    });

    expect(result.current).toEqual([
      {title: 'Главная', href: '/', isLast: false},
      {title: 'Каталог', href: '/camera', isLast: false},
      {title: 'Details', href: '/camera/some-slug', isLast: false},
      {title: 'Details', href: '', isLast: true},
    ]);
  });

  it('handles pathname with trailing slash correctly', () => {
    const {result} = renderHook(() => useBreadcrumbs(), {
      wrapper: createWrapper('/camera/'),
    });

    expect(result.current).toEqual([
      {title: 'Главная', href: '/', isLast: false},
      {title: 'Каталог', href: '', isLast: true},
    ]);
  });
});
