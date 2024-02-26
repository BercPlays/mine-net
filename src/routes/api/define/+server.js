import { createBaseServerFileSystem, generateFilesForServer } from '$lib/server/serverRuntime.js';
import { redirect } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	// @ts-ignore
	const { serverName, version, javaVersion } = await request.json();
	createBaseServerFileSystem(serverName, version, () => {
		generateFilesForServer(serverName, javaVersion);
	});

	redirect(303, '/');
};
