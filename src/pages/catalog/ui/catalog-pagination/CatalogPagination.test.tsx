import {render, screen} from '@testing-library/react';
import CatalogPagination from './CatalogPagination';

describe('Component: CatalogPagination', () => {
  const props = {
    currentPage: 1,
    pagesCount: 1,
    changePage: vi.fn(),
  };
  const goBackText = 'Назад';
  const goFurtherText = 'Далее';

  it('should render properly', () => {
    render(<CatalogPagination {...props} />);
    const pageBtn = screen.getByText(1);
    const goBackBtn = screen.queryByText(goBackText);
    const goFurtherBtn = screen.queryByText(goFurtherText);

    expect(pageBtn).toBeInTheDocument();
    expect(goBackBtn).not.toBeInTheDocument();
    expect(goFurtherBtn).not.toBeInTheDocument();
  });

  it('should show further button if pageCount more than 3', () => {
    props.pagesCount = 4;

    render(<CatalogPagination {...props} />);
    const pageBtn = screen.getByText(1);
    const goBackBtn = screen.queryByText(goBackText);
    const goFurtherBtn = screen.queryByText(goFurtherText);

    expect(pageBtn).toBeInTheDocument();
    expect(goBackBtn).not.toBeInTheDocument();
    expect(goFurtherBtn).toBeInTheDocument();
  });

  it('should show further button if currentPage more than 3', () => {
    props.currentPage = 4;

    render(<CatalogPagination {...props} />);
    const pageBtn = screen.getByText(4);
    const goBackBtn = screen.queryByText(goBackText);
    const goFurtherBtn = screen.queryByText(goFurtherText);

    expect(pageBtn).toBeInTheDocument();
    expect(goBackBtn).toBeInTheDocument();
    expect(goFurtherBtn).not.toBeInTheDocument();
  });
});
