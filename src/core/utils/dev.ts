/* eslint-disable no-console */
export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const LOG = {
  log: (...args: any) => {
    const isDev =
      process.env.NODE_ENV === 'development' || window.location.search.includes('console');

    if (isDev) console.log(...args);
  },
  info: (...args: any) => {
    console.info(...args);
  },
  warn: (...args: any) => {
    console.warn(...args);
  },
  error: (...args: any) => {
    console.error(...args);
  },
};
