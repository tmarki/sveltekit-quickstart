import { redirect } from '@sveltejs/kit';
import { verifyToken, createSession } from '$lib/auth/magicLink';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const token = url.searchParams.get('token');

	if (!token) {
		throw redirect(303, '/auth/login');
	}

	const result = await verifyToken(token);

	if (!result.valid || !result.email) {
		throw redirect(303, '/auth/login?error=invalid-token');
	}

	const session = await createSession(result.email);

	if (session.error) {
		throw redirect(303, '/auth/login?error=session-error');
	}

	// Set session cookie
	cookies.set('session', session.sessionToken, {
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 30 * 24 * 60 * 60 // 30 days
	});

	// Redirect to home page with a cache-busting parameter
	throw redirect(303, '/?_=' + Date.now());
};
