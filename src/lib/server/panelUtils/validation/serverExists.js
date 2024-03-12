import { existsSync } from 'fs';
import path from 'path';
import { mineNetServersFolder } from '../../importantDirs';
import { converToValidServerName } from '../../../nameUtils';

/**
 * @param {String} name
 */
export const serverExists = (name) => {
	const filtered = converToValidServerName(name).trim();

	if (filtered.length <= 0) return false;
	if (filtered.length > 16) return false;
	return existsSync(path.join(mineNetServersFolder, filtered));
};
