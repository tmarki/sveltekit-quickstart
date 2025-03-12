import { verifySession } from '$lib/auth/magicLink';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Get session from cookie
	const sessionToken = event.cookies.get('session');

	if (sessionToken) {
		const result = await verifySession(sessionToken);
		if (result.valid && result.user) {
			event.locals.user = result.user;
		} else {
			// Clear invalid session
			event.cookies.delete('session', { path: '/' });
		}
	}

	return resolve(event);
};
