import type { SEO } from '$lib/types/seo';

declare global {
	namespace App {
		interface PageData {
			title?: string;
			description?: string;
		}

		interface LayoutData {
			locale: string;
			translations: {
				header: {
					home: string;
					about: string;
					contact: string;
				};
				footer: {
					copyright: string;
					privacy: string;
					terms: string;
				};
				home: {
					welcome: string;
					description: string;
				};
				about: {
					title: string;
					intro: string;
					mission: {
						title: string;
						description: string;
					};
					values: {
						title: string;
						item1: string;
						item2: string;
						item3: string;
						item4: string;
					};
				};
				contact: {
					title: string;
					intro: string;
					success: string;
					error: string;
					form: {
						name: string;
						email: string;
						message: string;
						sending: string;
						submit: string;
					};
				};
			};
			seo: SEO;
		}
	}
}

export {};
