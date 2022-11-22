import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isToday from 'dayjs/plugin/isToday';
import locale_ru from 'dayjs/locale/ru';
import { utcToZonedTime } from 'date-fns-tz';
import { UTCTimestamp } from 'lightweight-charts';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);
dayjs.locale('ru');

export const formatDate = (d: Date) => {
  return dayjs(d).format('DD.MM.YY HH:mm');
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

export const timeToTz = (originalTime: UTCTimestamp, timeZone: string) => {
  const zonedDate = utcToZonedTime(originalTime, timeZone);
  return (zonedDate.getTime() / 1000) as UTCTimestamp;
};
