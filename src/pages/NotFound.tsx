import { PartnershipHead } from '@c/Partnership/PartnershipHead';
import { Helmet } from 'react-helmet';

export const NotFound: React.FC<{}> = () => {
  return (
    <>
      <Helmet>
        <title>Godbot | 404</title>
      </Helmet>

      <div className="h1">Not found</div>
    </>
  );
};
