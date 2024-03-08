import { deleteTableBasedOnValue } from '$lib/server/database/databaseActions';
import FTPServerController from '$lib/server/ftpserver/ftpserverController';
import deleteServer from '$lib/server/panelUtils/deleteServer';
import getServerCount from '$lib/server/panelUtils/getServerCount';
import { json } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST = async ({ request }) => {
	// @ts-ignore
	const { serverName } = await request.json();

	try {
		await deleteTableBasedOnValue('servers', 'name', serverName);
		if ((await getServerCount()) <= 0) FTPServerController.shutdown();
		await deleteTableBasedOnValue('ftpCredentials', 'username', serverName);
		await deleteServer(serverName);
	} catch (error) {
		return json({ status: 'error' });
	}
	return json({ status: 'ok' });
};
