import { Helmet } from 'react-helmet';

import { Layout } from '@c/Layout/Layout';
import { Toast } from '@ui';

export const UiPage: React.FC<{}> = () => {
  return (
    <Layout>
      <Helmet>
        <title>Godbot | UI</title>
      </Helmet>

      <div className="content">
        <div className="container" style={{ marginTop: 200 }}>
          <button onClick={() => Toast('error', 'Текст ошибки', { autoClose: false })}>
            Toast.error
          </button>
          <button onClick={() => Toast('success', 'Текст сообщения', { autoClose: false })}>
            Toast.success
          </button>
          <button onClick={() => Toast('info', 'Текст сообщения', { autoClose: false })}>
            Toast.info
          </button>
        </div>
      </div>
    </Layout>
  );
};
