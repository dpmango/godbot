import ym from 'react-yandex-metrika';

export const reachGoal = (name: string) => {
  if (process.env.REACT_APP_YM_ID) {
    ym(process.env.REACT_APP_YM_ID, 'reachGoal', name);
  }
};
