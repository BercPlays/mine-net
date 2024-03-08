import getFtpCredentials from '$lib/server/panelUtils/getFtpCredentials';
import { json } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST = async ({ request }) => {
	const { username } = await request.json();
	return json(await getFtpCredentials(username));
};
