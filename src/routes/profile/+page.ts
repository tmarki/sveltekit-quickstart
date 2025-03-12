import type { PageLoad } from './$types';

export interface User {
	id: string;
	email: string;
	name: string | null;
	subscriptionStatus?: string;
	credits?: number;
	stripeCustomerId?: string;
	subscriptionId?: string;
	nextBillingDate?: string;
}

export interface PageData {
	user: User | null;
}

export const load: PageLoad = async ({ parent }) => {
	const { user } = await parent();
	return { user };
};
