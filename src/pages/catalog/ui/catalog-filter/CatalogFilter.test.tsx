import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CatalogFilter from './CatalogFilter';
import type {CatalogFilterProps} from './catalog-filter-props';
import {FilterCategory} from '../../model/enums';

describe('Component: CatalogFilter', () => {
  const resetButtonText = /Сбросить фильтры/i;
  let props: CatalogFilterProps;

  beforeEach(() => {
    props = {
      category: null,
      types: [],
      levels: [],
      onRadioChange: vi.fn(),
      onCheckboxChange: vi.fn(),
      onResetFilters: vi.fn(),
      priceRange: [0, 0],
      setMinPriceValue: vi.fn(),
      setMaxPriceValue: vi.fn(),
    };
  });

  it('should render properly', () => {
    const titleText = /Фильтр/;

    render(<CatalogFilter {...props} />);
    const titleEl = screen.getByText(titleText);
    const resetButtonEl = screen.queryByText(resetButtonText);

    expect(titleEl).toBeInTheDocument();
    expect(resetButtonEl).not.toBeInTheDocument();
  });

  it('should show reset button if filters not empty', () => {
    props.category = FilterCategory.Photo;

    render(<CatalogFilter {...props} />);
    const resetButtonEl = screen.getByText(resetButtonText);

    expect(resetButtonEl).toBeInTheDocument();
  });

  it('should reset filters if reset button clicked', async () => {
    const onResetFiltersSpy = vi.spyOn(props, 'onResetFilters');
    props.category = FilterCategory.Photo;

    render(<CatalogFilter {...props} />);
    const resetButtonEl = screen.getByText(resetButtonText);
    await userEvent.click(resetButtonEl);

    expect(onResetFiltersSpy).toHaveBeenCalledOnce();
  });
});
