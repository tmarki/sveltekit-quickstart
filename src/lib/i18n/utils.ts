import { init, register } from 'svelte-i18n';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const SUPPORTED_LANGUAGES = ['en', 'es'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

// Create a store for the current language
export const language = writable<SupportedLanguage>('en');

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

	// Update the language store
	if (SUPPORTED_LANGUAGES.includes(locale as SupportedLanguage)) {
		language.set(locale as SupportedLanguage);
	}

	// Init with the locale
	await init({
		fallbackLocale: 'en',
		initialLocale: locale
	});
};

export function getPreferredLanguage(): SupportedLanguage {
	if (!browser) return 'en';

	// Add debug logging
	console.log('Navigator language:', navigator.language);
	console.log('Navigator languages:', navigator.languages);

	const browserLang = navigator.language.split('-')[0];
	console.log('Detected browser language:', browserLang);

	// Only return supported languages
	return SUPPORTED_LANGUAGES.includes(browserLang as SupportedLanguage)
		? (browserLang as SupportedLanguage)
		: 'en';
}
