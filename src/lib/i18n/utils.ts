import { init, register } from 'svelte-i18n';

const TRANSLATIONS = {
	en: () => import('./locales/en.json'),
	es: () => import('./locales/es.json')
};

let initialized = false;

export const loadTranslations = async (locale: string) => {
	if (!initialized) {
		// Register all locales
		Object.entries(TRANSLATIONS).forEach(([lang, translation]) => {
			register(lang, translation);
		});
		initialized = true;
	}

	// Init with the locale
	await init({
		fallbackLocale: 'en',
		initialLocale: locale
	});
};
