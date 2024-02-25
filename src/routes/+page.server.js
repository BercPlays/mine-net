import { getAuth } from '$lib/getAuth.js';
import { validateUser } from '$lib/server/validateUser.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const authObject = getAuth(cookies);

	// @ts-ignore
	if (validateUser(authObject.username, authObject.password)) {
		throw redirect(303, '/management');
	}
};

export const actions = {
	login: async ({ cookies, request }) => {
		const formData = await request.formData();
		const formUsername = String(formData.get('username'));
		const formPassword = String(formData.get('password'));

		if (validateUser(formUsername, formPassword)) {
			//PLEASE HASH THE USERNAME AND PASS BEFORE ADDING IT TO THE COOKIE
			cookies.set('minenet-session-auth', `${formUsername};${formPassword}`, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: false,
				maxAge: 60 * 60 * 24
			});
			throw redirect(303, '/management');
		} else {
			throw redirect(303, '/');
		}
	}
};
