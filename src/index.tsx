import { createRoot } from 'react-dom/client';
import App from '@/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import { store } from '@core';
import { VERSION } from '@utils/dev';
import '@core/i18n';
import '@styles/index.sass';

const root = createRoot(document.getElementById('root') as HTMLElement);

// eslint-disable-next-line no-console
console.info(`app version: ${VERSION}`);

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [
      new BrowserTracing(),
      new Sentry.Replay(),
      // new Sentry.Integrations.Breadcrumbs({
      //   console: false,
      // }),
    ],
    tracesSampleRate: 1.0,
    beforeSend: (event) => {
      if (process.env.NODE_ENV === 'development') return null;
      return event;
    },
  });
}

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
