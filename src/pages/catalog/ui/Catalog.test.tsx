import {render, screen} from '@testing-library/react';
import Catalog from './Catalog';
import {queryClientWrapper} from '@/shared/lib/query-client-wrapper';
import {withHistory} from '@/shared/lib/with-history';
import {productsMock} from '@/shared/model';
import {useProducts} from '@/entities/products';

vi.mock('@/entities/products/model/hooks/use-products/use-products.ts');

describe('Component: Catalog', () => {
  const wrapper = queryClientWrapper();
  const preparedComponent = withHistory(<Catalog />);
  const paginationTestId = 'pagination';

  vi.mocked(useProducts).mockReturnValue({
    data: productsMock,
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: true,
  } as ReturnType<typeof useProducts>);

  it('should render properly', () => {
    const title = /Каталог фото- и видеотехники/i;

    render(preparedComponent, {wrapper});
    const titleEl = screen.getByText(title);

    expect(titleEl).toBeInTheDocument();
  });

  it('should render pagination if pageCount is more than 1', () => {
    render(preparedComponent, {wrapper});
    const pagination = screen.getByTestId(paginationTestId);

    expect(pagination).toBeInTheDocument();
  });

  it('should not render pagination if pageCount is 1', () => {
    vi.mocked(useProducts).mockReturnValue({
      data: productsMock.slice(9),
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: true,
    } as ReturnType<typeof useProducts>);

    render(preparedComponent, {wrapper});
    const pagination = screen.getByTestId(paginationTestId);

    expect(pagination).toBeInTheDocument();
  });
});
