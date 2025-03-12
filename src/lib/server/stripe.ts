import Stripe from 'stripe';
import { env } from '$env/dynamic/private';

export const stripe = new Stripe(env.STRIPE_SECRET_KEY || '', {
	apiVersion: '2025-02-24.acacia'
});

export async function getOrCreateStripeCustomer(email: string, userId: string) {
	// Search for existing customer by email
	const customers = await stripe.customers.list({ email });

	if (customers.data.length > 0) {
		return customers.data[0];
	}

	// Create new customer if none exists
	return await stripe.customers.create({
		email,
		metadata: {
			userId
		}
	});
}

export async function createSubscription(customerId: string) {
	return await stripe.subscriptions.create({
		customer: customerId,
		items: [{ price: env.STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID }],
		payment_behavior: 'default_incomplete',
		payment_settings: { save_default_payment_method: 'on_subscription' },
		expand: ['latest_invoice.payment_intent']
	});
}

export async function createCreditPurchase(customerId: string) {
	return await stripe.checkout.sessions.create({
		customer: customerId,
		mode: 'payment',
		line_items: [
			{
				price: env.STRIPE_CREDIT_PACK_100_PRICE_ID,
				quantity: 1
			}
		],
		success_url: `${env.PUBLIC_URL}/profile?credits=success`,
		cancel_url: `${env.PUBLIC_URL}/profile?credits=canceled`
	});
}

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
	return await stripe.billingPortal.sessions.create({
		customer: customerId,
		return_url: `${returnUrl}/profile`
	});
}

export type StripeEvent = {
	type: string;
	data: {
		object: any;
	};
};

export function constructWebhookEvent(payload: string, signature: string): StripeEvent {
	return stripe.webhooks.constructEvent(
		payload,
		signature,
		env.STRIPE_WEBHOOK_SECRET || ''
	) as StripeEvent;
}
