import { toDate, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import dayjs from 'dayjs';
import locale_ru from 'dayjs/locale/ru';
import locale_tr from 'dayjs/locale/tr';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { BusinessDay, UTCTimestamp } from 'lightweight-charts';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);

const lang = getLanguageByKey(localStorage.getItem('i18nextLng'))?.key || 'en';
dayjs.locale(lang);

export const timeDiff = (date: any) => {
  const now: any = new Date();

  return Math.round((date - now) / 1000);
};

export const formatDate = (d: Date | string, mask?: string) => {
  return dayjs(d).format(mask || 'DD.MM.YY HH:mm');
};

export const formatUnixDate = (d: UTCTimestamp, mask = 'DD.MM.YY HH:mm') => {
  return dayjs.unix(d).tz('Etc/UTC').format(mask);
};

export const dateToDDMMMM = (d: string) => {
  const dInst = dayjs(d, 'YYYY-MM-DD', true);

  if (dayjs().isSame(dInst, 'year')) {
    return dInst.format('DD MMMM');
  } else {
    return dInst.format('DD MMMM YYYY');
  }
};

export const pad = (v: number, size = 2) => {
  let s = String(v);
  while (s.length < size) {
    s = '0' + s;
  }
  return s;
};

export const secondsToStamp = (sec: number, showMinutes = true) => {
  const minutes = pad(Math.floor(sec / 60));
  const seconds = pad(sec % 60);

  let returnable = showMinutes ? `${minutes}:` : '';
  returnable += seconds;
  return returnable;
};

export const timeToTz = (originalTime: UTCTimestamp) => {
  // Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Moscow'
  // const zonedDate = utcToZonedTime(originalTime, 'Etc/UTC');
  const zonedDate = zonedTimeToUtc(originalTime, 'Etc/UTC');
  return (zonedDate.getTime() / 1000) as UTCTimestamp;
  // return dayjs(originalTime).tz('Etc/UTC', true).unix() as UTCTimestamp;
};

export const getTimezone = () => {
  return dayjs.tz.guess();
};
