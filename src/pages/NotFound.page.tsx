import { LayoutEmpty } from '@c/Layout/Error';
import { Helmet } from 'react-helmet';

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Godbot | 404</title>
      </Helmet>

      <LayoutEmpty />
    </>
  );
};
