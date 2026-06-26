const ruPlural = new Intl.PluralRules('ru-RU');

export const getDeclension = (count: number, forms: string[]) => {
  if (forms.length !== 3) {
    throw Error('Необходимы три формы (one, few, many) слова');
  }

  const [one, few, many] = forms;
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
