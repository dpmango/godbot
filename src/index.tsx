import { createRoot } from 'react-dom/client';
import App from '@/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@core';
import '@core/i18n';
import '@styles/index.sass';

const root = createRoot(document.getElementById('root') as HTMLElement);

// eslint-disable-next-line no-console
console.info('v 0.1.1');

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
