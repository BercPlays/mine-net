import os from 'node:os';
import path from 'node:path';

export const documentsDir = path.join(os.homedir(), 'Documents');
export const mineNetFolder = path.join(documentsDir, 'MNS');
export const mineNetJarsFolder = path.join(mineNetFolder, 'jars');
export const mineNetServersFolder = path.join(mineNetFolder, 'servers');
