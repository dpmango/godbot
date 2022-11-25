/* eslint-disable no-useless-escape */
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const clearString = (v: any, removeSpaces?: boolean) => {
  let value = '';
  if (typeof v === 'string') {
    value = v.trim();
  } else if (typeof v === 'number') {
    value = `${v}`;
  }

  if (removeSpaces) {
    value = value.replaceAll(' ', '').replaceAll('-', '');
  }

  return value;
};

export const isValidNumber = (v: any) => {
  return Number.isFinite(+v);
};

export const clearPhone = (str: string) => {
  let num = str.replace(/\+7 \(/, '');
  num = num.replace(/\) /, '');
  num = num.replace(/-/, '');
  num = num.replace(/-/, '');

  return num;
};

export const validPhone = (value: string) => {
  value = value || '';
  let valid = true;
  const arr = [];
  const num: any = clearPhone(value);

  if (num.length !== 10) {
    valid = false;
    arr.push('Номер телефона должен состоять из 10 цифр.');
  }

  if (![3, 4, 5, 6, 8, 9].includes(num[0] * 1)) {
    valid = false;
    arr.push('Проверьте код оператора или региона.');
  }

  return {
    valid,
    phone_error_text: arr.join(' '),
  };
};

export const validEmail = (v: string) => {
  const value = clearString(v);

  const reg =
    /^([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{1,64}@([a-zA-Z0-9-]+.[a-zA-Z0-9-]{2,}){1,255}){1,320}$/;

  return reg.test(value);
};

export function validDate(value: string, dateNow: Date) {
  value = value || '';
  const djsObj = dayjs(value, 'DD/MM/YYYY', true);

  if (!djsObj.isValid()) return false;
  if (djsObj.year() < 1920) return false;
  if (djsObj.isAfter(dayjs(dateNow))) return false;

  return true;
}
