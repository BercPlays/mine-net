import { isUserLoggedIn } from '$lib/isUserLoggedIn';
import { getLocalSoftwares } from '$lib/server/getLocalSoftwares';
import { mineNetJarsFolder } from '$lib/server/importantDirs';

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ cookies }) => {
	return await {
		isLoggedIn: isUserLoggedIn(cookies),
		// isOnServersPage: new URL(request.url).pathname == '/management',
		jarsPath: mineNetJarsFolder,
		softwares: getLocalSoftwares()
	};
};
