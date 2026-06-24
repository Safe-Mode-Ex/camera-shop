import {getDeclension} from '@/shared/lib/get-declension';
import {SymbolLimitLabel} from '../../enums';
import {SYMBOL_DECLENSIONS} from '../../config';

type Props =
  | {min: number; max?: never}
  | {min?: never; max: number};

export const getValidationErrorMessage = (props: Props) => {
  const {min, max} = props;
  const value = min ?? max;
  const limitLabel = min !== undefined ? SymbolLimitLabel.min : SymbolLimitLabel.max;

  return `${limitLabel} ${value.toString()} ${getDeclension(value, SYMBOL_DECLENSIONS)}`;
};
