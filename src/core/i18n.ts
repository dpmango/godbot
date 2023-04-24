import en from '@assets/dictionaries/en.json';
import ru from '@assets/dictionaries/ru.json';
import tr from '@assets/dictionaries/tr.json';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const resources = {
  'ru-RU': ru,
  'en-US': en,
  'tr-TR': tr,
};

const useI18n = () => {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      load: 'currentOnly',
      supportedLngs: ['ru-RU', 'en-US', 'tr-TR'],
      fallbackLng: 'en-US',
      defaultNS: '',
      debug: import.meta.env.NODE_ENV !== 'production',
      detection: {
        order: ['querystring', 'localStorage', 'navigator'],
        lookupQuerystring: 'lng',
      },
      react: {
        bindI18n: 'languageChanged',
        bindI18nStore: '',
        transEmptyNodeValue: '',
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'a'],
        useSuspense: false,
      },
      interpolation: {
        escapeValue: false,
      },
      resources,
    });
};

export { useI18n };
