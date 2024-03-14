/** @type {import('@sveltejs/kit').Handle} */
import { getAuth } from '$lib/getAuth';
import {
	createTable,
	getLastColumnInTable,
	getTableCount
} from '$lib/server/database/databaseActions';
import FTPServerController from '$lib/server/ftpserver/ftpserverController';
import {
	mineNetFolder,
	mineNetJarsFolder,
	mineNetJavaVersionsFolder,
	mineNetServersFolder,
	mineNetTrashFolder
} from '$lib/server/importantDirs';
import { mnprint } from '$lib/server/mnPrint';
import getServerCount from '$lib/server/panelUtils/getServerCount';
import { validateUser } from '$lib/server/validateUser';
import { redirect } from '@sveltejs/kit';
import fs from 'node:fs';
import ansiColors from 'ansi-colors';
import * as commandExists from 'command-exists';
import dockerJs from 'mydockerjs';
const { dockerUtils } = dockerJs;

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
	/**
	 * @param {String} message
	 * @param {boolean} predicate
	 */
	function prettyBool(message, predicate) {
		return `${message} ${predicate === true ? ansiColors.greenBright('Available') : ansiColors.redBright('Not Found')}`;
	}
	/**
	 * @param {String} message
	 */
	function dockerprint(message) {
		console.log(`[${ansiColors.cyanBright('Docker')}] ${message}`);
	}
	dockerprint(prettyBool('Docker CLI (Command Line Tool)', commandExists.sync('docker')));
	dockerprint(prettyBool('Docker Compose', commandExists.sync('docker-compose')));

	if (!commandExists.sync('docker')) {
		console.log(ansiColors.red('Docker is not installed! Aborting...'));
		shutdown();
	}
	createDir(mineNetFolder);
	createDir(mineNetJarsFolder);
	createDir(mineNetTrashFolder);
	createDir(mineNetServersFolder);
	createDir(mineNetJavaVersionsFolder);

	mnprint(`Software jars should be in ${mineNetJarsFolder}`);

	await createTable('servers', {
		// @ts-ignore
		id: {
			type: 'INTEGER',
			flags: 'PRIMARY KEY AUTOINCREMENT'
		},
		name: {
			type: 'TEXT',
			flags: 'NOT NULL'
		},
		software: {
			type: 'TEXT',
			flags: 'NOT NULL'
		},
		javaVersion: {
			type: 'TEXT',
			flags: 'NOT NULL'
		},
		status: {
			type: 'TEXT',
			flags: 'NOT NULL'
		}
	});
	await createTable('ftpCredentials', {
		// @ts-ignore
		id: {
			type: 'INTEGER',
			flags: 'PRIMARY KEY AUTOINCREMENT'
		},
		username: {
			type: 'TEXT',
			flags: 'NOT NULL'
		},
		password: {
			type: 'TEXT',
			flags: 'NOT NULL'
		},
		serverId: {
			type: 'INTEGER',
			flags: 'NOT NULL'
		}
	});
	if ((await getServerCount()) > 0) FTPServerController.start();
	console.log(dockerUtils.isDockerCliInstalledSync());
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
