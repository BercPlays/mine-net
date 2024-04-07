import { getDataBasedOnValue } from '$lib/server/database/databaseActions';
import DockerApi from '$lib/server/docker/dockerApi';
import GlobalContainers from '$lib/server/globalContainers';
import {
	mineNetJarsFolder,
	mineNetJavaVersionsFolder,
	mineNetServersFolder
} from '$lib/server/importantDirs';
import { serverExists } from '$lib/server/panelUtils/validation/serverExists';
import { getServerLaunchCommand } from '$lib/server/serverRuntime';
import { json } from '@sveltejs/kit';
import path from 'path';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST = async ({ request }) => {
	const { serverName } = await request.json();

	if (!serverExists(serverName)) return json({ status: "server doesn't exists." });
	const serverData = await getDataBasedOnValue('servers', 'name', serverName);

	let container = await DockerApi.run(
		serverName,
		{
			'25565/tcp': [
				{
					HostPort: '25565'
				}
			],
			'25565/udp': [
				{
					HostPort: '25565'
				}
			]
		},
		[`${path.join(mineNetServersFolder, serverName)}:/app/server`],
		'/app/server/',
		// @ts-ignore
		getServerLaunchCommand(
			path.join(mineNetJarsFolder, serverData.software),
			path.join(mineNetJavaVersionsFolder, serverData.javaVersion, 'bin', 'java'),
			'1024',
			'2048',
			true,
			true
		)
	);
	GlobalContainers.addContainer(container, serverName);

	return json({
		status: 'ok'
	});
};
