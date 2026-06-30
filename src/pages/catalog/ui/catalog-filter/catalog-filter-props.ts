import type {FilterCategory, FilterLevel, FilterType} from '../../model/enums';
import type {ChangeCheckableHandler, Filter, ResetFiltersHandler} from '../../model/types';

export interface CatalogFilterProps {
  category: FilterCategory | null;
  types: FilterType[];
  levels: FilterLevel[];
  priceRange: [number, number];
  onRadioChange: ChangeCheckableHandler<Filter>;
  onCheckboxChange: ChangeCheckableHandler<Omit<Filter, 'category'>>;
  onResetFilters: ResetFiltersHandler;
  setMinPriceValue: (value: number | null) => void;
  setMaxPriceValue: (value: number | null) => void;
}
