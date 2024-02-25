import { redirect } from '@sveltejs/kit';

/**
 *
 * @param {Object} params
 * @param {import('@sveltejs/kit').Cookies} params.cookies - The CookieJar instance to use for managing cookies.
 *
 * @returns {Promise<void>} A promise that resolves when the logout process is complete.
 *
 */
export const logout = async ({ cookies }) => {
	console.log('asd');

	await cookies.delete('minenet-session-auth', { path: '/' });
	throw redirect(303, '/');
};
