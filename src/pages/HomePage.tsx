import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

import { Layout } from '@c/Layout/Layout';
import { ChartsRouter } from '@c/Charts';
import { Signals } from '@c/Signal';
import { Tutorial } from '@c/Layout/Tutorial/Tutorial';

export const HomePage: React.FC<{}> = () => {
  let { search } = useLocation();

  return (
    <Layout>
      <Helmet>
        <title>Godbot | Home</title>
      </Helmet>

      {!search ? <Tutorial /> : <></>}

      <div className="content">
        <div className="container">
          <ChartsRouter />
          <Signals />
        </div>
      </div>
    </Layout>
  );
};
