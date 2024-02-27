import { isUserLoggedIn } from '$lib/isUserLoggedIn';
import { getLocalJavaVersions } from '$lib/server/pageData/getLocalJavaVersions';
import { getLocalSoftwares } from '$lib/server/pageData/getLocalSoftwares';
import { getServerData } from '$lib/server/pageData/getServerData';
import { mineNetJarsFolder } from '$lib/server/importantDirs';

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ cookies }) => {
	return await {
		isLoggedIn: isUserLoggedIn(cookies),
		jarsPath: mineNetJarsFolder,
		softwares: getLocalSoftwares(),
		javaVersions: getLocalJavaVersions(),
		serverData: getServerData()
	};
};
