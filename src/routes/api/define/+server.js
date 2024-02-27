import { converToValidServerName } from '$lib/server/panelUtils/nameUtils.js';
import { createBaseServerFileSystem, generateFilesForServer } from '$lib/server/serverRuntime.js';
import { redirect } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	// @ts-ignore
	const { serverName, version, javaVersion } = await request.json();
	const validServerName = converToValidServerName(serverName);

	createBaseServerFileSystem(validServerName, version, () => {
		generateFilesForServer(validServerName, javaVersion);
	});

	redirect(303, '/');
};
