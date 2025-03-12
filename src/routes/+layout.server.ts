import type { LayoutServerLoad } from './$types';
import { initTranslations } from '$lib/i18n/server';

export const load: LayoutServerLoad = async ({ request, url }) => {
	// Get language from URL query param first
	const urlLang = url.searchParams.get('lang');

	// Get browser's preferred language from Accept-Language header
	const acceptLanguage = request.headers.get('accept-language');
	console.log('Accept-Language header:', acceptLanguage); // Debug log

	let locale = urlLang;
	if (!locale && acceptLanguage) {
		// Extract primary language code (e.g., 'es-ES' -> 'es')
		const browserLang = acceptLanguage.split(',')[0].split('-')[0];
		// Only use if it's one of our supported languages
		if (['en', 'es'].includes(browserLang)) {
			locale = browserLang;
		}
	}

	// Fallback to English if no valid language is detected
	locale = locale || 'en';

	const translations = await initTranslations(locale);

	return {
		locale,
		translations
	};
};
