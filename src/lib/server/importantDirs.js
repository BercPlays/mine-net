import { USERNAME } from '$env/static/private';
import path from 'node:path';
import os from 'node:os';

function getDocuments() {
	return process.platform == 'linux'
		? path.join('/home', USERNAME, 'Documents')
		: path.join(os.homedir(), 'Documents');
}

export const documentsDir = getDocuments();
export const mineNetFolder = path.join(documentsDir, 'MNS');
export const mineNetJarsFolder = path.join(mineNetFolder, 'jars');
export const mineNetTrashFolder = path.join(mineNetFolder, 'trash');
export const mineNetServersFolder = path.join(mineNetFolder, 'servers');
export const mineNetJavaVersionsFolder = path.join(mineNetFolder, 'java-versions');
