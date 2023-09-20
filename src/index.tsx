import '@styles/index.scss';
import 'virtual:svg-icons-register';
useI18n();

// import * as Sentry from '@sentry/react';
// import { BrowserTracing } from '@sentry/tracing';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';

const root = createRoot(document.getElementById('root') as HTMLElement);

// eslint-disable-next-line no-console
console.info(`app version: ${VERSION}`);

// if (import.meta.env.VITE_SENTRY_DSN) {
//   Sentry.init({
//     dsn: import.meta.env.VITE_SENTRY_DSN,
//     integrations: [
//       new BrowserTracing(),
//       // new Sentry.Replay(),
//       // new Sentry.Integrations.Breadcrumbs({
//       //   console: false,
//       // }),
//     ],
//     tracesSampleRate: 1.0,
//     beforeSend: (event) => {
//       if (import.meta.env.NODE_ENV === 'development') return null;
//       return event;
//     },
//   });
// }

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
