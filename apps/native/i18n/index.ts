import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en/translations.json';
import plTranslations from './locales/pl/translations.json';

i18n.use(initReactI18next).init({
	resources: {
		en: { translations: enTranslations },
		pl: { translations: plTranslations },
	},
	lng: 'pl',
	fallbackLng: 'en',
	defaultNS: 'translations',
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
