import type {ResetFiltersHandler} from '../../types';

export interface GetFilterResetProps {
  types: string[];
  levels: string[];
  category: string | null;
  valueRange: [number, number];
  resetPriceValues: () => void;
  onResetFilters: ResetFiltersHandler;
}
