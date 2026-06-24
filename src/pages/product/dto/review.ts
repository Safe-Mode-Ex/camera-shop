import type {UserReview} from './user-review';

export interface Review extends UserReview {
  id: string;
  createAt: string;
}
