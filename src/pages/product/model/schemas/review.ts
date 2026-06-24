import * as z from 'zod';

export const Review = z.object({
  rating: z.coerce.number().int().min(1, {error: 'Нужно оценить товар'}).max(5),
  userName: z.string().min(1, {error: 'Нужно указать имя'}).min(2).max(15),
  advantage: z.string().min(1, {error: 'Нужно указать достоинства'}).min(10).max(160),
  disadvantage: z.string().min(1, {error: 'Нужно указать недостатки'}).min(10).max(160),
  review: z.string().min(1, {error: 'Нужно добавить комментарий'}).min(10).max(160),
});
