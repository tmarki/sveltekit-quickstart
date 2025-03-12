export interface SEO {
	title: string;
	description: string;
	canonical: string;
	og: {
		title: string;
		description: string;
		image: string;
		url: string;
		type: string;
	};
	twitter: {
		card: string;
		site: string;
		title: string;
		description: string;
		image: string;
	};
}
