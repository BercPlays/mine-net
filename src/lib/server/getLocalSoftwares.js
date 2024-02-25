import fs from 'fs';
import { mineNetJarsFolder } from './importantDirs';

export const getLocalSoftwares = () => {
	return fs.readdirSync(mineNetJarsFolder);
};
