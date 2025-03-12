import type { LayoutServerLoad } from './$types';
import { initTranslations } from '$lib/i18n/server';
import {
	SEO_TITLE,
	SEO_DESCRIPTION,
	SEO_CANONICAL,
	SEO_OPENGRAPH_TITLE,
	SEO_OPENGRAPH_DESCRIPTION,
	SEO_OPENGRAPH_IMAGE,
	SEO_TWITTER_CARD,
	SEO_TWITTER_SITE,
	SEO_TWITTER_TITLE,
	SEO_TWITTER_DESCRIPTION,
	SEO_TWITTER_IMAGE
} from '$env/static/private';

export const load: LayoutServerLoad = async ({ request, url, parent }) => {
	const { title = SEO_TITLE, description = SEO_DESCRIPTION } = (await parent()) as App.PageData;
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
		translations,
		seo: {
			title,
			description,
			canonical: SEO_CANONICAL,
			og: {
				title: title || SEO_OPENGRAPH_TITLE,
				description: description || SEO_OPENGRAPH_DESCRIPTION,
				image: SEO_OPENGRAPH_IMAGE,
				url: url.href,
				type: 'website'
			},
			twitter: {
				card: SEO_TWITTER_CARD,
				site: SEO_TWITTER_SITE,
				title: title || SEO_TWITTER_TITLE,
				description: description || SEO_TWITTER_DESCRIPTION,
				image: SEO_TWITTER_IMAGE
			}
		}
	};
};
