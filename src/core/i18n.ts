import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import ru from '@assets/dictionaries/ru.json';
import en from '@assets/dictionaries/en.json';
import tr from '@assets/dictionaries/tr.json';

const resources = {
  ru,
  en,
  tr,
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['ru', 'en', 'tr'],
    fallbackLng: 'ru',
    defaultNS: '',
    debug: process.env.NODE_ENV !== 'production',
    detection: {
      order: ['localStorage', 'querystring', 'navigator'],
      lookupQuerystring: 'lng',
    },
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;
