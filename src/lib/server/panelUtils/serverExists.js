import { existsSync } from 'fs';
import path from 'path';
import { mineNetServersFolder } from '../importantDirs';

/**
 * @param {String} name
 */
export const serverExists = (name) => {
	return existsSync(path.join(mineNetServersFolder, name));
};
