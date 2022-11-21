import { PartnershipHead } from '@c/Partnership/PartnershipHead';
import { Helmet } from 'react-helmet';

import { Layout } from '@c/Layout/Layout';
import { PartnershipBody } from '@c/Partnership/PartnershipBody';
import { PartnershipSide } from '@c/Partnership/PartnershipSide';
import '@c/Partnership/partnership.scss';

export const Partnership: React.FC<{}> = () => {
  return (
    <Layout>
      <div className="partnership">
        <Helmet>
          <title>Godbot | Partnership</title>
        </Helmet>
        <PartnershipHead />
        <div className="partnership__inner">
          <PartnershipBody />
          <PartnershipSide />
        </div>
      </div>
    </Layout>
  );
};
