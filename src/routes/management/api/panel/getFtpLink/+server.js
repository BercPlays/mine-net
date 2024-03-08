import getFtpLink from '$lib/server/panelUtils/getFtpLink';
import { json } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST = () => {
	return json(getFtpLink());
};
