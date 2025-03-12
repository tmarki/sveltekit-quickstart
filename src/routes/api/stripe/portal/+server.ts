import { error, json } from '@sveltejs/kit';
import { createBillingPortalSession } from '$lib/server/stripe';
import { prisma } from '$lib/server/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ locals, url }: RequestEvent) {
	const session = await locals.getSession();
	if (!session) {
		throw error(401, 'Unauthorized');
	}

	try {
		const user = await prisma.user.findUnique({
			where: { id: session.userId }
		});

		if (!user || !user.stripeCustomerId) {
			throw error(400, 'No Stripe customer found');
		}

		const portalSession = await createBillingPortalSession(user.stripeCustomerId, url.origin);

		return json({
			url: portalSession.url
		});
	} catch (err) {
		console.error('Error creating portal session:', err);
		throw error(500, 'Error creating portal session');
	}
}
