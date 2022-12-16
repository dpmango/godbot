import React from 'react';
import { Helmet } from 'react-helmet';
import cns from 'classnames';

import { useAppSelector } from '@core';
import { Loader } from '@ui';

import { Layout } from '@c/Layout/Layout';
import { ChartsRouter } from '@c/Charts';
import { Signals } from '@c/Signal';
import { Tutorial } from '@c/Layout/Tutorial/Tutorial';

export const HomePage: React.FC<{}> = () => {
  const { userData } = useAppSelector((state) => state.userState);
  const { data, currentCoin, currentTime } = useAppSelector((state) => state.forecastState);

  const loading = !userData || !currentCoin || !currentTime || !data.length;

  return (
    <Layout>
      <Helmet>
        <title>Godbot | Home</title>
      </Helmet>

      <Tutorial />

      <div className={cns('content', loading && 'content--loading')}>
        <div className="container">
          <Loader theme="page" active={loading} />
          <ChartsRouter />
          <Signals />
        </div>
      </div>
    </Layout>
  );
};
