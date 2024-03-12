import serverCreationValidatior from '$lib/server/formValidation/serverCreationValidatior';
import { json } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST = async ({ request }) => {
	// console.log(await request.json());
	const { serverName, serverFile, javaVersion } = await request.json();

	return json(await serverCreationValidatior(serverName, serverFile, javaVersion));
};
