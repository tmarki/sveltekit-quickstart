import type { Handle } from '@sveltejs/kit';
import { handleSession } from '$lib/server/session';

declare global {
	namespace App {
		interface Session {
			userId: string;
		}

		interface Locals {
			getSession: () => Promise<Session | null>;
			user:
				| {
						id: string;
						email: string;
						name?: string | null;
						subscriptionStatus?: string;
						credits?: number;
						stripeCustomerId?: string;
						subscriptionId?: string;
				  }
				| undefined;
		}
	}
}

export const handle: Handle = handleSession;
