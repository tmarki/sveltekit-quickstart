import { fail } from '@sveltejs/kit';
import { sendMagicLink } from '$lib/auth/magicLink';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();

		if (!email) {
			return fail(400, { error: 'Email is required' });
		}

		const result = await sendMagicLink(email);

		if (!result.success) {
			return fail(500, { error: result.error });
		}

		return { success: true };
	}
};
