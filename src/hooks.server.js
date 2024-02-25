/** @type {import('@sveltejs/kit').Handle} */
import { getAuth } from '$lib/getAuth';
import { mineNetFolder, mineNetJarsFolder, mineNetServersFolder } from '$lib/server/importantDirs';
import { validateUser } from '$lib/server/validateUser';
import { redirect } from '@sveltejs/kit';

import fs from 'node:fs';

start();

/**
 * @param {String} message
 * @returns {void}
 */
function mnprint(message) {
	const now = new Date();
	now.getMinutes();

	const minutes = String(now.getMinutes()).padStart(2, '0');
	const hours = String(now.getHours()).padStart(2, '0');

	const currentTime = `${hours}:${minutes}`;

	console.log(`[${currentTime}] [MINE-NET] ${message}`);
}

function start() {
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

	mnprint('Launched!');
	createDir(mineNetFolder);
	createDir(mineNetJarsFolder);
	createDir(mineNetServersFolder);
	mnprint(`Software jars should be in ${mineNetJarsFolder}`);
}

function shutdown() {
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
