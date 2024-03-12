import getSystemDetails from '$lib/server/panelUtils/getSystemDetails';
import { json } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST = async () => {
	return json(await getSystemDetails());
};
