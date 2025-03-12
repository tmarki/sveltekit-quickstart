import type { ServerLoad } from '@sveltejs/kit';
import { initTranslations } from '$lib/i18n/server';
import { verifySession } from '$lib/auth/magicLink';
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

export const load: ServerLoad = async ({ request, url, cookies, depends }) => {
	// Add dependency on session cookie
	depends('session');

	const { title = SEO_TITLE, description = SEO_DESCRIPTION } = {} as App.PageData;

	// Get language from URL query param first
	const urlLang = url.searchParams.get('lang');
	// Get stored language preference from cookie
	const storedLang = cookies.get('language');

	// Get browser's preferred language from Accept-Language header
	const acceptLanguage = request.headers.get('accept-language');
	console.log('Accept-Language header:', acceptLanguage); // Debug log

	// Determine locale priority: URL param > stored preference > browser language > default
	let locale = urlLang || storedLang;
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

	// Store the selected language in a cookie if it came from URL
	if (urlLang && ['en', 'es'].includes(urlLang)) {
		cookies.set('language', urlLang, {
			path: '/',
			maxAge: 60 * 60 * 24 * 365 // 1 year
		});
	}

	const translations = await initTranslations(locale);

	// Verify session and get user data
	let user = null;
	const sessionToken = cookies.get('session');

	if (sessionToken) {
		const result = await verifySession(sessionToken);
		if (result.valid && result.user) {
			user = result.user;
		} else {
			// Clear invalid session
			cookies.delete('session', { path: '/' });
		}
	}

	return {
		locale,
		translations,
		user,
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
