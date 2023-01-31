import ym from 'react-yandex-metrika';

export const reachGoal = (ymGoal: string, gtagGoal?: string) => {
  if (process.env.REACT_APP_YM_ID) {
    ym(process.env.REACT_APP_YM_ID, 'reachGoal', name);
  }

  if (process.env.REACT_APP_GTM_ID && gtagGoal && window.gtag) {
    window.gtag('event', gtagGoal);
  }
};
