import type {MouseEvent, MouseEventHandler} from 'react';
import type {GetFilterResetProps} from './get-filter-reset-props';

export const getFilterReset = ({
  types,
  levels,
  category,
  valueRange,
  resetPriceValues,
  onResetFilters,
}: GetFilterResetProps): [boolean, MouseEventHandler<HTMLButtonElement>] => {
  const hasFilters = Boolean(category ?? (types.length || levels.length));
  const hasPrice = valueRange.some((value) => Boolean(value));
  const isResetBtnShown = hasFilters || hasPrice;

  const handleFiltersReset = (evt: MouseEvent<HTMLButtonElement>) => {
    resetPriceValues();
    onResetFilters(evt);
  };

  return [isResetBtnShown, handleFiltersReset];
};
