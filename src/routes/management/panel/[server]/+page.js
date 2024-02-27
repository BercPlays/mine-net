import { serverExists } from '$lib/apiInterface/serverExists';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	/** @type {String} */
	const serverName = params.server;

	const _serverExists = await serverExists(serverName, fetch);

	if (!_serverExists) {
		error(404, "Server doesn't exists.");
	}
}
