import { getLocalJavaVersions } from '$lib/server/pageData/getLocalJavaVersions';

const javaVersionExists = (/** @type {string} */ javaVersion) => {
	return new Promise((resolve) => {
		if (javaVersion.length <= 0) resolve(false);
		if (javaVersion.length > 32) resolve(false);
		if (getLocalJavaVersions().includes(javaVersion)) resolve(true);
		resolve(false);
	});
};
export default javaVersionExists;
