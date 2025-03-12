// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface PageData {
			title?: string;
			description?: string;
			translations: Record<string, any>;
			user: {
				id: string;
				email: string;
				name?: string;
			} | null;
			locale: string;
			seo: {
				title: string;
				description: string;
				canonical?: string;
				og: {
					title: string;
					description: string;
					image?: string;
					url: string;
					type: string;
				};
				twitter: {
					card: string;
					site: string;
					title: string;
					description: string;
					image?: string;
				};
			};
		}
		interface Locals {
			user: {
				id: string;
				email: string;
				name?: string;
			} | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
