import type {MutationFunctionContext} from '@tanstack/react-query';
import {mutationOptions} from '@tanstack/react-query';
import type {UserReview, Review} from '../../dto';
import {createReview} from '../endpoints';

export const createReviewMutation = mutationOptions({
  mutationKey: ['user-review'],
  mutationFn: async (review: UserReview) => createReview(review),
  onSuccess: async (
    _data: Review,
    vars: UserReview,
    _onMutateResult: unknown,
    {client}: MutationFunctionContext,
  ) => client.refetchQueries({
    queryKey: ['reviews', vars.cameraId.toString()],
  }),
});
