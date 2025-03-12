import type { Handle } from '@sveltejs/kit';
import { prisma } from './prisma';

export const handleSession: Handle = async ({ event, resolve }) => {
	event.locals.getSession = async () => {
		const sessionToken = event.cookies.get('session');
		if (!sessionToken) return null;

		const session = await prisma.session.findUnique({
			where: { token: sessionToken },
			include: { user: true }
		});

		if (!session || session.expires < new Date()) {
			event.cookies.delete('session', { path: '/' });
			return null;
		}

		return { userId: session.userId };
	};

	return resolve(event);
};
