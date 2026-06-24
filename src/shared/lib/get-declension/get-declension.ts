const ruPlural = new Intl.PluralRules('ru-RU');

export const getDeclension = (count: number, [one, few, many]: [string, string, string]) => {
  const category = ruPlural.select(count);

  switch (category) {
    case 'one':
      return one;
    case 'few':
      return few;
    default:
      return many;
  }
};
