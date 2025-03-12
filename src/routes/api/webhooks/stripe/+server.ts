import { error, json } from '@sveltejs/kit';
import { constructWebhookEvent } from '$lib/server/stripe';
import type { RequestEvent } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export async function POST({ request }: RequestEvent) {
	const body = await request.text();
	const signature = request.headers.get('stripe-signature');

	if (!signature) {
		console.error('Webhook error: Missing stripe-signature header');
		throw error(400, 'Missing stripe-signature header');
	}

	try {
		const event = constructWebhookEvent(body, signature);
		console.log(`Processing webhook event: ${event.type}`);

		switch (event.type) {
			case 'customer.subscription.created':
			case 'customer.subscription.updated': {
				const subscription = event.data.object;
				const customerId = subscription.customer;

				if (!customerId) {
					console.error('Webhook error: Missing customer ID in subscription event', subscription);
					throw error(400, 'Invalid webhook: Missing customer ID');
				}

				console.log(`Processing subscription ${event.type} for customer ${customerId}`);

				const nextBillingDate = subscription.current_period_end
					? new Date(subscription.current_period_end * 1000)
					: null;

				// Determine the subscription status
				let subscriptionStatus = subscription.status;
				if (subscription.cancel_at_period_end) {
					subscriptionStatus = 'canceling';
				}

				await prisma.user.updateMany({
					where: { stripeCustomerId: customerId },
					data: {
						subscriptionId: subscription.id,
						subscriptionStatus: subscriptionStatus,
						nextBillingDate
					}
				});

				console.log(`Successfully updated subscription for customer ${customerId}`);
				break;
			}

			case 'customer.subscription.deleted': {
				const subscription = event.data.object;
				const customerId = subscription.customer;

				if (!customerId) {
					console.error(
						'Webhook error: Missing customer ID in subscription deletion event',
						subscription
					);
					throw error(400, 'Invalid webhook: Missing customer ID');
				}

				console.log(`Processing subscription deletion for customer ${customerId}`);

				await prisma.user.updateMany({
					where: { stripeCustomerId: customerId },
					data: {
						subscriptionId: null,
						subscriptionStatus: 'canceled',
						nextBillingDate: null
					}
				});

				console.log(`Successfully processed subscription deletion for customer ${customerId}`);
				break;
			}

			case 'checkout.session.completed': {
				const session = event.data.object;
				const customerId = session.customer;

				if (!customerId) {
					console.error('Webhook error: Missing customer ID in checkout session', session);
					throw error(400, 'Invalid webhook: Missing customer ID');
				}

				// Handle credit purchase
				if (session.mode === 'payment') {
					console.log(`Processing credit purchase for customer ${customerId}`);

					await prisma.user.updateMany({
						where: { stripeCustomerId: customerId },
						data: {
							credits: {
								increment: 100 // Assuming this is the 100 credit pack
							}
						}
					});

					console.log(`Successfully added credits for customer ${customerId}`);
				} else {
					console.log(`Skipping non-payment checkout session for customer ${customerId}`);
				}
				break;
			}

			default: {
				console.log(`Ignoring unhandled webhook event type: ${event.type}`);
			}
		}

		return json({ received: true });
	} catch (err) {
		console.error('Error processing webhook:', err);
		throw error(400, 'Webhook Error');
	}
}
