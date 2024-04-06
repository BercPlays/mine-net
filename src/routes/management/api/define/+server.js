import { SERVER_LIMIT } from '$env/static/private';
import bytesToHex from '$lib/math/bytesToHex.js';
import generateRandomBytes from '$lib/math/generateRandomBytes.js';
import { getLastColumnInTable, insertIntoTable } from '$lib/server/database/databaseActions.js';
import serverCreationValidatior from '$lib/server/formValidation/serverCreationValidatior.js';
import FTPServerController from '$lib/server/ftpserver/ftpserverController.js';
import getServerCount from '$lib/server/panelUtils/getServerCount.js';
import { converToValidServerName } from '$lib/nameUtils.js';
import { createBaseServerFileSystem, generateFilesForServer } from '$lib/server/serverRuntime.js';
import { error, redirect } from '@sveltejs/kit';
import DockerApi from '$lib/server/docker/dockerApi';

/**
 * @param {string} serverName
 * @param {string} version
 * @param {string} javaVersion
 * @param {number} count
 */
async function setupServer(serverName, version, javaVersion, count) {
	return new Promise((resolve) => {
		const validServerName = converToValidServerName(serverName);

		createBaseServerFileSystem(validServerName, version).then(() => {
			insertIntoTable('servers', {
				name: validServerName,
				software: version,
				javaVersion: javaVersion,
				status: 'CREATING'
			}).then(() => {
				getLastColumnInTable('servers').then((column) => {
					insertIntoTable('ftpCredentials', {
						username: validServerName,
						password: bytesToHex(generateRandomBytes(8)),
						serverId: column.id
					}).then(() => {
						if (count <= 0) FTPServerController.start();
						generateFilesForServer(validServerName, javaVersion);
						resolve(undefined);
					});
				});
			});
		});
	});
}

export const POST = async ({ request }) => {
	const count = await getServerCount();

	if (count >= SERVER_LIMIT) error(404, 'Server limit reached!');
	const { serverName, version, javaVersion } = await request.json();

	if (await serverCreationValidatior(serverName, version, javaVersion))
		setupServer(serverName, version, javaVersion, count);

	redirect(303, '/');
};
