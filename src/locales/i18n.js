// i18n
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// locales
import enLocales from './en.json';
import frLocales from './fr.json';
import arLocales from './ar.json';

// use
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      fr: { translations: frLocales },
      ar: { translations: arLocales },
    },
    lng: localStorage.getItem('i18nextLng') || 'en',
    fallbackLng: 'en',
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
