import { serverExists } from '$lib/server/panelUtils/serverExists';
import { json } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST = async ({ request }) => {
	const { serverName } = await request.json();
	return json(serverExists(serverName));
};
