import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const getSalesTime = (nextSaleData: string) => {
  const [nextDay, nextMonth, nextYear] = nextSaleData.split('/');
  // Mock: тестирование локальное
  //const [nextDay, nextMonth, nextYear] = ['23', '03', '2023'];

  const nextDateStr = `${nextDay}/${nextMonth}/${nextYear}`;
  const nextDate = dayjs(nextDateStr, 'DD/MM/YYYY');

  const currentDate = dayjs();

  // Разница между двумя датами
  const diff = nextDate.diff(currentDate);
  const days = nextDate.diff(currentDate, 'days');
  const hours = nextDate.diff(currentDate, 'hours') - days * 24;
  const minutes = nextDate.diff(currentDate, 'minutes') - days * 24 * 60 - hours * 60;

  const convertToArray = (num: number) => {
    const list = num.toString().split('').map(Number);

    if (list.length === 1) {
      // Добавлем дополнительные нули в вывод
      return [0, ...list];
    }

    return list;
  };

  return {
    diff,
    days: convertToArray(days),
    hours: convertToArray(hours),
    minutes: convertToArray(minutes),
  };
};
