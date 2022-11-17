import { PartnershipHead } from '@c/Partnership/PartnershipHead';
import '@c/Partnership/partnership.scss';
import { PartnershipBody } from '@c/Partnership/PartnershipBody';
import { PartnershipSide } from '@c/Partnership/PartnershipSide';
import { Helmet } from 'react-helmet';

export const Partnership: React.FC<{}> = () => {
  return (
    <div className="partnership">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Godbot | Partnership</title>
      </Helmet>
      <PartnershipHead />
      <div className="partnership__inner">
        <PartnershipBody />
        <PartnershipSide />
      </div>
    </div>
  );
};
