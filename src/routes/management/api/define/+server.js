import { SERVER_LIMIT } from '$env/static/private';
import bytesToHex from '$lib/math/bytesToHex.js';
import generateRandomBytes from '$lib/math/generateRandomBytes.js';
import { insertIntoTable } from '$lib/server/database/databaseActions.js';
import FTPServerController from '$lib/server/ftpserver/ftpserverController.js';
import getServerCount from '$lib/server/panelUtils/getServerCount.js';
import { converToValidServerName } from '$lib/server/panelUtils/nameUtils.js';
import { createBaseServerFileSystem, generateFilesForServer } from '$lib/server/serverRuntime.js';
import { error, redirect } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const count = await getServerCount();

	if (count >= SERVER_LIMIT) error(404, 'Server limit reached!');

	const { serverName, version, javaVersion } = await request.json();
	const validServerName = converToValidServerName(serverName);

	createBaseServerFileSystem(validServerName, version, async () => {
		await insertIntoTable('servers', {
			name: validServerName,
			software: version,
			javaVersion: javaVersion,
			status: 'CREATING'
		});
		await insertIntoTable('ftpCredentials', {
			username: validServerName,
			password: bytesToHex(generateRandomBytes(8)),
			serverId: count + 1
		});
		if (count <= 0) FTPServerController.start();
		generateFilesForServer(validServerName, javaVersion);
	});

	redirect(303, '/');
};
