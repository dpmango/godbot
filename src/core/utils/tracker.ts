import ym from 'react-yandex-metrika';

export const reachGoal = (ymGoal: string, gtagGoal?: string) => {
  if (import.meta.env.VITE_YM_ID && ymGoal) {
    console.warn('reach goal ym', ymGoal);
    ym('reachGoal', ymGoal);
  }

  if (import.meta.env.VITE_GTM_ID && gtagGoal && window.gtag) {
    console.warn('reach gtag goal', gtagGoal);
    window.gtag('event', gtagGoal);
  }
};
