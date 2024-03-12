import path from 'node:path';
import { serverExists } from './validation/serverExists';
import { mineNetServersFolder, mineNetTrashFolder } from '../importantDirs';
import { deleteTableBasedOnValue } from '../database/databaseActions';
import { rename } from 'node:fs/promises';

/**
 *
 * @param {String} serverName
 */
const deleteServer = (serverName) => {
	return new Promise((resolve, reject) => {
		const serverFolder = path.join(mineNetServersFolder, serverName);

		if (!serverExists(serverName)) reject(`No such server named ${serverName}`);
		rename(serverFolder, path.join(mineNetTrashFolder, serverName));
		deleteTableBasedOnValue('servers', 'name', serverName);
		deleteTableBasedOnValue('ftpCredentials', 'username', serverName);
		resolve(undefined);
	});
};

export default deleteServer;
