export const Plurize = (number: number, one: string, two: string, five: string) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
};

export const getPluralKey = (number: number) => {
  return Plurize(number, 'one', 'two', 'five');
};

export const localizeKeys = (number: number, base: string, unitKey: string, t: any): string => {
  return Plurize(
    number,
    t(`${base}.${unitKey}.one`),
    t(`${base}.${unitKey}.two`),
    t(`${base}.${unitKey}.five`)
  );
};
