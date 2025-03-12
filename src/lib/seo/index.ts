export interface SEOProps {
	title?: string;
	description?: string;
	canonical?: string;
	openGraph?: {
		title?: string;
		description?: string;
		url?: string;
		type?: string;
		image?: string;
	};
	twitter?: {
		card?: string;
		site?: string;
		title?: string;
		description?: string;
		image?: string;
	};
}

export const defaultSEO: SEOProps = {
	title: 'Your Site Name',
	description: 'Your site description',
	openGraph: {
		type: 'website',
		title: 'Your Site Name',
		description: 'Your site description'
	},
	twitter: {
		card: 'summary_large_image',
		site: '@yourhandle'
	}
};

export const getSEO = (customSEO: Partial<SEOProps> = {}): SEOProps => {
	return {
		...defaultSEO,
		...customSEO,
		openGraph: {
			...defaultSEO.openGraph,
			...customSEO.openGraph
		},
		twitter: {
			...defaultSEO.twitter,
			...customSEO.twitter
		}
	};
};
