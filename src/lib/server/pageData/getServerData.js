import fs, { readFileSync } from 'fs';
import { mineNetServersFolder } from '../importantDirs';
import path from 'path';

/**
 * @typedef {Object} ServerData
 * @property {string} serverName - The name of the server.
 * @property {string} softwareFile - The path to the software file associated with the server.
 * @property {boolean} online - Whether the server is currently online.
 */

/**
 * An array of server data objects.
 *
 * @returns {ServerData[]}
 */
export const getServerData = () => {
	/** @type {ServerData[]} */
	const serverData = [];

	const serverFolders = fs.readdirSync(mineNetServersFolder).filter((itemName) => {
		const itemPath = path.join(mineNetServersFolder, itemName);
		return fs.statSync(itemPath).isDirectory();
	});

	serverFolders.forEach((serverFolderName) => {
		const serverFolder = path.join(mineNetServersFolder, serverFolderName);
		const mnsInfo = JSON.parse(readFileSync(path.join(serverFolder, 'mns-info.json'), 'utf8'));

		/** @type {String} */
		const softwareFile = mnsInfo['softwareFile'];

		serverData.push({
			serverName: serverFolderName,
			softwareFile: softwareFile,
			online: false
		});
	});
	return serverData;
};
