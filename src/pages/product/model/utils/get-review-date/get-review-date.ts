import dayjs from 'dayjs';

export const getReviewDate = (createAt: string): [string, string] => {
  const createdAtDate = dayjs(createAt);
  const dateTime = createdAtDate.format('YYYY-MM-DD');
  const reviewDate = createdAtDate.format('D MMMM');

  return [dateTime, reviewDate];
};
