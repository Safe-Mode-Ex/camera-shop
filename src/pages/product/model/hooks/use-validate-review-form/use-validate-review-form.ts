import {useState} from 'react';
import * as z from 'zod';
import type {INITIAL_REVIEW_FORM_VALUE} from '../../config';
import {INITIAL_FORM_ERROR} from '../../config';

const Review = z.object({
  rating: z.coerce.number().int().min(1, {error: 'Нужно оценить товар'}).max(5),
  userName: z.string().min(1, {error: 'Нужно указать имя'}).min(2).max(15),
  advantage: z.string().min(1, {error: 'Нужно указать достоинства'}).min(10).max(160),
  disadvantage: z.string().min(1, {error: 'Нужно указать недостатки'}).min(10).max(160),
  review: z.string().min(1, {error: 'Нужно добавить комментарий'}).min(10).max(160),
});

export const useValidateReviewForm = (formValue: typeof INITIAL_REVIEW_FORM_VALUE): [
  boolean,
  Record<PropertyKey, string[]>,
  (fieldName: PropertyKey) => void,
] => {
  const [formError, setFormError] = useState<Record<PropertyKey, string[]>>(INITIAL_FORM_ERROR);
  const {success, error} = Review.safeParse(formValue);

  const validate = (fieldName: PropertyKey) => {
    setFormError((errorState) => ({
      ...errorState,
      [fieldName]: [''],
    }));

    if (!success) {
      const errorIssue = error.issues.find(({path}) => path[0] === fieldName);

      setFormError((errorState) => ({
        ...errorState,
        [fieldName]: [errorIssue?.message ?? ''],
      }));
    }
  };

  return [success, formError, validate];
};
