import { useTranslation } from 'react-i18next';
// '@mui
import { enUS, frFR, arEG } from '@mui/material/locale';
// hooks
import useSettings from './useSettings';
// utils
import * as stringFormatters from '../utils/formatString';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/static/icons/ic_flag_en.svg',
  },
  {
    label: 'Français',
    value: 'fr',
    systemValue: frFR,
    icon: '/static/icons/ic_flag_fr.svg',
  },
  {
    label: 'العربية',
    value: 'ar',
    systemValue: arEG,
    icon: '/static/icons/ic_flag_ar.svg',
  },
];

export default () => {
  const { onChangeDirection, themeDirection } = useSettings();
  const { i18n, t } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[0];

  const handleChangeLanguage = (newlang) => {
    i18n.changeLanguage(newlang).then(() => {
      if (newlang === 'ar' && themeDirection === 'ltr') {
        onChangeDirection({
          target: {
            value: 'rtl',
          },
        });
      } else if (newlang !== 'ar' && themeDirection === 'rtl') {
        onChangeDirection({
          target: {
            value: 'ltr',
          },
        });
      }
    });
  };

  const caseTranslate = (key, options = {}, textCase = 'default') => {
    const text = t(key, options);

    if (textCase === 'default' || !stringFormatters[textCase]) return text;

    return stringFormatters[textCase](text);
  };

  return {
    onChangeLang: handleChangeLanguage,
    t: caseTranslate,
    currentLang,
    allLang: LANGS,
  };
};
