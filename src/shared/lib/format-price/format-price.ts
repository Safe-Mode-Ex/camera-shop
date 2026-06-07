const LOCALE_RU = 'ru-Ru';
const STYLE_CURRENCY = 'currency';
const CURRENCY_RUB = 'RUB';

export const formatPrice = (price = 0): string => new Intl.NumberFormat(
  LOCALE_RU,
  {
    style: STYLE_CURRENCY,
    currency: CURRENCY_RUB,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
)
  .format(
    price,
  );
