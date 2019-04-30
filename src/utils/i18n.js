import { AsyncStorage } from 'react-native';
import I18n from 'i18n-js';
import { Localization } from 'expo';

import AsyncStorageKeys from '../constants/async-storage-keys';
import en from './lang/en';
import th from './lang/th';


export const setLocalization = locale => AsyncStorage.setItem(AsyncStorageKeys.LOCALE, locale)
  .then(() => {
    I18n.locale = locale;
    I18n.fallbacks = true;
    I18n.translations = {
      en,
      th,
    };
    return Promise.resolve(locale);
  });

export const getLocalization = () => AsyncStorage.getItem(AsyncStorageKeys.LOCALE)
  .then((locale) => {
    if (locale === null) throw new Error('No locale.');
    return Promise.resolve(locale);
  })
  .catch(() => {
    const { locale } = Localization;
    if (Object.keys(I18n.translations).includes(locale)) {
      return Promise.resolve(locale);
    }
    return Promise.resolve('en'); // default is english
  });

/* This function tries to initialize the localization module */
/* If the app has not been localized before it will get the language of the user */
export const initializeLocalize = () => getLocalization().then(locale => setLocalization(locale));

I18n.fallbacks = true;
I18n.translations = {
  en,
  th,
};

export default I18n;
