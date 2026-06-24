import type * as z from 'zod';
import type {INITIAL_REVIEW_FORM_VALUE} from '../../config';

export const getValidationError = (
  formValue: typeof INITIAL_REVIEW_FORM_VALUE,
  formValidatedState: Record<PropertyKey, boolean>,
  error?: z.ZodError,
) => Object.keys(formValue).reduce((result, key) => ({
  ...result,
  [key]: formValidatedState[key]
    ? error?.issues.find(({path}) => path[0] === key)?.message
    : '',
}), {});
