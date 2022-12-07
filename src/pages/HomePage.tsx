import Cookies from 'js-cookie';
import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';

import { useProfile, useTariff } from '@hooks';

import { Layout } from '@c/Layout/Layout';
import { ChartsRouter } from '@c/Charts';
import { Signals } from '@c/Signal';

export const HomePage: React.FC<{}> = () => {
  const { fetchProfileWithLogout } = useProfile();

  // useEffect(() => {
  //   if (Cookies.get('trial')) {
  //     activateTrial();
  //   }
  // }, []);

  // проверка оплаченных тарифов
  const timerConfirm: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    timerConfirm.current = setInterval(() => {
      fetchProfileWithLogout();
    }, 10 * 1000);

    return () => {
      clearInterval(timerConfirm.current as NodeJS.Timeout);
    };
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Godbot | Home</title>
      </Helmet>

      <div className="content">
        <div className="container">
          <ChartsRouter />
          <Signals />
        </div>
      </div>
    </Layout>
  );
};
