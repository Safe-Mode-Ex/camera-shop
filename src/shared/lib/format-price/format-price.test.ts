import {formatPrice} from './format-price';

describe('formatPrice', () => {
  it('should return proper price format', () => {
    const price = 73450;
    const expected = '73\u00A0450\u00A0₽';

    const formatted = formatPrice(price);

    expect(formatted).toBe(expected);
  });

  it('should return empty string if price equal to zero', () => {
    const zeroPrice = 0;
    const expected = '0\u00A0₽';

    const formatted = formatPrice(zeroPrice);

    expect(formatted).toBe(expected);
  });
});
