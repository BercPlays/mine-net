import { USERNAME } from '$env/static/private';
import os from 'node:os';
import path from 'node:path';

export const documentsDir = path.join(os.homedir(), 'home', USERNAME, 'Documents');
export const mineNetFolder = path.join(documentsDir, 'MNS');
export const mineNetJarsFolder = path.join(mineNetFolder, 'jars');
export const mineNetTrashFolder = path.join(mineNetFolder, 'trash');
export const mineNetServersFolder = path.join(mineNetFolder, 'servers');
export const mineNetJavaVersionsFolder = path.join(mineNetFolder, 'java-versions');
