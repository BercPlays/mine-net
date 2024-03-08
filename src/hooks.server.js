/** @type {import('@sveltejs/kit').Handle} */
import { getAuth } from '$lib/getAuth';
import { createTable } from '$lib/server/database/databaseActions';
import FTPServerController from '$lib/server/ftpserver/ftpserverController';
import {
	mineNetFolder,
	mineNetJarsFolder,
	mineNetJavaVersionsFolder,
	mineNetServersFolder
} from '$lib/server/importantDirs';
import { mnprint } from '$lib/server/mnPrint';
import getServerCount from '$lib/server/panelUtils/getServerCount';
import { validateUser } from '$lib/server/validateUser';
import { redirect } from '@sveltejs/kit';
import fs from 'node:fs';

start();

async function start() {
	/**
	 * @param {String} dir
	 * @returns {void}
	 */
	function createDir(dir) {
		if (!fs.existsSync(dir)) {
			mnprint(`${dir} doesn't exist! Creating one...`);
			fs.mkdirSync(dir);
		}
	}

	console.log('[--- RUNNING MINE-NET ---]');
	console.log('[   SOFTWARE BY ZSIGSZA  ]');
	console.log('[                        ]');
	console.log('[    PUT SOFTWARE JARS   ]');
	console.log('[        IN YOUR         ]');
	console.log('[    Documents/MNS/jars  ]');
	console.log('[         FOLDER         ]');
	console.log('[                        ]');
	console.log('[--- RUNNING MINE-NET ---]');

	createDir(mineNetFolder);
	createDir(mineNetJarsFolder);
	createDir(mineNetServersFolder);
	createDir(mineNetJavaVersionsFolder);
	mnprint(`Software jars should be in ${mineNetJarsFolder}`);

	// await createTable('servers', {
	// 	// @ts-ignore
	// 	id: {
	// 		type: 'INTEGER',
	// 		flags: 'PRIMARY KEY AUTOINCREMENT'
	// 	},
	// 	name: {
	// 		type: 'TEXT',
	// 		flags: 'NOT NULL'
	// 	},
	// 	software: {
	// 		type: 'TEXT',
	// 		flags: 'NOT NULL'
	// 	},
	// 	javaVersion: {
	// 		type: 'TEXT',
	// 		flags: 'NOT NULL'
	// 	},
	// 	status: {
	// 		type: 'TEXT',
	// 		flags: 'NOT NULL'
	// 	}
	// });

	// await createTable('ftpCredentials', {
	// 	// @ts-ignore
	// 	id: {
	// 		type: 'INTEGER',
	// 		flags: 'PRIMARY KEY AUTOINCREMENT'
	// 	},
	// 	username: {
	// 		type: 'TEXT',
	// 		flags: 'NOT NULL'
	// 	},
	// 	password: {
	// 		type: 'TEXT',
	// 		flags: 'NOT NULL'
	// 	},
	// 	serverId: {
	// 		type: 'INTEGER',
	// 		flags: 'NOT NULL'
	// 	}
	// });
	// if ((await getServerCount()) > 0) FTPServerController.start();
}

function shutdown() {
	FTPServerController.shutdown();
	process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export async function handle({ event, resolve }) {
	const { cookies } = event;
	const authObject = getAuth(cookies);

	if (event.url.pathname.startsWith('/management')) {
		if (!authObject.session) {
			console.log('Protecting');
			throw redirect(303, '/');
		} else {
			// @ts-ignore
			if (!validateUser(authObject.username, authObject.password)) {
				cookies.delete('minenet-session-auth', { path: '/' });
				throw redirect(303, '/');
			}
		}
	}

	const response = await resolve(event);
	return response;
}
