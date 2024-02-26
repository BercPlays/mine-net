import fs from 'fs';
import { mineNetJavaVersionsFolder } from '../importantDirs';

export const getLocalJavaVersions = () => {
	return fs.readdirSync(mineNetJavaVersionsFolder);
};
