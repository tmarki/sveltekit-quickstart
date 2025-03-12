import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { stripe } from '$lib/server/stripe';
import { STRIPE_PRICES } from '$lib/server/stripe-config';
import { prisma } from '$lib/server/prisma';
import type { User } from '@prisma/client';
import type Stripe from 'stripe';

export async function POST({ locals, url }: RequestEvent) {
	const session = await locals.getSession();
	if (!session) {
		throw error(401, 'Unauthorized');
	}

	try {
		const user: User | null = await prisma.user.findUnique({
			where: { id: session.userId }
		});

		if (!user) {
			throw error(404, 'User not found');
		}

		// Create or retrieve the customer
		let customerId: string = user.stripeCustomerId ?? '';
		if (!customerId) {
			const customer: Stripe.Customer = await stripe.customers.create({
				email: user.email,
				metadata: {
					userId: user.id
				}
			});
			customerId = customer.id;

			// Update user with new Stripe customer ID
			await prisma.user.update({
				where: { id: user.id },
				data: { stripeCustomerId: customer.id }
			});
		}

		// Create the checkout session
		const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
			customer: customerId,
			line_items: [
				{
					price: STRIPE_PRICES.subscription,
					quantity: 1
				}
			],
			mode: 'subscription',
			success_url: `${url.origin}/profile?success=true`,
			cancel_url: `${url.origin}/profile?canceled=true`
		});

		if (!checkoutSession.url) {
			throw error(500, 'Failed to create checkout session URL');
		}

		return json({ url: checkoutSession.url });
	} catch (err) {
		console.error('Error creating checkout session:', err);
		throw error(500, 'Failed to create checkout session');
	}
}
