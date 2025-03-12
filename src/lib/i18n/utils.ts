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

	// If we're in the browser, prefer the browser's language setting
	if (typeof window !== 'undefined' && !locale) {
		locale = getPreferredLanguage();
	}

	// Init with the locale
	await init({
		fallbackLocale: 'en',
		initialLocale: locale
	});
};

export function getPreferredLanguage(): string {
	// Add debug logging
	console.log('Navigator language:', navigator.language);
	console.log('Navigator languages:', navigator.languages);

	const browserLang = navigator.language.split('-')[0];
	console.log('Detected browser language:', browserLang);

	// Only return supported languages
	return ['en', 'es'].includes(browserLang) ? browserLang : 'en';
}
