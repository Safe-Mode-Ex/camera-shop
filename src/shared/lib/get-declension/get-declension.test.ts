import {getDeclension} from './get-declension';

describe('getDeclension', () => {
  const forms = ['слово', 'слова', 'слов'];

  it('should return first form if one count gotten', () => {
    const result = getDeclension(1, forms);
    expect(result).toBe(forms[0]);
  });

  it('should return second form if few count gotten', () => {
    const result = getDeclension(2, forms);
    expect(result).toBe(forms[1]);
  });

  it('should return third form if many count gotten', () => {
    const result = getDeclension(5, forms);
    expect(result).toBe(forms[2]);
  });

  it('should throw error if forms length !== 3', () => {
    expect(() => getDeclension(6, forms.slice(0, 1))).toThrow();
  });
});
