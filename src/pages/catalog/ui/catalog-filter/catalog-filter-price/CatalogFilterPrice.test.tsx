import {render, screen} from '@testing-library/react';
import CatalogFilterPrice from './CatalogFilterPrice';

describe('Component: CatalogFilterPrice', () => {
  const props = {
    priceRange: [0, 0] as [number, number],
    valueRange: [0, 0] as [number, number],
    handleMinPriceChange: vi.fn(),
    handleMaxPriceChange: vi.fn(),
    handleMinPriceBlur: vi.fn(),
    handleMaxPriceBlur: vi.fn(),
  };

  it('should render properly', () => {
    const legendText = /Цена/i;

    render(CatalogFilterPrice(props));
    const legendEl = screen.getByText(legendText);

    expect(legendEl).toBeInTheDocument();
  });

  it('should have min price placeholder if doesnt have min price', () => {
    const placeholderText = /от/i;

    render(CatalogFilterPrice(props));
    const inputEl = screen.getByPlaceholderText(placeholderText);

    expect(inputEl).toBeInTheDocument();
  });

  it('should have max price placeholder if doesnt have min price', () => {
    const placeholderText = /до/i;

    render(CatalogFilterPrice(props));
    const inputEl = screen.getByPlaceholderText(placeholderText);

    expect(inputEl).toBeInTheDocument();
  });

  it('should have min price placeholder if has min price', () => {
    const expectedMinPrice = 1990;
    props.priceRange[0] = expectedMinPrice;

    render(CatalogFilterPrice(props));
    const inputEl = screen.getByPlaceholderText(expectedMinPrice);

    expect(inputEl).toBeInTheDocument();
  });

  it('should have max price placeholder if has max price', () => {
    const expectedMaxPrice = 19900;
    props.priceRange[1] = expectedMaxPrice;

    render(CatalogFilterPrice(props));
    const inputEl = screen.getByPlaceholderText(expectedMaxPrice);

    expect(inputEl).toBeInTheDocument();
  });
});
