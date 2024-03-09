import getAllServers from '$lib/server/panelUtils/getAllServers';
import { json } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST = async () => {
	return json(await getAllServers());
};
