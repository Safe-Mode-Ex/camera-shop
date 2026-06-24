import * as z from 'zod';
import {ReviewValueLength, ValidationErrorMessage} from '../enums';
import {getValidationErrorMessage} from '../utils';

export const Review = z.object({
  rating: z.coerce.number().int()
    .min(ReviewValueLength.DefaultMin, {error: ValidationErrorMessage.RatingEmpty})
    .max(ReviewValueLength.RatingMax),
  userName: z.string()
    .min(ReviewValueLength.DefaultMin, {error: ValidationErrorMessage.UserNameEmpty})
    .min(ReviewValueLength.UserNameMin, {error: getValidationErrorMessage({min: ReviewValueLength.UserNameMin})})
    .max(ReviewValueLength.UserNameMax, {error: getValidationErrorMessage({max: ReviewValueLength.UserNameMax})}),
  advantage: z.string()
    .min(ReviewValueLength.DefaultMin, {error: ValidationErrorMessage.AdvantageEmpty})
    .min(ReviewValueLength.TextMin, {error: getValidationErrorMessage({min: ReviewValueLength.TextMin})})
    .max(ReviewValueLength.TextMax, {error: getValidationErrorMessage({max: ReviewValueLength.TextMax})}),
  disadvantage: z.string()
    .min(ReviewValueLength.DefaultMin, {error: ValidationErrorMessage.DisadvantageEmpty})
    .min(ReviewValueLength.TextMin, {error: getValidationErrorMessage({min: ReviewValueLength.TextMin})})
    .max(ReviewValueLength.TextMax, {error: getValidationErrorMessage({max: ReviewValueLength.TextMax})}),
  review: z.string()
    .min(ReviewValueLength.DefaultMin, {error: ValidationErrorMessage.ReviewEmpty})
    .min(ReviewValueLength.TextMin, {error: getValidationErrorMessage({min: ReviewValueLength.TextMin})})
    .max(ReviewValueLength.TextMax, {error: getValidationErrorMessage({max: ReviewValueLength.TextMax})}),
});
