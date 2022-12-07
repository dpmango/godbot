
import { Helmet } from 'react-helmet';

import { Layout } from '@c/Layout/Layout';
import { ChartsRouter } from '@c/Charts';
import { Signals } from '@c/Signal';

export const HomePage: React.FC<{}> = () => {
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
