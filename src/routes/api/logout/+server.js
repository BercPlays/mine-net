import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST = async ({ cookies }) => {
	await cookies.set('minenet-session-auth', `null`, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: false,
		maxAge: 0
	});
	redirect(303, '/');
};
