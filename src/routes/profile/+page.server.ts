import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	return {
		title: 'Your Profile | Your Site Name',
		description: 'Manage your account settings and subscription preferences'
	};
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Unauthorized' });
		}

		const data = await request.formData();
		const name = data.get('name')?.toString();

		try {
			await prisma.user.update({
				where: { id: locals.user.id },
				data: { name }
			});

			return { success: true };
		} catch (error) {
			console.error('Error updating profile:', error);
			return fail(500, { error: 'Failed to update profile' });
		}
	}
};
