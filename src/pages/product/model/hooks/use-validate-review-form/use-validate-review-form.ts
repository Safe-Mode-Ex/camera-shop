import {useState} from 'react';
import {getValidationError} from '../../utils';
import type {INITIAL_REVIEW_FORM_VALUE} from '../../config';
import {INITIAL_REVIEW_VALIDATED_STATE} from '../../config';
import {Review} from '../../schemas';

export const useValidateReviewForm = (formValue: typeof INITIAL_REVIEW_FORM_VALUE): {
  isSuccess: boolean,
  validationError: Record<PropertyKey, string>,
  validatedState: Record<PropertyKey, boolean>,
  validate: (fieldkey?: PropertyKey) => void,
} => {
  const [validatedState, setValidatedState] = useState<Record<PropertyKey, boolean>>(INITIAL_REVIEW_VALIDATED_STATE);
  const {success, error} = Review.safeParse(formValue);
  const validationError = getValidationError(formValue, validatedState, error);

  const validate = (fieldkey?: PropertyKey) => {
    const fieldNames = fieldkey ? [fieldkey] : Object.keys(validationError);

    for (const fieldName of fieldNames) {
      if (!success) {
        if (!validatedState[fieldName]) {
          setValidatedState((state) => ({
            ...state,
            [fieldName]: true,
          }));
        }
      }
    }
  };

  return {
    isSuccess: success,
    validationError,
    validatedState,
    validate,
  };
};
