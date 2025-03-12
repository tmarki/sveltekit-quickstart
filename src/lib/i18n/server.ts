import { init, register, getLocaleFromNavigator } from 'svelte-i18n';

const TRANSLATIONS = {
	en: () => import('./locales/en.json'),
	es: () => import('./locales/es.json')
};

let initialized = false;

export async function initTranslations(locale: string) {
	if (!initialized) {
		Object.entries(TRANSLATIONS).forEach(([lang, translation]) => {
			register(lang, translation);
		});
		initialized = true;
	}

	await init({
		fallbackLocale: 'en',
		initialLocale: locale
	});

	// Load and return the translations for the current locale
	const module = await TRANSLATIONS[locale as keyof typeof TRANSLATIONS]();
	return module.default;
}
