import path from 'node:path';
import { serverExists } from './serverExists';
import { mineNetServersFolder } from '../importantDirs';
import { rmSync } from 'node:fs';

/**
 *
 * @param {String} serverName
 */
const deleteServer = (serverName) => {
	return new Promise((resolve, reject) => {
		const serverFolder = path.join(mineNetServersFolder, serverName);
		if (!serverExists(serverName)) reject(`No such server named ${serverName}`);
		rmSync(serverFolder, { recursive: true });
		resolve(undefined);
	});
};

export default deleteServer;
