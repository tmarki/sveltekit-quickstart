import type { LayoutServerLoad } from './$types';
import { initTranslations } from '$lib/i18n/server';

export const load: LayoutServerLoad = async ({ url }) => {
	const locale = url.searchParams.get('lang') || 'en';
	const translations = await initTranslations(locale);

	return {
		locale,
		translations
	};
};
