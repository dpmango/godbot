import { Helmet } from 'react-helmet';

import { LayoutEmpty } from '@c/Layout/Error';

export const NotFound: React.FC<{}> = () => {
  return (
    <>
      <Helmet>
        <title>Godbot | 404</title>
      </Helmet>

      <LayoutEmpty />
    </>
  );
};
