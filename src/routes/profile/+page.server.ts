import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	if (!session) {
		throw error(401, 'Unauthorized');
	}

	const user = await prisma.user.findUnique({
		where: { id: session.userId },
		select: {
			id: true,
			email: true,
			name: true,
			subscriptionStatus: true,
			credits: true,
			stripeCustomerId: true,
			nextBillingDate: true
		}
	});

	if (!user) {
		throw error(404, 'User not found');
	}

	const sanitizedUser = {
		...user,
		credits: user.credits ?? 0
	};

	console.log(sanitizedUser);

	return {
		user: sanitizedUser
	};
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const session = await locals.getSession();
		if (!session) {
			throw error(401, 'Unauthorized');
		}

		const formData = await request.formData();
		const name = formData.get('name')?.toString();

		try {
			await prisma.user.update({
				where: { id: session.userId },
				data: { name }
			});

			return { success: true };
		} catch (err) {
			console.error('Error updating profile:', err);
			return fail(500, { message: 'Error updating profile' });
		}
	}
};
