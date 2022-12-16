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

  return (
    <Layout>
      <Helmet>
        <title>Godbot | Home</title>
      </Helmet>

      <Tutorial />

      <div className={cns('content', !userData && 'content--loading')}>
        <div className="container">
          {userData ? (
            <>
              <ChartsRouter />
              <Signals />
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </Layout>
  );
};
