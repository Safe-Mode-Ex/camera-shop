import type {ChangeEvent, FocusEvent, SubmitEvent} from 'react';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import type {UseMutateFunction} from '@tanstack/react-query';
import type {Review, UserReview} from '@/pages/product/dto';
import {INITIAL_REVIEW_FORM_VALUE} from '../../config';
import {useValidateReviewForm} from '../use-validate-review-form/use-validate-review-form';

export const useReviewForm = (createReview: UseMutateFunction<Review, Error, UserReview>) => {
  const {id} = useParams();
  const [formValue, setFormValue] = useState(INITIAL_REVIEW_FORM_VALUE);
  const {isSuccess, validationError, validatedState, validate} = useValidateReviewForm(formValue);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {target} = evt;
    const {name, value} = target;

    setFormValue((formState) => ({
      ...formState,
      [name]: value,
    }));
  };

  const handleInputBlur = ({target}: FocusEvent<HTMLInputElement>) => {
    const {name} = target;
    if (!validatedState[name]) {
      return;
    }

    validate(name);
  };

  const handleFormSubmit = (evt: SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault();

    validate();

    if (!isSuccess || !id) {
      return;
    }

    createReview({
      ...formValue,
      rating: Number(formValue.rating),
      cameraId: Number(id),
    });
  };

  return {
    formValue,
    validationError,
    handleInputChange,
    handleInputBlur,
    handleFormSubmit,
  };
};
