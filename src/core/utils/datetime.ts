import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isToday from 'dayjs/plugin/isToday';
import locale_ru from 'dayjs/locale/ru';
import { toDate, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { UTCTimestamp, BusinessDay } from 'lightweight-charts';
import { IUserState } from '@store';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);
dayjs.locale('ru');

export const timeDiff = (date: any) => {
  let now: any = new Date();

  return Math.round((date - now) / 1000);
};

export const formatDate = (d: Date | string, mask?: string) => {
  return dayjs(d).format(mask || 'DD.MM.YY HH:mm');
};

export const formatUnixDate = (d: UTCTimestamp) => {
  return dayjs.unix(d).tz('Etc/UTC').format('DD.MM.YY HH:mm');
};

export const dateToDDMMMM = (d: string) => {
  const dInst = dayjs(d, 'YYYY-MM-DD', true);

  if (dayjs().isSame(dInst, 'year')) {
    return dInst.format('DD MMMM');
  } else {
    return dInst.format('DD MMMM YYYY');
  }
};

const pad = (v: number, size = 2) => {
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
};

export const getTimezone = () => {
  return dayjs.tz.guess();
};
