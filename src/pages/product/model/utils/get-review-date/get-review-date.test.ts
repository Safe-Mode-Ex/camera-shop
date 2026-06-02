import dayjs from 'dayjs';
import ru from 'dayjs/esm/locale/ru';
import {getReviewDate} from './get-review-date';

dayjs.locale(ru);

describe('getReviewDate', () => {
  it('should return array with right values', () => {
    const createdAt = '2026-01-08T11:03:19.183Z';
    const expectedReviewDate = '8 января';
    const expectedDateTime = '2026-01-08';

    const reviewDate = getReviewDate(createdAt);

    expect(reviewDate).toBeInstanceOf(Array);
    expect(reviewDate.length).toBe(2);
    expect(reviewDate[0]).toBe(expectedDateTime);
    expect(reviewDate[1]).toBe(expectedReviewDate);
  });
});
